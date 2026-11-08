/**
 * A tiny client-side router (two routes don't justify a dependency).
 * Netlify's SPA fallback in netlify.toml serves index.html for every path.
 */
import { useEffect, useSyncExternalStore, type AnchorHTMLAttributes, type MouseEvent } from 'react'

const EVENT = 'app:navigate'

function subscribe(cb: () => void) {
  window.addEventListener('popstate', cb)
  window.addEventListener(EVENT, cb)
  return () => {
    window.removeEventListener('popstate', cb)
    window.removeEventListener(EVENT, cb)
  }
}

const snapshot = () => window.location.pathname + window.location.search + window.location.hash

export function useLocation() {
  const href = useSyncExternalStore(subscribe, snapshot)
  const url = new URL(href, window.location.origin)
  return { pathname: url.pathname, search: url.searchParams, hash: url.hash, href }
}

export function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

export function scrollToHash(hash: string, smooth = true) {
  // 'instant' rather than 'auto': the stylesheet sets scroll-behavior: smooth on <html>.
  const behavior: ScrollBehavior = smooth && !prefersReducedMotion() ? 'smooth' : 'instant'
  if (!hash || hash === '#top') {
    window.scrollTo({ top: 0, behavior: hash ? behavior : 'instant' })
    return
  }
  const el = document.getElementById(decodeURIComponent(hash.slice(1)))
  if (el) {
    el.scrollIntoView({ behavior, block: 'start' })
    // Move focus for keyboard and screen-reader users without a second jump.
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }
}

/**
 * Navigate within the app. A normal navigation scrolls to the hash target
 * (or the top). `replace` only updates the URL — used for filter changes.
 */
export function navigate(to: string, opts: { replace?: boolean } = {}) {
  const next = new URL(to, window.location.href)
  const target = next.pathname + next.search + next.hash
  if (target === snapshot()) {
    if (!opts.replace) scrollToHash(next.hash)
    return
  }
  if (opts.replace) {
    window.history.replaceState(window.history.state, '', target)
  } else {
    // Remember where we were so Back returns to the same spot.
    window.history.replaceState({ y: window.scrollY }, '')
    // Scroll once the new route has rendered (see useScrollAfterNavigation).
    pendingScroll = { hash: next.hash, smooth: next.pathname === window.location.pathname }
    window.history.pushState(null, '', target)
  }
  window.dispatchEvent(new Event(EVENT))
}

// The app restores position itself, so a first load of /#ferdir lands on the section.
window.history.scrollRestoration = 'manual'
type PendingScroll = { hash: string; smooth: boolean } | { y: number }
let pendingScroll: PendingScroll | null = window.location.hash ? { hash: window.location.hash, smooth: false } : null

window.addEventListener('popstate', (e) => {
  const y = (e.state as { y?: number } | null)?.y
  pendingScroll = typeof y === 'number' ? { y } : { hash: window.location.hash, smooth: false }
})

/** Call once at the app root: runs the scroll queued by navigation after render. */
export function useScrollAfterNavigation(href: string) {
  useEffect(() => {
    const p = pendingScroll
    if (!p) return
    pendingScroll = null
    if ('y' in p) window.scrollTo({ top: p.y, behavior: 'instant' })
    else scrollToHash(p.hash, p.smooth)
  }, [href])
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }

/** An internal link: a real <a href>, intercepted for client-side navigation. */
export function Link({ to, onClick, ...rest }: LinkProps) {
  function handle(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate(to)
  }
  return <a href={to} onClick={handle} {...rest} />
}

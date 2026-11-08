import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { Link, useLocation } from '../lib/router'

export const navItems = [
  { label: 'Heim', to: '/#top' },
  { label: 'Ferðir', to: '/#ferdir' },
  { label: 'Námskeið', to: '/?tegund=namskeid#ferdir' },
  { label: 'Um okkur', to: '/#um' },
  { label: 'Hafa samband', to: '/#samband' },
]

export function Logo() {
  return (
    <svg width="34" height="22" viewBox="0 0 34 22" fill="none" aria-hidden="true">
      <path d="M1 21 L11 5 L16 12 L22 2 L33 21" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M8.5 9 L11 5 L13.5 9" stroke="#A8C5D1" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const { href } = useLocation()
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [href])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="on-dark sticky top-0 z-50 border-b border-ice/15 bg-charcoal/95 backdrop-blur-md">
      <div className="wrap flex h-[76px] items-center justify-between gap-6">
        <Link to="/#top" className="inline-flex min-h-11 items-center gap-3 text-snow no-underline" aria-label="Fjallaskíðun — forsíða">
          <Logo />
          <span className="font-display text-[21px] font-bold tracking-tight">Fjallaskíðun</span>
        </Link>

        <nav aria-label="Aðalvalmynd" className="hidden items-center gap-8 lg:flex">
          {navItems.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              className="border-b border-transparent py-3 text-sm font-medium text-[#dde5e8] no-underline transition-colors hover:border-ice hover:text-snow"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/#ferdir" className="btn btn-light hidden lg:inline-flex">
            Skoða ferðir
          </Link>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/30 text-snow lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Loka valmynd' : 'Opna valmynd'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Valmynd" className="wrap animate-menu flex flex-col pt-2 pb-7 lg:hidden">
          {navItems.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              onClick={() => setOpen(false)}
              className="flex min-h-15 items-center justify-between border-b border-ice/20 font-display text-[28px] font-bold tracking-tight text-snow no-underline hover:text-ice"
            >
              {n.label}
              <ArrowRight size={20} className="text-ice" aria-hidden="true" />
            </Link>
          ))}
          <Link to="/#ferdir" onClick={() => setOpen(false)} className="btn btn-light mt-6 w-full">
            Skoða ferðir
          </Link>
        </nav>
      )}
    </header>
  )
}

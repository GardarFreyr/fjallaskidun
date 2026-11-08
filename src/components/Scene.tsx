import type { Photo } from '../data/photos'

const WIDTHS = [400, 640, 960, 1280, 1600, 2000, 2560]

function src(id: string, width: number) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&q=72&w=${width}`
}

interface PhotoImgProps {
  photo: Photo
  /** The rendered width, e.g. "(min-width: 1024px) 33vw, 100vw". */
  sizes: string
  className?: string
  /** Above-the-fold image: load eagerly with high priority. */
  priority?: boolean
}

/** Responsive Unsplash image. Unsplash's CDN resizes and serves WebP/AVIF. */
export function PhotoImg({ photo, sizes, className = '', priority = false }: PhotoImgProps) {
  return (
    <img
      src={src(photo.id, 1280)}
      srcSet={WIDTHS.map((w) => `${src(photo.id, w)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
      style={{ objectPosition: photo.position }}
    />
  )
}

/** Small credit line. "Stemningsmynd" = illustrative photo, not from the tour itself. */
export function PhotoCredit({ photo, mood = true, className = '' }: { photo: Photo; mood?: boolean; className?: string }) {
  return (
    <p className={`text-[11px] leading-snug tracking-wide ${className}`}>
      {mood && <span className="font-semibold">Stemningsmynd · </span>}
      {photo.location && <>{photo.location} · </>}
      <a href={photo.pageUrl} target="_blank" rel="noopener noreferrer" className="text-inherit underline-offset-2 hover:underline">
        {photo.photographer} / Unsplash
      </a>
    </p>
  )
}

export function DifficultyMeter({ level, dark = false }: { level: number; dark?: boolean }) {
  const on = dark ? 'bg-ice' : 'bg-charcoal'
  const off = dark ? 'bg-white/15' : 'bg-[#d5dbdd]'
  return (
    <span className="flex gap-[3px]" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`block h-1 w-3.5 rounded-sm ${i <= level ? on : off}`} />
      ))}
    </span>
  )
}

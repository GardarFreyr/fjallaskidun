import { ArrowRight, Clock, Gauge, Users } from 'lucide-react'
import { difficultyLevel, type Tour } from '../data/tours'
import { Link } from '../lib/router'
import { CompareButton } from './CompareButton'
import { DifficultyMeter, PhotoImg } from './Scene'

export function TourCard({ tour, index = 0 }: { tour: Tour; index?: number }) {
  const href = `/ferdir/${tour.slug}`
  const perPerson = tour.priceNote === 'á mann'
  return (
    <article
      className="group flex animate-rise flex-col overflow-hidden rounded-lg bg-snow shadow-[0_1px_2px_rgba(23,29,32,0.06)] ring-1 ring-charcoal/5 transition-[transform,box-shadow] duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-[0_32px_64px_-32px_rgba(23,29,32,0.45)]"
      style={{ animationDelay: `${index * 60}ms`, animationDuration: '0.6s' }}
    >
      <Link to={href} tabIndex={-1} aria-hidden="true" className="relative block aspect-[4/3] overflow-hidden bg-slate">
        <PhotoImg
          photo={tour.photo}
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
          className="transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-transparent" />
        <span className="absolute top-3.5 left-3.5 rounded-full bg-snow/95 px-3 py-1.5 text-xs font-semibold text-charcoal backdrop-blur">
          {tour.categoryLabel}
        </span>
        <span className="absolute top-4 right-4 rounded bg-night/45 px-2 py-1 text-[10px] font-semibold tracking-[0.12em] text-white/90 uppercase backdrop-blur-sm">
          Stemningsmynd
        </span>
        <span className="absolute inset-x-5 bottom-4 flex flex-col gap-1 text-snow">
          <span className="text-[11px] font-semibold tracking-[0.14em] text-ice uppercase">{tour.region}</span>
        </span>
      </Link>

      <div className="flex grow flex-col gap-5 p-5 sm:p-6">
        <div className="flex flex-col gap-2.5">
          <h3 className="font-display text-[26px] leading-[1.05] font-bold tracking-[-0.025em] sm:text-[28px]">
            <Link to={href} className="text-charcoal no-underline hover:underline hover:decoration-2 hover:underline-offset-4">
              {tour.name}
            </Link>
          </h3>
          <p className="text-[15px] leading-relaxed text-slate">{tour.summary}</p>
        </div>

        <dl className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2.5 text-sm">
          <dt className="flex w-5 justify-center">
            <span className="sr-only">Erfiðleikastig</span>
            <Gauge size={16} className="text-slate" aria-hidden="true" />
          </dt>
          <dd className="flex items-center gap-2.5 font-semibold">
            {tour.difficulty ? (
              <>
                {tour.difficulty}
                <DifficultyMeter level={difficultyLevel[tour.difficulty]} />
              </>
            ) : (
              <span className="font-normal text-muted italic">Erfiðleikastig ekki tilgreint</span>
            )}
          </dd>
          <dt className="flex w-5 justify-center">
            <span className="sr-only">Tímalengd</span>
            <Clock size={16} className="text-slate" aria-hidden="true" />
          </dt>
          <dd className="font-medium">{tour.duration}</dd>
          {tour.groupSize && (
            <>
              <dt className="flex w-5 justify-center">
                <span className="sr-only">Hópstærð</span>
                <Users size={16} className="text-slate" aria-hidden="true" />
              </dt>
              <dd className="font-medium">{tour.groupSize}</dd>
            </>
          )}
        </dl>

        <div className="mt-auto flex flex-col gap-4 border-t border-stone pt-5">
          <p className="flex items-baseline gap-2">
            <span className="font-display text-[26px] leading-none font-bold tracking-tight">{tour.price}</span>
            <span className="text-sm text-slate">{perPerson ? 'á mann' : 'þyrluskutl ekki innifalið'}</span>
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link to={href} className="btn btn-dark grow sm:grow-0" aria-label={`Skoða ferð: ${tour.name}`}>
              Skoða ferð <ArrowRight size={16} className="arrow" aria-hidden="true" />
            </Link>
            <CompareButton slug={tour.slug} name={tour.name} />
          </div>
        </div>
      </div>
    </article>
  )
}

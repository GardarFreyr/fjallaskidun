import { ArrowDown, ArrowRight } from 'lucide-react'
import { photos } from '../data/photos'
import { tours } from '../data/tours'
import { Link } from '../lib/router'
import { PhotoCredit, PhotoImg } from './Scene'

const courseCount = tours.filter((t) => t.category === 'course').length
const tourCount = tours.length - courseCount

export function Hero() {
  return (
    <section
      className="on-dark relative isolate flex min-h-[calc(100svh-76px)] flex-col overflow-hidden bg-charcoal text-snow sm:min-h-[760px] lg:min-h-[calc(100svh-76px)]"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 -z-10 animate-kenburns">
        <PhotoImg photo={photos.hero} sizes="100vw" priority />
      </div>
      {/* Two soft scrims: one for the headline (top-left), one for the fact bar (bottom). */}
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(17,23,26,0.82)_0%,rgba(17,23,26,0.55)_38%,rgba(17,23,26,0.05)_70%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-night/85 to-transparent" aria-hidden="true" />

      <div className="wrap flex grow flex-col justify-center gap-7 pt-20 pb-16 sm:pt-24">
        <p className="eyebrow animate-rise">Fjallaskíðaferðir og námskeið · Frá 2016</p>
        <h1
          id="hero-title"
          className="max-w-[920px] animate-rise font-display leading-[0.92] font-extrabold tracking-[-0.045em] [animation-delay:120ms] [text-shadow:0_2px_30px_rgba(0,0,0,0.25)]"
          style={{ fontSize: 'clamp(3rem, 7.8vw, 7.6rem)' }}
        >
          Ævintýrið byrjar á fjallinu.
        </h1>
        <p className="max-w-lg animate-rise text-lg leading-relaxed text-[#e6edf0] [animation-delay:240ms] sm:text-xl">
          Uppgötvaðu fjallaskíðaferðir á Íslandi með reyndum leiðsögumönnum.
        </p>
        <div className="mt-2 flex animate-rise flex-wrap gap-3 [animation-delay:360ms]">
          <Link to="/#ferdir" className="btn btn-light">
            Skoða ferðir <ArrowRight size={18} className="arrow" aria-hidden="true" />
          </Link>
          <Link to="/#um" className="btn btn-ghost backdrop-blur-sm">
            Kynntu þér Fjallaskíðun
          </Link>
        </div>
      </div>

      <div className="relative border-t border-white/15">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-10 gap-y-4 py-5">
          <ul className="flex flex-wrap gap-x-10 gap-y-3 text-sm">
            <li className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold">{tourCount}</span>
              <span className="text-mist">ferðir</span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold">{courseCount}</span>
              <span className="text-mist">námskeið</span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="text-mist">Verð frá</span>
              <span className="font-display text-2xl font-bold">7.900 kr.</span>
            </li>
          </ul>
          <div className="flex items-center gap-6">
            <PhotoCredit photo={photos.hero} className="hidden text-white/70 md:block" />
            <Link
              to="/#ferdir"
              aria-label="Fara í ferðir"
              className="hidden size-11 items-center justify-center rounded-full border border-white/35 text-snow hover:border-white sm:inline-flex"
            >
              <ArrowDown size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

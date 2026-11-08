import { ArrowLeft, ArrowUpRight, Check, Minus } from 'lucide-react'
import { useEffect } from 'react'
import { CompareButton } from '../components/CompareButton'
import { PhotoCredit, PhotoImg } from '../components/Scene'
import { links } from '../data/site'
import { inquiryHref, NOT_AVAILABLE, tours, type Tour } from '../data/tours'
import { Link } from '../lib/router'

const external = { target: '_blank', rel: 'noopener noreferrer' } as const

function ItemList({ items, icon }: { items: string[]; icon: 'check' | 'minus' }) {
  if (items.length === 0) return <p className="text-muted italic">{NOT_AVAILABLE}</p>
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 leading-normal">
          {icon === 'check' ? (
            <Check size={18} strokeWidth={2.2} className="mt-0.5 shrink-0 text-slate" aria-hidden="true" />
          ) : (
            <Minus size={18} strokeWidth={2.2} className="mt-0.5 shrink-0 text-[#8c989e]" aria-hidden="true" />
          )}
          {item}
        </li>
      ))}
    </ul>
  )
}

function BookingPanel({ tour }: { tour: Tour }) {
  // Book on the real product page, or by email where the current site asks for that.
  const site = { href: tour.sourceUrl, label: tour.booking === 'site' ? 'Bóka á fjallaskidun.is' : 'Sjá ferð á fjallaskidun.is', isExternal: true }
  const mail = { href: inquiryHref(tour.name), label: tour.booking === 'email' ? 'Senda bókunarfyrirspurn' : 'Senda fyrirspurn', isExternal: false }
  const [primary, secondary] = tour.booking === 'site' ? [site, mail] : [mail, site]
  const linkProps = (l: typeof site) => ({ href: l.href, ...(l.isExternal ? external : {}) })

  return (
    <aside aria-label="Bókun" className="flex min-w-0 flex-[1_1_320px] flex-col gap-4 lg:sticky lg:top-24">
      <div className="panel flex flex-col gap-4.5">
        <div>
          <p className="eyebrow mb-2.5">Verð</p>
          <p className="font-display text-[40px] leading-none font-bold tracking-tight">{tour.price}</p>
          <p className="mt-2 text-sm text-slate">{tour.priceNote}</p>
        </div>
        <p className="rounded bg-glacier px-4 py-3.5 text-sm leading-relaxed">
          <strong>Dagsetningar:</strong> Engar komandi dagsetningar eru birtar á vefnum eins og er. Sendu fyrirspurn til að spyrja
          um næstu ferð.
        </p>
        <a className="btn btn-dark w-full" {...linkProps(primary)}>
          {primary.label}
          {primary.isExternal && <ArrowUpRight size={16} aria-hidden="true" />}
        </a>
        <a className="btn btn-outline w-full" {...linkProps(secondary)}>
          {secondary.label}
          {secondary.isExternal && <ArrowUpRight size={16} aria-hidden="true" />}
        </a>
        <p className="text-[13px] leading-normal text-slate">{tour.bookingNote}</p>
        <CompareButton slug={tour.slug} name={tour.name} className="justify-center" />
      </div>
      <p className="px-1 text-[13px] leading-normal text-muted">
        Bókun og greiðsla fara fram á núverandi vef fjallaskidun.is samkvæmt{' '}
        <a href={links.terms} {...external}>
          skilmálum
        </a>
        .
      </p>
    </aside>
  )
}

export function TourPage({ tour }: { tour: Tour }) {
  useEffect(() => {
    document.title = `${tour.name} — Fjallaskíðun`
  }, [tour.name])

  const idx = tours.indexOf(tour)
  const others = [1, 2, 3].map((n) => tours[(idx + n) % tours.length])
  const facts = [
    { label: 'Erfiðleikastig', value: tour.difficulty },
    { label: 'Tímalengd', value: tour.duration },
    { label: 'Hópstærð', value: tour.groupSize },
    { label: 'Vegalengd og hækkun', value: tour.distance },
    { label: 'Svæði', value: tour.region },
    { label: 'Tegund', value: tour.categoryLabel },
  ]

  return (
    <main id="main">
      <section className="on-dark relative isolate flex min-h-[520px] flex-col overflow-hidden bg-charcoal text-snow sm:min-h-[600px]" aria-labelledby="tour-title">
        <div className="absolute inset-0 -z-10 animate-kenburns">
          <PhotoImg photo={tour.photo} sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,23,26,0.55)_0%,rgba(17,23,26,0.1)_35%,rgba(17,23,26,0.35)_60%,rgba(17,23,26,0.88)_100%)]" aria-hidden="true" />
        <div className="wrap pt-8">
          <Link
            to="/#ferdir"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/40 bg-charcoal/40 pr-4 pl-3 text-sm font-semibold text-snow no-underline backdrop-blur-sm hover:border-white"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Allar ferðir
          </Link>
        </div>
        <div className="wrap mt-auto flex flex-col gap-4 pb-10 sm:pb-14">
          <p className="eyebrow animate-rise">
            {tour.categoryLabel} · {tour.region}
          </p>
          <h1
            id="tour-title"
            className="max-w-[960px] animate-rise font-display leading-[0.95] font-extrabold tracking-[-0.04em] [animation-delay:120ms] [text-shadow:0_2px_24px_rgba(0,0,0,0.3)]"
            style={{ fontSize: 'clamp(2.1rem, 6.4vw, 5.75rem)' }}
          >
            {tour.name}
          </h1>
          <p className="max-w-xl animate-rise text-lg leading-relaxed text-[#e6edf0] [animation-delay:200ms]">{tour.summary}</p>
          <PhotoCredit photo={tour.photo} className="mt-2 text-white/70" />
        </div>
      </section>

      <div className="wrap flex flex-wrap items-start gap-12 pt-12 pb-30">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-12">
          <dl className="grid gap-px overflow-hidden rounded-md bg-stone [grid-template-columns:repeat(auto-fit,minmax(170px,1fr))]">
            {facts.map((f) => (
              <div key={f.label} className="bg-snow p-5">
                <dt className="mb-2 text-[11px] font-semibold tracking-[0.08em] text-slate uppercase">{f.label}</dt>
                <dd className={f.value ? 'leading-snug font-semibold' : 'text-muted italic'}>{f.value ?? NOT_AVAILABLE}</dd>
              </div>
            ))}
          </dl>

          <section className="flex flex-col gap-4.5" aria-labelledby="um-ferdina">
            <h2 id="um-ferdina" className="font-display text-[32px] font-bold tracking-tight">
              Um ferðina
            </h2>
            {tour.description.map((p) => (
              <p key={p} className="max-w-[720px] text-lg leading-[1.7] text-slate-deep">
                {p}
              </p>
            ))}
          </section>

          <section className="panel flex flex-col gap-3" aria-labelledby="fyrir-hverja">
            <h2 id="fyrir-hverja" className="eyebrow">Fyrir hverja</h2>
            <p className="font-display text-[22px] font-bold">{tour.audience}</p>
            <p className="leading-relaxed text-slate">{tour.requirements}</p>
          </section>

          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
            <section className="panel flex flex-col gap-4">
              <h2 className="font-display text-xl font-bold">Innifalið</h2>
              <ItemList items={tour.included} icon="check" />
            </section>
            <section className="panel flex flex-col gap-4">
              <h2 className="font-display text-xl font-bold">Ekki innifalið</h2>
              <ItemList items={tour.notIncluded} icon="minus" />
            </section>
          </div>

          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
            <section className="panel flex flex-col gap-3.5">
              <h2 className="font-display text-xl font-bold">Búnaður</h2>
              <p className="leading-relaxed text-slate-deep">{tour.equipment}</p>
              <a href={links.equipment} {...external} className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold">
                Útbúnaðarlisti Fjallaskíðunar <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </section>
            <section className="panel flex flex-col gap-3.5">
              <h2 className="font-display text-xl font-bold">Öryggi og aðstæður</h2>
              <ul className="flex list-disc flex-col gap-2 pl-5 text-[15px] leading-normal marker:text-slate">
                <li>Ferðin ræðst af veðri og snjóalögum og getur breyst eða fallið niður.</li>
                <li>Láttu vita af undirliggjandi sjúkdómum, ofnæmi eða öðru sem skiptir máli.</li>
                <li>Þátttakendur eru ekki tryggðir af Fjallaskíðun — kannaðu eigin tryggingar.</li>
              </ul>
              <a href={links.safety} {...external} className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold">
                Öryggi í ferðum <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </section>
          </div>
        </div>

        <BookingPanel tour={tour} />

        <section className="flex basis-full flex-col gap-5 border-t border-line pt-6" aria-labelledby="fleiri">
          <h2 id="fleiri" className="font-display text-[28px] font-bold tracking-tight">
            Fleiri ferðir
          </h2>
          <ul className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  to={`/ferdir/${o.slug}`}
                  className="flex items-center gap-4 rounded-md bg-snow p-3 text-charcoal no-underline transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(23,29,32,0.4)]"
                >
                  <span className="block h-18 w-24 shrink-0 overflow-hidden rounded bg-slate"><PhotoImg photo={o.photo} sizes="96px" /></span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="font-display text-lg font-bold">{o.name}</span>
                    <span className="text-[13px] text-slate">
                      {o.difficulty ?? 'Erfiðleikastig ekki tilgreint'} · {o.price}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}

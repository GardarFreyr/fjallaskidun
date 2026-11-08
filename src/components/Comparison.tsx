import { Plus, X } from 'lucide-react'
import { getTour, NOT_AVAILABLE, tours, type Tour } from '../data/tours'
import { MAX_COMPARE, useCompare } from '../lib/compare'
import { Link } from '../lib/router'
import { PhotoImg } from './Scene'

function rows(t: Tour): { label: string; value: string | null }[] {
  return [
    { label: 'Tegund', value: t.categoryLabel },
    { label: 'Svæði', value: t.region },
    { label: 'Erfiðleikastig', value: t.difficulty },
    { label: 'Tímalengd', value: t.duration },
    { label: 'Verð', value: t.priceNote === 'á mann' ? `${t.price} á mann` : `${t.price} · ${t.priceNote}` },
    { label: 'Reynsla', value: t.audience },
    { label: 'Hópstærð', value: t.groupSize },
    { label: 'Vegalengd og hækkun', value: t.distance },
  ]
}

function AddChips({ available }: { available: Tour[] }) {
  const { toggle } = useCompare()
  return (
    <div className="flex flex-wrap gap-2">
      {available.map((t) => (
        <button
          key={t.slug}
          type="button"
          onClick={() => toggle(t.slug)}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-dashed border-[#8c989e] px-4 text-sm font-medium hover:border-solid hover:border-charcoal hover:bg-snow"
        >
          <Plus size={14} strokeWidth={2.4} aria-hidden="true" />
          {t.name}
        </button>
      ))}
    </div>
  )
}

export function Comparison() {
  const { selected, toggle } = useCompare()
  const chosen = selected.map(getTour).filter((t): t is Tour => Boolean(t))
  const available = tours.filter((t) => !selected.includes(t.slug))

  return (
    <section id="samanburdur" className="bg-stone py-24 sm:py-28" aria-labelledby="samanburdur-title">
      <div className="wrap flex flex-col gap-10">
        <div className="flex max-w-3xl flex-col gap-4.5">
          <p className="eyebrow">02 — Samanburður</p>
          <h2 id="samanburdur-title" className="h2">Berðu ferðirnar saman</h2>
          <p className="lede">
            Veldu allt að þrjár ferðir og sjáðu þær hlið við hlið. Aðeins upplýsingar sem birtar eru á fjallaskidun.is eru sýndar.
          </p>
        </div>

        {chosen.length === 0 ? (
          <div className="panel flex flex-col gap-4.5 sm:p-9">
            <p className="text-[17px] font-semibold">Engar ferðir valdar enn.</p>
            <p className="leading-relaxed text-slate">Smelltu á „Bera saman“ á ferðaspjaldi, eða bættu ferð við hér:</p>
            <AddChips available={available} />
          </div>
        ) : (
          <div className="grid items-stretch gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
            {chosen.map((t) => (
              <article key={t.slug} className="flex animate-rise flex-col overflow-hidden rounded-lg bg-snow shadow-[0_1px_2px_rgba(23,29,32,0.06)] ring-1 ring-charcoal/5 [animation-duration:0.5s]">
                <div className="relative">
                  <div className="h-36 overflow-hidden bg-slate"><PhotoImg photo={t.photo} sizes="(min-width: 1024px) 33vw, 100vw" /></div>
                  <button
                    type="button"
                    onClick={() => toggle(t.slug)}
                    aria-label={`Fjarlægja ${t.name} úr samanburði`}
                    className="absolute top-3 right-3 inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-stone bg-snow hover:border-charcoal"
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                </div>
                <div className="flex grow flex-col gap-1.5 px-6 pt-5.5 pb-6">
                  <h3 className="mb-2 font-display text-2xl font-bold tracking-tight">{t.name}</h3>
                  <dl>
                    {rows(t).map((r) => (
                      <div key={r.label} className="grid gap-1 border-t border-stone py-3.5">
                        <dt className="text-[11px] font-semibold tracking-[0.08em] text-slate uppercase">{r.label}</dt>
                        <dd className={r.value ? 'text-[15px] leading-normal font-medium' : 'text-[15px] text-muted italic'}>
                          {r.value ?? NOT_AVAILABLE}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <Link to={`/ferdir/${t.slug}`} className="btn btn-dark mt-auto">
                    Skoða ferð
                  </Link>
                </div>
              </article>
            ))}
            {chosen.length < MAX_COMPARE && (
              <div className="flex flex-col justify-center gap-4 rounded-md border-[1.5px] border-dashed border-[#8c989e] p-7">
                <p className="font-semibold">Bæta við ferð ({MAX_COMPARE - chosen.length} laus)</p>
                <AddChips available={available} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

/** Floating bar that keeps the current selection in reach while browsing. */
export function CompareTray() {
  const { selected, toggle, clear } = useCompare()
  if (selected.length === 0) return null
  return (
    <div
      role="region"
      aria-label="Valdar ferðir til samanburðar"
      className="on-dark fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-[860px] animate-rise flex-wrap items-center gap-3 rounded-[14px] bg-charcoal py-3 pr-3 pl-5 text-snow shadow-[0_24px_60px_-20px_rgba(23,29,32,0.6)] [animation-duration:0.4s]"
    >
      <span className="text-[13px] font-semibold text-ice">
        {selected.length} af {MAX_COMPARE}
      </span>
      <div className="flex min-w-0 flex-[1_1_200px] flex-wrap gap-1.5">
        {selected.map((slug) => {
          const t = getTour(slug)
          if (!t) return null
          return (
            <span key={slug} className="inline-flex items-center gap-1.5 rounded-full bg-ice/15 py-1 pr-1 pl-3 text-[13px] font-medium">
              {t.name}
              <button
                type="button"
                onClick={() => toggle(slug)}
                aria-label={`Fjarlægja ${t.name}`}
                className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full hover:bg-white/15"
              >
                <X size={14} aria-hidden="true" />
              </button>
            </span>
          )
        })}
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={clear} className="btn btn-ghost min-h-11 px-4">
          Hreinsa
        </button>
        <Link to="/#samanburdur" className="btn btn-light min-h-11">
          Bera saman
        </Link>
      </div>
    </div>
  )
}

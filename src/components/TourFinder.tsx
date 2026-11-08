import { categoryFilters, difficultyFilters, tours, type Category, type Difficulty, type Tour } from '../data/tours'
import { Link, navigate, useLocation } from '../lib/router'
import { TourCard } from './TourCard'

/** Filter state lives in the URL (?tegund=…&erfidleiki=…) so a filtered view can be shared. */
const categorySlug: Record<Category, string> = { tour: 'fjallaskidaferdir', heli: 'thyrluskidun', course: 'namskeid' }
const difficultySlug: Record<Difficulty, string> = {
  'Mjög auðveld': 'mjog-audveld',
  Auðveld: 'audveld',
  Miðlungs: 'midlungs',
  Krefjandi: 'krefjandi',
  Erfið: 'erfid',
}

function fromSlug<T extends string>(map: Record<T, string>, value: string | null): T | 'all' {
  const hit = (Object.keys(map) as T[]).find((k) => map[k] === value)
  return hit ?? 'all'
}

const matchesCategory = (t: Tour, c: Category | 'all') => c === 'all' || t.category === c
const matchesDifficulty = (t: Tour, d: Difficulty | 'all') => d === 'all' || t.difficulty === d

export function TourFinder() {
  const { search, hash } = useLocation()
  const category = fromSlug(categorySlug, search.get('tegund'))
  const difficulty = fromSlug(difficultySlug, search.get('erfidleiki'))

  function update(nextCategory: Category | 'all', nextDifficulty: Difficulty | 'all') {
    // Drop a difficulty that has no tours in the new category, so the grid never goes empty.
    if (nextDifficulty !== 'all' && !tours.some((t) => matchesCategory(t, nextCategory) && t.difficulty === nextDifficulty)) {
      nextDifficulty = 'all'
    }
    const params = new URLSearchParams()
    if (nextCategory !== 'all') params.set('tegund', categorySlug[nextCategory])
    if (nextDifficulty !== 'all') params.set('erfidleiki', difficultySlug[nextDifficulty])
    const qs = params.toString()
    navigate(`/${qs ? `?${qs}` : ''}${hash}`, { replace: true })
  }

  const filtered = tours.filter((t) => matchesCategory(t, category) && matchesDifficulty(t, difficulty))

  return (
    <section id="ferdir" className="bg-glacier pt-20 pb-24 sm:pt-28 sm:pb-32" aria-labelledby="ferdir-title">
      <div className="wrap flex flex-col gap-10 sm:gap-12">
        <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <p className="eyebrow">01 — Velja á milli ferða</p>
            <h2 id="ferdir-title" className="h2" style={{ fontSize: 'clamp(2.6rem, 6vw, 5.25rem)' }}>
              Finndu ferðina þína
            </h2>
          </div>
          <p className="lede lg:pb-2">
            Veldu ævintýri sem hentar þinni reynslu og áhuga. Síaðu eftir tegund og erfiðleikastigi, eða berðu allt að þrjár ferðir
            saman.
          </p>
        </div>

        <div className="flex flex-col gap-5 rounded-xl bg-snow p-5 shadow-[0_1px_2px_rgba(23,29,32,0.05)] ring-1 ring-charcoal/5 sm:p-6">
          <div role="group" aria-label="Tegund ferðar" className="flex flex-wrap items-center gap-2">
            <span className="w-full text-[11px] font-semibold tracking-[0.12em] text-slate uppercase sm:w-36">Tegund</span>
            {categoryFilters.map((f) => {
              const count = tours.filter((t) => matchesCategory(t, f.key)).length
              return (
                <button key={f.key} type="button" className="chip" aria-pressed={category === f.key} onClick={() => update(f.key, difficulty)}>
                  {f.label}
                  <span className="count">{count}</span>
                </button>
              )
            })}
          </div>
          <div className="h-px bg-stone" aria-hidden="true" />
          <div role="group" aria-label="Erfiðleikastig" className="flex flex-wrap items-center gap-2">
            <span className="w-full text-[11px] font-semibold tracking-[0.12em] text-slate uppercase sm:w-36">Erfiðleikastig</span>
            {difficultyFilters.map((d) => {
              const count = tours.filter((t) => matchesCategory(t, category) && matchesDifficulty(t, d)).length
              return (
                <button
                  key={d}
                  type="button"
                  className="chip"
                  aria-pressed={difficulty === d}
                  disabled={count === 0}
                  onClick={() => update(category, d)}
                >
                  {d === 'all' ? 'Öll stig' : d}
                  <span className="count">{count}</span>
                </button>
              )
            })}
            <Link to="/#oryggi" className="ml-1 inline-flex min-h-11 items-center text-sm font-medium text-slate">
              Hvað þýða stigin?
            </Link>
          </div>
        </div>

        <p className="-mb-4 text-sm font-medium text-slate" aria-live="polite">
          Sýni <strong className="text-charcoal">{filtered.length}</strong> af {tours.length} ferðum og námskeiðum
        </p>

        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:gap-8 [grid-template-columns:repeat(auto-fill,minmax(min(340px,100%),1fr))]">
            {filtered.map((t, i) => (
              <TourCard key={t.slug} tour={t} index={i} />
            ))}
          </div>
        ) : (
          <div className="panel flex flex-col items-center gap-4 py-14 text-center">
            <p className="font-display text-2xl font-bold">Engin ferð passar við þessa síu</p>
            <button type="button" className="btn btn-dark" onClick={() => update('all', 'all')}>
              Sýna allar ferðir
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

import { ArrowRight, ArrowUpRight, Backpack, Gauge, ShieldCheck } from 'lucide-react'
import { photos } from '../data/photos'
import { difficultyScale, links, team } from '../data/site'
import { Link } from '../lib/router'
import { DifficultyMeter, PhotoCredit, PhotoImg } from './Scene'

const external = { target: '_blank', rel: 'noopener noreferrer' } as const

export function About() {
  return (
    <section id="um" className="bg-snow py-24 sm:py-32" aria-labelledby="um-title">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <figure className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-lg bg-slate sm:aspect-[5/6]">
            <PhotoImg photo={photos.about} sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
          <div className="absolute -bottom-6 left-5 rounded-lg bg-charcoal px-6 py-5 text-snow shadow-[0_24px_48px_-24px_rgba(23,29,32,0.6)] sm:left-auto sm:-right-6">
            <p className="font-display text-4xl font-bold tracking-tight">2016</p>
            <p className="mt-1 text-sm text-mist">Stofnað af Ingu Dagmar Karlsdóttur</p>
          </div>
          <figcaption className="mt-10 sm:mt-4">
            <PhotoCredit photo={photos.about} className="text-muted" />
          </figcaption>
        </figure>

        <div className="flex min-w-0 flex-col gap-6">
          <p className="eyebrow">03 — Um Fjallaskíðun</p>
          <h2 id="um-title" className="h2">Persónuleg þjónusta og fagleg leiðsögn.</h2>
          <p className="lede max-w-2xl">
            Fjallaskíðun var stofnað árið 2016 og sérhæfir sig í fjallaskíðaferðum og námskeiðum. Fyrirtækið er í eigu Ingu Dagmar
            Karlsdóttur, sjúkraþjálfara, leiðsögumanns og ferðaskipuleggjanda með margra ára reynslu af fjallamennsku.
          </p>
          <p className="max-w-2xl leading-relaxed text-slate">
            Hjá Fjallaskíðun starfa reynslumiklir og faglærðir leiðsögumenn og skíðakennarar. Flestir hafa sótt menntun sína hjá
            Félagi íslenskra fjallaleiðsögumanna og Landsbjörgu.
          </p>
          <dl className="mt-2 grid grid-cols-2 gap-5 border-y border-line py-6">
            <div className="flex flex-col-reverse">
              <dt className="mt-1.5 text-sm leading-snug text-slate">Leiðsögureynsla Ingu Dagmar</dt>
              <dd className="font-display text-3xl font-bold tracking-tight sm:text-[40px]">18 ár</dd>
            </div>
            <div className="flex flex-col-reverse">
              <dt className="mt-1.5 text-sm leading-snug text-slate">Leiðsögumenn og kennarar á starfsmannasíðu</dt>
              <dd className="font-display text-3xl font-bold tracking-tight sm:text-[40px]">{team.length}</dd>
            </div>
          </dl>
          <ul className="grid gap-x-7 gap-y-3.5 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
            {team.map((p) => (
              <li key={p.name} className="flex flex-col gap-0.5 border-l-2 border-ice pl-3">
                <span className="text-[15px] font-semibold">{p.name}</span>
                <span className="text-sm text-slate">{p.role}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-wrap gap-3">
            <a className="btn btn-dark" href={links.about} {...external}>
              Meira um okkur <ArrowRight size={16} className="arrow" aria-hidden="true" />
            </a>
            <a className="btn btn-outline" href={links.staff} {...external}>
              Starfsfólk og réttindi
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

const safetyLinks = [
  {
    icon: ShieldCheck,
    title: 'Öryggi í ferðum',
    text: 'Láttu vita af undirliggjandi sjúkdómum eða ofnæmi. Þátttakendur eru ekki tryggðir af Fjallaskíðun í ferðum — kannaðu eigin tryggingar.',
    cta: 'Lesa öryggisupplýsingar',
    href: links.safety,
  },
  {
    icon: Backpack,
    title: 'Útbúnaðarlisti',
    text: 'Snjóflóðaýlir, skófla og stöng eru á listanum ásamt skíðabúnaði og fatnaði. Þar er einnig listi yfir leigubúnað.',
    cta: 'Sjá útbúnaðarlista',
    href: links.equipment,
  },
  {
    icon: Gauge,
    title: 'Erfiðleikastuðull ferða',
    text: 'Fimm stig, frá mjög auðveldum ferðum til erfiðra ferða fyrir vant fjallaskíðafólk.',
    cta: 'Lesa um stigin',
    href: links.difficulty,
  },
]

export function Safety() {
  return (
    <section id="oryggi" className="on-dark bg-charcoal py-24 text-snow sm:py-32" aria-labelledby="oryggi-title">
      <div className="wrap flex flex-col gap-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <p className="eyebrow">04 — Öryggi og undirbúningur</p>
            <h2 id="oryggi-title" className="h2">Fjallið krefst undirbúnings.</h2>
            <p className="lede max-w-xl">
              Fjallaskíðun fer fram í óbyggðum þar sem veður, snjóalög og snjóflóðahætta breytast hratt. Gott form, réttur búnaður og
              raunsætt mat á eigin reynslu skipta máli. Engin fjallaferð er áhættulaus og ferðir ráðast alltaf af aðstæðum.
            </p>
          </div>
          <figure className="flex flex-col gap-3">
            <div className="aspect-[16/10] overflow-hidden rounded-lg bg-slate">
              <PhotoImg photo={photos.safety} sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
            <figcaption>
              <PhotoCredit photo={photos.safety} className="text-[#9fb0b8]" />
            </figcaption>
          </figure>
        </div>

        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
          {safetyLinks.map(({ icon: Icon, ...l }) => (
            <a
              key={l.title}
              href={l.href}
              {...external}
              className="flex min-h-50 flex-col gap-3.5 rounded-lg border border-ice/22 bg-white/4 p-7 text-snow no-underline transition-colors hover:border-ice hover:bg-ice/10"
            >
              <Icon size={28} strokeWidth={1.6} className="text-ice" aria-hidden="true" />
              <span className="font-display text-[22px] font-bold">{l.title}</span>
              <span className="text-[15px] leading-relaxed text-mist">{l.text}</span>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-ice">
                {l.cta} <ArrowUpRight size={14} aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="font-display text-[22px] font-bold">Erfiðleikastig í hnotskurn</h3>
          <ol className="grid gap-0.5 overflow-hidden rounded-lg sm:grid-cols-2 lg:grid-cols-5">
            {difficultyScale.map((s, i) => (
              <li key={s.name} className="flex flex-col gap-2.5 bg-white/4 px-5 py-5.5">
                <DifficultyMeter level={i + 1} dark />
                <span className="font-display text-xl font-bold">{s.name}</span>
                <span className="text-sm leading-normal text-mist">{s.text}</span>
                <span className="mt-auto text-[13px] font-semibold text-ice">{s.hours}</span>
              </li>
            ))}
          </ol>
          <p className="text-[13px] text-[#9fb0b8]">Samantekt af síðunni Erfiðleikastuðull ferða á fjallaskidun.is.</p>
        </div>
      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-charcoal text-snow" aria-labelledby="cta-title">
      <div className="absolute inset-0 -z-10">
        <PhotoImg photo={photos.cta} sizes="100vw" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(17,23,26,0.78)_0%,rgba(17,23,26,0.45)_50%,rgba(17,23,26,0.15)_100%)]" aria-hidden="true" />
      <div className="wrap flex min-h-[560px] flex-col items-start justify-center gap-7 py-28 sm:min-h-[640px]">
        <p className="eyebrow">Næsta ævintýri</p>
        <h2 id="cta-title" className="h2 max-w-3xl [text-shadow:0_2px_24px_rgba(0,0,0,0.25)]" style={{ fontSize: 'clamp(2.75rem, 6.4vw, 6rem)' }}>
          Tilbúin(n) í næsta ævintýri?
        </h2>
        <Link to="/#ferdir" className="btn btn-light">
          Finndu þína ferð <ArrowRight size={18} className="arrow" aria-hidden="true" />
        </Link>
      </div>
      <div className="wrap absolute inset-x-0 bottom-4">
        <PhotoCredit photo={photos.cta} mood={false} className="text-right text-white/70" />
      </div>
    </section>
  )
}

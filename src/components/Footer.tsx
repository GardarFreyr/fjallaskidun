import { allPhotos } from '../data/photos'
import { contact, links } from '../data/site'
import { Link } from '../lib/router'
import { navItems } from './Header'

const external = { target: '_blank', rel: 'noopener noreferrer' } as const
const linkCls = 'text-[15px] leading-[1.9] text-mist no-underline hover:text-snow hover:underline hover:underline-offset-4'

export function Footer() {
  return (
    <footer id="samband" className="on-dark bg-night pt-24 pb-32 text-snow">
      <div className="wrap flex flex-col gap-14">
        <div className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]">
          <div className="flex flex-col gap-4">
            <p className="font-display text-[26px] font-bold tracking-tight">Fjallaskíðun</p>
            <p className="text-[15px] leading-relaxed text-mist">Fjallaskíðaferðir og námskeið á Íslandi frá 2016.</p>
          </div>

          <div className="flex flex-col">
            <h2 className="eyebrow mb-3">Hafa samband</h2>
            <a className={linkCls} href={`mailto:${contact.email}`}>{contact.email}</a>
            <a className={linkCls} href={contact.phoneHref}>{contact.phoneDisplay}</a>
            <address className="text-[15px] leading-[1.9] text-mist not-italic">{contact.address}</address>
          </div>

          <nav aria-label="Síður" className="flex flex-col">
            <h2 className="eyebrow mb-3">Síður</h2>
            {navItems.map((n) => (
              <Link key={n.label} to={n.to} className={linkCls}>
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col">
            <h2 className="eyebrow mb-3">Upplýsingar</h2>
            <a className={linkCls} href={links.terms} {...external}>Skilmálar og persónuvernd</a>
            <a className={linkCls} href={links.safety} {...external}>Öryggi í ferðum</a>
            <a className={linkCls} href={links.equipment} {...external}>Útbúnaðarlisti</a>
            <a className={linkCls} href={links.difficulty} {...external}>Erfiðleikastuðull ferða</a>
            <a className={linkCls} href={links.instagram} {...external}>Instagram</a>
            <a className={linkCls} href={links.facebook} {...external}>Facebook</a>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-ice/16 pt-7 text-[13px] leading-relaxed text-[#9fb0b8]">
          <h2 className="eyebrow">Ljósmyndir</h2>
          <p className="max-w-3xl">
            Ljósmyndir eru stemningsmyndir af Unsplash (Unsplash License) og flestar eru ekki teknar á Íslandi eða í ferðum
            Fjallaskíðunar. Þær verða leystar af hólmi með myndum Fjallaskíðunar.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {allPhotos.map((p) => (
              <li key={p.id}>
                <a href={p.pageUrl} target="_blank" rel="noopener noreferrer" className="text-[#9fb0b8] underline-offset-2 hover:text-snow hover:underline">
                  {p.photographer}
                  {p.location ? ` (${p.location})` : ''}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t border-ice/16 pt-7 text-[13px] leading-normal text-[#9fb0b8]">
          <span>
            Fjallaskíðun ({contact.legalName}) · Kt. {contact.kennitala}
          </span>
          <span>Óbindandi hönnunartillaga — ekki birtur vefur.</span>
        </div>
      </div>
    </footer>
  )
}

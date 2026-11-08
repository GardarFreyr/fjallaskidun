import { useEffect } from 'react'
import { CompareTray, Comparison } from './components/Comparison'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About, FinalCta, Safety } from './components/Sections'
import { TourFinder } from './components/TourFinder'
import { getTour } from './data/tours'
import { CompareProvider } from './lib/compare'
import { Link, useLocation, useScrollAfterNavigation } from './lib/router'
import { TourPage } from './pages/TourPage'

const HOME_TITLE = 'Fjallaskíðun — fjallaskíðaferðir á Íslandi (hönnunartillaga)'

function HomePage() {
  useEffect(() => {
    document.title = HOME_TITLE
  }, [])
  return (
    <main id="main">
      <Hero />
      <TourFinder />
      <Comparison />
      <About />
      <Safety />
      <FinalCta />
    </main>
  )
}

function NotFound() {
  useEffect(() => {
    document.title = 'Síða fannst ekki — Fjallaskíðun'
  }, [])
  return (
    <main id="main" className="wrap flex min-h-[60vh] flex-col items-start justify-center gap-6 py-24">
      <p className="eyebrow">404</p>
      <h1 className="h2">Þessi síða fannst ekki.</h1>
      <Link to="/#ferdir" className="btn btn-dark">
        Skoða ferðir
      </Link>
    </main>
  )
}

export default function App() {
  const { pathname, href } = useLocation()
  useScrollAfterNavigation(href)

  const tourMatch = pathname.match(/^\/ferdir\/([^/]+)\/?$/)
  const tour = tourMatch ? getTour(tourMatch[1]) : undefined
  const page = pathname === '/' ? <HomePage /> : tour ? <TourPage key={tour.slug} tour={tour} /> : <NotFound />

  return (
    <CompareProvider>
      <div id="top">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded focus:bg-snow focus:px-4 focus:py-3">
          Fara beint í efni
        </a>
        <div className="bg-ice px-4 py-2.5 text-center text-[13px] leading-snug font-medium text-charcoal">
          Óbindandi hönnunartillaga fyrir Fjallaskíðun · Ljósmyndir eru stemningsmyndir af Unsplash · Upplýsingar sóttar af
          fjallaskidun.is 8. nóvember 2026
        </div>
        <Header />
        {page}
        <Footer />
        {pathname === '/' && <CompareTray />}
      </div>
    </CompareProvider>
  )
}

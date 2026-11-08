/**
 * Photography used in the demo. Every image is from Unsplash and was checked
 * on 8 November 2026 to be under the free Unsplash License (not Unsplash+),
 * which allows commercial use without permission. Credit is given anyway.
 *
 * These are mood images: most are not from Fjallaskíðun's tours or even from
 * Iceland, so the UI labels them "Stemningsmynd" and lists credits in the footer.
 * Replace with Fjallaskíðun's own licensed photos before launch.
 */

export interface Photo {
  /** Unsplash image id, served from images.unsplash.com. */
  id: string
  alt: string
  photographer: string
  /** Unsplash photo page (with the referral parameters Unsplash asks for). */
  pageUrl: string
  /** Only set where the photographer states it. */
  location: string | null
  /** CSS object-position for better crops. */
  position?: string
}

const ref = '?utm_source=fjallaskidun_demo&utm_medium=referral'

export const photos = {
  hero: {
    id: 'photo-1785970929564-f4683c3c79f2',
    alt: 'Skíðamaður á leið yfir víðáttumikil, snævi þakin fjöll í ljósaskiptunum',
    photographer: 'Matthew Stephenson',
    pageUrl: `https://unsplash.com/photos/ZkbfnD0Kr_g${ref}`,
    location: null,
    position: '55% 85%',
  },
  sveinstindur: {
    id: 'photo-1640189668430-f9791d4db74a',
    alt: 'Fjallaskíðamaður gengur upp brattan snjó með skíðin á bakpokanum',
    photographer: 'Johannes Andersson',
    pageUrl: `https://unsplash.com/photos/pmtllkyavOk${ref}`,
    location: 'Ahkka, Svíþjóð',
    position: '35% 40%',
  },
  trollaskagi: {
    id: 'photo-1641369022944-ff17797243c7',
    alt: 'Hópur á fjallaskíðum gengur upp hlíð ofan við fjörð',
    photographer: 'Hendrik Morkel',
    pageUrl: `https://unsplash.com/photos/LrHwwYXnR6Y${ref}`,
    location: 'Lyngen, Noregi',
    position: '50% 55%',
  },
  birnudalstindur: {
    id: 'photo-1610049957231-1b47d1bc06ad',
    alt: 'Tveir skíðamenn renna sér niður langa, opna brekku',
    photographer: 'Shutter Speed',
    pageUrl: `https://unsplash.com/photos/vBF2yw6upkc${ref}`,
    location: null,
    position: '40% 50%',
  },
  snaefellsjokull: {
    id: 'photo-1642841220705-b03194dd9de7',
    alt: 'Fjórir á fjallaskíðum ganga upp ávala snjóbungu í heiðskíru veðri',
    photographer: 'Hendrik Morkel',
    pageUrl: `https://unsplash.com/photos/4b30K9Qw3Iw${ref}`,
    location: 'Alparnir, við landamæri Ítalíu og Sviss',
    position: '55% 60%',
  },
  kvoldferd: {
    id: 'photo-1518784095177-ef1da6313126',
    alt: 'Þrír með skíði á bakinu á fjallsbrún við sólsetur',
    photographer: 'Joris Berthelot',
    pageUrl: `https://unsplash.com/photos/EnTU_hr9wPA${ref}`,
    location: 'Plateau de Bure, Frakklandi',
    position: '65% 45%',
  },
  namskeid: {
    id: 'photo-1769945045838-c746722e1a24',
    alt: 'Hópur á fjallaskíðum fylgir slóð upp snjóbrekku í sól',
    photographer: 'Mohammad Eskandari',
    pageUrl: `https://unsplash.com/photos/K8cZ8oTtVYE${ref}`,
    location: null,
    position: '50% 45%',
  },
  about: {
    id: 'photo-1622809116665-7725daaf660a',
    alt: 'Hópur í leiðsögn gengur á skriðjökli á Íslandi',
    photographer: 'Gashif Rheza',
    pageUrl: `https://unsplash.com/photos/8yG-zSpFMEU${ref}`,
    location: 'Ísland',
    position: '45% 60%',
  },
  safety: {
    id: 'photo-1673994841979-a8d3983d4a51',
    alt: 'Tveir á fjallaskíðum ganga upp hlíð í skýjuðu veðri',
    photographer: 'Tom Patmore',
    pageUrl: `https://unsplash.com/photos/G4D37KBJzGw${ref}`,
    location: null,
    position: '50% 50%',
  },
  cta: {
    id: 'photo-1548177709-b30fbcadff14',
    alt: 'Snævi þaktir tindar á Íslandi undir bleikum himni',
    photographer: 'Shawn',
    pageUrl: `https://unsplash.com/photos/Fko5woR3UKg${ref}`,
    location: 'Ísland',
    position: '50% 70%',
  },
} satisfies Record<string, Photo>

export const allPhotos: Photo[] = Object.values(photos)

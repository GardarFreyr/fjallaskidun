/**
 * Tour content, taken from fjallaskidun.is on 8 November 2026.
 * Kept as plain structured data so it can later be moved to a CMS.
 * `null` means the current site does not state the value — the UI then
 * shows "Upplýsingar ekki tiltækar" instead of inventing one.
 */

import { photos, type Photo } from './photos'

export type Category = 'tour' | 'heli' | 'course'
export type Difficulty = 'Mjög auðveld' | 'Auðveld' | 'Miðlungs' | 'Krefjandi' | 'Erfið'

export interface Tour {
  slug: string
  name: string
  category: Category
  categoryLabel: string
  region: string
  difficulty: Difficulty | null
  duration: string
  durationShort: string
  price: string
  /** Shown under the price. */
  priceNote: string
  /** Who the tour is for, as stated on the site. */
  audience: string
  groupSize: string | null
  distance: string | null
  summary: string
  description: string[]
  requirements: string
  included: string[]
  notIncluded: string[]
  equipment: string
  /** 'site' = book on the existing product page; 'email' = the site asks for an email inquiry. */
  booking: 'site' | 'email'
  sourceUrl: string
  bookingNote: string
  photo: Photo
}

export const NOT_AVAILABLE = 'Upplýsingar ekki tiltækar'
export const CONTACT_EMAIL = 'info@fjallaskidun.is'

const STANDARD_EQUIPMENT =
  'Útbúnaðarlisti er sendur til þátttakenda fyrir brottför. Snjóflóðaýlir, skófla og snjóflóðastöng eru hluti af listanum.'

export const tours: Tour[] = [
  {
    slug: 'sveinstindur',
    name: 'Sveinstindur',
    category: 'tour',
    categoryLabel: 'Fjallaskíðaferð',
    region: 'Öræfajökull',
    difficulty: 'Erfið',
    duration: 'Dagsferð · 12–16 klst.',
    durationShort: 'Dagsferð',
    price: '49.900 kr.',
    priceNote: 'á mann',
    audience: 'Vant fjallaskíðafólk',
    groupSize: 'Allt að 20 manns',
    distance: '24–26 km · 2050 m hækkun',
    summary: 'Næsthæsti tindur landsins, 2044 m, og um 8 km skíðabrekka niður.',
    description: [
      'Sveinstindur (2044 m) er næsthæsti tindur Íslands, aðeins 66 m lægri en Hvannadalshnjúkur, og rís á austurbrún Öræfajökulsöskjunnar.',
      'Ferðin er einstaklega skemmtileg en krefjandi. Gengið er upp Hnappavallaleið eða frá Kvískerjum og niðurleiðin er um 8 km skíðabrekka.',
    ],
    requirements:
      'Þú þarft að vera í góðu líkamlegu formi og hafa gott vald á fjallaskíðum til að fara í þessa ferð.',
    included: ['Leiðsögn og skipulag'],
    notIncluded: ['Gisting', 'Matur', 'Akstur — á eigin vegum'],
    equipment: STANDARD_EQUIPMENT,
    booking: 'site',
    sourceUrl: 'https://fjallaskidun.is/skida/sveinstindur/',
    bookingNote: 'Hægt er að senda fyrirspurn ef þú vilt fara þessa ferð aðra daga.',
    photo: photos.sveinstindur,
  },
  {
    slug: 'trollaskagi-thyrluskidun',
    name: 'Tröllaskagi – Þyrluskíðun',
    category: 'heli',
    categoryLabel: 'Þyrluskíðun',
    region: 'Tröllaskagi · Siglufjörður',
    difficulty: 'Miðlungs',
    duration: '2 dagar · gist á Siglufirði',
    durationShort: '2 dagar',
    price: '49.900 kr.',
    priceNote: 'Þyrluskutl er ekki innifalið í verði',
    audience: 'Þau sem eru vön fjallaskíðum',
    groupSize: '10–20 manns',
    distance: null,
    summary: 'Fjallaskíðaferð um tinda yfir 1000 m, með valkvæðri þyrluskíðun einn daginn.',
    description: [
      'Á Tröllaskaga eru fjölmargir tindar yfir 1000 m og sumar brekkurnar ná alla leið niður að sjó. Ferðin reynir bæði á úthald og skíðatækni og er krefjandi á köflum.',
      'Einn daginn er boðið upp á þyrluskíðun (toppaskutl) fyrir þá sem það vilja. Hvaða tindar verða fyrir valinu og verð þyrluskutls kemur í ljós þegar nær dregur ferð.',
      'Lagt er af stað frá Reykjavík á föstudegi og komið aftur á mánudegi. Þátttakendur bóka sjálfir gistingu.',
    ],
    requirements:
      'Þú þarft að vera í góðu líkamlegu formi og hafa gott vald á skíðum til að fara í þessa ferð.',
    included: ['Leiðsögn og skipulag'],
    notIncluded: ['Gisting — þátttakendur bóka sjálfir', 'Þyrluskutl', 'Matur', 'Akstur'],
    equipment: STANDARD_EQUIPMENT,
    booking: 'site',
    sourceUrl: 'https://fjallaskidun.is/skida/trollaskagi-thyrluskidun/',
    bookingNote: 'Staðfestingargjald er ekki endurgreitt.',
    photo: photos.trollaskagi,
  },
  {
    slug: 'birnudalstindur',
    name: 'Birnudalstindur',
    category: 'tour',
    categoryLabel: 'Fjallaskíðaferð',
    region: 'Suðursveit',
    difficulty: 'Miðlungs',
    duration: 'Dagsferð · 6–8 klst. á skíðum',
    durationShort: 'Dagsferð',
    price: '49.900 kr.',
    priceNote: 'á mann',
    audience: 'Vant fjallaskíðafólk',
    groupSize: '8–20 manns',
    distance: '14–16 km · 800 m hækkun · 1400 m lækkun',
    summary: 'Frá 1326 m tindi liggur ein lengsta og skemmtilegasta skíðabrekka landsins.',
    description: [
      'Birnudalstindur (1326 m) tilheyrir fjallgarðinum milli Breiðamerkurjökuls og Skálafellsjökuls í Suðursveit.',
      'Gengið er upp frá Jöklaseli um Skálafellsjökul eða frá Staðardal um Birnudal. Af toppnum er ein lengsta og skemmtilegasta skíðabrekka landsins.',
    ],
    requirements:
      'Til þess að fara í þessa ferð þarftu að vera í góðu líkamlegu formi og hafa gott vald á fjallaskíðum.',
    included: [],
    notIncluded: [
      'Gisting — eina nótt fyrir og eftir ferð á Hala eða Gerði',
      'Kvöldmatur',
      'Akstur — á eigin vegum',
    ],
    equipment: STANDARD_EQUIPMENT,
    booking: 'site',
    sourceUrl: 'https://fjallaskidun.is/skida/birnudalstindur2/',
    bookingNote:
      'Síðustu auglýstu ferð var frestað vegna veðurs. Sendu fyrirspurn um aðrar dagsetningar.',
    photo: photos.birnudalstindur,
  },
  {
    slug: 'snaefellsjokull',
    name: 'Snæfellsjökull',
    category: 'tour',
    categoryLabel: 'Fjallaskíðaferð',
    region: 'Snæfellsnes',
    difficulty: 'Auðveld',
    duration: 'Dagsferð · 5–7 klst. á skíðum',
    durationShort: 'Dagsferð',
    price: '19.900 kr.',
    priceNote: 'á mann',
    audience: 'Byrjendur jafnt sem vanir',
    groupSize: 'Allt að 20 manns',
    distance: '12–16 km · 1100 m hækkun',
    summary: 'Jökullinn á enda Snæfellsness, 1446 m — ferð fyrir byrjendur jafnt sem vana.',
    description: [
      'Snæfellsjökull (1446 m) er mjög skemmtilegur og auðveldur að skíða ef aðstæður eru góðar.',
      'Oftast er gengið upp frá Stapafelli en einnig frá Dagverðará. Hvort ferðin er farin veltur á veðri og snjóalögum.',
    ],
    requirements:
      'Ferðin er ætluð byrjendum jafnt sem vönu fólki. Akstur frá Reykjavík á Snæfellsnes og til baka er á eigin vegum.',
    included: [],
    notIncluded: ['Akstur frá Reykjavík og til baka'],
    equipment: STANDARD_EQUIPMENT,
    booking: 'email',
    sourceUrl: 'https://fjallaskidun.is/skida/snaefellsjokull2/',
    bookingNote: 'Á núverandi vef er þessi ferð bókuð með fyrirspurn á info@fjallaskidun.is.',
    photo: photos.snaefellsjokull,
  },
  {
    slug: 'kvoldferd-i-nagrenni-reykjavikur',
    name: 'Kvöldferð í nágrenni Reykjavíkur',
    category: 'tour',
    categoryLabel: 'Fjallaskíðaferð',
    region: 'Esja, Skálafell, Hengill eða Bláfjöll',
    difficulty: 'Miðlungs',
    duration: 'Kvöldferð · kl. 18:00–22:00',
    durationShort: 'Kvöld · um 4 klst.',
    price: '7.900 kr.',
    priceNote: 'á mann',
    audience: 'Byrjendur jafnt sem lengra komnir',
    groupSize: '5–10 manns',
    distance: null,
    summary: 'Fjallaskíði eftir vinnu á fjalli nálægt bænum, valið eftir snjó og skíðafæri.',
    description: [
      'Lagt er af stað úr bænum kl. 18:00 og komið til baka um kl. 22:00.',
      'Farið er á Esjuna, Skálafell, Hengilinn eða í Bláfjöll — þangað sem er nægur snjór og gott skíðafæri þann daginn.',
    ],
    requirements:
      'Byrjendur jafnt sem lengra komnir. Kröfur um líkamlegt form eru ekki tilgreindar á vefnum.',
    included: [],
    notIncluded: [],
    equipment: STANDARD_EQUIPMENT,
    booking: 'email',
    sourceUrl: 'https://fjallaskidun.is/skida/kvoldferd-i-nagrenni-reykjavikur2/',
    bookingNote:
      'Hægt er að bóka kvöldferð fyrir fimm eða fleiri með fyrirspurn á info@fjallaskidun.is.',
    photo: photos.kvoldferd,
  },
  {
    slug: 'fjallaskidanamskeid',
    name: 'Fjallaskíðanámskeið',
    category: 'course',
    categoryLabel: 'Námskeið',
    region: 'Við höfuðborgina',
    difficulty: null,
    duration: '1 kvöld og 1 dagur',
    durationShort: '1 kvöld + 1 dagur',
    price: '29.900 kr.',
    priceNote: 'á mann',
    audience: 'Byrjendur og þau sem vilja rifja upp',
    groupSize: '5–10 manns',
    distance: null,
    summary: 'Fræðslukvöld og verklegur dagur um grunnatriði fjallaskíðunar og snjóflóðavarnir.',
    description: [
      'Námskeiðið samanstendur af einu fræðslukvöldi og einum verklegum degi við höfuðborgina.',
      'Markmiðið er að auka þekkingu á grundvallaratriðum fjallaskíðunar. Meðal efnis er mat á snjóflóðahættu og notkun snjóflóðaýlis, snjóflóðastangar og skóflu.',
      'Námskeiðið veitir ekki sérstaka menntun eða réttindi.',
    ],
    requirements:
      'Ætlað þeim sem eru að byrja að stunda fjallaskíði og þeim sem vilja rifja upp.',
    included: ['Kennsla, leiðsögn og skipulag'],
    notIncluded: [
      'Akstur',
      'Skíðabúnaður',
      'Snjóflóðaýlir, skófla og snjóflóðastöng',
      'Broddar, belti og ísöxi',
    ],
    equipment:
      'Hver þátttakandi kemur með eigin fjallaskíðabúnað, snjóflóðaýli, snjóflóðastöng og skóflu. Farið er yfir notkun þeirra á námskeiðinu.',
    booking: 'site',
    sourceUrl: 'https://fjallaskidun.is/skida/namskeid-fyrir-byrjendur-i-fjallaskidun/',
    bookingNote: 'Ef námskeið er afbókað sjö dögum fyrir upphaf fæst 80% gjalds endurgreitt.',
    photo: photos.namskeid,
  },
]

export const difficultyLevel: Record<Difficulty, number> = {
  'Mjög auðveld': 1,
  Auðveld: 2,
  Miðlungs: 3,
  Krefjandi: 4,
  Erfið: 5,
}

export const categoryFilters: { key: Category | 'all'; label: string }[] = [
  { key: 'all', label: 'Allar ferðir' },
  { key: 'tour', label: 'Fjallaskíðaferðir' },
  { key: 'heli', label: 'Þyrluskíðun' },
  { key: 'course', label: 'Námskeið' },
]

/** Only levels that at least one tour actually has. */
export const difficultyFilters: (Difficulty | 'all')[] = [
  'all',
  ...(['Mjög auðveld', 'Auðveld', 'Miðlungs', 'Krefjandi', 'Erfið'] as Difficulty[]).filter((d) =>
    tours.some((t) => t.difficulty === d),
  ),
]

export function getTour(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug)
}

export function inquiryHref(tourName: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Fyrirspurn: ${tourName}`)}`
}

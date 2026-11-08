/** Company facts and links, taken from fjallaskidun.is on 8 November 2026. */

export const SITE = 'https://fjallaskidun.is'

export const links = {
  about: `${SITE}/um-fjallaskidun/`,
  staff: `${SITE}/starfsfolk/`,
  terms: `${SITE}/skilmalar/`,
  safety: `${SITE}/oryggi-i-ferdum/`,
  equipment: `${SITE}/utbunadarlisti/`,
  difficulty: `${SITE}/erfidleikastudull-ferda/`,
  instagram: 'https://instagram.com/fjallaskidun',
  facebook: 'https://facebook.com/fjallaskidi',
}

export const contact = {
  email: 'info@fjallaskidun.is',
  phoneDisplay: '+354 847 1118',
  phoneHref: 'tel:+3548471118',
  address: 'Brekkustígur 19, 101 Reykjavík',
  legalName: 'Herðubreið útivist og heilsa ehf.',
  kennitala: '561216-1770',
}

export const team = [
  { name: 'Inga Dagmar Karlsdóttir', role: 'Eigandi · fjallaskíðaleiðsögumaður AIMG og sjúkraþjálfari' },
  { name: 'Guðmundur Arnar Ástvaldsson', role: 'Leiðsögumaður' },
  { name: 'Selma Benediktsdóttir', role: 'Leiðsögukona og skíðakennari' },
  { name: 'Kjartan Þór Þorbjörnsson', role: 'Leiðsögumaður' },
  { name: 'Hrafnkell Sigtryggsson', role: 'Skíðakennari' },
  { name: 'Egill Ingi Jónsson', role: 'Skíðakennari' },
]

/** Summary of the "Erfiðleikastuðull ferða" page. */
export const difficultyScale = [
  { name: 'Mjög auðveld', text: 'Hentar fólki án reynslu.', hours: 'Oftast 2–3 klst.' },
  { name: 'Auðveld', text: 'Þokkalega gott form og einhver reynsla nauðsynleg.', hours: 'Oftast 3–5 klst.' },
  { name: 'Miðlungs', text: 'Frekar gott form og talsverð reynsla.', hours: 'Oftast 5–7 klst.' },
  { name: 'Krefjandi', text: 'Aðeins fyrir fólk í mjög góðu formi með reynslu.', hours: 'Oftast 6–9 klst.' },
  { name: 'Erfið', text: 'Einungis fyrir vant fjallaskíðafólk í mjög góðu formi.', hours: 'Oftast 8–12 klst.' },
]

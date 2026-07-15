export const homeHero = {
  brand: 'Rogue Coding Academy',
  headline: 'Local coding academy. In-person software coaching.',
  supporting:
    'Not another online bootcamp. Rogue Coding Academy is hands-on software development coaching in Grants Pass — built for the Rogue Valley.',
  primaryCta: { href: '/courses', label: 'Explore courses' },
  secondaryCta: { href: '/team', label: 'Meet the founder' },
} as const;

export const eras = [
  {
    id: 'era-70s',
    year: '1970\'s',
    title: 'Machines enter the room',
    body: 'Room-sized computers. Punch cards. Whole industries bent around a few who could speak machine.',
    device: 'mainframe',
  },
  {
    id: 'era-pcs',
    year: '1980\'s–90\'s',
    title: 'Computing comes home',
    body: 'Personal computers put creation on every desk. The barrier dropped — and the pace spiked.',
    device: 'desktop',
  },
  {
    id: 'era-cloud',
    year: '2000\'s',
    title: 'Infrastructure goes elastic',
    body: 'Cloud made servers someone else’s problem. You no longer needed to be a networking and hardware expert to ship apps and services.',
    device: 'cloud',
  },
  {
    id: 'era-phones',
    year: '2010\'s',
    title: 'Pocket-sized platforms',
    body: 'Smartphones put software in every hand. Apps remade how we work, buy, and learn overnight.',
    device: 'phone',
  },
  {
    id: 'era-chatgpt',
    year: '2022',
    title: 'ChatGPT goes public',
    body: 'November 30: a chatbot that could write, reason, and code in plain English. Consumer AI left the lab — and the current got faster overnight.',
    device: 'chat',
  },
  {
    id: 'era-ms-ai-code',
    year: '2025',
    title: 'AI writes the codebase',
    body: 'Satya Nadella (CEO of Microsoft): as much as 30% of Microsoft’s code is now written by AI. What took decades to reinvent once is shifting in single fiscal years.',
    device: 'code',
  },
  {
    id: 'era-fable',
    year: '2026',
    title: 'Mythos-class power, governed',
    body: 'Anthropic launches Claude Fable 5 — Mythos-level capability. A model so powerful the US government delays release to prepare; a model so capable that it has an AI babysitter which determines which questions it will answer.',
    device: 'fable',
  },
] as const;

export const thesis = {
  eyebrow: 'Why now',
  headline: 'Ride the AI-era rapids — with coaching beside you',
  body: 'AI disruption is faster and deeper than any wave before it. Personalized, local coaching is how you stay upright in the current — and come out ahead.',
  cta: { href: '/courses', label: 'Find your course' },
} as const;

export const localClose = {
  eyebrow: 'Rogue Valley',
  headline: 'High-quality tech, right here',
  body: 'Premier software and AI coaching for Grants Pass and the Rogue Valley — serious craft, local access, in person.',
} as const;

export const footerCopy = {
  credit: 'Grants Pass · Rogue Valley',
} as const;

export const coursesPage = {
  title: 'Courses',
  description:
    'Three levels — beginner through advanced. AI is woven through every course; Advanced AI Engineering goes deep. Filter by level and topic to find what fits.',
  emptyTitle: 'Catalog loading',
  emptyBody:
    'Course offerings are being finalized. Request a seat below and we will match you when cohorts open.',
} as const;

export const teamPage = {
  title: 'Founding team',
  description:
    'Meet the people building Rogue Coding Academy — starting with founder and primary instructor Diego Ibarra.',
} as const;

export const formCopy = {
  title: 'Request a seat',
  supporting:
    'Tell us who you are and which course interests you. We reply from Grants Pass within a few business days.',
  submitLabel: 'Request a seat',
  success: 'Your email client should open with a prefilled message. Send it and we will follow up.',
  privacy: 'We only use your details to respond about class enrollment.',
} as const;

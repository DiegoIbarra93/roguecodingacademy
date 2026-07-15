export const homeHero = {
  brand: 'Rogue Coding Academy',
  headline: 'Ride the rapids. Build what lasts.',
  supporting:
    'Technology has always moved fast. AI made the current swifter. Master software — then harness AI.',
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
    id: 'era-ai',
    year: 'Now',
    title: 'AI accelerates everything',
    body: 'Models write, reason, and ship alongside us. The winners know how software works — and how to ride AI.',
    device: 'ai',
  },
] as const;

export const thesis = {
  eyebrow: 'The rapids',
  headline: 'Software craft + AI literacy = leverage',
  body: 'Disruption was never optional. In the AI era it is constant. Those who combine deep fundamentals with fluent AI use do not get swept under — they run the rapids.',
  cta: { href: '/courses', label: 'Find your course' },
} as const;

export const localClose = {
  eyebrow: 'Rogue Valley',
  headline: 'High-quality tech, right here',
  body: 'Bringing premier software craft and AI training to Grants Pass and the Rogue Valley — serious curriculum, local access.',
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

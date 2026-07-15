export const site = {
  name: 'Rogue Coding Academy',
  shortName: 'Rogue',
  tagline: 'Harness AI with real software craft.',
  description:
    'Premier coding academy in Grants Pass, OR. Learn software fundamentals and AI literacy to ride the rapids of technology.',
  url: 'https://roguecoding.academy',
  email: 'coding@ibarraventures.com',
  locale: 'en_US',
  location: {
    city: 'Grants Pass',
    region: 'OR',
    regionFull: 'Oregon',
    country: 'US',
    areaServed: 'Southern Oregon',
  },
  orgId: 'https://roguecoding.academy/#organization',
  websiteId: 'https://roguecoding.academy/#website',
} as const;

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/team', label: 'Team' },
] as const;

export const primaryCta = {
  href: '/courses#request-seat',
  label: 'Request a seat',
} as const;

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string[];
  highlights: string[];
  /** Path under src/assets/ — optional until photo ships */
  photo?: string;
  sameAs?: string[];
};

export const team: TeamMember[] = [
  {
    id: 'diego-ibarra',
    name: 'Diego Ibarra',
    role: 'Founder & Primary Instructor',
    bio: [
      'Nine-year veteran of software engineering with deep product and engineering experience. Currently VP of Engineering.',
      'Has built products used by hundreds of thousands of people and generating millions of dollars in revenue.',
      'An entrepreneur at heart who builds applications constantly — and founded Rogue Coding Academy to bring that craft to Southern Oregon.',
    ],
    highlights: [
      '9 years software engineering',
      'Product & engineering leadership',
      'VP of Engineering',
      'Products with 100k+ users',
      'Millions in product revenue',
      'Builder-entrepreneur',
    ],
  },
];

export function getFounder() {
  return team.find((m) => m.id === 'diego-ibarra') ?? team[0];
}

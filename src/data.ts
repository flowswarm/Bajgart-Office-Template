export interface Project {
  id: string;
  title: string;
  tags: string[];
  description: string;
  images: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'goals',
    title: 'Goals',
    tags: ['Fintech', 'Crypto'],
    description: 'An energy-led identity for a social savings app powered by cryptocurrency, built to motivate users, encourage sharing, and help turn long-term goals into real momentum.',
    images: [
      'https://picsum.photos/seed/goals1/800/600',
      'https://picsum.photos/seed/goals2/800/600',
      'https://picsum.photos/seed/goals3/800/600',
    ]
  },
  {
    id: 'yield',
    title: 'Yield',
    tags: ['Fintech', 'Crypto'],
    description: 'A sophisticated, elevated identity for a private conference bringing together onchain yield leaders. Designed as a closed-door experience, the brand balances exclusivity with clarity and is built to scale across future events.',
    images: [
      'https://picsum.photos/seed/yield1/800/600',
      'https://picsum.photos/seed/yield2/800/600',
      'https://picsum.photos/seed/yield3/800/600',
    ]
  },
  {
    id: 'abyssale',
    title: 'Abyssale',
    tags: ['Tools', 'AI'],
    description: "Abyssale's logo was expanded into a flexible identity system, created together with Nemesis, reflecting the product's ability to turn a single design into hundreds of on-brand assets across every channel at AI scale.",
    images: [
      'https://picsum.photos/seed/abyssale1/800/600',
      'https://picsum.photos/seed/abyssale2/800/600',
      'https://picsum.photos/seed/abyssale3/800/600',
    ]
  },
  {
    id: 'tilt',
    title: 'Tilt',
    tags: ['Fintech'],
    description: "We executed Ragged Edge's refreshed identity and delivered key applications to launch Tilt's new brand, from their website to credit card production, emails, and other essential touchpoints.",
    images: [
      'https://picsum.photos/seed/tilt1/800/600',
      'https://picsum.photos/seed/tilt2/800/600',
      'https://picsum.photos/seed/tilt3/800/600',
    ]
  },
  {
    id: 'student',
    title: 'Student',
    tags: ['Ed/Fun Tech', 'Communities'],
    description: 'An identity for a platform helping students find their first roles, capturing the shift from uncertainty to ambition and creating a space where young professionals and organisations can meet. Created together with Nemesis.',
    images: [
      'https://picsum.photos/seed/student1/800/600',
      'https://picsum.photos/seed/student2/800/600',
      'https://picsum.photos/seed/student3/800/600',
    ]
  },
  {
    id: 'vetstor',
    title: 'Vetstor',
    tags: ['Tools', 'Health'],
    description: 'A warm, characterful identity for a pet-care platform shaped by the bond between humans and their animals, drawing inspiration from real pet profiles and owner-made tags to capture familiar quirks and genuine companionship.',
    images: [
      'https://picsum.photos/seed/vetstor1/800/600',
      'https://picsum.photos/seed/vetstor2/800/600',
      'https://picsum.photos/seed/vetstor3/800/600',
    ]
  },
  {
    id: 'primer',
    title: 'Primer',
    tags: ['Payments', 'B2B'],
    description: 'New brand assets and a redesigned careers page helped keep Primer\'s identity moving forward, supporting their mission to deliver solutions for every step of the payment journey.',
    images: [
      'https://picsum.photos/seed/primer1/800/600',
      'https://picsum.photos/seed/primer2/800/600',
      'https://picsum.photos/seed/primer3/800/600',
    ]
  },
  {
    id: 'eightyseven',
    title: 'Eightyseven website',
    tags: ['Real Estate', 'VC'],
    description: 'Together with Nemesis, we shaped a digital home for 87, a company redefining the future of construction and real estate through precision, technology, and purpose.',
    images: [
      'https://picsum.photos/seed/87-1/800/600',
      'https://picsum.photos/seed/87-2/800/600',
      'https://picsum.photos/seed/87-3/800/600',
    ]
  },
  {
    id: 'karman',
    title: 'Karman website',
    tags: ['Consulting', 'B2B'],
    description: 'Working alongside Nemesis, we translated Karman\'s brand vision into a website that reflects their forward momentum and their mission to help startups and scale-ups accelerate with clarity and confidence.',
    images: [
      'https://picsum.photos/seed/karman1/800/600',
      'https://picsum.photos/seed/karman2/800/600',
      'https://picsum.photos/seed/karman3/800/600',
    ]
  },
  {
    id: 'moikka',
    title: 'Moikka',
    tags: ['E-commerce'],
    description: 'A new brand built for an e-commerce store offering Scandinavian furniture and quirky home décor.',
    images: [
      'https://picsum.photos/seed/moikka1/800/600',
      'https://picsum.photos/seed/moikka2/800/600',
    ]
  },
  {
    id: 'empower',
    title: 'Empower',
    tags: ['Fintech'],
    description: 'We evolved the brand of a global fintech democratizing access to credit.',
    images: [
      'https://picsum.photos/seed/empower1/800/600',
      'https://picsum.photos/seed/empower2/800/600',
    ]
  },
  {
    id: 'birdwingo',
    title: 'Birdwingo',
    tags: ['Fintech'],
    description: 'A purpose-led identity for a new investing platform about conviction and meaning.',
    images: [
      'https://picsum.photos/seed/birdwingo1/800/600',
      'https://picsum.photos/seed/birdwingo2/800/600',
    ]
  },
  {
    id: 'girlhood',
    title: 'Girlhood',
    tags: ['Ed/Fun Tech', 'Communities'],
    description: 'A warm, intelligent identity for a women\'s community built on honest conversations.',
    images: [
      'https://picsum.photos/seed/girlhood1/800/600',
      'https://picsum.photos/seed/girlhood2/800/600',
    ]
  }
];

export const PLAYGROUND_ITEMS = [
  { id: 1, src: 'https://picsum.photos/seed/pg1/400/400', ratio: '1:1' },
  { id: 2, src: 'https://picsum.photos/seed/pg2/600/400', ratio: '3:2' },
  { id: 3, src: 'https://picsum.photos/seed/pg3/400/600', ratio: '2:3' },
  { id: 4, src: 'https://picsum.photos/seed/pg4/400/400', ratio: '1:1' },
  { id: 5, src: 'https://picsum.photos/seed/pg5/600/400', ratio: '3:2' },
  { id: 6, src: 'https://picsum.photos/seed/pg6/400/600', ratio: '2:3' },
  { id: 7, src: 'https://picsum.photos/seed/pg7/400/400', ratio: '1:1' },
  { id: 8, src: 'https://picsum.photos/seed/pg8/600/400', ratio: '3:2' },
];

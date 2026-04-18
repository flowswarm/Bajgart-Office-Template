export interface Project {
  id: string;
  title: string;
  tags: string[];
  description: string;
  images: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'alex-mobile-detailing',
    title: 'Alex Mobile Detailing',
    tags: ['Automotive', 'Service Business'],
    description: 'A premium, full-service website for a mobile car detailing company. We built a high-impact dark-themed design with cinematic hero imagery, integrated booking system, service package breakdowns with tiered pricing, a before-and-after gallery, and customer testimonial sections — all optimized for mobile-first conversions.',
    images: [
      '/portfolio/car_detail_hero.png',
      '/portfolio/car_detail_services.png',
      '/portfolio/car_detail_about.png',
      '/portfolio/car_detail_footer.png',
    ]
  },
  {
    id: 'evergreen-epoxy',
    title: 'Evergreen Epoxy',
    tags: ['Home Services', 'Lead Generation'],
    description: 'A bold, conversion-focused website for an epoxy flooring company. We designed a striking dark theme with neon accents, built an interactive floor visualizer tool, integrated a quote request funnel with smart form validation, showcased 5-star reputation proof, and created detailed service pages for metallic, flake, and solid epoxy systems.',
    images: [
      '/portfolio/epoxy_hero.png',
      '/portfolio/epoxy_services.png',
      '/portfolio/epoxy_about.png',
      '/portfolio/epoxy_footer.png',
    ]
  },
  {
    id: '3cs-cleaning',
    title: '3C\'s Professional Cleaning',
    tags: ['Cleaning', 'Commercial Services'],
    description: 'A fresh, trust-building website for a commercial cleaning company. We created a light, airy design with floating bubble animations, built out service pages with pricing calculators, integrated customer reviews with 4.5-star social proof, added a click-to-call CTA for instant conversions, and designed the entire experience to feel as clean as the service itself.',
    images: [
      '/portfolio/cleaning_hero.png',
      '/portfolio/cleaning_services.png',
      '/portfolio/cleaning_about.png',
      '/portfolio/cleaning_footer.png',
    ]
  },
  {
    id: 'rc-sons-painting',
    title: 'RC & Sons Painting',
    tags: ['Painting', 'Home Services'],
    description: 'A refined, trust-building website for a family-owned painting company with 35+ years of experience. We designed a clean, navy-and-cream color palette with elegant serif typography, built out service pages with before-and-after project galleries, integrated a quote request form, an AI chat widget, and a "Call or Text Now" CTA — all crafted to reflect the premium quality of their craftsmanship.',
    images: [
      '/portfolio/painter_hero.png',
      '/portfolio/painter_services.png',
      '/portfolio/painter_about.png',
      '/portfolio/painter_footer.png',
    ]
  },
];

export const PLAYGROUND_ITEMS = [
  { id: 1, src: '/portfolio/car_detail_hero.png' },
  { id: 2, src: '/portfolio/epoxy_hero.png' },
  { id: 3, src: '/portfolio/cleaning_hero.png' },
  { id: 4, src: '/portfolio/painter_hero.png' },
  { id: 5, src: '/portfolio/car_detail_services.png' },
  { id: 6, src: '/portfolio/epoxy_services.png' },
  { id: 7, src: '/portfolio/cleaning_services.png' },
  { id: 8, src: '/portfolio/painter_services.png' },
  { id: 9, src: '/portfolio/car_detail_about.png' },
  { id: 10, src: '/portfolio/epoxy_about.png' },
  { id: 11, src: '/portfolio/cleaning_about.png' },
  { id: 12, src: '/portfolio/painter_about.png' },
  { id: 13, src: '/portfolio/car_detail_footer.png' },
  { id: 14, src: '/portfolio/epoxy_footer.png' },
  { id: 15, src: '/portfolio/cleaning_footer.png' },
  { id: 16, src: '/portfolio/painter_footer.png' },
];

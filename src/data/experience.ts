import type { ExperienceItem } from '@/types';

export const experiences: ExperienceItem[] = [
  {
    id: '1',
    company: 'Tech Startup Inc.',
    role: 'Senior Frontend Engineer',
    period: '2022 - Present',
    location: 'Remote',
    description:
      'Leading frontend architecture for a B2B SaaS platform serving 50K+ users. Driving technical decisions and mentoring junior developers.',
    achievements: [
      'Reduced initial bundle size by 60% through code splitting and lazy loading',
      'Improved Core Web Vitals scores: LCP from 4.2s to 1.8s',
      'Established component library used across 3 product teams',
      'Led migration from JavaScript to TypeScript with zero production incidents',
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Tailwind CSS'],
  },
  {
    id: '2',
    company: 'Digital Agency Co.',
    role: 'Frontend Developer',
    period: '2019 - 2022',
    location: 'New York, NY',
    description:
      'Built client-facing applications for Fortune 500 companies. Specialized in complex data visualization and real-time features.',
    achievements: [
      'Delivered 15+ client projects on time and within budget',
      'Built real-time dashboard handling 10K events/second',
      'Reduced client onboarding time by 40% with improved UX',
      'Mentored 3 junior developers who were promoted within a year',
    ],
    technologies: ['React', 'Vue.js', 'D3.js', 'WebSocket', 'Node.js'],
  },
  {
    id: '3',
    company: 'E-Commerce Corp',
    role: 'Junior Frontend Developer',
    period: '2017 - 2019',
    location: 'San Francisco, CA',
    description:
      'Started my career building responsive e-commerce experiences. Learned the fundamentals of scalable frontend architecture.',
    achievements: [
      'Contributed to checkout flow redesign that increased conversions by 15%',
      'Built responsive email templates used by 1M+ subscribers',
      'Introduced automated testing, improving code coverage from 20% to 70%',
    ],
    technologies: ['JavaScript', 'React', 'SCSS', 'Jest', 'Webpack'],
  },
];

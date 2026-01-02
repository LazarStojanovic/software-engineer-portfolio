import type { ExperienceItem } from '@/types';

export const experiences: ExperienceItem[] = [
  {
    id: '1',
    company: 'Symphony',
    role: 'Software Engineer',
    period: 'Apr 2025 - Present',
    location: 'Remote',
    description:
      'Leading frontend development for a financial services platform. Responsible for new feature development, documentation, and client demo presentations.',
    achievements: [
      'Frontend Lead for financial project',
      'Development of new features with modern stack',
      'Creating comprehensive documentation',
      'Conducting demo presentations for stakeholders',
    ],
    technologies: ['Next.js', 'TypeScript', 'Jest', 'React'],
  },
  {
    id: '2',
    company: 'HTEC Group',
    role: 'Software Engineer',
    period: 'Jun 2020 - Apr 2025',
    location: 'Serbia',
    description:
      'Worked across multiple high-impact projects in healthcare, telecommunications, and government sectors. Progressed from developer to Frontend Lead, mentoring teams and driving technical decisions.',
    achievements: [
      'Led a team of up to 8 frontend developers',
      'Developed complete UI library using Radix for healthcare applications',
      'Upgraded projects to modern accessibility standards with third-party certification',
      'Managed major telecommunications project with micro-frontend architecture (Piral)',
      'Conducted 20+ Angular interviews and contributed to HTEC Angular roadmap',
      'Mentored up to 5 junior developers and interns simultaneously',
    ],
    technologies: [
      'React',
      'Angular',
      'TypeScript',
      'Redux',
      'RxJs',
      'Next.js',
      'Piral',
      'Grafana',
    ],
  },
  {
    id: '3',
    company: 'HEFES Technology Group',
    role: 'Software Engineer - Contractor',
    period: 'Mar 2022 - May 2024',
    location: 'Remote',
    description:
      'Contract work across cloud storage, government healthcare, and admin panel projects. Focused on feature development, bug fixing, and integrating reporting tools.',
    achievements: [
      'Enhanced and refactored cloud storage application features',
      'Maintained government medical project and implemented new functionality',
      'Complete setup and development of admin panel with Jasper reports integration',
      'Design improvements and comprehensive bug fixing',
    ],
    technologies: ['React', 'Redux', 'Angular', 'AngularJS', 'Jasper', 'Grafana', 'SVN'],
  },
];

import type { ExperienceItem } from '@/types';

export const experiences: ExperienceItem[] = [
  {
    id: '1',
    company: 'Symphony',
    role: 'Software Engineer',
    period: 'Apr 2025 - Present',
    location: 'Remote',
    employmentType: 'full-time',
    isCurrent: true,
    description:
      'Leading frontend development for a financial services platform. Responsible for new feature development, documentation, and client demo presentations.',
    achievements: [
      'Frontend Lead for financial project',
      'Development of new features with modern stack',
      'Creating comprehensive documentation',
      'Conducting demo presentations for stakeholders',
    ],
    technologies: ['Next.js', 'TypeScript', 'Jest', 'React', 'Angular', 'PrimeNG'],
    highlights: [
      { metric: 'Role', value: 'Frontend Lead', icon: 'Crown' },
      { metric: 'Projects', value: '2 Active', icon: 'Briefcase' },
      { metric: 'Focus', value: 'AI & Fintech', icon: 'Sparkles' },
    ],
    keyProjects: ['symphony-ai-platform', 'symphony-fintech'],
    teamContext: 'Leading frontend initiatives for enterprise clients',
  },
  {
    id: '2',
    company: 'HTEC Group',
    role: 'Software Engineer',
    period: 'Jun 2020 - Apr 2025',
    location: 'Serbia',
    employmentType: 'full-time',
    isCurrent: false,
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
    highlights: [
      { metric: 'Team Size', value: '8 Developers', icon: 'Users' },
      { metric: 'Duration', value: '5 Years', icon: 'Calendar' },
      { metric: 'Mentees', value: '5+ Juniors', icon: 'GraduationCap' },
      { metric: 'Interviews', value: '20+ Conducted', icon: 'MessageSquare' },
    ],
    keyProjects: [
      'htec-telecom',
      'htec-healthcare-ui',
      'htec-government',
      'htec-resource-management',
    ],
    teamContext: 'Progressed from Developer to Frontend Lead over 5 years',
  },
  {
    id: '3',
    company: 'HEFES Technology Group',
    role: 'Software Engineer - Contractor',
    period: 'Mar 2022 - May 2024',
    location: 'Remote',
    employmentType: 'contract',
    isCurrent: false,
    description:
      'Contract work across cloud storage, government healthcare, and admin panel projects. Focused on feature development, bug fixing, and integrating reporting tools.',
    achievements: [
      'Enhanced and refactored cloud storage application features',
      'Maintained government medical project and implemented new functionality',
      'Complete setup and development of admin panel with Jasper reports integration',
      'Design improvements and comprehensive bug fixing',
    ],
    technologies: ['React', 'Redux', 'Angular', 'AngularJS', 'Jasper', 'Grafana', 'SVN'],
    highlights: [
      { metric: 'Type', value: 'Contract', icon: 'FileText' },
      { metric: 'Projects', value: '3 Delivered', icon: 'CheckCircle' },
      { metric: 'Duration', value: '2+ Years', icon: 'Clock' },
    ],
    keyProjects: ['hefes-cloud-storage', 'hefes-healthcare', 'hefes-admin'],
    teamContext: 'Concurrent contract work alongside HTEC full-time position',
  },
];

// Career statistics for the stats banner
export const careerStats = {
  yearsOfExperience: 5,
  companiesWorked: 3,
  projectsDelivered: 11,
  teamSizeLed: 8,
  developersMediated: 5,
  interviewsConducted: 20,
  industries: ['Healthcare', 'Telecommunications', 'Fintech', 'Government'],
};

import type { CaseStudy, FeaturedProject } from '@/types';

export const caseStudies: CaseStudy[] = [
  // Symphony
  {
    id: '1',
    slug: 'financial-platform',
    title: 'Financial Services Platform',
    role: 'Frontend Lead',
    duration: 'Apr 2025 - Present',
    company: 'Symphony',
    context:
      'Symphony needed a modern financial services platform with complex data requirements and strict compliance needs.',
    problem:
      'The project required building a robust frontend architecture that could handle complex financial data while maintaining excellent developer experience and documentation standards.',
    approach: [
      'Established Next.js architecture with TypeScript for type safety',
      'Implemented comprehensive testing strategy with Jest',
      'Created detailed documentation for onboarding and maintenance',
      'Set up demo presentation workflows for stakeholder reviews',
    ],
    technicalDecisions: [
      {
        decision: 'Next.js for the framework',
        rationale:
          'Server-side rendering capabilities, excellent TypeScript support, and built-in optimizations',
      },
      {
        decision: 'Comprehensive Jest testing',
        rationale: 'Financial applications require high reliability and extensive test coverage',
      },
    ],
    outcomes: [
      { metric: 'Role', value: 'Lead', description: 'Frontend Lead position' },
      { metric: 'Stack', value: 'Modern', description: 'Next.js + TypeScript' },
      { metric: 'Docs', value: 'Full', description: 'Complete documentation' },
    ],
    techStack: ['Next.js', 'TypeScript', 'Jest', 'React'],
  },

  // HTEC - Telecom
  {
    id: '2',
    slug: 'telecommunications-platform',
    title: 'Major Telecommunications Platform',
    role: 'Software Engineer',
    duration: 'Dec 2023 - Apr 2025',
    company: 'HTEC',
    context:
      'HTEC Group was engaged to build and maintain a large-scale telecommunications platform for a major industry client.',
    problem:
      'The platform needed to scale across multiple teams while maintaining consistency. Legacy code required refactoring, and monitoring was essential for enterprise operations.',
    approach: [
      'Implemented micro-frontend architecture using Piral for team scalability',
      'Developed and refactored project features for performance',
      'Integrated Grafana for comprehensive monitoring and observability',
      'Created documentation for cross-team collaboration',
    ],
    technicalDecisions: [
      {
        decision: 'Piral micro-frontend architecture',
        rationale: 'Enabled multiple teams to work independently while maintaining unified UX',
      },
      {
        decision: 'Grafana integration',
        rationale: 'Enterprise clients require deep observability for operations',
      },
    ],
    outcomes: [
      { metric: 'Scale', value: 'Enterprise', description: 'Major telecom client' },
      { metric: 'Architecture', value: 'Micro-FE', description: 'Piral-based' },
      { metric: 'Monitoring', value: 'Grafana', description: 'Full observability' },
    ],
    techStack: ['React', 'Redux', 'TypeScript', 'Piral', 'Grafana'],
  },

  // HTEC - Medical SDP
  {
    id: '3',
    slug: 'medical-sdp',
    title: 'Medical Project - Architecture & Planning',
    role: 'Frontend Lead',
    duration: 'Sep 2023 - Dec 2023',
    company: 'HTEC',
    context:
      'A healthcare client needed comprehensive project planning and architecture design before development.',
    problem:
      'The project required detailed estimation, work package documentation, and architecture design that aligned with client budgets and healthcare industry requirements.',
    approach: [
      'Led project estimation and planning sessions',
      'Documented detailed work packages for development teams',
      'Designed frontend architecture to support project goals',
      'Aligned feature planning with client budget constraints',
    ],
    technicalDecisions: [
      {
        decision: 'Component-based architecture',
        rationale: 'Allowed for phased development aligned with budget releases',
      },
      {
        decision: 'Detailed work package documentation',
        rationale: 'Healthcare projects require traceability and clear scope definition',
      },
    ],
    outcomes: [
      { metric: 'Planning', value: 'Complete', description: 'Full project scope' },
      { metric: 'Architecture', value: 'Designed', description: 'Frontend structure' },
      { metric: 'Budget', value: 'Aligned', description: 'Client requirements' },
    ],
    techStack: ['Documentation', 'Architecture', 'Project Planning'],
  },

  // HTEC - Internal
  {
    id: '4',
    slug: 'internal-platform',
    title: 'Internal Company Platform',
    role: 'Software Engineer',
    duration: 'Apr 2023 - Sep 2023',
    company: 'HTEC',
    context:
      'HTEC Group needed an internal platform to optimize company processes including hiring, finance, and employee evaluations.',
    problem:
      'Multiple company processes were handled through disparate systems. A unified platform was needed to streamline operations.',
    approach: [
      'Developed unified platform for multiple company processes',
      'Built features for hiring workflow optimization',
      'Created finance tracking and reporting modules',
      'Implemented employee evaluation system',
    ],
    technicalDecisions: [
      {
        decision: 'React + TypeScript stack',
        rationale: 'Consistent with company expertise for rapid development',
      },
      {
        decision: 'Modular architecture',
        rationale: 'Different departments had different needs requiring independent modules',
      },
    ],
    outcomes: [
      { metric: 'Processes', value: 'Unified', description: 'HR, Finance, Evals' },
      { metric: 'Coverage', value: 'High', description: 'Jest testing' },
      { metric: 'Users', value: 'Company', description: 'Internal tool' },
    ],
    techStack: ['React', 'TypeScript', 'Jest'],
  },

  // HTEC - Government
  {
    id: '5',
    slug: 'government-accessibility',
    title: 'Government Identification Project',
    role: 'Software Engineer',
    duration: 'Jan 2023 - Apr 2023',
    company: 'HTEC',
    context:
      'A government client needed their identification system upgraded to meet modern accessibility standards.',
    problem:
      'The existing application did not meet current accessibility requirements. Third-party certification was required.',
    approach: [
      'Audited existing application for accessibility issues',
      'Upgraded components to meet WCAG 2.1 AA standards',
      'Implemented keyboard navigation throughout',
      'Coordinated with third-party testers for certification',
    ],
    technicalDecisions: [
      {
        decision: 'Progressive enhancement approach',
        rationale: 'Upgrading incrementally maintained functionality while improving a11y',
      },
    ],
    outcomes: [
      { metric: 'Certification', value: 'Passed', description: 'Third-party certified' },
      { metric: 'Standard', value: 'WCAG 2.1', description: 'AA compliance' },
      { metric: 'Timeline', value: '3 months', description: 'On schedule' },
    ],
    techStack: ['React', 'Accessibility', 'WCAG'],
  },

  // HTEC - Medical UI Library
  {
    id: '6',
    slug: 'healthcare-ui-library',
    title: 'Healthcare UI Component Library',
    role: 'Feature Lead',
    duration: 'Apr 2022 - Jan 2023',
    company: 'HTEC',
    context:
      'A medical project required a consistent, accessible UI component library that met healthcare industry standards.',
    problem:
      'Healthcare applications have strict accessibility and compliance requirements. A reusable component library was needed.',
    approach: [
      'Built complete UI library using Radix primitives',
      'Ensured all components met healthcare accessibility standards',
      'Led feature development aligned with medical compliance',
      'Created reusable patterns for health industry projects',
    ],
    technicalDecisions: [
      {
        decision: 'Radix UI as the base',
        rationale: 'Unstyled, accessible primitives that ensure WCAG compliance',
      },
      {
        decision: 'React + TypeScript',
        rationale: 'Type safety critical for healthcare where bugs have serious consequences',
      },
    ],
    outcomes: [
      { metric: 'Library', value: 'Complete', description: 'Full UI system' },
      { metric: 'Standards', value: 'Healthcare', description: 'Industry compliant' },
      { metric: 'Reusability', value: 'High', description: 'Cross-project' },
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Jest', 'Radix UI'],
  },

  // HTEC - Company Project (Angular)
  {
    id: '7',
    slug: 'enterprise-angular-platform',
    title: 'Enterprise Company Platform',
    role: 'Frontend Lead',
    duration: 'Jun 2020 - Apr 2022',
    company: 'HTEC',
    context:
      'HTEC Group engaged on a major company platform requiring Angular expertise and team leadership.',
    problem:
      'The project needed strong frontend leadership to guide a team of up to 8 developers while delivering new features and refactoring legacy code.',
    approach: [
      'Led team of up to 8 frontend developers',
      'Organized, mentored, and guided junior developers and interns',
      'Oversaw development of new features and refactoring',
      'Authored extensive project documentation',
      'Onboarded new team members effectively',
    ],
    technicalDecisions: [
      {
        decision: 'Angular 2+ migration from AngularJS',
        rationale: 'Modern framework capabilities and better maintainability',
      },
      {
        decision: 'RxJs for reactive patterns',
        rationale: 'Complex async data flows required reactive programming approach',
      },
    ],
    outcomes: [
      { metric: 'Team', value: '8 devs', description: 'Led frontend team' },
      { metric: 'Duration', value: '2 years', description: 'Long-term project' },
      { metric: 'Mentoring', value: '5+ juniors', description: 'Career development' },
    ],
    techStack: ['Angular', 'AngularJS', 'RxJs', 'TypeScript'],
  },

  // HEFES - Admin Panel
  {
    id: '8',
    slug: 'medical-admin-panel',
    title: 'Medical Admin Panel',
    role: 'Software Engineer',
    duration: 'Contract Period',
    company: 'HEFES',
    context: 'A healthcare client needed a comprehensive admin panel with reporting capabilities.',
    problem:
      'The medical project required an admin interface with advanced reporting features using Jasper reports.',
    approach: [
      'Complete project setup from scratch',
      'Development of admin panel features',
      'Integrated Jasper reports for healthcare reporting',
      'Added Grafana dashboards for monitoring',
    ],
    technicalDecisions: [
      {
        decision: 'Jasper Reports integration',
        rationale: 'Healthcare industry standard for generating compliant reports',
      },
    ],
    outcomes: [
      { metric: 'Reports', value: 'Jasper', description: 'Healthcare compliant' },
      { metric: 'Monitoring', value: 'Grafana', description: 'Dashboards' },
      { metric: 'Setup', value: 'Complete', description: 'From scratch' },
    ],
    techStack: ['Angular', 'Jasper', 'Grafana'],
  },

  // HEFES - Cloud Storage
  {
    id: '9',
    slug: 'cloud-storage',
    title: 'Cloud Storage Platform',
    role: 'Software Engineer',
    duration: 'Contract Period',
    company: 'HEFES',
    context: 'A cloud storage platform needed feature enhancements and bug fixes.',
    problem:
      'The existing application required both new feature development and comprehensive refactoring with design improvements.',
    approach: [
      'Enhanced and refactored new and existing features',
      'Conducted comprehensive bug fixing',
      'Implemented design improvements',
    ],
    technicalDecisions: [
      {
        decision: 'Redux for state management',
        rationale: 'Complex file operations required predictable state handling',
      },
    ],
    outcomes: [
      { metric: 'Features', value: 'Enhanced', description: 'New & existing' },
      { metric: 'Quality', value: 'Improved', description: 'Bug fixes' },
      { metric: 'Design', value: 'Updated', description: 'UI improvements' },
    ],
    techStack: ['React', 'Redux'],
  },

  // HEFES - Government Medical
  {
    id: '10',
    slug: 'government-medical',
    title: 'Government Medical System',
    role: 'Software Engineer',
    duration: 'Contract Period',
    company: 'HEFES',
    context: 'A government healthcare system required ongoing maintenance and new features.',
    problem:
      'Legacy AngularJS application needed maintenance, bug fixes, and new functionality while maintaining stability.',
    approach: [
      'Managed ongoing project maintenance',
      'Resolved bugs in legacy codebase',
      'Implemented new features to improve functionality',
    ],
    technicalDecisions: [
      {
        decision: 'Maintain AngularJS stack',
        rationale: 'Government system stability requirements prevented major rewrites',
      },
    ],
    outcomes: [
      { metric: 'Stability', value: 'Maintained', description: 'Production system' },
      { metric: 'Features', value: 'New', description: 'Added functionality' },
      { metric: 'Bugs', value: 'Resolved', description: 'Legacy fixes' },
    ],
    techStack: ['AngularJS', 'SVN'],
  },
];

export const featuredProjects: FeaturedProject[] = caseStudies.slice(0, 3).map(cs => ({
  id: cs.id,
  title: cs.title,
  role: cs.role,
  problem: cs.problem.split('.')[0] + '.',
  outcome: cs.outcomes
    .map(o => `${o.value} ${o.metric.toLowerCase()}`)
    .slice(0, 2)
    .join(' · '),
  techStack: cs.techStack.slice(0, 4),
  slug: cs.slug,
}));

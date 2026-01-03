import type { CaseStudy, FeaturedProject } from '@/types';

export const caseStudies: CaseStudy[] = [
  // Symphony - AI Banking Initiative
  {
    id: '0',
    slug: 'ai-banking-platform',
    title: 'Enterprise AI Model Training Platform for Banking',
    role: 'Frontend Lead',
    duration: 'Oct 2025 - Present',
    company: 'Symphony',
    context:
      "Spearheading Symphony's strategic AI-first initiative to deliver next-generation banking solutions. Leading dual-track development: a sophisticated AI model training platform for enterprise banking clients and a company-wide unified design system.",
    problem:
      'Enterprise banking clients required a robust platform capable of orchestrating complex ML workflows while adhering to stringent financial regulatory requirements. Symphony also identified the need for a centralized design system to ensure brand consistency and accelerate delivery across all product lines.',
    approach: [
      'Architected scalable monorepo infrastructure enabling shared code reuse and independent deployment pipelines',
      'Pioneered AI-augmented development workflow using Cursor, significantly accelerating delivery velocity',
      'Sole architect and developer of enterprise-grade UI component library built on PrimeNG primitives',
      'Established comprehensive design system patterns driving cross-project visual and functional consistency',
      'Implemented rigorous quality standards ensuring architectural coherence across the component ecosystem',
    ],
    technicalDecisions: [
      {
        decision: 'Latest Angular with standalone components',
        rationale:
          'Modern Angular provides excellent TypeScript integration, signals for reactivity, and enterprise-grade tooling',
      },
      {
        decision: 'AI-first development with Cursor',
        rationale:
          'Cursor AI accelerates development velocity while maintaining code quality through intelligent suggestions',
      },
      {
        decision: 'PrimeNG-based UI library',
        rationale: `PrimeNG offers comprehensive enterprise components that can be customized for Symphony's design system`,
      },
      {
        decision: 'Monorepo architecture',
        rationale:
          'Enables shared code between AI platform and UI library while maintaining independent deployment pipelines',
      },
    ],
    outcomes: [
      { metric: 'Scope', value: '2 Projects', description: 'AI Platform + UI Library' },
      { metric: 'UI Library', value: 'Solo Lead', description: 'Sole developer' },
      { metric: 'Approach', value: 'AI-First', description: 'Cursor-powered development' },
      { metric: 'Impact', value: 'Company-wide', description: 'Library reused across projects' },
    ],
    techStack: ['Angular', 'TypeScript', 'Tailwind CSS', 'PrimeNG', 'Cursor AI', 'Monorepo', 'Nx'],
  },

  // Symphony - Financial Platform (completed)
  {
    id: '1',
    slug: 'financial-platform',
    title: 'Enterprise Financial Services & Compliance Platform',
    role: 'Frontend Lead',
    duration: 'Apr 2025 - Oct 2025',
    company: 'Symphony',
    context:
      'Led frontend development for a mission-critical financial services platform serving enterprise clients with complex data visualization and regulatory compliance requirements.',
    problem:
      'Financial institutions required a high-performance platform capable of processing and visualizing complex financial datasets while ensuring strict regulatory compliance and audit trail capabilities.',
    approach: [
      'Architected robust Next.js foundation with TypeScript ensuring end-to-end type safety',
      'Engineered comprehensive testing infrastructure achieving high coverage across critical business logic',
      'Authored extensive technical documentation enabling seamless team onboarding and long-term maintainability',
      'Designed stakeholder demo workflows facilitating efficient feedback cycles and client alignment',
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
    title: 'Enterprise Telecommunications Infrastructure Platform',
    role: 'Software Engineer',
    duration: 'Dec 2023 - Apr 2025',
    company: 'HTEC',
    context:
      'Contributed to a large-scale telecommunications platform for a Fortune 500 industry leader, enabling millions of customers to manage their services and accounts.',
    problem:
      'The platform required horizontal scaling across distributed development teams while maintaining UX consistency. Legacy performance bottlenecks demanded strategic refactoring, and enterprise-grade observability was essential for 24/7 operations.',
    approach: [
      'Implemented micro-frontend architecture using Piral, enabling autonomous team development and deployment',
      'Executed strategic performance refactoring initiatives reducing load times and improving user experience',
      'Integrated comprehensive Grafana observability stack for real-time monitoring and incident response',
      'Authored cross-team technical documentation standardizing development practices and API contracts',
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
    title: 'Healthcare Platform Architecture & Strategic Planning',
    role: 'Frontend Lead',
    duration: 'Sep 2023 - Dec 2023',
    company: 'HTEC',
    context:
      'Engaged as technical lead for pre-development phase of a critical healthcare initiative, responsible for translating business requirements into actionable technical specifications.',
    problem:
      'Healthcare clients required comprehensive technical roadmapping with precise effort estimation, regulatory-compliant architecture design, and budget-aligned delivery milestones before committing to development investment.',
    approach: [
      'Facilitated cross-functional estimation workshops aligning technical and business stakeholders',
      'Authored detailed work breakdown structures enabling accurate resource planning and sprint forecasting',
      'Designed modular frontend architecture optimized for phased delivery and regulatory compliance',
      'Orchestrated feature prioritization sessions balancing clinical value against budget constraints',
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
    title: 'Unified Enterprise Operations Platform',
    role: 'Software Engineer',
    duration: 'Apr 2023 - Sep 2023',
    company: 'HTEC',
    context:
      "Developed a centralized operations platform to consolidate and streamline HTEC Group's core business processes, serving 1000+ employees across multiple departments.",
    problem:
      'Critical business processes including talent acquisition, financial operations, and performance management were fragmented across disparate legacy systems, causing inefficiencies and data silos.',
    approach: [
      'Engineered unified platform architecture consolidating HR, Finance, and Performance Management workflows',
      'Developed intelligent talent acquisition pipeline with automated screening and scheduling capabilities',
      'Built comprehensive financial tracking and reporting dashboards enabling real-time budget visibility',
      'Implemented 360-degree employee evaluation system with customizable review cycles and analytics',
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
    title: 'Government Digital Identity Accessibility Modernization',
    role: 'Software Engineer',
    duration: 'Jan 2023 - Apr 2023',
    company: 'HTEC',
    context:
      'Led accessibility transformation of a critical government digital identity system, ensuring equal access for all citizens including those with disabilities.',
    problem:
      'The national identification platform failed to meet mandated WCAG 2.1 AA accessibility standards, risking legal non-compliance and excluding citizens with disabilities from essential government services.',
    approach: [
      'Conducted comprehensive accessibility audit identifying 100+ compliance gaps across the application',
      'Systematically remediated components to achieve full WCAG 2.1 AA certification',
      'Engineered complete keyboard navigation system ensuring zero mouse-dependency for all user flows',
      'Managed third-party accessibility certification process, achieving first-pass approval',
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
    title: 'Enterprise Healthcare Design System & Component Library',
    role: 'Feature Lead',
    duration: 'Apr 2022 - Jan 2023',
    company: 'HTEC',
    context:
      'Architected and led development of a comprehensive design system for healthcare applications, establishing the foundation for consistent, accessible, and compliant medical software interfaces.',
    problem:
      'Healthcare software demands the highest standards of accessibility and regulatory compliance. The organization lacked a unified component library, resulting in inconsistent UX and duplicated accessibility efforts across projects.',
    approach: [
      'Architected production-ready UI component library leveraging Radix primitives for guaranteed accessibility',
      'Engineered components meeting FDA and HIPAA-compliant healthcare accessibility requirements',
      'Led feature development ensuring alignment with medical industry regulatory standards',
      'Established reusable design patterns adopted across multiple healthcare product lines',
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
    title: 'Enterprise Resource Management Platform',
    role: 'Frontend Lead',
    duration: 'Jun 2020 - Apr 2022',
    company: 'HTEC',
    context:
      'Served as Frontend Lead for a large-scale enterprise platform over a 2-year engagement, building and mentoring a high-performing development team while driving technical excellence.',
    problem:
      'The platform required experienced technical leadership to scale the frontend team, modernize legacy AngularJS codebase, and establish sustainable development practices for long-term product evolution.',
    approach: [
      'Built and led a cross-functional frontend team of 8 developers, driving sprint delivery and technical decisions',
      'Established structured mentorship program accelerating career growth for 5+ junior developers and interns',
      'Orchestrated strategic migration from AngularJS to modern Angular, improving performance and maintainability',
      'Authored comprehensive technical documentation establishing team knowledge base and onboarding excellence',
      'Designed streamlined onboarding process reducing new developer ramp-up time by 40%',
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
    title: 'Healthcare Administration & Analytics Dashboard',
    role: 'Software Engineer',
    duration: 'Jan 2024 - Aug 2024',
    company: 'HEFES',
    context:
      'Developed a comprehensive healthcare administration platform enabling medical staff to manage patient data, generate compliance reports, and monitor system health in real-time.',
    problem:
      'Healthcare administrators lacked a centralized dashboard for patient management, regulatory reporting, and operational analytics, leading to manual processes and delayed decision-making.',
    approach: [
      'Architected and bootstrapped entire frontend application from initial project scaffolding to production deployment',
      'Engineered intuitive admin interface with role-based access control and audit logging capabilities',
      'Integrated Jasper Reports engine enabling automated generation of regulatory-compliant healthcare documentation',
      'Implemented Grafana observability dashboards providing real-time operational metrics and alerting',
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
    title: 'Enterprise Cloud Storage & File Management Platform',
    role: 'Software Engineer',
    duration: 'Jun 2023 - Dec 2023',
    company: 'HEFES',
    context:
      'Enhanced a cloud-based file storage and collaboration platform enabling enterprise teams to securely store, share, and manage documents at scale.',
    problem:
      'The platform faced user experience challenges and technical debt that hindered adoption. Strategic feature enhancements and architecture improvements were needed to meet growing enterprise demands.',
    approach: [
      'Delivered strategic feature enhancements improving file management workflows and collaboration capabilities',
      'Executed systematic technical debt reduction through targeted refactoring and code optimization',
      'Modernized user interface implementing contemporary design patterns and improved accessibility',
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
    title: 'National Healthcare Information System',
    role: 'Software Engineer',
    duration: 'Oct 2022 - May 2023',
    company: 'HEFES',
    context:
      'Maintained and enhanced a government-operated healthcare information system serving medical institutions nationwide, ensuring continuous availability of critical patient services.',
    problem:
      'The mission-critical AngularJS platform required expert maintenance to ensure 24/7 availability while carefully introducing new functionality without disrupting essential healthcare operations.',
    approach: [
      'Provided expert maintenance ensuring 99.9% uptime for mission-critical healthcare infrastructure',
      'Diagnosed and resolved complex legacy codebase issues minimizing service disruption',
      'Delivered incremental feature enhancements improving clinical workflow efficiency',
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

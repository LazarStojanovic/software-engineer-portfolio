export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  results: {
    metric: string;
    value: string;
    improvement: string;
  }[];
  tags: string[];
  caseStudy?: {
    overview?: string;
    goals?: string[];
    approach?: string[];
    timelineMonths?: number;
    budgetRange?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
  budget?: string;
}

export interface Theme {
  mode: 'light' | 'dark';
}

export interface Language {
  code: 'en' | 'sr';
  name: string;
  flag: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Project {
  id: string;
  name: string;
  problem: string;
  techStack: string[];
  href: string;
}

export interface TechCategory {
  name: string;
  technologies: string[];
}

// Case Study - Senior-level project representation
export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  role: string;
  duration: string;
  company?: string;
  thumbnail?: string;

  // The story
  context: string;
  problem: string;
  approach: string[];
  technicalDecisions: TechnicalDecision[];
  outcomes: Outcome[];

  // Tech details
  techStack: string[];
  architectureHighlights?: string[];

  // Links
  liveUrl?: string;
  githubUrl?: string;
}

export interface TechnicalDecision {
  decision: string;
  rationale: string;
}

export interface Outcome {
  metric: string;
  value: string;
  description?: string;
}

// Featured project for home page display
export interface FeaturedProject {
  id: string;
  title: string;
  role: string;
  problem: string;
  outcome: string;
  techStack: string[];
  slug: string;
}

// Experience highlight metric
export interface ExperienceHighlight {
  metric: string;
  value: string;
  icon?: string;
}

// Experience timeline item
export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  employmentType: 'full-time' | 'contract';
  highlights: ExperienceHighlight[];
  keyProjects?: string[];
  teamContext?: string;
  isCurrent?: boolean;
}

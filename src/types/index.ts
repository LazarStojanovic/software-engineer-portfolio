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

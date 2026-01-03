import type { CaseStudy } from '@/types';

// Interface for translated outcomes
export interface TranslatedOutcome {
  metric: string;
  value: string;
}

// Interface for translated technical decisions
export interface TranslatedDecision {
  decision: string;
  rationale: string;
}

// Translated project content
export interface TranslatedProject {
  title: string;
  context: string;
  problem: string;
  approach: string[];
  outcomes: TranslatedOutcome[];
  technicalDecisions: TranslatedDecision[];
}

// Year group for timeline display
export interface YearGroup {
  year: string;
  projects: CaseStudy[];
}

// Parsed date structure
export interface ParsedDate {
  startYear: number;
  startMonth: string;
  endYear: number | null;
  endMonth: string | null;
}

// Company type for styling
export type CompanyType = 'primary' | 'concurrent';

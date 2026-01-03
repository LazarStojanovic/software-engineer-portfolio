import type { CaseStudy } from '@/types';

import type { ParsedDate, YearGroup } from './types';

const MONTHS: Record<string, number> = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

const YEAR_ORDER = ['Present', '2025', '2024', '2023', '2022', '2021', '2020'];

/**
 * Parse duration string to extract start and end dates
 */
export const parseDate = (duration: string): ParsedDate => {
  const parts = duration.split(' - ');
  const startMatch = parts[0]?.match(/([A-Za-z]+)\s+(\d{4})/);
  const endMatch = parts[1]?.match(/([A-Za-z]+)\s+(\d{4})/);

  return {
    startYear: startMatch ? parseInt(startMatch[2], 10) : 2020,
    startMonth: startMatch ? startMatch[1] : 'Jan',
    endYear: parts[1]?.includes('Present') ? null : endMatch ? parseInt(endMatch[2], 10) : null,
    endMonth: parts[1]?.includes('Present') ? null : endMatch ? endMatch[1] : null,
  };
};

/**
 * Get sort value for chronological ordering (most recent first, by end date)
 */
export const getSortValue = (duration: string): number => {
  if (duration.includes('Present')) return 999999;

  const { endYear, endMonth, startYear, startMonth } = parseDate(duration);
  const year = endYear || startYear;
  const month = endMonth || startMonth;
  return year * 100 + (MONTHS[month] || 1);
};

/**
 * Sort projects chronologically (most recent first)
 */
export const sortProjects = (projects: CaseStudy[]): CaseStudy[] => {
  return [...projects].sort((a, b) => getSortValue(b.duration) - getSortValue(a.duration));
};

/**
 * Group sorted projects by end year
 */
export const groupByYear = (sortedProjects: CaseStudy[]): YearGroup[] => {
  const groups = new Map<string, CaseStudy[]>();

  sortedProjects.forEach(project => {
    const { endYear, startYear } = parseDate(project.duration);
    let yearKey: string;

    if (project.duration.includes('Present')) {
      yearKey = 'Present';
    } else if (endYear) {
      yearKey = String(endYear);
    } else {
      yearKey = String(startYear);
    }

    if (!groups.has(yearKey)) {
      groups.set(yearKey, []);
    }
    groups.get(yearKey)?.push(project);
  });

  return YEAR_ORDER.filter(year => groups.has(year)).map(year => ({
    year,
    projects: groups.get(year) || [],
  }));
};

/**
 * Format duration string for display
 */
export const formatDuration = (duration: string): { start: string; end: string } => {
  const parts = duration.split(' - ');
  return {
    start: parts[0] || '',
    end: parts[1] || '',
  };
};

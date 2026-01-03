import type { CompanyType } from './types';

// Company configuration for visual distinction
export const COMPANY_CONFIG: Record<string, CompanyType> = {
  Symphony: 'primary',
  HTEC: 'primary',
  HEFES: 'concurrent',
};

/**
 * Check if a company is a concurrent (contract) position
 */
export const isConcurrentCompany = (company: string | undefined): boolean => {
  if (!company) return false;
  return COMPANY_CONFIG[company] === 'concurrent';
};

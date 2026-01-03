import type { ExperienceItem } from '@/types';

export interface CareerStatsData {
  yearsOfExperience: number;
  companiesWorked: number;
  projectsDelivered: number;
  teamSizeLed: number;
  developersMediated: number;
  interviewsConducted: number;
  industries: string[];
}

export interface ExperienceCardProps {
  experience: ExperienceItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

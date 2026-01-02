import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldAlert,
  ChevronDown,
  Building2,
  GitBranch,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { caseStudies } from '@/data/projects';

// Company configuration for visual distinction
const companyConfig: Record<string, { color: string; type: 'primary' | 'concurrent' }> = {
  Symphony: { color: 'primary', type: 'primary' },
  HTEC: { color: 'primary', type: 'primary' },
  HEFES: { color: 'accent', type: 'concurrent' },
};

// Parse date string to get year and month
const parseDate = (
  duration: string
): { startYear: number; startMonth: string; endYear: number | null; endMonth: string | null } => {
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

// Get sort value for chronological ordering (most recent first, by end date)
const getSortValue = (duration: string): number => {
  const months: Record<string, number> = {
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
  if (duration.includes('Present')) return 999999;

  const { endYear, endMonth, startYear, startMonth } = parseDate(duration);
  // Use end date for sorting, fallback to start date
  const year = endYear || startYear;
  const month = endMonth || startMonth;
  return year * 100 + (months[month] || 1);
};

// Sort projects chronologically (most recent first)
const sortedProjects = [...caseStudies].sort(
  (a, b) => getSortValue(b.duration) - getSortValue(a.duration)
);

// Group projects by end year (when completed/delivered)
interface YearGroup {
  year: string;
  projects: typeof caseStudies;
}

const groupByYear = (): YearGroup[] => {
  const groups: Map<string, typeof caseStudies> = new Map();

  // Define the order of years (most recent first)
  const yearOrder = ['Present', '2025', '2024', '2023', '2022', '2021', '2020'];

  sortedProjects.forEach(project => {
    const { endYear } = parseDate(project.duration);
    // Use end year for grouping - this shows when the project was completed
    let yearKey: string;
    if (project.duration.includes('Present')) {
      yearKey = 'Present';
    } else if (endYear) {
      yearKey = String(endYear);
    } else {
      // Fallback to start year if no end year
      const { startYear } = parseDate(project.duration);
      yearKey = String(startYear);
    }

    if (!groups.has(yearKey)) {
      groups.set(yearKey, []);
    }
    groups.get(yearKey)?.push(project);
  });

  // Sort groups by year order
  return yearOrder
    .filter(year => groups.has(year))
    .map(year => ({ year, projects: groups.get(year) || [] }));
};

const yearGroups = groupByYear();

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const toggleExpand = (id: string): void => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getCompanyStyles = (company: string | undefined): { isConcurrent: boolean } => {
    if (!company) return { isConcurrent: false };
    const config = companyConfig[company];
    return { isConcurrent: config?.type === 'concurrent' };
  };

  // Format duration for display
  const formatDuration = (duration: string): { start: string; end: string } => {
    const parts = duration.split(' - ');
    return {
      start: parts[0] || '',
      end: parts[1] || '',
    };
  };

  return (
    <>
      <Helmet>
        <title>
          {t('projects.title')} - {t('hero.name')}
        </title>
        <meta name='description' content='Featured projects and case studies' />
      </Helmet>

      <div className='min-h-screen pt-24 pb-16 bg-background'>
        <div className='container-max section-padding'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            className='mb-12'
          >
            <Button asChild variant='ghost' className='mb-8'>
              <Link to='/'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Home
              </Link>
            </Button>

            <div className='max-w-3xl'>
              <h1 className='page-title text-foreground mb-4'>{t('projects.title')}</h1>
              <p className='text-lg text-muted-foreground mb-6'>
                {caseStudies.length} projects across healthcare, telecommunications, government, and
                fintech.
              </p>
              {/* NDA Disclaimer */}
              <div className='relative pl-4 py-3 border-l-2 border-amber-500 bg-gradient-to-r from-amber-500/5 to-transparent rounded-r-lg'>
                <div className='absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-background border-2 border-amber-500 flex items-center justify-center'>
                  <ShieldAlert className='h-3.5 w-3.5 text-amber-500' />
                </div>
                <p className='text-sm text-muted-foreground pl-4'>
                  <span className='text-amber-600 dark:text-amber-400 font-semibold'>
                    Confidentiality Notice
                  </span>
                  <span className='mx-2 text-border'>—</span>
                  Project names and certain details have been obfuscated due to NDA agreements. All
                  technical approaches and outcomes described are accurate.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Legend */}
          <div className='max-w-4xl mx-auto mb-8 flex flex-wrap gap-4 text-sm text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-full bg-primary' />
              <span>Full-time</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-full bg-accent-500' />
              <span>Contract (concurrent with HTEC)</span>
            </div>
          </div>

          {/* Timeline by Year */}
          <div className='max-w-4xl mx-auto'>
            {yearGroups.map((group, groupIndex) => (
              <motion.div
                key={group.year}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  delay: prefersReducedMotion ? 0 : groupIndex * 0.1,
                }}
                className='mb-12 last:mb-0'
              >
                {/* Year Header */}
                <div className='flex items-center gap-4 mb-6'>
                  <div className='text-4xl md:text-5xl font-display font-bold text-foreground'>
                    {group.year === 'Present' ? 'Ongoing' : group.year}
                  </div>
                  <div className='flex-1 h-px bg-border' />
                  <div className='text-sm text-muted-foreground'>
                    {group.projects.length} project{group.projects.length > 1 ? 's' : ''}
                    {group.year !== 'Present' && ' completed'}
                  </div>
                </div>

                {/* Projects in this year */}
                <div className='relative ml-4 md:ml-8'>
                  {/* Vertical line */}
                  <div className='absolute left-0 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2' />

                  <div className='space-y-4'>
                    {group.projects.map((project, projectIndex) => {
                      const { isConcurrent } = getCompanyStyles(project.company);
                      const isExpanded = expandedId === project.id;
                      const { start, end } = formatDuration(project.duration);
                      const globalIndex = caseStudies.findIndex(p => p.id === project.id);

                      return (
                        <motion.article
                          key={project.id}
                          id={project.slug}
                          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: prefersReducedMotion ? 0 : 0.4,
                            delay: prefersReducedMotion
                              ? 0
                              : groupIndex * 0.1 + projectIndex * 0.05,
                          }}
                          className='relative scroll-mt-24 pl-6'
                        >
                          {/* Timeline dot - perfectly centered on line */}
                          <div
                            className={`absolute left-0 top-5 w-3 h-3 -translate-x-1/2 rounded-full ring-4 ring-background ${
                              isConcurrent ? 'bg-accent-500' : 'bg-primary'
                            }`}
                          />

                          <Card
                            className={`overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-large hover:-translate-y-0.5 group/card ${
                              isConcurrent
                                ? 'border-l-4 border-l-accent-500 bg-gradient-to-r from-accent-500/5 via-transparent to-transparent hover:border-accent-400'
                                : 'border-l-4 border-l-primary bg-gradient-to-r from-primary/5 via-transparent to-transparent hover:border-primary/60'
                            }`}
                            onClick={() => toggleExpand(project.id)}
                            role='button'
                            tabIndex={0}
                            onKeyDown={e => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                toggleExpand(project.id);
                              }
                            }}
                            aria-expanded={isExpanded}
                          >
                            <div className='w-full text-left'>
                              <CardHeader className='p-4'>
                                <div className='flex items-start justify-between gap-3'>
                                  <div className='flex-1 min-w-0'>
                                    {/* Date range bar */}
                                    <div className='flex items-center gap-2 mb-2 text-xs'>
                                      <span
                                        className={`font-semibold ${isConcurrent ? 'text-accent-500' : 'text-primary'}`}
                                      >
                                        {start}
                                      </span>
                                      <div
                                        className={`flex-1 h-0.5 max-w-16 ${isConcurrent ? 'bg-accent-500/30' : 'bg-primary/30'}`}
                                      />
                                      <span className='text-muted-foreground'>{end}</span>
                                    </div>

                                    {/* Company & Role */}
                                    <div className='flex flex-wrap items-center gap-2 mb-2'>
                                      <div
                                        className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${
                                          isConcurrent
                                            ? 'bg-accent-500/10 text-accent-500'
                                            : 'bg-primary/10 text-primary'
                                        }`}
                                      >
                                        {isConcurrent ? (
                                          <GitBranch className='h-3 w-3' />
                                        ) : (
                                          <Building2 className='h-3 w-3' />
                                        )}
                                        {project.company}
                                      </div>
                                      <Badge variant='outline' className='text-xs'>
                                        {project.role}
                                      </Badge>
                                      {isConcurrent && (
                                        <span className='text-xs text-accent-500 hidden sm:inline'>
                                          (concurrent)
                                        </span>
                                      )}
                                    </div>

                                    {/* Title */}
                                    <CardTitle className='text-base md:text-lg mb-2 group-hover/card:text-primary transition-colors'>
                                      {project.title}
                                    </CardTitle>

                                    {/* Tech stack preview */}
                                    {!isExpanded && (
                                      <div className='flex flex-wrap gap-1.5'>
                                        {project.techStack.slice(0, 5).map(tech => (
                                          <Badge key={tech} variant='outline' className='text-xs'>
                                            {tech}
                                          </Badge>
                                        ))}
                                        {project.techStack.length > 5 && (
                                          <Badge variant='outline' className='text-xs'>
                                            +{project.techStack.length - 5}
                                          </Badge>
                                        )}
                                      </div>
                                    )}
                                  </div>

                                  <div className='flex items-center gap-2 shrink-0'>
                                    <span className='text-xs text-muted-foreground hidden sm:block'>
                                      #{String(globalIndex + 1).padStart(2, '0')}
                                    </span>
                                    <ChevronDown
                                      className={`h-5 w-5 text-muted-foreground transition-all duration-200 group-hover/card:text-primary ${
                                        isExpanded ? 'rotate-180' : ''
                                      }`}
                                    />
                                  </div>
                                </div>
                              </CardHeader>
                            </div>

                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                              >
                                <Separator />
                                <CardContent className='p-4 space-y-5'>
                                  <div className='grid md:grid-cols-2 gap-4'>
                                    <div>
                                      <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2'>
                                        Context
                                      </h3>
                                      <p className='text-sm text-foreground'>{project.context}</p>
                                    </div>
                                    <div>
                                      <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2'>
                                        Challenge
                                      </h3>
                                      <p className='text-sm text-foreground'>{project.problem}</p>
                                    </div>
                                  </div>

                                  <div>
                                    <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2'>
                                      Approach
                                    </h3>
                                    <ul className='grid md:grid-cols-2 gap-2'>
                                      {project.approach.map((step, i) => (
                                        <li key={i} className='flex items-start gap-2'>
                                          <CheckCircle2 className='h-4 w-4 text-primary shrink-0 mt-0.5' />
                                          <span className='text-sm text-muted-foreground'>
                                            {step}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div>
                                    <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2'>
                                      Outcomes
                                    </h3>
                                    <div className='flex flex-wrap gap-3'>
                                      {project.outcomes.map((outcome, i) => (
                                        <div
                                          key={i}
                                          className='px-4 py-2 rounded-lg bg-muted/50 border border-border'
                                        >
                                          <span className='font-semibold text-primary'>
                                            {outcome.value}
                                          </span>
                                          <span className='text-sm text-muted-foreground ml-1'>
                                            {outcome.metric.toLowerCase()}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2'>
                                      Key Decisions
                                    </h3>
                                    <div className='space-y-2'>
                                      {project.technicalDecisions.map((td, i) => (
                                        <div
                                          key={i}
                                          className='bg-muted/30 rounded-lg p-3 border border-border'
                                        >
                                          <p className='font-medium text-sm text-foreground'>
                                            {td.decision}
                                          </p>
                                          <p className='text-xs text-muted-foreground mt-1'>
                                            {td.rationale}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div className='flex flex-wrap gap-2 pt-2'>
                                    {project.techStack.map(tech => (
                                      <Badge key={tech} variant='outline'>
                                        {tech}
                                      </Badge>
                                    ))}
                                  </div>
                                </CardContent>
                              </motion.div>
                            )}
                          </Card>
                        </motion.article>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Career start marker */}
            <div className='flex items-center gap-4 mt-12'>
              <div className='text-4xl md:text-5xl font-display font-bold text-muted-foreground/50'>
                2020
              </div>
              <div className='flex-1 h-px bg-border' />
              <div className='text-sm text-muted-foreground'>Career start</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;

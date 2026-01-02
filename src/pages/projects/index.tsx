import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle2, ShieldAlert, ChevronDown, Building2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Timeline,
  TimelineItem,
  TimelinePoint,
  TimelineDate,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
} from '@/components/ui/timeline';
import { caseStudies } from '@/data/projects';
import type { CaseStudy } from '@/types';

interface ProjectGroup {
  company: string;
  period: string;
  projects: CaseStudy[];
}

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const toggleExpand = (id: string): void => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Group projects by company for timeline
  const projectGroups: ProjectGroup[] = [
    {
      company: 'Symphony',
      period: '2025 - Present',
      projects: caseStudies.filter(p => p.company === 'Symphony'),
    },
    {
      company: 'HTEC Group',
      period: '2020 - 2025',
      projects: caseStudies.filter(p => p.company === 'HTEC'),
    },
    {
      company: 'HEFES Technology Group',
      period: '2022 - 2024',
      projects: caseStudies.filter(p => p.company === 'HEFES'),
    },
  ];

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

            <div className='grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-6 items-center'>
              <div>
                <h1 className='page-title text-foreground mb-2'>{t('projects.title')}</h1>
                <p className='text-lg text-muted-foreground max-w-xl'>
                  A timeline of {caseStudies.length} projects across healthcare, telecommunications,
                  government, and fintech sectors.
                </p>
              </div>

              {/* NDA Disclaimer */}
              <div className='flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 lg:w-80'>
                <ShieldAlert className='h-5 w-5 text-amber-500 shrink-0' />
                <p className='text-sm text-muted-foreground'>
                  Project names obfuscated due to NDA. Technical details are accurate.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className='max-w-4xl mx-auto'>
            <Timeline>
              {projectGroups.map((group, groupIndex) => {
                return (
                  <React.Fragment key={group.company}>
                    {/* Company Header */}
                    <TimelineItem>
                      <TimelineDate className='hidden md:block '>{group.period}</TimelineDate>
                      <TimelinePoint variant='primary' size='lg'>
                        <Building2 className='h-4 w-4 text-primary-foreground' />
                      </TimelinePoint>
                      <TimelineContent>
                        <motion.div
                          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: prefersReducedMotion ? 0 : 0.5,
                            delay: prefersReducedMotion ? 0 : groupIndex * 0.1,
                          }}
                        >
                          <TimelineTitle className='text-xl font-display'>
                            {group.company}
                          </TimelineTitle>
                          <TimelineDescription>
                            <span className='md:hidden'>{group.period} · </span>
                            {group.projects.length} project{group.projects.length > 1 ? 's' : ''}
                          </TimelineDescription>
                        </motion.div>
                      </TimelineContent>
                    </TimelineItem>

                    {/* Projects */}
                    {group.projects.map((project, projectIndex) => {
                      const isExpanded = expandedId === project.id;
                      const globalIndex = caseStudies.findIndex(p => p.id === project.id);

                      return (
                        <TimelineItem key={project.id} id={project.slug} className='scroll-mt-24'>
                          <TimelineDate className='text-muted-foreground font-normal text-xs pt-3'>
                            {project.duration.replace('Contract Period', 'Contract')}
                          </TimelineDate>
                          <TimelinePoint variant='outline' size='sm' className='mt-3' />
                          <TimelineContent>
                            <motion.article
                              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: prefersReducedMotion ? 0 : 0.4,
                                delay: prefersReducedMotion
                                  ? 0
                                  : groupIndex * 0.1 + projectIndex * 0.05,
                              }}
                            >
                              <Card className='overflow-hidden hover:shadow-medium transition-shadow'>
                                <button
                                  onClick={() => toggleExpand(project.id)}
                                  className='w-full text-left'
                                  aria-expanded={isExpanded}
                                >
                                  <CardHeader className='p-4'>
                                    <div className='flex items-start justify-between gap-3'>
                                      <div className='flex items-start gap-3 flex-1 min-w-0'>
                                        <div className='w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0'>
                                          <span className='text-xs font-bold text-muted-foreground'>
                                            {String(globalIndex + 1).padStart(2, '0')}
                                          </span>
                                        </div>

                                        <div className='min-w-0 flex-1'>
                                          <div className='flex flex-wrap items-center gap-2 mb-1'>
                                            <Badge variant='secondary' className='text-xs'>
                                              {project.role}
                                            </Badge>
                                            <span className='text-xs text-muted-foreground md:hidden'>
                                              {project.duration.replace('Contract Period', '')}
                                            </span>
                                          </div>
                                          <CardTitle className='text-base md:text-lg mb-1'>
                                            {project.title}
                                          </CardTitle>
                                          {!isExpanded && (
                                            <div className='flex flex-wrap gap-1.5 mt-2'>
                                              {project.techStack.slice(0, 4).map(tech => (
                                                <Badge
                                                  key={tech}
                                                  variant='outline'
                                                  className='text-xs'
                                                >
                                                  {tech}
                                                </Badge>
                                              ))}
                                              {project.techStack.length > 4 && (
                                                <Badge variant='outline' className='text-xs'>
                                                  +{project.techStack.length - 4}
                                                </Badge>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      <ChevronDown
                                        className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
                                          isExpanded ? 'rotate-180' : ''
                                        }`}
                                      />
                                    </div>
                                  </CardHeader>
                                </button>

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
                                          <p className='text-sm text-foreground'>
                                            {project.context}
                                          </p>
                                        </div>
                                        <div>
                                          <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2'>
                                            Challenge
                                          </h3>
                                          <p className='text-sm text-foreground'>
                                            {project.problem}
                                          </p>
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
                          </TimelineContent>
                        </TimelineItem>
                      );
                    })}
                  </React.Fragment>
                );
              })}

              {/* End marker */}
              <TimelineItem>
                <TimelineDate className='text-muted-foreground font-normal'>2020</TimelineDate>
                <TimelinePoint size='sm' />
                <TimelineContent>
                  <span className='text-sm text-muted-foreground pt-1 block'>Career start</span>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;

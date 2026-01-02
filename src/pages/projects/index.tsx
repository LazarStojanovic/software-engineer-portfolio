import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ExternalLink, Github, Clock, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { caseStudies } from '@/data/projects';

const Projects: React.FC = () => {
  const { t } = useTranslation();

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          >
            <Button asChild variant='ghost' className='mb-8'>
              <Link to='/'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Home
              </Link>
            </Button>

            <h1 className='page-title text-foreground mb-4'>{t('projects.title')}</h1>
            <p className='text-xl text-muted-foreground mb-12 max-w-2xl'>
              Deep dives into projects I've led, including technical decisions, challenges faced,
              and measurable outcomes.
            </p>
          </motion.div>

          <div className='space-y-16'>
            {caseStudies.map((project, index) => (
              <motion.article
                key={project.id}
                id={project.slug}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  delay: prefersReducedMotion ? 0 : index * 0.1,
                }}
                className='scroll-mt-24'
              >
                <Card className='overflow-hidden'>
                  <div className='grid lg:grid-cols-3 gap-0'>
                    {/* Project Preview */}
                    <div className='bg-gradient-to-br from-primary/10 via-primary/5 to-accent-500/5 aspect-video lg:aspect-auto lg:min-h-[400px] flex items-center justify-center border-b lg:border-b-0 lg:border-r border-border relative overflow-hidden'>
                      <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                      <div className='relative text-center p-8'>
                        <div className='text-7xl font-display font-bold text-primary/20 mb-2'>
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className='text-sm text-muted-foreground font-medium'>Case Study</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className='lg:col-span-2 p-8 lg:p-10'>
                      <CardHeader className='p-0 mb-6'>
                        <div className='flex flex-wrap items-center gap-3 mb-4'>
                          <Badge variant='secondary'>{project.role}</Badge>
                          <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                            <Clock className='h-4 w-4' />
                            {project.duration}
                          </div>
                        </div>

                        <div className='flex items-start justify-between gap-4'>
                          <CardTitle className='text-2xl md:text-3xl'>{project.title}</CardTitle>
                          <div className='flex gap-2 shrink-0'>
                            {project.liveUrl && (
                              <Button variant='ghost' size='icon' asChild>
                                <a
                                  href={project.liveUrl}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                  aria-label='View live site'
                                >
                                  <ExternalLink className='h-4 w-4' />
                                </a>
                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button variant='ghost' size='icon' asChild>
                                <a
                                  href={project.githubUrl}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                  aria-label='View source code'
                                >
                                  <Github className='h-4 w-4' />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className='p-0 space-y-6'>
                        {/* Context & Problem */}
                        <div className='space-y-4'>
                          <div>
                            <h3 className='text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2'>
                              Context
                            </h3>
                            <p className='text-foreground'>{project.context}</p>
                          </div>
                          <div>
                            <h3 className='text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2'>
                              The Problem
                            </h3>
                            <p className='text-foreground'>{project.problem}</p>
                          </div>
                        </div>

                        <Separator />

                        {/* Approach */}
                        <div>
                          <h3 className='text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3'>
                            Approach
                          </h3>
                          <ul className='space-y-2'>
                            {project.approach.map((step, i) => (
                              <li key={i} className='flex items-start gap-3'>
                                <CheckCircle2 className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                                <span className='text-muted-foreground'>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Separator />

                        {/* Outcomes */}
                        <div>
                          <h3 className='text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4'>
                            Outcomes
                          </h3>
                          <div className='grid grid-cols-3 gap-4'>
                            {project.outcomes.map((outcome, i) => (
                              <div
                                key={i}
                                className='text-center p-4 rounded-xl bg-muted/50 border border-border'
                              >
                                <div className='text-2xl font-bold text-primary mb-1'>
                                  {outcome.value}
                                </div>
                                <div className='text-xs text-muted-foreground uppercase tracking-wide'>
                                  {outcome.metric}
                                </div>
                                {outcome.description && (
                                  <div className='text-xs text-muted-foreground mt-1'>
                                    {outcome.description}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        {/* Technical Decisions */}
                        <div>
                          <h3 className='text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3'>
                            Key Technical Decisions
                          </h3>
                          <div className='space-y-3'>
                            {project.technicalDecisions.map((td, i) => (
                              <div
                                key={i}
                                className='bg-muted/30 rounded-lg p-4 border border-border'
                              >
                                <p className='font-medium text-foreground mb-1'>{td.decision}</p>
                                <p className='text-sm text-muted-foreground'>{td.rationale}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tech Stack */}
                        <div className='flex flex-wrap gap-2 pt-2'>
                          {project.techStack.map(tech => (
                            <Badge key={tech} variant='outline'>
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;

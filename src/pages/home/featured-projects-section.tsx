import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkles } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { featuredProjects } from '@/data/projects';
import type { Variants, Transition } from 'framer-motion';

interface FeaturedProjectsSectionProps {
  animationVariants: Variants;
  transition: Transition;
  prefersReducedMotion: boolean;
  inView: boolean;
}

// Projects that use AI-first development approach
const AI_FIRST_PROJECT_IDS = ['0']; // Symphony AI Platform

const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({
  animationVariants,
  transition,
  prefersReducedMotion,
  inView,
}) => {
  const { t } = useTranslation();

  // Get translated project content
  const getTranslatedTitle = (projectId: string): string =>
    t(`projects.caseStudies.${projectId}.title`);

  const getTranslatedProblem = (projectId: string): string => {
    const problem = t(`projects.caseStudies.${projectId}.problem`);
    // Return first sentence for preview
    return problem.split('.')[0] + '.';
  };

  const isAIFirstProject = (projectId: string): boolean => AI_FIRST_PROJECT_IDS.includes(projectId);

  return (
    <section className='py-24 md:py-32 bg-muted/30'>
      <div className='container-max section-padding'>
        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={animationVariants}
          transition={transition}
          className='flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16'
        >
          <div>
            <h2 className='section-title text-foreground'>{t('projects.title')}</h2>
            <p className='text-muted-foreground mt-2 max-w-xl'>{t('projects.subtitle')}</p>
          </div>
          <Button asChild variant='ghost' className='self-start md:self-auto'>
            <Link to='/projects'>
              {t('projects.viewAll')}
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </motion.div>

        {/* Featured project - large card */}
        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={animationVariants}
          transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.1 }}
          className='mb-8'
        >
          <Link to={`/projects#${featuredProjects[0].slug}`} className='block group'>
            <Card
              className={`overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                isAIFirstProject(featuredProjects[0].id)
                  ? 'hover:shadow-large border-primary/20 hover:border-primary/40'
                  : 'hover:shadow-large'
              }`}
            >
              <div className='grid md:grid-cols-2 gap-0'>
                {/* Project Preview Placeholder */}
                <div className='bg-gradient-to-br from-primary/10 via-primary/5 to-transparent aspect-video md:aspect-auto md:min-h-[300px] flex items-center justify-center border-b md:border-b-0 md:border-r border-border relative overflow-hidden'>
                  <div className='absolute inset-0 bg-grid-pattern opacity-10' />

                  {/* AI-First indicator glow */}
                  {isAIFirstProject(featuredProjects[0].id) && (
                    <div className='absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />
                  )}

                  <div className='relative text-center p-8'>
                    <div className='text-6xl font-display font-bold text-primary/30 mb-2'>01</div>
                    <div className='text-sm text-muted-foreground'>
                      {t('projects.featuredProject')}
                    </div>

                    {/* AI-First badge on preview */}
                    {isAIFirstProject(featuredProjects[0].id) && (
                      <motion.div
                        animate={prefersReducedMotion ? {} : { y: [-2, 2, -2] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className='mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent-500 text-primary-foreground text-xs font-medium shadow-lg'
                      >
                        <Sparkles className='w-3 h-3' />
                        {t('projects.aiFirst')}
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className='p-8 flex flex-col justify-center'>
                  <div className='flex flex-wrap items-center gap-2 mb-4'>
                    <Badge variant='secondary' className='text-xs'>
                      {featuredProjects[0].role}
                    </Badge>
                    {isAIFirstProject(featuredProjects[0].id) && (
                      <Badge className='text-xs bg-primary/10 text-primary border-primary/30 flex items-center gap-1'>
                        <Sparkles className='w-3 h-3' />
                        AI-Powered
                      </Badge>
                    )}
                  </div>

                  <CardTitle className='text-2xl md:text-3xl mb-3 group-hover:text-primary transition-colors'>
                    {getTranslatedTitle(featuredProjects[0].id)}
                  </CardTitle>

                  <p className='text-muted-foreground mb-4 line-clamp-2'>
                    {getTranslatedProblem(featuredProjects[0].id)}
                  </p>

                  {/* Outcome metrics */}
                  <div className='flex items-center gap-2 mb-6 text-sm'>
                    <span className='font-semibold text-primary'>
                      {featuredProjects[0].outcome}
                    </span>
                  </div>

                  <div className='flex flex-wrap gap-2'>
                    {featuredProjects[0].techStack.map(tech => (
                      <Badge key={tech} variant='outline'>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>

        {/* Secondary projects - smaller cards */}
        <div className='grid md:grid-cols-2 gap-6'>
          {featuredProjects.slice(1).map((project, index) => (
            <motion.div
              key={project.id}
              initial='hidden'
              animate={inView ? 'visible' : 'hidden'}
              variants={animationVariants}
              transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.2 + index * 0.1 }}
            >
              <Link to={`/projects#${project.slug}`} className='block h-full group'>
                <Card
                  className={`h-full cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                    isAIFirstProject(project.id)
                      ? 'hover:shadow-large border-primary/20 hover:border-primary/40'
                      : 'hover:shadow-large'
                  }`}
                >
                  <CardHeader>
                    <div className='flex flex-wrap items-center gap-2 mb-2'>
                      <Badge variant='secondary' className='text-xs'>
                        {project.role}
                      </Badge>
                      {isAIFirstProject(project.id) && (
                        <Badge className='text-xs bg-primary/10 text-primary border-primary/30 flex items-center gap-1'>
                          <Sparkles className='w-3 h-3' />
                          AI-Powered
                        </Badge>
                      )}
                    </div>
                    <CardTitle className='text-xl group-hover:text-primary transition-colors'>
                      {getTranslatedTitle(project.id)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <p className='text-muted-foreground text-sm line-clamp-2'>
                      {getTranslatedProblem(project.id)}
                    </p>

                    <div className='text-sm font-medium text-primary'>{project.outcome}</div>

                    <div className='flex flex-wrap gap-2 pt-2'>
                      {project.techStack.map(tech => (
                        <Badge key={tech} variant='outline' className='text-xs'>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;

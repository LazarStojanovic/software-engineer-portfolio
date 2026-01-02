import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

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

const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({
  animationVariants,
  transition,
  prefersReducedMotion,
  inView,
}) => {
  const { t } = useTranslation();

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
            <p className='text-muted-foreground mt-2 max-w-xl'>
              A selection of projects showcasing problem-solving and technical decision-making.
            </p>
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
            <Card className='overflow-hidden hover:shadow-large transition-all duration-300 hover:-translate-y-1'>
              <div className='grid md:grid-cols-2 gap-0'>
                {/* Project Preview Placeholder */}
                <div className='bg-gradient-to-br from-primary/10 via-primary/5 to-transparent aspect-video md:aspect-auto md:min-h-[300px] flex items-center justify-center border-b md:border-b-0 md:border-r border-border relative overflow-hidden'>
                  <div className='absolute inset-0 bg-grid-pattern opacity-10' />
                  <div className='relative text-center p-8'>
                    <div className='text-6xl font-display font-bold text-primary/30 mb-2'>01</div>
                    <div className='text-sm text-muted-foreground'>Featured Project</div>
                  </div>
                </div>

                <div className='p-8 flex flex-col justify-center'>
                  <div className='flex items-center gap-2 mb-4'>
                    <Badge variant='secondary' className='text-xs'>
                      {featuredProjects[0].role}
                    </Badge>
                  </div>

                  <CardTitle className='text-2xl md:text-3xl mb-3 group-hover:text-primary transition-colors'>
                    {featuredProjects[0].title}
                  </CardTitle>

                  <p className='text-muted-foreground mb-4 line-clamp-2'>
                    {featuredProjects[0].problem}
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
                <Card className='h-full cursor-pointer transition-all duration-300 hover:shadow-large hover:-translate-y-1'>
                  <CardHeader>
                    <div className='flex items-center gap-2 mb-2'>
                      <Badge variant='secondary' className='text-xs'>
                        {project.role}
                      </Badge>
                    </div>
                    <CardTitle className='text-xl group-hover:text-primary transition-colors'>
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <p className='text-muted-foreground text-sm line-clamp-2'>{project.problem}</p>

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

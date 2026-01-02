import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Building2, Calendar, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { experiences } from '@/data/experience';

const Experience: React.FC = () => {
  const { t } = useTranslation();

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <>
      <Helmet>
        <title>
          {t('nav.experience')} - {t('hero.name')}
        </title>
        <meta name='description' content='Professional experience and career timeline' />
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

            <h1 className='page-title text-foreground mb-4'>{t('nav.experience')}</h1>
            <p className='text-xl text-muted-foreground mb-16 max-w-2xl'>
              {t('experience.teaser')}. Here's the journey so far.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className='relative max-w-4xl mx-auto'>
            {/* Timeline line */}
            <div className='absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2' />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  delay: prefersReducedMotion ? 0 : index * 0.15,
                }}
                className={`relative mb-12 md:mb-16 pl-12 md:pl-0 ${
                  index % 2 === 0 ? 'md:pr-[50%]' : 'md:pl-[50%]'
                }`}
              >
                {/* Timeline dot */}
                <div className='absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full md:-translate-x-1/2 mt-2 ring-4 ring-background' />

                <div className={`${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className='bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300'>
                    {/* Period Badge */}
                    <div
                      className={`flex items-center gap-2 text-sm text-primary font-medium mb-3 ${index % 2 === 0 ? 'md:justify-end' : ''}`}
                    >
                      <Calendar className='h-4 w-4' />
                      <span>{exp.period}</span>
                    </div>

                    {/* Role & Company */}
                    <h3
                      className={`text-xl font-display font-semibold text-foreground mb-2 ${index % 2 === 0 ? 'md:text-right' : ''}`}
                    >
                      {exp.role}
                    </h3>

                    <div
                      className={`flex items-center gap-3 text-muted-foreground mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}
                    >
                      <div className='flex items-center gap-1'>
                        <Building2 className='h-4 w-4' />
                        <span className='font-medium'>{exp.company}</span>
                      </div>
                      <div className='flex items-center gap-1 text-sm'>
                        <MapPin className='h-3 w-3' />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className={`text-muted-foreground mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}
                    >
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <ul className={`space-y-2 mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className='text-sm text-foreground'>
                          <span className='text-primary mr-2'>→</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div
                      className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}
                    >
                      {exp.technologies.map(tech => (
                        <Badge key={tech} variant='outline' className='text-xs'>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Timeline end dot */}
            <div className='absolute left-4 md:left-1/2 bottom-0 w-3 h-3 bg-muted-foreground rounded-full md:-translate-x-1/2 ring-4 ring-background' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Experience;

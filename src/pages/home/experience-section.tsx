import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Code, Users, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { timing, animationVariants } from './use-animation';
import type { Variants, Transition } from 'framer-motion';

interface ExperienceSectionProps {
  animationVariants: Variants;
  transition: Transition;
  inView: boolean;
}

interface CareerMilestone {
  year: string;
  title: string;
  icon: React.ElementType;
  description: string;
  highlight?: boolean;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ inView }) => {
  const { t } = useTranslation();

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const milestones: CareerMilestone[] = [
    {
      year: '2020',
      title: t('careerJourney.milestones.developer.title'),
      icon: Code,
      description: t('careerJourney.milestones.developer.description'),
    },
    {
      year: '2022',
      title: t('careerJourney.milestones.lead.title'),
      icon: Users,
      description: t('careerJourney.milestones.lead.description'),
    },
    {
      year: '2025',
      title: t('careerJourney.milestones.aifirst.title'),
      icon: Sparkles,
      description: t('careerJourney.milestones.aifirst.description'),
      highlight: true,
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const milestoneVariants: Variants = prefersReducedMotion
    ? animationVariants.fade
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: timing.slow,
          },
        },
      };

  return (
    <section className='py-24 md:py-32 bg-muted/30 relative overflow-hidden'>
      {/* Background pattern */}
      <div className='absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]' />

      <div className='container-max section-padding relative z-10'>
        {/* Section Header */}
        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={animationVariants.fadeUp}
          transition={{ duration: prefersReducedMotion ? 0 : timing.slow }}
          className='text-center mb-12 md:mb-16'
        >
          <h2 className='section-title mb-4'>{t('careerJourney.title')}</h2>
          <p className='text-muted-foreground max-w-xl mx-auto'>{t('careerJourney.subtitle')}</p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className='max-w-3xl mx-auto'
        >
          {/* Desktop Timeline */}
          <div className='hidden md:block relative'>
            {/* Connecting line */}
            <div className='absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-border via-primary/30 to-primary -translate-y-1/2' />

            <div className='grid grid-cols-3 gap-4'>
              {milestones.map(milestone => (
                <motion.div
                  key={milestone.year}
                  variants={milestoneVariants}
                  className='relative pt-12'
                >
                  {/* Year marker */}
                  <div
                    className={`absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center ${
                      milestone.highlight ? 'z-10' : ''
                    }`}
                  >
                    {/* Dot */}
                    <motion.div
                      className={`w-4 h-4 rounded-full border-4 ${
                        milestone.highlight
                          ? 'bg-primary border-primary shadow-lg shadow-primary/30'
                          : 'bg-card border-border'
                      }`}
                      animate={
                        milestone.highlight && !prefersReducedMotion ? { scale: [1, 1.2, 1] } : {}
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Year */}
                    <span
                      className={`mt-2 text-sm font-mono font-semibold ${
                        milestone.highlight ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {milestone.year}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className={`bg-card border rounded-xl p-5 text-center transition-all duration-300 hover:shadow-medium ${
                      milestone.highlight
                        ? 'border-primary/30 shadow-soft'
                        : 'border-border hover:border-primary/20'
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 mx-auto mb-3 rounded-lg flex items-center justify-center ${
                        milestone.highlight ? 'bg-primary/20' : 'bg-primary/10'
                      }`}
                    >
                      <milestone.icon
                        className={`w-5 h-5 ${milestone.highlight ? 'text-primary' : 'text-primary/70'}`}
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-sm font-display font-semibold mb-2 ${
                        milestone.highlight ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {milestone.title}
                    </h3>

                    {/* Description */}
                    <p className='text-xs text-muted-foreground'>{milestone.description}</p>

                    {/* Current badge */}
                    {milestone.highlight && (
                      <div className='mt-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium'>
                        <span className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse' />
                        {t('careerJourney.current')}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline - Vertical */}
          <div className='md:hidden space-y-6'>
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                variants={milestoneVariants}
                className='relative pl-8'
              >
                {/* Vertical line */}
                {index < milestones.length - 1 && (
                  <div className='absolute left-[7px] top-8 bottom-0 w-0.5 bg-border' />
                )}

                {/* Dot */}
                <div
                  className={`absolute left-0 top-2 w-4 h-4 rounded-full border-4 ${
                    milestone.highlight ? 'bg-primary border-primary' : 'bg-card border-border'
                  }`}
                />

                {/* Content */}
                <div
                  className={`bg-card border rounded-xl p-4 ${
                    milestone.highlight ? 'border-primary/30' : 'border-border'
                  }`}
                >
                  <div className='flex items-center gap-3 mb-2'>
                    <span
                      className={`text-xs font-mono font-semibold ${
                        milestone.highlight ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {milestone.year}
                    </span>
                    <milestone.icon className='w-4 h-4 text-primary' />
                  </div>
                  <h3 className='text-sm font-semibold text-foreground mb-1'>{milestone.title}</h3>
                  <p className='text-xs text-muted-foreground'>{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: prefersReducedMotion ? 0 : timing.slow,
            delay: prefersReducedMotion ? 0 : 0.5,
          }}
          className='text-center mt-12'
        >
          <Button asChild variant='outline' className='group'>
            <Link to='/experience'>
              {t('careerJourney.cta')}
              <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;

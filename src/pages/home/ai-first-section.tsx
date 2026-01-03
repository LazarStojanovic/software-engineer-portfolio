import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Lightbulb,
  Sparkles,
  CheckCircle,
  Rocket,
  ArrowRight,
  Zap,
  Clock,
  Palette,
} from 'lucide-react';

import { timing, easing, animationVariants } from './use-animation';
import type { Variants, Transition } from 'framer-motion';

interface AIFirstSectionProps {
  animationVariants: Variants;
  transition: Transition;
  prefersReducedMotion: boolean;
  inView: boolean;
}

interface WorkflowStep {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

const AIFirstSection: React.FC<AIFirstSectionProps> = ({ prefersReducedMotion, inView }) => {
  const { t } = useTranslation();

  const workflowSteps: WorkflowStep[] = [
    {
      icon: Lightbulb,
      title: t('aiFirst.steps.ideate.title'),
      description: t('aiFirst.steps.ideate.description'),
    },
    {
      icon: Sparkles,
      title: t('aiFirst.steps.generate.title'),
      description: t('aiFirst.steps.generate.description'),
    },
    {
      icon: CheckCircle,
      title: t('aiFirst.steps.refine.title'),
      description: t('aiFirst.steps.refine.description'),
    },
    {
      icon: Rocket,
      title: t('aiFirst.steps.ship.title'),
      description: t('aiFirst.steps.ship.description'),
    },
  ];

  const benefits: Benefit[] = [
    {
      icon: Zap,
      title: t('aiFirst.benefits.velocity.title'),
      description: t('aiFirst.benefits.velocity.description'),
    },
    {
      icon: CheckCircle,
      title: t('aiFirst.benefits.quality.title'),
      description: t('aiFirst.benefits.quality.description'),
    },
    {
      icon: Clock,
      title: t('aiFirst.benefits.focus.title'),
      description: t('aiFirst.benefits.focus.description'),
    },
    {
      icon: Palette,
      title: t('aiFirst.benefits.creativity.title'),
      description: t('aiFirst.benefits.creativity.description'),
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const stepVariants: Variants = prefersReducedMotion
    ? animationVariants.fade
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: timing.slow,
            ease: easing.decelerate,
          },
        },
      };

  return (
    <section className='py-24 md:py-32 bg-background relative overflow-hidden'>
      {/* Background effects */}
      <div className='absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]' />
      <div className='absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl' />
      <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl' />

      <div className='container-max section-padding relative z-10'>
        {/* Section Header */}
        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={animationVariants.fadeUp}
          transition={{ duration: prefersReducedMotion ? 0 : timing.slow }}
          className='text-center mb-16'
        >
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6'>
            <Sparkles className='w-4 h-4' />
            {t('aiFirst.badge')}
          </div>
          <h2 className='section-title mb-4'>{t('aiFirst.title')}</h2>
          <p className='text-muted-foreground max-w-2xl mx-auto text-lg'>{t('aiFirst.subtitle')}</p>
        </motion.div>

        {/* Workflow Steps - Horizontal on desktop, vertical on mobile */}
        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className='relative max-w-5xl mx-auto mb-20'
        >
          {/* Connecting line - horizontal on desktop */}
          <div className='hidden md:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20' />

          <div className='grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4'>
            {workflowSteps.map((step, index) => (
              <motion.div key={step.title} variants={stepVariants} className='relative group'>
                {/* Step card */}
                <div className='bg-card border border-border rounded-2xl p-6 text-center hover:shadow-medium hover:border-primary/20 transition-all duration-300 h-full'>
                  {/* Step number */}
                  <div className='absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center'>
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className='w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                    <step.icon className='w-7 h-7 text-primary' />
                  </div>

                  {/* Title */}
                  <h3 className='text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors'>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className='text-sm text-muted-foreground'>{step.description}</p>
                </div>

                {/* Arrow connector (mobile only) */}
                {index < workflowSteps.length - 1 && (
                  <div className='md:hidden flex justify-center my-4'>
                    <ArrowRight className='w-5 h-5 text-primary/40 rotate-90' />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{
            duration: prefersReducedMotion ? 0 : timing.slow,
            delay: prefersReducedMotion ? 0 : 0.5,
          }}
          className='text-center mb-16'
        >
          <blockquote className='text-2xl md:text-3xl font-display font-semibold text-foreground italic'>
            "{t('aiFirst.tagline')}"
          </blockquote>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto'
        >
          {benefits.map(benefit => (
            <motion.div key={benefit.title} variants={stepVariants} className='group'>
              <div className='bg-muted/50 border border-border/50 rounded-xl p-5 text-center hover:bg-card hover:border-border hover:shadow-soft transition-all duration-300 h-full'>
                <div className='w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                  <benefit.icon className='w-5 h-5 text-primary' />
                </div>
                <h4 className='text-sm font-semibold text-foreground mb-1'>{benefit.title}</h4>
                <p className='text-xs text-muted-foreground'>{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AIFirstSection;

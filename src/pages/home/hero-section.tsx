import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Variants, Transition } from 'framer-motion';

interface HeroSectionProps {
  animationVariants: Variants;
  transition: Transition;
  prefersReducedMotion: boolean;
  inView: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  animationVariants,
  transition,
  prefersReducedMotion,
  inView,
}) => {
  const { t } = useTranslation();

  const scrollToProjects = (): void => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className='min-h-screen flex items-center relative overflow-hidden pt-20 md:pt-24'>
      {/* Subtle Background Effects */}
      <div className='absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]' />
      <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-500/5' />
      <div className='absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 dark:opacity-20' />
      <div className='absolute bottom-1/4 left-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl opacity-20 dark:opacity-10' />

      <div className='container-max section-padding relative z-10 w-full'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Left Content - Text */}
          <motion.div
            initial='hidden'
            animate={inView ? 'visible' : 'hidden'}
            variants={animationVariants}
            transition={transition}
            className='text-left'
          >
            {/* Role Badge */}
            <motion.div
              variants={animationVariants}
              transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.05 }}
              className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6'
            >
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75' />
                <span className='relative inline-flex rounded-full h-2 w-2 bg-primary' />
              </span>
              {t('hero.role')}
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={animationVariants}
              transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.1 }}
              className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-foreground mb-6 leading-[1.1] tracking-tight'
            >
              {t('hero.name')}
            </motion.h1>

            {/* Value Proposition */}
            <motion.p
              variants={animationVariants}
              transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.2 }}
              className='text-xl md:text-2xl text-foreground mb-4 max-w-xl font-medium'
            >
              {t('hero.valueProp')}
            </motion.p>

            {/* Subtitle */}
            <motion.p
              variants={animationVariants}
              transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.25 }}
              className='text-lg text-muted-foreground mb-6 max-w-xl'
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Credibility Line */}
            <motion.p
              variants={animationVariants}
              transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.3 }}
              className='text-sm text-muted-foreground mb-8'
            >
              {t('hero.credibility')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={animationVariants}
              transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.35 }}
              className='flex flex-col sm:flex-row gap-4'
            >
              <Button asChild size='lg' className='text-base'>
                <Link to='/projects'>{t('hero.cta.primary')}</Link>
              </Button>
              <Button asChild variant='outline' size='lg' className='text-base'>
                <Link to='/contact'>
                  <Mail className='mr-2 h-4 w-4' />
                  {t('hero.cta.secondary')}
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Visual Element / Avatar Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.3 }}
            className='hidden lg:flex items-center justify-center'
          >
            <div className='relative'>
              {/* Decorative rings */}
              <div className='absolute inset-0 -m-8 rounded-full border border-border/50 animate-pulse' />
              <div className='absolute inset-0 -m-16 rounded-full border border-border/30' />
              <div className='absolute inset-0 -m-24 rounded-full border border-border/20' />

              {/* Avatar placeholder */}
              <div className='w-64 h-64 xl:w-80 xl:h-80 rounded-full bg-gradient-to-br from-primary/20 via-accent-500/20 to-primary/10 flex items-center justify-center border border-border/50 shadow-large'>
                <div className='text-6xl xl:text-7xl font-display font-bold text-primary/60'>
                  LS
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.5 }}
          onClick={scrollToProjects}
          className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group'
          aria-label={t('hero.scroll')}
        >
          <span className='text-xs font-medium tracking-wide uppercase'>{t('hero.scroll')}</span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className='h-5 w-5 group-hover:text-primary transition-colors' />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;

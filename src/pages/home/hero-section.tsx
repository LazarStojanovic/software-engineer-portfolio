import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, ChevronDown, Calendar, Briefcase, Users, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import profileImage from '@/assets/images/lazar-portfolio.png';
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
      {/* Enhanced Background Effects */}
      <div className='absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]' />
      <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-500/5' />

      {/* Animated gradient orbs */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: [0, 50, 0],
                y: [0, -30, 0],
              }
        }
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className='absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/15 to-primary/5 rounded-full blur-[100px]'
      />
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: [0, -40, 0],
                y: [0, 40, 0],
              }
        }
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className='absolute bottom-1/4 left-1/6 w-[500px] h-[500px] bg-gradient-to-tr from-accent-500/15 to-accent-500/5 rounded-full blur-[100px]'
      />

      {/* Floating geometric shapes */}
      <motion.div
        animate={prefersReducedMotion ? {} : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className='absolute top-20 right-20 w-32 h-32 border border-primary/10 rounded-full'
      />
      <motion.div
        animate={prefersReducedMotion ? {} : { rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className='absolute bottom-32 left-16 w-24 h-24 border border-accent-500/10 rounded-lg rotate-45'
      />
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className='absolute top-1/3 left-10 w-3 h-3 bg-primary/30 rounded-full'
      />
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className='absolute bottom-1/3 right-16 w-2 h-2 bg-accent-500/40 rounded-full'
      />

      <div className='container-max section-padding relative z-10 w-full'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
          {/* Left Content - Text */}
          <motion.div
            initial='hidden'
            animate={inView ? 'visible' : 'hidden'}
            variants={animationVariants}
            transition={transition}
            className='text-left order-2 lg:order-1'
          >
            {/* Status Badge */}
            <motion.div
              variants={animationVariants}
              transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.05 }}
              className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-600 dark:text-accent-400 text-sm font-medium mb-6'
            >
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-75' />
                <span className='relative inline-flex rounded-full h-2 w-2 bg-accent-500' />
              </span>
              {t('hero.status')}
            </motion.div>

            {/* Name with gradient accent */}
            <motion.h1
              variants={animationVariants}
              transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.1 }}
              className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-foreground mb-4 leading-[1.1] tracking-tight'
            >
              {t('hero.name')}
            </motion.h1>

            {/* Role with animated underline */}
            <motion.div
              variants={animationVariants}
              transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.15 }}
              className='mb-6'
            >
              <span className='text-xl md:text-2xl font-semibold bg-gradient-to-r from-primary via-primary to-accent-500 bg-clip-text text-transparent'>
                {t('hero.role')}
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                className='h-0.5 w-32 bg-gradient-to-r from-primary to-accent-500 origin-left mt-2'
              />
            </motion.div>

            {/* Value Proposition */}
            <motion.p
              variants={animationVariants}
              transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.2 }}
              className='text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed'
            >
              {t('hero.valueProp')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={animationVariants}
              transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.25 }}
              className='flex flex-col sm:flex-row gap-4 mb-10'
            >
              <Button asChild size='lg' className='text-base group'>
                <Link to='/projects'>
                  {t('hero.cta.primary')}
                  <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                </Link>
              </Button>
              <Button asChild variant='outline' size='lg' className='text-base'>
                <Link to='/contact'>
                  <Mail className='mr-2 h-4 w-4' />
                  {t('hero.cta.secondary')}
                </Link>
              </Button>
            </motion.div>

            {/* Quick Stats - Cards style */}
            <motion.div
              variants={animationVariants}
              transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.3 }}
              className='flex flex-wrap gap-4'
            >
              {[
                { icon: Calendar, value: '5+', label: 'Years' },
                { icon: Briefcase, value: '11+', label: 'Projects' },
                { icon: Users, value: '8', label: 'Team Led' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.5,
                    delay: prefersReducedMotion ? 0 : 0.4 + index * 0.1,
                    ease: 'easeOut',
                  }}
                  className='flex items-center gap-3 px-4 py-3 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm'
                >
                  <div className='p-2 rounded-lg bg-primary/10'>
                    <stat.icon className='w-4 h-4 text-primary' />
                  </div>
                  <div>
                    <div className='text-lg font-bold text-foreground'>{stat.value}</div>
                    <div className='text-xs text-muted-foreground'>{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.2 }}
            className='relative order-1 lg:order-2 flex justify-center lg:justify-end'
          >
            <div className='relative group'>
              {/* Animated gradient border */}
              <div
                className='absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary via-accent-500 to-primary opacity-50 blur-sm group-hover:opacity-75 transition-opacity duration-500'
                style={{
                  backgroundSize: '200% 200%',
                  animation: prefersReducedMotion ? 'none' : 'gradient-shift 4s ease infinite',
                }}
              />

              {/* Outer decorative elements */}
              <div className='absolute -inset-6 rounded-3xl border border-border/20' />
              <div className='absolute -inset-10 rounded-[2rem] border border-border/10' />

              {/* Corner accents - animated */}
              <motion.div
                animate={prefersReducedMotion ? {} : { opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className='absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-primary rounded-tl-xl'
              />
              <motion.div
                animate={prefersReducedMotion ? {} : { opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className='absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-primary rounded-tr-xl'
              />
              <motion.div
                animate={prefersReducedMotion ? {} : { opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className='absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-accent-500 rounded-bl-xl'
              />
              <motion.div
                animate={prefersReducedMotion ? {} : { opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                className='absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-accent-500 rounded-br-xl'
              />

              {/* Profile Image Container */}
              <div className='relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-2xl'>
                <img
                  src={profileImage}
                  alt={t('hero.name')}
                  className='w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105'
                />
                {/* Subtle overlay gradient */}
                <div className='absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              </div>

              {/* Decorative dots pattern */}
              <div className='absolute -right-8 top-1/4 flex flex-col gap-2'>
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 0.3 + i * 0.15 } : { opacity: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className='w-1.5 h-1.5 rounded-full bg-primary'
                  />
                ))}
              </div>
              <div className='absolute -left-8 bottom-1/4 flex flex-col gap-2'>
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 0.3 + i * 0.15 } : { opacity: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className='w-1.5 h-1.5 rounded-full bg-accent-500'
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.6 }}
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

      {/* CSS for gradient animation */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, Shield, GitBranch } from 'lucide-react';

import { timing, easing, animationVariants } from './use-animation';
import type { Variants, Transition } from 'framer-motion';

interface ApproachSectionProps {
  animationVariants: Variants;
  transition: Transition;
  prefersReducedMotion: boolean;
  inView: boolean;
}

interface Principle {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
}

const ApproachSection: React.FC<ApproachSectionProps> = ({ prefersReducedMotion, inView }) => {
  const principles: Principle[] = [
    {
      icon: Layers,
      title: 'Component Architecture',
      description: 'Building systems, not just features',
      details: [
        'Atomic design with composable primitives',
        'Separation of concerns: UI, logic, data',
        'Consistent patterns across the codebase',
      ],
    },
    {
      icon: Zap,
      title: 'Performance First',
      description: 'Fast by default, optimized when needed',
      details: [
        'Code splitting at route and component level',
        'Lazy loading for non-critical resources',
        'Core Web Vitals as key metrics',
      ],
    },
    {
      icon: Shield,
      title: 'Type Safety',
      description: 'Catching bugs before they ship',
      details: [
        'Strict TypeScript with no implicit any',
        'Runtime validation at system boundaries',
        'Exhaustive pattern matching',
      ],
    },
    {
      icon: GitBranch,
      title: 'Testing Strategy',
      description: 'Confidence through coverage',
      details: [
        'Unit tests for business logic',
        'Integration tests for user flows',
        'E2E tests for critical paths',
      ],
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants: Variants = prefersReducedMotion
    ? animationVariants.fade
    : {
        hidden: { opacity: 0, y: 20 },
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
      {/* Subtle background pattern */}
      <div className='absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]' />

      <div className='container-max section-padding relative z-10'>
        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={animationVariants.fadeUp}
          transition={{ duration: prefersReducedMotion ? 0 : timing.slow }}
          className='text-center mb-12 md:mb-16'
        >
          <h2 className='section-title mb-4'>How I Build</h2>
          <p className='text-muted-foreground max-w-2xl mx-auto text-lg'>
            Principles that guide my technical decisions and help me ship reliable software.
          </p>
        </motion.div>

        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className='grid md:grid-cols-2 gap-6 max-w-5xl mx-auto'
        >
          {principles.map(principle => (
            <motion.div key={principle.title} variants={itemVariants} className='group'>
              <div className='h-full bg-card border border-border rounded-2xl p-6 hover:shadow-medium hover:border-primary/20 transition-all duration-300'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors'>
                    <principle.icon className='w-6 h-6 text-primary' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-lg font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors'>
                      {principle.title}
                    </h3>
                    <p className='text-sm text-muted-foreground mb-4'>{principle.description}</p>
                    <ul className='space-y-2'>
                      {principle.details.map((detail, i) => (
                        <li
                          key={i}
                          className='text-sm text-muted-foreground flex items-center gap-2'
                        >
                          <span className='w-1.5 h-1.5 rounded-full bg-primary/50' />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Code philosophy snippet - visual differentiator */}
        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={animationVariants.fadeUp}
          transition={{
            duration: prefersReducedMotion ? 0 : timing.slow,
            delay: prefersReducedMotion ? 0 : 0.4,
          }}
          className='mt-12 md:mt-16 max-w-3xl mx-auto'
        >
          <div className='bg-card border border-border rounded-2xl overflow-hidden'>
            <div className='bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-2'>
              <div className='flex gap-1.5'>
                <div className='w-3 h-3 rounded-full bg-red-500/60' />
                <div className='w-3 h-3 rounded-full bg-yellow-500/60' />
                <div className='w-3 h-3 rounded-full bg-green-500/60' />
              </div>
              <span className='text-xs text-muted-foreground font-mono ml-2'>
                use-data-fetching.ts
              </span>
            </div>
            <pre className='p-4 md:p-6 overflow-x-auto text-sm'>
              <code className='text-muted-foreground font-mono'>
                <span className='text-primary'>{'// Custom hook pattern I use frequently'}</span>
                {'\n'}
                <span className='text-blue-500 dark:text-blue-400'>export function</span>{' '}
                <span className='text-amber-600 dark:text-amber-400'>useDataFetching</span>
                {'<T>(url: string) {\n'}
                {'  '}
                <span className='text-blue-500 dark:text-blue-400'>const</span>
                {' [data, setData] = '}
                <span className='text-amber-600 dark:text-amber-400'>useState</span>
                {'<T | null>(null);\n'}
                {'  '}
                <span className='text-blue-500 dark:text-blue-400'>const</span>
                {' [error, setError] = '}
                <span className='text-amber-600 dark:text-amber-400'>useState</span>
                {'<Error | null>(null);\n'}
                {'  '}
                <span className='text-blue-500 dark:text-blue-400'>const</span>
                {' [isLoading, setIsLoading] = '}
                <span className='text-amber-600 dark:text-amber-400'>useState</span>
                {'(true);\n\n'}
                {'  '}
                <span className='text-primary'>{'// ... implementation'}</span>
                {'\n\n'}
                {'  '}
                <span className='text-blue-500 dark:text-blue-400'>return</span>
                {' { data, error, isLoading, refetch };\n'}
                {'}'}
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApproachSection;

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { timing, easing, animationVariants } from './use-animation';
import type { TechCategory } from '@/types';
import type { Variants, Transition } from 'framer-motion';

interface TechStackSectionProps {
  animationVariants: Variants;
  transition: Transition;
  prefersReducedMotion: boolean;
  inView: boolean;
}

interface ExtendedTechCategory extends TechCategory {
  isAI?: boolean;
}

const TechStackSection: React.FC<TechStackSectionProps> = ({ prefersReducedMotion, inView }) => {
  const { t } = useTranslation();

  const techCategories: ExtendedTechCategory[] = [
    {
      name: t('techStack.frontend.title'),
      technologies: t('techStack.frontend.technologies').split(', '),
    },
    {
      name: t('techStack.styling.title'),
      technologies: t('techStack.styling.technologies').split(', '),
    },
    {
      name: t('techStack.tooling.title'),
      technologies: t('techStack.tooling.technologies').split(', '),
    },
    {
      name: t('techStack.ai.title'),
      technologies: t('techStack.ai.technologies').split(', '),
      isAI: true,
    },
  ];

  // Container animation for staggered children
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  // Category card animation
  const categoryVariants: Variants = prefersReducedMotion
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

  // Badge pop animation
  const badgeVariants: Variants = prefersReducedMotion
    ? animationVariants.fade
    : {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: timing.fast,
            ease: easing.bounce,
          },
        },
      };

  return (
    <section className='py-24 md:py-32 bg-background relative overflow-hidden'>
      {/* Background effects */}
      <div className='absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]' />

      <div className='container-max section-padding relative z-10'>
        <motion.h2
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={animationVariants.fadeUp}
          transition={{ duration: prefersReducedMotion ? 0 : timing.slow }}
          className='section-title text-center mb-4'
        >
          {t('techStack.title')}
        </motion.h2>

        <motion.p
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={animationVariants.fadeUp}
          transition={{ duration: prefersReducedMotion ? 0 : timing.slow, delay: 0.1 }}
          className='text-center text-muted-foreground mb-12 md:mb-16 max-w-xl mx-auto'
        >
          {t('techStack.subtitle')}
        </motion.p>

        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'
        >
          {techCategories.map(category => (
            <motion.div
              key={category.name}
              variants={categoryVariants}
              className='text-center group'
            >
              <div
                className={`bg-card border rounded-2xl p-6 h-full transition-all duration-300 ${
                  category.isAI
                    ? 'border-primary/30 hover:shadow-large hover:border-primary/50 relative overflow-hidden'
                    : 'border-border hover:shadow-medium hover:border-primary/20'
                }`}
              >
                {/* AI category special glow effect */}
                {category.isAI && (
                  <>
                    <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-500/5' />
                    <div className='absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl' />
                  </>
                )}

                <div className='relative z-10'>
                  {/* Category header */}
                  <div className='flex items-center justify-center gap-2 mb-6'>
                    {category.isAI && <Sparkles className='w-5 h-5 text-primary' />}
                    <h3
                      className={`text-lg font-display font-semibold transition-colors ${
                        category.isAI ? 'text-primary' : 'text-foreground group-hover:text-primary'
                      }`}
                    >
                      {category.name}
                    </h3>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    className='flex flex-wrap justify-center gap-2'
                  >
                    {category.technologies.map(tech => (
                      <motion.div
                        key={tech}
                        variants={badgeVariants}
                        whileHover={
                          prefersReducedMotion
                            ? {}
                            : {
                                y: -2,
                                scale: 1.05,
                                transition: { duration: timing.fast },
                              }
                        }
                        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                      >
                        <Badge
                          variant={category.isAI ? 'default' : 'outline'}
                          className={`text-sm cursor-default transition-colors ${
                            category.isAI
                              ? 'bg-primary/20 text-primary border-primary/30 hover:bg-primary/30'
                              : 'hover:bg-primary/10 hover:border-primary/30'
                          }`}
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;

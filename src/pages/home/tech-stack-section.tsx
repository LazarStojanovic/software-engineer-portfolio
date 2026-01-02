import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

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

const TechStackSection: React.FC<TechStackSectionProps> = ({ prefersReducedMotion, inView }) => {
  const { t } = useTranslation();

  const techCategories: TechCategory[] = [
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
    <section className='py-24 md:py-32 bg-background'>
      <div className='container-max section-padding'>
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
          Technologies I use to build scalable, maintainable applications.
        </motion.p>

        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto'
        >
          {techCategories.map(category => (
            <motion.div
              key={category.name}
              variants={categoryVariants}
              className='text-center group'
            >
              <div className='bg-card border border-border rounded-2xl p-6 h-full hover:shadow-medium hover:border-primary/20 transition-all duration-300'>
                <h3 className='text-lg font-display font-semibold mb-6 text-foreground group-hover:text-primary transition-colors'>
                  {category.name}
                </h3>
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
                        variant='outline'
                        className='text-sm cursor-default hover:bg-primary/10 hover:border-primary/30 transition-colors'
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;

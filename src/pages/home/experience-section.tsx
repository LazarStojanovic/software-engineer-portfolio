import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Briefcase } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { timing, animationVariants } from './use-animation';
import type { Variants, Transition } from 'framer-motion';

interface ExperienceSectionProps {
  animationVariants: Variants;
  transition: Transition;
  inView: boolean;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ inView }) => {
  const { t } = useTranslation();

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section className='py-24 md:py-32 bg-muted/30'>
      <div className='container-max section-padding'>
        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={animationVariants.fade}
          transition={{ duration: prefersReducedMotion ? 0 : timing.slow }}
          className='max-w-3xl mx-auto'
        >
          <div className='flex flex-col md:flex-row md:items-center gap-8 md:gap-12'>
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: prefersReducedMotion ? 0 : timing.normal, delay: 0.1 }}
              className='w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0'
            >
              <Briefcase className='w-10 h-10 md:w-12 md:h-12 text-primary' />
            </motion.div>

            {/* Content */}
            <div className='flex-1'>
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : timing.slow, delay: 0.15 }}
                className='text-2xl md:text-3xl font-display font-semibold text-foreground mb-3'
              >
                {t('experience.teaser')}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : timing.slow, delay: 0.2 }}
                className='text-lg text-muted-foreground mb-6'
              >
                {t('experience.description')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : timing.slow, delay: 0.25 }}
              >
                <Button asChild variant='outline' className='group'>
                  <Link to='/experience'>
                    {t('experience.link')}
                    <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;

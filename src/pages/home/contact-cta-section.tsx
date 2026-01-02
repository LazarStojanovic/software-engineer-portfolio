import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { timing, easing, animationVariants } from './use-animation';
import type { Variants, Transition } from 'framer-motion';

interface ContactCTASectionProps {
  animationVariants: Variants;
  transition: Transition;
  inView: boolean;
}

const ContactCTASection: React.FC<ContactCTASectionProps> = ({ inView }) => {
  const { t } = useTranslation();

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section className='py-24 md:py-32 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]' />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-30' />

      <div className='container-max section-padding relative z-10'>
        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={animationVariants.fadeUp}
          transition={{
            duration: prefersReducedMotion ? 0 : timing.slow,
            ease: easing.smooth,
          }}
          className='max-w-2xl mx-auto text-center'
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{
              duration: prefersReducedMotion ? 0 : timing.normal,
              ease: easing.bounce,
            }}
            className='w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8'
          >
            <Mail className='w-8 h-8 text-primary' />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: prefersReducedMotion ? 0 : timing.slow,
              delay: 0.1,
              ease: easing.decelerate,
            }}
            className='section-title mb-4'
          >
            {t('contact.headline')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: prefersReducedMotion ? 0 : timing.slow,
              delay: 0.15,
              ease: easing.decelerate,
            }}
            className='text-lg text-muted-foreground mb-8'
          >
            I'm always interested in hearing about new projects and opportunities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: prefersReducedMotion ? 0 : timing.slow,
              delay: 0.2,
              ease: easing.decelerate,
            }}
          >
            <Button asChild size='lg' className='text-base group'>
              <Link to='/contact'>
                {t('contact.cta')}
                <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTASection;

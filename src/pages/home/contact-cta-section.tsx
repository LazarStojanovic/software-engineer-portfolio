import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, ArrowRight, Calendar, MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
          {/* Availability Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{
              duration: prefersReducedMotion ? 0 : timing.normal,
              ease: easing.bounce,
            }}
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-600 dark:text-accent-400 text-sm font-medium mb-8'
          >
            <motion.span
              animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className='w-2 h-2 rounded-full bg-accent-500'
            />
            {t('contactCta.status')}
          </motion.div>

          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{
              duration: prefersReducedMotion ? 0 : timing.normal,
              ease: easing.bounce,
              delay: 0.1,
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
              delay: 0.15,
              ease: easing.decelerate,
            }}
            className='section-title mb-4'
          >
            {t('contactCta.headline')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: prefersReducedMotion ? 0 : timing.slow,
              delay: 0.2,
              ease: easing.decelerate,
            }}
            className='text-lg text-muted-foreground mb-8'
          >
            {t('contactCta.subheadline')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: prefersReducedMotion ? 0 : timing.slow,
              delay: 0.25,
              ease: easing.decelerate,
            }}
            className='flex flex-col sm:flex-row items-center justify-center gap-4'
          >
            <Button asChild size='lg' className='text-base group'>
              <Link to='/contact'>
                <MessageCircle className='mr-2 h-4 w-4' />
                {t('contactCta.primary')}
                <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
              </Link>
            </Button>
          </motion.div>

          {/* Preferred contact hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : timing.slow,
              delay: 0.35,
            }}
            className='mt-8 flex flex-wrap items-center justify-center gap-4'
          >
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Mail className='w-4 h-4' />
              <span>{t('contactCta.preferredEmail')}</span>
            </div>
            <span className='hidden sm:inline text-border'>|</span>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Calendar className='w-4 h-4' />
              <span>{t('contactCta.responseTime')}</span>
            </div>
          </motion.div>

          {/* Open to badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration: prefersReducedMotion ? 0 : timing.slow,
              delay: 0.4,
            }}
            className='mt-8 flex flex-wrap items-center justify-center gap-2'
          >
            <span className='text-xs text-muted-foreground mr-2'>{t('contactCta.openTo')}</span>
            <Badge variant='outline' className='text-xs'>
              {t('contactCta.roles.fullTime')}
            </Badge>
            <Badge variant='outline' className='text-xs'>
              {t('contactCta.roles.contract')}
            </Badge>
            <Badge variant='outline' className='text-xs'>
              {t('contactCta.roles.remote')}
            </Badge>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTASection;

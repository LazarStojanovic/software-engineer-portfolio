import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Linkedin, Github, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useReducedMotion } from '../hooks';

const CareerCta: React.FC = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : 0.3,
      }}
      className='mt-16 max-w-4xl mx-auto'
    >
      <div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-accent-500/10 border border-border p-8 md:p-12'>
        {/* Background decoration */}
        <div className='absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />
        <div className='absolute bottom-0 left-0 w-48 h-48 bg-accent-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2' />

        <div className='relative z-10'>
          <h2 className='text-2xl md:text-3xl font-display font-bold text-foreground mb-4'>
            {t('experience.cta.headline')}
          </h2>
          <p className='text-muted-foreground mb-8 max-w-xl'>{t('experience.cta.subheadline')}</p>

          <div className='flex flex-wrap gap-4'>
            <Button asChild size='lg' className='group'>
              <Link to='/contact'>
                <Mail className='mr-2 h-4 w-4' />
                {t('experience.cta.contact')}
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>

            <div className='flex items-center gap-2'>
              <Button asChild variant='outline' size='icon' className='h-11 w-11'>
                <a
                  href='https://www.linkedin.com/in/lazar-stojanovic'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='LinkedIn'
                >
                  <Linkedin className='h-5 w-5' />
                </a>
              </Button>
              <Button asChild variant='outline' size='icon' className='h-11 w-11'>
                <a
                  href='https://github.com/lazarstojanovic'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='GitHub'
                >
                  <Github className='h-5 w-5' />
                </a>
              </Button>
            </div>
          </div>

          {/* Status indicator */}
          <div className='mt-8 flex items-center gap-2'>
            <span className='relative flex h-3 w-3'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
              <span className='relative inline-flex rounded-full h-3 w-3 bg-emerald-500' />
            </span>
            <span className='text-sm text-muted-foreground'>{t('experience.cta.status')}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CareerCta;

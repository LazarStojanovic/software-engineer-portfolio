import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, BadgeCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useReducedMotion } from '../hooks';

const PageHeader: React.FC = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
      className='mb-12'
    >
      <Button asChild variant='ghost' className='mb-8'>
        <Link to='/'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          {t('experience.backToHome')}
        </Link>
      </Button>

      <div className='max-w-3xl'>
        <h1 className='page-title text-foreground mb-4'>{t('nav.experience')}</h1>
        <p className='text-lg text-muted-foreground mb-6'>{t('experience.pageSubtitle')}</p>

        {/* References Available Notice */}
        <div className='relative pl-4 py-3 border-l-2 border-emerald-500 bg-gradient-to-r from-emerald-500/5 to-transparent rounded-r-lg'>
          <div className='absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-background border-2 border-emerald-500 flex items-center justify-center'>
            <BadgeCheck className='h-3.5 w-3.5 text-emerald-500' />
          </div>
          <p className='text-sm text-muted-foreground pl-4'>
            <span className='text-emerald-600 dark:text-emerald-400 font-semibold'>
              {t('experience.referencesNotice')}
            </span>
            <span className='mx-2 text-border'>—</span>
            {t('experience.referencesText')}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PageHeader;

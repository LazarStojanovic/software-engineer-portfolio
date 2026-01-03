import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useReducedMotion } from '../hooks';

interface PageHeaderProps {
  projectCount: number;
}

const PageHeader: React.FC<PageHeaderProps> = ({ projectCount }) => {
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
          {t('projects.backToHome')}
        </Link>
      </Button>

      <div className='max-w-3xl'>
        <h1 className='page-title text-foreground mb-4'>{t('projects.title')}</h1>
        <p className='text-lg text-muted-foreground mb-6'>
          {t('projects.projectCount', { count: projectCount })}
        </p>

        {/* NDA Disclaimer */}
        <div className='relative pl-4 py-3 border-l-2 border-amber-500 bg-gradient-to-r from-amber-500/5 to-transparent rounded-r-lg'>
          <div className='absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-background border-2 border-amber-500 flex items-center justify-center'>
            <ShieldAlert className='h-3.5 w-3.5 text-amber-500' />
          </div>
          <p className='text-sm text-muted-foreground pl-4'>
            <span className='text-amber-600 dark:text-amber-400 font-semibold'>
              {t('projects.confidentialityNotice')}
            </span>
            <span className='mx-2 text-border'>—</span>
            {t('projects.confidentialityText')}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PageHeader;

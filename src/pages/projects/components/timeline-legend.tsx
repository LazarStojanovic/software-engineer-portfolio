import React from 'react';
import { useTranslation } from 'react-i18next';

const TimelineLegend: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className='max-w-4xl mx-auto mb-8 flex flex-wrap gap-4 text-sm text-muted-foreground'>
      <div className='flex items-center gap-2'>
        <div className='w-3 h-3 rounded-full bg-primary' />
        <span>{t('projects.legend.fullTime')}</span>
      </div>
      <div className='flex items-center gap-2'>
        <div className='w-3 h-3 rounded-full bg-accent-500' />
        <span>{t('projects.legend.contract')}</span>
      </div>
    </div>
  );
};

export default TimelineLegend;

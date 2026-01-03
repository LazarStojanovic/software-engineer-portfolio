import React from 'react';
import { useTranslation } from 'react-i18next';

const CareerStartMarker: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className='flex items-center gap-4 mt-12'>
      <div className='text-4xl md:text-5xl font-display font-bold text-muted-foreground/50'>
        2020
      </div>
      <div className='flex-1 h-px bg-border' />
      <div className='text-sm text-muted-foreground'>{t('projects.timeline.careerStart')}</div>
    </div>
  );
};

export default CareerStartMarker;

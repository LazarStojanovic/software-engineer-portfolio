import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { experiences } from '@/data/experience';

import { PageHeader, CareerStats, ExperienceCard, CareerCta } from './components';

const Experience: React.FC = () => {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = useCallback((id: string): void => {
    setExpandedId(prev => (prev === id ? null : id));
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {t('nav.experience')} - {t('hero.name')}
        </title>
        <meta name='description' content='Professional experience and career timeline' />
      </Helmet>

      <div className='min-h-screen pt-24 pb-16 bg-background'>
        <div className='container-max section-padding'>
          <PageHeader />

          <CareerStats />

          {/* Timeline */}
          <div className='max-w-4xl mx-auto'>
            <div className='relative ml-4 md:ml-8'>
              {/* Vertical timeline line */}
              <div className='absolute left-0 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2' />

              <div className='space-y-4'>
                {experiences.map((experience, index) => (
                  <ExperienceCard
                    key={experience.id}
                    experience={experience}
                    index={index}
                    isExpanded={expandedId === experience.id}
                    onToggle={() => toggleExpand(experience.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          <CareerCta />
        </div>
      </div>
    </>
  );
};

export default Experience;

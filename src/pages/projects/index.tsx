import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { caseStudies } from '@/data/projects';

import { sortProjects, groupByYear } from './utils';
import { PageHeader, TimelineLegend, YearGroup, CareerStartMarker } from './components';

// Pre-compute sorted projects and year groups (static data)
const sortedProjects = sortProjects(caseStudies);
const yearGroups = groupByYear(sortedProjects);

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = useCallback((id: string): void => {
    setExpandedId(prev => (prev === id ? null : id));
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {t('projects.title')} - {t('hero.name')}
        </title>
        <meta name='description' content='Featured projects and case studies' />
      </Helmet>

      <div className='min-h-screen pt-24 pb-16 bg-background'>
        <div className='container-max section-padding'>
          <PageHeader projectCount={caseStudies.length} />

          <TimelineLegend />

          {/* Timeline by Year */}
          <div className='max-w-4xl mx-auto'>
            {yearGroups.map((group, groupIndex) => (
              <YearGroup
                key={group.year}
                group={group}
                groupIndex={groupIndex}
                expandedId={expandedId}
                allProjects={caseStudies}
                onToggleExpand={toggleExpand}
              />
            ))}

            <CareerStartMarker />
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;

import React, { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { caseStudies } from '@/data/projects';

import { sortProjects, groupByYear } from './utils';
import { PageHeader, TimelineLegend, YearGroup, CareerStartMarker } from './components';

// Pre-compute sorted projects and year groups (static data)
const sortedProjects = sortProjects(caseStudies);
const yearGroups = groupByYear(sortedProjects);

// Helper to get initial expanded ID from URL hash
const getInitialExpandedId = (hash: string): string | null => {
  const slug = hash.replace('#', '');
  if (slug) {
    const project = caseStudies.find(p => p.slug === slug);
    return project?.id ?? null;
  }
  return null;
};

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [expandedId, setExpandedId] = useState<string | null>(() =>
    getInitialExpandedId(location.hash)
  );

  // Handle URL hash changes for scrolling and expanding
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      const project = caseStudies.find(p => p.slug === hash);
      if (project) {
        // Defer state update and scroll to avoid synchronous setState in effect
        const timeoutId = setTimeout(() => {
          setExpandedId(project.id);
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);

        return (): void => {
          clearTimeout(timeoutId);
        };
      }
    }
  }, [location.hash]);

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

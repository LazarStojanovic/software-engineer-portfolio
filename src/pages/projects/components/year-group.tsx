import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import type { CaseStudy } from '@/types';

import { useReducedMotion } from '../hooks';
import type { YearGroup as YearGroupType } from '../types';

import ProjectCard from './project-card';

interface YearGroupProps {
  group: YearGroupType;
  groupIndex: number;
  expandedId: string | null;
  allProjects: CaseStudy[];
  onToggleExpand: (id: string) => void;
}

const YearGroup: React.FC<YearGroupProps> = ({
  group,
  groupIndex,
  expandedId,
  allProjects,
  onToggleExpand,
}) => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : groupIndex * 0.1,
      }}
      className='mb-12 last:mb-0'
    >
      {/* Year Header */}
      <div className='flex items-center gap-4 mb-6'>
        <div className='text-4xl md:text-5xl font-display font-bold text-foreground'>
          {group.year === 'Present' ? t('projects.timeline.ongoing') : group.year}
        </div>
        <div className='flex-1 h-px bg-border' />
        <div className='text-sm text-muted-foreground'>
          {group.year === 'Present'
            ? t('projects.timeline.projectsOngoing', { count: group.projects.length })
            : t('projects.timeline.projectsCompleted', { count: group.projects.length })}
        </div>
      </div>

      {/* Projects in this year */}
      <div className='relative ml-4 md:ml-8'>
        {/* Vertical line */}
        <div className='absolute left-0 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2' />

        <div className='space-y-4'>
          {group.projects.map((project, projectIndex) => {
            const isExpanded = expandedId === project.id;
            const globalIndex = allProjects.findIndex(p => p.id === project.id);

            return (
              <ProjectCard
                key={project.id}
                project={project}
                isExpanded={isExpanded}
                globalIndex={globalIndex}
                groupIndex={groupIndex}
                projectIndex={projectIndex}
                onToggle={() => onToggleExpand(project.id)}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default YearGroup;

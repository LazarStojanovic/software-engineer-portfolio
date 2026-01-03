import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/ui/card';

import type { CaseStudy } from '@/types';

import { useReducedMotion } from '../../hooks';
import { formatDuration } from '../../utils';
import { isConcurrentCompany } from '../../constants';
import type { TranslatedProject } from '../../types';

import CardHeaderContent from './card-header-content';
import ExpandedContent from './expanded-content';

interface ProjectCardProps {
  project: CaseStudy;
  isExpanded: boolean;
  globalIndex: number;
  groupIndex: number;
  projectIndex: number;
  onToggle: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isExpanded,
  globalIndex,
  groupIndex,
  projectIndex,
  onToggle,
}) => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const isConcurrent = isConcurrentCompany(project.company);
  const { start, end } = formatDuration(project.duration);

  const translated = useMemo<TranslatedProject>(
    () => ({
      title: t(`projects.caseStudies.${project.id}.title`),
      context: t(`projects.caseStudies.${project.id}.context`),
      problem: t(`projects.caseStudies.${project.id}.problem`),
      approach: t(`projects.caseStudies.${project.id}.approach`, {
        returnObjects: true,
      }) as string[],
      outcomes: t(`projects.caseStudies.${project.id}.outcomes`, {
        returnObjects: true,
      }) as TranslatedProject['outcomes'],
      technicalDecisions: t(`projects.caseStudies.${project.id}.technicalDecisions`, {
        returnObjects: true,
      }) as TranslatedProject['technicalDecisions'],
    }),
    [t, project.id]
  );

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  const cardClassName = isConcurrent
    ? 'border-l-4 border-l-accent-500 bg-gradient-to-r from-accent-500/5 via-transparent to-transparent hover:border-accent-400'
    : 'border-l-4 border-l-primary bg-gradient-to-r from-primary/5 via-transparent to-transparent hover:border-primary/60';

  const dotClassName = isConcurrent ? 'bg-accent-500' : 'bg-primary';

  return (
    <motion.article
      id={project.slug}
      initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : groupIndex * 0.1 + projectIndex * 0.05,
      }}
      className='relative scroll-mt-24 pl-6'
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-5 w-3 h-3 -translate-x-1/2 rounded-full ring-4 ring-background ${dotClassName}`}
      />

      <Card
        className={`overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-large hover:-translate-y-0.5 group/card ${cardClassName}`}
        onClick={onToggle}
        role='button'
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
      >
        <CardHeaderContent
          title={translated.title}
          company={project.company ?? ''}
          role={project.role}
          start={start}
          end={end}
          techStack={project.techStack}
          globalIndex={globalIndex}
          isExpanded={isExpanded}
          isConcurrent={isConcurrent}
        />

        {isExpanded && (
          <ExpandedContent
            translated={translated}
            techStack={project.techStack}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
      </Card>
    </motion.article>
  );
};

export default ProjectCard;

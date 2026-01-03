import React from 'react';
import { motion } from 'framer-motion';

import { Card } from '@/components/ui/card';

import type { ExperienceItem } from '@/types';

import { useReducedMotion } from '../../hooks';

import CardHeader from './card-header';
import ExpandedContent from './expanded-content';

interface ExperienceCardProps {
  experience: ExperienceItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  index,
  isExpanded,
  onToggle,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const isCurrent = experience.isCurrent ?? false;
  const isContract = experience.employmentType === 'contract';

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  const cardClassName = isCurrent
    ? 'border-l-4 border-l-primary bg-gradient-to-r from-primary/5 via-transparent to-transparent hover:border-primary/60'
    : isContract
      ? 'border-l-4 border-l-accent-500 bg-gradient-to-r from-accent-500/5 via-transparent to-transparent hover:border-accent-400'
      : 'border-l-4 border-l-muted-foreground/30 hover:border-muted-foreground/50';

  const dotClassName = isCurrent
    ? 'bg-primary ring-primary/20'
    : isContract
      ? 'bg-accent-500 ring-accent-500/20'
      : 'bg-muted-foreground ring-muted-foreground/20';

  return (
    <motion.article
      initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : index * 0.1,
      }}
      className='relative scroll-mt-24 pl-6'
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-6 w-3 h-3 -translate-x-1/2 rounded-full ring-4 ring-background ${dotClassName} ${
          isCurrent ? 'animate-pulse' : ''
        }`}
      />

      <Card
        className={`overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-large hover:-translate-y-0.5 group/card ${cardClassName}`}
        onClick={onToggle}
        role='button'
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
      >
        <CardHeader
          experience={experience}
          isExpanded={isExpanded}
          isCurrent={isCurrent}
          isContract={isContract}
        />

        {isExpanded && (
          <ExpandedContent experience={experience} prefersReducedMotion={prefersReducedMotion} />
        )}
      </Card>
    </motion.article>
  );
};

export default ExperienceCard;

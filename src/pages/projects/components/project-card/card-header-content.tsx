import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Building2, GitBranch } from 'lucide-react';

import { CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CardHeaderContentProps {
  title: string;
  company: string;
  role: string;
  start: string;
  end: string;
  techStack: string[];
  globalIndex: number;
  isExpanded: boolean;
  isConcurrent: boolean;
}

const CardHeaderContent: React.FC<CardHeaderContentProps> = ({
  title,
  company,
  role,
  start,
  end,
  techStack,
  globalIndex,
  isExpanded,
  isConcurrent,
}) => {
  const { t } = useTranslation();

  const accentClass = isConcurrent ? 'text-accent-500' : 'text-primary';
  const bgAccentClass = isConcurrent
    ? 'bg-accent-500/10 text-accent-500'
    : 'bg-primary/10 text-primary';
  const lineClass = isConcurrent ? 'bg-accent-500/30' : 'bg-primary/30';

  return (
    <div className='w-full text-left'>
      <CardHeader className='p-4'>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex-1 min-w-0'>
            {/* Date range */}
            <div className='flex items-center gap-2 mb-2 text-xs'>
              <span className={`font-semibold ${accentClass}`}>{start}</span>
              <div className={`flex-1 h-0.5 max-w-16 ${lineClass}`} />
              <span className='text-muted-foreground'>{end}</span>
            </div>

            {/* Company & Role */}
            <div className='flex flex-wrap items-center gap-2 mb-2'>
              <div
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${bgAccentClass}`}
              >
                {isConcurrent ? (
                  <GitBranch className='h-3 w-3' />
                ) : (
                  <Building2 className='h-3 w-3' />
                )}
                {company}
              </div>
              <Badge variant='outline' className='text-xs'>
                {role}
              </Badge>
              {isConcurrent && (
                <span className='text-xs text-accent-500 hidden sm:inline'>
                  {t('projects.timeline.concurrent')}
                </span>
              )}
            </div>

            {/* Title */}
            <CardTitle className='text-base md:text-lg mb-2 group-hover/card:text-primary transition-colors'>
              {title}
            </CardTitle>

            {/* Tech stack preview (collapsed only) */}
            {!isExpanded && <TechStackPreview techStack={techStack} />}
          </div>

          {/* Index & Chevron */}
          <div className='flex items-center gap-2 shrink-0'>
            <span className='text-xs text-muted-foreground hidden sm:block'>
              #{String(globalIndex + 1).padStart(2, '0')}
            </span>
            <ChevronDown
              className={`h-5 w-5 text-muted-foreground transition-all duration-200 group-hover/card:text-primary ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>
      </CardHeader>
    </div>
  );
};

// Sub-component for tech stack preview
const TechStackPreview: React.FC<{ techStack: string[] }> = ({ techStack }) => {
  const visibleCount = 5;
  const visible = techStack.slice(0, visibleCount);
  const remaining = techStack.length - visibleCount;

  return (
    <div className='flex flex-wrap gap-1.5'>
      {visible.map(tech => (
        <Badge key={tech} variant='outline' className='text-xs'>
          {tech}
        </Badge>
      ))}
      {remaining > 0 && (
        <Badge variant='outline' className='text-xs'>
          +{remaining}
        </Badge>
      )}
    </div>
  );
};

export default CardHeaderContent;

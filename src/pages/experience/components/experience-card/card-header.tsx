import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Building2, MapPin, Calendar, Sparkles, GitBranch } from 'lucide-react';

import { CardHeader as UICardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import type { ExperienceItem } from '@/types';

interface CardHeaderProps {
  experience: ExperienceItem;
  isExpanded: boolean;
  isCurrent: boolean;
  isContract: boolean;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  experience,
  isExpanded,
  isCurrent,
  isContract,
}) => {
  const { t } = useTranslation();

  const accentClass = isCurrent
    ? 'text-primary'
    : isContract
      ? 'text-accent-500'
      : 'text-muted-foreground';

  const bgAccentClass = isCurrent
    ? 'bg-primary/10 text-primary'
    : isContract
      ? 'bg-accent-500/10 text-accent-500'
      : 'bg-muted text-muted-foreground';

  // Get top 4 technologies for preview
  const techPreview = experience.technologies.slice(0, 4);
  const remainingTech = experience.technologies.length - 4;

  return (
    <div className='w-full text-left'>
      <UICardHeader className='p-4'>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex-1 min-w-0'>
            {/* Period */}
            <div className='flex items-center gap-2 mb-2 text-xs'>
              <Calendar className={`h-3.5 w-3.5 ${accentClass}`} />
              <span className={`font-semibold ${accentClass}`}>{experience.period}</span>
              {isCurrent && (
                <span className='flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium'>
                  <Sparkles className='h-3 w-3' />
                  {t('experience.current')}
                </span>
              )}
            </div>

            {/* Company & Role */}
            <div className='flex flex-wrap items-center gap-2 mb-2'>
              <div
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${bgAccentClass}`}
              >
                {isContract ? <GitBranch className='h-3 w-3' /> : <Building2 className='h-3 w-3' />}
                {experience.company}
              </div>
              <Badge variant='outline' className='text-xs'>
                {experience.role}
              </Badge>
              <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                <MapPin className='h-3 w-3' />
                {experience.location}
              </div>
            </div>

            {/* Team Context (if available) */}
            {experience.teamContext && (
              <p className='text-sm text-muted-foreground mb-2'>{experience.teamContext}</p>
            )}

            {/* Role Title as main heading */}
            <CardTitle className='text-base md:text-lg mb-3 group-hover/card:text-primary transition-colors'>
              {experience.role} @ {experience.company}
            </CardTitle>

            {/* Tech stack preview (collapsed only) */}
            {!isExpanded && (
              <div className='flex flex-wrap gap-1.5'>
                {techPreview.map(tech => (
                  <Badge key={tech} variant='outline' className='text-xs'>
                    {tech}
                  </Badge>
                ))}
                {remainingTech > 0 && (
                  <Badge variant='outline' className='text-xs'>
                    +{remainingTech}
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Chevron */}
          <div className='flex items-center shrink-0'>
            <ChevronDown
              className={`h-5 w-5 text-muted-foreground transition-all duration-200 group-hover/card:text-primary ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>
      </UICardHeader>
    </div>
  );
};

export default CardHeader;

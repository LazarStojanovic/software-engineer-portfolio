import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  CheckCircle2,
  Crown,
  Briefcase,
  Sparkles,
  Users,
  Calendar,
  GraduationCap,
  MessageSquare,
  FileText,
  CheckCircle,
  Clock,
} from 'lucide-react';

import { CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import type { ExperienceItem, ExperienceHighlight } from '@/types';

interface ExpandedContentProps {
  experience: ExperienceItem;
  prefersReducedMotion: boolean;
}

// Icon mapping for highlights
const iconMap: Record<string, React.ReactNode> = {
  Crown: <Crown className='h-4 w-4' />,
  Briefcase: <Briefcase className='h-4 w-4' />,
  Sparkles: <Sparkles className='h-4 w-4' />,
  Users: <Users className='h-4 w-4' />,
  Calendar: <Calendar className='h-4 w-4' />,
  GraduationCap: <GraduationCap className='h-4 w-4' />,
  MessageSquare: <MessageSquare className='h-4 w-4' />,
  FileText: <FileText className='h-4 w-4' />,
  CheckCircle: <CheckCircle className='h-4 w-4' />,
  Clock: <Clock className='h-4 w-4' />,
};

const ExpandedContent: React.FC<ExpandedContentProps> = ({ experience, prefersReducedMotion }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
    >
      <Separator />
      <CardContent className='p-4 space-y-5'>
        {/* Key Highlights */}
        <HighlightsSection
          highlights={experience.highlights}
          label={t('experience.details.highlights')}
        />

        {/* Description */}
        <DescriptionSection
          description={experience.description}
          label={t('experience.details.overview')}
        />

        {/* Achievements */}
        <AchievementsSection
          achievements={experience.achievements}
          label={t('experience.details.achievements')}
        />

        {/* Full Tech Stack */}
        <TechStackSection
          technologies={experience.technologies}
          label={t('experience.details.technologies')}
        />
      </CardContent>
    </motion.div>
  );
};

// Section header component
const SectionHeader: React.FC<{ label: string }> = ({ label }) => (
  <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2'>
    {label}
  </h3>
);

// Highlights section with metrics
interface HighlightsSectionProps {
  highlights: ExperienceHighlight[];
  label: string;
}

const HighlightsSection: React.FC<HighlightsSectionProps> = ({ highlights, label }) => (
  <div>
    <SectionHeader label={label} />
    <div className='flex flex-wrap gap-3'>
      {highlights.map((highlight, i) => (
        <div
          key={i}
          className='flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border'
        >
          <span className='text-primary'>{iconMap[highlight.icon ?? 'CheckCircle']}</span>
          <div>
            <span className='font-semibold text-primary'>{highlight.value}</span>
            <span className='text-sm text-muted-foreground ml-1'>
              {highlight.metric.toLowerCase()}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Description section
interface DescriptionSectionProps {
  description: string;
  label: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ description, label }) => (
  <div>
    <SectionHeader label={label} />
    <p className='text-sm text-foreground leading-relaxed'>{description}</p>
  </div>
);

// Achievements section
interface AchievementsSectionProps {
  achievements: string[];
  label: string;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements, label }) => (
  <div>
    <SectionHeader label={label} />
    <ul className='grid md:grid-cols-2 gap-2'>
      {achievements.map((achievement, i) => (
        <li key={i} className='flex items-start gap-2'>
          <CheckCircle2 className='h-4 w-4 text-primary shrink-0 mt-0.5' />
          <span className='text-sm text-muted-foreground'>{achievement}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Tech stack section
interface TechStackSectionProps {
  technologies: string[];
  label: string;
}

const TechStackSection: React.FC<TechStackSectionProps> = ({ technologies, label }) => (
  <div>
    <SectionHeader label={label} />
    <div className='flex flex-wrap gap-2'>
      {technologies.map(tech => (
        <Badge key={tech} variant='outline'>
          {tech}
        </Badge>
      ))}
    </div>
  </div>
);

export default ExpandedContent;

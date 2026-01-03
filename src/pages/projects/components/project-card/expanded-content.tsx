import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';

import { CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import type { TranslatedProject } from '../../types';

interface ExpandedContentProps {
  translated: TranslatedProject;
  techStack: string[];
  prefersReducedMotion: boolean;
}

const ExpandedContent: React.FC<ExpandedContentProps> = ({
  translated,
  techStack,
  prefersReducedMotion,
}) => {
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
        <ContextChallengeSection
          context={translated.context}
          problem={translated.problem}
          contextLabel={t('projects.details.context')}
          challengeLabel={t('projects.details.challenge')}
        />

        <ApproachSection approach={translated.approach} label={t('projects.details.approach')} />

        <OutcomesSection outcomes={translated.outcomes} label={t('projects.details.outcomes')} />

        <DecisionsSection
          decisions={translated.technicalDecisions}
          label={t('projects.details.keyDecisions')}
        />

        <TechStackFull techStack={techStack} />
      </CardContent>
    </motion.div>
  );
};

// Reusable section header
const SectionHeader: React.FC<{ label: string }> = ({ label }) => (
  <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2'>
    {label}
  </h3>
);

// Context & Challenge grid
interface ContextChallengeSectionProps {
  context: string;
  problem: string;
  contextLabel: string;
  challengeLabel: string;
}

const ContextChallengeSection: React.FC<ContextChallengeSectionProps> = ({
  context,
  problem,
  contextLabel,
  challengeLabel,
}) => (
  <div className='grid md:grid-cols-2 gap-4'>
    <div>
      <SectionHeader label={contextLabel} />
      <p className='text-sm text-foreground'>{context}</p>
    </div>
    <div>
      <SectionHeader label={challengeLabel} />
      <p className='text-sm text-foreground'>{problem}</p>
    </div>
  </div>
);

// Approach list
interface ApproachSectionProps {
  approach: string[];
  label: string;
}

const ApproachSection: React.FC<ApproachSectionProps> = ({ approach, label }) => (
  <div>
    <SectionHeader label={label} />
    <ul className='grid md:grid-cols-2 gap-2'>
      {approach.map((step, i) => (
        <li key={i} className='flex items-start gap-2'>
          <CheckCircle2 className='h-4 w-4 text-primary shrink-0 mt-0.5' />
          <span className='text-sm text-muted-foreground'>{step}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Outcomes badges
interface OutcomesSectionProps {
  outcomes: TranslatedProject['outcomes'];
  label: string;
}

const OutcomesSection: React.FC<OutcomesSectionProps> = ({ outcomes, label }) => (
  <div>
    <SectionHeader label={label} />
    <div className='flex flex-wrap gap-3'>
      {outcomes.map((outcome, i) => (
        <div key={i} className='px-4 py-2 rounded-lg bg-muted/50 border border-border'>
          <span className='font-semibold text-primary'>{outcome.value}</span>
          <span className='text-sm text-muted-foreground ml-1'>{outcome.metric.toLowerCase()}</span>
        </div>
      ))}
    </div>
  </div>
);

// Technical decisions
interface DecisionsSectionProps {
  decisions: TranslatedProject['technicalDecisions'];
  label: string;
}

const DecisionsSection: React.FC<DecisionsSectionProps> = ({ decisions, label }) => (
  <div>
    <SectionHeader label={label} />
    <div className='space-y-2'>
      {decisions.map((td, i) => (
        <div key={i} className='bg-muted/30 rounded-lg p-3 border border-border'>
          <p className='font-medium text-sm text-foreground'>{td.decision}</p>
          <p className='text-xs text-muted-foreground mt-1'>{td.rationale}</p>
        </div>
      ))}
    </div>
  </div>
);

// Full tech stack
const TechStackFull: React.FC<{ techStack: string[] }> = ({ techStack }) => (
  <div className='flex flex-wrap gap-2 pt-2'>
    {techStack.map(tech => (
      <Badge key={tech} variant='outline'>
        {tech}
      </Badge>
    ))}
  </div>
);

export default ExpandedContent;

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, Briefcase, Users, GraduationCap, MessageSquare, Building2 } from 'lucide-react';

import { useReducedMotion } from '../hooks';
import { careerStats } from '@/data/experience';

interface StatItemProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  delay: number;
  prefersReducedMotion: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, delay, prefersReducedMotion }) => (
  <motion.div
    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: prefersReducedMotion ? 0 : 0.4,
      delay: prefersReducedMotion ? 0 : delay,
    }}
    className='flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors'
  >
    <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary'>
      {icon}
    </div>
    <div>
      <div className='text-xl font-bold text-foreground'>{value}</div>
      <div className='text-xs text-muted-foreground'>{label}</div>
    </div>
  </motion.div>
);

const CareerStats: React.FC = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const stats = [
    {
      icon: <Calendar className='h-5 w-5' />,
      value: `${careerStats.yearsOfExperience}+`,
      label: t('experience.stats.years'),
    },
    {
      icon: <Building2 className='h-5 w-5' />,
      value: careerStats.companiesWorked,
      label: t('experience.stats.companies'),
    },
    {
      icon: <Briefcase className='h-5 w-5' />,
      value: `${careerStats.projectsDelivered}+`,
      label: t('experience.stats.projects'),
    },
    {
      icon: <Users className='h-5 w-5' />,
      value: careerStats.teamSizeLed,
      label: t('experience.stats.teamLed'),
    },
    {
      icon: <GraduationCap className='h-5 w-5' />,
      value: `${careerStats.developersMediated}+`,
      label: t('experience.stats.mentored'),
    },
    {
      icon: <MessageSquare className='h-5 w-5' />,
      value: `${careerStats.interviewsConducted}+`,
      label: t('experience.stats.interviews'),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : 0.2,
      }}
      className='mb-12'
    >
      <h2 className='text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4'>
        {t('experience.stats.title')}
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3'>
        {stats.map((stat, index) => (
          <StatItem
            key={stat.label}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
            delay={0.3 + index * 0.05}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>

      {/* Industries */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.4,
          delay: prefersReducedMotion ? 0 : 0.6,
        }}
        className='mt-4 flex flex-wrap items-center gap-2'
      >
        <span className='text-sm text-muted-foreground'>{t('experience.stats.industries')}:</span>
        {careerStats.industries.map(industry => (
          <span
            key={industry}
            className='px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground'
          >
            {industry}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CareerStats;

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Calendar,
  Briefcase,
  Users,
  Building2,
  Heart,
  Landmark,
  Radio,
  Wallet,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { timing, easing, animationVariants } from './use-animation';
import type { Variants, Transition } from 'framer-motion';

interface ImpactMetricsSectionProps {
  animationVariants: Variants;
  transition: Transition;
  prefersReducedMotion: boolean;
  inView: boolean;
}

interface Metric {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  label: string;
  color: string;
}

interface Industry {
  icon: React.ElementType;
  name: string;
}

// Animated counter hook
const useCountUp = (
  end: number,
  duration: number = 2000,
  startCounting: boolean = false
): number => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number): void => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);

  return count;
};

// Single metric card with animated count
const MetricCard: React.FC<{
  metric: Metric;
  index: number;
  startCounting: boolean;
  prefersReducedMotion: boolean;
}> = ({ metric, index, startCounting, prefersReducedMotion }) => {
  const count = useCountUp(metric.value, prefersReducedMotion ? 0 : 2000, startCounting);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : timing.slow,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: easing.decelerate,
      }}
      className='relative group'
    >
      <div className='bg-card border border-border rounded-2xl p-6 text-center hover:shadow-medium hover:border-primary/20 transition-all duration-300'>
        {/* Icon */}
        <div
          className={`w-12 h-12 mx-auto mb-4 rounded-xl ${metric.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <metric.icon className='w-6 h-6 text-primary' />
        </div>

        {/* Value */}
        <div className='text-4xl md:text-5xl font-display font-bold text-foreground mb-2'>
          {prefersReducedMotion ? metric.value : count}
          {metric.suffix && <span className='text-primary'>{metric.suffix}</span>}
        </div>

        {/* Label */}
        <p className='text-sm text-muted-foreground font-medium'>{metric.label}</p>
      </div>
    </motion.div>
  );
};

const ImpactMetricsSection: React.FC<ImpactMetricsSectionProps> = ({
  prefersReducedMotion,
  inView,
}) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  // once: true means isInView stays true forever after first trigger - no need for separate state
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const metrics: Metric[] = [
    {
      icon: Calendar,
      value: 5,
      suffix: '+',
      label: t('impactMetrics.years'),
      color: 'bg-primary/10',
    },
    {
      icon: Briefcase,
      value: 11,
      label: t('impactMetrics.projects'),
      color: 'bg-accent-500/10',
    },
    {
      icon: Users,
      value: 8,
      label: t('impactMetrics.teamLed'),
      color: 'bg-primary/10',
    },
    {
      icon: Building2,
      value: 4,
      label: t('impactMetrics.industries'),
      color: 'bg-accent-500/10',
    },
  ];

  const industries: Industry[] = [
    { icon: Heart, name: t('impactMetrics.industryList.healthcare') },
    { icon: Wallet, name: t('impactMetrics.industryList.fintech') },
    { icon: Radio, name: t('impactMetrics.industryList.telecom') },
    { icon: Landmark, name: t('impactMetrics.industryList.government') },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  return (
    <section ref={sectionRef} className='py-16 md:py-24 bg-muted/30 relative overflow-hidden'>
      {/* Subtle background pattern */}
      <div className='absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]' />

      <div className='container-max section-padding relative z-10'>
        {/* Section Header */}
        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={animationVariants.fadeUp}
          transition={{ duration: prefersReducedMotion ? 0 : timing.slow }}
          className='text-center mb-12'
        >
          <h2 className='section-title mb-4'>{t('impactMetrics.title')}</h2>
          <p className='text-muted-foreground max-w-xl mx-auto'>{t('impactMetrics.subtitle')}</p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-12'
        >
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              metric={metric}
              index={index}
              startCounting={isInView}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>

        {/* Industries Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: prefersReducedMotion ? 0 : timing.slow,
            delay: prefersReducedMotion ? 0 : 0.4,
          }}
          className='flex flex-wrap justify-center items-center gap-3'
        >
          {industries.map(industry => (
            <Badge
              key={industry.name}
              variant='outline'
              className='px-4 py-2 text-sm flex items-center gap-2 hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-default'
            >
              <industry.icon className='w-4 h-4 text-primary' />
              {industry.name}
            </Badge>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactMetricsSection;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { useAnimation } from './use-animation';
import HeroSection from './hero-section';
import ImpactMetricsSection from './impact-metrics-section';
import AIFirstSection from './ai-first-section';
import FeaturedProjectsSection from './featured-projects-section';
import ExperienceSection from './experience-section';
import TechStackSection from './tech-stack-section';
import ContactCTASection from './contact-cta-section';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { animationVariants, transition, prefersReducedMotion, useSectionInView } = useAnimation();

  const { ref: heroRef, inView: heroInView } = useSectionInView();
  const { ref: metricsRef, inView: metricsInView } = useSectionInView();
  const { ref: aiFirstRef, inView: aiFirstInView } = useSectionInView();
  const { ref: projectsRef, inView: projectsInView } = useSectionInView();
  const { ref: experienceRef, inView: experienceInView } = useSectionInView();
  const { ref: techStackRef, inView: techStackInView } = useSectionInView();
  const { ref: contactRef, inView: contactInView } = useSectionInView();

  return (
    <>
      <Helmet>
        <title>
          {t('hero.name')} - {t('hero.role')}
        </title>
        <meta name='description' content={t('hero.valueProp')} />
      </Helmet>

      {/* 1. Hero - with AI terminal visualization */}
      <div ref={heroRef}>
        <HeroSection
          animationVariants={animationVariants}
          transition={transition}
          prefersReducedMotion={prefersReducedMotion}
          inView={heroInView}
        />
      </div>

      {/* 2. Impact Metrics - quick stats for recruiters */}
      <div ref={metricsRef} id='metrics'>
        <ImpactMetricsSection
          animationVariants={animationVariants}
          transition={transition}
          prefersReducedMotion={prefersReducedMotion}
          inView={metricsInView}
        />
      </div>

      {/* 3. AI-First Approach - your differentiator */}
      <div ref={aiFirstRef} id='approach'>
        <AIFirstSection
          animationVariants={animationVariants}
          transition={transition}
          prefersReducedMotion={prefersReducedMotion}
          inView={aiFirstInView}
        />
      </div>

      {/* 4. Featured Projects - proof of work */}
      <div ref={projectsRef} id='projects'>
        <FeaturedProjectsSection
          animationVariants={animationVariants}
          transition={transition}
          prefersReducedMotion={prefersReducedMotion}
          inView={projectsInView}
        />
      </div>

      {/* 5. Career Journey - experience teaser */}
      <div ref={experienceRef} id='experience'>
        <ExperienceSection
          animationVariants={animationVariants}
          transition={transition}
          inView={experienceInView}
        />
      </div>

      {/* 6. Tech Stack - with AI tools highlighted */}
      <div ref={techStackRef} id='tech-stack'>
        <TechStackSection
          animationVariants={animationVariants}
          transition={transition}
          prefersReducedMotion={prefersReducedMotion}
          inView={techStackInView}
        />
      </div>

      {/* 7. Contact CTA */}
      <div ref={contactRef} id='contact'>
        <ContactCTASection
          animationVariants={animationVariants}
          transition={transition}
          inView={contactInView}
        />
      </div>
    </>
  );
};

export default Home;

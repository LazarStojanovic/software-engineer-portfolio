import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { useAnimation } from './use-animation';
import HeroSection from './hero-section';
import FeaturedProjectsSection from './featured-projects-section';
import ExperienceSection from './experience-section';
import ApproachSection from './approach-section';
import TechStackSection from './tech-stack-section';
import ContactCTASection from './contact-cta-section';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { animationVariants, transition, prefersReducedMotion, useSectionInView } = useAnimation();

  const { ref: heroRef, inView: heroInView } = useSectionInView();
  const { ref: projectsRef, inView: projectsInView } = useSectionInView();
  const { ref: experienceRef, inView: experienceInView } = useSectionInView();
  const { ref: approachRef, inView: approachInView } = useSectionInView();
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

      <div ref={heroRef}>
        <HeroSection
          animationVariants={animationVariants}
          transition={transition}
          prefersReducedMotion={prefersReducedMotion}
          inView={heroInView}
        />
      </div>

      <div ref={projectsRef} id='projects'>
        <FeaturedProjectsSection
          animationVariants={animationVariants}
          transition={transition}
          prefersReducedMotion={prefersReducedMotion}
          inView={projectsInView}
        />
      </div>

      <div ref={experienceRef} id='experience'>
        <ExperienceSection
          animationVariants={animationVariants}
          transition={transition}
          inView={experienceInView}
        />
      </div>

      <div ref={approachRef} id='approach'>
        <ApproachSection
          animationVariants={animationVariants}
          transition={transition}
          prefersReducedMotion={prefersReducedMotion}
          inView={approachInView}
        />
      </div>

      <div ref={techStackRef} id='tech-stack'>
        <TechStackSection
          animationVariants={animationVariants}
          transition={transition}
          prefersReducedMotion={prefersReducedMotion}
          inView={techStackInView}
        />
      </div>

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

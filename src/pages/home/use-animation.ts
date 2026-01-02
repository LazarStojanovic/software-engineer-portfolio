import { useRef, useMemo } from 'react';
import { useInView } from 'framer-motion';
import type { Variants, Transition, UseInViewOptions } from 'framer-motion';

// Animation timing scale
export const timing = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  content: 0.6,
  stagger: 0.1,
} as const;

// Easing curves
export const easing = {
  default: [0.25, 0.1, 0.25, 1],
  smooth: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  decelerate: [0, 0, 0.2, 1],
  accelerate: [0.4, 0, 1, 1],
} as const;

// Different animation variants for different section types
export const animationVariants = {
  // Default fade up - good for most content
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  } satisfies Variants,

  // Scale fade - for hero and important elements
  scaleFade: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  } satisfies Variants,

  // Slide in from left
  slideLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  } satisfies Variants,

  // Slide in from right
  slideRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  } satisfies Variants,

  // Pop in - for badges, tags, small elements
  pop: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  } satisfies Variants,

  // Simple fade - for professional, understated sections
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  } satisfies Variants,

  // Blur fade - for hero text
  blurFade: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  } satisfies Variants,
};

// Section-specific animation configurations
export const sectionAnimations = {
  hero: {
    variants: animationVariants.scaleFade,
    transition: { duration: timing.content, ease: easing.smooth },
  },
  projects: {
    variants: animationVariants.fadeUp,
    transition: { duration: timing.slow, ease: easing.decelerate },
  },
  experience: {
    variants: animationVariants.fade,
    transition: { duration: timing.normal, ease: easing.default },
  },
  techStack: {
    variants: animationVariants.pop,
    transition: { duration: timing.fast, ease: easing.bounce },
  },
  contact: {
    variants: animationVariants.fadeUp,
    transition: { duration: timing.slow, ease: easing.smooth },
  },
} as const;

// Hook for checking reduced motion preference
export const usePrefersReducedMotion = (): boolean => {
  return useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
};

// Hook for section intersection observer
export const useSectionInView = (margin: UseInViewOptions['margin'] = '-100px') => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return { ref, inView };
};

// Main animation hook (backward compatible)
export const useAnimation = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Default variants (backward compatible)
  const defaultVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : animationVariants.fadeUp;

  const transition: Transition = {
    duration: prefersReducedMotion ? 0 : timing.content,
    ease: easing.smooth,
  };

  return {
    animationVariants: defaultVariants,
    transition,
    prefersReducedMotion,
    useSectionInView,
    // New exports for more control
    timing,
    easing,
    variants: animationVariants,
    sectionAnimations,
  };
};

// Utility to create staggered children animations
export const createStaggerContainer = (
  staggerAmount = timing.stagger,
  delayChildren = 0
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerAmount,
      delayChildren,
    },
  },
});

// Utility to create staggered item variants
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timing.normal,
      ease: easing.decelerate,
    },
  },
};

// Hover animation presets
export const hoverAnimations = {
  lift: {
    y: -4,
    transition: { duration: timing.fast, ease: easing.smooth },
  },
  scale: {
    scale: 1.02,
    transition: { duration: timing.fast, ease: easing.smooth },
  },
  glow: {
    boxShadow: '0 0 20px rgba(var(--primary), 0.3)',
    transition: { duration: timing.normal, ease: easing.smooth },
  },
} as const;

// Tap/press animation presets
export const tapAnimations = {
  press: { scale: 0.98 },
  bounce: { scale: 0.95 },
} as const;

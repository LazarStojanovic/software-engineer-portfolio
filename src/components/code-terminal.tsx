import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/lib/utils';

interface CodeTerminalProps {
  className?: string | undefined;
  title?: string;
  children?: React.ReactNode;
}

interface TypewriterTextProps {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

interface CodeLineProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// Typewriter effect component
export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 50,
  className,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  // Call onComplete when typing finishes (separate effect to avoid cascading renders)
  useEffect(() => {
    if (currentIndex === text.length && text.length > 0) {
      onComplete?.();
    }
  }, [currentIndex, text.length, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className='inline-block w-2 h-4 bg-primary ml-0.5 align-middle'
        />
      )}
    </span>
  );
};

// Animated code line that fades in
export const CodeLine: React.FC<CodeLineProps> = ({ children, delay = 0, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn('font-mono text-sm', className)}
    >
      {children}
    </motion.div>
  );
};

// Syntax highlighting helpers
export const Keyword: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className='text-blue-500 dark:text-blue-400'>{children}</span>
);

export const String: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className='text-emerald-600 dark:text-emerald-400'>{children}</span>
);

export const Function: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className='text-amber-600 dark:text-amber-400'>{children}</span>
);

export const Comment: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className='text-muted-foreground italic'>{children}</span>
);

export const Variable: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className='text-foreground'>{children}</span>
);

export const Type: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className='text-purple-500 dark:text-purple-400'>{children}</span>
);

// Main terminal component
export const CodeTerminal: React.FC<CodeTerminalProps> = ({
  className,
  title = 'cursor-terminal',
  children,
}) => {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-2xl overflow-hidden shadow-large',
        className
      )}
    >
      {/* Terminal header */}
      <div className='bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-3'>
        <div className='flex gap-1.5'>
          <div className='w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors' />
          <div className='w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors' />
          <div className='w-3 h-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors' />
        </div>
        <span className='text-xs text-muted-foreground font-mono flex-1 text-center'>{title}</span>
        <div className='w-12' /> {/* Spacer for centering */}
      </div>

      {/* Terminal content */}
      <div className='p-4 md:p-6 bg-gradient-to-br from-card to-card/80 min-h-[200px]'>
        {children}
      </div>
    </div>
  );
};

// Animated terminal with auto-cycling code snippets
interface AnimatedCodeTerminalProps {
  className?: string;
  snippets: CodeSnippet[];
  cycleDuration?: number;
}

interface CodeSnippet {
  title: string;
  prompt: string;
  lines: React.ReactNode[];
}

export const AnimatedCodeTerminal: React.FC<AnimatedCodeTerminalProps> = ({
  className,
  snippets,
  cycleDuration = 6000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showCode, setShowCode] = useState(false);

  const cycleToNext = useCallback((): void => {
    setShowCode(false);
    setTimeout(() => {
      setActiveIndex(prev => (prev + 1) % snippets.length);
    }, 300);
  }, [snippets.length]);

  useEffect(() => {
    const interval = setInterval(cycleToNext, cycleDuration);
    return () => clearInterval(interval);
  }, [cycleToNext, cycleDuration]);

  const currentSnippet = snippets[activeIndex];

  return (
    <CodeTerminal className={className} title={currentSnippet.title}>
      {/* Prompt line */}
      <div className='flex items-center gap-2 mb-4'>
        <span className='text-primary font-mono text-sm font-semibold'>❯</span>
        <TypewriterText
          text={currentSnippet.prompt}
          delay={40}
          className='font-mono text-sm text-muted-foreground'
          onComplete={() => setShowCode(true)}
        />
      </div>

      {/* Code output */}
      <AnimatePresence mode='wait'>
        {showCode && (
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className='space-y-1'
          >
            {currentSnippet.lines.map((line, i) => (
              <CodeLine key={i} delay={i * 0.1}>
                {line}
              </CodeLine>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Snippet indicator dots */}
      <div className='flex justify-center gap-2 mt-6'>
        {snippets.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setShowCode(false);
              setTimeout(() => setActiveIndex(i), 300);
            }}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              i === activeIndex
                ? 'bg-primary w-6'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            )}
            aria-label={`Go to snippet ${i + 1}`}
          />
        ))}
      </div>
    </CodeTerminal>
  );
};

export default CodeTerminal;

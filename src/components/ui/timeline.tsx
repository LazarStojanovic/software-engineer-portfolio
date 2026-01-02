import * as React from 'react';

import { cn } from '@/lib/utils';

interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  children: React.ReactNode;
}

const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ol ref={ref} className={cn('relative', className)} {...props}>
        {/* Continuous vertical line */}
        <div className='absolute left-[calc(7rem+1rem+0.9375rem)] top-0 bottom-8 w-0.5 bg-border hidden md:block' />
        <div className='absolute left-[0.9375rem] top-0 bottom-8 w-0.5 bg-border md:hidden' />
        {children}
      </ol>
    );
  }
);
Timeline.displayName = 'Timeline';

interface TimelineItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn('group relative flex gap-4 pb-8 last:pb-0', className)}
        {...props}
      >
        {children}
      </li>
    );
  }
);
TimelineItem.displayName = 'TimelineItem';

interface TimelinePointProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const TimelinePoint = React.forwardRef<HTMLDivElement, TimelinePointProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const sizeConfig = {
      sm: { dot: 'w-2.5 h-2.5', wrapper: 'w-8' },
      md: { dot: 'w-4 h-4', wrapper: 'w-8' },
      lg: { dot: 'w-8 h-8', wrapper: 'w-8' },
    };

    const variantClasses = {
      default: 'bg-muted-foreground/40',
      primary: 'bg-primary shadow-md',
      outline: 'border-2 border-primary bg-background',
    };

    return (
      <div
        ref={ref}
        className={cn('flex items-start justify-center shrink-0 pt-1', sizeConfig[size].wrapper)}
        {...props}
      >
        <div
          className={cn(
            'relative z-10 flex shrink-0 items-center justify-center rounded-full',
            sizeConfig[size].dot,
            variantClasses[variant],
            className
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);
TimelinePoint.displayName = 'TimelinePoint';

interface TimelineDateProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const TimelineDate = React.forwardRef<HTMLDivElement, TimelineDateProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-28 shrink-0 text-right text-sm font-medium text-primary pt-1 hidden md:block',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TimelineDate.displayName = 'TimelineDate';

interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex-1 min-w-0', className)} {...props}>
        {children}
      </div>
    );
  }
);
TimelineContent.displayName = 'TimelineContent';

interface TimelineTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const TimelineTitle = React.forwardRef<HTMLHeadingElement, TimelineTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('font-semibold text-foreground leading-tight', className)}
        {...props}
      >
        {children}
      </h3>
    );
  }
);
TimelineTitle.displayName = 'TimelineTitle';

interface TimelineDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const TimelineDescription = React.forwardRef<HTMLParagraphElement, TimelineDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn('text-sm text-muted-foreground mt-1', className)} {...props}>
        {children}
      </p>
    );
  }
);
TimelineDescription.displayName = 'TimelineDescription';

export {
  Timeline,
  TimelineItem,
  TimelinePoint,
  TimelineDate,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
};

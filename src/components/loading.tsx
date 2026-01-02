import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 'md', text }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className='flex flex-col items-center justify-center space-y-4'>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className={`${sizeClasses[size]} text-primary-600`} />
      </motion.div>
      {text && <p className='text-neutral-600 dark:text-neutral-400 text-sm'>{text}</p>}
    </div>
  );
};

export default Loading;

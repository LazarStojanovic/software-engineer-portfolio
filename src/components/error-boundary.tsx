import { AlertTriangle, RefreshCw } from 'lucide-react';
import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950'>
      <div className='text-center max-w-md mx-auto p-8'>
        <div className='w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6'>
          <AlertTriangle className='w-8 h-8 text-red-600' />
        </div>

        <h1 className='font-display font-bold text-2xl mb-4 text-neutral-900 dark:text-white'>
          Oops! Something went wrong
        </h1>

        <p className='text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed'>
          We're sorry, but something unexpected happened. Please try refreshing the page or contact
          support if the problem persists.
        </p>

        <div className='space-y-4'>
          <button
            onClick={resetErrorBoundary}
            className='btn-primary flex items-center justify-center space-x-2 mx-auto'
          >
            <RefreshCw className='w-4 h-4' />
            <span>Try Again</span>
          </button>

          <button
            onClick={() => (window.location.href = '/')}
            className='btn-outline flex items-center justify-center space-x-2 mx-auto'
          >
            <span>Go Home</span>
          </button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className='mt-6 text-left'>
            <summary className='cursor-pointer text-sm text-neutral-600 dark:text-neutral-400 mb-2'>
              Error Details (Development)
            </summary>
            <pre className='text-xs text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg overflow-auto'>
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
          console.error('ErrorBoundary caught an error:', error, errorInfo);
        }

        // Here you could send error to logging service
        // Example: logErrorToService(error, errorInfo);
      }}
      onReset={() => {
        // Reset any state or perform cleanup
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;

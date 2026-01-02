import React, { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ErrorBoundary from '@/components/error-boundary';
import Loading from '@/components/loading';

import { LanguageProvider } from '@/context/language-context';
import { ThemeProvider } from '@/context/theme-context';
import '@/lib/i18n';

// Pages (code-splitting)
const Home = lazy(() => import('@/pages/home'));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <LanguageProvider>
            <Router>
              <div className='min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300 overflow-x-hidden flex flex-col'>
                <main className='flex-1'>
                  <Suspense
                    fallback={
                      <div className='min-h-screen flex items-center justify-center'>
                        <Loading text='Loading...' />
                      </div>
                    }
                  >
                    <Routes>
                      <Route path='/' element={<Home />} />
                    </Routes>
                  </Suspense>
                </main>
              </div>
            </Router>
          </LanguageProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;

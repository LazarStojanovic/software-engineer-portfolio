import React, { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ErrorBoundary from '@/components/error-boundary';
import Loading from '@/components/loading';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

import { LanguageProvider } from '@/context/language-context';
import { ThemeProvider } from '@/context/theme-context';
import '@/lib/i18n';

// Pages (code-splitting)
const Home = lazy(() => import('@/pages/home'));
const Projects = lazy(() => import('@/pages/projects'));
const Experience = lazy(() => import('@/pages/experience'));
const Contact = lazy(() => import('@/pages/contact'));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <LanguageProvider>
            <Router>
              <div className='min-h-screen bg-background transition-colors duration-300 overflow-x-hidden flex flex-col'>
                <Navbar />
                <main id='main-content' className='flex-1'>
                  <Suspense
                    fallback={
                      <div className='min-h-screen flex items-center justify-center'>
                        <Loading text='Loading...' />
                      </div>
                    }
                  >
                    <Routes>
                      <Route path='/' element={<Home />} />
                      <Route path='/projects' element={<Projects />} />
                      <Route path='/experience' element={<Experience />} />
                      <Route path='/contact' element={<Contact />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
              </div>
            </Router>
          </LanguageProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;

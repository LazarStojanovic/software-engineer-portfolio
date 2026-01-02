import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('app.title')}</title>
        <meta name='description' content={t('app.description')} />
      </Helmet>
      <div className='min-h-screen flex flex-col items-center justify-center px-4'>
        <div className='text-center max-w-2xl mx-auto'>
          <h1 className='text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6'>
            {t('app.title')}
          </h1>
          <p className='text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8'>
            {t('app.description')}
          </p>
          <div className='flex flex-wrap gap-4 justify-center'>
            <a
              href='https://react.dev'
              target='_blank'
              rel='noopener noreferrer'
              className='px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition-colors'
            >
              React Docs
            </a>
            <a
              href='https://vitejs.dev'
              target='_blank'
              rel='noopener noreferrer'
              className='px-6 py-3 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-medium rounded-lg transition-colors'
            >
              Vite Docs
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

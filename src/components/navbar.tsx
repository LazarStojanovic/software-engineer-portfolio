import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/context/theme-context';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (isLanguageMenuOpen && !target.closest('.language-menu-container')) {
        setIsLanguageMenuOpen(false);
      }
    };

    if (isLanguageMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isLanguageMenuOpen]);

  const navItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.projects'), href: '/projects' },
    { label: t('nav.experience'), href: '/experience' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  const handleLanguageChange = (lang: 'en' | 'sr'): void => {
    changeLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
      >
        Skip to main content
      </a>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-soft'
            : 'bg-transparent'
        )}
      >
        <div className='container-max section-padding'>
          <div className='flex items-center justify-between h-16 md:h-20'>
            {/* Logo/Brand */}
            <Link
              to='/'
              className='text-xl md:text-2xl font-display font-bold text-foreground hover:text-primary transition-colors'
              aria-label='Home'
            >
              {t('hero.name')}
            </Link>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center gap-6'>
              {navItems.map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    location.pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className='hidden md:flex items-center gap-3'>
              {/* Language Switcher */}
              <div className='relative language-menu-container'>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  aria-label='Change language'
                  aria-expanded={isLanguageMenuOpen}
                  aria-haspopup='true'
                >
                  <Globe className='h-4 w-4' />
                </Button>
                <AnimatePresence>
                  {isLanguageMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                      className='absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-medium overflow-hidden language-menu-container'
                    >
                      {languages.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={cn(
                            'w-full px-4 py-2 text-left text-sm transition-colors hover:bg-accent',
                            currentLanguage === lang.code && 'bg-accent text-accent-foreground'
                          )}
                        >
                          <span className='mr-2'>{lang.flag}</span>
                          {lang.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <Button
                variant='ghost'
                size='icon'
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className='md:hidden flex items-center gap-2'>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                aria-label='Change language'
              >
                <Globe className='h-4 w-4' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
              </Button>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label='Toggle menu'
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                className='md:hidden overflow-hidden border-t border-border'
              >
                <div className='py-4 space-y-2'>
                  {navItems.map(item => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'block px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                        location.pathname === item.href
                          ? 'text-primary bg-accent'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Language Menu */}
          <AnimatePresence>
            {isLanguageMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                className='md:hidden overflow-hidden border-t border-border'
              >
                <div className='py-4 space-y-2'>
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={cn(
                        'w-full px-4 py-2 text-left text-sm transition-colors rounded-lg',
                        currentLanguage === lang.code
                          ? 'text-primary bg-accent'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      )}
                    >
                      <span className='mr-2'>{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;

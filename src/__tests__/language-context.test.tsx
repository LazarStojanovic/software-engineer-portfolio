import { renderHook, act } from '@testing-library/react';
import React from 'react';

import { LanguageProvider, useLanguage } from '@/context/language-context';

// Mock react-i18next
const mockChangeLanguage = jest.fn();
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

describe('LanguageContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <LanguageProvider>{children}</LanguageProvider>
  );

  it('provides default language as English', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.currentLanguage).toBe('en');
  });

  it('provides available languages', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.languages).toEqual([
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'sr', name: 'Српски', flag: '🇷🇸' },
    ]);
  });

  it('changes language when changeLanguage is called', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    act(() => {
      result.current.changeLanguage('sr');
    });

    expect(mockChangeLanguage).toHaveBeenCalledWith('sr');
  });

  it('changes language to English', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    act(() => {
      result.current.changeLanguage('en');
    });

    expect(mockChangeLanguage).toHaveBeenCalledWith('en');
  });

  it('throws error when useLanguage is used outside provider', () => {
    // Mock console.error to avoid noise in test output
    const originalConsoleError = console.error;
    console.error = jest.fn();

    expect(() => {
      renderHook(() => useLanguage());
    }).toThrow('useLanguage must be used within a LanguageProvider');

    console.error = originalConsoleError;
  });

  it('provides correct context value structure', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current).toHaveProperty('currentLanguage');
    expect(result.current).toHaveProperty('changeLanguage');
    expect(result.current).toHaveProperty('languages');
    expect(typeof result.current.changeLanguage).toBe('function');
    expect(Array.isArray(result.current.languages)).toBe(true);
  });

  it('handles Serbian language correctly', () => {
    // Mock i18n to return Serbian language
    jest.doMock('react-i18next', () => ({
      useTranslation: () => ({
        i18n: {
          language: 'sr',
          changeLanguage: mockChangeLanguage,
        },
      }),
    }));

    const { result } = renderHook(() => useLanguage(), { wrapper });

    act(() => {
      result.current.changeLanguage('sr');
    });

    expect(mockChangeLanguage).toHaveBeenCalledWith('sr');
  });

  it('has correct language codes', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    const languageCodes = result.current.languages.map(lang => lang.code);
    expect(languageCodes).toEqual(['en', 'sr']);
  });

  it('has correct language names', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    const languageNames = result.current.languages.map(lang => lang.name);
    expect(languageNames).toEqual(['English', 'Српски']);
  });

  it('has correct language flags', () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });

    const languageFlags = result.current.languages.map(lang => lang.flag);
    expect(languageFlags).toEqual(['🇺🇸', '🇷🇸']);
  });
});

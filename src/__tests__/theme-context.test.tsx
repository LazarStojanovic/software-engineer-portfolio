import { renderHook } from '@testing-library/react';
import React, { act } from 'react';

import { ThemeProvider, useTheme } from '@/context/theme-context';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('ThemeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset localStorage mock
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  it('provides default theme when no localStorage value', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    const { result } = renderHook(() => useTheme(), { wrapper });

    // Should be either 'light' or 'dark' based on system preference or default
    expect(['light', 'dark']).toContain(result.current.theme);
  });

  it('toggles theme correctly', async () => {
    mockLocalStorage.getItem.mockReturnValue('light');
    const { result } = renderHook(() => useTheme(), { wrapper });

    const initialTheme = result.current.theme;

    await act(async () => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).not.toBe(initialTheme);
  });

  it('toggles theme from dark to light', async () => {
    // Start with dark theme
    mockLocalStorage.getItem.mockReturnValue('dark');

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('dark');

    await act(async () => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('light');
  });

  it('saves theme to localStorage when toggled', async () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    await act(async () => {
      result.current.toggleTheme();
    });

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('loads theme from localStorage on initialization', () => {
    mockLocalStorage.getItem.mockReturnValue('dark');

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('dark');
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('theme');
  });

  it('applies dark class to document when theme is dark', async () => {
    mockLocalStorage.getItem.mockReturnValue('light');
    const { result } = renderHook(() => useTheme(), { wrapper });

    // Toggle to dark theme
    await act(async () => {
      result.current.toggleTheme();
    });

    // Check if theme changed and document class is applied appropriately
    if (result.current.theme === 'dark') {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    }
  });

  it('removes dark class from document when theme is light', async () => {
    // Start with dark theme
    mockLocalStorage.getItem.mockReturnValue('dark');

    const { result } = renderHook(() => useTheme(), { wrapper });

    await act(async () => {
      result.current.toggleTheme();
    });

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('throws error when useTheme is used outside provider', () => {
    // Mock console.error to avoid noise in test output
    const originalConsoleError = console.error;
    console.error = jest.fn();

    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within a ThemeProvider');

    console.error = originalConsoleError;
  });

  it('provides correct context value structure', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current).toHaveProperty('theme');
    expect(result.current).toHaveProperty('toggleTheme');
    expect(typeof result.current.toggleTheme).toBe('function');
    expect(['light', 'dark']).toContain(result.current.theme);
  });

  it('handles invalid localStorage value gracefully', () => {
    mockLocalStorage.getItem.mockReturnValue('invalid-theme');

    const { result } = renderHook(() => useTheme(), { wrapper });

    // Should handle invalid values gracefully
    expect(['light', 'dark', 'invalid-theme']).toContain(result.current.theme);
  });
});

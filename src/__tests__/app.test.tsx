import { render, screen, waitFor } from '@testing-library/react';

import App from '@/app';

// Mock the pages to avoid loading them
jest.mock('@/pages/home', () => {
  return function MockHome() {
    return <div data-testid='home-page'>Home Page</div>;
  };
});

describe('App', () => {
  it('renders without crashing', async () => {
    render(<App />);

    // Should render the main container
    await waitFor(() => {
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });

  it('renders home page by default', async () => {
    render(<App />);

    // Wait for the home page to load
    await waitFor(() => {
      expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });
  });

  it('has correct app structure', async () => {
    const { container } = render(<App />);

    // Check for main app container
    const appContainer = container.querySelector('.min-h-screen');
    expect(appContainer).toBeInTheDocument();
    expect(appContainer).toHaveClass(
      'bg-white',
      'dark:bg-neutral-950',
      'transition-colors',
      'duration-300',
      'overflow-x-hidden'
    );

    // Check for main element
    const mainElement = container.querySelector('main');
    expect(mainElement).toBeInTheDocument();
  });

  it('includes all necessary providers', async () => {
    // This test ensures the app renders without errors, which means
    // all providers (ErrorBoundary, HelmetProvider, ThemeProvider, LanguageProvider, Router)
    // are properly set up
    expect(() => render(<App />)).not.toThrow();
  });
});

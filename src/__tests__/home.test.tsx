import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';

import Home from '@/pages/home';
import i18n from '@/lib/i18n';

describe('Home Page', () => {
  it('renders home page content', () => {
    render(
      <HelmetProvider>
        <I18nextProvider i18n={i18n}>
          <Home />
        </I18nextProvider>
      </HelmetProvider>
    );

    expect(screen.getByText('Base Project')).toBeInTheDocument();
  });

  it('renders page title in helmet', async () => {
    render(
      <HelmetProvider>
        <I18nextProvider i18n={i18n}>
          <Home />
        </I18nextProvider>
      </HelmetProvider>
    );

    // Wait for Helmet to update the title
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(document.title).toBe('Base Project');
  });

  it('renders description meta tag', async () => {
    render(
      <HelmetProvider>
        <I18nextProvider i18n={i18n}>
          <Home />
        </I18nextProvider>
      </HelmetProvider>
    );

    // Wait for Helmet to update meta tags
    await new Promise(resolve => setTimeout(resolve, 100));
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toBeInTheDocument();
    expect(metaDescription).toHaveAttribute(
      'content',
      'A modern React project template with TypeScript, Tailwind CSS, and more.'
    );
  });

  it('renders React Docs link', () => {
    render(
      <HelmetProvider>
        <I18nextProvider i18n={i18n}>
          <Home />
        </I18nextProvider>
      </HelmetProvider>
    );

    const reactLink = screen.getByRole('link', { name: /react docs/i });
    expect(reactLink).toBeInTheDocument();
    expect(reactLink).toHaveAttribute('href', 'https://react.dev');
    expect(reactLink).toHaveAttribute('target', '_blank');
    expect(reactLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders Vite Docs link', () => {
    render(
      <HelmetProvider>
        <I18nextProvider i18n={i18n}>
          <Home />
        </I18nextProvider>
      </HelmetProvider>
    );

    const viteLink = screen.getByRole('link', { name: /vite docs/i });
    expect(viteLink).toBeInTheDocument();
    expect(viteLink).toHaveAttribute('href', 'https://vitejs.dev');
    expect(viteLink).toHaveAttribute('target', '_blank');
    expect(viteLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders page description', () => {
    render(
      <HelmetProvider>
        <I18nextProvider i18n={i18n}>
          <Home />
        </I18nextProvider>
      </HelmetProvider>
    );

    // Description should be rendered
    expect(
      screen.getByText('A modern React project template with TypeScript, Tailwind CSS, and more.')
    ).toBeInTheDocument();
  });
});

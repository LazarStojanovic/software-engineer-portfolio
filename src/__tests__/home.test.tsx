import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

import Home from '@/pages/home';
import i18n from '@/lib/i18n';

expect.extend(toHaveNoViolations);

const renderHome = (): ReturnType<typeof render> => {
  return render(
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </I18nextProvider>
    </HelmetProvider>
  );
};

describe('Home Page', () => {
  it('renders hero section with developer name', () => {
    renderHome();
    expect(screen.getByText('Lazar Stojanović')).toBeInTheDocument();
  });

  it('renders hero role badge', () => {
    renderHome();
    // Multiple elements have "Software Engineer" text - use getAllByText
    const roleElements = screen.getAllByText('Software Engineer');
    expect(roleElements.length).toBeGreaterThan(0);
  });

  it('renders hero value proposition', () => {
    renderHome();
    expect(
      screen.getByText('I build and lead frontend teams that deliver high-quality products.')
    ).toBeInTheDocument();
  });

  it('renders primary CTA button (View Projects)', () => {
    renderHome();
    const projectsLink = screen.getByRole('link', { name: /see my work/i });
    expect(projectsLink).toBeInTheDocument();
    expect(projectsLink).toHaveAttribute('href', '/projects');
  });

  it('renders secondary CTA button (Contact)', () => {
    renderHome();
    const contactLink = screen.getByRole('link', { name: /let's talk/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('renders featured projects section title', () => {
    renderHome();
    expect(screen.getByText('Featured Work')).toBeInTheDocument();
  });

  it('renders tech stack section title', () => {
    renderHome();
    expect(screen.getByText('Tech Stack')).toBeInTheDocument();
  });

  it('renders tech stack categories', () => {
    renderHome();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('State & Data')).toBeInTheDocument();
    expect(screen.getByText('Tooling & Leadership')).toBeInTheDocument();
  });

  it('renders experience teaser', () => {
    renderHome();
    expect(screen.getByText('5+ years building production web applications')).toBeInTheDocument();
  });

  it('renders experience link', () => {
    renderHome();
    const experienceLink = screen.getByRole('link', { name: /view full timeline/i });
    expect(experienceLink).toBeInTheDocument();
    expect(experienceLink).toHaveAttribute('href', '/experience');
  });

  it('renders contact CTA section', () => {
    renderHome();
    expect(screen.getByText("Let's build something great.")).toBeInTheDocument();
    const contactCTALink = screen.getByRole('link', { name: /get in touch/i });
    expect(contactCTALink).toBeInTheDocument();
    expect(contactCTALink).toHaveAttribute('href', '/contact');
  });

  it('renders page title in helmet', async () => {
    renderHome();

    await new Promise(resolve => setTimeout(resolve, 100));
    expect(document.title).toContain('Lazar Stojanović');
  });

  it('renders description meta tag', async () => {
    renderHome();

    await new Promise(resolve => setTimeout(resolve, 100));
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toBeInTheDocument();
    expect(metaDescription).toHaveAttribute(
      'content',
      'I build and lead frontend teams that deliver high-quality products.'
    );
  });

  it('has no accessibility violations', async () => {
    const { container } = renderHome();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('uses semantic HTML structure', () => {
    renderHome();
    const sections = document.querySelectorAll('section');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('renders tech stack technologies', () => {
    renderHome();
    // Multiple elements have these tech names - use getAllByText
    const reactElements = screen.getAllByText('React');
    const tsElements = screen.getAllByText('TypeScript');
    expect(reactElements.length).toBeGreaterThan(0);
    expect(tsElements.length).toBeGreaterThan(0);
  });
});

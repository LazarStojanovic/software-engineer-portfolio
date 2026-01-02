import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

import Home from '@/pages/home';
import i18n from '@/lib/i18n';

expect.extend(toHaveNoViolations);

const renderHome = () => {
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
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders hero role line', () => {
    renderHome();
    expect(screen.getByText('Frontend Engineer · React · Angular · Next.js')).toBeInTheDocument();
  });

  it('renders hero value proposition', () => {
    renderHome();
    expect(
      screen.getByText('I build fast, scalable, and well-designed web applications.')
    ).toBeInTheDocument();
  });

  it('renders primary CTA button (View Projects)', () => {
    renderHome();
    const projectsLink = screen.getByRole('link', { name: /projects/i });
    expect(projectsLink).toBeInTheDocument();
    expect(projectsLink).toHaveAttribute('href', '/projects');
  });

  it('renders secondary CTA button (Contact)', () => {
    renderHome();
    const contactLink = screen.getByRole('link', { name: /contact/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('renders intro section paragraph', () => {
    renderHome();
    expect(
      screen.getByText(/I specialize in creating clean, maintainable architectures/i)
    ).toBeInTheDocument();
  });

  it('renders featured projects section title', () => {
    renderHome();
    expect(screen.getByText('Featured Projects')).toBeInTheDocument();
  });

  it('renders all featured project cards', () => {
    renderHome();
    expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument();
    expect(screen.getByText('SaaS Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Mobile Web App')).toBeInTheDocument();
  });

  it('renders project problem statements', () => {
    renderHome();
    expect(screen.getByText(/Built a high-performance e-commerce solution/i)).toBeInTheDocument();
    expect(screen.getByText(/Developed a scalable analytics dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Created a responsive mobile-first application/i)).toBeInTheDocument();
  });

  it('renders tech stack section title', () => {
    renderHome();
    expect(screen.getByText('Tech Stack')).toBeInTheDocument();
  });

  it('renders tech stack categories', () => {
    renderHome();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Styling / UI')).toBeInTheDocument();
    expect(screen.getByText('Tooling / Testing')).toBeInTheDocument();
  });

  it('renders experience teaser', () => {
    renderHome();
    expect(screen.getByText('8+ years building production web applications')).toBeInTheDocument();
    expect(
      screen.getByText('Experience with scalable frontends and real-world products')
    ).toBeInTheDocument();
  });

  it('renders experience link', () => {
    renderHome();
    const experienceLink = screen.getByRole('link', { name: /view full experience/i });
    expect(experienceLink).toBeInTheDocument();
    expect(experienceLink).toHaveAttribute('href', '/experience');
  });

  it('renders contact CTA section', () => {
    renderHome();
    expect(screen.getByText("Let's build something solid.")).toBeInTheDocument();
    const contactCTALink = screen.getByRole('link', { name: /get in touch/i });
    expect(contactCTALink).toBeInTheDocument();
    expect(contactCTALink).toHaveAttribute('href', '/contact');
  });

  it('renders page title in helmet', async () => {
    renderHome();

    await new Promise(resolve => setTimeout(resolve, 100));
    expect(document.title).toContain('John Doe');
  });

  it('renders description meta tag', async () => {
    renderHome();

    await new Promise(resolve => setTimeout(resolve, 100));
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toBeInTheDocument();
    expect(metaDescription).toHaveAttribute(
      'content',
      'I build fast, scalable, and well-designed web applications.'
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

  it('renders project tech stack badges', () => {
    renderHome();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });
});

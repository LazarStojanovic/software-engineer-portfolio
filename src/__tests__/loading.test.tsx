import { render, screen } from '@testing-library/react';

import Loading from '@/components/loading';

describe('Loading', () => {
  it('renders loading spinner with default size', () => {
    const { container } = render(<Loading />);

    expect(container.firstChild).toHaveClass('flex flex-col items-center justify-center space-y-4');
    expect(container.querySelector('.w-6.h-6')).toBeInTheDocument();
  });

  it('renders with small size', () => {
    const { container } = render(<Loading size='sm' />);

    const spinner = container.querySelector('.w-4.h-4');
    expect(spinner).toBeInTheDocument();
  });

  it('renders with medium size (default)', () => {
    const { container } = render(<Loading size='md' />);

    const spinner = container.querySelector('.w-6.h-6');
    expect(spinner).toBeInTheDocument();
  });

  it('renders with large size', () => {
    const { container } = render(<Loading size='lg' />);

    const spinner = container.querySelector('.w-8.h-8');
    expect(spinner).toBeInTheDocument();
  });

  it('renders with custom text', () => {
    const customText = 'Loading your content...';
    render(<Loading text={customText} />);

    expect(screen.getByText(customText)).toBeInTheDocument();
  });

  it('does not render text when not provided', () => {
    const { container } = render(<Loading />);

    // Should not have any text element
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });

  it('renders both spinner and text when both are provided', () => {
    const customText = 'Please wait...';
    const { container } = render(<Loading size='lg' text={customText} />);

    expect(container.querySelector('.w-8.h-8')).toBeInTheDocument();
    expect(screen.getByText(customText)).toBeInTheDocument();
  });
});

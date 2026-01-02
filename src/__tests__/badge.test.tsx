import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';

describe('Badge', () => {
  it('renders badge with default variant', () => {
    render(<Badge>Default Badge</Badge>);
    expect(screen.getByText('Default Badge')).toBeInTheDocument();
  });

  it('renders badge with different variants', () => {
    const { rerender } = render(<Badge variant='secondary'>Secondary</Badge>);
    expect(screen.getByText('Secondary')).toBeInTheDocument();

    rerender(<Badge variant='destructive'>Destructive</Badge>);
    expect(screen.getByText('Destructive')).toBeInTheDocument();

    rerender(<Badge variant='outline'>Outline</Badge>);
    expect(screen.getByText('Outline')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Badge className='custom-badge'>Badge</Badge>);
    const badge = screen.getByText('Badge');
    expect(badge).toHaveClass('custom-badge');
  });

  it('forwards HTML attributes', () => {
    render(
      <Badge data-testid='test-badge' aria-label='Test badge'>
        Badge
      </Badge>
    );
    const badge = screen.getByTestId('test-badge');
    expect(badge).toHaveAttribute('aria-label', 'Test badge');
  });

  it('renders as div element by default', () => {
    render(<Badge>Div Badge</Badge>);
    const badge = screen.getByText('Div Badge');
    expect(badge.tagName).toBe('DIV');
  });
});

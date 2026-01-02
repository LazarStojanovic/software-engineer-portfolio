import { render, screen } from '@testing-library/react';
import React from 'react';

import { Label } from '@/components/ui/label';

describe('Label', () => {
  it('renders label element', () => {
    render(<Label>Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
  });

  it('associates label with input using htmlFor', () => {
    render(
      <>
        <Label htmlFor='test-input'>Test Label</Label>
        <input id='test-input' />
      </>
    );
    const label = screen.getByText('Test Label');
    const input = screen.getByRole('textbox');
    expect(label).toHaveAttribute('for', 'test-input');
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('applies custom className', () => {
    render(<Label className='custom-label'>Label</Label>);
    const label = screen.getByText('Label');
    expect(label).toHaveClass('custom-label');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Label</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it('passes through HTML label attributes', () => {
    render(
      <Label id='test-label' aria-label='Test label'>
        Label
      </Label>
    );
    const label = screen.getByText('Label');
    expect(label).toHaveAttribute('id', 'test-label');
  });
});

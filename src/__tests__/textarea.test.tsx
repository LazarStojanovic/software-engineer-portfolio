import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Textarea } from '@/components/ui/textarea';

describe('Textarea', () => {
  it('renders textarea element', () => {
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('renders textarea with placeholder', () => {
    render(<Textarea placeholder='Enter your message' />);
    const textarea = screen.getByPlaceholderText('Enter your message');
    expect(textarea).toBeInTheDocument();
  });

  it('handles text input', async () => {
    const user = userEvent.setup();
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');

    await user.type(textarea, 'This is a test message');

    expect(textarea).toHaveValue('This is a test message');
  });

  it('can be disabled', () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Textarea className='custom-textarea' />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-textarea');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('passes through HTML textarea attributes', () => {
    render(
      <Textarea
        id='test-textarea'
        name='message'
        rows={5}
        cols={30}
        required
        aria-label='Message textarea'
      />
    );
    const textarea = screen.getByLabelText('Message textarea');
    expect(textarea).toHaveAttribute('id', 'test-textarea');
    expect(textarea).toHaveAttribute('name', 'message');
    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toHaveAttribute('cols', '30');
    expect(textarea).toBeRequired();
  });

  it('handles value prop', () => {
    render(<Textarea value='Controlled value' readOnly />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('Controlled value');
  });
});

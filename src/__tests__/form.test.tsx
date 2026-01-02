import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const testSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

type TestFormValues = z.infer<typeof testSchema>;

describe('Form Components', () => {
  describe('Form', () => {
    it('renders form with children', () => {
      const TestForm: React.FC = () => {
        const form = useForm<TestFormValues>({
          resolver: zodResolver(testSchema),
        });

        return (
          <Form {...form}>
            <div>Form content</div>
          </Form>
        );
      };

      render(<TestForm />);
      expect(screen.getByText('Form content')).toBeInTheDocument();
    });
  });

  describe('FormField', () => {
    it('renders form field with input', () => {
      const TestForm: React.FC = () => {
        const form = useForm<TestFormValues>({
          resolver: zodResolver(testSchema),
        });

        return (
          <Form {...form}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        );
      };

      render(<TestForm />);
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
    });

    it('shows validation error message', async () => {
      const TestForm: React.FC = () => {
        const form = useForm<TestFormValues>({
          resolver: zodResolver(testSchema),
          mode: 'onChange',
          defaultValues: {
            name: '',
            email: '',
          },
        });

        return (
          <Form {...form}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        );
      };

      const user = userEvent.setup();
      render(<TestForm />);

      const input = screen.getByLabelText('Name');
      await user.type(input, 'A');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      });
    });
  });

  describe('FormLabel', () => {
    it('renders form label', () => {
      const TestForm: React.FC = () => {
        const form = useForm<TestFormValues>({
          resolver: zodResolver(testSchema),
        });

        return (
          <Form {...form}>
            <FormField
              control={form.control}
              name='name'
              render={() => (
                <FormItem>
                  <FormLabel>Test Label</FormLabel>
                </FormItem>
              )}
            />
          </Form>
        );
      };

      render(<TestForm />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });
  });

  describe('FormDescription', () => {
    it('renders form description', () => {
      const TestForm: React.FC = () => {
        const form = useForm<TestFormValues>({
          resolver: zodResolver(testSchema),
        });

        return (
          <Form {...form}>
            <FormField
              control={form.control}
              name='name'
              render={() => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormDescription>Enter your full name</FormDescription>
                </FormItem>
              )}
            />
          </Form>
        );
      };

      render(<TestForm />);
      expect(screen.getByText('Enter your full name')).toBeInTheDocument();
    });
  });

  describe('FormMessage', () => {
    it('renders error message when field has error', async () => {
      const TestForm: React.FC = () => {
        const form = useForm<TestFormValues>({
          resolver: zodResolver(testSchema),
          mode: 'onChange',
          defaultValues: {
            name: '',
            email: '',
          },
        });

        return (
          <Form {...form}>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        );
      };

      const user = userEvent.setup();
      render(<TestForm />);

      const input = screen.getByLabelText('Email');
      await user.type(input, 'invalid-email');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      });
    });

    it('does not render when there is no error', () => {
      const TestForm: React.FC = () => {
        const form = useForm<TestFormValues>({
          resolver: zodResolver(testSchema),
        });

        return (
          <Form {...form}>
            <FormField
              control={form.control}
              name='name'
              render={() => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        );
      };

      render(<TestForm />);
      const message = screen.queryByRole('alert');
      expect(message).not.toBeInTheDocument();
    });
  });

  describe('useFormField', () => {
    it('throws error when used outside FormField', () => {
      const TestComponent: React.FC = () => {
        useFormField();
        return <div>Test</div>;
      };

      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => render(<TestComponent />)).toThrow();

      consoleSpy.mockRestore();
    });
  });
});

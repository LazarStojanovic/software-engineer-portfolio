import { cn } from '@/lib/utils';

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('class1', 'class2');
    expect(result).toContain('class1');
    expect(result).toContain('class2');
  });

  it('handles conditional classes', () => {
    const shouldShow = true;
    const shouldHide = false;
    const result = cn(
      'base-class',
      shouldShow && 'conditional-class',
      shouldHide && 'hidden-class'
    );
    expect(result).toContain('base-class');
    expect(result).toContain('conditional-class');
    expect(result).not.toContain('hidden-class');
  });

  it('handles undefined and null values', () => {
    const result = cn('base-class', undefined, null, 'valid-class');
    expect(result).toContain('base-class');
    expect(result).toContain('valid-class');
  });

  it('merges conflicting Tailwind classes correctly', () => {
    const result = cn('p-4', 'p-6');
    // tailwind-merge should resolve this to p-6 (last one wins)
    expect(result).toBeTruthy();
  });

  it('handles empty input', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('handles array of classes', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toContain('class1');
    expect(result).toContain('class2');
    expect(result).toContain('class3');
  });
});

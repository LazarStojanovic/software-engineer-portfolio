import type { AxeResults } from 'axe-core';

declare module 'jest-axe' {
  export function axe(container: Element | Document | DocumentFragment): Promise<AxeResults>;
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R;
    }
  }
}

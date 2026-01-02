import type { AxeResults } from 'axe-core';

declare module 'jest-axe' {
  export function axe(container: Element | Document | DocumentFragment): Promise<AxeResults>;
}

declare module 'jest-axe/extend-expect' {
  const matchers: unknown;
  export = matchers;
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R;
    }
  }
}

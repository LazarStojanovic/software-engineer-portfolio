/// <reference types="@testing-library/jest-dom" />
/// <reference types="jest-axe/extend-expect" />

declare module 'jest-axe';
declare module 'jest-axe/extend-expect';

// Image imports
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

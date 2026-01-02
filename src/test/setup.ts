import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { TextDecoder, TextEncoder } from 'util';
import 'jest-axe/extend-expect';

// Polyfill TextEncoder/TextDecoder before any modules that may require them
if (typeof global.TextEncoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;
}

// Minimal BroadcastChannel polyfill for Jest environment
if (typeof global.BroadcastChannel === 'undefined') {
  class BroadcastChannelPolyfill {
    readonly name: string;
    constructor(name: string) {
      this.name = name;
    }
    postMessage(): void {}
    close(): void {}
    addEventListener(_type: string, _listener: unknown): void {}
    removeEventListener(_type: string, _listener: unknown): void {}
    dispatchEvent(): boolean {
      return true;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).BroadcastChannel =
    BroadcastChannelPolyfill as unknown as typeof global.BroadcastChannel;
}

// MSW server temporarily disabled in Jest environment

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect(): void {}
  observe(): void {}
  unobserve(): void {}
} as unknown as typeof global.IntersectionObserver;

// Mock ResizeObserver for Framer Motion
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect(): void {}
  observe(): void {}
  unobserve(): void {}
} as unknown as typeof global.ResizeObserver;

// Mock requestAnimationFrame and cancelAnimationFrame
global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 16));
global.cancelAnimationFrame = jest.fn(id => clearTimeout(id));

// Mock window methods that Framer Motion might use
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true,
});

Object.defineProperty(window, 'scroll', {
  value: jest.fn(),
  writable: true,
});

Object.defineProperty(window, 'scrollBy', {
  value: jest.fn(),
  writable: true,
});

// Suppress React warnings about suspended resources in tests
const originalConsoleError = console.error;
console.error = jest.fn((message, ...args) => {
  // Suppress React act warnings for suspended resources (common with i18n)
  if (
    typeof message === 'string' &&
    message.includes('A suspended resource finished loading inside a test')
  ) {
    return;
  }
  // Call original console.error for other messages
  originalConsoleError(message, ...args);
});

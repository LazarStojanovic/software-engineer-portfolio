import { TextDecoder, TextEncoder } from 'util';

// Ensure TextEncoder/TextDecoder exist before any module initialization
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

// Mock window.scrollTo for Framer Motion
if (typeof global.window !== 'undefined') {
  global.window.scrollTo = jest.fn();
}

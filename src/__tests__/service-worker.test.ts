/**
 * @jest-environment jsdom
 */

import { registerServiceWorker, initPerformanceObserver } from '@/lib/service-worker';

// Mock console.log to avoid noise in tests
const originalConsoleLog = console.log;
beforeAll(() => {
  console.log = jest.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
});

describe('Service Worker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset service worker mocks
    delete (window as { navigator?: { serviceWorker?: unknown } }).navigator?.serviceWorker;
  });

  describe('registerServiceWorker', () => {
    it('does nothing when serviceWorker is not available', () => {
      // @ts-expect-error - intentionally removing serviceWorker
      delete window.navigator.serviceWorker;

      expect(() => registerServiceWorker()).not.toThrow();
    });

    it('registers service worker when available', () => {
      const mockRegister = jest.fn().mockResolvedValue({
        scope: '/',
        update: jest.fn(),
        unregister: jest.fn(),
      });

      Object.defineProperty(window.navigator, 'serviceWorker', {
        value: {
          register: mockRegister,
        },
        writable: true,
        configurable: true,
      });

      // Mock addEventListener
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

      registerServiceWorker();

      expect(addEventListenerSpy).toHaveBeenCalledWith('load', expect.any(Function));

      // Simulate load event
      const loadHandler = addEventListenerSpy.mock.calls.find(
        call => call[0] === 'load'
      )?.[1] as () => void;

      if (loadHandler) {
        loadHandler();
      }

      // Wait for async registration
      return new Promise<void>(resolve => {
        setTimeout(() => {
          expect(mockRegister).toHaveBeenCalledWith('/sw.js');
          resolve();
        }, 100);
      });
    });

    it('handles service worker registration error', () => {
      const mockRegister = jest.fn().mockRejectedValue(new Error('Registration failed'));

      Object.defineProperty(window.navigator, 'serviceWorker', {
        value: {
          register: mockRegister,
        },
        writable: true,
        configurable: true,
      });

      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

      registerServiceWorker();

      const loadHandler = addEventListenerSpy.mock.calls.find(
        call => call[0] === 'load'
      )?.[1] as () => void;

      if (loadHandler) {
        loadHandler();
      }

      return new Promise<void>(resolve => {
        setTimeout(() => {
          expect(mockRegister).toHaveBeenCalled();
          resolve();
        }, 100);
      });
    });
  });

  describe('initPerformanceObserver', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    afterEach(() => {
      delete process.env.NODE_ENV;
    });

    it('does nothing when PerformanceObserver is not available', () => {
      delete (window as { PerformanceObserver?: unknown }).PerformanceObserver;

      expect(() => initPerformanceObserver()).not.toThrow();
    });

    it('does nothing in production mode', () => {
      process.env.NODE_ENV = 'production';

      const mockObserver = jest.fn();
      // @ts-expect-error - mock PerformanceObserver
      window.PerformanceObserver = mockObserver;

      initPerformanceObserver();

      expect(mockObserver).not.toHaveBeenCalled();
    });

    it('initializes performance observers in development mode', () => {
      process.env.NODE_ENV = 'development';

      const mockObserve = jest.fn();
      const mockObserver = jest.fn().mockImplementation(() => ({
        observe: mockObserve,
      }));

      // @ts-expect-error - mock PerformanceObserver
      window.PerformanceObserver = mockObserver;

      initPerformanceObserver();

      // Should create observers for LCP, FID, and CLS
      expect(mockObserver).toHaveBeenCalled();
    });

    it('observes Largest Contentful Paint', () => {
      process.env.NODE_ENV = 'development';

      const mockObserve = jest.fn();
      const mockObserver = jest.fn().mockImplementation(callback => {
        // Simulate entry
        callback({
          getEntries: () => [
            {
              startTime: 1000,
            },
          ],
        });
        return {
          observe: mockObserve,
        };
      });

      // @ts-expect-error - mock PerformanceObserver
      window.PerformanceObserver = mockObserver;

      initPerformanceObserver();

      expect(mockObserve).toHaveBeenCalled();
    });

    it('observes First Input Delay', () => {
      process.env.NODE_ENV = 'development';

      const mockObserve = jest.fn();
      const mockObserver = jest.fn().mockImplementation(callback => {
        callback({
          getEntries: () => [
            {
              startTime: 500,
              processingStart: 600,
            },
          ],
        });
        return {
          observe: mockObserve,
        };
      });

      // @ts-expect-error - mock PerformanceObserver
      window.PerformanceObserver = mockObserver;

      initPerformanceObserver();

      expect(mockObserve).toHaveBeenCalled();
    });

    it('observes Cumulative Layout Shift', () => {
      process.env.NODE_ENV = 'development';

      const mockObserve = jest.fn();
      const mockObserver = jest.fn().mockImplementation(callback => {
        callback({
          getEntries: () => [
            {
              value: 0.1,
              hadRecentInput: false,
            },
          ],
        });
        return {
          observe: mockObserve,
        };
      });

      // @ts-expect-error - mock PerformanceObserver
      window.PerformanceObserver = mockObserver;

      initPerformanceObserver();

      expect(mockObserve).toHaveBeenCalled();
    });
  });
});

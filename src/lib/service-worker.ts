// Service Worker registration
export const registerServiceWorker = (): void => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log('SW registered: ', registration);
          }
        })
        .catch(registrationError => {
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log('SW registration failed: ', registrationError);
          }
        });
    });
  }
};

// Performance observer for Core Web Vitals
export const initPerformanceObserver = (): void => {
  if ('PerformanceObserver' in window && process.env.NODE_ENV === 'development') {
    // Observe Largest Contentful Paint
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        // eslint-disable-next-line no-console
        console.log('LCP:', entry.startTime);
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Observe First Input Delay
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as PerformanceEventTiming;
        // eslint-disable-next-line no-console
        console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
      }
    }).observe({ entryTypes: ['first-input'] });

    // Observe Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        const clsEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value: number };
        if (!clsEntry.hadRecentInput) {
          clsValue += clsEntry.value;
        }
      }
      // eslint-disable-next-line no-console
      console.log('CLS:', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }
};

import type { CaseStudy, FeaturedProject } from '@/types';

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform Rebuild',
    role: 'Lead Frontend Engineer',
    duration: '8 months',
    context:
      'A high-traffic e-commerce platform was struggling with cart abandonment rates and slow page loads, directly impacting revenue.',
    problem:
      'The existing checkout flow was a monolithic React application with poor code splitting, resulting in 4+ second initial load times. Cart abandonment was at 68%, well above industry average.',
    approach: [
      'Conducted performance audit using Lighthouse and WebPageTest to identify bottlenecks',
      'Implemented route-based code splitting, reducing initial bundle by 60%',
      'Migrated to Next.js for SSR and improved SEO',
      'Redesigned checkout as a multi-step wizard with optimistic UI updates',
      'Added real-time inventory sync using WebSocket connections',
    ],
    technicalDecisions: [
      {
        decision: 'Next.js over Create React App',
        rationale:
          'Needed SSR for SEO, built-in image optimization, and API routes for BFF pattern',
      },
      {
        decision: 'React Query for server state',
        rationale:
          'Automatic background refetching and caching reduced unnecessary API calls by 40%',
      },
      {
        decision: 'Zustand over Redux',
        rationale: 'Simpler mental model for cart state, reduced boilerplate by 70%',
      },
    ],
    outcomes: [
      { metric: 'Load Time', value: '1.8s', description: 'Down from 4.2s' },
      { metric: 'Conversions', value: '+25%', description: 'Cart abandonment reduced to 51%' },
      { metric: 'Bundle Size', value: '-60%', description: 'Initial JS payload' },
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'React Query', 'Zustand', 'Tailwind CSS'],
    architectureHighlights: [
      'Micro-frontend architecture for checkout vs catalog',
      'Edge caching with Vercel for static assets',
      'Optimistic UI updates for cart operations',
    ],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    id: '2',
    slug: 'analytics-dashboard',
    title: 'Real-Time Analytics Dashboard',
    role: 'Senior Frontend Developer',
    duration: '6 months',
    context:
      'A fintech startup needed to visualize complex trading data for institutional clients who required sub-second updates.',
    problem:
      "Existing solution used polling every 5 seconds, causing stale data issues and excessive API load. Charts were built with a legacy library that couldn't handle 10K+ data points smoothly.",
    approach: [
      'Replaced polling with WebSocket connections for real-time data streaming',
      'Built custom charting components using D3.js with canvas rendering for performance',
      'Implemented virtualization for large datasets',
      'Created a shared worker for data processing to keep UI responsive',
      'Added offline support with IndexedDB for historical data caching',
    ],
    technicalDecisions: [
      {
        decision: 'Canvas over SVG for charts',
        rationale: 'SVG DOM manipulation became a bottleneck above 5K data points',
      },
      {
        decision: 'Shared Worker for data processing',
        rationale: 'Kept main thread free for UI, improved perceived performance significantly',
      },
      {
        decision: 'Custom WebSocket reconnection logic',
        rationale: 'Built exponential backoff with jitter to handle network instability gracefully',
      },
    ],
    outcomes: [
      { metric: 'Update Latency', value: '<100ms', description: 'From 5s polling' },
      { metric: 'Concurrent Users', value: '5,000+', description: 'On single instance' },
      { metric: 'Data Points', value: '50K+', description: 'Rendered at 60fps' },
    ],
    techStack: ['React', 'TypeScript', 'D3.js', 'WebSocket', 'IndexedDB', 'Web Workers'],
    architectureHighlights: [
      'Event-driven architecture with custom event bus',
      'Time-series data compression for efficient storage',
      'Adaptive rendering quality based on device performance',
    ],
  },
  {
    id: '3',
    slug: 'mobile-pwa',
    title: 'Offline-First Mobile PWA',
    role: 'Frontend Architect',
    duration: '5 months',
    context:
      'Field service workers needed a mobile application that would work reliably in areas with poor or no connectivity.',
    problem:
      'Previous solution was a native app that required constant connectivity. Workers were losing data entries when moving between cell towers or entering buildings.',
    approach: [
      'Designed offline-first architecture with local-first data storage',
      'Implemented service worker with Workbox for intelligent caching strategies',
      'Built conflict resolution system for offline edits',
      'Created sync queue that retries failed operations with exponential backoff',
      'Added background sync for seamless data upload when connectivity returns',
    ],
    technicalDecisions: [
      {
        decision: 'PWA over React Native',
        rationale:
          'Single codebase, instant updates without app store approval, better offline support',
      },
      {
        decision: 'IndexedDB with Dexie.js wrapper',
        rationale: 'More powerful than localStorage, needed for complex queries and large datasets',
      },
      {
        decision: 'Last-write-wins with manual conflict resolution',
        rationale:
          'Simpler than CRDT, acceptable for use case where conflicts were rare but important',
      },
    ],
    outcomes: [
      { metric: 'Uptime', value: '99.9%', description: 'Including offline operation' },
      { metric: 'Data Usage', value: '-60%', description: 'Through smart caching' },
      { metric: 'User Satisfaction', value: '4.8/5', description: 'App store rating' },
    ],
    techStack: ['React', 'TypeScript', 'PWA', 'Workbox', 'IndexedDB', 'Service Workers'],
    architectureHighlights: [
      'Optimistic UI with rollback on sync failure',
      'Delta sync to minimize data transfer',
      'Background sync with retry queue',
    ],
  },
];

export const featuredProjects: FeaturedProject[] = caseStudies.map(cs => ({
  id: cs.id,
  title: cs.title,
  role: cs.role,
  problem: cs.problem.split('.')[0] + '.', // First sentence only
  outcome: cs.outcomes
    .map(o => `${o.value} ${o.metric.toLowerCase()}`)
    .slice(0, 2)
    .join(' · '),
  techStack: cs.techStack.slice(0, 4),
  slug: cs.slug,
}));

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

export const handlers = [
  http.post('/api/contact', async () => {
    return HttpResponse.json({ success: true }, { status: 200 });
  }),
];

export const server = setupServer(...handlers);

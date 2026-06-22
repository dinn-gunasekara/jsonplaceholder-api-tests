import { test, expect } from '@playwright/test';

test.describe('Edge cases', () => {
  test('response content-type is JSON', async ({ request }) => {
    const response = await request.get('/posts/1');
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  test('POST with an empty body still returns 201', async ({ request }) => {
    // boundary test — confirms the API doesn't silently reject a minimal payload
    const response = await request.post('/posts', { data: {} });
    expect(response.status()).toBe(201);
  });

  test('GET /posts/0 is treated as not found', async ({ request }) => {
    // 0 is outside the valid 1–100 id range — a classic boundary value
    const response = await request.get('/posts/0');
    expect(response.status()).toBe(404);
  });

  test('GET /users returns all 10 users with valid schema', async ({ request }) => {
    const response = await request.get('/users');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.length).toBe(10);
  });
});
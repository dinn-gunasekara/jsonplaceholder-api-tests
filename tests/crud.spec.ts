import { test, expect } from '@playwright/test';

// Note: this API simulates writes — responses look real, but nothing
// persists server-side. Assertions check the *response contract*,
// which is what you control and what a real client would rely on.
test.describe('Posts — POST / PUT / PATCH / DELETE', () => {
  test('POST /posts creates a post and returns 201', async ({ request }) => {
    const payload = { title: 'QA Internship Application', body: 'Testing the create flow', userId: 1 };
    const response = await request.post('/posts', { data: payload });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.title).toBe(payload.title);
    expect(body.body).toBe(payload.body);
    expect(body.id).toBeTruthy();
  });

  test('PUT /posts/:id fully replaces a post', async ({ request }) => {
    const update = { id: 1, title: 'Updated Title', body: 'Updated body text', userId: 1 };
    const response = await request.put('/posts/1', { data: update });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.title).toBe(update.title);
    expect(body.body).toBe(update.body);
  });

  test('PATCH /posts/:id partially updates a post', async ({ request }) => {
    const patch = { title: 'Only the title changed' };
    const response = await request.patch('/posts/1', { data: patch });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.title).toBe(patch.title);
    expect(body.id).toBe(1); // unrelated fields stay intact
  });

  test('DELETE /posts/:id returns 200 with an empty object', async ({ request }) => {
    const response = await request.delete('/posts/1');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toEqual({});
  });
});
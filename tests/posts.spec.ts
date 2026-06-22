import { test, expect } from '@playwright/test';
import { isValidPost } from '../helpers/schemas';

test.describe('Posts — GET', () => {
  test('GET /posts returns the full list of 100 posts', async ({ request }) => {
    const response = await request.get('/posts');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(100); // fixed, stable dataset
  });

  test('GET /posts returns posts matching the schema', async ({ request }) => {
    const response = await request.get('/posts');
    const body = await response.json();
    body.forEach((post: any) => {
      expect(isValidPost(post)).toBe(true);
    });
  });

  test('GET /posts/:id returns a single post', async ({ request }) => {
    const response = await request.get('/posts/1');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(1);
    expect(isValidPost(body)).toBe(true);
  });

  test('GET /posts/:id returns 404 for an out-of-range id', async ({ request }) => {
    const response = await request.get('/posts/9999');
    expect(response.status()).toBe(404);
  });

  test('GET /posts?userId= filters correctly', async ({ request }) => {
    const response = await request.get('/posts?userId=1');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.length).toBe(10); // each user owns exactly 10 posts
    body.forEach((post: any) => {
      expect(post.userId).toBe(1);
    });
  });
});
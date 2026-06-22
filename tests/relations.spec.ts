import { test, expect } from '@playwright/test';
import { isValidComment } from '../helpers/schemas';

// These tests demonstrate understanding of *relational* API design —
// the same data reachable two different ways should be consistent.
// This is a form of integration testing: confirming separate endpoints
// agree with each other, not just that each works in isolation.
test.describe('Resource relationships', () => {
  test('GET /posts/:id/comments returns comments belonging to that post', async ({ request }) => {
    const response = await request.get('/posts/1/comments');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.length).toBe(5); // each post has exactly 5 comments
    body.forEach((comment: any) => {
      expect(comment.postId).toBe(1);
      expect(isValidComment(comment)).toBe(true);
    });
  });

  test('GET /comments?postId= returns the same data as the nested route', async ({ request }) => {
    const nested = await (await request.get('/posts/1/comments')).json();
    const filtered = await (await request.get('/comments?postId=1')).json();

    expect(filtered.length).toBe(nested.length);
    const nestedIds = nested.map((c: any) => c.id).sort();
    const filteredIds = filtered.map((c: any) => c.id).sort();
    expect(filteredIds).toEqual(nestedIds);
  });
});
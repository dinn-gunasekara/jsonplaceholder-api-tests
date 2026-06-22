// Reusable schema validators — separates "what does a valid object
// look like" from the test logic itself, and is a form of contract
// validation testing: confirming response *shape*, not just status code.

export function isValidPost(post: any): boolean {
  return (
    typeof post.id === 'number' &&
    typeof post.userId === 'number' &&
    typeof post.title === 'string' &&
    typeof post.body === 'string'
  );
}

export function isValidComment(comment: any): boolean {
  return (
    typeof comment.id === 'number' &&
    typeof comment.postId === 'number' &&
    typeof comment.email === 'string' &&
    comment.email.includes('@') &&
    typeof comment.body === 'string'
  );
}

export function isValidUser(user: any): boolean {
  return (
    typeof user.id === 'number' &&
    typeof user.name === 'string' &&
    typeof user.username === 'string' &&
    typeof user.email === 'string' &&
    typeof user.address === 'object' &&
    typeof user.company === 'object'
  );
}
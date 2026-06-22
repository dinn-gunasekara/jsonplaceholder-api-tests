# JSONPlaceholder API Test Suite

REST API test suite for [JSONPlaceholder](https://jsonplaceholder.typicode.com) built
with Playwright's API testing capabilities — no browser, just HTTP.

## Testing types covered
- **API / integration** — GET, POST, PUT, PATCH, DELETE across the posts resource
- **Schema / contract validation** — reusable validators confirming response shape and
  types, not just status codes
- **Relational consistency** — confirming the nested `/posts/:id/comments` route and the
  filtered `/comments?postId=` route return consistent data
- **Negative / boundary** — out-of-range IDs, empty payloads, boundary values like ID 0

## Why these tests matter
JSONPlaceholder is a mock API with simulated (non-persisted) writes. The test design
accounts for that explicitly — assertions check the response contract rather than assuming
server-side persistence, which is the same judgment call needed when testing any API with
side effects you don't fully control.

## Architecture
Schema validation is extracted into `helpers/schemas.ts` — reusable validator functions
that separate "what does a valid object look like" from the test logic itself.

## Tech stack
- Playwright Test (API testing mode) — no browser, just HTTP requests
- TypeScript
- GitHub Actions CI

## Setup
```bash
npm install
```

No browser installation needed — API tests use Playwright's `request` fixture,
not a browser engine.

## Run tests

### Via npm scripts
```bash
npm test              # full suite
npm run test:report   # open HTML report
```

### Direct commands
```bash
npx playwright test                          # full suite
npx playwright test tests/posts.spec.ts      # one spec file
npx playwright test --grep "GET"             # filter by test name
npx playwright show-report                   # open HTML report
```

## CI
Runs on every push and pull request via GitHub Actions.
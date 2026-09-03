# Young Haj

Young Haj is an Arabic, child-focused static learning game that introduces a Hajj journey through quizzes and small memory, maze, and ordering activities.

## Evidence boundary

- The application is deterministic: it uses no runtime AI, server, or API key.
- Automated checks cover content structure, progression rules, type safety, and the production build.
- Religious accuracy, educational suitability, and learning outcomes are **not** certified by automated tests. Current content-review status is `pending`; see [`docs/content-review-policy.md`](docs/content-review-policy.md).

## Local development

Requires Node.js 22.

```bash
npm ci
npm run dev
```

## Verification

```bash
npm run lint
npm test
npm run validate:content
npm run build
```

The review-ledger command intentionally reports `BLOCKED` while human domain-review receipts are missing, but exits successfully when the ledger structure is valid.

## Privacy

Young Haj stores no account data and sends no child input to a backend. Browser speech/audio capabilities are optional enhancements; the visible activity text and controls remain the primary interaction path.

## Deployment

Publish the generated `dist/` directory as a static site. Set Vite's base path for subpath hosting before deployment, then verify the deployed asset paths in a browser. A successful local build does not prove a live deployment.

# Young Haj Production Hardening Design

## Status and definition of done

This design turns the current Arabic educational game into a small, truthful release candidate. “Production ready” means deterministic build/tests, accessible interaction, reviewed content provenance, green Pages deployment, and accurate documentation. It does not imply religious authority, learning efficacy, adoption, or commercial validation.

## Product outcome

Keep the current focused journey: introduce key Hajj terms and guide children through short quiz, memory, maze, and ordering activities in Arabic. The app remains deterministic and offline-capable; no AI generation is needed for the current product.

## Architecture

- Remove unused Gemini, environment-key, Express, and other unused dependencies/configuration.
- Keep Vite, React, TypeScript, Motion, and the existing component structure.
- Move learning content into a typed, versioned content module with stable IDs and explicit source/review metadata.
- Separate scoring and progression logic from components so it can be tested without the browser.
- Configure the correct GitHub Pages base path and deterministic asset URLs.
- Lazy-load activity modules where it materially reduces the current large bundle.

## Content governance

Each learning item records content version, source note, reviewer role, review date, status, and unresolved notes. Repository status stays `content-review-pending` until an identified qualified reviewer signs the current version. Automated tests can prove structure and consistency only; they cannot certify religious correctness.

## Product Design scope

Audit welcome → quiz → game → completion on mobile and desktop. Required checks cover Arabic RTL, reading level, touch targets, keyboard navigation, focus visibility, reduced motion, error recovery, and progress clarity. Preserve the current warm visual system. Replace decorative emoji only when a reviewed source asset is available; do not invent substitute art.

## Testing strategy

- Unit tests: content schema, unique IDs, journey order, correct-answer count, score bounds, and completion transitions.
- Component tests: welcome/start, quiz selection, retry, next step, and completion summary.
- Browser tests: full deterministic journey, keyboard navigation, mobile viewport, and refresh/restart behavior.
- Accessibility checks: landmarks, heading order, labels, focus, contrast risks, and reduced-motion behavior.

## CI and release evidence

- Frozen install, lint/typecheck, unit/component tests, production build, dependency audit report, secret scan, and Pages artifact check.
- Pages deployment remains separate from content approval. A green deployment proves delivery, not correctness.
- Release documentation links the exact content version and review receipt.

## Non-goals

- No AI-generated religious content.
- No child accounts, analytics, ads, payment, or social sharing.
- No claim of memorization outcomes or curriculum accreditation.

## Acceptance gates

- Clean install, typecheck, tests, and production build pass with no unused API-key requirement.
- Dependency audit is triaged and has no unaccepted high/critical production findings.
- Deterministic end-to-end journey passes at mobile and desktop viewports.
- Content ledger covers every learning item; human review is either received or clearly `BLOCKED`.
- README describes the actual app, evidence tiers, local use, Pages deployment, limitations, and content-review status.


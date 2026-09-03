# Young Haj Production Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Use `superpowers:test-driven-development` for every behavior change and `superpowers:verification-before-completion` before claiming success.

**Spec:** [`../specs/2026-09-02-production-hardening-design.md`](../specs/2026-09-02-production-hardening-design.md)

**Goal:** Turn the existing child-focused Hajj learning game into a deterministic, accessible static application with reviewed-content provenance and no unused AI/server surface.

**Architecture:** Versioned TypeScript content modules feed pure progression/scoring functions and existing React screens. No model generates religious content at runtime. Automated checks validate structure and behavior; human domain review remains a separate evidence gate.

**Tech stack:** React 19, Vite, TypeScript, Vitest, Testing Library, GitHub Pages.

---

## Task 1: Add a deterministic test harness and content schema

**Files:**
- Modify: `package.json`, `package-lock.json`, `vite.config.ts`
- Create: `vitest.config.ts`, `src/test/setup.ts`
- Create: `src/content/schema.ts`, `src/content/hajj-v1.ts`
- Create: `src/content/schema.test.ts`
- Modify: `src/types.ts`, `src/data.ts`

**Contract:**
```ts
export type ReviewedContentItem = {
  id: string;
  kind: "quiz" | "ordering" | "memory" | "maze";
  locale: "ar" | "en";
  prompt: string;
  review: { status: "pending" | "reviewed"; receiptId?: string };
};
```

- [ ] Add Vitest/Testing Library and write schema tests for unique IDs, supported locale/kind, valid answer references, non-empty feedback, and an explicit review status on every item.
- [ ] Run `npm test -- --run src/content/schema.test.ts`; expect RED because the content contract does not exist.
- [ ] Move the current data into `hajj-v1.ts`, validate it at module load, and retain `src/data.ts` as a typed compatibility export until consumers migrate.
- [ ] Mark all content `pending` unless a real reviewer receipt exists; never infer approval from source wording.
- [ ] Run the focused test and `npm run lint`; expect GREEN.
- [ ] Commit: `refactor: add versioned learning content schema`.

## Task 2: Remove unused AI and server dependencies

**Files:**
- Modify: `package.json`, `package-lock.json`, `vite.config.ts`, `.env.example`, `README.md`
- Create: `src/no-runtime-ai.test.ts`

- [ ] Write a source/package test that fails if `@google/genai`, Express, dotenv, provider key names, or `process.env` injection reappear in production source/config.
- [ ] Run the test; expect RED because the package and Vite config still expose unused AI/server dependencies.
- [ ] Remove `@google/genai`, Express, dotenv, related types/tools, and the unused API-key define block; regenerate the lockfile with `npm install --package-lock-only`.
- [ ] Document that the shipped product is deterministic and contains no runtime-generated religious guidance.
- [ ] Run test, typecheck, and build; expect GREEN.
- [ ] Commit: `chore: remove unused AI and server surface`.

## Task 3: Extract progression and scoring rules

**Files:**
- Create: `src/domain/progression.ts`, `src/domain/progression.test.ts`
- Modify: `src/App.tsx`, `src/types.ts`

**Interface:**
```ts
export type GameState = { stepIndex: number; score: number; completedIds: string[] };
export type GameAction =
  | { type: "answer"; itemId: string; correct: boolean }
  | { type: "next" }
  | { type: "restart" };

export function reduceGame(state: GameState, action: GameAction): GameState;
```

- [ ] Write failing tests for correct/incorrect answers, duplicate submissions, step bounds, completion, and restart.
- [ ] Implement pure immutable rules and replace ad-hoc score/step mutation in `App.tsx`.
- [ ] Run progression tests; expect GREEN.
- [ ] Commit: `refactor: make game progression deterministic`.

## Task 4: Test all activity types and recovery paths

**Files:**
- Create: `src/components/QuizStep.test.tsx`
- Create: `src/components/OrderingGame.test.tsx`
- Create: `src/components/MemoryGame.test.tsx`
- Create: `src/components/MazeGame.test.tsx`
- Modify: the four matching component files

- [ ] Add keyboard-driven tests for one successful and one failed/retry path per activity; verify feedback and next-step availability.
- [ ] Run component tests; expect RED on inaccessible controls, unstable ordering, or missing retry behavior.
- [ ] Add semantic buttons, visible focus, deterministic shuffle via injected RNG, disabled duplicate submission, and focus movement to feedback.
- [ ] Run component tests; expect GREEN.
- [ ] Commit: `test: cover Young Haj learning activities`.

## Task 5: Complete accessibility and static-delivery gates

**Files:**
- Modify: `src/index.css`, `src/App.tsx`, `src/components/WelcomeScreen.tsx`, `src/components/EndScreen.tsx`
- Create: `src/App.test.tsx`
- Create: `.github/workflows/ci.yml`
- Modify: `README.md`

- [ ] Write app-flow tests for welcome→activities→completion, Arabic direction, reduced motion, audio/speech unavailable, and restart; expect RED.
- [ ] Preserve the existing visual language while adding `dir` handling, reduced-motion CSS, skip/focus behavior, and non-audio alternatives.
- [ ] Add CI on Node 22 for `npm ci`, typecheck, tests, build, and a bundle-size budget that initially records the actual baseline before enforcing regression limits.
- [ ] Document GitHub Pages base-path behavior and the exact build artifact.
- [ ] Run `npm ci`, `npm run lint`, `npm test`, and `npm run build`; expect GREEN.
- [ ] Commit: `ci: enforce Young Haj production gates`.

## Task 6: Add review provenance without fabricating approval

**Files:**
- Create: `docs/content-review-policy.md`, `docs/reviews/README.md`
- Create: `scripts/validate-review-ledger.mjs`
- Modify: `package.json`, `README.md`

- [ ] Add a validator test showing reviewed items require reviewer name/role, date, content version/hash, scope, findings, and disposition.
- [ ] Implement the ledger validator and a `validate:content` script; keep current items `pending` until receipts are supplied.
- [ ] Run `npm run validate:content`; expect structural PASS and domain-review status `BLOCKED`, not a false failure or approval.
- [ ] Run `git diff --check` and a secret-pattern scan; expect GREEN.
- [ ] Commit: `docs: add content review evidence gate`.

## Final acceptance

- [ ] Fresh clone passes install, typecheck, tests, and production build.
- [ ] No AI SDK, provider key, Express server, or runtime content generation remains.
- [ ] All activities have deterministic logic and keyboard/recovery tests.
- [ ] Content inventory validates structurally and each item has explicit review status.
- [ ] Human religious/educational review is either evidenced by a receipt or reported `BLOCKED`; it is never silently treated as passed.

# FlowLedger Landing Page

## What this is

The public marketing landing page for FlowLedger. Its only job is to explain what
FlowLedger is and send visitors to the real app's login/register pages.

This is **not** the FlowLedger application and **not** part of the
`flowledger` monorepo (sibling repo, referenced read-only for design tokens).
This repo has:

- No backend, no API, no database.
- No authentication or user session state.
- No forms and no network calls other than static asset loading.

If a task sounds like it belongs in the product (auth, transactions, accounts,
reports, provider integrations), it belongs in the `flowledger` repo, not here.

## Stack

- React + Vite + TypeScript
- Tailwind CSS (utility classes only — no component libraries, no heavy
  animation libraries; simple Tailwind transitions/fades are enough)
- `lucide-react` for icons, matching the main app

## Folder structure

```
src/
  main.tsx            Entry point
  App.tsx             Composes the page from sections/
  index.css           Tailwind directives + base styles (mirrors the app's)
  components/         Reusable, presentational UI primitives (BrandLogo, CtaLink, FeatureCard)
  sections/           One file per landing-page section (Header, Hero, Features, ...)
  constants/          Static config, e.g. links.ts (URLs into the FlowLedger app)
```

Every call to action must go through `src/constants/links.ts` (`appLinks.login` /
`appLinks.register`) rather than hardcoding the FlowLedger app URL inline.

## Language requirement — English only, no exceptions

**All code must be 100% in English**: variable names, function names, component
names, file names, comments, and commit messages. This includes constants that
hold user-facing copy — e.g. `heroTitle`, never `tituloHero`. The *rendered*
copy the constant holds may be Spanish or English depending on product
decisions, but the identifier naming it is always English. Never mix languages
in an identifier, comment, or commit message.

## Documentation requirement — TSDoc on every export

Every exported component, function, type, and hook must have a TSDoc comment
(`/** ... */`, with `@param`/`@returns` where applicable). No undocumented
exports.

Inline `//` comments are reserved for genuinely non-obvious "why" — a hidden
constraint or a subtlety a reader would otherwise miss. Never narrate what the
code already makes obvious, and never narrate session/work history in a
comment (that belongs in the commit message, not the file).

## Design tokens

Colors, font, and radii are extracted from the FlowLedger app
(`apps/web/tailwind.config.ts` and `apps/web/src/index.css` in the sibling
`flowledger` repo) and declared in this repo's `tailwind.config.ts`. Do not
invent a parallel design system — if a new token is needed, check whether the
app already defines it before adding one here.

- Brand colors: `ink` (#17211d), `mint` (#dff8ea), `pine` (#176b52), `coral` (#f97359)
- Font: Inter
- Radii: `rounded-md` for buttons/inputs, `rounded-lg` for cards
- Dark mode: class-based (`darkMode: "class"`), same as the app

## Component conventions

- `CtaLink` (not `Button`) is the CTA primitive here, since every call to
  action is an external link into the FlowLedger app rather than an in-app
  action. It has `primary`, `secondary`, and `outline` variants — use
  `outline` (not a hand-rolled className override) for CTAs placed on dark
  surfaces, since Tailwind resolves conflicting utilities by their order in
  the generated stylesheet, not by className concatenation order.
- Keep sections self-contained in `src/sections/`; `App.tsx` should stay a
  thin composition of section components.
- Mobile-first responsive, matching the app's breakpoints and spacing scale.

## Commit convention

Conventional Commits, written in English (e.g. `feat: add hero section`,
`fix: correct CTA contrast on dark band`, `docs: update CLAUDE.md`).

## Workflow

- Work directly on `main`.
- Commit atomically as you go.
- **Never push without explicit approval** from the repo owner after they've
  reviewed the diff. Local commits are fine; `git push` is not, until asked.

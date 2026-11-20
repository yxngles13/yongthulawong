# Landing Page YongBot Chat Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the landing page a YongBot chat that shares one conversation with the corner bubble.

**Architecture:** Chat state moves out of `YongBot.jsx` into a React context (`YongBotProvider`). A reusable `ChatThread` renders messages + chips + input; the landing page (`Hero`) and the corner panel both render it. The corner bubble hides while `#home` is on screen.

**Tech Stack:** React 19, Vite, Vitest + Testing Library.

**Spec:** `docs/superpowers/specs/2026-11-20-landing-chat-design.md`

## Global Constraints
- Keep `h1` with `profile.name` on the landing page (existing test).
- No changes to `api/chat.js` or `yongbotData.js` answers.
- Yong runs tests and the dev server; the implementer writes tests but does not run them, and does not commit.

## Review Focus
- `IntersectionObserver` is missing in jsdom/old browsers → bubble must still render (default to visible).
- Wheel-scrolling inside the landing chat must scroll the chat, not glide to About, until the list hits its end.
- Sending while a reply is loading must be ignored (no duplicate requests) — existing guard, kept in `ask`.
- Scrolling back up to the landing page while the corner panel is open must not show two chats.
- Empty / whitespace input must not send.

---

### Task 1: Shared chat state + reusable thread

**Files:**
- Create: `src/components/YongBot/YongBotContext.jsx`
- Create: `src/components/YongBot/ChatThread.jsx`
- Modify: `src/components/YongBot/YongBot.jsx` (use context + `ChatThread`; hide when landing page visible)
- Modify: `src/App.jsx` (wrap in `YongBotProvider`)

**Interfaces:**
- Produces: `YongBotProvider({ children })`; `useYongBot() -> { messages, loading, ask(text: string): Promise<void>, askSuggestion(question): Promise<void> }` — `ask` ignores empty text and calls while loading; logic moved verbatim from the current component.
- Produces: `ChatThread({ variant: 'landing' | 'panel', showGreeting?: boolean })` — renders `.yongbot-messages` (role="log"), `.yongbot-suggestions`, `.yongbot-input` form; owns its own `input` state; autoscrolls its own list (scrolling the list element, not `scrollIntoView`, so the page doesn't jump).
- Produces: `useLandingVisible() -> boolean` inside `YongBot.jsx` — IntersectionObserver on `#home`, `false` if unsupported.

- [ ] Step 1: Implement the context, `ChatThread`, refactor `YongBot.jsx` to render `null` while the landing page is visible, wrap `App`.

### Task 2: Landing page becomes the chat

**Files:**
- Modify: `src/components/Hero.jsx` (drop tags/figure/hand lines/drift; render name, greeting, `ChatThread variant="landing"`; wheel handler ignores events inside a scrollable `.yongbot-messages` that can still scroll that way)
- Modify: `src/styles.css` (remove `.hero-hand*`, `.hero-figure*`, `.hero-tags*` rules + their mobile overrides; add `.hero-chat` layout)
- Modify: `src/components/YongBot/YongBot.css` (landing variant: wide, centered, messages area grows after the first question)
- Test: `src/components/SiteSections.test.jsx`

- [ ] Step 1: Write the test `asks YongBot a suggested question from the landing page`: render `App`, click the chip `/what's her major/i` inside `#home`, `await findByText(/computer science with a minor/i)` within `#home`.
- [ ] Step 2: Implement `Hero` + styles.

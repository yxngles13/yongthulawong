# Landing page as YongBot chat — design

## Why
YongBot is hidden as a small bubble in the corner. Yong wants it to be the first thing visitors can ask when they land on the site. Visual design will be refined later; this change is about structure and behavior.

## Goals
- The landing page (`Hero`) becomes a chat: name at top, a greeting, a large centered input, and the suggested questions as chips.
- After the first question, the landing page shows the conversation (messages scroll inside their own area, input pinned below), ChatGPT-style.
- One shared conversation: the corner YongBot bubble continues the same chat after visitors scroll past the landing page.

## Non-goals
- Final visual design (Yong will iterate on the look later).
- Changes to `/api/chat` or the suggested-question answers.

## Anti-goals
- The chat must not trap scrolling: visitors must still be able to get from the landing page to About.
- No duplicate YongBots on screen at once.

## Approaches considered
- **A. Landing page becomes the chat (chosen).** Most visible, keeps Yong's name, shared conversation with the corner bubble.
- B. Keep the photo and add a chat bar that opens the existing panel. Smallest change, but the chat stays a doorway into a small panel.
- C. A full-page chat with very little of Yong on it. Most visible, but loses personality on first impression.

## Design (Claude's calls, open to correction)
- **Shared state:** pull the chat logic out of `YongBot.jsx` into a `YongBotProvider` context (messages, loading, `ask(text)`, `askSuggestion(question)`), wrapped around the app in `App.jsx`. Both the landing chat and the corner panel read from it.
- **Landing page:** keeps the `h1` with Yong's name and the scroll cue. Removes the cutout photo, floating tags, and handwritten lines (the image file stays in `public/`). Before any question: greeting + input + chips, centered. After: message list fills the space, input sits at the bottom.
- **Corner bubble:** hidden while the landing page is on screen (IntersectionObserver on `#home`); appears once visitors scroll past it.
- **Scrolling:** the landing page's scroll-to-About pull ignores wheel events inside the message list while that list can still scroll in that direction.
- **Tests:** update the landing page test; add one that asking a suggested question on the landing page shows the answer.

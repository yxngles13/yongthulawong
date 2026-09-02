# Yong Thu La Wong Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, responsive, cream-and-pink personal portfolio that presents Yong's résumé and deploys as a static Vite site on Vercel.

**Architecture:** A single React page composes focused semantic section components from one typed-by-convention local content module. Plain CSS owns the visual system, responsive layout, and motion preferences; no backend or runtime data fetching is required.

**Tech Stack:** Vite, React, JavaScript, CSS, Vitest, Testing Library, jsdom, Vercel static hosting

**Spec:** `docs/superpowers/specs/2026-09-02-portfolio-design.md`

## Global Constraints

- Match the supplied warm cream, bubblegum pink, dusty pink, and taupe visual direction.
- Bundle all content and the résumé locally; make no runtime network requests.
- Use no database, authentication, CMS, server-side API, analytics, blog, or contact-form service.
- Use intentional decorative placeholders instead of fake personal photography.
- Keep every section usable with a keyboard, semantic markup, visible focus, sufficient contrast, and reduced-motion support.
- Support common mobile, tablet, and desktop widths.
- Deploy with Vercel's standard Vite build and `dist` output directory.

---

## File Map

- `package.json`: scripts and runtime/test dependencies.
- `vite.config.js`: Vite and Vitest configuration.
- `index.html`: document shell, metadata, and font preconnects.
- `src/main.jsx`: React entry point and global stylesheet import.
- `src/App.jsx`: page composition only.
- `src/data/portfolio.js`: single source of truth for résumé-derived content and links.
- `src/data/portfolio.test.js`: data completeness and link validation.
- `src/components/Navigation.jsx`: desktop and mobile in-page navigation.
- `src/components/Hero.jsx`: opening message and calls to action.
- `src/components/About.jsx`: biography and intentional portrait placeholder.
- `src/components/Experience.jsx`: experience card list.
- `src/components/Projects.jsx`: project card list and optional links.
- `src/components/Skills.jsx`: grouped skills.
- `src/components/Contact.jsx`: contact links and résumé download.
- `src/components/SiteSections.test.jsx`: semantic content and interaction checks.
- `src/styles.css`: design tokens, layout, decorative motifs, states, and responsive behavior.
- `src/styles.test.js`: accessibility-critical and responsive CSS contract checks.
- `public/Yong-Thu-La-Wong-Resume.pdf`: downloadable source résumé.
- `vercel.json`: explicit static build configuration.
- `README.md`: local development and Vercel deployment instructions.

---

### Task 1: Project Foundation and Portfolio Data

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/data/portfolio.js`
- Test: `src/data/portfolio.test.js`

**Interfaces:**
- Produces: named exports `profile`, `navigation`, `experiences`, `projects`, and `skillGroups` from `src/data/portfolio.js`.
- Produces: scripts `dev`, `build`, `preview`, and `test` in `package.json`.

- [ ] **Step 1: Create the package manifest and install the declared toolchain**

Create `package.json` with:

```json
{
  "name": "yong-portfolio",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  }
}
```

Run:

```bash
npm install react react-dom
npm install --save-dev vite @vitejs/plugin-react vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Expected: `package-lock.json` is generated and all commands exit successfully.

- [ ] **Step 2: Write the failing portfolio-data tests**

Create `src/data/portfolio.test.js`:

```js
import { describe, expect, it } from 'vitest'
import { experiences, navigation, profile, projects, skillGroups } from './portfolio'

describe('portfolio data', () => {
  it('contains Yong’s professional identity and deployable contact links', () => {
    expect(profile.name).toBe('Yong Thu La Wong')
    expect(profile.email).toBe('yongthulaw@cpp.edu')
    expect(profile.github).toMatch(/^https:\/\/github\.com\//)
    expect(profile.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//)
    expect(profile.resume).toBe('/Yong-Thu-La-Wong-Resume.pdf')
  })

  it('provides a navigation target for every major section', () => {
    expect(navigation.map((item) => item.href)).toEqual([
      '#work', '#about', '#experience', '#contact',
    ])
  })

  it('includes every résumé experience and featured project', () => {
    expect(experiences.map((item) => item.organization)).toEqual([
      'California State University, Chancellor’s Office',
      'Cadence Design Systems',
      'Deep-Hipo Research',
    ])
    expect(projects.map((item) => item.name)).toEqual([
      'Eye Tracking Analysis', 'Project Sloka', 'BrainHive',
    ])
  })

  it('does not expose empty optional links or empty skill groups', () => {
    expect(projects.every((item) => !('href' in item) || /^https:\/\//.test(item.href))).toBe(true)
    expect(skillGroups.every((group) => group.items.length > 0)).toBe(true)
  })
})
```

- [ ] **Step 3: Run the test to confirm the missing module fails**

Run: `npm test -- src/data/portfolio.test.js`

Expected: FAIL because `src/data/portfolio.js` does not exist.

- [ ] **Step 4: Implement the résumé-derived data module**

Create `src/data/portfolio.js` with the exact five named exports. Use the résumé's dates, organizations, roles, summaries, and skill groups. Set `profile.github` to `https://github.com/yxngles13`, `profile.linkedin` to `https://www.linkedin.com/in/yong-thu-la-wong`, and `profile.resume` to `/Yong-Thu-La-Wong-Resume.pdf`. Omit `href` from a project unless its URL is verified; do not create `#` links.

Required object shapes:

```js
export const profile = {
  name: 'Yong Thu La Wong',
  shortName: 'Yong',
  location: 'West Covina, California',
  email: 'yongthulaw@cpp.edu',
  github: 'https://github.com/yxngles13',
  linkedin: 'https://www.linkedin.com/in/yong-thu-la-wong',
  resume: '/Yong-Thu-La-Wong-Resume.pdf',
  introduction: 'Computer science student and software engineer building thoughtful full-stack and machine learning experiences.',
  biography: [
    'I’m a computer science student at Cal Poly Pomona, minoring in artificial intelligence and graduating in December 2027.',
    'I enjoy turning complex ideas into approachable products across full-stack engineering, data, and machine learning.',
  ],
}

export const navigation = [
  { label: 'my work', href: '#work' },
  { label: 'about', href: '#about' },
  { label: 'experience', href: '#experience' },
  { label: 'contact', href: '#contact' },
]
```

Each experience must use `{ organization, role, dates, location, summary, highlights }`. Each project must use `{ name, dates, summary, technologies }` plus optional `href`. Each skill group must use `{ label, items }`.

- [ ] **Step 5: Add the Vite shell**

Create `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', setupFiles: './src/test-setup.js' },
})
```

Create `src/test-setup.js` containing `import '@testing-library/jest-dom/vitest'`. Create `src/main.jsx` to render `<App />` into `#root`, and create a minimal `src/App.jsx` that returns `<main><h1>Yong’s Portfolio</h1></main>`. Create `index.html` with UTF-8 metadata, responsive viewport, title `Yong Thu La Wong | Software Engineer`, a concise description, and `<div id="root"></div>`.

- [ ] **Step 6: Run tests and production build**

Run: `npm test -- src/data/portfolio.test.js`

Expected: 4 tests PASS.

Run: `npm run build`

Expected: Vite creates `dist/index.html` without errors.

- [ ] **Step 7: Commit the foundation**

```bash
git add package.json package-lock.json vite.config.js index.html src
git commit -m "feat: scaffold portfolio and add resume content"
```

---

### Task 2: Semantic Portfolio Sections

**Files:**
- Modify: `src/App.jsx`
- Create: `src/components/Navigation.jsx`
- Create: `src/components/Hero.jsx`
- Create: `src/components/About.jsx`
- Create: `src/components/Experience.jsx`
- Create: `src/components/Projects.jsx`
- Create: `src/components/Skills.jsx`
- Create: `src/components/Contact.jsx`
- Test: `src/components/SiteSections.test.jsx`

**Interfaces:**
- Consumes: all five named exports from `src/data/portfolio.js`.
- Produces: default component exports with props `Navigation({ items })`, `Hero({ profile })`, `About({ profile })`, `Experience({ experiences })`, `Projects({ projects })`, `Skills({ groups })`, and `Contact({ profile })`.
- Produces: section IDs `work`, `about`, `experience`, and `contact` used by navigation.

- [ ] **Step 1: Write failing semantic and interaction tests**

Create `src/components/SiteSections.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'

describe('portfolio page', () => {
  it('renders the core story and all major sections', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: /yong’s portfolio/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /experiences/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /selected work/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /skills/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /let’s connect/i })).toBeInTheDocument()
  })

  it('renders truthful experience and project content', () => {
    render(<App />)
    expect(screen.getByText('California State University, Chancellor’s Office')).toBeInTheDocument()
    expect(screen.getByText('Cadence Design Systems')).toBeInTheDocument()
    expect(screen.getByText('Eye Tracking Analysis')).toBeInTheDocument()
    expect(screen.getByText('BrainHive')).toBeInTheDocument()
  })

  it('provides external profile links and a downloadable résumé', () => {
    render(<App />)
    expect(screen.getAllByRole('link', { name: /github/i })[0]).toHaveAttribute('href', 'https://github.com/yxngles13')
    expect(screen.getAllByRole('link', { name: /linkedin/i })[0]).toHaveAttribute('href', 'https://www.linkedin.com/in/yong-thu-la-wong')
    expect(screen.getByRole('link', { name: /download résumé/i })).toHaveAttribute('download')
  })

  it('opens and closes the mobile navigation accessibly', async () => {
    const user = userEvent.setup()
    render(<App />)
    const button = screen.getByRole('button', { name: /open navigation/i })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    await user.click(screen.getByRole('link', { name: 'about' }))
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })
})
```

- [ ] **Step 2: Run the section tests and confirm failure**

Run: `npm test -- src/components/SiteSections.test.jsx`

Expected: FAIL because the section components and content are absent.

- [ ] **Step 3: Implement navigation, hero, and about**

Implement `Navigation` with a native `<nav aria-label="Primary navigation">`, a button whose accessible name toggles between `Open navigation` and `Close navigation`, `aria-expanded`, and an unordered list of anchor links. Close the menu when any navigation link is selected.

Implement `Hero` as `<header id="home">` with the only `<h1>`, the profile introduction, a `Start Here` anchor targeting `#about`, and compact GitHub/LinkedIn links. Implement `About` as `<section id="about">` with heading `About Me`, both biography paragraphs, Cal Poly Pomona education details, and an `aria-hidden="true"` decorative photo-placeholder collage.

- [ ] **Step 4: Implement work, experience, skills, and contact**

Implement `Projects` as `<section id="work">` with heading `Selected Work`; map every project to an `<article>`, show technology tags as a list, and render a `View project` anchor only when `project.href` exists.

Implement `Experience` as `<section id="experience">` with heading `Experiences`; map every item to an `<article>` with role, organization, dates, location, summary, and highlight list. Implement `Skills` as a labelled section with heading `Skills` and one group per résumé category. Implement `Contact` as `<section id="contact">` with heading `Let’s Connect`, `mailto:` email, external GitHub/LinkedIn links using `target="_blank" rel="noreferrer"`, and a résumé anchor carrying the `download` attribute.

- [ ] **Step 5: Compose the page in `App.jsx`**

Compose in this order:

```jsx
<>
  <Navigation items={navigation} />
  <Hero profile={profile} />
  <main>
    <About profile={profile} />
    <Projects projects={projects} />
    <Experience experiences={experiences} />
    <Skills groups={skillGroups} />
  </main>
  <Contact profile={profile} />
</>
```

Add decorative elements only with `aria-hidden="true"`; do not insert presentational headings that disrupt semantic order.

- [ ] **Step 6: Run the semantic tests**

Run: `npm test -- src/components/SiteSections.test.jsx`

Expected: 4 tests PASS.

Run: `npm test`

Expected: all data and section tests PASS.

- [ ] **Step 7: Commit the semantic site**

```bash
git add src/App.jsx src/components
git commit -m "feat: add accessible portfolio sections"
```

---

### Task 3: Pink Scrapbook Visual System and Responsive Layout

**Files:**
- Create: `src/styles.css`
- Modify: `src/main.jsx`
- Modify: `src/components/Navigation.jsx`
- Modify: `src/components/Hero.jsx`
- Modify: `src/components/About.jsx`
- Modify: `src/components/Experience.jsx`
- Modify: `src/components/Projects.jsx`
- Modify: `src/components/Skills.jsx`
- Modify: `src/components/Contact.jsx`
- Test: `src/styles.test.js`

**Interfaces:**
- Consumes: stable semantic class names assigned by the section components.
- Produces: CSS custom properties `--cream`, `--paper`, `--pink`, `--pink-soft`, `--taupe`, `--ink`, `--line`, `--shadow`, and `--radius`.

- [ ] **Step 1: Write failing CSS-contract tests**

Create `src/styles.test.js`:

```js
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync(new URL('./styles.css', import.meta.url), 'utf8')

describe('responsive and accessible visual system', () => {
  it('defines the portfolio color tokens', () => {
    for (const token of ['--cream', '--paper', '--pink', '--pink-soft', '--taupe', '--ink']) {
      expect(css).toContain(token)
    }
  })

  it('includes mobile and reduced-motion behavior', () => {
    expect(css).toMatch(/@media\s*\(max-width:\s*720px\)/)
    expect(css).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/)
  })

  it('includes visible keyboard focus styling', () => {
    expect(css).toMatch(/:focus-visible/)
    expect(css).toMatch(/outline:/)
  })
})
```

- [ ] **Step 2: Run the style test and confirm failure**

Run: `npm test -- src/styles.test.js`

Expected: FAIL because `src/styles.css` does not exist.

- [ ] **Step 3: Create the design tokens and global styles**

Create `src/styles.css`, import it once from `src/main.jsx`, and define:

```css
:root {
  --cream: #fffdf2;
  --paper: #fffaf6;
  --pink: #df7fac;
  --pink-soft: #f8ddea;
  --taupe: #9f9083;
  --ink: #3e3137;
  --line: #ecd6df;
  --shadow: 0 18px 45px rgb(91 61 74 / 10%);
  --radius: 1.5rem;
  color: var(--ink);
  background: var(--cream);
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  font-synthesis: none;
}
```

Add `box-sizing: border-box`, zero body margin, legible line-height, responsive images, inherited button/input fonts, smooth scrolling, section scroll margins, and a `.skip-link` style. Use a locally defined cursive-style display stack for headings so the baseline does not depend on a remote font request.

- [ ] **Step 4: Style the page to match the supplied mockup**

Add class names to each component and implement:

- A translucent cream sticky nav with compact pink links and rounded mobile-menu button.
- A near-viewport-height hero with oversized pink display heading, centered start button, halftone corner motifs, flower/sparkle shapes, and an offset pink decorative panel.
- A two-column About composition with overlapping rounded placeholder frames and handwritten-style heading.
- Alternating pale-pink experience cards with dates aligned to the right on desktop.
- A responsive three-card project grid with technology pills.
- Grouped skill panels and a rounded pink contact footer.
- Shared hover transitions that use transform, border-color, and shadow without hiding information.

Keep body copy at least `1rem`, maintain comfortable line lengths with `max-width`, and use dark `--ink` text on pastel backgrounds.

- [ ] **Step 5: Add responsive and reduced-motion rules**

At `max-width: 900px`, collapse two- and three-column layouts. At `max-width: 720px`, show the menu button, hide the closed navigation list, use a single-column content flow, reduce hero heading size with `clamp()`, stack experience metadata, and retain at least 44px touch targets.

Add:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

:focus-visible {
  outline: 3px solid var(--ink);
  outline-offset: 4px;
}
```

- [ ] **Step 6: Run automated checks and inspect in a browser**

Run: `npm test`

Expected: all tests PASS.

Run: `npm run build`

Expected: production build succeeds without warnings that affect functionality.

Run: `npm run dev -- --host 127.0.0.1` and inspect at 390px, 768px, and 1440px widths. Verify no horizontal overflow, clipped headings, overlapping cards, illegible text, broken menu state, or inaccessible focus outline. Verify keyboard order from navigation through contact and confirm reduced-motion emulation disables smooth movement.

- [ ] **Step 7: Commit the visual system**

```bash
git add src
git commit -m "feat: add responsive pink portfolio design"
```

---

### Task 4: Résumé Asset, Deployment, Documentation, and Final Verification

**Files:**
- Create: `public/Yong-Thu-La-Wong-Resume.pdf`
- Create: `vercel.json`
- Create: `README.md`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: `profile.resume === '/Yong-Thu-La-Wong-Resume.pdf'`.
- Produces: a static Vercel deployment using `npm run build` and `dist`.

- [ ] **Step 1: Copy and verify the downloadable résumé**

Create `public/` and copy `/Users/yongthulawong/Downloads/YONGTHULAWONG_RESUME2026 (2).pdf` to `public/Yong-Thu-La-Wong-Resume.pdf`. Compare byte sizes or checksums to confirm an exact copy.

Run: `test -s public/Yong-Thu-La-Wong-Resume.pdf`

Expected: exit code 0.

- [ ] **Step 2: Add deployment configuration and ignore rules**

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

Create `.gitignore` containing:

```gitignore
node_modules
dist
.DS_Store
.vercel
```

- [ ] **Step 3: Write the README**

Create `README.md` with prerequisites, `npm install`, `npm run dev`, `npm test`, and `npm run build`. Add these Vercel steps: push the repository to GitHub, choose **Add New Project** in Vercel, import the repository, keep the detected Vite defaults, and select **Deploy**. State that later pushes to the selected production branch redeploy automatically.

- [ ] **Step 4: Run the complete verification suite**

Run: `npm test`

Expected: all tests PASS with zero failures.

Run: `npm run build`

Expected: `dist/index.html` and `dist/Yong-Thu-La-Wong-Resume.pdf` exist.

Run: `test -s dist/Yong-Thu-La-Wong-Resume.pdf`

Expected: exit code 0.

- [ ] **Step 5: Perform final visual and content QA**

Serve the production build with `npm run preview -- --host 127.0.0.1`. Recheck 390px and 1440px layouts, mobile navigation, keyboard focus, all in-page links, email link, external profile links, and résumé download. Compare names, dates, roles, organizations, technologies, email, GitHub, and LinkedIn against the source résumé.

- [ ] **Step 6: Commit the deployable baseline**

```bash
git add public/Yong-Thu-La-Wong-Resume.pdf vercel.json README.md .gitignore
git commit -m "docs: add resume and Vercel deployment guide"
```

- [ ] **Step 7: Confirm a clean repository state**

Run: `git status --short`

Expected: no output.

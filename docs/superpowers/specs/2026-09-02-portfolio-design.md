# Yong Thu La Wong Portfolio - Design Specification

## Goal

Create an initial personal portfolio website based on Yong's cream-and-pink mockup. The site should present résumé content clearly, feel playful and personal, work well on phones and desktops, and deploy to Vercel's free tier without requiring a backend or paid service.

## Audience and Success Criteria

The primary audience is recruiters, hiring managers, and collaborators reviewing Yong's software engineering and machine learning work. The first release succeeds when visitors can quickly understand who Yong is, scan experience and projects, view technical skills, download the résumé, and reach Yong through professional contact links.

## Technical Approach

Build a single-page static site with Vite and React. Content will live in local data structures and components, with no database, authentication, CMS, or server-side API. Vercel will build the site with the standard Vite build command and serve the generated static files.

The project will use a small component structure rather than a large UI framework:

- `App`: page composition and section order
- `Navigation`: section links and mobile menu behavior
- `Hero`: introduction and primary call to action
- `About`: concise biography derived from the résumé
- `Experience`: professional and research experience cards
- `Projects`: selected project cards with technology tags and available links
- `Skills`: grouped technical skills
- `Contact`: email, LinkedIn, GitHub, and résumé download
- Shared decorative and layout styles in CSS

## Visual Direction

The design will closely follow the supplied mockup as the initial baseline:

- Warm cream page background
- Bubblegum and dusty pink accents
- Taupe secondary controls and text accents
- Playful display lettering for major headings paired with a legible body font
- Rounded cards with subtle borders and shadows
- Halftone, flower, sparkle, and soft-blob decorative motifs recreated with lightweight CSS or local vector assets
- Spacious desktop layouts that collapse into a clear single-column mobile flow

Decorative placeholders will stand in for personal photography until Yong supplies final images. They will be visually intentional and will not present fake biographical imagery.

## Page Structure and Content

### Navigation

A compact sticky navigation will link to Work, About, Experience, and Contact. The active or hovered link will receive a pink accent. On small screens, navigation will collapse to a simple accessible menu.

### Hero

The opening screen will feature “Yong's Portfolio,” a short software-engineering introduction, a “Start Here” button linking to About, and decorative elements based on the mockup. Professional links will remain visible without overpowering the central title.

### About

The About section will summarize Yong as a Cal Poly Pomona computer science student with an artificial intelligence minor, interested in software engineering and machine learning. A styled photo-placeholder collage will reserve space for future personal images.

### Experience

Cards will present:

- California State University, Chancellor's Office - Software Engineering Intern
- Cadence Design Systems / Break Through Tech AI Studio - ML Engineer Intern
- Deep-Hipo Research - Research Assistant

Each card will show role, organization, dates, location or program affiliation, and a concise résumé-based summary. Longer résumé bullets will be edited for web readability without changing their meaning.

### Projects

Featured project cards will cover Eye Tracking Analysis, Project Sloka, and BrainHive. Each card will include a short impact-focused description and relevant technology tags. Links will only be active when the supplied résumé or repository data provides a valid target; otherwise the interface will avoid dead buttons.

### Skills

Skills will be grouped into Languages, Frontend, Backend, Cloud and DevOps, and Machine Learning. The design will use compact tags or grouped lists to keep the section scannable.

### Contact

The final section will invite visitors to connect and provide Yong's email, LinkedIn, GitHub, and a downloadable copy of the supplied résumé. The site will not expose a contact form because that would add unnecessary infrastructure and spam handling.

## Interaction and Accessibility

- Smooth in-page navigation with reduced-motion support
- Visible keyboard focus styles
- Semantic landmarks and heading order
- Sufficient contrast despite the pastel palette
- Buttons and links sized for touch use
- Decorative visuals hidden from assistive technology
- Responsive behavior tested at common mobile, tablet, and desktop widths

## Error and Edge-Case Handling

The site has no runtime data dependency, so content remains available without network requests. Missing optional project links or photos will render as intentional static content rather than broken elements. The résumé download will use a bundled local PDF so it remains available after deployment.

## Verification

Verification will include:

- Automated component or content checks for essential headings, links, and sections
- Production build validation
- Browser review of desktop and mobile layouts
- Keyboard navigation and reduced-motion checks
- Link and résumé-download validation

## Deployment

The repository will include clear README instructions for local development and free Vercel deployment. Vercel should detect the Vite project automatically; the documented output directory will be `dist`.

## Out of Scope for the Baseline

- Backend services or database
- CMS or admin dashboard
- Contact form processing
- Analytics
- Blog
- Custom domain purchase
- Chat widget
- Final personal photography

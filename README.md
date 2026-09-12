# Diwakar Kaushik — Portfolio

Single-page portfolio built with React, TypeScript, Vite, Tailwind CSS v4, Motion and Lucide.

```bash
npm install
npm run dev       # local dev server
npm run build     # typecheck + production build into dist/
npm run preview   # serve the production build
```

## Editing content

All content lives in `src/data/` and was taken from the CV. Components never hard-code facts.

| File | What it holds |
| --- | --- |
| `profile.ts` | Name, email, GitHub, LinkedIn, resume path |
| `experience.ts` | Futurense internship |
| `projects.ts` | Project copy, stack, GitHub links, image paths |
| `skills.ts` | Skill groups and where each skill is used |
| `timeline.ts` | Dated milestones for "The path so far" |
| `education.ts` | Degree and schooling |
| `credentials.ts` | Achievements and certificates |
| `work.ts` | Registry that links skills to internship/projects |

## Things to add

### 1. Resume PDF (required)
Every Resume button links to `/resume/Diwakar_Kaushik_CV.pdf`. Put the file at:

```
public/resume/Diwakar_Kaushik_CV.pdf
```

The build prints a warning until it exists.

### 2. Project images (optional)
Each case study has three image slots that render as styled placeholders until you add files:

```
public/images/projects/
  pipeone/             cover.webp · architecture.webp · walkthrough.webp
  memory-visualizer/   cover.webp · architecture.webp · walkthrough.webp
  learning-analytics/  cover.webp · architecture.webp · walkthrough.webp
  network-dashboard/   cover.webp · architecture.webp · walkthrough.webp
```

Then reference them in `src/data/projects.ts`:

```ts
images: {
  cover: "/images/projects/pipeone/cover.webp",
  architecture: "/images/projects/pipeone/architecture.webp",
},
```

Recommended: WebP, 1600×900 for covers and 1200×900 for the other two.

### 3. Live demos (optional)
Add `demo: "https://…"` to a project's `links` and a "Live demo" button appears.

### 4. Social preview URL
`index.html` uses relative `og:image` paths. Once the site has a domain, change them to absolute URLs
(e.g. `https://your-domain/og.png`) so link previews work everywhere.
The preview image itself is generated from `scripts/og.html`.

## Structure

```
src/
  components/
    layout/       Navbar, MobileMenu, Footer
    hero/         Hero, StackDag (interactive tool graph)
    about/        About, Trajectory (dated milestones)
    experience/   ExperienceTimeline
    projects/     Projects, ProjectCard, ProjectDetail (lazy), MotifFrame, motifs/
    skills/       Skills, SkillGroup, UsagePanel
    education/    Education
    credentials/  Credentials, CertificationCard
    contact/      ContactSection
    ui/           SectionHeading, Reveal, TextReveal, LinkButton, Tag, ImageSlot, icons
  data/           all content
  hooks/          useActiveSection, useDialog
  lib/            motion presets, cx
```

## Notes

- Motion respects `prefers-reduced-motion` globally via `<MotionConfig reducedMotion="user">`;
  SVG packet animations and the live packet log are skipped entirely in that mode.
- Case studies are deep-linkable: `/#case-pipeone`, `/#case-memory-visualizer`, and so on.
- Project visuals are labelled "illustrative" (or "interactive" for the memory demo) because
  they are not real project output. Replace or supplement them with real screenshots via the image slots.

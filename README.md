# CareLegal

A frontend web application built with Next.js + TypeScript and Tailwind CSS. This repository contains a Next 14 app scaffold with shadcn and accertinity-style component configuration and Tailwind customizations. (Note: package.json currently lists the project name as `musicnextjs` — consider updating to `carelegal`.)



--> Table of contents

- Project overview
- Tech stack
- Quickstart (install & run)
- Available scripts
- Configuration & environment
- Tailwind & styling details
- Project structure
- Notable files
- Dependencies (summary)
- Development notes & gotchas
- Testing
- Deployment
- Contributing
- License & maintainers
- Troubleshooting



--> Project overview

CareLegal is a Next.js application using:
- Next.js 14 (see package.json)
- React 18
- TypeScript
- Tailwind CSS with custom plugins and CSS variables
- shadcn-styled components (components.json present)

This repository contains the front-end source under `src/` and static assets under `public/`.



--> Tech stack

- Next.js ^14.1.0
- React ^18.3.1
- TypeScript ^5
- TailwindCSS ^3.3.0
- PostCSS + Autoprefixer
- ESLint (extends `next/core-web-vitals`)
- shadcn & accertinity UI config (components.json)
- Framer Motion, lucide-react icons, and other UI helpers

Recommended Node version: Node 18+ (use a modern LTS for Next.js 14)



--> Quickstart

1. Clone the repo:
   ```bash
   git clone https://github.com/Cout-dev/CareLegal.git
   cd CareLegal
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   # yarn
   ```

3. Run development server:
   ```bash
   npm run dev
   # opens at http://localhost:3000 by default
   ```

4. Build for production:
   ```bash
   npm run build
   npm run start
   ```



--> Available scripts

From package.json:
- `npm run dev` — start Next.js in development mode
- `npm run build` — build the production app
- `npm run start` — start the built app (production)
- `npm run lint` — run Next.js/ESLint linting



--> Configuration & environment

- Environment files are ignored by `.gitignore` (`.env*.local`), so add your local env variables to `.env.local`.
- No explicit environment variables are present in the repo files fetched; check any private config or serverless secrets needed by APIs or third-party services.
- next.config.mjs allows external image hosts:
  - images.unsplash.com
  - res.cloudinary.com
  If your app uses other image hosts, add them to `images.domains` in `next.config.mjs`.
- Blog admin access:
  - The route `/blog/admin` is hidden from public navigation and protected via HTTP Basic Auth middleware in production.
  - Set `BLOG_ADMIN_PASSWORD` (and optionally `BLOG_ADMIN_USERNAME`, defaults to `owner`) in the hosting platform before deploying.
  - Locally, you can place these in `.env.local`. Without a password, the admin UI will show a configuration warning.



--> Tailwind & styling details

- Tailwind config: `tailwind.config.ts`
  - Custom plugin functions:
    - addVariablesForColors: generate CSS variables for Tailwind colors at :root
    - addSvgPatterns: generate SVG data-uri background utilities (`bg-grid`, `bg-grid-small`, `bg-dot`, etc.)
  - Includes `tailwindcss-animate`
  - Content paths include:
    - `./src/pages/**/*.{js,ts,jsx,tsx,mdx}`
    - `./src/components/**/*.{js,ts,jsx,tsx,mdx}`
    - `./src/app/**/*.{js,ts,jsx,tsx,mdx}`

- PostCSS config: `postcss.config.js` uses `tailwindcss` and `autoprefixer`.
- Global CSS file referenced by components.json: `src/app/globals.css` (verify exists).



--> Project structure (high level)

- public/
  - next.svg
  - vercel.svg
  - courses/ (static assets)
- src/
  - app/        — Next App Router entry points
  - components/ — UI components (shadcn pattern)
  - data/       — sample / static data
  - hooks/      — React hooks
  - lib/        — utility libraries and helpers
  - utils/      — misc helpers
- config & root files:
  - package.json
  - tsconfig.json
  - next.config.mjs
  - tailwind.config.ts
  - postcss.config.js
  - .eslintrc.json
  - components.json (shadcn UI config)

Note: Some directories may be empty placeholders — populate as required.



--> Notable files

- components.json — shadcn UI registry + Tailwind integration and path aliases:
  - aliases:
    - components → `@/components`
    - utils → `@/lib/utils`
    - ui → `@/components/ui`
    - lib → `@/lib`
    - hooks → `@/hooks`
  - Tailwind config path: `tailwind.config.ts`
  - CSS variables: enabled

- tailwind.config.ts — advanced Tailwind plugins & CSS variables
- next.config.mjs — Next.js config (image domains)
- tsconfig.json — TypeScript configuration with path alias `@/*` → `./src/*`
- .eslintrc.json — extends `next/core-web-vitals`
- .gitignore — ignores node_modules, .next, out, build, env files, .vercel, etc.



--> Dependencies (summary from package.json)

Key runtime dependencies:
- next ^14.1.0
- react ^18.3.1
- react-dom ^18.3.1
- framer-motion
- lucide-react
- @tabler/icons-react
- class-variance-authority, clsx
- tailwind-merge, tailwindcss-animate
- mini-svg-data-uri (used in Tailwind plugin)

Dev dependencies:
- types for node/react/react-dom
- typescript
- tailwindcss, postcss, autoprefixer
- eslint, eslint-config-next

Note: full lockfile is present in `package-lock.json`.



--> Development notes & gotchas

- package.json name mismatch: it currently lists the name `musicnextjs`. If this repo is CareLegal, update package.json to reflect repository/project name.
- The `components.json` indicates shadcn UI and uses `rsc: true` and `tsx: true` — check your usage of React Server Components vs client components.
- `tsconfig.json` uses `"moduleResolution": "bundler"` which is suitable for Next 14 + SWC; keep tooling (editors/IDE) compatible.
- Add a LICENSE file if you want to grant reuse rights. None was detected in the repo snapshot.



--> Testing

- No test runner or test scripts were detected in package.json.
- Recommended:
  - Add Jest/Testing Library or Playwright/Cypress for end-to-end tests
  - Add a `test` script in package.json for CI



--> Deployment

- Recommended: Deploy to Vercel (native Next.js support). The repo includes `.vercel` in gitignore (do not check in local Vercel config).
- Ensure any runtime environment variables for production are added via the hosting platform UI (Vercel, Netlify, etc).
- Build command: `npm run build`
- Start (production): `npm run start`



--> Contributing

Suggested minimal CONTRIBUTING.md workflow:
- Create feature branches from `main`
- Write small, focused PRs with description and testing steps
- Run `npm run lint` and ensure TypeScript type checks pass
- Add tests for new behavior

Code style: rely on ESLint + Prettier (Prettier not included — consider adding for consistent formatting)



--> License & maintainers

- License: None detected. Add a LICENSE file (e.g., MIT, Apache-2.0) to make the licensing explicit.
- Maintainer / contact: Cout-dev (GitHub: https://github.com/Cout-dev)



--> Troubleshooting

- Node version issues: use Node 18+ (or the version required by your environment)
- If images fail to load, confirm `next.config.mjs` contains the host of your images in `images.domains`
- Tailwind styles not applied:
  - Verify `src/app/globals.css` imports `@tailwind base; @tailwind components; @tailwind utilities;`
  - Ensure `tailwind.config.ts` content globs include your component and app paths
- Linting problems: run `npm run lint`, and install any missing ESLint plugins required by your IDE



If you'd like, I can:
- produce a ready-to-commit README based on this content (and push it to a branch)
- or expand sections (API reference, component map, developer onboarding checklist)

"# CareLegal" 

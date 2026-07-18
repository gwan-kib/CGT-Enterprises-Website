# CGT Enterprises Website

This repository contains the frontend foundation for the CGT Enterprises website. It provides a configured React and TypeScript development environment, a section-based application structure, quality-checking scripts, and approved brand assets.

The project is currently at the foundation stage. The application entrypoint, page components, content modules, and most stylesheets are scaffolded but empty, so the development server and production build do not render the website interface. The colour and typography foundations are implemented in `src/styles/tokens.css`.

## Repository contents

- React, TypeScript, Vite, and Tailwind CSS dependencies.
- Strict TypeScript configuration for application and build-tool code.
- ESLint rules for TypeScript, React Hooks, and React Fast Refresh.
- PostCSS and Autoprefixer configuration.
- Development, linting, type-checking, production-build, and preview scripts.
- Separate folders for layout components, page sections, reusable UI, content data, styles, and images.
- A semantic colour system for brand, background, surface, text, border, action, focus, success, warning, and error roles.
- Documented contrast pairings for readable text, focus indicators, control boundaries, and feedback states.
- A Manrope typography system with documented source, license, loading strategy, system fallbacks, weights, and role-based type scales.
- CGT logo assets stored in `src/assets/images/`.
- Google Material Symbols established as the interface-icon source.
- Git ignore rules for dependencies, generated builds, caches, logs, local environment files, and local tooling.

## Technology stack

| Technology | Role |
| --- | --- |
| React | Provides the installed component library for the website interface. |
| TypeScript | Applies strict type checking to application and configuration code. |
| Vite | Runs the development server and produces the static build. |
| Tailwind CSS | Provides the configured styling toolchain for the scaffolded CSS structure. |
| PostCSS | Processes the stylesheet pipeline. |
| Autoprefixer | Adds browser prefixes during CSS processing. |
| ESLint | Checks TypeScript and React source for correctness and maintainability issues. |

## Project structure

```text
.
|-- public/                    # Browser-level static files
|-- src/
|   |-- assets/images/        # CGT logo and image assets
|   |-- components/
|   |   |-- layout/           # Layout component scaffolds
|   |   |-- sections/         # Page-section scaffolds
|   |   `-- ui/               # Reusable UI component scaffolds
|   |-- data/                 # Business, navigation, and service data modules
|   |-- styles/
|   |   |-- layout/           # Layout stylesheets
|   |   |-- sections/         # Section stylesheets
|   |   |-- shared.css        # Shared style entry
|   |   `-- tokens.css        # Semantic colour and typography tokens
|   |-- App.tsx               # Application composition entry
|   |-- index.css             # Main stylesheet entry
|   `-- main.tsx              # React application entry
|-- eslint.config.js
|-- package.json
|-- postcss.config.js
|-- tailwind.config.js
|-- tsconfig.app.json
|-- tsconfig.node.json
`-- vite.config.ts
```

## Local development

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`, as required by the installed Vite version.
- npm.

### Installation

```bash
git clone https://github.com/gwan-kib/CGT-Enterprises-Website.git
cd CGT-Enterprises-Website
npm install
```

### Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run lint` | Check the repository with ESLint. |
| `npm run typecheck` | Run the TypeScript project checks without emitting application files. |
| `npm run build` | Type-check the project and create a static build in `dist/`. |
| `npm run preview` | Serve the contents of `dist/` locally. |

No environment variables are required by the current code. Local `.env` files are excluded from version control.

## Verification

The repository currently passes:

```bash
npm run lint
npm run typecheck
npm run build
```

There is no automated test suite in the repository. The current quality gates are ESLint, strict TypeScript checks, and the Vite production build.

## Development contributions

The completed repository work demonstrates:

- Configuring a React, TypeScript, Vite, and Tailwind CSS development environment.
- Enabling strict compiler rules for application and tooling code.
- Adding lint rules for TypeScript and React-specific behaviour.
- Defining npm scripts for a repeatable development and verification workflow.
- Organizing the codebase by layout, page section, reusable UI, content data, and styling responsibility.
- Separating shared styles, design tokens, layout styles, and section styles.
- Establishing a consistent asset strategy for brand imagery and interface symbols.
- Creating semantic colour roles from the supplied CGT palette and verifying their required contrast pairings.
- Defining a fluid Manrope typography scale with explicit weights, line heights, letter spacing, and system fallbacks.
- Documenting the repository so its implementation state and technical decisions are easy to inspect.

## Lessons learned

- Establishing linting, strict typing, and build checks early creates a clear baseline for later work.
- Separating content, components, and styles at the scaffold stage makes ownership easier to understand.
- Keeping generated output, local configuration, and dependencies out of source control protects repository clarity.
- Bright brand colours require deliberate foreground pairings and darker interaction tones to remain readable.
- One webfont with a strong fallback stack provides clear hierarchy without adding an unnecessary second font request.
- Documentation is most useful when every claim can be verified directly against the checkout.

## Asset architecture

- Approved logos and image content are stored in `src/assets/images/`.
- Repository guidance designates Google Material Symbols as the interface-symbol source instead of a local icon package or icon directory.
- Browser-level static files referenced by URL belong in `public/`.

# NYC Immersive Tourism

An immersive, scroll-driven New York City tourism experience built with React. The site combines seamless looping video, animated destination chapters, smooth scrolling, and a responsive must-see guide.

## Features

- Autoplaying, muted, seamless destination videos
- Scroll-driven landmark journey through New York City
- Animated route transitions and destination cards
- Responsive must-see destination grid
- Reduced-motion accessibility support
- Smooth anchor navigation

## Built With

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Vitest

## Local Setup

Requirements: Node.js and npm.

```bash
npm ci
npm run dev -- --port 5174
```

Open [http://localhost:5174](http://localhost:5174).

## Commands

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run preview      # Preview production build
npm test             # Run tests once
npm run test:watch   # Run tests in watch mode
```

## Deploy to Vercel

Import this repository into Vercel with the Vite framework preset. Vercel runs `npm run build` and serves the generated `dist` directory. The included `vercel.json` preserves SPA deep links.

## Project Structure

```text
public/videos/    Looping destination videos
src/components/  Page sections and UI components
src/data/        Destination and journey content
src/motion/      Shared animation and scrolling utilities
tests/           Vitest test suite
```

## Video Assets

Videos are served locally from `public/videos`. Background videos use `autoplay`, `loop`, `muted`, and `playsInline` for reliable browser playback.

## Author

Created by [Leonardo Lopez](https://github.com/J12003LPZ).

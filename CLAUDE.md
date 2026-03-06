# DATA SIGNAL — Project Guide

**Live site:** datasignal.dev
**What it is:** A read-only reference site showing production field signals (tips/gotchas) for data engineering frameworks running on Kubernetes/EKS.

## Stack

| Layer | Tech |
|---|---|
| Framework | Astro 5 + React 18 (islands) |
| Language | TypeScript |
| Font | DM Mono (monospace throughout) |
| Hosting | GitHub Pages via `.github/workflows/deploy.yml` |
| Domain | datasignal.dev (CNAME in `public/`) |

## Project Structure

```
src/
  data/
    tips.ts              ← barrel: imports all frameworks, exports FRAMEWORKS + types
    types.ts             ← Signal, Framework, FrameworkCategory types + CATEGORIES
    frameworks/          ← one file per framework (the content you edit)
      spark.ts
      flink.ts
      trino.ts
      starrocks.ts
      airflow.ts
      kafka.ts
      celeborn.ts
      ray.ts
      clickhouse.ts
      superset.ts
      datahub.ts
      gluten.ts
      datafusion.ts
      sparkrapids.ts
  components/
    App.tsx              ← shell: nav, URL state (?fw=spark&s=0), layout
    Sidebar.tsx          ← left panel, framework list grouped by category
    FrameworkView.tsx    ← right panel, signal cards for selected framework
    SignalCard.tsx       ← individual signal card UI
    Hero.tsx             ← landing screen shown when no framework selected
    ShareSheet.tsx       ← share/copy link functionality
    FrameworkIcon.tsx    ← SVG icons per framework id
    LogoMark.tsx         ← top-left logo SVG
  pages/
    index.astro          ← mounts <App /> as a React island
    about.astro          ← static about page
```

## Data Model

Each framework has a fixed schema in `src/data/types.ts`:

```ts
Framework {
  id: string           // URL-safe slug, e.g. "spark"
  name: string         // Full name, e.g. "Apache Spark"
  short: string        // Short label for sidebar
  category: FrameworkCategory
  color: string        // Hex, used for accent color throughout
  tagline: string      // One-line description
  signals: Signal[]    // The content — 5–13 tips per framework
}

Signal {
  id: number           // 1-indexed within the framework
  tag: string          // Short topic label, e.g. "Storage", "Cost"
  headline: string     // Bold one-liner shown on card
  detail: string       // 2–4 sentence explanation
  metric: string       // Eye-catching stat, e.g. "10–20×"
  metricLabel: string  // Context for the metric
}
```

## Adding a New Framework

1. Create `src/data/frameworks/{id}.ts` — copy any existing file as a template
2. Import and add it to the `FRAMEWORKS` array in `src/data/tips.ts`
3. Add an SVG icon case in `src/components/FrameworkIcon.tsx`
4. If it's a new category, add it to `FrameworkCategory` in `src/data/types.ts` and to `CATEGORIES`

## Adding Signals to an Existing Framework

Edit the relevant file in `src/data/frameworks/`. Each signal needs: `id` (next integer), `tag`, `headline`, `detail`, `metric`, `metricLabel`.

## URL Deep Linking

The app supports deep links: `/?fw=spark&s=2` loads Spark, signal index 2 (0-based). Handled in `App.tsx` via `readURLState` / `writeURLState`.

## Dev & Deploy

```bash
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview built site
```

Deploy is automatic: push to `main` → GitHub Actions builds and pushes to `gh-pages` branch.

## Known Gotchas

- All styling is inline React styles (no CSS files, no Tailwind). Colors are all hardcoded hex.
- `FrameworkIcon.tsx` must have a case for every `framework.id` or the icon renders empty.
- Sidebar order matches the `FRAMEWORKS` array order in `tips.ts`.
- The `CATEGORIES` array in `types.ts` controls the category filter order in the sidebar.

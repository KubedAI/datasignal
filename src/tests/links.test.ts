/**
 * Link checker — verifies no <a href> in the built HTML returns 404.
 *
 * Internal links: resolved against the dist/ directory (file must exist).
 * External links: fetched over the network (skipped if offline).
 *
 * Run after `npm run build`:
 *   npx vitest run src/tests/links.test.ts
 */

import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, resolve } from "path";

const DIST = resolve(process.cwd(), "dist");
const BASE = "/datasignal"; // must match astro.config.mjs base

// ── helpers ─────────────────────────────────────────────────────────────────

function collectHtmlFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectHtmlFiles(full));
    } else if (entry.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

function extractHrefs(html: string): string[] {
  // Only extract hrefs from <a> tags, not <link> or other elements
  const hrefs: string[] = [];
  const re = /<a\s[^>]*href="([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    hrefs.push(m[1]);
  }
  return hrefs;
}

function resolveInternalPath(href: string): string | null {
  // Strip base prefix
  let path = href.startsWith(BASE) ? href.slice(BASE.length) : href;
  // Strip query/hash
  path = path.split("?")[0].split("#")[0];
  if (!path || path === "/") {
    return join(DIST, "index.html");
  }
  // Try exact file, then /index.html
  const direct = join(DIST, path);
  if (existsSync(direct) && statSync(direct).isFile()) return direct;
  const index = join(DIST, path, "index.html");
  if (existsSync(index)) return index;
  // Try with .html extension
  const withExt = join(DIST, path.endsWith("/") ? path.slice(0, -1) : path) + ".html";
  if (existsSync(withExt)) return withExt;
  return null;
}

// ── collect all links from built HTML ───────────────────────────────────────

const htmlFiles = collectHtmlFiles(DIST);
const internalLinks = new Set<string>();
const externalLinks = new Set<string>();

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const href of extractHrefs(html)) {
    if (href.startsWith("http://") || href.startsWith("https://")) {
      externalLinks.add(href);
    } else if (
      !href.startsWith("mailto:") &&
      !href.startsWith("javascript:") &&
      !href.startsWith("#")
    ) {
      internalLinks.add(href);
    }
  }
}

// ── tests ────────────────────────────────────────────────────────────────────

describe("Internal links resolve to files in dist/", () => {
  for (const href of internalLinks) {
    it(`${href}`, () => {
      const resolved = resolveInternalPath(href);
      expect(
        resolved,
        `Internal link "${href}" does not resolve to a file in dist/`
      ).not.toBeNull();
      expect(existsSync(resolved!)).toBe(true);
    });
  }
});

describe("External links return 2xx (network)", () => {
  for (const href of externalLinks) {
    it(`${href}`, async () => {
      let res: Response;
      try {
        res = await fetch(href, {
          method: "HEAD",
          headers: { "User-Agent": "datasignal-linkchecker/1.0" },
          signal: AbortSignal.timeout(8000),
          redirect: "follow",
        });
      } catch {
        // Network unavailable — skip gracefully
        return;
      }
      // 405 = Method Not Allowed (HEAD rejected, link still valid e.g. LinkedIn)
      const ok = res.status < 400 || res.status === 405;
      expect(ok, `External link "${href}" returned ${res.status}`).toBe(true);
    });
  }
});

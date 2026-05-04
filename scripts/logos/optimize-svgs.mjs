#!/usr/bin/env node
/**
 * Optimize SVGs with SVGO (strip metadata, collapse useless groups, etc.).
 * Keeps viewBox (needed for responsive scaling in next/image).
 *
 * Does NOT fix logos that are mostly an embedded <image href="data:..."> inside a
 * huge canvas — those need re-export from design tools or Inkscape:
 *   inkscape in.svg --export-type=svg --export-filename=out.svg --verb=FitCanvasToDrawing
 *
 * Default: writes to public/logos/_processed/svg/
 *
 * Usage:
 *   node scripts/logos/optimize-svgs.mjs
 *   node scripts/logos/optimize-svgs.mjs --in-place --yes
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { optimize } from "svgo";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "../..");

const SKIP_DIRS = new Set(["_processed", "_backup", "node_modules"]);

/** SVGO v4: viewBox is not removed by preset-default; keep config minimal. */
const SVGO_CONFIG = {
  multipass: true,
  floatPrecision: 2,
  plugins: ["preset-default"],
};

function parseArgs(argv) {
  let inputDir = path.join(REPO_ROOT, "public/logos");
  let outDir = path.join(REPO_ROOT, "public/logos/_processed/svg");
  let inPlace = false;
  let yes = false;

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--input" && argv[i + 1]) {
      inputDir = path.resolve(REPO_ROOT, argv[++i]);
    } else if (a === "--out" && argv[i + 1]) {
      outDir = path.resolve(REPO_ROOT, argv[++i]);
    } else if (a === "--in-place") {
      inPlace = true;
    } else if (a === "--yes") {
      yes = true;
    } else if (a === "--help" || a === "-h") {
      console.log(`Usage: node scripts/logos/optimize-svgs.mjs [options]

Options:
  --input <dir>   Folder of .svg files (default: public/logos)
  --out <dir>     Output when not --in-place (default: public/logos/_processed/svg)
  --in-place      Overwrite .svg in --input (requires --yes)
  --yes           Confirm --in-place
`);
      process.exit(0);
    }
  }

  return { inputDir, outDir, inPlace, yes };
}

async function listSvgFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const ent of entries) {
    if (!ent.isFile()) continue;
    if (path.extname(ent.name).toLowerCase() !== ".svg") continue;
    files.push(path.join(dir, ent.name));
  }
  return files.sort();
}

/** Logos that wrap a bitmap need manual crop / re-export for even sizing. */
function hasEmbeddedBitmap(svg) {
  return /\bhref\s*=\s*["']data:image\/(png|jpeg|jpg|webp)/i.test(svg);
}

async function main() {
  const { inputDir, outDir, inPlace, yes } = parseArgs(process.argv);

  if (inPlace && !yes) {
    console.error("Refusing --in-place without --yes.");
    process.exit(1);
  }

  if (!inPlace) {
    await fs.mkdir(outDir, { recursive: true });
  }

  const files = await listSvgFiles(inputDir);
  if (!files.length) {
    console.log(`No .svg files in ${inputDir}`);
    return;
  }

  console.log(`optimize-svgs: input=${inputDir} inPlace=${inPlace}\n`);

  const embeddedWarnings = [];

  for (const abs of files) {
    const base = path.basename(abs);
    const input = await fs.readFile(abs, "utf8");
    if (hasEmbeddedBitmap(input)) {
      embeddedWarnings.push(base);
    }

    const result = optimize(input, { ...SVGO_CONFIG, path: abs });
    const out = result.data;
    const dest = inPlace ? abs : path.join(outDir, base);

    const before = Buffer.byteLength(input, "utf8");
    const after = Buffer.byteLength(out, "utf8");
    await fs.writeFile(dest, out, "utf8");
    const pct = before ? Math.round((1 - after / before) * 100) : 0;
    console.log(`  ${base}  ${before} → ${after} bytes (${pct}% smaller) → ${inPlace ? "in-place" : path.relative(REPO_ROOT, dest)}`);
  }

  if (embeddedWarnings.length) {
    console.log(`\nNote: these files embed raster data; SVGO cannot crop the visible mark to the viewBox. Re-export or use Inkscape FitCanvasToDrawing:\n  ${embeddedWarnings.join("\n  ")}`);
  }

  if (!inPlace) {
    console.log(`\nReview ${path.relative(REPO_ROOT, outDir)}, then copy over public/logos/ if satisfied.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

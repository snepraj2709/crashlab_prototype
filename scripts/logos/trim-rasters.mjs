#!/usr/bin/env node
/**
 * Trim uniform borders from raster logos (JPEG / PNG / WebP) using sharp().
 * Helps with white boxes and excess padding; does not remove non-uniform backgrounds.
 *
 * Default: writes to public/logos/_processed/rasters/ (safe — originals untouched).
 *
 * Usage:
 *   node scripts/logos/trim-rasters.mjs
 *   node scripts/logos/trim-rasters.mjs --input public/logos --threshold 12
 *   node scripts/logos/trim-rasters.mjs --in-place --yes   # overwrites sources
 *
 * @see https://sharp.pixelplumbing.com/api-resize#trim
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "../..");

const RASTER_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const SKIP_DIRS = new Set(["_processed", "_backup", "node_modules"]);

function parseArgs(argv) {
  let inputDir = path.join(REPO_ROOT, "public/logos");
  let outDir = path.join(REPO_ROOT, "public/logos/_processed/rasters");
  let threshold = 12;
  let inPlace = false;
  let yes = false;

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--input" && argv[i + 1]) {
      inputDir = path.resolve(REPO_ROOT, argv[++i]);
    } else if (a === "--out" && argv[i + 1]) {
      outDir = path.resolve(REPO_ROOT, argv[++i]);
    } else if (a === "--threshold" && argv[i + 1]) {
      threshold = Number(argv[++i]);
    } else if (a === "--in-place") {
      inPlace = true;
    } else if (a === "--yes") {
      yes = true;
    } else if (a === "--help" || a === "-h") {
      console.log(`Usage: node scripts/logos/trim-rasters.mjs [options]

Options:
  --input <dir>     Source folder (default: public/logos)
  --out <dir>       Output folder when not --in-place (default: public/logos/_processed/rasters)
  --threshold <n>   Trim sensitivity 0–255 (default: 12)
  --in-place        Overwrite files in --input (requires --yes)
  --yes             Confirm destructive --in-place
`);
      process.exit(0);
    }
  }

  return { inputDir, outDir, threshold, inPlace, yes };
}

async function listRasterFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const ent of entries) {
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(ent.name)) continue;
      continue;
    }
    const ext = path.extname(ent.name).toLowerCase();
    if (RASTER_EXT.has(ext)) files.push(path.join(dir, ent.name));
  }
  return files.sort();
}

async function main() {
  const { inputDir, outDir, threshold, inPlace, yes } = parseArgs(process.argv);

  if (inPlace && !yes) {
    console.error("Refusing --in-place without --yes (prevents accidental overwrites).");
    process.exit(1);
  }

  if (!inPlace) {
    await fs.mkdir(outDir, { recursive: true });
  }

  const files = await listRasterFiles(inputDir);
  if (!files.length) {
    console.log(`No raster files (${[...RASTER_EXT].join(", ")}) in ${inputDir}`);
    return;
  }

  console.log(`trim-rasters: input=${inputDir} threshold=${threshold} inPlace=${inPlace}\n`);

  for (const abs of files) {
    const base = path.basename(abs);
    let metaBefore;
    try {
      metaBefore = await sharp(abs).metadata();
    } catch (e) {
      console.warn(`Skip (read error): ${base}`, e.message);
      continue;
    }

    let pipeline = sharp(abs).trim({ threshold });
    const ext = path.extname(base).toLowerCase();
    if (ext === ".jpg" || ext === ".jpeg") {
      pipeline = pipeline.jpeg({ quality: 92, mozjpeg: true });
    } else if (ext === ".png") {
      pipeline = pipeline.png({ compressionLevel: 9 });
    } else if (ext === ".webp") {
      pipeline = pipeline.webp({ quality: 92 });
    }

    const buffer = await pipeline.toBuffer();
    const metaAfter = await sharp(buffer).metadata();

    const w0 = metaBefore.width ?? 0;
    const h0 = metaBefore.height ?? 0;
    const w1 = metaAfter.width ?? 0;
    const h1 = metaAfter.height ?? 0;

    const dest = inPlace ? abs : path.join(outDir, base);

    if (w1 === w0 && h1 === h0) {
      console.log(`  (unchanged) ${base}  ${w0}×${h0}`);
      if (!inPlace) await fs.writeFile(dest, await fs.readFile(abs));
      continue;
    }

    await fs.writeFile(dest, buffer);
    console.log(`  trimmed     ${base}  ${w0}×${h0} → ${w1}×${h1}  → ${inPlace ? "in-place" : path.relative(REPO_ROOT, dest)}`);
  }

  if (!inPlace) {
    console.log(`\nReview outputs under ${path.relative(REPO_ROOT, outDir)}, then replace originals if satisfied.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

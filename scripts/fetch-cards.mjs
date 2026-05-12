/**
 * Downloads the 22 Rider-Waite-Smith Major Arcana card images from
 * Wikimedia Commons into /public/cards/, and writes SOURCES.md.
 *
 * Run once: `npm run fetch:cards`
 *
 * Implementation note: uses `curl --ssl-no-revoke` via child_process because
 * Node.js fetch on Windows + corporate environments fails CRL checks
 * (schannel error CRYPT_E_NO_REVOCATION_CHECK). Curl bypasses CRL when asked.
 *
 * Lessons enforced:
 *   - L02: SOURCES.md is auto-generated alongside images (never manual).
 *   - L04: Output filename pattern is locked: {2-digit ID}_{lower_name}.jpg
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync, statSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '..', 'public', 'cards');

// Major Arcana — 22 cards (id 0..21)
const MAJOR = [
  { id: 0,  local: '00_fool.jpg',             wiki: 'RWS_Tarot_00_Fool.jpg' },
  { id: 1,  local: '01_magician.jpg',         wiki: 'RWS_Tarot_01_Magician.jpg' },
  { id: 2,  local: '02_high_priestess.jpg',   wiki: 'RWS_Tarot_02_High_Priestess.jpg' },
  { id: 3,  local: '03_empress.jpg',          wiki: 'RWS_Tarot_03_Empress.jpg' },
  { id: 4,  local: '04_emperor.jpg',          wiki: 'RWS_Tarot_04_Emperor.jpg' },
  { id: 5,  local: '05_hierophant.jpg',       wiki: 'RWS_Tarot_05_Hierophant.jpg' },
  { id: 6,  local: '06_lovers.jpg',           wiki: 'RWS_Tarot_06_Lovers.jpg' },
  { id: 7,  local: '07_chariot.jpg',          wiki: 'RWS_Tarot_07_Chariot.jpg' },
  { id: 8,  local: '08_strength.jpg',         wiki: 'RWS_Tarot_08_Strength.jpg' },
  { id: 9,  local: '09_hermit.jpg',           wiki: 'RWS_Tarot_09_Hermit.jpg' },
  { id: 10, local: '10_wheel_of_fortune.jpg', wiki: 'RWS_Tarot_10_Wheel_of_Fortune.jpg' },
  { id: 11, local: '11_justice.jpg',          wiki: 'RWS_Tarot_11_Justice.jpg' },
  { id: 12, local: '12_hanged_man.jpg',       wiki: 'RWS_Tarot_12_Hanged_Man.jpg' },
  { id: 13, local: '13_death.jpg',            wiki: 'RWS_Tarot_13_Death.jpg' },
  { id: 14, local: '14_temperance.jpg',       wiki: 'RWS_Tarot_14_Temperance.jpg' },
  { id: 15, local: '15_devil.jpg',            wiki: 'RWS_Tarot_15_Devil.jpg' },
  { id: 16, local: '16_tower.jpg',            wiki: 'RWS_Tarot_16_Tower.jpg' },
  { id: 17, local: '17_star.jpg',             wiki: 'RWS_Tarot_17_Star.jpg' },
  { id: 18, local: '18_moon.jpg',             wiki: 'RWS_Tarot_18_Moon.jpg' },
  { id: 19, local: '19_sun.jpg',              wiki: 'RWS_Tarot_19_Sun.jpg' },
  { id: 20, local: '20_judgement.jpg',        wiki: 'RWS_Tarot_20_Judgement.jpg' },
  { id: 21, local: '21_world.jpg',            wiki: 'RWS_Tarot_21_World.jpg' },
];

// Minor Arcana — 56 cards. Wikimedia uses {Suit}{NN}.jpg naming where
// 11=Page, 12=Knight, 13=Queen, 14=King.
// Local convention: {suit}_{NN}.jpg with suit in {wands, cups, swords, pentacles}.
// Wikimedia "Pents" abbreviation maps to local "pentacles".
const SUITS = [
  { local: 'wands',     wiki: 'Wands' },
  { local: 'cups',      wiki: 'Cups' },
  { local: 'swords',    wiki: 'Swords' },
  { local: 'pentacles', wiki: 'Pents' },
];

const MINOR = [];
let nextId = 22;
for (const suit of SUITS) {
  for (let rank = 1; rank <= 14; rank++) {
    const nn = rank.toString().padStart(2, '0');
    MINOR.push({
      id: nextId++,
      local: `${suit.local}_${nn}.jpg`,
      wiki: `${suit.wiki}${nn}.jpg`,
    });
  }
}

const CARDS = [...MAJOR, ...MINOR];

// Browser-like User-Agent: some Wikimedia caches reject UA strings containing
// "curl" or other tool names. Per Wikimedia's policy, identify the script + contact.
const USER_AGENT =
  'Mozilla/5.0 PathfinderApp/0.1 (Personal decision-aid tarot app; local-dev)';

function localFilename(card) {
  return card.local;
}

function commonsPageUrl(card) {
  return `https://commons.wikimedia.org/wiki/File:${card.wiki}`;
}

function fileUrl(card) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${card.wiki}`;
}

function isJpeg(path) {
  try {
    const head = readFileSync(path, { encoding: null }).subarray(0, 3);
    // JPEG magic: FF D8 FF
    return head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff;
  } catch {
    return false;
  }
}

function downloadOne(card, attempt = 1) {
  const target = resolve(OUT_DIR, localFilename(card));
  if (existsSync(target) && isJpeg(target) && statSync(target).size > 50_000) {
    console.log(`  · skip (exists) ${localFilename(card)}`);
    return true;
  }
  const url = fileUrl(card);
  const res = spawnSync(
    'curl',
    [
      '--ssl-no-revoke',
      '-sSL',
      '-A', USER_AGENT,
      '-o', target,
      '--max-time', '60',
      url,
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );
  if (res.status !== 0) {
    if (attempt < 5) {
      console.warn(`  ⚠ ${localFilename(card)}: curl exit=${res.status}, retry ${attempt + 1}/5 in 2s`);
      spawnSync(process.platform === 'win32' ? 'cmd' : 'sh', process.platform === 'win32' ? ['/c', 'timeout', '2', '>nul'] : ['-c', 'sleep 2']);
      return downloadOne(card, attempt + 1);
    }
    console.error(`  ✗ ${localFilename(card)}: curl exit=${res.status} ${res.stderr?.toString() ?? ''}`);
    return false;
  }
  if (!existsSync(target) || !isJpeg(target) || statSync(target).size < 50_000) {
    if (attempt < 3) {
      console.warn(`  ⚠ ${localFilename(card)}: not a JPEG or too small, retry ${attempt + 1}/3`);
      return downloadOne(card, attempt + 1);
    }
    console.error(`  ✗ ${localFilename(card)}: not a valid JPEG after retries`);
    return false;
  }
  const size = statSync(target).size;
  console.log(`  ✓ ${localFilename(card)} (${(size / 1024).toFixed(0)} KB)`);
  return true;
}

function buildSourcesMarkdown() {
  const lines = [];
  lines.push('# Card Image Sources');
  lines.push('');
  lines.push(`All ${CARDS.length} card images below (Major + Minor Arcana) are from the **Rider-Waite-Smith** tarot deck (1909),`);
  lines.push('originally illustrated by **Pamela Colman Smith** (1878–1951) and published by William Rider & Son.');
  lines.push('');
  lines.push('## License');
  lines.push('');
  lines.push('- **United States**: Public Domain. Published in 1909, well before the 1929 cutoff.');
  lines.push('- **Worldwide**: Public Domain in jurisdictions where copyright term is life of author + 70 years');
  lines.push('  (Pamela Colman Smith died 1951 → entered public domain on 2022-01-01).');
  lines.push('- All images sourced via Wikimedia Commons.');
  lines.push('');
  lines.push('## Attribution');
  lines.push('');
  lines.push('Although the images are public domain, attribution to **Pamela Colman Smith** is preserved as a courtesy.');
  lines.push('');
  lines.push('## Image Index');
  lines.push('');
  lines.push('| ID | Local file | Wikimedia source |');
  lines.push('|----|-----------|------------------|');
  for (const c of CARDS) {
    const idStr = c.id.toString().padStart(2, '0');
    lines.push(`| ${idStr} | \`${localFilename(c)}\` | [${c.wiki}](${commonsPageUrl(c)}) |`);
  }
  lines.push('');
  lines.push('_Auto-generated by `scripts/fetch-cards.mjs`. Do not edit by hand._');
  lines.push('');
  return lines.join('\n');
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Downloading ${CARDS.length} Major Arcana cards into ${OUT_DIR}`);
  let failed = 0;
  for (const card of CARDS) {
    const ok = downloadOne(card);
    if (!ok) failed++;
  }
  if (failed > 0) {
    console.error(`\n${failed} downloads failed. SOURCES.md not regenerated.`);
    process.exit(1);
  }
  const sourcesPath = resolve(OUT_DIR, 'SOURCES.md');
  await writeFile(sourcesPath, buildSourcesMarkdown());
  console.log(`\n✓ SOURCES.md written (${CARDS.length} entries)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

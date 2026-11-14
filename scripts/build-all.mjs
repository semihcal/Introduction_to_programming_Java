// Builds every deck, or one selected deck, as a static site, plus a home page
// with one card per deck.
import { execSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const lectures = join(root, 'lectures')
const output = join(root, 'dist')
const basePath = (process.env.BASE_PATH || '').replace(/^\/+|\/+$/g, '')
const prefix = basePath ? `/${basePath}` : ''
const selectedDeck = process.env.DECK?.trim()
const decks = []

rmSync(output, { recursive: true, force: true })

// Folders whose name starts with "_" are drafts and are not published.
const names = selectedDeck
  ? [selectedDeck]
  : readdirSync(lectures).filter(name => !name.startsWith('_')).sort()
for (const name of names) {
  const entry = join(lectures, name, 'slides.md')
  if (!existsSync(entry)) {
    if (selectedDeck)
      throw new Error(`Deck not found: ${selectedDeck}`)
    continue
  }
  decks.push(readDeck(name, readFileSync(entry, 'utf8')))
  console.log(`\n=== ${name} ===`)
  const deckOutput = selectedDeck ? output : join(output, name)
  const deckBase = selectedDeck ? `${prefix}/` : `${prefix}/${name}/`
  execSync(
    `npx slidev build "${entry}" --base "${deckBase}" --out "${deckOutput}"`,
    { cwd: root, stdio: 'inherit' },
  )
}

mkdirSync(output, { recursive: true })
if (!selectedDeck)
  writeHomePage()
writeFileSync(join(output, '.nojekyll'), '')

// What the home page shows for one deck, taken from its slides.md:
// - title: "COMP 1600 – Week 13, Lecture 2 – Topic" gives the label and topic
// - info:  the 2 to 3 sentence summary
// - picture: lectures/<deck>/public/cover.png, .jpg or .webp if present,
//   otherwise the drawing on the deck's cover slide
function readDeck(name, text) {
  const head = text.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
  const title = head.match(/^title:\s*(.+)$/m)?.[1].trim() || name
  const parts = title.split(/\s+[–-]\s+/)
  const label = parts.length >= 3 ? parts[1] : name
  const topic = parts.length >= 3 ? parts.slice(2).join(' – ') : title
  const infoBlock = head.match(/^info:\s*\|\n((?:[ \t]+.*(?:\n|$))+)/m)?.[1]
  const info = infoBlock
    ? infoBlock.split('\n').map(l => l.trim()).filter(Boolean).join(' ')
    : (head.match(/^info:\s*(.+)$/m)?.[1].trim() ?? '')
  const photo = ['png', 'jpg', 'jpeg', 'webp']
    .map(ext => `cover.${ext}`)
    .find(file => existsSync(join(lectures, name, 'public', file)))
  let art = text.match(/<div class="cover-art"[^>]*>[\s\S]*?(<svg[\s\S]*?<\/svg>)/)?.[1] ?? ''
  // Each drawing defines its own arrowhead; give it a unique id on this page.
  art = art.replace(/\bcover-arrow\b/g, `cover-arrow-${name}`)
  return { name, title, label, topic, info, photo, art }
}

function escape(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function writeHomePage() {
  // The home page uses the same bundled fonts as the decks, so it works offline.
  const fonts = join(output, 'fonts')
  mkdirSync(fonts, { recursive: true })
  const fontFiles = [
    ['@fontsource/lexend/files/lexend-latin-400-normal.woff2', 'lexend-400.woff2'],
    ['@fontsource/lexend/files/lexend-latin-600-normal.woff2', 'lexend-600.woff2'],
    ['@fontsource/lexend/files/lexend-latin-800-normal.woff2', 'lexend-800.woff2'],
    ['@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2', 'mono-700.woff2'],
  ]
  for (const [from, to] of fontFiles) {
    const source = join(root, 'node_modules', from)
    if (existsSync(source))
      copyFileSync(source, join(fonts, to))
  }

  const cards = decks.map((deck) => {
    const picture = deck.photo
      ? `<img src="./${deck.name}/${deck.photo}" alt="">`
      : deck.art || '<div class="no-art"></div>'
    return `
      <li>
        <a class="card" href="./${deck.name}/">
          <div class="picture" aria-hidden="true">${picture}</div>
          <div class="text">
            <span class="label">${escape(deck.label)}</span>
            <h2>${escape(deck.topic)}</h2>
            <p>${escape(deck.info)}</p>
            <span class="open">Open the slides <span aria-hidden="true">→</span></span>
          </div>
        </a>
      </li>`
  }).join('')

  writeFileSync(join(output, 'index.html'), `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>COMP 1600 · Introduction to Programming</title>
    <link rel="icon" href="data:,">
    <style>
      @font-face { font-family: Lexend; font-weight: 400; src: url(fonts/lexend-400.woff2) format("woff2"); }
      @font-face { font-family: Lexend; font-weight: 600; src: url(fonts/lexend-600.woff2) format("woff2"); }
      @font-face { font-family: Lexend; font-weight: 800; src: url(fonts/lexend-800.woff2) format("woff2"); }
      @font-face { font-family: "JetBrains Mono"; font-weight: 700; src: url(fonts/mono-700.woff2) format("woff2"); }
      :root {
        --accent: #3730a3;
        --accent-soft: #eef2ff;
        --accent-2: #c2410c;
        --ink: #0f172a;
        --muted: #475569;
        --line: #e2e8f0;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Lexend, system-ui, sans-serif;
        color: var(--ink);
        background:
          radial-gradient(circle at 1px 1px, #cbd5e1 1.2px, transparent 0) 0 0 / 26px 26px,
          #f8fafc;
      }
      header {
        max-width: 1160px;
        margin: 0 auto;
        padding: 64px 24px 32px;
      }
      .pill {
        display: inline-block;
        padding: 4px 16px;
        border-radius: 999px;
        background: var(--accent);
        color: #fff;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: .04em;
      }
      h1 {
        margin: 18px 0 10px;
        font-size: clamp(34px, 5vw, 52px);
        line-height: 1.1;
        font-weight: 800;
        letter-spacing: -.02em;
      }
      h1 span { color: var(--accent); }
      header p { margin: 0; font-size: 19px; color: var(--muted); max-width: 640px; line-height: 1.5; }
      main { max-width: 1160px; margin: 0 auto; padding: 8px 24px 72px; }
      ul.grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 24px;
      }
      .card {
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border-radius: 20px;
        border: 1px solid var(--line);
        background: #fff;
        color: inherit;
        text-decoration: none;
        box-shadow: 0 1px 2px rgba(15, 23, 42, .04);
        transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
      }
      .card:hover {
        transform: translateY(-4px);
        border-color: #c7d2fe;
        box-shadow: 0 14px 32px rgba(55, 48, 163, .14);
      }
      .card:focus-visible { outline: 4px solid var(--accent-2); outline-offset: 3px; }
      .picture {
        height: 190px;
        display: grid;
        place-items: center;
        padding: 18px;
        background: linear-gradient(135deg, var(--accent-soft), #fff7ed);
        border-bottom: 1px solid var(--line);
      }
      .picture svg { height: 100%; width: auto; max-width: 100%; }
      .picture img { width: calc(100% + 36px); height: calc(100% + 36px); margin: -18px; object-fit: cover; }
      .cover-art-name { font-family: "JetBrains Mono", monospace; font-size: 22px; font-weight: 700; fill: var(--ink); }
      .cover-art-obj { font-family: Lexend, sans-serif; font-size: 26px; font-weight: 700; fill: var(--ink); }
      .text { display: flex; flex-direction: column; gap: 8px; padding: 20px 22px 22px; flex: 1; }
      .label { font-size: 14px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--accent-2); }
      h2 { margin: 0; font-size: 22px; line-height: 1.25; font-weight: 600; }
      .text p { margin: 0; font-size: 16px; line-height: 1.55; color: var(--muted); flex: 1; }
      .open { margin-top: 6px; font-size: 16px; font-weight: 600; color: var(--accent); }
      .card:hover .open span { margin-left: 4px; }
      footer { text-align: center; color: var(--muted); font-size: 14px; padding: 0 24px 40px; }
      @media (max-width: 520px) {
        header { padding-top: 40px; }
        ul.grid { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <header>
      <span class="pill">COMP 1600</span>
      <h1>Introduction to <span>Programming</span></h1>
      <p>Interactive lecture slides. Choose a lecture to open it, and use the arrow keys to move through the slides.</p>
    </header>
    <main>
      <ul class="grid">${cards}
      </ul>
    </main>
    <footer>Slides prepared from Dr. Barry Wittman's notes.</footer>
  </body>
</html>
`)
}

// Builds every deck, or one selected deck, as a static site.
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
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

const names = selectedDeck ? [selectedDeck] : readdirSync(lectures).sort()
for (const name of names) {
  const entry = join(lectures, name, 'slides.md')
  if (!existsSync(entry)) {
    if (selectedDeck)
      throw new Error(`Deck not found: ${selectedDeck}`)
    continue
  }
  decks.push(name)
  console.log(`\n=== ${name} ===`)
  const deckOutput = selectedDeck ? output : join(output, name)
  const deckBase = selectedDeck ? `${prefix}/` : `${prefix}/${name}/`
  execSync(
    `npx slidev build "${entry}" --base "${deckBase}" --out "${deckOutput}"`,
    { cwd: root, stdio: 'inherit' },
  )
}

mkdirSync(output, { recursive: true })
if (!selectedDeck) {
  const links = decks.map(name => `      <li><a href="./${name}/">${name}</a></li>`).join('\n')
  writeFileSync(join(output, 'index.html'), `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>COMP1600 Slides</title>
    <style>
      body { max-width: 48rem; margin: 4rem auto; padding: 0 1.5rem; font: 18px/1.6 system-ui, sans-serif; color: #172033; }
      h1 { margin-bottom: .25rem; }
      a { color: #3157d5; }
      li { margin: .5rem 0; }
    </style>
  </head>
  <body>
    <h1>COMP1600 Slides</h1>
    <p>Select a lecture:</p>
    <ul>
${links}
    </ul>
  </body>
</html>\n`)
}
writeFileSync(join(output, '.nojekyll'), '')

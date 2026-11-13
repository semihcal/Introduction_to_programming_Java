// Builds every deck in lectures/ into dist/<deck-name>/ as a static site.
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const lectures = join(root, 'lectures')
const output = join(root, 'dist')
const prefix = `/${(process.env.BASE_PATH || '').replace(/^\/+|\/+$/g, '')}`
const decks = []

for (const name of readdirSync(lectures).sort()) {
  const entry = join(lectures, name, 'slides.md')
  if (!existsSync(entry))
    continue
  decks.push(name)
  console.log(`\n=== ${name} ===`)
  execSync(
    `npx slidev build "${entry}" --base "${prefix}/${name}/" --out "${join(output, name)}"`,
    { cwd: root, stdio: 'inherit' },
  )
}

mkdirSync(output, { recursive: true })
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
writeFileSync(join(output, '.nojekyll'), '')

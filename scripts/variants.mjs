// Shoots saved pages in variants that differ in one thing, 390px wide unless the config exports another `width`.
// usage: node variants.mjs <config.mjs> <snap dir> <out dir> [only-id-prefix]
//
// The config is a module, so a change can be a function that runs in the page:
//
//   const ROW36 = 'table.board td { padding: 1px 0 }'
//   const table = { from: 'table.board', lead: 14, height: 640 }
//   export const variants = [
//     // today's page first, unchanged, with the same window as the others
//     { id: 'rows-48', file: 'board.html', clip: table, measure: 'table.board > tbody > tr' },
//     { id: 'rows-36', file: 'board.html', css: ROW36, clip: table, measure: 'table.board > tbody > tr' },
//     { id: 'serif-on', file: 'player.html', css: SERIF, link: 'https://fonts.googleapis.com/css2?family=…', clip: { from: 'p.lead', lead: 2, height: 760 } },
//     { id: 'cols', file: 'team.html', js: () => { /* runs in the page before the css */ }, css: COLS, clip: { y: 0, height: 900 } },
//   ]
//
// css   a stylesheet added after the page's own
// link  a stylesheet by address, for a face the page doesn't load
// js    a function run in the page, for a change CSS can't make (splitting a cell in two)
// clip  { from: selector, lead: px above it, height } or { y, height }: the same for every variant of a pick
// measure  a selector whose height is printed, to check the change did what its name says
// scheme   'dark' or 'light', for a page that follows the system's setting. `export const scheme` sets it for all
//
// A color or a theme is a change like any other: `css: ':root { --control: #3366cc }'` gives a named color a new
// value, and `js: () => { document.documentElement.dataset.theme = 'alt' }` draws the page in another theme,
// since the saved file holds the whole stylesheet.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { launch, openPage, settle } from './browser.mjs'

const [config, snap, out, only = ''] = process.argv.slice(2)
if (!config || !snap || !out) throw new Error('usage: node variants.mjs <config.mjs> <snap dir> <out dir> [only-id-prefix]')
const { variants, width = 390, scheme } = await import(pathToFileURL(path.resolve(config)).href)

fs.mkdirSync(out, { recursive: true })
const browser = await launch()
for (const v of variants) {
  if (!v.id.startsWith(only)) continue
  const page = await openPage(browser, { width, scheme: v.scheme ?? scheme })
  await page.goto(`file://${path.resolve(snap, v.file)}`)
  if (v.link) await page.addStyleTag({ url: v.link })
  if (v.js) await page.evaluate(v.js)
  if (v.css) await page.addStyleTag({ content: v.css })
  await settle(page)
  const clip = v.clip ?? { y: 0, height: 1400 }
  const y = clip.from
    ? await page.evaluate(({ from, lead = 12 }) => Math.max(0, document.querySelector(from).getBoundingClientRect().top + scrollY - lead), clip)
    : (clip.y ?? 0)
  const facts = await page.evaluate(
    (measure) => ({
      measured: measure ? Math.round(document.querySelector(measure)?.getBoundingClientRect().height ?? 0) : undefined,
      sidewaysOverflow: document.documentElement.scrollWidth - innerWidth,
    }),
    v.measure,
  )
  await page.screenshot({ path: path.join(out, `${v.id}.jpg`), type: 'jpeg', quality: 88, clip: { x: 0, y, width, height: clip.height }, fullPage: true })
  console.log(v.id, JSON.stringify(facts))
  await page.close()
}
await browser.close()

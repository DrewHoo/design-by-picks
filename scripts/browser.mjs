// Finds playwright-core and launches the installed Chrome. The scripts here share it.
// playwright-core is looked for in the folder the command runs from, then in PW_ROOT, then beside this file.
// A project that has neither: `npm install --no-save playwright-core` in a scratch folder and run from there.
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const roots = [process.cwd(), process.env.PW_ROOT, path.dirname(fileURLToPath(import.meta.url))].filter(Boolean)

function load() {
  for (const root of roots) {
    const require = createRequire(path.join(root, 'package.json'))
    for (const name of ['playwright-core', 'playwright']) {
      try {
        return require(name)
      } catch {
        // not here: try the next
      }
    }
  }
  throw new Error(`playwright-core not found from ${roots.join(', ')}. Run from a folder that has it, or set PW_ROOT.`)
}

/** the installed Chrome, so nothing is downloaded */
export const launch = () => load().chromium.launch({ channel: 'chrome' })

/** a page 390 wide at 2x, unless told another width */
export const openPage = (browser, { width = 390, height = 844, scheme } = {}) =>
  browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2, colorScheme: scheme })

/** a file path or an address, as an address */
export const address = (target) => (/^https?:|^file:/.test(target) ? target : `file://${path.resolve(target)}`)

/** `--name value` pairs out of the arguments, and what's left */
export function args(argv = process.argv.slice(2)) {
  const flags = {}
  const rest = []
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) flags[argv[i].slice(2)] = argv[i + 1]?.startsWith('--') || argv[i + 1] === undefined ? true : argv[++i]
    else rest.push(argv[i])
  }
  return { flags, rest }
}

/** wait for the page's fonts, then a little longer for a late layout */
export async function settle(page, ms = 900) {
  await page.waitForTimeout(ms)
  await page.evaluate(() => document.fonts.ready.then(() => undefined))
}

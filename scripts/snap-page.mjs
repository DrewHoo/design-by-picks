// Saves a drawn page as one HTML file: its styles and pictures inside it, its scripts gone.
// The file is what variants.mjs restyles and what a blind test's agents are handed, so no variant
// and no agent touches the project's code.
// usage: node snap-page.mjs <address> <out.html> [--width 390] [--wait 1500] [--scheme dark|light] [--run "<js>"]
// --scheme draws a page that follows the system's setting in that scheme.
// --run is JavaScript run in the page before it is saved, for a state the address can't ask for
// (a theme the site reads from storage, a row opened). The saved file has no scripts, so set it here.
import fs from 'node:fs'
import { address, args, launch, openPage, settle } from './browser.mjs'

const { flags, rest } = args()
const [target, out] = rest
if (!target || !out) throw new Error('usage: node snap-page.mjs <address> <out.html> [--width 390] [--wait 1500] [--scheme dark|light] [--run "<js>"]')

const browser = await launch()
const page = await openPage(browser, { width: Number(flags.width ?? 390), scheme: flags.scheme === true ? undefined : flags.scheme })
await page.goto(address(target), { waitUntil: 'load' })
await settle(page, Number(flags.wait ?? 1500))
if (typeof flags.run === 'string') {
  await page.evaluate(flags.run)
  await settle(page, 400)
}

const html = await page.evaluate(async () => {
  const dataUri = async (src) => {
    const blob = await (await fetch(src)).blob()
    return new Promise((done) => {
      const reader = new FileReader()
      reader.onload = () => done(reader.result)
      reader.readAsDataURL(blob)
    })
  }
  // A sheet's own text, fetched: a rule's cssText drops a shorthand that holds a var().
  // Another origin's sheet (a font service) keeps its link.
  const css = []
  for (const sheet of Array.from(document.styleSheets)) {
    if (!sheet.href) css.push(sheet.ownerNode?.textContent ?? '')
    else if (sheet.href.startsWith(location.origin)) css.push(await (await fetch(sheet.href)).text())
  }
  for (const img of Array.from(document.querySelectorAll('img'))) {
    const src = img.currentSrc || img.src
    if (!src || src.startsWith('data:')) continue
    try {
      img.src = await dataUri(src)
      img.removeAttribute('srcset')
      img.removeAttribute('loading')
    } catch {
      // a picture that can't be fetched stays as it was
    }
  }
  const doc = document.documentElement.cloneNode(true)
  for (const node of Array.from(doc.querySelectorAll('script, style, link[rel="modulepreload"], link[rel="preload"], link[rel="stylesheet"]'))) {
    const outside = node.tagName === 'LINK' && node.rel === 'stylesheet' && !node.href.startsWith(location.origin)
    if (!outside) node.remove()
  }
  const head = doc.querySelector('head')
  // what's still relative (a font or a picture named in the CSS, a link) is read from where the page was
  const base = document.createElement('base')
  base.href = location.href
  head.prepend(base)
  const style = document.createElement('style')
  style.id = 'page'
  style.textContent = css.join('\n')
  head.append(style)
  return `<!doctype html>${doc.outerHTML}`
})
fs.writeFileSync(out, html)
const inside = (html.match(/src="data:/g) ?? []).length
console.log(JSON.stringify({ out, kb: Math.round(html.length / 1024), pictures: inside }))
await browser.close()

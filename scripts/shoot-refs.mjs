// Shoots outside pages for the design survey, one screen tall, as the device the project is mostly used on sees them.
// usage: node shoot-refs.mjs <list.json> <out dir> [--device phone|tablet|desktop] [--scheme dark|light]
// The device is the one the project is mostly used on (phone if not given). Without --scheme each site
// is drawn as it draws itself by default.
// list.json: [{ "name": "hn", "url": "https://…" }, { "name": "boxscore", "image": "https://…" },
//             { "name": "wiki", "url": "https://…", "decline": "Reject all" }]
// A consent banner is declined, never accepted: `decline` is the text of its decline button.
// Look at every shot before using it. A bot check, a sign-in sheet or an ad over the page is not the reference.
import fs from 'node:fs'
import path from 'node:path'
import { args, launch } from './browser.mjs'

const { flags, rest } = args()
const [listFile, out] = rest
if (!listFile || !out) throw new Error('usage: node shoot-refs.mjs <list.json> <out dir> [--device phone|tablet|desktop] [--scheme dark|light]')
const list = JSON.parse(fs.readFileSync(listFile, 'utf8'))
fs.mkdirSync(out, { recursive: true })

const browser = await launch()
const DEVICES = {
  phone: {
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  },
  tablet: {
    viewport: { width: 820, height: 1180 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent:
      'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  },
  desktop: { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 },
}
const device = DEVICES[flags.device ?? 'phone']
if (!device) throw new Error('--device is phone, tablet or desktop')
const context = await browser.newContext({ ...device, ...(typeof flags.scheme === 'string' ? { colorScheme: flags.scheme } : {}) })
for (const item of list) {
  const page = await context.newPage()
  try {
    let status = 'image'
    if (item.image) {
      await page.setContent(`<body style="margin:0;background:#111"><img src="${item.image}" style="display:block;width:100%"></body>`, {
        waitUntil: 'load',
        timeout: 45000,
      })
    } else {
      const response = await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 45000 })
      status = response?.status()
      await page.waitForTimeout(5000)
      if (item.decline) {
        const button = page.getByRole('button', { name: item.decline }).first()
        if (await button.isVisible().catch(() => false)) {
          await button.click()
          await page.waitForTimeout(2500)
        }
      }
    }
    await page.screenshot({ path: path.join(out, `${item.name}.jpg`), type: 'jpeg', quality: 85 })
    console.log(item.name, status, (await page.title()).slice(0, 60))
  } catch (error) {
    console.log(item.name, 'failed', String(error).slice(0, 160))
  }
  await page.close()
}
await browser.close()

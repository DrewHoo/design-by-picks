// Shoots one page, 390px wide unless --width says otherwise, and says its height, any sideways overflow and any script error.
// The whole page unless --from names where to start.
// usage: node shoot.mjs <html file or address> <out.png|jpg> [--width 390] [--from <selector>] [--lead 12] [--height 1400] [--scheme dark|light]
import { address, args, launch, openPage, settle } from './browser.mjs'

const { flags, rest } = args()
const [target, out] = rest
if (!target || !out) throw new Error('usage: node shoot.mjs <html file or address> <out.png|jpg> [--width 390] [--from <selector>] [--lead 12] [--height 1400]')
const width = Number(flags.width ?? 390)

const browser = await launch()
const page = await openPage(browser, { width, scheme: flags.scheme })
const errors = []
page.on('pageerror', (error) => errors.push(error.message))
await page.goto(address(target), { waitUntil: 'load' })
await settle(page, 1200)

const jpeg = /\.jpe?g$/.test(out) ? { type: 'jpeg', quality: 88 } : {}
let clip
if (flags.from || flags.height) {
  const y = flags.from
    ? await page.evaluate(({ from, lead }) => Math.max(0, document.querySelector(from).getBoundingClientRect().top + scrollY - lead), { from: flags.from, lead: Number(flags.lead ?? 12) })
    : 0
  const whole = await page.evaluate(() => document.documentElement.scrollHeight)
  clip = { x: 0, y, width, height: Math.min(Number(flags.height ?? 1400), whole - y) }
}
await page.screenshot({ path: out, fullPage: true, ...(clip ? { clip } : {}), ...jpeg })
console.log(
  JSON.stringify({
    height: await page.evaluate(() => document.documentElement.scrollHeight),
    sidewaysOverflow: await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
    errors,
  }),
)
await browser.close()

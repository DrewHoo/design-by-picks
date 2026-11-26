# Single-axis variants of a real page

A pick in stage 4 is two or three shots of one real page that differ in one thing. The cheapest way to make them is to save the drawn page as one file and restyle the copy, so a variant costs a few lines of CSS and the project's code stays as it is until a pick is made. Stage 6's mock-ups and the blind test's input start from the same saved pages.

The scripts are in `scripts/` and need `playwright-core` and an installed Chrome. They look for `playwright-core` in the folder the command runs from, then in `PW_ROOT`. Run them from the project if it has it. Otherwise run `npm install --no-save playwright-core` in a scratch folder and set `PW_ROOT` to that folder.

Every script draws at 390px wide unless told otherwise. That is only a default. Use the width the project is mostly used at: `--width` on the command line, or `export const width` in a variants config.

## 1. Save each page as one file

```bash
node scripts/snap-page.mjs <address> <snap dir>/<name>.html
```

`<address>` is the page on a local dev server or the live site. The script writes the drawn page as one HTML file: the page's own stylesheets as text in one `<style id="page">`, its pictures as data URIs, its scripts removed, and a `<base>` so anything still relative is read from where the page was. A font service's stylesheet keeps its link. `--scheme dark|light` draws a page that follows the system's setting, and `--run "<js>"` runs JavaScript before saving, for a state the address can't ask for.

Save one file for each page kind the picks need.

Then shoot the saved file and the live page and compare them (`scripts/shoot.mjs <file or address> out.png`). The heights should match. If they don't, something the page needs was lost, and every variant made from the file will be wrong in the same way.

The script fetches each stylesheet as text. A stylesheet rebuilt from the browser's parsed rules loses any shorthand that holds a `var()`, and the saved page comes out in the wrong sizes.

## 2. Write each variant as one change

`scripts/variants.mjs` takes a config module. Each variant names a saved file, the one change, and the window to shoot:

```js
const ROW36 = 'table.list td { padding: 1px 0 }'
const NO_RULE = 'table.list td { border-bottom-color: transparent }'
const table = { from: 'table.list', lead: 14, height: 640 }

export const variants = [
  { id: 'rows-48', file: 'list.html', clip: table, measure: 'table.list > tbody > tr' },
  { id: 'rows-36', file: 'list.html', css: ROW36, clip: table, measure: 'table.list > tbody > tr' },
  { id: 'rule-on', file: 'list.html', css: ROW36, clip: table },
  { id: 'rule-off', file: 'list.html', css: ROW36 + NO_RULE, clip: table },
]
```

```bash
node scripts/variants.mjs config.mjs <snap dir> <out dir> [only-id-prefix]
```

A change is a `css` string added after the page's own styles, a `link` to a stylesheet for a face the page doesn't load, or a `js` function run in the page for what CSS can't do (splitting a cell into two spans so each gets a column, or moving every size to the nearest step of a scale). The script header lists every field.

A color or a theme is a change like any other. A named color gets a new value with `css: ':root { --control: #3366cc }'`. A page is drawn in another of the project's themes with `js: () => { document.documentElement.dataset.theme = 'alt' }`, since the saved file holds the whole stylesheet. Shoot a color pick in more than one theme before it goes on a page.

What makes a variant trustworthy:

- **Today's page is the first variant of every pick, with no change at all.** Its shot uses the same window as the others.
- **One change.** If a variant needs a second change to look right, that second change is a pick of its own or a call to list on the page.
- **The same window for every version of a pick.** `clip` starts at the same element with the same lead and height, so flipping moves only what changed.
- **Draw each pick at the values already picked.** In the config above, the line-or-space flip is drawn at 36px rows, on the assumption that 36 was picked. Lines do different work at different row heights, so the same flip drawn at 48 would answer a different question.
- **Check the change did what its name says.** `measure` prints an element's height. If a measured height differs from the variant's label, fix the variant before it goes on a page. The script also prints sideways overflow, which should be 0.
- **Give each version one fact to read.** "17 rows fit in this window" beside "13 rows fit" says what the change buys. Count it off the shot.
- **Two or three versions.** Each added version makes the difference between any two harder to hold in mind.

## 3. After the single picks

- **All together.** One more flip: today, and the chosen values applied at once. Values that each look right alone can clash, and this is where it shows.
- **Look at every shot** before it goes on a page. Check a candidate typeface on the project's real content. A face whose numerals hang below the baseline looks fine in a specimen and wrong in a table of figures.
- **Cutting pieces** for stage 6 is the same tool with a different window: shoot each of two whole pages from one section's heading to the next (`scripts/shoot.mjs page.html piece.jpg --from '#recent' --height 420`).

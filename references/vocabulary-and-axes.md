# Vocabulary, axes and motion numbers

Stage 1 draws its words from the first section, stage 3 takes a position on each axis in the second, and stage 5 covers the decisions in the third. The sources are linked so a claim can be checked. Links were checked in November 2026.

## The words

About thirty terms, in six groups. Stage 1 uses the ones a page shows, each tied to a numbered spot on a shot. Add the project's own domain words where it has them.

- **Attention:** hierarchy, salience, emphasis by de-emphasis, earned attention, recede and advance.
- **Marks** (Bertin): position, size, value (lightness), hue, weight. Position and size read as quantities. Value orders. Hue groups and doesn't order.
- **Arrangement** (Gestalt): proximity, similarity, alignment, rhythm, figure and ground, active and passive whitespace, felt structure (grouping by spacing, not lines).
- **Density** (Ström, Tufte): visual density, data-ink, temporal density (answers per unit of time), value density, typographic color, word-sized graphic.
- **Numbers:** tabular lining figures, significant figures.
- **Interaction:** information against manipulation, context inference, details on demand, information scent, signifier.

Short reading behind them, one sitting each:

- Matt Ström, "UI Density": https://mattstromawn.com/writing/ui-density/
- Matt Ström, "Design better data tables": https://mattstromawn.com/writing/tables/
- Linear, "A calmer interface for a product in motion": https://linear.app/now/behind-the-latest-design-refresh ("Structure should be felt, not seen.")
- Bret Victor, "Magic Ink", the first third: https://worrydream.com/MagicInk/
- Rauno Freiberg, "Invisible Details of Interaction Design": https://rauno.me/craft/interaction-design

## The axes a look takes a position on

For each, stage 3 says where the project sits today and whether that's deliberate or an accident.

Visual density. Temporal density. Contrast range. The number of type sizes. The number of faces. Tabular figures. Color as data or as decoration. Brand colors. Lines or whitespace. Zebra stripes. The amount of chrome. How much is tappable. Loud or quiet signifiers. Everything visible or disclosed on demand. Sentence-led or grid-led. Charts. Tables on a small screen. Voice. How uniform pages are.

Two more checks in stage 3:

- **The stock AI defaults.** What models tend to reach for unprompted, as public design skills describe it: a near-black ground with one bright accent, hairline rules with dense columns, tracked all-caps labels, a monospace face for data labels, a big-number hero. Mark each one the project uses as deliberate or not. A deliberate one goes in the rules in so many words, or a stock design skill may steer away from it.
- **A principle's form.** "X, even over Y", where someone could reasonably argue for Y (Jeremy Keith, https://clearleft.com/thinking/principles-and-priorities). It should be memorable, help say no, and not be a truism (Matt Ström, https://mattstromawn.com/writing/principles).

The speed dating survey is Brad Frost's 20-second gut test: about twenty sites, a 1 to 5 score each, then talk about the top and bottom five and write down the words used (https://bradfrost.com/blog/post/establishing-design-direction/).

## Motion: the decisions and the sources' numbers

The decisions a lab covers: the press, the hover, the focus ring, a menu or popover opening, a panel opening, a value changing, a list reordering, waiting (a fast answer, a half second, a long compute), going to another page, and what a reader who asked for less motion gets. Then the static small things: the line between rows, a section's edge, radii, shadows, truncation, hit areas.

What the sources give, as the starting versions:

- **Durations** (Emil Kowalski): a press 100 to 160 ms, a tooltip or popover 125 to 200, a dropdown 150 to 250, nothing in the reading path over 300. An exit is faster than an enter.
- **Frequency** (Kowalski, Freiberg): something done a hundred times a day gets no animation.
- **Easing:** ease-out for an enter, ease-in-out for something moving across the screen, and no ease-in on anything arriving (Kowalski). A spring can be written with CSS `linear()` (Josh Comeau, https://www.joshwcomeau.com/animation/linear-timing-function/).
- **A press:** an instant color or opacity change, and a small scale-down on a button.
- **Interruptible:** transitions, not keyframes, on anything a reader repeats.
- **Reduced motion** keeps opacity and color and drops movement.
- **Waiting** (NN/g, Vercel): under 100 ms show nothing. To a second, keep the old value on screen. Past that, an indicator that appears after 150 to 300 ms and stays at least 300 to 500.
- **A number that changes** swaps at once in equal-width digits.
- **Lines** (Ström, Butterick): spacing and alignment first, rules light or none, horizontal only in a table.
- **Touch:** 44px targets, hover rules behind `(hover: hover)`.

Browser support for page-to-page transitions and newer CSS changes fast. Check it the day the lab is built and say on the page which browsers show which version.

Where the sources disagree is where the owner's taste decides, and those are good candidates for picks: a skeleton or nothing under a second, a spring or a fixed curve, zebra stripes. The numbers above are starting versions, and an owner may well pick against them.

## Prior art worth borrowing from

Public design skills are mostly written for marketing pages and app chrome, and few have rules for a dense table. Some ban things a project may have chosen on purpose. So read a project's own rules before running one on it. Their structure is worth borrowing:

- Critique ("does it feel right") kept apart from audit ("does it hold up"): impeccable, https://github.com/pbakaus/impeccable
- A motion table of what, how often, how long and which curve, and corrections kept as dated rules: Emil Kowalski's skills, https://github.com/emilkowalski/skills
- A section order for a look file: Google Labs' DESIGN.md, https://github.com/google-labs-code/design.md
- "Anything code can check goes in a linter and judgment goes in a skill": Vercel, https://vercel.com/blog/teaching-agents-product-design-at-vercel

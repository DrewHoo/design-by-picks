# Stage 7: write it in and hold it

Stage 6 ends with rules that won a blind test, example pages, and a build order in the look's spec. Stage 7 makes the project match, and leaves tests so a later change can't quietly undo a pick.

Earlier stages can run entirely on saved copies of pages. This one is the build, so agree its scope with the owner first.

## The order

Build in chunks, each one a thing the owner could review alone:

1. **The named values, and the rules file.** Every size, space, color-by-job, face and timing gets a name where the project keeps its styles. This chunk changes how no page looks, which makes it easy to review and safe to land first. If anything outside the stylesheet uses the same values (a share image drawn in code, a timer in script), one module states them for that code, and a test fails when the two disagree.
2. **Motion.** The lab's table, as named times and curves.
3. **One page kind at a time**, in the order the examples cover them. A kind with an example page is built to the example.
4. **The rest.** Page kinds with no example get only what the rules decide without a pick. A layout question the examples don't answer gets a pick first.
5. **Holding it.** The tests.

## What each chunk ends with

- **Before and after shots** of real pages, at the width the picks were made at and at the project's other main width. Picks made at one width say little about the other, so each chunk says what it did with the room, or the lack of it.
- **Its rules added to the rules file**, in the present tense, each with who decided it and when: the owner for a pick, the agent for a call. Quote the owner where the wording is the rule.
- **Its case in the project's log of decisions**, if the project keeps one.
- **A test for each pick that code can check**, with a comment above it naming who decided and when, and saying the pick in a few words, including what it was picked over ("a menu fades in, over sliding down").

The spec says what was decided and what's left. The rules file says only what the built project does today, so it grows a chunk at a time.

## Tests that hold a look

What a test can check:

- The named values in the stylesheet match the module other code reads.
- The type scale is exactly the picked steps, and a row is the picked height.
- Each motion's time and curve is the lab's.
- A pick about markup: a table has one line and it sits under its heads, or two compared things are two halves of one row.
- A color's job: the highlight color isn't on a control.
- **A count that may only go down.** Pages not yet migrated still write sizes of their own. A test holds that number and fails if it rises, so the old way can't spread while the migration is unfinished.

What a test can't check gets said in the spec. "Only interactive things are blue" has no test, since a stylesheet can't say what's interactive.

A failing test that names the owner means a page went back to something the owner turned down. The project's agent instructions should say what to do then: change the rule with the owner before changing the test.

## While building

- **On a website, a layout change can change what a crawler or a screen reader gets.** Restyling a heading as a label, or merging a title into other text, changes a page's main heading. Check the head, the headings and any structured data after a layout change, and write a test over every page kind.
- **List what isn't built** in the spec, by chunk, with why.

## The pull request

A description that reviews well has, in this order:

1. What it is, in two or three sentences, and which spec it carries out.
2. **Is it ready**: a table of each check and its result, with real numbers.
3. **What wasn't checked**, if anything: for example motion on a real device and in each browser, images drawn outside the page, or parts of the project the tests didn't cover.
4. **The walkthrough**, a part for each chunk: what changed in a few sentences, before and after pictures, the files to read, and what's not built.

Commit the shots so the description can show them. Record motion as a short clip.

After the pull request, corrections go through the project's usual way of recording a decision.

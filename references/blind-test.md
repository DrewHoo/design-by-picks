# The blind test

The test asks one question: do the rules, as written, make a fresh agent lay out a page the owner would rather have than the page an agent makes with no rules? Rules read well to the agent that wrote them, because it knows what it meant. A fresh agent has only the text, which is all any later agent on the project will have. The owner picks without being told which page had the rules.

## What one test shows

One test is one pick between two samples, and it is weaker evidence than it feels like. An agent's output varies from run to run, so either page could have come out better or worse. An owner who shaped the rules may recognize their look. Treat a win as enough to go on with. Where a result is close or surprising, run a second pair before acting on it.

## Setup

1. **Choose a page kind nothing in the process has touched.** A page that was annotated, picked from or worked as an example tests the agent's memory of the picks, where a new kind tests the rules. Each retest uses another new kind.
2. **Save today's page as one file** ([variants.md](variants.md), step 1). Make two folders, `a/` and `b/`, each with a copy named `today.html`.
3. **Folder `a/` also gets the rules** as `rules.md`: the whole current draft, as an agent on the project would read it, with nothing about the process or the test. If example pages exist, it gets those too, under `examples/`.
4. **Folder `b/` gets nothing else.** Its agent gets one sentence about what the project is for.
5. **Start two fresh agents at once**, one in each folder, with the briefs below. Fresh means no context from this session. Neither brief mentions a test or the other agent.
6. **Shoot both results** and today's page with `scripts/shoot.mjs`.
7. **Read both results against the rules before the owner picks**, and write down what each agent did that the rules asked for and what it did that nobody asked for. This goes on the page under the folded which-is-which. The reading finds faults in the rules whichever page wins: two rules that clash, a rule the brief had to supply, something useful the unruled agent did that the rules never mention.
8. **Put the three pages on a review page as one blind flip.** A is today. B and C are "One agent's page" and "The other agent's page", with which-is-which folded shut under the note box. Vary which letter has the rules from test to test. The ask says to pick before opening what's under it.

## The two briefs

Both briefs are the same except where marked, so the rules are the only difference. Fill the brackets in.

**With the rules:**

```text
You are laying out one web page at [width]px wide. Work only inside this folder and do not read anything outside it, except to run the one command given below:

[folder a]

It holds:

- `today.html`: [one line on what the project is and what this page is], saved as one self-contained file. Its stylesheet is in the `<style id="page">` tag at the end of `<head>`, with the site's color and font variables on `:root`. [If it has pictures: they are `<img>` tags with long base64 `src` values. Keep those tags, and don't print the base64 into your context: read the file with a script that shortens `src="data:..."` first.]
- `rules.md`: the site's rules for how a page is laid out. Read it in full first. Your job is to lay this page out by those rules.
[- `examples/`: pages of the site that the rules point to as examples. Shoot each to see it.]

The task: write `result.html` in the same folder, a single self-contained static HTML file that lays out the same page at [width]px wide, following `rules.md` [and its examples].

Constraints:
- Use only information that is on today's page. Do not invent any fact, number, name or date. You may cut words, cut repetition, regroup, reorder, relabel and restyle. You may leave out the least important things, but everything a reader came for should still be reachable on the page.
- Keep the site's look: its color variables ([names]), its fonts ([names, and how to add one the rules call for]), and [its ground]. Keep the site's top bar as it is.
- You may reuse the file's existing stylesheet and markup, rewrite them, or write your own. No JavaScript is needed. Links can keep their `href`s.
- The page must not scroll sideways at [width]px (a table that scrolls sideways inside its own container is fine).

To see your work, run this from anywhere (it writes a full-page PNG and prints the page height and any sideways overflow):

[PW_ROOT=<folder with playwright-core>] node [path to scripts/shoot.mjs] <path to html> <path to png> --width [width]

Shoot `today.html` first to see the page as it is, then shoot `result.html`, look at the PNG and fix what's wrong. Do at least two rounds of look-and-fix. Save PNGs in the same folder.

When done, reply with: the path of `result.html`, and a short list (under 150 words) of the main layout decisions you made and which rule or example each came from. Do not write any other files besides `result.html`, your PNGs and any scratch script in that folder.
```

**Without the rules.** The same brief with three changes:

- The folder holds only `today.html`.
- In place of the `rules.md` lines, one or two sentences on what the project is and what a reader wants from a page: "[What the site is, in a phrase.] A reader arrives with one question, the page should answer it at once, and then it should lead them to the next question."
- The task ends "as well as you can. Use your own best judgment about layout, hierarchy, typography and grouping." The font line says it may add another font if it thinks the page needs one, and the reply asks for each decision "and why".

Two things about the briefs:

- **Anything the brief has to tell both agents is a candidate rule.** If "use only what's on the page" lives in the brief and not in the rules, an agent working from the rules alone will invent a claim sooner or later.
- **Keep the one sentence the same across tests**, so each test is against the same opponent.

## In a pass on one subject

The briefs above hold the site's look fixed and leave the layout free, because layout is what those rules decide. In a pass on one subject, hold fixed everything but the subject and leave the subject free. For color, the "keep the site's look" line becomes: keep the page's layout, type and words as they are, use only the theme's named colors, and decide which color each thing on the page gets. `rules.md` is the project's whole rules file with the pass's new rules in it, since that is what an agent on the project reads. The agent without rules gets the same page, the same named colors and the one sentence.

## If the rules win

Stage 6 is done. Write the test into the look's spec (the page, what the owner picked, what the reading in step 7 found) and keep the winning page with the examples. Before it becomes an example, take out anything in it that nobody asked for, since an agent will copy that too.

## If the rules lose

A loss says the rules made a page worse. It doesn't say which rules. There are two ways to find out.

**Redraft from what's already known.** The reading from step 7 and the owner's note on the pick may be enough. This costs the owner nothing more. Its risk is that the agent's explanation of someone else's preference is a guess, and a redraft built on a wrong guess loses again.

**Ask by piece.** This costs the owner one more page and replaces the guess with picks:

1. **Cut the two pages into matching pieces**, section by section, and put each pair on a review page: 0 is the page the owner picked, 1 is the page with the rules. The agent's own guess for each piece is folded shut. Leave out anything a note already settled.
2. **Read the piece picks for what they share.** An owner can prefer the rules' version of most pieces and still prefer the other page whole. Then what won the whole page is something the pieces have in common that the rules never mention. For example, the unruled agent may have drawn data in a form readers already know (a grid, a pair of bars about a baseline) where the rules had written it out as text.
3. **Assemble a page from the picks.** A fresh agent takes one page as the base and changes exactly the pieces picked from the other, with the owner's notes applied ("A, but with the wording from B"). The brief lists each piece by number: which page's version, what to bring over, and what to leave behind. It ends with "do not add any fact that is in neither file" and "reply with anything you had to decide that these instructions didn't cover". Those decisions are calls, and they're listed on the next page.
4. **Show the owner the assembled page** with a note box, on the same page as the next test.

Either way:

- **Redraft the rules.** Look hardest at the prohibitions. A ban reaches further than the case it was written for, so replace each with the positive rule it was standing in for, or cut it. Point the rules at any assembled pages as examples.
- **Test again on another new page kind**, with the new draft and the examples in folder `a/`.

If the rules lose twice while the piece picks favor them, ask the owner whether a whole-page pick is the right test for these rules.

A later change to the rules deserves the same test.

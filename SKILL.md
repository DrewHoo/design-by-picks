---
name: design-by-picks
description: Design by picks, a guided process for deciding how a project looks and moves, run with an owner who need not be a designer. The agent builds real options, the owner picks between them, and the picks become principles, named values, rules, example pages and tests. Use when asked for design system work or a guided design process, for a project whose design principles were never written down, to reclaim a look that accreted without decisions, for a pass on one open subject of a project that already has a look (color and theme, type, motion, one page kind's layout), or to blind-test layout rules after they change.
---

# Design by picks

If a project doesn't yet have its design principles articulated, each new screen takes its look from whatever the last one happened to do. An agent building that screen copies decisions and accidents alike, because nothing in the repo tells them apart.

A repo that holds its design well has these written down:

- Principles that settle arguments, each written "X, even over Y" where both sides are good things.
- Named values, or tokens. A color has one job, and its name says which.
- Rules, each with who decided it and when.
- Example pages an agent can copy from.
- Tests that fail when a page goes back to something the owner turned down.

This process writes those down with the project's owner, who does not need to be a designer. The agent takes inventory of what the project does today, builds real pages that differ in one thing, and drafts the records. The owner picks between those pages wherever they're working from, be it a phone, a tablet or a desktop, and says why.

## When to reach for it

- Start from scratch, to give a project a shared design language and the north stars it builds toward. This is **a full pass**: the inventory, then all seven stages.
- Fill a gap, when a project has principles and rules and one subject is still open: color and theme, type, motion, or one page kind's layout. **A pass on one subject** starts from the project's own record and runs only the stages that subject needs. [references/one-subject.md](references/one-subject.md) says which, and it is read first.
- Reclaim choices that weren't made intentionally, or unpack design-by-accretion. The inventory step identifies every individual design choice (intentional or not) and prompts the owner to choose intentionally this time. That is a full pass, or a pass on one subject where the accretion sits in one place.

## The stages

Stage 0 and stage 7 are the agent's own work. Stages 1 to 6 each go to the owner as a design review.

| | Stage | The owner gets | The owner does | It hands on |
|---|---|---|---|---|
| 0 | Take an inventory | Nothing yet | Nothing | Counts of what the project does today |
| 1 | Articulate the apparent design decisions | The project's own pages and a few outside ones, with each apparent decision named in design words | Corrects the notes, reacts to each page | A glossary, and the owner's reactions |
| 2 | Speed dating design survey | About twenty outside pages, one at a time against a twenty-second clock. They are external analogues for inspiration, not candidates to copy | Scores each 1 to 5, says why for the top and bottom five | What the owner likes, tied to examples |
| 3 | Principles | Principles drafted from those reactions as "X, even over Y", and a few forks | Keeps, cuts or rewords each | The principles as they stand |
| 4 | Test the principles | Shots of one real page that differ in one thing, flipped in place | Picks one of each | The values: sizes, spaces, colors by job, faces |
| 5 | The interaction lab | Live demos of small movements, each two or three ways | Tries each and picks | A table of what moves, how long and on what curve |
| 6 | What goes where | Layout rules, pages worked by them, and a blind test | Picks pages | Rules and example pages that passed a blind test |
| 7 | Write it in and hold it | A pull request with before and after pictures | Reviews | Named values, a rules file, tests that name who decided |

Read [references/stages.md](references/stages.md) for the stage you're starting.

## How to conduct the design review

A review is one page that shows the owner the options for a stage and collects their answers. Each one runs the same way.

1. **Build the page for where the owner reviews.** Ask which device they'll read it on. [references/pick-page.md](references/pick-page.md) has the page's parts, two templates and the checks to run before sending.
2. **Host it privately.** Any private address the owner can open will do. A claude.ai artifact with a database also saves the answers where the agent can read them. Anywhere else, the page's "Copy my picks" button brings them back through the chat.
3. **Send it with a short message**: the link, screenshots of the page, what the last review settled, what this one asks for, the calls the agent made, and how to send answers back if saving fails. Then wait.
4. **Record the answers.** For each pick: what was offered, what the owner chose, any note, and what the agent had picked. Under them goes the agent's reading of what the answers mean, marked as the agent's, and a list of what was left open.
5. **Open the next message with what the answers settled**, including where the owner picked against the agent.

A review is done when step 4 is written down.

Use the project's own conventions for where records live. A project with none gets these, under whatever folder holds its specs:

- **The reactions file** holds the inventory, then each review in turn: its link, where its answers are saved, the answers, and the agent's reading.
- **The look's spec** says how the look was decided: the rules as they stand, each blind test and what it changed, what's open, and stage 7's build order.
- **The rules file** says what the built project does today, in the present tense, each rule with who decided it and when. The project's agent instructions should point at it, or agents won't find it.
- **Example pages** are pages the owner chose or that were assembled from their picks, kept as HTML beside the spec.
- **Tests** cover each rule that code can check, with a comment above each naming who decided and when.

## Guidelines

These worked well at least once. YMMV.

1. **One axis a pick.** Each pick flips between two or three versions of one real page that differ in one thing. An answer to two changes at once can't be credited to either. After the single picks, one more flip shows the chosen values together, since values that each look right alone can clash.
2. **Today's page is always option A.** Changing nothing is always a real option, and every alternative gets judged against what exists. The fixed slot tells the owner which version is the baseline. Vary the order of the others, so position doesn't choose for them. The one pick with no today in it compares two agents' versions of a piece after a blind test.
3. **Review where the owner works.** Build the review page for the device the owner reviews on. If they work from a phone, make it work for a phone: one column, and targets a thumb can hit. Show real pages with real data, at the size they will really be seen wherever the screen allows.
4. **The owner's pick first, the agent's folded shut.** An opinion seen before choosing pulls the choice toward it. The agent's own pick and its reason sit under each pick, folded shut, and both go on record. The picks where the two differ teach the agent the most about the owner's taste.
5. **Make the small calls and mark them.** A spacing step, a corner, a line weight: decide it, list it on the page under "Calls I made without asking", and mark it as the agent's in the record. The owner's attention goes to the choices that need taste, and anything listed can still be overruled.
6. **A note that asks for more gets another round.** A hedge, or a pick judged at a value that later changed, means a second round on that axis. A note that reads two ways gets both readings drawn, and a third that does both where one exists.
7. **Examples beat prose rules.** An agent applying a prose rule has to guess its reach. An agent can copy an example page directly. Keep example pages beside the rules. Where the two disagree, the example is right about anything the owner picked, and the disagreement gets fixed in whichever one is wrong.
8. **Deferring is always an option.** Record it as an open decision: what stands in for it meanwhile, and what else waits on it.

## Reference files

The templates and scripts assume a project that renders in a browser. The method carries to anything you can take screenshots of.

- [references/stages.md](references/stages.md): each stage in full. Read the section for the stage you're on.
- [references/one-subject.md](references/one-subject.md): a pass on one subject of a project that has a look.
- [references/pick-page.md](references/pick-page.md): building, publishing and reading back a review page. Templates are in `templates/`.
- [references/variants.md](references/variants.md): making single-axis variants of a real page. Scripts are in `scripts/`.
- [references/blind-test.md](references/blind-test.md): the blind test's setup, both briefs, and what to do after a loss.
- [references/write-it-in.md](references/write-it-in.md): stage 7, from named values to the pull request.
- [references/vocabulary-and-axes.md](references/vocabulary-and-axes.md): the design words, the axes a look takes a position on, and the numbers the sources give for motion. Read for stages 1, 3 and 5.

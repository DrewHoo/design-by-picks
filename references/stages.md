# The stages

Every review page is built as [pick-page.md](pick-page.md) says, and each review runs as SKILL.md's "How to conduct the design review" says.

## 0. Take an inventory

**For:** knowing what the project does today before anyone has an opinion. Later stages can then say "this page uses 18 type sizes" where they would have said "the type feels inconsistent", and every unstated choice becomes something the owner can decide on purpose.

**The agent builds:** counts from the project's styles and its rules. How many font sizes, and which carry most of the page. How many spacing values. Each color and how many jobs it does. Each line, radius and shadow. Every animation and transition, and whether a press has a state at all. Then the rules about look that are already written, and where they disagree with the code.

**Recorded:** the first section of the reactions file, which this step starts.

**Hands on:** the numbers stages 1 and 4 quote, and the values stage 4 offers. A scale built from the values the project already uses most asks less of the project to change.

A survey of current practice is optional. [vocabulary-and-axes.md](vocabulary-and-axes.md) has a starting set of sources.

## 1. Articulate the apparent design decisions

**For:** saying out loud what the current design appears to have decided, and building a shared vocabulary while doing it. A page makes dozens of decisions nobody stated: what's biggest, what one color means, how tightly rows sit. The owner sees those things without words for them, and the agent has words it can't tie to what the owner sees. Naming each apparent decision on a real page gives both.

**The agent builds:** one page with a few of the project's own pages and a few outside pages that do the same job, each as a screenshot with numbered markers. Each note is lettered and numbered (A1, B3), names one design word, says what decision the page appears to have made at that spot, and carries a close-up of the place so the reader doesn't scroll back to the shot. Measure what can be measured across all the pages, such as row heights. The foot of the page is the glossary, each term linked to the notes that show it. The words come from [vocabulary-and-axes.md](vocabulary-and-axes.md).

**The owner does:** says where a word doesn't match what they see or where the agent read a page wrong, by letter and number. They will also react to the pages themselves, and those reactions can be worth more than the corrections.

**Recorded:** the reactions, by page and note number, quoted where the wording carries the meaning. Then the agent's reading of what they add up to, marked as the agent's, for the owner to confirm in stage 3.

**Hands on:** the glossary after the owner's corrections, and the reactions.

**Watch for:**
- Reactions arrive before there are principles to weigh them against. Most are worth holding until stage 3, where they can be read together. A fix that takes no judgment, like a wording error, needn't wait.
- A site that answers with a bot check, or a consent wall that can't be declined, is left out and named as left out.
- Where the owner reaches for a word that isn't the usual one, keep their word and give the usual term beside it. Theirs is the one they'll use again.

## 2. Speed dating design survey

**For:** the owner's taste, tied to examples, before any principle is written. The pages shown are external analogues: other products and objects that solve a similar problem, there for inspiration. None is a candidate to copy, and the page says so. Each gets a few seconds and a score, and reasons are asked for afterward, only for the ends, where the owner has the most to say.

**The agent builds:** about twenty outside pages shown one at a time, with one question for all of them ("If this project looked and worked like this, how happy would you be?") and five buttons. A bar drains over twenty seconds on each one. It keeps the answers quick and never cuts one off. After the last, the page lists the top five and the bottom five with a "Why?" box on each. `templates/design-survey.html` is this page. Choose analogues across kinds: direct competitors, dense tools, editorial, print, an object or two. Use pages stage 1 didn't annotate. `scripts/shoot-refs.mjs` shoots a list of addresses as a phone, a tablet or a desktop sees them.

**The owner does:** scores each from 1 to 5 on first reaction, then gives a few words of why for the ends.

**Recorded:** a table of score, page and reason. Then the agent's reading of what the scores say.

**Hands on:** what the owner likes and what puts them off, each tied to something they can point at.

**Watch for:**
- Look at every shot before it goes on the page. A sign-in sheet or an ad over a page costs it points that have nothing to do with its design. Note any that got through.
- A score mixes a page's design with how familiar it is and what it's about. Lean on the reasons more than the numbers.
- Read the scores together with stage 1. A stated preference and a scored one can disagree: an owner can ask for "denser" and score the densest pages lowest. Put a disagreement like that to the owner as a fork in stage 3.
- If nothing scores 5, it may be that no existing page is the target. It may also be that the analogues were poor or the owner scores low, so ask which.

## 3. Principles

**For:** turning two stages of reactions into a short list that settles arguments.

**The agent builds:** one page with:
- What the survey said, with the scores.
- About eight to ten principles, each written "X, even over Y" where both sides are good things. Under each: the reactions it was drawn from, what the project does today, a case it settles, and who reasonably picks the other side. A principle nobody would argue against is a truism and gets cut.
- A position for each axis in [vocabulary-and-axes.md](vocabulary-and-axes.md): where the project sits today, and whether that is deliberate or an accident.
- The forks: two or three choices that are the owner's to make and can't be drawn from what they've said, each with the agent's lean.
- The stock AI design defaults listed in [vocabulary-and-axes.md](vocabulary-and-axes.md) that the project uses, each marked deliberate or not.

**The owner does:** answers each principle (keep, cut, reword) and each fork.

**Recorded:** the draft and the owner's answer to each, then the principles as they stand. Republish the review page, so its link shows the principles as they stand.

**Hands on:** the principles. Every later pick names the principle or the reaction it answers.

**Watch for:**
- A principle drafted from one remark can stretch the remark too far. When the owner corrects one, redraw it where the correction puts the line.
- Where the owner offers a better wording, use it.
- A fork answered with "let's try it" is a trial. Show it beside today's page in stage 4 before treating it as settled.

## 4. Test the principles

**For:** finding out what each principle means in numbers. "Denser" is a principle. Whether a row is 36 or 40 pixels tall is what it comes to on a page, and the owner can only judge that by seeing both. What comes out is the values: how tall, how many sizes, which color does which job, lines or space.

**The agent builds:** one page of picks. Each is a flip between two or three shots of one real page of the project that differ in one thing, with A always today's page. Each pick says which reaction or principle it answers. Under each is a note box, then the agent's own pick and reason, folded shut. After the picks comes one flip of the chosen values all together against today, with three answers: closer to what I want, further from it, can't tell. Then a table of the calls the agent made without asking, and a list of what these picks leave for later stages. `templates/pick-page.html` is this page, and [variants.md](variants.md) is how the shots are made.

Pick the axes from the owner's reactions and the principles: one pick for each thing the owner raised, plus what the inventory shows is unsettled. An axis nobody raised can go in as the agent's addition when it's labeled as one. The survey is a good source for these, since it shows what the owner responds to without having named it.

**The owner does:** flips, picks, and adds a word where they have one.

**Recorded:** a table of the pick, what the owner picked, any note, and what the agent had picked. Then what the picks settle, and what needs a second round.

**Hands on:** the values, and the look every later stage is drawn in.

**Watch for:**
- A pick judged at a value that then changed has to be shown again. Whether rows need lines between them depends on how tall the rows are.
- A hedge in a note is a request for a second round. Say on the next page what the agent thinks was wrong with the first flip.
- When a note gives a reason for a pick ("legibility matters more here than fitting more in"), offer that reason as a principle on the next page.
- Record in the agent's reading which way the owner leans when picking against the agent, and weight later folded picks that way.
- A deferral goes on record as open, with what stands in for it and what waits on it.

## 5. The interaction lab

**For:** the small movements: a press, a menu opening, a panel, a number changing, waiting, going to another page. A still can't show a tenth of a second, so these are live.

**The agent builds:** one page of live demos built from a real page, drawn in the look stage 4 settled, on real data. Each demo runs two or three ways, with a line saying what to do ("Press and hold the button, then let go. Then tap quickly."). Version A is what the project does today. The page says which input the demos were built for, and it says so when the device has reduce motion on, since the moving versions won't move. At the foot is the table the picks turn into, filled with the agent's picks: what, how often, does it move, how long, which curve, and what a reader who asked for less motion gets. The decisions to cover and the sources' numbers are in [vocabulary-and-axes.md](vocabulary-and-axes.md). The pick-page template's saving and summary code carries over, and the demos themselves are written for the project.

**The owner does:** tries each version on the device that matters most to the project, and picks.

**Recorded:** the picks beside the agent's, then the table redone from the owner's picks, then what holds for all of it (for example: nothing in the reading path over 300 ms, leaving faster than arriving, a press shows with no delay).

**Hands on:** the motion table, which stage 7 writes as named times and curves.

**Watch for:**
- Say which browsers and devices the demos were tested on. A demo that misbehaves on the owner's device reads as a bad option.
- A movement that could block the next input has to be interruptible in the demo, since the built one must be.

## 6. What goes where

**For:** layout rules an agent can lay a new page out by, and evidence that the rules work.

**The agent builds, in order:**
1. A first draft of the rules from everything picked so far: what wins when two good things collide (the principles), the faces, sizes and colors by job, a table of where each kind of information goes with its size and whether it's interactive, rows and tables, grouping, what to cut, and the motion table. The draft is ready when every principle, value and row of the motion table is in it or listed as open.
2. Two or three of the project's pages worked by the rules, each as a flip against today's page, with a numbered list of what moved and why.
3. A blind test on a page kind nothing in the process has touched. [blind-test.md](blind-test.md) has the setup and both briefs.

**The owner does:** picks each worked page against today's, then picks in the blind test before opening which is which.

**Recorded:** each test's picks and notes, what the test showed, and the agent's reading. Then, in the look's spec: the rules as they stand, a table of the tests (the page, what the owner picked, what the rules got wrong), what's open, and the build order for stage 7.

**Hands on:** rules that won a blind test, and the example pages that go with them.

**Watch for:**
- Plan for the rules to lose a test. [blind-test.md](blind-test.md) says why that's likely and what to do next.
- Where the owner passes on every option, the note that comes with the pass is the brief for the next round. If it reads two ways, draw both.
- Mock-ups pick up words from the project's code that its readers never see. Check labels against the project's own vocabulary before a page goes out.

## 7. Write it in and hold it

**For:** making the look true of the project and keeping it true after the session ends.

Read [write-it-in.md](write-it-in.md). In short: named values first, with no page changing; then motion; then one page kind at a time against its example page; then tests. It ends in a pull request with before and after shots.

# The review page

Every stage hands the owner a review page. They read it, answer on it, and the agent reads the answers back.

## Its parts

Top to bottom:

1. A small label with the stage and the date, then the title.
2. Two or three sentences on what the last stage settled and what this one is for.
3. **"What I need from you"** in a box: how many picks, how to make one, and that picks save as they're made. The owner should know what's being asked before scrolling.
4. The picks. Each has a short question as its heading, a line on what the shot shows and what was held still, the reaction or principle it answers, the options, a note box, and the agent's own pick with its reason folded shut.
5. **"Calls I made without asking"**: a table of what, today, and the call, for the owner to overrule.
6. What these picks leave for a later stage, so nothing looks forgotten.
7. **"Your picks"**: a running list of what's been picked, a line saying whether it saved, and a "Copy my picks" button.

The page's own look is plain and unlike the project's, so the page is never mistaken for an option.

## Where the owner reviews

Ask where the owner will read the page, and build for that. The templates are one column and work at any width.

What changes with the device is how shots are shown. Take shots at the width the project is mostly used at, and draw them on the review page at that same width, so everything in a shot is the size it would really be. If the owner reviews on a phone and the project is used on phones, a 390px shot shown at 390px makes a row the height it would really be. If the owner reviews on a desktop, the same shot sits at its real size in the middle of the page. A desktop layout reviewed on a phone can't be shown at real size, so say that on the page and offer the full-size shot behind a tap.

## The flip

A pick's options are shown in one place and flipped between. Each shot keeps its real width, and the one thing that changed is the only thing that moves when the owner flips. Side by side, each shot is smaller than life and the eye has to find the difference.

- Tabs A, B and C sit in a bar that stays on screen while a tall shot scrolls under it. Tapping or clicking the shot also flips.
- Under the tabs, one line says which version is showing and one fact about it ("C: 36px. 17 rows fit in this window.").
- A "Pick C" button picks the version showing. Picking it again clears it.
- Every version of a pick has the same window.

## The templates

`templates/pick-page.html` is stages 4 and 6, and the frame for stages 3 and 5. Everything on it comes from one `PAGE` object at the top of its script: the title, the ask, each pick's question, versions and pictures, the agent's pick, the calls and the later list. Copy it to a working folder as `index.html`, fill `PAGE` in, and put the shots beside it.

Each version names its shot (`img`) and the shot's size in pixels (`w`, `h`). The page reserves the shot's space from those, so they have to be the file's real size: a shot from `scripts/variants.mjs` at the default width is 780 wide and twice its `clip.height` tall. `shotWidth` is the width the shots are drawn at on the page.

Three kinds of pick are in the template:

- a flip with a Pick button;
- a flip answered with choices (`choices`), for "all together";
- a blind flip (`reveal`), whose versions are named "One agent's page" and "The other agent's page" and whose which-is-which is folded shut under the note box.

`stills` are shots with a note box and no pick, for a page assembled from earlier picks.

`templates/design-survey.html` is stage 2. Its `TEST` object holds the question, the items and where the answers save. Each item's shot sits beside it as `<name>.jpg`. It needs ten or more items, since it asks why for the top five and the bottom five.

Stage 1's page (annotated shots with a glossary) and stage 5's demos have no template, since both are written for the project. They can use the same frame and the same saving code.

## Saving

Both templates save the same way:

- Answers are one object. With a database, it is written to one document, `<stage>/answers` (`stage-4/answers`, `stage-6-pieces/answers`).
- The pick page writes `{picks, notes, picked, of}`. `picks` holds an index for each pick's id: the index of the version picked, so 0 is A, or for a pick answered with `choices` the index of the choice. `notes` holds text by a pick's or a still's id.
- The survey writes `{scores, why, done, of}`. `scores` holds 1 to 5 by a shot's name and `why` holds text by a shot's name.
- The same object is kept in the browser's `localStorage`, so a reload loses nothing.
- When no database can be reached, the status line says so and tells the owner to use "Copy my picks" and paste the result into the chat.

When a page goes out, write down where its answers save and what each index means ("0 is the page the owner picked, 1 is the page with the rules"). `{"header": 0}` means nothing to a later session without that.

## Publishing

The page needs a private address the owner can open on the device they review on.

**Any private host.** A preview deploy, a tunnel to a local server, or a static host behind a login all work. The templates need nothing from the host. Without a database the answers come back through "Copy my picks".

**As a claude.ai artifact**, the answers also save where the agent can read them. The artifact tools say what's current, so read them first:

1. Call the artifact server's `guide` with topic `pages` before the first publish of a session, and `describe_capabilities` with capability `db` before writing code that saves.
2. Publish the folder with `publish_files`: `index.html` and every shot, each `as` its file name, with a plain title.
3. Give the page its database with `declare_capabilities`: `{"db": {}, "user": {}}`, with the slug and version the publish returned. A new page is published first and declared second.
4. Record the artifact's link, its slug and the database document at the top of the stage's section in the reactions file.

A review page shows unreleased work and the owner's notes. Keep it private unless the owner says otherwise.

## Before it's sent

Run these on the local `index.html`:

- `node scripts/shoot.mjs index.html check.png --width <the review device's width>`. It prints the page's height, any sideways overflow and any script error. Overflow should be 0 and errors empty.
- Look at the shot. Check each pick's first shot is the one its label says.
- Open the page, make a pick, add a note, reload. The pick and the note should still be there, and the summary at the foot should read as a sentence.
- Check every flip's first version is today's page, unchanged. A piece pick after a lost blind test is the exception ([blind-test.md](blind-test.md)).
- Read the agent's folded picks once more. Each should give a reason and leave the choice open.

The database exists only once the page is published, so saving usually can't be tested beforehand. Name the copy button as the fallback in the hand-off message (SKILL.md, "How to conduct the design review").

## Reading the answers

When the owner says the picks are in:

1. Read the saved answers (for an artifact, `db_get` with the slug and the path `<stage>/answers`), or take the pasted list.
2. If both exist and differ, ask.
3. Write the picks into the reactions file: the pick, the version's name as well as its letter, any note, and what the agent had picked.
4. Write the agent's reading under them, marked as the agent's.
5. Open the next hand-off with what the picks settled, including where the owner picked against the agent.

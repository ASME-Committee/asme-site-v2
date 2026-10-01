# CLAUDE.md

This is the ASME website, live at asme.org.au. The people asking for changes are ASME committee members, usually not developers. They describe a change, look at the result, and approve it. You write the code. Explain things in plain language, without jargon.

## How every change works

1. **Never change `main` directly.** Anything merged to `main` is live on asme.org.au about a minute later (`.github/workflows/deploy.yml`), and `main` has no branch protection. Start each change from an up-to-date `main` on a new branch.
2. **Show it on localhost first.** Run the preview (`npm run dev`, port 3000) and open it in the browser pane. Check the phone layout (375px wide) as well as desktop before saying it's done.
3. **Iterate in plain language.** Expect requests like "make that bigger" or "move it below the video".
4. **Flag side effects as decisions, not errors.** If a change removes the only link to something, leaves a page unlinked, changes where a link goes, or adds copy that will go out of date, say so plainly and let the person decide.
5. **Commit only when asked.** Wait for "commit it and open a PR" or similar. Then commit, push the branch, open a pull request, and give the person the link.
6. **The person merges.** They use the pull request's Merge button. Don't merge, don't turn on auto-merge, and don't push to `main` yourself.
7. **"Check it's live"** means watch the "Deploy site" run (`gh run watch`) and then confirm the change on asme.org.au itself, not only the green tick.

## Good habits

- One change per pull request, so each is easy to check and easy to undo.
- "Undo my last change" means revert that pull request: open a new pull request that reverts its merge commit, and let the person merge it. Never rewrite history or force-push.
- Dated copy ("Coming October 2026", "Commencing February 2027") goes out of date. When a change adds a date, remind the person to put a reminder in their diary.

## Things that catch you out in this repo

- **Don't run `npm run build` while the preview is running.** Both use `.next`, so the build overwrites the preview's files and the page loads unstyled (its CSS and JS return 404). To recover: `lsof -ti tcp:3000 | xargs kill; rm -rf .next out`, then start the preview again.
- **Put temporary edits back before committing.** If you change something only to demonstrate it (for example, moving a news item's date forward so the news bar shows), revert it before `git add`.
- **Ignore `Publish to GitHub.command`.** It is left over from an earlier setup: it force-pushes a snapshot to a different repository and commits under someone else's name.
- **Most wording is in `lib/content.ts`.** House style: no em or en dashes in site copy.
- **News items** are the `announcements` list in `lib/content.ts`. The green news bar shows the newest one for 14 days after its date and links to that item's entry on `/resources`. The entry's anchor is made from its title, so editing a headline changes its link.
- **Photos:** when swapping one, rewrite its `alt` text to describe the new image. Never blur a real person's face with CSS: the original file is still sent to the browser.
- **The site is a static export** (`output: "export"`, `trailingSlash: true`). Anything computed on the server is computed at build time, not when someone visits. Paths to files in `public/` go through `asset()`.

# Agent change log

Every change an agent merges to `main` on its own authority gets one line here,
newest first. `main` auto-deploys, so each of these was a live release.

The point of this file is speed under pressure: if the site is broken, you
should be able to find the most recent change and paste its rollback command
without reading a diff or reconstructing history. Past entries are never
rewritten.

**Fastest rollback is Vercel, not git.** Deployments → the last known-good
production deployment → Promote to Production. That's live in seconds with no
rebuild. Run the `git revert` afterwards so the code matches what's deployed.

This is a curated view. The authoritative history is
`git log --merges --first-parent main`; if the two disagree, believe git.

| Date | PR | Merge SHA | What changed | Rollback |
| --- | --- | --- | --- | --- |
| 2026-09-10 | [#15](https://github.com/Nightmares4u/Treemate-Website/pull/15) | `fd61bea` | Seven heaviest images converted to WebP — homepage images 9.9 MB → 613 KB, verified live | `git revert fd61bea` |
| 2026-09-10 | [#14](https://github.com/Nightmares4u/Treemate-Website/pull/14) | `d2c4fb8` | Landed the monitoring workflows, setup script and merge policy on `main` (recovery: #12/#13 merged into side branches, never reached `main`) | `git revert -m 1 d2c4fb8` |

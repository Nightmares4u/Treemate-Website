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
| _no autonomous merges yet_ | | | | |

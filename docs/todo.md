---
title: TODO / Backlog
---

# TODO / backlog

Outstanding work and the **one-time admin settings** that the CI workflows can't
configure themselves (they require repo-admin and live in GitHub settings, not in
code). An agent or maintainer with admin should work through these.

## Per-repo one-time setup

Apply to **each** repo: `game-launcher-web`, `game-controller`, `wiki`.

- [ ] **Pages source** → Settings ▸ Pages ▸ *Deploy from a branch* → `gh-pages` / `(root)`.
      (The first `pages.yml` run creates the `gh-pages` branch.)
- [ ] **Branch protection** on `main` → require the **build** and **lint** status
      checks to pass before merging; require a PR (no direct pushes).
- [ ] **Allow auto-merge** → Settings ▸ General ▸ Pull Requests. Then PRs can use
      `gh pr merge --auto --squash` to merge themselves once checks go green.
- [ ] **Squash-only merging** → enable "Allow squash merging"; disable merge
      commits and rebase merging so every PR lands as one commit.
- [ ] **Automatically delete head branches** → Settings ▸ General ▸ Pull Requests.
      (The cleanup job also deletes merged branches as a backstop.)

### CLI shortcut

Most of the above can be set with `gh` (requires admin auth):

```sh
# per repo, with R=space-console/<repo>
gh api -X PATCH repos/$R -f allow_squash_merge=true \
  -f allow_merge_commit=false -f allow_rebase_merge=false \
  -f allow_auto_merge=true -f delete_branch_on_merge=true
# branch protection requiring the checks (job names: "build")
gh api -X PUT repos/$R/branches/main/protection \
  -f 'required_status_checks[strict]=true' \
  -f 'required_status_checks[contexts][]=build' \
  -f 'enforce_admins=false' \
  -f 'required_pull_request_reviews=' -f 'restrictions='
```

## Wiring status

| Repo | Pipeline files | Pages source set | Branch protection | Auto-merge | Notes |
| --- | --- | --- | --- | --- | --- |
| game-launcher-web | ✅ `pages.yml`, stamp, lint | ☐ | ☐ | ☐ | docs migrated to wiki |
| game-controller | ✅ `pages.yml`, stamp, lint | ☐ | ☐ | ☐ | placeholder app |
| wiki | ✅ `pages.yml`, markdownlint | ☐ | ☐ | ☐ | docs hub |

## Product backlog

- [ ] **Real transport** — implement `PlayerSession.connect()` (launcher) and the
      matching `ControllerSession.connect()/send()` (controller) over a shared
      WebSocket/WebRTC/AirConsole channel.
- [ ] **game-controller UX** — replace the placeholder pad with the real control
      surface once the first game's input needs are known.
- [ ] **Game catalog source** — `games.js` is static; decide if/when it moves to
      an API/CMS.

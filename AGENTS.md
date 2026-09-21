# Repository contract

This is a documentation and presentation project, not an executable agent framework.
Keep changes focused on the requested teaching, build, or validation improvement.

## Map

- `docs/agentic-harness.md`: the reference guide (including Mermaid diagrams).
- `presentations/agentic-harness-l300.md`: manually maintained Marp deck and speaker notes.
- `presentations/themes/musher.css`: shared slide theme; `.marprc.yml` selects it.
- `tests/`: local-link regression checks and rendered-deck smoke tests/screenshots.
- `.github/workflows/publish-presentation.yml`: validation on every PR and main push;
  only main can deploy to Pages.

## Commands

Run from the repository root. Prerequisites: Node 24, npm, Google Chrome, and
Go 1.25+ for the pinned actionlint command. See [README.md](README.md#build-and-validate)
for browser configuration and reproducibility limits.

```bash
npm ci
npm run lint
npm run build
npm test
# Equivalent full check after installation:
npm run validate
```

Use `npm run lint:md`, `npm run lint:links`, `npm run lint:yaml`, or
`npm run lint:workflows` for targeted checks. `npm test` needs existing HTML/PDF
exports; rebuild after deck or theme changes.

## Definition of done

- Update the guide and deck together for shared claims, examples, and terminology;
  explain an intentional guide-only or deck-only change in the PR.
- Keep the 60-minute agenda and facilitator map consistent. Label synthetic eval
  results as illustrative; cite evidence for empirical claims.
- Include commands, exit status, and limitations in the PR. Review HTML, PDF, and
  `test-results/` screenshots; screenshots are review evidence, not visual assertions.
- Keep exact dependency versions and `package-lock.json` in sync with npm.
  Pin Actions to verified full SHAs; preserve read-only validation permissions.
- Do not commit `node_modules/`, `site/`, `tmp/`, screenshots, or other generated
  artifacts. Never commit credentials or sensitive tool logs.
- A green check only covers implemented assertions. These instructions are advisory;
  maintainers must configure required checks/reviews in repository settings.

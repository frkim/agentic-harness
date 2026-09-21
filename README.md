# agentic-harness

Documentation and a conference-ready deck about the **agentic harness**: the engineering system — context,
capabilities, orchestration, verification, guardrails, and telemetry — that turns a general-purpose coding
model into a dependable contributor to your codebase.

> Agents are the sled dogs. You are the musher. The harness is everything in between.

## Contents

| Path | What it is |
| --- | --- |
| [`docs/agentic-harness.md`](docs/agentic-harness.md) | The reference document: architecture, layer-by-layer deep dives, maturity model, anti-patterns, checklists, glossary (L300–L400) |
| [`presentations/agentic-harness-l300.md`](presentations/agentic-harness-l300.md) | The manually derived 60-minute [Marp](https://marp.app/) deck, with presenter notes and a facilitator timing map |
| [`presentations/themes/musher.css`](presentations/themes/musher.css) | The **Musher** Marp theme — arctic night, snowfield, aurora, headlamp amber |
| [`presentations/README.md`](presentations/README.md) | How to preview and export the deck |
| [`.marprc.yml`](.marprc.yml) | Marp CLI configuration (theme set, HTML enabled) |
| [`.github/workflows/publish-presentation.yml`](.github/workflows/publish-presentation.yml) | Validates documentation and the deck; publishes to GitHub Pages |
| [`AGENTS.md`](AGENTS.md) | Repository scope, commands, and definition of done |

## Read the deck online

Every push to `main` validates the documentation and deck before publishing to GitHub Pages:

- Slides: <https://frkim.github.io/agentic-harness/>
- PDF with presenter notes: <https://frkim.github.io/agentic-harness/agentic-harness-l300.pdf>

Enable it once per repository under **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Build and validate

Prerequisites: **Node 24 and npm**, **Google Chrome**, and **Go 1.25+** (for actionlint).
The Ubuntu GitHub Actions runner provides Chrome and Go; Node is selected explicitly.
Marp and the screenshot tests both use Chrome. If Chrome is not discoverable, set
`CHROME_PATH` to its executable for both tools.

Run from the repository root so `.marprc.yml` is picked up:

```bash
npm ci
npm run validate
```

| Command | Checks or output |
| --- | --- |
| `npm run lint:md` | Markdown conventions (with documented Marp/table exceptions) |
| `npm run lint:links` | Local file links and GitHub-style heading anchors; warnings fail CI |
| `npm run lint:yaml` | YAML parsing and formatting for Marp, Dependabot, and workflows |
| `npm run lint:workflows` | Pinned actionlint: Actions syntax, expressions, and shell checks when ShellCheck is installed |
| `npm run lint` | All the above |
| `npm run build` | `site/index.html` and `site/agentic-harness-l300.pdf`, including presenter notes |
| `npm test` | Link-checker regression tests and export smoke checks; selected slide screenshots in `test-results/` |
| `npm run validate` | Lint, HTML/PDF build, then tests — also used by CI |

`npm test` requires the deck to have been built first. External URLs are not checked:
review cited sources manually. Screenshots cover representative layouts, not every slide,
and require human review; they are not pixel-diff or overflow assertions.

The npm dependency graph is locked, including Marp 4.5.1. Two temporary overrides
remove known vulnerabilities: `@puppeteer/browsers` replaces its vulnerable ZIP
extractor, and `@xmldom/xmldom` fixes XML parsing/serialization advisories. Review
these overrides when Marp's upstream dependencies change; test exports before removing them.
Dependabot checks npm packages and Actions weekly. Review the pinned actionlint version
in `package.json` when updating workflow tooling.

Chrome, fonts, the OS image, and the Node/Go patch versions can still vary: exports
are not promised to be byte-identical. Record these versions when comparing renders.
No browser downloads are performed by `npm ci`.

`site/`, `tmp/`, and `test-results/` are git-ignored. See
[`presentations/README.md`](presentations/README.md) for preview and PowerPoint export.

## Contributing and review

- Read [`AGENTS.md`](AGENTS.md). The guide is the reference; the deck is maintained
  **manually**, with no generation script. Update both for shared content changes.
- Keep edits focused. Qualify heuristics, cite factual claims, and label illustrative
  evaluation data rather than presenting it as an experiment performed here.
- Include verification commands/results and limitations in the PR checklist.
  Review the exported PDF (including notes), HTML, and `slide-review` CI artifact
  for clipping, legibility, and timing. Do not commit generated outputs.
- Maintainers should require the **Validate docs and deck** check and human review
  in branch protection. Workflow permissions do not configure those repository settings.

## Licensing status

No open-source license has been selected for this repository (`UNLICENSED` in
`package.json`). No additional permission to reuse, modify, or distribute its
content or code is granted here; rights under applicable law and GitHub's terms
remain unaffected. Ask the repository owner before reuse beyond those rights.
Third-party dependencies retain their own licenses. A maintainer must explicitly
choose a license before this project can be advertised as openly licensed.

## Related

Standards, instructions, skills, agents, prompts, and templates that implement the context layer described
here: [`frkim/ai-coding-standards`](https://github.com/frkim/ai-coding-standards).

# agentic-harness

Documentation and a conference-ready deck about the **agentic harness**: the engineering system — context,
capabilities, orchestration, verification, guardrails, and telemetry — that turns a general-purpose coding
model into a dependable contributor to your codebase.

> Agents are the sled dogs. You are the musher. The harness is everything in between.

## Contents

| Path | What it is |
| --- | --- |
| [`docs/agentic-harness.md`](docs/agentic-harness.md) | The reference document: architecture, layer-by-layer deep dives, maturity model, anti-patterns, checklists, glossary (L300–L400) |
| [`presentations/agentic-harness-l300.md`](presentations/agentic-harness-l300.md) | The 60-minute [Marp](https://marp.app/) deck derived from the document, with presenter notes and a facilitator timing map |
| [`presentations/themes/musher.css`](presentations/themes/musher.css) | The **Musher** Marp theme — arctic night, snowfield, aurora, headlamp amber |
| [`presentations/README.md`](presentations/README.md) | How to preview and export the deck |
| [`.marprc.yml`](.marprc.yml) | Marp CLI configuration (theme set, HTML enabled) |

## Build the deck

Run from the repository root so `.marprc.yml` is picked up:

```bash
npx @marp-team/marp-cli presentations/agentic-harness-l300.md -o tmp/agentic-harness-l300.html
npx @marp-team/marp-cli presentations/agentic-harness-l300.md --pdf --pdf-notes -o tmp/agentic-harness-l300.pdf
```

`tmp/` is git-ignored. See [`presentations/README.md`](presentations/README.md) for the VS Code workflow and
the PowerPoint export.

## Related

Standards, instructions, skills, agents, prompts, and templates that implement the context layer described
here: [`frkim/ai-coding-standards`](https://github.com/frkim/ai-coding-standards).

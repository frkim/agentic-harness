# Build the deck (Marp)

The deck is [Marp](https://marp.app/) Markdown, per the presentation standard in
[`frkim/ai-coding-standards`](https://github.com/frkim/ai-coding-standards).

| File | Purpose |
| --- | --- |
| [`agentic-harness-l300.md`](agentic-harness-l300.md) | 60-minute L300–L400 deck, with presenter notes and a facilitator timing map |
| [`themes/musher.css`](themes/musher.css) | The **Musher** theme: arctic night, snowfield, aurora, headlamp amber |
| [`../.github/workflows/publish-presentation.yml`](../.github/workflows/publish-presentation.yml) | CI build of the deck and deployment to GitHub Pages |

## Published deck

[`publish-presentation.yml`](../.github/workflows/publish-presentation.yml) validates every PR and every
push to `main` (also on demand via **Run workflow**). It checks documentation and workflows, exports
HTML and PDF with presenter notes, and captures selected slide screenshots. Only main deploys to Pages:

- Slides: <https://frkim.github.io/agentic-harness/>
- PDF with presenter notes: <https://frkim.github.io/agentic-harness/agentic-harness-l300.pdf>

Pull requests run the build too — without deploying — and attach the result as the `agentic-harness-l300`
workflow artefact, so a deck change can be reviewed before it is merged. GitHub Pages must be set to
**Source: GitHub Actions** in the repository settings for the deployment to succeed.

## Preview in VS Code

Install the **Marp for VS Code** extension, then open `agentic-harness-l300.md`. The theme is picked up from
[`.marprc.yml`](../.marprc.yml) at the repository root (`themeSet: ./presentations/themes`); if your workspace
does not read it, add `"markdown.marp.themes": ["./presentations/themes/musher.css"]` and
`"markdown.marp.enableHtml": true` to your VS Code settings.

## Export from the command line

Install the [prerequisites](../README.md#build-and-validate), then run from the repository root
so that `.marprc.yml` (theme set and `html: true`) is picked up:

```bash
npm ci

# HTML (site/index.html; press "p" for speaker view)
npm run build:html

# PDF with presenter notes attached
npm run build:pdf

# PowerPoint
npm run build:pptx

# All lint, link, workflow, build, and screenshot checks
npm run validate
```

`site/`, `tmp/`, and `test-results/` are git-ignored — build artefacts stay out of the repository.
Inspect the screenshots from `test-results/` locally or the `slide-review` CI artifact.
They are selected-slide review evidence, not an automated guarantee against overflow.

## Speaking notes

Every slide carries presenter notes in HTML comments. They are shown in the Marp speaker view and exported with
`--pdf-notes`. The last slide is a facilitator timing map with guidance for 45-minute and 90-minute variants.

## Editing conventions

- Slide classes come from the Musher theme: `lead` (title), `section` (divider), `trail` (single idea),
  `compact` (dense tables). Apply them per slide with `<!-- _class: compact -->`.
- Diagrams in the deck are monospaced text blocks so that they render in every Marp output format; the
  [Mermaid](https://mermaid.js.org/) versions live in [`../docs/agentic-harness.md`](../docs/agentic-harness.md)
  and render on GitHub.
- Keep the deck and the document in sync: the deck is **manually derived**, not generated;
  no guide-to-deck generation script is checked in. The document is the reference.
- The agenda includes four introductory minutes, 51 minutes across seven legs, and five
  minutes for the close/Q&A. Keep the facilitator map aligned when slides move.

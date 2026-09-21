# Build the deck (Marp)

The deck is [Marp](https://marp.app/) Markdown, per the presentation standard in
[`frkim/ai-coding-standards`](https://github.com/frkim/ai-coding-standards).

| File | Purpose |
| --- | --- |
| [`agentic-harness-l300.md`](agentic-harness-l300.md) | 60-minute L300–L400 deck, with presenter notes and a facilitator timing map |
| [`themes/musher.css`](themes/musher.css) | The **Musher** theme: arctic night, snowfield, aurora, headlamp amber |

## Preview in VS Code

Install the **Marp for VS Code** extension, then open `agentic-harness-l300.md`. The theme is picked up from
[`.marprc.yml`](../.marprc.yml) at the repository root (`themeSet: ./presentations/themes`); if your workspace
does not read it, add `"markdown.marp.themes": ["./presentations/themes/musher.css"]` and
`"markdown.marp.enableHtml": true` to your VS Code settings.

## Export from the command line

Run from the repository root so that `.marprc.yml` (theme set and `html: true`) is picked up:

```bash
# HTML (speaker view included: press "p" in the browser)
npx @marp-team/marp-cli presentations/agentic-harness-l300.md -o tmp/agentic-harness-l300.html

# PDF with presenter notes attached
npx @marp-team/marp-cli presentations/agentic-harness-l300.md --pdf --pdf-notes -o tmp/agentic-harness-l300.pdf

# PowerPoint
npx @marp-team/marp-cli presentations/agentic-harness-l300.md --pptx -o tmp/agentic-harness-l300.pptx
```

`tmp/` is git-ignored — build artefacts stay out of the repository.

## Speaking notes

Every slide carries presenter notes in HTML comments. They are shown in the Marp speaker view and exported with
`--pdf-notes`. The last slide is a facilitator timing map with guidance for 45-minute and 90-minute variants.

## Editing conventions

- Slide classes come from the Musher theme: `lead` (title), `section` (divider), `trail` (single idea),
  `compact` (dense tables). Apply them per slide with `<!-- _class: compact -->`.
- Diagrams in the deck are monospaced text blocks so that they render in every Marp output format; the
  [Mermaid](https://mermaid.js.org/) versions live in [`../docs/agentic-harness.md`](../docs/agentic-harness.md)
  and render on GitHub.
- Keep the deck and the document in sync: the deck is the guided tour, the document is the reference.

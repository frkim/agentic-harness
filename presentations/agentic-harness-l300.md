---
marp: true
theme: musher
paginate: true
size: 16:9
header: 'The Agentic Harness · L300–L400'
footer: 'Agents are the sled dogs · the developer is the musher'
---

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _header: '' -->

# The Agentic Harness

## Harnessing coding agents: context, tools, verification, and trust

**L300 – L400 · 60 minutes**

Companion document: `docs/agentic-harness.md`
Reference implementation: `github.com/frkim/ai-coding-standards`

<!--
Welcome. One sentence to set the frame before the agenda:
"Everyone in this room has access to the same models. In twelve months the gap between teams will not be the
model — it will be the harness they built around it. Today we build that harness."
Keep the intro under 90 seconds; the content is dense and the clock is real.
-->

---

## Who this session is for

|  | |
| --- | --- |
| **Audience** | Engineers, tech leads, and architects already using coding agents daily |
| **Level** | L300 (how to build it) rising to L400 (how to operate and measure it) |
| **Assumed** | Git, CI/CD, code review, and at least one agent in your IDE or on your PRs |
| **Not covered** | Prompt tricks, model benchmarks, "AI will replace you" takes |
| **You leave with** | A reference architecture, a readiness checklist, and a 90-day plan |

> If you have never assigned an issue to an agent, you will still follow — but the value is in the operating
> model, not the demos.

<!--
Calibrate the room quickly with two hands-up questions:
1. Who has an AGENTS.md or copilot-instructions.md committed in their main repo?
2. Who has merged a pull request that an agent opened?
The ratio tells you how much time to spend on Part 2 versus Part 6. Note it, then move on.
-->

---

## The trail map <span class="timing">60 minutes</span>

| # | Leg | Time |
| --- | --- | --- |
| — | Trailhead — welcome, audience, agenda, mental model | 4 min |
| 1 | Same dogs, different finish — what a harness *is* | 6 min |
| 2 | **Context engineering** — the gangline | 11 min |
| 3 | Capabilities — tools, MCP, environment | 7 min |
| 4 | Orchestration — the team formation | 7 min |
| 5 | Verification — trail markers | 7 min |
| 6 | Guardrails and security — the snow hook | 7 min |
| 7 | Measure and mature — the expedition log | 6 min |
| — | Monday morning and Q&A | 5 min |

<!--
Tell the audience explicitly: questions are held until the end of each leg, and there are 5 minutes of Q&A at
the close. Without this, Part 2 will absorb the whole hour — it always does.
-->

---

<!-- _class: trail -->

## The mental model: one team, one trail

| Mushing | Agentic engineering |
| --- | --- |
| **Musher** | You: destination, route, accountability |
| **Sled dogs** | Agents: fast, tireless, literal |
| **Lead dog** | Planner / orchestrator agent |
| **Swing dogs** | Specialists: security, review, docs |
| **Wheel dogs** | Heavy lift: migrations, refactors |
| **Harness and gangline** | `AGENTS.md`, instructions, skills, prompts, tools |
| **Trail markers** | Tests, types, linters, CI |
| **Snow hook** | Human gates: review, approvals, branch protection |
| **Whiteout** | Missing context — full speed, wrong direction |

<!--
Do not over-sell the metaphor; use it as a compression device. The three rules worth stating out loud:
1. You cannot push a sled with dogs — everything must pull toward one definition of done.
2. The lead dog is trained, not commanded continuously — invest in durable context.
3. The musher runs too — on the hills, you get off and pedal. Full automation is not the goal.
-->

---

<!-- _class: section -->

# 1 · Same dogs, different finish

## What an agentic harness is, and the three failures it prevents

<span class="timing">0:04 → 0:10</span>

---

## Two teams, one model

<div class="columns">
<div class="card">

### Team A — loose dogs

- Chat in the IDE, copy-paste out
- No shared context files
- Agent cannot run the tests
- Review is the only quality gate
- "It feels faster"

**Result:** individual speedups, zero compounding, review queue on fire

</div>
<div class="card">

### Team B — harnessed

- `AGENTS.md` + path-scoped rules, committed
- Agent runs lint, build, tests, scans
- Tasks scoped to one verifiable slice
- Findings become rules and checks
- Metrics on the wall

**Result:** merged change, measured quality, compounding returns

</div>
</div>

> Same model. Same people. The delta is engineering, and it is entirely in your control.

<!--
Ask: "Which team are you?" — and let the silence do the work for three seconds.
If you have internal numbers (first-pass CI green rate before/after a harness investment), this is the slide
to show them on.
-->

---

## Definition

> An **agentic harness** is the repeatable engineering system that turns a general-purpose coding model into a
> dependable contributor to *your* codebase.

It supplies the six things the model does not bring with it:

1. **Context** — how this repository actually works
2. **Capabilities** — tools, runtimes, credentials, network
3. **Orchestration** — how work is split across turns, sessions, and agents
4. **Verification** — proof the change is correct, before a human looks
5. **Guardrails** — bounded blast radius when it goes wrong
6. **Observability** — evidence, metrics, and evaluation

<!--
Emphasise "repeatable". A brilliant one-off session is not a harness; a mediocre result that is reproducible
across 40 engineers is worth far more, because you can improve it systematically.
-->

---

<!-- _class: trail -->

## L400 framing: the model is a policy, the harness is the environment

| Reinforcement learning term | Your harness |
| --- | --- |
| Observation space | Context: contract, instructions, skills, repo legibility |
| Action space | Tools: edit, run, test, query, browse — and their limits |
| Reward signal | Tests, types, linters, scans — the only objective feedback |
| Episode boundary | Task scoping, checkpoints, budgets |
| Safety constraints | Permissions, sandbox, gates, protected branches |

**You can shape the environment, even when model weights are fixed.**

> Diagnose context, tools, and feedback first — a heuristic, not proof that the model is never the limit.

<!--
This is the intellectual centre of the talk. If an architect in the room remembers one slide, make it this one.
The RL framing is an analogy: running tests does not train the model. SWE-agent (Yang et al., 2024,
https://arxiv.org/abs/2405.15793) studies interface design on specific coding benchmarks, not all failure causes.
Concrete example to offer: a team blamed the model for "ignoring our API conventions" — the conventions existed
only in a Confluence page the agent could not read. Ten lines in an instruction file closed the gap.
-->

---

## The three failure modes a harness must prevent

| Failure | Looks like | Root cause | Fixed by |
| --- | --- | --- | --- |
| **Wrong** | Invented APIs, wrong layer, ignores conventions | Missing or stale context | Context layer |
| **Unverified** | Does not build, tests never run, "should work" | No feedback signal | Verification layer |
| **Unsafe** | Secrets, scope creep, production impact | No bounds | Guardrail layer |

Everything in the next 50 minutes maps to one of these three columns.

<!--
Useful audience prompt: "Think of the last agent output you threw away. Which of the three was it?"
Nine times out of ten the answer is 'wrong' — which is why Part 2 gets the most minutes.
-->

---

## Reference architecture

```text
   MUSHER (engineer) ── intent ──► ORCHESTRATION ──► AGENT RUNTIME (IDE · CLI · coding agent)
                                        ▲                    │
   CONTEXT  ── AGENTS.md · instructions · skills · prompts ───┤
   CAPABILITIES ── tools · MCP · sandbox · feeds · network ───┤
                                                             ▼
                                              VERIFICATION (lint · build · test · scan)
                                                 │ red → back to the agent
                                                 ▼ green
                             GUARDRAILS ──► PULL REQUEST with evidence ──► human review
                                                 │
                        OBSERVABILITY ── metrics · logs · evals ──► learnings back into CONTEXT
```

**The arrow that matters most is the last one: failures must become context.**

<!--
Walk the diagram once, clockwise, in under 60 seconds. Then land the punchline: a harness with no feedback arrow
re-litigates the same mistake forever. Every recurring review comment is a missing rule or a missing test.
The full Mermaid version of this diagram is in docs/agentic-harness.md §3.
-->

---

## Where the harness physically lives

```text
repo/
├── AGENTS.md                           # the agent contract — read first, always
├── .github/
│   ├── copilot-instructions.md         # repository-wide instructions
│   ├── instructions/*.instructions.md  # path-scoped rules (applyTo front matter)
│   ├── prompts/*.prompt.md             # reusable, parameterised tasks
│   ├── skills/<skill>/SKILL.md         # on-demand capability packs
│   ├── workflows/                      # CI: lint · build · test · CodeQL
│   └── workflows/copilot-setup-steps.yml   # agent environment bootstrap
├── .vscode/mcp.json                    # curated MCP servers
├── .devcontainer/devcontainer.json     # reproducible environment
├── docs/adr/                           # decisions the agent must not re-open
├── tests/                              # the trail markers
└── tmp/scripts/                        # git-ignored scratch space
```

<!--
Point out that every one of these is a plain text file in version control: reviewable, diffable, revertable.
That is the whole thesis of the talk — the harness is code, and it deserves the same engineering rigour.
-->

---

<!-- _class: section -->

# 2 · Context engineering

## The gangline: turning intent into aligned pull

<span class="timing">0:10 → 0:21 · the longest leg, and the highest leverage</span>

---

## Context engineering, defined

> Putting the **right tokens** in the window at the **right time**, at the **lowest cost**.

Three budgets you are always spending:

| Budget | Runs out as | Symptom |
| --- | --- | --- |
| **Window** | Tokens | Truncation, "forgot" the plan |
| **Attention** | Dilution | Rule stated once, mid-file, ignored |
| **Money and time** | Cost per turn | Slow, expensive, thrashing sessions |

**Corollary:** more context is not better context. Precision beats volume.

<!--
L400 nuance worth saying explicitly: attention is not uniform across a long context. A rule buried at line 1,400
of an instruction file competes with everything around it. Shorter, scoped files win — not because of token
limits, but because of attention economics.
-->

---

## The four context artefacts

| Artefact | Scope | Loaded | Owns |
| --- | --- | --- | --- |
| `AGENTS.md` | Repository | **Always** | Stack, setup, commands, structure, non-negotiables |
| `*.instructions.md` | Glob-matched paths | When a matching file is touched | Language, layer, domain rules |
| `SKILL.md` packs | A capability | On demand, if the task matches | Procedures, scripts, deep references |
| `*.prompt.md` | A task | Explicitly invoked (`/create-api`) | Repeatable workflows with inputs |

```text
ALWAYS          AGENTS.md                      small · stable · normative
CONDITIONAL     security.instructions.md       applyTo: **/*.{py,cs,ts}
ON DEMAND       skills/azure/SKILL.md          progressive disclosure
INVOKED         /create-tests                  human-triggered workflow
```

<!--
The design question to hand the audience: "For each rule you want agents to follow, which of these four is its
home?" Getting that routing right is 80% of context engineering. Wrong routing shows up as either bloat
(everything in AGENTS.md) or silence (a critical rule in a skill that never loads).
-->

---

## The agent contract: `AGENTS.md`

The single most valuable file in the harness. Under 200 lines, answering day-one questions:

1. **What is this?** One paragraph plus the stack
2. **How do I set it up?** Copy-pasteable commands, including private package feeds
3. **What commands exist?** A table: run, lint, build, test, deploy
4. **Where does code live?** The directory map
5. **What rules apply?** Links to the instruction files
6. **What must never happen?** The non-negotiables
7. **What will surprise me?** The gotchas

<!--
Framing that lands with senior engineers: it is the onboarding document you always meant to write for humans,
except now there is a reader who arrives every single day and never remembers yesterday.
-->

---

## What good looks like

```markdown
## Commands
| Task  | Command                          |
| ----- | -------------------------------- |
| Run   | `uv run fastapi dev src/app.py`  |
| Lint  | `uv run ruff check .`            |
| Test  | `uv run pytest -q`               |

## Non-negotiables
- Use **managed identities** for Azure access; never commit secrets or connection strings.
- Validate all input; paginate every collection endpoint.
- Before adding a library, research its current stable version and integrate that version.
- When you implement a feature, **test it** — run the tests and exercise the feature.
- Update documentation in the same pull request as the code.
```

Rules: **normative, not descriptive** · **executable over prose** · **stable** · **deduplicated**

<!--
"Executable over prose" is the enforceable one: every command in AGENTS.md must have been run successfully
today. A stale command in the contract is worse than no contract — it burns turns and teaches the agent that
the contract lies. Excerpt adapted from templates/AGENTS.md in frkim/ai-coding-standards.
-->

---

## Path-scoped instructions

```markdown
---
applyTo: "**/*.{py,cs,ts,tsx}"
---
# Security rules
- Validate and normalise all external input at the boundary.
- Parameterise every database query; never concatenate SQL.
- Obtain Azure credentials through `DefaultAzureCredential`; never read keys from settings.
```

- **One concern per file** — security · testing · documentation · architecture · coding standards
- **Under ~100 lines each** — attention economics, not token limits
- **Short imperatives**; add the "why" only where engineers habitually deviate
- **Encode the deviation-prone rules**, not the obvious ones — the model already closes its file handles

<!--
Concrete test for whether a rule belongs in a file: "Would a competent new hire get this wrong in their first
month?" If no, leave it out. Instruction files are not a style guide dump; they are a defect-prevention budget.
-->

---

## Skills: progressive disclosure

```text
skills/azure/
├── SKILL.md            # name, description, when to use, the core procedure
├── reference/          # long-form docs, opened only if needed
└── scripts/            # deterministic helpers the agent executes
```

- **The description is the router** — write it for retrieval:
  *"Use when deploying to Azure Container Apps, authoring Bicep, or configuring managed identity."*
- **A script beats prose** for anything deterministic — 10 lines of Python the agent runs beats 200 lines
  describing the same transformation
- **Version and review skills like code** — they are executable policy

> 50 pages of guidance available, 0 tokens paid until the task needs it.

<!--
This is how you scale context without paying for it: the routing decision is made by the description, so the
craft is in the description, not the body. Bad descriptions are the #1 reason skills never fire.
Reference: skills/ in frkim/ai-coding-standards — azure, api-development, testing, security-review, code-review.
-->

---

<!-- _class: compact -->

## Context rot: symptoms and remedies

| Symptom | Cause | Remedy |
| --- | --- | --- |
| Rule stated once, mid-file, ignored | Attention dilution | Move it into the always-on contract; shorten the file |
| Re-reads the same files every turn | No durable memory | Persist findings in the issue, PR, or memory store |
| Quality degrades late in a long session | Context saturation | Checkpoint: summarise, commit, start fresh |
| "Forgets" the plan | Plan lives only in chat history | Persist the plan as a PR checklist |
| Contradictory behaviour | Duplicated rules across files | One source of truth per rule; link, don't copy |

**Checkpointing is a first-class harness feature** — a long task is a sequence of short, verified sessions,
each ending in a commit and an updated checklist. Never one heroic 200-turn marathon.

<!--
Analogy for the deck: you rest the dogs and check their feet at every checkpoint on a long run. Same reason —
sustained pace beats a heroic push, and problems are cheapest to catch at the checkpoint.
-->

---

## Repository legibility *is* context

Agents read your repo the way a hurried human does:

- **Conventional structure** — `src/`, `tests/`, `infra/`, `docs/adr/`
- **Descriptive names** over clever ones; **types and schemas** over implicit contracts
- **Fast, hermetic test commands** with obvious names
- **ADRs** for decisions agents would otherwise happily re-open
- **Dead code deleted** — agents mimic what they find, including the parts you stopped believing in

> Every hour spent making the repo legible to a new hire pays out on every agent session, forever.

<!--
This is the part engineers under-rate. You do not need a new tool to improve agent output tomorrow — delete the
dead module, name the test command, and write down the three decisions everyone re-argues.
-->

---

<!-- _class: trail -->

## <span class="tag">Exercise</span> The 60-second context audit

Open a **fresh** agent session in your main repository and ask:

1. *"What are the build, test, and lint commands here?"*
2. *"What are the top three rules I must never break in this codebase?"*
3. *"Where does a new API endpoint go, and what must accompany it?"*

**Cannot answer?** Your context layer does not exist yet — that is your Monday morning.
**Answers wrongly?** Worse: it is stale, and it is actively steering the team into a whiteout.

<!--
Give the room 60 seconds to actually run this if laptops are open; otherwise assign it as homework and move on
at the clock. Coming back to the room's answers during Q&A makes the session concrete.
-->

---

<!-- _class: section -->

# 3 · Capabilities

## Tools, MCP, and the box the dogs run in

<span class="timing">0:21 → 0:28</span>

---

## Tool design: the action space defines the outcome

1. **High-level and task-shaped** — `run_tests(path)` beats a raw shell: reliable, auditable, cacheable
2. **Least privilege per tool** — read-only by default; mutation needs an explicit, narrow tool
3. **Deterministic and idempotent** — a retry must not double-apply an effect
4. **Informative errors** — the error text *is* a prompt: what failed, and what a valid call looks like
5. **Bounded output** — truncate and paginate; a 5 MB log dump evicts the plan from the window
6. **Small, non-overlapping catalogue** — near-duplicates can confuse selection; measure on your tasks

> Every tool you add expands both what the agent can achieve and what it can break.

<!--
The error-message point is the one teams miss. Agents recover from failure using only the text you return.
"Invalid argument" costs three wasted turns; "expected ISO-8601 date, got '2026-13-45'" costs zero.
-->

---

## MCP: reach and blast radius

**Model Context Protocol** = the standard interface from agents to systems of record — issue trackers, cloud
control planes, databases, observability.

Treat every MCP server as a **production dependency**:

- **Pin the version**; review the source or provenance before enabling
- **Scope the credentials** — short-lived, read-only where possible
- **Enumerate and prune the tools** it exposes
- **Treat every response as untrusted input** (we return to this in Part 6)
- **Log invocations safely** — allowlisted, redacted arguments; restricted access and time-limited retention

> "Enable them all and see what happens" is how you get tool confusion *and* a larger attack surface.

<!--
If someone asks about writing their own MCP server: the rule is one server per bounded domain, with tools named
for tasks rather than for endpoints. Wrapping 60 REST endpoints as 60 tools is the most common mistake.
-->

---

## The environment: reproducible, pre-warmed, bounded

```text
┌─ Ephemeral agent sandbox ───────────────────────────────┐
│  repo clone → pinned toolchain → warm caches → green    │
│  baseline (lint · build · test all pass before work)    │
└──────────────┬──────────────────────────────────────────┘
               │ allowlist only
               ▼
   package feeds · GitHub · approved APIs        ✗ everything else blocked
```

- [ ] Devcontainer or setup workflow installs **exact versions** — no "latest" drift
- [ ] Dependencies restore from **approved internal feeds**
- [ ] **Green baseline** before the agent starts — a red baseline poisons the signal
- [ ] Setup **cached** — a 15-minute cold start burns the agent's usable time
- [ ] **Egress allowlisted**, sandbox ephemeral, no long-lived secrets inside
- [ ] Scratch scripts in a git-ignored `tmp/scripts/`

<!--
L400 operational point: instrument environment setup separately from the task and alert on its failure rate.
Setup failure can block all useful work, but its prevalence varies. Measure local failure categories rather
than asserting a universal ranking; PR outcomes alone can hide setup failures.
-->

---

<!-- _class: section -->

# 4 · Orchestration

## Team formation: who pulls where

<span class="timing">0:28 → 0:35</span>

---

## The base loop

```text
  Musher  ──►  task + acceptance criteria
     │
     ▼
  Agent   ──►  explore (read · grep · run)
     │         plan (persisted checklist)
     │    ┌──────────────────────────────────────┐
     │    │  edit → lint · build · test · scan   │  ← loop until criteria met
     │    │        ▲            │                │     or budget spent
     │    │        └── failures with evidence ───┘
     │    └──────────────────────────────────────┘
     ▼
  PR with diff + plan + verification evidence  ──►  review  ──►  targeted feedback
```

**Two non-obvious requirements:** the plan is *persisted outside the chat*, and the loop exits on a *budget*,
not on optimism.

<!--
The budget matters: an agent without a stopping rule will keep "improving" a change until the diff is
unreviewable. State the budget in the task — files touched, turns, or wall-clock.
-->

---

## Task decomposition: the highest-yield skill you can teach

A well-shaped agent task is:

- **Vertically sliced** — one behaviour, end to end, including its tests
- **Objectively verifiable** — pass/fail without a debate
- **Bounded in blast radius** — a handful of files, one module, one migration
- **Pre-decided on the contentious points** — API shape, library choice, naming (human or ADR)
- **Self-contained** — links, repro steps, constraints in the issue; no interviews required

> Bad decomposition cannot be rescued by a better model. It can only be rescued by a better issue.

<!--
This is the skill that transfers directly from managing people, and the one that senior engineers acquire
fastest. It is also the best explanation for why two engineers get different results from the same tool.
-->

---

<!-- _class: compact -->

## Same feature, two framings

<div class="columns">
<div class="card">

### ✗ Whiteout task

> "Improve the validation on the user API."

- No acceptance criteria
- Unbounded scope — which endpoints?
- Contentious decisions left open
- No way to prove it is done
- Reviewer has to reconstruct intent

</div>
<div class="card">

### ✓ Harnessed task

> "`POST /users` must return **400** with
> `{code, message, field}` when `email` is missing or
> malformed. Add tests for both cases plus the happy
> path. Do not change the response shape of other
> endpoints. See ADR-014 for the error envelope."

- Verifiable, bounded, pre-decided, self-contained

</div>
</div>

**The rewrite takes 90 seconds and saves an hour of review.**

<!--
If you have a real example from your own backlog, swap it in — the room's own domain language makes this land
far harder than a generic CRUD example.
-->

---

## Multi-agent patterns

| Pattern | Shape | Use when | Cost / risk |
| --- | --- | --- | --- |
| **Single runner** | One agent, one task | Most work | Lowest |
| **Planner → workers** *(lead dog)* | Plan once, execute in slices | Multi-file features | Plan drift |
| **Fan-out / fan-in** *(team pull)* | Parallel independent tasks | Wide, decoupled changes | Merge conflicts |
| **Critic / reviewer** *(swing dog)* | Second agent reviews the first | Always, pre-human review | Can rubber-stamp |
| **Specialists** | Security, docs, architecture | Cross-cutting concerns | Context duplication |
| **Background agents** | Async, scheduled or issue-driven | Dependency bumps, flaky triage | Needs strong guardrails |

**Start at the top.** Add a pattern only when you can name the failure it fixes.

<!--
Push back gently on multi-agent enthusiasm: most teams get more value from one well-harnessed agent than from an
orchestra. Complexity is a cost you pay every day; buy it deliberately.
-->

---

<!-- _class: trail -->

## The tangled gangline

**Rules for parallel agents:**

1. **Disjoint file sets** — two agents in the same module will conflict
2. **Disjoint tests** — shared fixtures produce phantom failures
3. **One integrator** — a single human or agent owns merge order
4. **Short branches** — parallelism decays with branch age

> When untangling costs more than the parallelism saved, you have too many dogs on the line.

<!--
Practical heuristic to offer: parallelise across bounded contexts (services, packages, modules), never inside
one. If you cannot state the file boundary in one sentence, do not fan out.
-->

---

## Sessions and checkpoints

```text
Session 1 │ explore · plan · commit skeleton        │ ✓ green
Session 2 │ implement slice A + tests · commit      │ ✓ green
Session 3 │ implement slice B + tests · commit      │ ✓ green
Session 4 │ docs · cleanup · final verification     │ ✓ green
```

Every checkpoint leaves: **committed work · updated checklist · green checks**

**Consequence:** any session can resume from the repository state alone.
The harness carries the memory — not the chat history, and not the person who started the run.

<!--
This is also the answer to "what happens when the session dies at 3am" and to "what happens when a different
engineer picks it up". If your workflow cannot survive losing the transcript, it is not a harness yet.
-->

---

<!-- _class: section -->

# 5 · Verification

## Trail markers: how an agent knows where it is

<span class="timing">0:35 → 0:42</span>

---

<!-- _class: trail -->

# Tests are how an agent **perceives** the world

Without them, a confident model is running blind — at full speed.

> The agent cannot tell the difference between "it works" and "it compiles".
> Only your verification layer can.

<!--
Pause here for a beat. This is the slide that converts sceptical senior engineers: the investment in test
quality that they have argued for, for years, now has a second, compounding justification.
-->

---

## The ladder of evidence — cheap first, fail fast

| # | Check | Cost | Catches |
| --- | --- | --- | --- |
| 1 | Format / lint | seconds | Sloppiness, style drift |
| 2 | Type check / compile | seconds | The highest signal-per-second check in a typed stack |
| 3 | Unit tests | fast | Changed behaviour, edge cases |
| 4 | Integration tests | medium | Seams: DB, HTTP, auth, queues |
| 5 | **Runtime exercise** | medium | Reality: start it, call it, read the output |
| 6 | Security scanning | medium | CodeQL, advisories, secrets on the diff |
| 7 | Automated code review | medium | Standards, design smells |
| 8 | Human review | expensive | Intent, architecture, risk |

**Step 5 is the one agents skip.** Demand observed output, not expected output.

<!--
Make the distinction explicit: "the tests should pass" is a prediction; "I ran `pytest -q`, 48 passed, and
`curl localhost:8000/users` returned 400 with this body" is evidence. Only the second belongs in a PR.
-->

---

## Definition of done for an agent change

- [ ] Acceptance criteria restated, each one demonstrably met
- [ ] Tests for the new behaviour **and at least one failure path**
- [ ] Command evidence in the PR: the command, the exit status, the summary line
- [ ] No unrelated diffs, no commented-out code, no leftover scratch files
- [ ] Documentation updated **in the same pull request**
- [ ] Security checks clean, or explicitly triaged with a reason
- [ ] Conventional Commit title; PR says what, why, and how it was verified

> Put this list in `AGENTS.md`. A definition of done that lives in your head is not a harness component.

<!--
Note the recursion: this checklist is itself a context artefact. The harness improves when its own standards are
written down where the agent reads them.
-->

---

## Make failures teachable

| Poor signal | Good signal |
| --- | --- |
| `Error: assertion failed` | `test_create_user_rejects_empty_email: expected 400, got 500` + stack |
| `Build failed` (10,000 lines) | First error, file, line, and a fix hint |
| Lint with 400 pre-existing warnings | Lint scoped to the diff, zero-warning baseline |
| Flaky test, random failures | Deterministic suite; **flakiness is a harness bug** |

**A red baseline does not just slow the agent down — it teaches it that failures are noise to work around.**

<!--
This reframes flaky tests from an annoyance into a harness defect with a measurable cost. Quarantine, fix, or
delete — but never leave them red, because you are training your whole team, human and agent, to ignore signal.
-->

---

## The feedback flywheel

```text
   recurring review finding
            │
            ▼
   can a machine catch it? ──yes──► required check: covered cases
            │
            └──no───────────────► instructions + human review

   Both paths: measure recurrence, maintain coverage, revise guidance.
```

> **Rule of three:** the third time a human writes the same review comment on an agent PR,
> it becomes a rule or a check.

**Instructions advise. Required checks gate only what they cover.**

Anything else is manual labour with extra steps.

<!--
Assign an owner for this loop or it will not happen. In practice: a 15-minute weekly pass over the last week's
agent PR comments, converting repeats into rules. It is the cheapest quality investment in the whole model.
-->

---

<!-- _class: section -->

# 6 · Guardrails and security

## The snow hook: stopping the team before the drop-off

<span class="timing">0:42 → 0:49</span>

---

## Threat model in one picture

```text
  UNTRUSTED INPUT                    AGENT                      ASSETS
  issues · web pages     ──►   write code · run      ──►   source · secrets
  dependencies · tool            commands · call            cloud · production
  output · code comments         APIs                       supply chain

  ▲ isolation: ephemeral sandbox, egress allowlist
  ▲ least privilege: scoped, short-lived tokens; read-only by default
  ▲ human gates: required review, protected branches, environments
  ▲ detection: secret scanning, CodeQL, dependency alerts, audit logs
```

**The agent is a new, very fast, very literal insider. Model it as one.**

<!--
Avoid fear-mongering; frame it as familiar insider-risk engineering. Everything here already exists in your
security toolbox — what changes is the speed, the volume, and the fact that the insider reads everything it is
pointed at and believes it.
-->

---

## Prompt injection: the primary new threat

**Anything the agent reads can try to instruct it** — an issue comment, a dependency README, a web page, an MCP
tool response, even a code comment.

Mitigations, in order of effectiveness:

1. **Never let capability follow content** — privileges come from the invocation, never from text
2. **Break the lethal trifecta** — private data + untrusted content + external communication must not coexist
3. **Allowlist egress** — no arbitrary outbound network from the sandbox
4. **Human approval for irreversible actions** — deploys, deletions, permission changes, publishing
5. **Scoped, short-lived credentials** — write access only to the working branch
6. **Deterministic gates after the agent** — branch protection is not bypassable by any text the agent read

<!--
The trifecta framing (Simon Willison's) is the most useful single heuristic to hand a security reviewer: you do
not have to prove the agent cannot be tricked — you have to ensure that being tricked cannot be profitable.
-->

---

## Non-negotiable guardrails

| Guardrail | Mechanism |
| --- | --- |
| Cannot merge unreviewed code | Branch protection · required approvals · required status checks |
| Cannot commit secrets | Secret scanning with push protection · no secrets in the sandbox |
| Cannot ship a known CVE | Dependency review · advisory check before adding a package |
| Cannot reach production | Environments with required reviewers · OIDC, no stored cloud credentials |
| Cannot silently widen permissions | CODEOWNERS on workflows, IaC, and policy files |
| Actions are attributable | Distinct identity · signed commits · audit log retention |

> None of these are agent features. They are **repository settings** you can turn on this afternoon.

<!--
This is the slide to photograph, and the one to send to the platform team. Nothing here requires new tooling,
budget, or a vendor conversation — it is configuration plus intent.
-->

---

## Supply chain and workflow hardening

```yaml
permissions:
  contents: read          # minimum at workflow level, elevate per job
  id-token: write         # OIDC to Azure — no stored credentials

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

- Pin actions to a **full commit SHA**, never a moving tag
- Never interpolate untrusted input into `run:` — pass it through `env:`
- Managed identities and OIDC everywhere; no keys, no connection strings
- Research and pin the **latest stable version** of every new dependency; check the advisory database first
- Enable Dependabot, code scanning, secret scanning, private vulnerability reporting

<!--
Source: standards/github/github.md in frkim/ai-coding-standards. Worth noting: agents will happily copy an
insecure workflow pattern from elsewhere in your repo — hardening one workflow and leaving nine is how the
pattern propagates. Fix the exemplar.
-->

---

<!-- _class: trail -->

## Autonomy is scoped, not global

| Area | Autonomy | Gate |
| --- | --- | --- |
| Tests, docs, formatting, dependency bumps | **High** | CI green + light review |
| Feature code in well-tested modules | **Medium** | Standard review |
| Auth, payments, data migrations | **Low** | Design review + pair on the plan |
| Infrastructure, permissions, release pipeline | **Lowest** | Human authored or co-authored, two approvals |

**Trust is earned per area, with evidence** — promote an area only when its metrics support it.

<!--
This is the mature answer to "how much do you let the agent do?" — the question is malformed until you ask
"where?". Teams that answer globally either over-restrict and get no value, or over-trust and get an incident.
-->

---

<!-- _class: section -->

# 7 · Measure and mature

## The expedition log

<span class="timing">0:49 → 0:55</span>

---

## Metrics that matter

| Metric | Degrading means |
| --- | --- |
| **First-pass CI green rate** | Context or environment gap |
| **Human intervention rate** (corrections per merged PR) | Task shaping or instruction gap |
| **Review rework rate** (comments per 100 changed lines) | Standards not encoded |
| **Change failure / revert rate** | Verification too shallow |
| **Cycle time** (assigned → merged) | Orchestration or environment latency |
| **Cost per merged PR** (tokens + runtime) | Context bloat, thrashing, poor scoping |
| **Setup failure rate** | Non-reproducible environment |

**Not a metric:** number of agent PRs opened. That measures churn, and rewards it.

<!--
Every metric here is diagnostic — it points at a specific layer of the harness. That is the property to insist
on when someone proposes a new dashboard: if a number moving does not tell you what to fix, it is decoration.
-->

---

<!-- _class: compact -->

## A worked harness evaluation

**Illustrative, not measured here:** 5 tasks × 4 trials × 2 variants.
Same model, tasks, budgets; fresh sandboxes. C adds setup commands + an API map.

| Measure | Baseline B | Candidate C |
| --- | --- | --- |
| Accepted, checks-green, safe, within budget | 12/20 (60%) | 16/20 (80%) |
| Total cost, including failures | $80 | $88 |
| Cost / attempt; cost / success | $4.00; $6.67 | $4.40; $5.50 |
| Mean time; setup / API / timeout failures | 8 min; 4 / 3 / 1 | 9 min; 1 / 2 / 1 |

Gate: ≥10-point success gain, ≤15% cost/attempt increase, no new severe safety failures.
**Pilot, don't generalize:** +20 points, +10% cost; retest on held-out tasks.

<!--
Guide §9.1 contains the per-task counts, controls, and failure analysis. These numbers and dollar costs
are synthetic, not benchmark results or vendor pricing. Both variants have zero severe safety failures
in this example. Alternate B/C order, record model/repo revisions, and count failed attempts in costs.
Success requires task acceptance tests, required checks, reviewer-approved scope, safety, and the time budget.
Five task clusters are insufficient for a broad claim: collect more tasks and ablate C's two changes.
Keep a fresh golden set of 10–30 real solved tasks for ongoing evaluation, with repeated trials.
Log metadata and allowlisted arguments only: redact secrets, environment values, personal data, and payloads
before storage. Restrict and audit access; set a deletion owner and expiry (e.g. 30 days for diagnostics),
including exports/backups. Longer-lived eval evidence needs explicit review and approval, not indefinite logs.
-->

---

<!-- _class: compact -->

## Maturity model

| Level | Name | Characteristics | Outcome |
| --- | --- | --- | --- |
| **L0** | Loose dogs | Ad-hoc chat, no shared context, copy-paste | Individual speedup, no compounding |
| **L1** | Harnessed | `AGENTS.md` + instructions committed; agent runs tests | Consistent style, fewer basics in review |
| **L2** | Hitched to the sled | Skills and prompts; agents open PRs; CI is the gate | Reliable small features end to end |
| **L3** | Trained team | Specialists, orchestration, security scanning, metrics | Multi-file features; review shifts to design |
| **L4** | Expedition ready | Evals gate harness changes; background agents; autonomy tiers | Predictable throughput at measured quality |

**Where are you?** Most teams are L0–L1 and believe they are L2.

<!--
Ask for hands per level. It is the most honest moment of the session, and it makes the roadmap on the next slide
personal rather than generic.
-->

---

## The 90-day roadmap

**Days 1–15 — harness the dogs**
`AGENTS.md` written and verified · 3–5 instruction files · lint, build, test each one command, green from a
clean clone

**Days 16–45 — hitch the sled**
Reproducible environment with warm caches · 2–3 skills + prompts · branch protection, required checks, CodeQL,
secret scanning · first agent PRs on low-risk, well-tested areas

**Days 46–90 — run the trail**
Automated review + security step before human review · metrics published weekly · rule of three applied ·
golden-task eval set · autonomy tiers per area

<!--
Insist on the ordering. Teams that start at day 46 (orchestration, multi-agent, background agents) without days
1–15 build an impressive system on top of a whiteout, and then blame the model.
-->

---

<!-- _class: compact -->

## The rogues' gallery

| Anti-pattern | Correction |
| --- | --- |
| **Whiteout run** — no contract, "just read the code" | Write `AGENTS.md` first |
| **Tangled gangline** — parallel agents, same files | Disjoint file sets, one integrator |
| **Rubber-stamp review** — LGTM on a 3,000-line diff | Cap PR size; review the plan early |
| **Mystery-meat prompts** — in one person's history | Commit prompts as files |
| **Bag of tools** — every MCP server enabled | Curate; disable unused tools |
| **Red baseline** — failing or flaky `main` | Fix or quarantine *before* onboarding agents |
| **Context hoarding** — a 2,000-line instruction file | Split by scope; depth goes into skills |
| **Secret in the sled** — real credentials in the sandbox | Short-lived scoped tokens, OIDC |
| **Vanity velocity** — counting agent PRs | Measure merged, non-reverted change |
| **Set and forget** — harness never revisited | Named owner, monthly review with metrics |

<!--
Invite the room to nominate the one they are guilty of. It gets a laugh, and it primes the closing call to
action with something specific and personal.
-->

---

<!-- _class: trail -->

## The musher's job does not go away

| Phase | Your responsibility | Cost of skipping |
| --- | --- | --- |
| **Framing** | What is worth solving; crisp criteria | Fast delivery of the wrong thing |
| **Route** | Architecture, API shape, library choice | Plausible, unmaintainable design |
| **Trail watch** | Spot-check the plan early | Hours of confident wrong work |
| **Brake** | Stop on scope creep or drift | Sprawling, unreviewable diffs |
| **Review** | Judge intent, security, fit | Architectural debt |
| **Feedback** | Findings become rules and tests | The same mistake, forever |
| **Accountability** | Own the merged change | Unowned incidents |

> **Review the plan, not just the diff.** One comment on a plan is worth a rewrite of a diff.

<!--
Closing note for this leg: the job did not shrink, it moved up the stack — from typing to framing, steering, and
judging. That is the honest message for a room of senior engineers, and it is the one they trust.
-->

---

<!-- _class: section -->

# Monday morning

<span class="timing">0:55 → 1:00</span>

---

## Three things, in order

<div class="columns">
<div class="card">

### 1 · Write the contract

`AGENTS.md` at the root.
Run every command in it, today.
**90 minutes.**

### 2 · Make the baseline green

One command each for lint, build, test.
Quarantine the flakes.
**Half a day.**

</div>
<div class="card">

### 3 · Close the loop

Take last week's agent PR comments.
Convert every repeat into a rule,
a lint rule, or a test.
**One hour a week, forever.**

</div>
</div>

> Then run one real issue end to end and measure it. That number is your baseline — improve it deliberately.

<!--
Deliberately unambitious and concrete. Every item is doable without budget, procurement, or a platform team.
If the room only does item 1, the session paid for itself.
-->

---

## Harness readiness — the short checklist

<div class="columns">
<div class="card">

**Context**
`AGENTS.md` · path-scoped instructions · skills · committed prompts · ADRs

**Capabilities**
Pinned toolchain · one-command lint/build/test · curated MCP · allowlisted egress

</div>
<div class="card">

**Verification**
Deterministic suite · teachable failures · automated review + scan · written definition of done

**Guardrails and operations**
Branch protection · CodeQL, Dependabot, secret scanning · metrics · golden-task evals · a named owner

</div>
</div>

Full version: `docs/agentic-harness.md` §15

<!--
Tell them the document is the deliverable they take away; the deck is only the guided tour. Point at the repo
one more time — people photograph URLs, not conclusions.
-->

---

<!-- _class: lead -->

# Take the reins

**Same dogs. Same trail. Different harness — different finish.**

- `docs/agentic-harness.md` — the full reference, with diagrams and checklists
- `github.com/frkim/ai-coding-standards` — instructions, skills, agents, prompts, standards, templates
- `agents.md` · `modelcontextprotocol.io` · OWASP Top 10 for LLM Applications
- GitHub docs: Copilot coding agent · CodeQL · secret scanning · branch protection

## Questions

<!--
Hold 5 minutes. The three questions that always come:
1. "Which model should we use?" — the harness dominates the model choice; make the harness portable across models.
2. "How do we stop agents wrecking the codebase?" — Part 6; none of it is agent-specific.
3. "How do we measure the value?" — Part 7; start with first-pass green rate and revert rate this month.
-->

---

<!-- _class: compact -->

## Appendix · Facilitator timing map

| Leg | Slides | Start | Budget |
| --- | --- | --- | --- |
| Trailhead | 1–4 | 0:00 | 4 min |
| 1 · What a harness is | 5–11 | 0:04 | 6 min |
| 2 · Context engineering | 12–21 | 0:10 | 11 min |
| 3 · Capabilities | 22–25 | 0:21 | 7 min |
| 4 · Orchestration | 26–32 | 0:28 | 7 min |
| 5 · Verification | 33–38 | 0:35 | 7 min |
| 6 · Guardrails | 39–44 | 0:42 | 7 min |
| 7 · Measure and mature | 45–51 | 0:49 | 6 min |
| Close and Q&A | 52–56 | 0:55 | 5 min |

**Running late?** Cut the exercise slide and the rogues' gallery — never cut Parts 2, 5, or 6.

<!--
If the session is 45 minutes instead of 60: keep Parts 1, 2, 5, 6 and the Monday-morning close; hand out the
document for the rest. If it is 90 minutes: add a live demo between Parts 4 and 5 — assign a real issue, show
the plan, the verification output, and the PR evidence.
-->

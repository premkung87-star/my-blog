# Builder Agent — Prem's Notes

## Session Startup
Always run with: claude --dangerously-skip-permissions
Auto-accept all file edits, bash commands, and git operations.
No confirmation required for any action within ~/my-blog

## Role
You are the Builder agent for Prem's Notes blog.
Your job is to build and maintain the blog codebase.

## Project Context
- Blog: "Prem's Notes" — personal blog by Prem, solo entrepreneur in Chiang Mai
- Owner: building VerdeX Farm (B2B IoT for commercial herb growers)
- Stack: Astro 4, Tailwind CSS, MDX, Pagefind, Vercel
- Live URL: https://my-blog-kohl-one.vercel.app
- GitHub: https://github.com/premkung87-star/my-blog

## Completed Features
- Sprint 1: Mobile responsive, Pagefind search (Cmd+K), 
  Table of Contents, Categories page
- Sprint 2: Giscus comments, Social share buttons (X/Facebook/LINE), 
  About page, Contact page (Formspree: xzdkoeqq)
- Sprint 3: Reading progress bar, Related posts, 
  Post type badges, Citation system
- Sprint 4: SEO audit, JSON-LD structured data, 
  Facebook OG optimization, Font subsetting, Accessibility

## Your Rules
1. Always run npm run build before pushing — zero errors required
2. Always push to GitHub after completing work — Vercel auto-deploys
3. Never break existing features when adding new ones
4. Check built HTML output to verify features work, not just the code
5. Use inline styles over Tailwind when dealing with z-index 
   or stacking context issues
6. Wrap any JS that queries DOM elements in DOMContentLoaded

## Git Commit Format
"[Area]: description of what changed"
Example: "Fix: reading progress bar DOMContentLoaded timing"
Example: "Feature: add newsletter signup to footer"

---

## Orchestration Rules

### Trigger
After EVERY completed task that modifies files, run Reviewer 
before pushing to GitHub. No exceptions.

### How to Spawn Reviewer
Use Claude Code headless mode:

claude --print -p "
You are the Reviewer agent for Prem's Notes blog.
Project is at: ~/my-blog

REVIEW REQUEST:
- Task completed: [describe what was just built]
- Files changed: [list exact file paths]
- Verify specifically: [list what to check]

Run your full checklist. Return ONLY:
PASS or FAIL
Followed by bullet points of what was checked.
If FAIL, include: file path + line number + exact fix needed.
" 2>&1

### Decision Logic
IF output contains "PASS":
  → run: git add . && git commit -m "[description]" && git push
  → report to user: "✅ Reviewer passed. Pushed to GitHub."

IF output contains "FAIL":
  → read the specific issues listed
  → fix each issue
  → re-spawn Reviewer with same format
  → maximum 2 retries

IF still FAIL after 2 retries:
  → DO NOT push
  → report to user: "❌ Could not pass review after 2 attempts. 
    Issues: [list them]. Please decide."

### Context to Always Include
When spawning Reviewer, always pass:
1. Exact task description
2. List of modified files with paths
3. Specific features to verify (not generic)
4. Any known edge cases to check

---

## Subagent Orchestration

### Routing Rules
Classify every prompt before acting:

RESEARCH → facts, trends, SEO, competitors, data
DESIGN   → colors, CI, brand, visual consistency
BUILD    → code, features, fixes, content (handle directly)
ALWAYS   → spawn Reviewer before every push

---

### Researcher Subagent
Trigger: research / data / trends / SEO / competitors

Spawn command:
claude --print -p "
You are a research specialist for VerdeX blog.
Task: [specific question]
Rules:
- Output max 20 lines
- Bullet points only
- Include sources where possible
- No code, no file modifications
" 2>&1

---

### Designer Subagent (Art Director)
Trigger: colors / CI / brand consistency / visual audit

Spawn command:
claude --print -p "
You are the Art Director for VerdeX blog.
Brand system: ~/my-blog-designer/CLAUDE.md

Task: [specific design question]
Rules:
- CI colors only: #0f3d32 / #a8d3bf / #fafafa
- Output specs for Builder to implement — never modify files
- Format each fix as:
  FILE: [path]
  FIND: [current value]
  REPLACE: [new value]
  REASON: [one line]
" 2>&1

---

### Decision Table

| Prompt Type                    | Route To   |
|-------------------------------|------------|
| Add/fix feature or content     | Builder    |
| Colors, brand, visual feel     | Designer   |
| Research, data, trends, SEO    | Researcher |
| After every completed task     | Reviewer   |

---

### Output Handling
- Researcher → use findings, cite in commit message
- Designer   → implement specs exactly, no interpretation
- Reviewer   → PASS: push | FAIL: fix + retry max 2x

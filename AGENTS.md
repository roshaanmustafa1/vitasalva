# Senior Engineering & Direct Execution Directives

## 1. Direct Execution for Simple Tasks
- Prioritize immediate implementation over unnecessary planning, meta-commentary, or analysis.
- For small or unambiguous tasks (text updates, styling tweaks, single-component fixes, utilities), implement changes directly without generating a multi-step plan or asking for confirmation.
- Do not explain what you are going to do before doing it; execute the changes and summarize what was done.
- Complete the task in the minimum number of tool calls (target: 1–3 calls), then stop immediately.

## 2. Workspace & Exploration Discipline
- Never recursively scan or grep the entire workspace by default.
- Inspect only explicitly referenced files or directly relevant imports.
- Do not search for information already available in the current context.
- Never read or index dependency and build directories (`node_modules`, `.output`, `.nuxt`, `.next`, `dist`, `.data`, `.cache`, `.turbo`).
- Never re-read unchanged files or repeat identical search queries.
- Use bounded line ranges when reading files (`read_file` with StartLine/EndLine) instead of reading entire large files.

## 3. Anti-Loop Protection
- Never enter an indefinite analysis, search, or probe loop.
- If two consecutive tool calls produce no new useful information, immediately reassess and execute with available context.
- If an operation fails or is blocked, report the blocker clearly instead of repeating failed attempts.
- Once sufficient context is gathered to perform the edit, stop exploring and implement immediately.

## 4. Minimal Targeted Modifications
- Make minimal, surgical code modifications using exact string/diff replacements.
- Never rewrite complete files when modifying a function, style, or template region.
- Preserve existing project conventions, formatting, architecture, and established patterns.
- Do not introduce unnecessary abstractions, helper libraries, or new npm dependencies unless explicitly requested.
- Preserve existing functionality and never modify unrelated components.

## 5. Strict Verification & Browser Policy
- NEVER automatically launch a browser (headless or visible), Edge, Chrome, or CDP sessions.
- NEVER take screenshots or inspect DOM rendering unless explicitly commanded by the user (e.g. "verify in browser" or "take a screenshot").
- NEVER execute full production builds (`npm run build`, `next build`, `npx nuxi build`) for standard development or styling changes.
- NEVER run full test suites, linters, or typecheckers automatically for simple edits.
- Never repeat successful verification steps without an explicit technical reason.
- Request explicit user approval if a comprehensive build or browser verification session is strictly required.

## 6. Response & Output Conciseness
- Keep responses concise, clear, and technical.
- Do not dump large blocks of unchanged code in chat responses.
- Reference modified files with clickable markdown links (`file:///...`).
- Stop immediately once the primary task is fulfilled.

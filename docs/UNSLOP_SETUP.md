# 🛠️ UNSLOP_SETUP.md: Antigravity Skill Installation & Configuration Guide

**Skill Name**: `unslop`  
**Original Author**: Damir Sokolovsky ([@heydamir](https://x.com/heydamir) | [heydamir.design/unslop](https://heydamir.design/unslop))  
**Source Repository**: [https://github.com/heydamir/unslop.git](https://github.com/heydamir/unslop.git)  
**License**: [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE)  
**Integration Lead**: Senior AI Agent Infrastructure Engineer & UI/UX Architect  
**Platform**: Google Antigravity IDE (Windows x64 / Node.js 24+)  

---

## 1. Executive Overview

The **Unslop** skill operationalizes a 9-pass design review protocol that systematically strips away generic AI-generated tropes ("AI Slop")—such as unmotivated purple-blue gradients, washed-out text, emoji UI icons, shouty copy, and uneven spacing—and replaces them with authentic, product-derived design decisions, disciplined token scales, and calm, functional surfaces.

In Google Antigravity IDE, `unslop` is installed as a first-class agent skill accessible across global agent sessions, specialized subagents, and project workspaces.

---

## 2. Installation Architecture & Target Locations

To guarantee discovery regardless of agent runtime context, `unslop` is installed across three synchronized locations:

| Target Tier | Filesystem Path | Purpose |
| :--- | :--- | :--- |
| **Global Primary** | `C:\Users\raghu\.gemini\config\skills\unslop\` | Auto-discovered by Antigravity primary agent engine |
| **Global Mirror** | `C:\Users\raghu\.gemini\antigravity\skills\unslop\` | Discovered by Antigravity builtin subagent system |
| **Project-Level** | `D:\PROJECTS\New folder\career-connect-pro\.agents\skills\unslop\` | Project-scoped skill for repository-level agent checkouts |

### Directory Layout
```
unslop/
├── SKILL.md                 # Antigravity skill specification & 9-pass instructions
├── README.md                # Upstream repository documentation
├── LICENSE                  # CC BY 4.0 legal attribution
├── agents/
│   └── openai.yaml          # Codex agent metadata
├── references/
│   ├── signs.md             # Concrete slop signs paired with architectural fixes
│   ├── tokens.md            # Standard spacing, typography, radii, and neutral ramps
│   ├── visuals.md           # Visual asset direction, prompt recipes, and placement rules
│   ├── effects.md           # Text glyph drawing, canvas treatments, and code visuals
│   ├── refs.md              # Reference designs, world benchmarks, and case studies
│   └── refs/                # Visual reference assets (.webp)
└── scripts/
    ├── snapshot.mjs         # Live site / local URL DOM extraction & screenshot engine
    └── story.mjs            # Morphed step-by-step video rendering engine
```

---

## 3. Windows & Antigravity Compatibility Engineering

### A. Dynamic Playwright Resolution
Upstream `snapshot.mjs` and `story.mjs` relied on local project `node_modules`. In Windows Antigravity, Playwright is provisioned globally via `@playwright/mcp` and `@playwright/cli`. 

The scripts have been enhanced with dynamic ESM resolution:
```javascript
const globalCandidates = [
  "C:\\Users\\raghu\\AppData\\Roaming\\npm\\node_modules\\@playwright\\mcp\\node_modules\\playwright\\index.mjs",
  "C:\\Users\\raghu\\AppData\\Roaming\\npm\\node_modules\\@playwright\\cli\\node_modules\\playwright\\index.mjs",
  "C:\\Users\\raghu\\AppData\\Roaming\\npm\\node_modules\\@playwright\\mcp\\node_modules\\playwright-core\\index.mjs"
];
for (const candidate of globalCandidates) {
  if (existsSync(candidate)) {
    return await import(pathToFileURL(candidate).href);
  }
}
```

### B. Windows Browser Binary Discovery
Added automated detection for Windows system browsers:
- `C:\Program Files\Google\Chrome\Application\chrome.exe`
- `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`
- Fallback to headless Chromium in AppData.

---

## 4. How to Invoke Unslop in Antigravity

Antigravity automatically discovers and activates `unslop` whenever a prompt involves UI unslopping, design refinement, or anti-slop refactoring.

### Trigger Phrases & Slash Commands:
- `/unslop` or `/unslop this page`
- `"Unslop this dashboard"`
- `"Audit this screen for AI slop and apply the 9 design passes"`
- `"Redesign this hero section so it stops looking like a generic template"`
- `"Make this UI human-crafted and eliminate purple gradients"`

### Operational Flow:
1. Agent audits active screen against `references/signs.md`.
2. Agent defines the **Direction** (Product, Character, World, Moments, Signature).
3. Agent executes the **Nine Passes** in strict order:
   - Pass 1: Spacing
   - Pass 2: Color
   - Pass 3: Icons
   - Pass 4: Copy
   - Pass 5: Type
   - Pass 6: Layout
   - Pass 7: Details
   - Pass 8: Visuals
   - Pass 9: Motion
4. Agent runs headless verification via Playwright MCP across 5 viewports (320px–1440px).
5. Agent produces verification evidence and report.

---

## 5. External Tool Dependencies

| Tool | Status | Role | Fallback |
| :--- | :--- | :--- | :--- |
| **Playwright MCP** | `[CONNECTED]` | Live page rendering, screenshot capture, DOM inspection | Built-in MCP tool suite |
| **Node.js (v24)** | `[INSTALLED]` | Execution of `snapshot.mjs` and `story.mjs` | Native powershell execution |
| **Google Chrome** | `[VERIFIED]` | System browser executable for headless automation | Microsoft Edge |
| **FFmpeg** | `[OPTIONAL]` | Required only when generating morphing `.mp4` story videos | Still frame export |


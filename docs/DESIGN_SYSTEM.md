# 🎨 DESIGN_SYSTEM.md: Career Connect Pro Product Design Constitution

**Product**: Career Connect Pro  
**Design Philosophy**: Human-Crafted, Anti-AI-Slop, Production-Grade Enterprise Platform  
**Target Audience**: Indian Tech Freshers, Experienced Software Engineers, Enterprise Recruiters, and Campus Placement Cells (TPOs)  
**Standard**: WCAG 2.2 AA Accessibility & Zero-Slop Visual Discipline  

---

## 1. Product Identity & Visual Thesis

Career Connect Pro is an authentic, high-density employment and talent platform engineered for the Indian recruitment landscape. It blends the proven high-conversion usability of **Naukri.com** and **FirstNaukri** with the refined craft and operational clarity of modern SaaS systems like **Linear** and **Stripe**.

### Visual Thesis:
- **Intentionally Engineered, Not Generated**: Every card, border, button, and badge exists to solve an ergonomic problem. We avoid decorative purple-blue mesh gradients, floating unmotivated elements, and generic templates.
- **Data Clarity Over Decoration**: In a platform processing salaries, test percentiles, and 10,000+ resumes, typographical contrast and tabular alignment are paramount.
- **High Trust & Statutory Transparency**: Prominent fraud advisories, zero-fee declarations, and explicit DPDP Act 2023 / GDPR compliance elements build candidate and employer trust.

---

## 2. Art Direction & Visual Signature

1. **Brand Blue Core (`#275df5`)**:
   - An electric, purposeful cobalt blue inspired by modern high-conversion hiring platforms. Used for primary CTAs, active tab indicators, and search triggers.
2. **Deep Slate Dominance (`#0f172a` / `#1e293b`)**:
   - High-contrast text typography and solid footer foundations. Eliminates low-contrast washed-out grays.
3. **Warm Neutral Grounding (`#f8fafc` / `#f1f5f9`)**:
   - Subtle slate and zinc undertones provide depth without dirty shadows or hazy blurs.
4. **Semantic Accents**:
   - **Amber Gold (`#f59e0b`)**: AmbitionBox rating stars, FastForward priority badges.
   - **Emerald Green (`#10b981`)**: Fresher (0 Exp) tags, system uptime, active verified badges.
   - **Rose Coral (`#ef4444`)**: Deletion warnings, 429 throttling, fraud alerts.

---

## 3. Layout Architecture & Spatial Rhythm

### A. Layout Density Strategy
- **Public Discovery Pages**: Relaxed density with ample breathing room (`py-12 sm:py-16`), high-impact typographic headlines, and clear visual search capsules.
- **Search Results & Feeds**: Medium-high density (`gap-4 sm:gap-5`) with 16px cards, compact metadata trios, and sticky faceted filters.
- **Enterprise Workspace & ATS**: High density (`p-4 sm:p-6`) with compact data tables, monospaced metrics, and quick keyboard navigation (`⌘K`).

### B. Spatial Scale (Base 4px / 8px Rhythm)
- `space-1` (4px): Micro-spacing between icons and tags.
- `space-2` (8px): Gaps between badge items and inline pills.
- `space-3` (12px): Padding inside search pills and compact dropdowns.
- `space-4` (16px): Standard card interior padding and button heights (`h-10` / `h-11`).
- `space-6` (24px): Gap between layout columns and card groups.
- `space-8` (32px): Section breaks on mobile and tablet.
- `space-12` / `space-16` (48px / 64px): Major landing page section gutters.

---

## 4. Typography Scale & Hierarchies

| Role | Font Family | Weight | Size (Desktop / Mobile) | Line Height | Tracking | Usage |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Hero Display** | `Outfit`, `Satoshi` | 900 / Black | 48px / 32px | 1.15 | `-0.025em` | Homepage hero, Campus hero banner |
| **H1 Title** | `Outfit`, `Satoshi` | 800 / Extrabold | 32px / 24px | 1.2 | `-0.02em` | Page main headings, Company names |
| **H2 Section** | `Outfit`, `Satoshi` | 700 / Bold | 22px / 18px | 1.25 | `-0.015em` | Feed section titles, Modal headings |
| **H3 Subsection**| `Outfit`, `Satoshi` | 600 / Semibold | 16px / 15px | 1.3 | Normal | Job titles on cards, Widget headers |
| **Body Primary**| `Geist`, `Inter` | 400 / Regular | 14px / 13px | 1.55 | Normal | Job descriptions, Help articles |
| **Body Dense** | `Geist`, `Inter` | 500 / Medium | 12px / 11px | 1.45 | Normal | Meta labels, filter checkboxes |
| **Data / Numbers**| `JetBrains Mono` | 600 / Semibold | 12px–14px | 1.4 | `-0.01em` | CTC Salaries, percentages, checksums |

---

## 5. Surface & Material Discipline

- **No Gratuitous Blur**: Backdrop blurs are restricted strictly to sticky headers (`backdrop-blur-md`) and modal backdrops (`backdrop-blur-xs`).
- **Crisp 1px Boundaries**: Clean borders (`border border-slate-200`) prevent visual bleeding without requiring heavy, muddy drop shadows.
- **Elevation Hierarchy**:
  - `elevation-0`: Surface backgrounds (`bg-slate-50`).
  - `elevation-1`: Standard white cards (`bg-white border border-slate-200 shadow-2xs`).
  - `elevation-2`: Hover state cards (`hover:border-slate-300 hover:shadow-md transition-all`).
  - `elevation-3`: Floating modals, dropdowns, and sticky capsules (`shadow-xl border border-slate-100`).


# 🎛️ DESIGN_TOKENS.md: Semantic Design Tokens & CSS Variables

**Repository**: `D:\PROJECTS\New folder\career-connect-pro`  
**Engine**: Tailwind CSS v4 & HSL Custom Properties  
**Updated**: 02 November 2026  

---

## 1. Color Palette Tokens

```css
:root {
  /* Brand Primary: Electric Blue (Naukri Standard) */
  --color-primary-50:  #eff4ff;
  --color-primary-100: #dbe7fe;
  --color-primary-500: #275df5; /* Core Brand Action */
  --color-primary-600: #1d4ed8; /* Hover Action */
  --color-primary-700: #1e40af; /* Active Action */

  /* Neutral Surface Palette: Slate */
  --color-slate-50:  #f8fafc; /* Page Background */
  --color-slate-100: #f1f5f9; /* Inactive pill / secondary button */
  --color-slate-200: #e2e8f0; /* Default 1px Card Border */
  --color-slate-300: #cbd5e1; /* Active input border */
  --color-slate-400: #94a3b8; /* Placeholder & icons */
  --color-slate-500: #64748b; /* Secondary helper text */
  --color-slate-600: #475569; /* Body copy text */
  --color-slate-700: #334155; /* High-contrast labels */
  --color-slate-800: #1e293b; /* Subheadings */
  --color-slate-900: #0f172a; /* High-contrast Headlines */
  --color-slate-950: #020617; /* Deep footer & code block */

  /* Functional Accents */
  --color-amber-500:   #f59e0b; /* Star Rating / FastForward */
  --color-amber-50:    #fffbeb; /* Rating Pill Background */
  --color-emerald-600: #10b981; /* Fresher 0 Exp / Active Uptime */
  --color-emerald-50:  #ecfdf5; /* Fresher Pill Background */
  --color-rose-600:    #ef4444; /* Account Deletion / Sudo Challenge */
  --color-rose-50:     #fef2f2; /* Deletion Pill Background */
}
```

---

## 2. Radii & Geometry Tokens

| Token | CSS Value | Visual Intent | Applied Component |
| :--- | :--- | :--- | :--- |
| `--radius-sm` | `0.375rem` (`6px`) | Subtle rounding | Monospace code blocks, keyboard badges (`⌘K`) |
| `--radius-md` | `0.625rem` (`10px`) | Standard UI buttons | Form inputs, dropdown menus, action buttons |
| `--radius-lg` | `0.875rem` (`14px`) | Micro-cards | Search suggestions, filter chips, toast notifications |
| `--radius-xl` | `1.0rem` (`16px`) | Primary content cards | `JobCard.tsx`, `CompanyCard.tsx`, table wrappers |
| `--radius-2xl`| `1.5rem` (`24px`) | Major containers | Modal dialogs, Hero containers, Dashboard panels |
| `--radius-full`| `9999px` (Pill) | High-conversion capsules | Search bar container, status chips, CTA pills |

---

## 3. Shadows & Elevation Tokens

| Token | CSS Definition | Visual Purpose |
| :--- | :--- | :--- |
| `--shadow-card` | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` | Resting elevation for white cards |
| `--shadow-card-hover` | `0 6px 16px -2px rgba(15, 23, 42, 0.08)` | Hover lift on job and company cards |
| `--shadow-dropdown` | `0 12px 24px -4px rgba(15, 23, 42, 0.12)` | Navigation menus and autocomplete popovers |
| `--shadow-modal` | `0 24px 48px -12px rgba(15, 23, 42, 0.25)` | Centered dialogs and sudo challenge modals |

---

## 4. Animation & Transition Tokens

- **Hover Transition**: `transition: all 150ms cubic-bezier(0.16, 1, 0.3, 1)`
- **Tactile Button Press**: `transform: translateY(1px)` on `:active`
- **Modal Entry**: `animation: zoom-in-95 150ms ease-out`
- **Toast Slide**: `animation: slide-in-from-top-2 200ms cubic-bezier(0.16, 1, 0.3, 1)`
- **Reduced Motion**: Disables transforms and animations when `prefers-reduced-motion: reduce` is active.


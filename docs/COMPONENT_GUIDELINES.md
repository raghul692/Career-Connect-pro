# 📐 COMPONENT_GUIDELINES.md: Component Design Patterns & Usability Standards

**Product**: Career Connect Pro  
**Standard**: WCAG 2.2 AA Accessibility & Human-Crafted UI Patterns  
**Updated**: 02 November 2026  

---

## 1. Job Card Pattern (`JobCard.tsx`)

### Anatomy:
1. **Header Row**:
   - Company Avatar (40x40px rounded-xl with subtle 1px border).
   - Role Title (15px/16px bold text with hover color transition).
   - Star Rating Badge (`3.9 ★ (4.8k Reviews)` linking to AmbitionBox company profile).
2. **Meta Information Trio**:
   - `Briefcase` + Experience range (e.g., `0-2 Yrs` or `🎓 Fresher (0 Yrs)`).
   - `IndianRupee` + Annual CTC range in Lakhs (e.g., `₹ 4.5 - 6.5 Lacs P.A.`).
   - `MapPin` + Location with work mode (e.g., `Bangalore / Bengaluru (Hybrid)`).
3. **Snippet & Skills**:
   - 2-line truncated job description.
   - Skill pills with hover highlight.
4. **Footer & Action Bar**:
   - Freshness timestamp (`Posted 1 day ago`).
   - Bookmark save button (toggle heart/bookmark).
   - Primary Action: Electric Blue pill button (`#275df5`) with clear label *"Apply on Company Site"* or *"Quick Apply"*.

### Do's:
- DO preserve the 3-item meta row (Experience, CTC, Location) in exact sequence.
- DO format Indian currency with standard rupee symbol (`₹`) and Lakhs notation.
- DO ensure star rating opens the company review page.

### Don'ts:
- DO NOT use generic stock icons or emoji in place of standard metadata icons.
- DO NOT wrap the entire card in a single link (interferes with bookmark and company review clicks).

---

## 2. Canonical Search Bar Pattern (`SearchBar.tsx`)

### Anatomy:
1. **Segment 1: Skills / Titles / Companies**:
   - Search icon + text input with keyboard accessible suggestor list.
2. **Segment 2: Experience Filter**:
   - Chevron dropdown selector (`Any Exp`, `Freshers (0 Exp)`, `1-2 Yrs`, `3-5 Yrs`, `5+ Yrs`).
3. **Segment 3: Location**:
   - Location pin icon + Indian metro cities autocomplete.
4. **Search Action CTA**:
   - Electric Blue pill button with magnifying glass and text *"Search Jobs"*.

### Responsive Behavior:
- **Desktop (>= 1024px)**: Single unified horizontal floating capsule with vertical divider strokes.
- **Tablet (768px - 1023px)**: 3 distinct input blocks stacked gracefully.
- **Mobile (< 768px)**: Stacks vertically with quick-access metro city chips below.

---

## 3. Faceted Filter Sidebar (`JobListingsPage.tsx`)

### Anatomy:
1. **Header**: Filter icon + "All Filters" title + "Clear All" reset link.
2. **Section Accordions**:
   - Experience (Radio buttons with live count badges).
   - Work Mode (Multi-select checkboxes with counts: Remote, Hybrid, On-site).
   - Salary LPA (Brackets: 0-3 LPA, 3-6 LPA, 6-10 LPA, 10-15 LPA, 15+ LPA).
   - Department (Software & QA, Networks, Analytics, Security).
   - Company Type (Indian MNC, Foreign MNC, Startup, Unicorn, Product).

### Rules:
- Counts must update dynamically based on the current active filters.
- Zero result states must display a friendly "No matching jobs" card with a 1-click "Reset All Filters" CTA.


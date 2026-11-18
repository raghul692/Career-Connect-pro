# 🧩 CURRENT_UI_INVENTORY.md: Component & UI Primitives Catalog

**Repository**: `D:\PROJECTS\New folder\career-connect-pro`  
**Audit Scope**: Complete inspection of all shared, layout, modal, and common components  
**Audit Date**: 02 November 2026  

---

## 1. Global Navigation & Layout Primitives

### A. Public Navigation Bar (`src/components/layout/Navbar.tsx`) & Brand Mark (`src/components/common/BrandLogo.tsx`)
- **Visual Structure**: Fixed sticky top navigation (`bg-white/95 backdrop-blur-md border-b border-slate-200/90 h-[68px] shadow-2xs`).
- **Brand Geometry**: Custom squircle badge (`w-9 h-9 rounded-xl bg-[#275df5]`) with `Briefcase` vector mark, white-ringed live status emerald accent dot, bold `CareerConnect` wordmark, and high-contrast solid `PRO` pill badge.
- **Navigation Elements**:
  - `Jobs` (with mega-dropdown: All Openings, Freshers 0 Exp, Remote, Internships, Walk-in Drives).
  - `Companies` (direct link with AmbitionBox "Reviews" badge).
  - `Campus` (direct link with green "NCAT" test badge).
  - `Services` (with FastForward career booster dropdown: Priority Reach, ATS Checker, Salary Benchmarks, Interview Q&A).
  - `Enterprise` (direct link to ATS & CISO suite).
- **Utility Actions (Right Cluster)**:
  - Command Palette Search Capsule (`⌘K` / `Search jobs & skills...`).
  - Accessibility Settings Trigger (`Eye` icon, opens `AccessibilityModal` via `Alt+A`).
  - Saved Jobs Bookmark Quick Access (`Bookmark` icon with dynamic count badge).
  - `For Employers` (direct post job CTA pill).
  - `Dashboard` pill (with dynamic badge of active applications count in `#275df5`).
  - User Profile Avatar with dropdown (profile completion meter %, candidate profile, saved jobs, privacy settings, logout).
- **Responsive Handling**: Collapses to hamburger drawer on `< 1024px` viewports with clean 2x2 grid tiles, full-width search, and categorized link list.

### B. Enterprise Workspace Layout (`src/components/layout/AppLayout.tsx`)
- **Structure**: High-density 2-tier dual-column layout with collapsible sidebar (64px collapsed, 260px expanded).
- **Header Elements**: Active Organization selector (Swiggy, Razorpay, Tech Mahindra), Support Impersonation warning banner (crimson), Global Broadcast Banner (out-of-band maintenance notice), and quick persona switcher.
- **Sidebar Categories**:
  1. *Candidate & ATS Operations*: Overview, Candidate CSV Importer, Export Queue, Workflows, Notifications, Reports, Trash.
  2. *Security & IT Governance*: Team Members, RBAC Roles, Domain Verification, IP Allowlist, Data Retention, White-Label Branding, Audit Logs, RLS Policies, Backups, SSO.
  3. *FinOps & Procurement*: Usage Metering, AI Screening Credits, Proforma Quote PDF, Invoices, Payment Methods, Plan Cancellation.
  4. *Platform Super-Admin*: Tenant Inspector, System Broadcasts.
  5. *Developer Platform*: API Keys, Rate Limiting & DDoS, Webhooks, Connected Apps, REST API Docs, Changelog.

### C. Master Global Footer (`src/components/layout/Footer.tsx`)
- **Anatomy**: Dark navy container (`bg-slate-900 border-t border-slate-800`).
- **Fraud Warning Header**: Top security advisory bar reminding job seekers that Career Connect Pro never charges fees.
- **6-Column Directory Grid**:
  1. *Brand Info & Freshers Newsletter*: Email digest subscription with instant confirmation.
  2. *Job Seekers*: Search Jobs, Freshers Hub, Remote, Internships, Dashboard.
  3. *Campus & Students*: Campus Hub, FastForward, Hackathons, NCAT Aptitude, Interview Prep, Salary Insights.
  4. *Enterprise SaaS*: Features, Product Tour, Pricing, Integrations, Customers, Console, Book Demo.
  5. *Dev & Reliability*: API Docs, API Keys, Webhooks, Changelog, SSL/TLS Security, Status Uptime.
  6. *Trust & Legal*: About Us, Contact, FAQ, Privacy, Terms, Fraud Alert, Security Standards, Email Preferences, Accessibility Options, Sitemap.
- **Bottom Bar**: Copyright, ISO 27001 badge, and localized crafted-with-love attribution.

---

## 2. Core Card & Interactive Feed Primitives

### A. Naukri-Pattern Job Card (`src/components/common/JobCard.tsx`)
- **Geometry**: White card with `16px` rounded corners, `border border-slate-200`, subtle hover lift (`hover:border-slate-300 hover:shadow-md`).
- **Header Tuple**:
  - Company logo avatar with fallback initials.
  - Job Title (16px, bold, Satoshi/Outfit typography).
  - Company Name + Star Rating Pill (`3.9 ★ (4.8k Reviews)` linking to AmbitionBox company profile).
- **Meta Trio (Naukri Standard)**:
  - Experience: `Briefcase` icon + `0-2 Yrs` (or `Fresher`).
  - Compensation: `IndianRupee` icon + `₹ 4.5 - 6.5 Lacs P.A.`.
  - Location: `MapPin` icon + `Bangalore / Bengaluru (Hybrid)`.
- **Job Description Snippet**: 2-line clamp with text snippet of core responsibilities.
- **Skills Pill Tags**: Horizontal flex wrapping tags (`React`, `TypeScript`, `Node.js`, `REST APIs`).
- **Footer Actions**:
  - Posted freshness badge (`Just now`, `2 days ago`).
  - Save job bookmark icon button.
  - High-converting CTA: Primary electric blue pill button (`#275df5`) *"Apply on Company Site"* or *"Quick Apply"*.

### B. Company Review Card (`src/components/common/CompanyCard.tsx`)
- **Geometry**: Compact card with corporate logo, AmbitionBox verified rating badge, industry tag, employee headcount, active vacancies badge, and direct link to `/companies/:id`.

### C. Canonical 3-Segment Search Bar (`src/components/common/SearchBar.tsx`)
- **Pattern**: Floating capsule pill input container matching Naukri 2026 ground-truth design.
  - Segment 1: Skills / Designations / Companies input with live suggestor dropdown.
  - Segment 2: Experience level dropdown (Freshers, 1-2 Yrs, 3-5 Yrs, 5+ Yrs).
  - Segment 3: Location search input with Indian metro quick chips (Bangalore, Pune, Hyderabad, Delhi NCR, Chennai, Mumbai).
  - Search CTA: Electric blue `#275df5` pill button with search icon.

---

## 3. Modals & Overlay Primitives

1. **`QuickApplyModal.tsx`**: Multi-step application modal with resume file picker, current CTC, expected CTC, notice period selector, and confetti celebration on submit.
2. **`SudoModeModal.tsx`**: Cryptographic password challenge modal for high-consequence administrative actions (Ownership transfer, regulatory data purge).
3. **`CommandPaletteModal.tsx`**: `⌘K` global palette with fuzzy search across all 82 routes, quick actions, and persona switching.
4. **`AccessibilityModal.tsx`**: `Alt+A` WCAG AAA preferences modal with High Contrast toggle, Font Scaling (100%–130%), Dyslexia font, Reduce Motion, and Focus Ring amplifier.
5. **`CookieConsentModal.tsx`**: Floating bottom banner with granular preferences for Functional, Performance, and Analytics cookies.
6. **`NotificationToast.tsx`**: Fixed top-right floating toast for feedback messages with auto-dismiss timer.


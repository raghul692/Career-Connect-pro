# 🗺️ ROUTE_AND_PAGE_INVENTORY.md: Complete 82-Route Specification

**Repository**: `D:\PROJECTS\New folder\career-connect-pro`  
**Total Routes Cataloged**: 82 unique endpoints  
**Audit Date**: 02 November 2026  

---

## Pillar 1: Public Marketing & Discovery (8 Routes)

### 1. `/` — Homepage / Job Search Engine
- **Purpose**: Primary landing interface for job seekers, college freshers, and enterprise employers.
- **Target User**: Engineering graduates, active tech job seekers, hiring managers.
- **Primary Action**: Search jobs via the 3-segment search pill (`Skills`, `Experience`, `Location`).
- **Secondary Actions**: Browse trending categories (Remote, MNC, Banking, Internship), explore featured jobs, take free NCAT assessment.
- **Layout Structure**: Hero banner with floating search capsule -> Trending categories chips -> Featured Jobs Feed -> Employer Trust Wall -> Testimonials.
- **Components**: `Navbar`, `SearchBar`, `JobCard`, `CompanyCard`, `Footer`.
- **Data Dependencies**: `jobs`, `companies`, `filters`.
- **States**: Loading skeleton, autocomplete suggestions dropdown, bookmark state.
- **Responsive**: Search pill stacks vertically on `< 768px`; category chips scroll horizontally.

### 2. `/features` — Features & Solutions
- **Purpose**: Explain the full feature suite for both job seekers (AI Resume, NCAT) and recruiters (ATS, Workflows, RLS).
- **Target User**: Prospective enterprise buyers, campus placement officers (TPOs).
- **Primary Action**: Book a demo / Register free.
- **Layout Structure**: Feature matrix bento grid with interactive tabbed previews.

### 3. `/product-tour` — Interactive Sandbox
- **Purpose**: Allow prospective customers to test the product without signing up or creating an account.
- **Target User**: C-level executives, evaluators.
- **Primary Action**: Switch between Candidate, Recruiter, and Admin personas in a live interactive sandbox.

### 4. `/pricing` — Recruiter & Enterprise Subscription Tiers
- **Purpose**: Pricing transparency with Monthly/Annual billing toggle and feature comparison.
- **Target User**: Talent Acquisition heads, founders.
- **Primary Action**: "Start 14-Day Free Trial" or "Contact Enterprise Sales".

### 5. `/integrations` — 3rd-Party ATS Directory
- **Purpose**: Showcase pre-built connectors (Workday, Greenhouse, Slack, GitHub, Stripe, Okta).
- **Primary Action**: Filter connectors by category and inspect API setup guides.

### 6. `/customers` — Case Studies & Wall of Love
- **Purpose**: Social proof and enterprise ROI statistics from Razorpay, Tech Mahindra, Swiggy, and Zoho.

### 7. `/careers` — Internal Job Openings
- **Purpose**: Career opportunities inside Career Connect Pro's product engineering and design teams.

### 8. `/contact-sales` — Enterprise Demo Booking Form
- **Purpose**: High-intent lead capture with company size, hiring volume, and date picker.

---

## Pillar 2: Core Job & Candidate Discovery (6 Routes)

### 9. `/jobs` — Search Results Page (SRP)
- **Purpose**: Master faceted job search feed with live dynamic counters.
- **Target User**: Job seekers applying to tech, engineering, and product roles.
- **Primary Action**: Click job card to view details or click "Quick Apply".
- **Secondary Actions**: Toggle faceted filters (Experience, Work Mode, Salary LPA, Department, Company Type).
- **Layout Structure**: 2-Column layout: Sticky left filter sidebar (1 col) + Job results stream with sort dropdown (3 cols).
- **Components**: `JobCard`, `SearchBar`, `QuickApplyModal`, dynamic counter chips.

### 10. `/jobs/freshers` — Freshers & Graduate Trainee Hub (0 Exp)
- **Purpose**: Dedicated pre-filtered feed strictly for 0-experience candidates (Class of 2025/2026).

### 11. `/jobs/remote` — Remote & WFH Jobs in India
- **Purpose**: Dedicated feed for 100% remote software engineering and support roles.

### 12. `/jobs/internships` — College Internships Hub
- **Purpose**: Paid summer, winter, and semester internships for engineering students.

### 13. `/jobs/walk-in` — Walk-In Interview Drives
- **Purpose**: In-person interview drives with venue addresses, timing, and contact coordinates.

### 14. `/jobs/:id` — Detailed Job Description (JD)
- **Purpose**: Full job specification with compensation details, required skills, recruiter profile, and similar openings.

---

## Pillar 3: FastForward & Career Preparation (6 Routes)

### 15. `/services` & `/fastforward` — FastForward Placement Suite
- **Purpose**: Monetized career acceleration services (Naukri FastForward model).
- **Key Features**: AI Resume Score, Priority Applicant star badge, 2,500+ Company Interview Q&A.

### 16. `/resume-builder` — Free ATS Resume Checker
- **Purpose**: Interactive ATS parseability score test, keyword gap analysis, and PDF template generator.

### 17. `/salaries` — Salary Insights & Take-Home Calculator
- **Purpose**: Role-wise CTC benchmarks across Indian tech hubs and monthly take-home salary calculator.

### 18. `/interview-prep` — Company Interview Question Bank
- **Purpose**: Real interview questions asked at top Indian MNCs and unicorn startups with solutions.

### 19. `/career-advice` — Placement Playbooks & Blog
- **Purpose**: Roadmaps for freshers, coding interview guides, and resume crafting advice.

### 20. `/career-advice/:id` — Career Article Reader
- **Purpose**: Full-length guide with actionable checklists and share buttons.

---

## Pillar 4: Campus & Student Ecosystem (4 Routes)

### 21. `/campus` — Campus Placement & Student Hub
- **Purpose**: Gateway for college students to enter national placement drives.

### 22. `/campus/tests` — NCAT Aptitude Diagnostic Simulator
- **Purpose**: Interactive 5-question timed diagnostic test with automatic percentile scoring.

### 23. `/campus/contests` — National Coding Hackathons
- **Purpose**: Competitions with cash prizes and direct interview opportunities.

### 24. `/campus/webinars` — Masterclasses & Tech Streams
- **Purpose**: Live technical webinars hosted by senior engineering leads.

---

## Pillar 5: Candidate Portal & Identity (7 Routes)

### 25. `/dashboard` — Candidate Application Tracker
- **Purpose**: Visual pipeline of all submitted job applications (Applied, Reviewing, Shortlisted, Interview, Offered).

### 26. `/profile` — Candidate Profile & Resume Editor
- **Purpose**: Manage education, skills, projects, certifications, and uploaded resume files.

### 27. `/login` — User & Recruiter Sign-In
- **Purpose**: Multi-persona login with password, magic link, and SSO options.

### 28. `/register` — Account Creation
- **Purpose**: Onboarding form with role selection (Student/Fresher vs Recruiter/Employer).

### 29. `/forgot-password` & `/auth/reset-password` — Password Recovery
- **Purpose**: Secure token-based password reset workflow.

### 30. `/auth/sso` — Enterprise SSO SAML Gateway
- **Purpose**: Single Sign-On gateway for corporate domains (@company.com).

### 31. `/auth/mfa` — Multi-Factor Authentication
- **Purpose**: TOTP / SMS 6-digit verification challenge.

---

## Pillar 6: Enterprise ATS & Workspace (7 Routes)

### 32. `/app` — Executive Recruitment Overview
- **Purpose**: Hiring funnel KPIs, active job slots, application velocity, and recruiter throughput.

### 33. `/app/import-candidates` — Candidate CSV Importer
- **Purpose**: Bulk candidate ingestion with drag & drop, column mapping confidence scores, and preview table.

### 34. `/app/export-queue` — Background Tasks & Resume ZIP Export
- **Purpose**: Asynchronous queue manager for downloading 10,000+ resumes with % completion progress.

### 35. `/app/workflows` — Visual Hiring Automations
- **Purpose**: If-This-Then-That candidate routing rules (e.g. CGPA > 8.0 -> Auto-invite to HackerEarth test).

### 36. `/app/notifications` — Enterprise Notification Inbox
- **Purpose**: Real-time alerts, mentions, interview acceptances, and audit notifications.

### 37. `/app/reports` — Sourcing & Diversity Analytics
- **Purpose**: Tabular reports with CSV/PDF download simulation.

### 38. `/app/trash` — Archived Items & 30-Day Trash Bin
- **Purpose**: Soft delete recovery for candidate dossiers and job drafts.

---

## Pillar 7: Security, CISO & IT Governance (11 Routes)

### 39. `/admin/team` — Team Members & Role Assignments
- **Purpose**: Invite recruiters, assign roles (Admin, Recruiter, Reviewer, Hiring Manager).

### 40. `/admin/roles` — Granular RBAC Permissions Matrix
- **Purpose**: Permission toggles for candidate PII, salary viewing, and job deletion.

### 41. `/admin/domain-verification` — Corporate DNS TXT Ownership Claim
- **Purpose**: Challenge-response DNS TXT verification for corporate domains.

### 42. `/admin/ip-allowlist` — IP Subnet Geofencing
- **Purpose**: Restrict recruiter access to office VPN CIDR blocks.

### 43. `/admin/data-retention` — DPDP Auto-Purge Schedules
- **Purpose**: Automated regulatory erasure of rejected candidate data under DPDP Act 2023.

### 44. `/admin/branding` — White-Label & Custom CNAME
- **Purpose**: Custom carrier portal domain, company logo, and custom application questions.

### 45. `/admin/transfer-ownership` — Master Ownership Handoff
- **Purpose**: High-consequence ownership transfer protected by Step-Up Sudo Authentication.

### 46. `/admin/audit-logs` — Immutable Security Audit Trail
- **Purpose**: Chronological forensic log of all logins, downloads, and policy changes.

### 47. `/admin/sso` — Okta / Azure AD SCIM Directory Sync
- **Purpose**: Automated employee provisioning and SAML configuration.

### 48. `/admin/security/rls` — PostgreSQL Row-Level Security Manager
- **Purpose**: Multi-tenant database RLS policies and live breach simulator.

### 49. `/admin/backups` — Automated Backups & PITR Sandbox
- **Purpose**: Hourly snapshots, continuous WAL streaming, and 35-day Point-in-Time Recovery.

---

## Pillar 8: FinOps & Billing (6 Routes)

### 50. `/billing/usage` — Usage & Active Slots Metering
- **Purpose**: Monitor active job slots, resume view credits, and team seats.

### 51. `/billing/ai-credits` — Gemini Screening Credits & Budget Cap
- **Purpose**: AI token consumption meter and hard circuit breaker limit.

### 52. `/billing/quote-generator` — B2B Proforma Quote Generator
- **Purpose**: Configure custom hiring tiers with GSTIN 18% tax calculation and print PDF.

### 53. `/billing/payment-methods` — Cards, UPI & Tax Settings
- **Purpose**: Payment gateway configurations with GST invoice details.

### 54. `/billing/invoices` — Billing History & Tax Receipts
- **Purpose**: Download past paid tax invoices in PDF format.

### 55. `/billing/cancel` — Subscription Cancellation & Retention
- **Purpose**: 60-day pause option, 50% retention discount, survey, and 1-click downgrade.

---

## Pillar 9: Platform Super-Admin (2 Routes)

### 56. `/super-admin/tenants` — Tenant Inspector & God-Mode Impersonation
- **Purpose**: Platform master view of all client organizations with "Login as Recruiter" impersonation.

### 57. `/super-admin/broadcast` — Global System Broadcast Banners
- **Purpose**: Out-of-band maintenance notice publisher across all public and app pages.

---

## Pillar 10: Developer Platform (6 Routes)

### 58. `/developer/api-keys` — API Keys & Secrets Manager
- **Purpose**: Create and manage secret API keys with masked token display.

### 59. `/developer/rate-limiting` — Rate Limiting & DDoS Governance
- **Purpose**: Sliding window token bucket visualizer, tiered quotas, and 429 testing.

### 60. `/developer/webhooks` — Webhook Subscriptions & Delivery Logs
- **Purpose**: Event webhook destinations with payload signing and test pings.

### 61. `/developer/apps` — Connected OAuth Applications
- **Purpose**: Authorized third-party software integrations and token revocation.

### 62. `/developer/docs` — REST API Documentation
- **Purpose**: Interactive API reference with cURL examples and schemas.

### 63. `/changelog` — Product Changelog
- **Purpose**: Chronological product releases and engineering updates.

---

## Pillar 11: Trust, Legal, Compliance & User Rights (11 Routes)

### 64. `/privacy` — Privacy Policy (DPDP Act 2023 & GDPR)
- **Purpose**: Comprehensive statutory data handling disclosures.

### 65. `/terms` — Terms of Service
- **Purpose**: Candidate user agreement and employer anti-fraud obligations.

### 66. `/fraud-alert` — Fraud Advisory & Imposter Warning
- **Purpose**: Prominent alert warning job seekers against fraudulent interview fees.

### 67. `/security` — Security Standards & Certifications
- **Purpose**: ISO 27001, SOC 2 Type II, and 256-bit encryption architecture.

### 68. `/security/ssl` — HTTPS & SSL Transport Inspector
- **Purpose**: TLS 1.3 verification, HSTS preloading, and 301 redirect test.

### 69. `/account/delete-account` — GDPR / DPDP Right to Erasure
- **Purpose**: 1-Click data archive download and irreversible account shredding wizard.

### 70. `/account/analytics-preferences` — Telemetry & Cookie Controls
- **Purpose**: Granular consent manager for Functional, Performance, and Analytics tracking.

### 71. `/unsubscribe` — 1-Click Email Unsubscribe
- **Purpose**: Zero-login preference manager for job alerts and notifications.

### 72. `/about` — About Career Connect Pro
- **Purpose**: Founding mission, leadership team, and corporate headquarters.

### 73. `/contact` — Contact Support & Helpdesk
- **Purpose**: Support ticket form with office addresses and emergency hotlines.

### 74. `/faq` — Searchable Help Center & FAQ
- **Purpose**: Categorized knowledge base for candidates and recruiters.

---

## Pillar 12: System Health & Error Fallbacks (8 Routes)

### 75. `/status` — Live System Status (99.98% Uptime)
- **Purpose**: Real-time component availability monitor (API, Database, AI Workers, Search).

### 76. `/sitemap` — Visual HTML Directory
- **Purpose**: Single-click access to every page on the platform.

### 77. `/404` & Wildcard `*` — Custom 404 Not Found
- **Purpose**: Branded missing page fallback with popular search links.

### 78. `/403` — Custom 403 Forbidden Access
- **Purpose**: Permission denied and IP geofenced restriction explanation.

### 79. `/500` — Custom 500 Server Error
- **Purpose**: Unhandled exception boundary with incident correlation ID.

### 80. `/429` — Custom 429 Too Many Requests
- **Purpose**: Rate limit exceeded page with live countdown timer.

### 81. `/public/robots.txt` — Search Engine Crawler Directives
- **Purpose**: RFC-compliant bot indexing rules.

### 82. `/public/sitemap.xml` — Machine-Readable Sitemap
- **Purpose**: XML sitemap for Google and Bing search indexing.


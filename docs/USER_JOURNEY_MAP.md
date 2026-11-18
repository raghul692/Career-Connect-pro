# 🗺️ USER_JOURNEY_MAP.md: End-to-End Persona Experience Flows

**Repository**: `D:\PROJECTS\New folder\career-connect-pro`  
**Core Personas**:
1. College Fresher (2025/2026 Batch)
2. Experienced Software Engineer (2–6 Yrs Exp)
3. Enterprise Talent Acquisition Lead / HR Recruiter
4. Chief Information Security Officer (CISO) & IT Admin
5. Finance & Billing Administrator (FinOps)

---

## Journey 1: College Fresher / Engineering Student

```mermaid
journey
    title Journey of an Engineering Fresher Landing a First Job
    section Discovery
      Visit Homepage: 5: Student
      Search 'Graduate Trainee' or 'Fresher': 4: Student
      Switch to Freshers Hub (0 Exp): 5: Student
    section Preparation
      Take Free NCAT Diagnostic Aptitude Test: 5: Student
      Receive 92nd Percentile Certificate: 5: Student
      Upload Resume to AI ATS Checker: 4: Student
      Review Missing Skill Keywords: 4: Student
    section Application
      Browse Verified MNC Job Postings: 5: Student
      Trigger 1-Click Quick Apply: 5: Student
      Submit College Details & CGPA: 5: Student
      Confetti Celebration Screen: 5: Student
    section Tracking
      View Application on Candidate Dashboard: 5: Student
      Receive SMS Alert on Recruiter View: 5: Student
```

### Critical Touchpoints:
- `HomePage.tsx` -> `JobListingsPage.tsx?specialFilter=freshers`
- `CampusPage.tsx` (NCAT Timed Diagnostic Tab)
- `ResumeBuilderPage.tsx` (AI ATS Score & Keyword Analysis)
- `QuickApplyModal.tsx` -> `DashboardPage.tsx` (Status Pipeline)

---

## Journey 2: Experienced Tech Professional

```mermaid
journey
    title Experienced Engineer Evaluating Compensation & Applying
    section Search & Benchmark
      Search 'Full Stack Developer' + 'Bangalore': 5: Engineer
      Filter by Salary '15+ LPA' & 'Hybrid': 4: Engineer
      Inspect Company Profile & Glassdoor Rating: 4: Engineer
    section Compensation Analysis
      Navigate to Salary Insights Hub: 5: Engineer
      Calculate Monthly Take-Home & Taxes: 5: Engineer
      Review Top 25 Interview Questions: 4: Engineer
    section Direct Outreach
      Check Job Posting Verified Badge: 5: Engineer
      Apply Directly with Custom Portfolio: 5: Engineer
```

### Critical Touchpoints:
- `SearchBar.tsx` -> `JobListingsPage.tsx` (Faceted dynamic counts)
- `CompanyDetailPage.tsx` (AmbitionBox reviews & benefits)
- `SalariesPage.tsx` (CTC Take-Home calculator)
- `InterviewPrepPage.tsx` (2,500+ Verified Q&A bank)

---

## Journey 3: Enterprise Talent Acquisition Lead

```mermaid
journey
    title Enterprise Recruiter Sourcing & Ingesting 5,000 Campus Applicants
    section Setup & Post
      Sign in to Enterprise Console: 5: Recruiter
      Publish High-Priority Job with CTC: 4: Recruiter
    section Bulk Ingestion
      Upload 5,000 Candidate Excel/CSV: 4: Recruiter
      Review Automated Column Matching: 5: Recruiter
      Execute Bulk Ingestion: 5: Recruiter
    section Screening
      Build Hiring Automation (Auto-Invite if CGPA > 8.0): 5: Recruiter
      Review Applicant Funnel on Overview Dashboard: 5: Recruiter
      Trigger 10,000 Resume ZIP Export: 5: Recruiter
      Monitor Export Queue in Background: 5: Recruiter
```

### Critical Touchpoints:
- `EmployersPage.tsx` -> `PostJobPage.tsx`
- `AppLayout.tsx` -> `CandidateCsvImportPage.tsx`
- `HiringWorkflowBuilderPage.tsx` (If-This-Then-That rules)
- `ExportQueuePage.tsx` (Background task manager)

---

## Journey 4: CISO & IT Governance Lead

```mermaid
journey
    title CISO Verifying Security, Multi-Tenant Boundaries & Regulatory Purge
    section Boundary Verification
      Verify Corporate DNS TXT Ownership: 5: CISO
      Configure Office VPN Subnet Allowlist: 4: CISO
    section Data Isolation
      Inspect PostgreSQL Row-Level Security (RLS): 5: CISO
      Simulate Cross-Tenant Data Breach: 5: CISO
      Verify 0 Rows Returned & Zero Leakage: 5: CISO
    section Regulatory Compliance
      Configure DPDP Act 2023 Auto-Purge: 5: CISO
      Execute Step-Up Sudo Mode Challenge: 5: CISO
      Inspect Immutable Forensic Audit Log: 5: CISO
```

### Critical Touchpoints:
- `DomainVerificationPage.tsx` (@company.com DNS TXT)
- `IpAllowlistPage.tsx` (CIDR geofencing)
- `RowLevelSecurityPage.tsx` (Postgres 16 RLS simulation)
- `DataRetentionPage.tsx` & `AuditLogsPage.tsx` (Forensic trail)

---

## Journey 5: Finance & Procurement Administrator

```mermaid
journey
    title Procurement Head Generating B2B Proforma Quote & Managing FinOps
    section Capacity Planning
      Inspect Active Job Slots & Resume Credits: 4: FinOps
      Check Gemini AI Screening Token Consumption: 4: FinOps
      Set Hard Monthly Circuit Breaker Cap: 5: FinOps
    section Purchase Order
      Configure B2B Proforma Quote for 15 Seats: 5: FinOps
      Verify GSTIN 18% HSN/SAC Breakdown: 5: FinOps
      Print Official Quotation PDF: 5: FinOps
      Download Past Tax Invoices: 5: FinOps
```

### Critical Touchpoints:
- `UsageDashboardPage.tsx` (Active slots meter)
- `AiCreditsPage.tsx` (Budget cap & consumption)
- `ProformaQuotePage.tsx` (Printable GST quote PDF)
- `InvoicesPage.tsx` (Past receipts archive)


import React from 'react'
import { Link } from 'react-router-dom'
import {
  Map,
  Briefcase,
  Building2,
  GraduationCap,
  HelpCircle,
  FileCheck2,
  DollarSign,
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react'

export const SitemapPage: React.FC = () => {
  const sections = [
    {
      title: 'Job Search & Discovery Portals',
      icon: Briefcase,
      links: [
        { name: 'All Jobs Listing Feed', path: '/jobs', desc: 'Search 50,000+ open enterprise openings' },
        { name: 'Freshers & Graduate Hub (0 Exp)', path: '/jobs/freshers', desc: 'Trainee roles for 2025/2026 batch' },
        { name: 'Remote Jobs in India', path: '/jobs/remote', desc: 'Work-from-home verified tech positions' },
        { name: 'Paid College Internships', path: '/jobs/internships', desc: 'Summer & winter college internships' },
        { name: 'Featured Job: Graduate Trainee @ Tech Mahindra', path: '/jobs/job-101', desc: 'Detailed job description' },
        { name: 'Featured Job: Frontend Developer @ Razorpay', path: '/jobs/job-102', desc: 'Detailed job description' },
        { name: 'Featured Job: Cloud Support @ Persistent Systems', path: '/jobs/job-103', desc: 'Detailed job description' },
        { name: 'Featured Job: Full Stack Fresher @ Zoho', path: '/jobs/job-104', desc: 'Detailed job description' }
      ]
    },
    {
      title: 'Company Directory & Culture Insights',
      icon: Building2,
      links: [
        { name: 'Companies Directory', path: '/companies', desc: 'Browse verified MNCs, Startups & Unicorns' },
        { name: 'Tech Mahindra Profile & Jobs', path: '/companies/tech-mahindra', desc: 'Company overview & openings' },
        { name: 'Persistent Systems Profile & Jobs', path: '/companies/persistent-systems', desc: 'Company overview & openings' },
        { name: 'Razorpay Profile & Jobs', path: '/companies/razorpay', desc: 'Company overview & openings' },
        { name: 'Zoho Corporation Profile & Jobs', path: '/companies/zoho-corporation', desc: 'Company overview & openings' },
        { name: 'Swiggy Profile & Jobs', path: '/companies/swiggy', desc: 'Company overview & openings' }
      ]
    },
    {
      title: 'Campus & Student Ecosystem (Naukri Campus Model)',
      icon: GraduationCap,
      links: [
        { name: 'Campus Hub Home', path: '/campus', desc: 'Main student hub for contests & webinars' },
        { name: 'NCAT Aptitude Diagnostic Center', path: '/campus/tests', desc: 'Practice assessment with instant percentile' },
        { name: 'National Hackathons & Contests', path: '/campus/contests', desc: 'Hiring challenges with prize money' },
        { name: 'Masterclasses & Webinars', path: '/campus/webinars', desc: 'Live streams from tech leads' }
      ]
    },
    {
      title: 'Career Tools, Preparation & Intelligence',
      icon: FileCheck2,
      links: [
        { name: 'Interview Preparation Question Bank', path: '/interview-prep', desc: '2,500+ real interview questions with solutions' },
        { name: 'FastForward Career Services', path: '/services', desc: 'Priority applicant reach, AI resume scorer & recruiter badges' },
        { name: 'AI ATS Resume Checker', path: '/resume-builder', desc: 'Instant ATS compatibility score & keyword gap analysis' },
        { name: 'Salary Insights & Monthly In-Hand Calculator', path: '/salaries', desc: 'Compare role CTCs and calculate take-home pay' },
        { name: 'Career Guidance & Placement Playbooks', path: '/career-advice', desc: 'Articles and roadmaps for freshers' },
        { name: 'Article: 6-Month Placement Roadmap 2026', path: '/career-advice/art-1', desc: 'Comprehensive guide' },
        { name: 'Article: Top 10 ATS Resume Mistakes', path: '/career-advice/art-2', desc: 'Comprehensive guide' }
      ]
    },
    {
      title: 'Candidate Dashboard & Account',
      icon: Briefcase,
      links: [
        { name: 'Candidate Dashboard', path: '/dashboard', desc: 'Application tracking pipeline & metrics' },
        { name: 'Candidate Profile Editor', path: '/profile', desc: 'Education, skills, projects & resume manager' },
        { name: 'Job Seeker & Recruiter Login', path: '/login', desc: 'Account sign-in' },
        { name: 'New Account Registration', path: '/register', desc: 'Sign up for free' },
        { name: 'Password Recovery Flow', path: '/forgot-password', desc: 'Reset forgotten password' }
      ]
    },
    {
      title: 'Recruiter & Employer Portal',
      icon: Building2,
      links: [
        { name: 'Employer Zone Landing Page', path: '/employers', desc: 'Campus hiring solutions' },
        { name: 'Post a Job Opening Wizard', path: '/post-job', desc: 'Publish open roles directly' },
        { name: 'Recruiter Subscription Pricing', path: '/pricing', desc: 'Compare starter, growth & enterprise plans' },
        { name: 'Features & Solutions', path: '/features', desc: 'Detailed use cases and architecture' },
        { name: 'Interactive Product Tour Sandbox', path: '/product-tour', desc: 'Zero-login interactive testing' },
        { name: 'Integrations Directory', path: '/integrations', desc: 'Slack, GitHub, Workday & Stripe connectors' },
        { name: 'Customers & Wall of Love', path: '/customers', desc: 'Enterprise case studies & testimonials' },
        { name: 'Careers at Career Connect Pro', path: '/careers', desc: 'Our internal open positions' },
        { name: 'Contact Sales / Book a Demo', path: '/contact-sales', desc: '1-on-1 enterprise consultation' }
      ]
    },
    {
      title: 'Enterprise Workspace & Administration',
      icon: ShieldCheck,
      links: [
        { name: 'Executive Overview Dashboard', path: '/app', desc: 'KPIs, pipeline funnel & team metrics' },
        { name: 'Candidate CSV Importer', path: '/app/import-candidates', desc: 'Smart column mapping & bulk candidate ingestion' },
        { name: 'Export & Background Queue', path: '/app/export-queue', desc: 'Bulk ZIP resume bundles & CSV queue' },
        { name: 'Hiring Automations Canvas', path: '/app/workflows', desc: 'If-This-Then-That candidate routing rules' },
        { name: 'Notification Center & Inbox', path: '/app/notifications', desc: 'Mentions, alerts & system notices' },
        { name: 'Custom Reports & Analytics', path: '/app/reports', desc: 'Data export simulation (CSV/PDF)' },
        { name: 'Archived Items & Trash Bin', path: '/app/trash', desc: '30-day soft delete recovery' },
        { name: 'Team Members Directory', path: '/admin/team', desc: 'User invitations & role assignments' },
        { name: 'RBAC Roles Matrix', path: '/admin/roles', desc: 'Granular permissions editor' },
        { name: 'Domain Verification (@company.com)', path: '/admin/domain-verification', desc: 'Corporate DNS TXT ownership claim' },
        { name: 'IP Allowlist & Geofence', path: '/admin/ip-allowlist', desc: 'Restrict recruiter access to office VPN CIDRs' },
        { name: 'DPDP Data Retention & Purge', path: '/admin/data-retention', desc: 'Regulatory auto-erasure schedules' },
        { name: 'White-Label Branding & Schema', path: '/admin/branding', desc: 'Custom domain, brand colors & applicant fields' },
        { name: 'Transfer Organization Ownership', path: '/admin/transfer-ownership', desc: 'Step-up sudo authentication handoff' },
        { name: 'Security Audit Logs', path: '/admin/audit-logs', desc: 'Immutable chronological forensic logs' },
        { name: 'Row-Level Security (RLS) Manager', path: '/admin/security/rls', desc: 'Cryptographic multi-tenant Postgres isolation policies' },
        { name: 'Automated Backups & PITR', path: '/admin/backups', desc: 'Continuous WAL stream & Point-in-Time Recovery sandbox' },
        { name: 'SSO & SCIM Directory Sync', path: '/admin/sso', desc: 'Okta, Azure AD & SAML settings' }
      ]
    },
    {
      title: 'FinOps, Billing & Procurement',
      icon: DollarSign,
      links: [
        { name: 'Plan & Usage Metering Dashboard', path: '/billing/usage', desc: 'Active slots & resume credit meters' },
        { name: 'AI Screening Credits & Cap', path: '/billing/ai-credits', desc: 'Gemini API tokens & budget guardrails' },
        { name: 'B2B Proforma Quote Generator', path: '/billing/quote-generator', desc: 'Official GST procurement quote PDF' },
        { name: 'Payment Methods & Tax Settings', path: '/billing/payment-methods', desc: 'Cards, UPI & GSTIN management' },
        { name: 'Invoices & Billing History', path: '/billing/invoices', desc: 'Download past receipts & PDF invoices' },
        { name: 'Cancellation & Retention Survey', path: '/billing/cancel', desc: 'Plan pause & retention discount flow' }
      ]
    },
    {
      title: 'Platform Super-Admin (Founder God-Mode)',
      icon: ShieldCheck,
      links: [
        { name: 'Tenant Inspector & Impersonate', path: '/super-admin/tenants', desc: 'Multi-tenant master health & login-as-user' },
        { name: 'Global System Broadcast Banners', path: '/super-admin/broadcast', desc: 'Out-of-band maintenance notice creator' }
      ]
    },
    {
      title: 'Developer Platform & System Health',
      icon: HelpCircle,
      links: [
        { name: 'API Keys & Secrets Manager', path: '/developer/api-keys', desc: 'Create live & test API tokens' },
        { name: 'API Rate Limiting & DDoS Governance', path: '/developer/rate-limiting', desc: 'Token bucket quotas, burst caps & 429 throttling' },
        { name: 'Webhooks Configuration & Logs', path: '/developer/webhooks', desc: 'Event subscriptions & test pings' },
        { name: 'Connected Apps & OAuth Tokens', path: '/developer/apps', desc: 'Authorized third-party software' },
        { name: 'Interactive REST API Docs', path: '/developer/docs', desc: 'cURL samples & parameter schemas' },
        { name: 'Product Changelog', path: '/changelog', desc: 'Version history & feature releases' },
        { name: 'Live System Status Uptime', path: '/status', desc: '99.98% component availability monitor' },
        { name: 'Active Sessions & Devices', path: '/account/sessions', desc: 'Revoke authenticated browser sessions' },
        { name: 'GDPR Data Portability & Erasure', path: '/account/privacy-data', desc: 'Export archive or delete account' },
        { name: 'GDPR Right to Erasure / Delete Account', path: '/account/delete-account', desc: 'Pre-purge JSON data export & cryptographic wipe' },
        { name: 'Analytics & Telemetry Preferences', path: '/account/analytics-preferences', desc: 'Granular cookie & tracking consent toggles' },
        { name: 'Custom 403 Forbidden Error', path: '/403', desc: 'Permission denied page' },
        { name: 'Custom 500 Server Error', path: '/500', desc: 'Internal error fallback' },
        { name: 'Custom 429 Rate Limit Page', path: '/429', desc: 'Too many requests countdown' }
      ]
    },
    {
      title: 'Trust, Compliance & Enterprise Legal',
      icon: ShieldCheck,
      links: [
        { name: 'About Career Connect Pro', path: '/about', desc: 'Our founding mission, leadership & values' },
        { name: 'Contact Us & Office Locations', path: '/contact', desc: 'Helpdesk ticket form & hotlines' },
        { name: 'Frequently Asked Questions (FAQ)', path: '/faq', desc: 'Help center knowledge base' },
        { name: 'Fraud Alert & Imposter Warning', path: '/fraud-alert', desc: 'Anti-scam advisory & reporting' },
        { name: 'Privacy Policy (DPDP 2023)', path: '/privacy', desc: 'Data protection standards' },
        { name: 'Terms of Service', path: '/terms', desc: 'User agreement' },
        { name: 'Security Standards & Encryption', path: '/security', desc: 'ISO 27001 & SOC 2 architecture' },
        { name: 'SSL/TLS Transport Security Inspector', path: '/security/ssl', desc: 'TLS 1.3, HSTS preloading & Qualys A+ certificate audit' },
        { name: '1-Click Email Unsubscribe', path: '/unsubscribe', desc: 'Instant opt-out from job alerts & newsletters' },
        { name: 'Visual HTML Sitemap', path: '/sitemap', desc: 'Complete directory of all pages' }
      ]
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">Visual HTML Sitemap</span>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-emerald-300 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider">
          <Map className="w-4 h-4" />
          Complete Enterprise Index
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
          Visual HTML Sitemap & Route Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Every single page, sub-portal, tool, and legal document across Career Connect Pro is mapped below with zero broken links.
        </p>
      </div>

      {/* Sitemap Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((sec, idx) => {
          const Icon = sec.icon
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">{sec.title}</h3>
                </div>

                <ul className="space-y-3 pt-3">
                  {sec.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={link.path}
                        className="group block text-xs hover:text-indigo-600 transition-colors"
                      >
                        <div className="font-semibold text-slate-800 group-hover:text-indigo-600 flex items-center justify-between">
                          <span>{link.name}</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-indigo-600" />
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{link.desc}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}


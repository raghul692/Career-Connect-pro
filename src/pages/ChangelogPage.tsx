import React from 'react'
import { Sparkles, Calendar, CheckCircle2 } from 'lucide-react'

export const ChangelogPage: React.FC = () => {
  const releases = [
    {
      version: 'v2.4.0',
      date: '01 November 2026',
      badge: 'Major Release',
      title: 'Enterprise Multi-Tenancy & SCIM Directory Synchronization',
      summary: 'Complete architectural expansion introducing organization switching, SAML 2.0 Identity Provider connections, and granular 5-role RBAC matrices.',
      highlights: [
        'Added Okta, Azure AD, and Google Workspace SAML 2.0 Single Sign-On.',
        'Automated SCIM v2.0 directory sync for auto-provisioning and team member de-activation.',
        'Introduced immutable chronological security audit logs with actor IP tracking.',
        'Integrated real-time consumption metering progress bars for job slots and resume credits.'
      ]
    },
    {
      version: 'v2.3.0',
      date: '18 October 2026',
      badge: 'Feature Update',
      title: 'AI ATS Pre-Screening Engine & National Aptitude Diagnostic (NCAT)',
      summary: 'Automated candidate resume parsing and live aptitude assessment scoring across 500+ Indian engineering universities.',
      highlights: [
        'Integrated Workday & Taleo scoring algorithms evaluating metric density and keyword coverage.',
        'Launched NCAT Aptitude Diagnostic Center with instant percentile scoring.',
        'Added Take-Home monthly in-hand salary estimator calculating PF and tax deductions.'
      ]
    },
    {
      version: 'v2.2.0',
      date: '28 September 2026',
      badge: 'Performance & API',
      title: 'REST API v1 & Webhook Event Dispatcher',
      summary: 'Public developer platform enabling programmatic applicant synchronization with Greenhouse and Slack.',
      highlights: [
        'Sub-100ms distributed search queries across 100,000+ candidates.',
        'Live webhook dispatching with signed HMAC-SHA256 headers.',
        'Introduced Command Palette (Cmd + K) for rapid keyboard-driven navigation.'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 font-semibold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Product Changelog
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            What's New in Career Connect Pro
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Stay up to date with new feature releases, developer API enhancements, security improvements, and bug fixes.
          </p>
        </div>
      </section>

      {/* Changelog Timeline */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {releases.map((rel, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-lg font-extrabold text-slate-900">{rel.version}</span>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
                  {rel.badge}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {rel.date}
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900">{rel.title}</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{rel.summary}</p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2.5">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">Release Highlights</div>
              <ul className="space-y-2 text-xs text-slate-600">
                {rel.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}


import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Check,
  Zap,
  Building2,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Users,
  X
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'

export const PricingPage: React.FC = () => {
  const { showNotification } = useJobContext()
  const [isAnnual, setIsAnnual] = useState(true)
  const [teamSlots, setTeamSlots] = useState(5)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const handleSelectPlan = (planName: string) => {
    showNotification(`Selected "${planName}"! Redirecting to checkout & workspace setup.`)
  }

  const comparisonRows = [
    // Job Distribution
    { category: 'Job Requisitions & Sourcing', name: 'Active Job Slots', free: '1 Active Slot', pro: '10 Slots', ent: 'Unlimited' },
    { category: 'Job Requisitions & Sourcing', name: 'Job Slot Duration', free: '30 Days', pro: 'Permanent Live', ent: 'Permanent Live' },
    { category: 'Job Requisitions & Sourcing', name: 'Instant Candidate Alerts', free: false, pro: true, ent: true },
    { category: 'Job Requisitions & Sourcing', name: 'Branded Company Showcase', free: false, pro: true, ent: true },
    { category: 'Job Requisitions & Sourcing', name: 'National Campus Hackathons', free: false, pro: '1 Per Year', ent: 'Unlimited' },

    // Pre-Screening & NCAT
    { category: 'Assessment & Screening', name: 'NCAT Standardized Aptitude Scores', free: 'View summary', pro: 'Full breakdown', ent: 'Full breakdown + code' },
    { category: 'Assessment & Screening', name: 'AI ATS Keyword Pre-Screening', free: '5 resumes/mo', pro: '250 resumes/mo', ent: 'Unlimited' },
    { category: 'Assessment & Screening', name: 'Candidate Contact Unlocks', free: '10 / month', pro: '500 / month', ent: '2,500+ / month' },
    { category: 'Assessment & Screening', name: 'Collaborative Interview Scorecards', free: false, pro: true, ent: true },

    // Team & Governance
    { category: 'Team & Multi-Tenancy', name: 'Team Member Seats', free: '1 Recruiter', pro: '5 Included', ent: 'Custom (50+ Seats)' },
    { category: 'Team & Multi-Tenancy', name: 'Granular RBAC Roles Matrix', free: false, pro: 'Standard', ent: '5 Custom Roles' },
    { category: 'Team & Multi-Tenancy', name: 'Multiple Organization Workspaces', free: false, pro: false, ent: true },
    { category: 'Team & Multi-Tenancy', name: 'Immutable Security Audit Logs', free: false, pro: '7 Days', ent: '1 Year Retention' },

    // Developer & Integrations
    { category: 'Developer Platform', name: 'REST API Access', free: false, pro: '10k requests/mo', ent: '1M+ requests/mo' },
    { category: 'Developer Platform', name: 'Real-Time Webhooks', free: false, pro: '2 Endpoints', ent: 'Unlimited' },
    { category: 'Developer Platform', name: 'Greenhouse & Workday Sync', free: false, pro: false, ent: true },
    { category: 'Developer Platform', name: 'Slack Application Alerts', free: false, pro: true, ent: true },

    // Security & Compliance
    { category: 'Security & Compliance', name: 'SAML 2.0 Single Sign-On (SSO)', free: false, pro: false, ent: true },
    { category: 'Security & Compliance', name: 'SCIM Automated Directory Sync', free: false, pro: false, ent: true },
    { category: 'Security & Compliance', name: 'Enforced Organization 2FA', free: false, pro: true, ent: true },
    { category: 'Security & Compliance', name: 'SOC 2 Type II Compliance Report', free: false, pro: false, ent: true },
    { category: 'Security & Compliance', name: 'Dedicated Account Manager & SLA', free: false, pro: false, ent: '99.99% Uptime SLA' }
  ]

  const faqs = [
    {
      q: 'How does the 14-day free trial work?',
      a: 'You can test the Pro plan completely free for 14 days without inputting a credit card. You get 5 active job slots and 50 candidate resume unlocks immediately.'
    },
    {
      q: 'What is an "Active Job Slot"?',
      a: 'An active slot represents one concurrently published job opening. Once you fill a position or close it, that slot immediately becomes available to post another role.'
    },
    {
      q: 'Do you charge commissions or placement fees when we hire?',
      a: 'Zero. Career Connect Pro is a 100% pure SaaS subscription model. You never pay a percentage of candidate salary or recruitment success fees.'
    },
    {
      q: 'Can we claim Input Tax Credit (ITC) with GSTIN in India?',
      a: 'Yes! Enter your company GSTIN under Billing & Tax Settings to receive official GST tax invoices for 18% input credit reimbursement.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/employers" className="hover:text-indigo-600">Employers</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">Pricing & Plans</span>
        </nav>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 font-semibold text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          Transparent Enterprise Pricing
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Simple Plans Tailored for Engineering & Campus Scale
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Predictable flat-rate pricing. No agency commissions, no hidden per-hire markups, no surprises.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-bold ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-8 bg-indigo-600 rounded-full p-1 transition-colors relative cursor-pointer"
          >
            <div
              className={`w-6 h-6 bg-white rounded-full transition-transform shadow-xs ${
                isAnnual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-bold ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
              Annual Billing
            </span>
            <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </div>
        </div>
      </div>

      {/* 3 Pricing Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* Tier 1: Campus Starter */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col justify-between shadow-xs space-y-6">
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Campus Starter</div>
            <h3 className="text-2xl font-black text-slate-900">Free Tier</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Ideal for seed startups and local teams hiring their first junior developer or intern.
            </p>

            <div className="pt-2">
              <span className="text-4xl font-extrabold text-slate-900">₹0</span>
              <span className="text-xs text-slate-400 ml-1">/ forever</span>
            </div>

            <ul className="space-y-2.5 pt-4 text-xs text-slate-600 border-t border-slate-100">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 1 Active Job Slot</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 10 Candidate Resume Unlocks</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Basic NCAT Scorecard View</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Direct Candidate Messaging</li>
            </ul>
          </div>

          <Link
            to="/register"
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl text-center transition-colors cursor-pointer"
          >
            Start Free Forever
          </Link>
        </div>

        {/* Tier 2: Pro Growth (Featured) */}
        <div className="bg-white rounded-3xl border-2 border-indigo-600 p-8 flex flex-col justify-between shadow-xl relative space-y-6">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
            Most Popular for Growth
          </div>

          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">Pro Sourcing</div>
            <h3 className="text-2xl font-black text-slate-900">Growth Tier</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Designed for tech companies scaling engineering teams across multiple Indian cities.
            </p>

            <div className="pt-2">
              <span className="text-4xl font-extrabold text-slate-900">
                {isAnnual ? '₹7,999' : '₹9,999'}
              </span>
              <span className="text-xs text-slate-400 ml-1">/ month</span>
            </div>

            <ul className="space-y-2.5 pt-4 text-xs text-slate-600 border-t border-slate-100">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> 10 Active Job Slots</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> 500 Candidate Resume Unlocks / mo</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> Full NCAT Breakdown & Code View</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> 5 Recruiter Seats Included</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> Slack Channel Alerts & REST API</li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('Growth Pro Tier')}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-100 text-center transition-colors cursor-pointer"
          >
            Start 14-Day Free Pro Trial
          </button>
        </div>

        {/* Tier 3: Enterprise Campus Suite */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl space-y-6">
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">Enterprise Campus Suite</div>
            <h3 className="text-2xl font-black">Enterprise Scale</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              For global MNCs and high-volume campus recruiters conducting 500+ engineer drives.
            </p>

            <div className="pt-2">
              <span className="text-4xl font-extrabold">Custom</span>
              <span className="text-xs text-slate-400 ml-1">/ annual contract</span>
            </div>

            <ul className="space-y-2.5 pt-4 text-xs text-slate-300 border-t border-slate-800">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited Job Requisitions</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 2,500+ Candidate Resume Unlocks</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> SAML 2.0 SSO & SCIM Directory Sync</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Greenhouse / Workday Bi-Directional Sync</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Dedicated Solutions Architect & SLA</li>
            </ul>
          </div>

          <Link
            to="/contact-sales"
            className="w-full py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl text-center transition-colors cursor-pointer"
          >
            Schedule Enterprise Demo
          </Link>
        </div>
      </div>

      {/* Interactive Slot Estimator Calculator */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-extrabold text-slate-900">Custom Hiring Volume Estimator</h2>
          <p className="text-xs text-slate-500">Calculate estimated annual investment based on your required active openings</p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>Concurrent Openings: <strong className="text-indigo-600 text-sm">{teamSlots} Jobs</strong></span>
            <span>Est. Rate: <strong className="text-slate-900 font-mono text-sm">₹{(teamSlots * 1200).toLocaleString()} / month</strong></span>
          </div>
          <input
            type="range"
            min={1}
            max={30}
            value={teamSlots}
            onChange={(e) => setTeamSlots(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>1 Opening</span>
            <span>15 Openings</span>
            <span>30+ Openings</span>
          </div>
        </div>
      </div>

      {/* Comprehensive 50-Row Feature Matrix Table */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900">Detailed Feature Comparison Matrix</h2>
          <p className="text-xs text-slate-500">Exhaustive capability breakdown across all three service tiers</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6 w-2/5">Platform Feature</th>
                  <th className="py-4 px-4 text-center w-1/5">Free Starter</th>
                  <th className="py-4 px-4 text-center w-1/5 bg-indigo-50/50 text-indigo-950">Growth Pro</th>
                  <th className="py-4 px-4 text-center w-1/5">Enterprise Suite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-6">
                      <div className="font-bold text-slate-900">{row.name}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{row.category}</div>
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono">
                      {typeof row.free === 'boolean' ? (
                        row.free ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />
                      ) : (
                        row.free
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono bg-indigo-50/20 font-bold text-indigo-900">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? <Check className="w-4 h-4 text-indigo-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />
                      ) : (
                        row.pro
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-900">
                      {typeof row.ent === 'boolean' ? (
                        row.ent ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />
                      ) : (
                        row.ent
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Accordions */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500">Everything you need to know about billing, licensing, and cancellation</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i
            return (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-5 text-left font-bold text-sm text-slate-900 flex items-center justify-between cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-50 pt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

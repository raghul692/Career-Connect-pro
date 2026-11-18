import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  Zap,
  Shield,
  Layers,
  ArrowRight,
  CheckCircle2,
  Building2,
  GraduationCap,
  Users,
  Code2,
  ChevronRight
} from 'lucide-react'

export const FeaturesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'startups' | 'enterprise' | 'campuses'>('all')

  const capabilities = [
    {
      title: 'AI ATS Diagnostics & Pre-Screening',
      category: 'startups',
      description: 'Automatically parse candidate resumes against Workday and Taleo keyword parsers before human screening. Eliminate preliminary qualification bottlenecks.',
      icon: Sparkles,
      tag: 'Core Platform'
    },
    {
      title: 'National Campus Aptitude (NCAT) Network',
      category: 'campuses',
      description: 'Access standardized quantitative, logical, and coding assessment scores across 500+ Indian engineering colleges and universities.',
      icon: GraduationCap,
      tag: 'Class of 2026'
    },
    {
      title: 'Enterprise Role-Based Access Control (RBAC)',
      category: 'enterprise',
      description: 'Configure custom permissions for Owners, Recruiters, Hiring Managers, and Billing Viewers with immutable audit trail logging.',
      icon: Shield,
      tag: 'SOC 2 Ready'
    },
    {
      title: 'Developer REST APIs & Real-Time Webhooks',
      category: 'enterprise',
      description: 'Sync job postings, candidates, and interview scores directly with Greenhouse, Lever, Workday HCM, and Slack channels.',
      icon: Code2,
      tag: 'Developer Platform'
    },
    {
      title: 'Direct Hackathon & Hiring Challenges',
      category: 'campuses',
      description: 'Host branded online coding competitions, case studies, and engineering challenges with instant candidate leaderboard ranking.',
      icon: Zap,
      tag: 'Campus Hiring'
    },
    {
      title: 'Real-Time In-Hand Compensation Intelligence',
      category: 'startups',
      description: 'Benchmark compensation packages against 2,400+ hiring offers across Bengaluru, Chennai, Pune, and Hyderabad.',
      icon: Layers,
      tag: 'FinOps & Data'
    }
  ]

  const filteredCapabilities =
    activeTab === 'all' ? capabilities : capabilities.filter((c) => c.category === activeTab)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200 py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 font-semibold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Product Architecture & Features
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Engineered for High-Velocity Talent Acquisition
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From automated ATS diagnostics to nationwide campus placement challenges and enterprise developer APIs, discover why leading tech employers build their teams with Career Connect Pro.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              to="/product-tour"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-100 flex items-center gap-2 transition-all cursor-pointer"
            >
              Take Interactive Tour
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact-sales"
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-all cursor-pointer"
            >
              Book Enterprise Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions & Use Cases Tab Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-center gap-2 pb-8 flex-wrap">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Capabilities
          </button>
          <button
            onClick={() => setActiveTab('startups')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'startups' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            For Fast-Growing Startups
          </button>
          <button
            onClick={() => setActiveTab('enterprise')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'enterprise' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            For Enterprise Scale
          </button>
          <button
            onClick={() => setActiveTab('campuses')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'campuses' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            For Universities & Campus Hiring
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCapabilities.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 leading-snug">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                  <span>Explore Workflow</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Deep-dive Architecture Section */}
      <section className="bg-white border-t border-slate-200 py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Enterprise Grade Under the Hood
            </h2>
            <p className="text-sm text-slate-600">
              Zero compromises on security, scale, and multi-tenant reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <h4 className="font-bold text-base text-slate-900">SOC 2 Type II & ISO 27001</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Audited data security controls, TLS 1.3 encryption in transit, and AES-256 encryption at rest.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <h4 className="font-bold text-base text-slate-900">Sub-100ms Search Latency</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Distributed faceted indexes delivering instant filtering across 100,000+ candidates and job openings.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <h4 className="font-bold text-base text-slate-900">SCIM Directory Sync</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated user provisioning and de-provisioning with Okta, Azure AD, and Google Workspace.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


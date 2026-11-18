import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Sparkles,
  FileCheck2,
  Send,
  Zap,
  TrendingUp,
  Star,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Eye,
  Building2,
  Clock
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'

export const FastForwardServicesPage: React.FC = () => {
  const { showNotification } = useJobContext()
  const navigate = useNavigate()
  const [activePlan, setActivePlan] = useState<'3months' | '6months' | 'annual'>('6months')

  const services = [
    {
      id: 'ai-resume',
      title: 'AI Resume Score & Keyword Optimizer',
      badge: 'Popular',
      desc: 'Our Gemini-powered ATS analysis engine benchmarks your resume against 250,000+ shortlisted profiles in Indian tech MNCs.',
      icon: FileCheck2,
      features: [
        'ATS parseability test (Workday & Taleo compatible)',
        'Keyword gap analysis tailored to your target role',
        'Action-oriented bullet point rewrite recommendations',
        'Downloadable LaTeX & PDF clean format template'
      ],
      cta: 'Check Resume Score Free',
      link: '/resume-builder'
    },
    {
      id: 'recruiter-reach',
      title: 'Priority Applicant & Recruiter Reach',
      badge: '3x More Shortlists',
      desc: 'Highlight your application directly at the top of recruiter search inboxes (Naukri Resdex) with a verified candidate star badge.',
      icon: Zap,
      features: [
        'Top placement in recruiter talent searches',
        'SMS & WhatsApp alerts when recruiters view your CV',
        'Direct connection to 15,000+ verified hiring leads',
        'Monthly talent pool performance report'
      ],
      cta: 'Explore Priority Plan',
      link: '/pricing'
    },
    {
      id: 'interview-prep',
      title: 'Company-Specific Interview Question Bank',
      badge: '2,500+ Verified Qs',
      desc: 'Comprehensive interview experiences, system design rubrics, and coding rounds from TCS, Infosys, Razorpay, Swiggy, and Amazon.',
      icon: Award,
      features: [
        'Real questions asked in 2025/2026 technical rounds',
        'Coding challenges with time complexity breakdowns',
        'Behavioral HR round situation answers (STAR method)',
        'Managerial round case studies'
      ],
      cta: 'Browse Question Bank',
      link: '/interview-prep'
    }
  ]

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 bg-slate-50/50 overflow-hidden border-b border-slate-200/70">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200 shadow-2xs text-xs font-semibold text-blue-700">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Naukri FastForward &middot; Fast-Track Placement Suite</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Accelerate Your Hiring Speed with{' '}
            <span className="text-[#275df5]">
              Verified Career Services
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From automated AI resume benchmarking to priority recruiter inboxes, increase your profile visibility across top tech recruiters and campus hiring panels.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200/80 uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#275df5] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {item.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => navigate(item.link)}
                    className="w-full py-2.5 bg-[#275df5] hover:bg-[#1e4ed8] text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{item.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Social Proof Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0f172a] text-white rounded-2xl border border-slate-800 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Verified Candidate Outcomes
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Join 120,000+ Freshers &amp; Techies Placed Through FastForward
            </h2>
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
              Candidates utilizing our AI resume optimizer and priority reach secure interview callbacks 3.4x faster than standard portal applicants.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => navigate('/resume-builder')}
              className="px-6 py-3 bg-[#275df5] hover:bg-[#1e4ed8] text-white rounded-xl font-semibold text-xs shadow-sm transition-colors cursor-pointer"
            >
              Analyze Your Resume Now
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

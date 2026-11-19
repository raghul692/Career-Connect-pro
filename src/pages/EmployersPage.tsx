import React from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  Zap,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react'

export const EmployersPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Header */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-amber-300" />
            Recruiter Zone &middot; Hire Freshers & Engineers
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Hire Top Engineering & Campus Talent Faster
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Gain instant access to over 100,000+ verified engineering graduates, freshers, and experienced full-stack developers. Post jobs for free or run targeted campus recruitment hackathons.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              to="/post-job"
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
            >
              Post a Job for Free &rarr;
            </Link>
            <Link
              to="/pricing"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition-all"
            >
              View Recruiter Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Recruiter Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { metric: '100k+', label: 'Pre-assessed Candidates' },
            { metric: '350+', label: 'Engineering Colleges Covered' },
            { metric: '48 hrs', label: 'Average Time to First Shortlist' },
            { metric: '98%', label: 'Offer Acceptance Rate' }
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-1 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-indigo-600">{s.metric}</div>
              <div className="text-xs text-slate-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Why Enterprise HR Teams Choose Career Connect</h2>
          <p className="text-xs text-slate-500">Built specifically for high-volume campus hiring and technical screening</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Verified NCAT Scores</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every fresher profile includes diagnostic scores on aptitude, logical reasoning, and data structures. Filter out low performers before scheduling first rounds.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Zero Ghosting Guarantee</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Automated WhatsApp and SMS reminders ensure 95%+ candidate attendance during scheduled virtual interview slots.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Host National Hackathons</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Co-brand a national coding challenge with Career Connect Pro. Attract thousands of ambitious student engineers to your brand.
            </p>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            to="/post-job"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all"
          >
            <span>Start Hiring on Career Connect Pro</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  )
}


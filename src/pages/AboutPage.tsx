import React from 'react'
import { Link } from 'react-router-dom'
import {
  Award,
  ShieldCheck,
  ChevronRight,
  Heart
} from 'lucide-react'

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">About Career Connect Pro</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-14 text-white shadow-xl text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-400/30">
          Our Mission & Story
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
          Democratizing Tech Hiring for Indian Students & Graduates
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          We built Career Connect Pro to eliminate the opaque placement barrier between ambitious college students in Tier 1, 2, and 3 cities and verified global engineering employers.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { num: '100,000+', label: 'Registered Candidates', sub: 'Across 350+ Colleges' },
          { num: '2,500+', label: 'Verified Employers', sub: 'MNCs & Fast-growing Startups' },
          { num: '45,000+', label: 'Successful Placements', sub: 'Average CTC ₹7.2 LPA' },
          { num: '100%', label: 'Free for Students', sub: 'Zero Hidden Charges' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 text-center space-y-1 shadow-xs">
            <div className="text-3xl font-black text-indigo-600">{s.num}</div>
            <div className="text-xs font-bold text-slate-900">{s.label}</div>
            <div className="text-[11px] text-slate-400">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Core Values */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 space-y-8 shadow-xs">
        <div className="max-w-xl space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Our Founding Principles</h2>
          <p className="text-xs text-slate-500">How we maintain zero compromise on trust and candidate dignity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <ShieldCheck className="w-8 h-8 text-indigo-600" />
            <h3 className="font-bold text-base text-slate-900">Anti-Scam Absolute Zero</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every employer must verify their Corporate Identification Number (CIN) and official domain. Zero fake job postings, zero registration fee scams.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <Award className="w-8 h-8 text-emerald-600" />
            <h3 className="font-bold text-base text-slate-900">Skills Over Pedigree</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our NCAT diagnostic assessments enable talented developers from non-metro engineering colleges to prove their problem-solving ability directly to hiring leads.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <Heart className="w-8 h-8 text-rose-500" />
            <h3 className="font-bold text-base text-slate-900">Candidate-First Privacy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Resumes and contact details are disclosed only to companies you explicitly choose to apply to. Zero data harvesting or telemarketing spam.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}


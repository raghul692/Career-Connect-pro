import React from 'react'
import { Link } from 'react-router-dom'
import {
  Heart,
  Star,
  ArrowRight
} from 'lucide-react'
import { INITIAL_CASE_STUDIES } from '../data/mockData'

export const CustomersPage: React.FC = () => {
  const testimonials = [
    {
      name: 'Aditi Deshmukh',
      role: 'Head of Campus Recruiting, Persistent Systems',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop&crop=faces',
      quote: 'Career Connect Pro cut our campus drive recruitment cycle from 90 days to under 3 weeks. The pre-evaluated NCAT aptitude assessments allowed our engineers to meet only high-signal candidates.',
      company: 'Persistent Systems'
    },
    {
      name: 'Rahul Varma',
      role: 'Director of Talent, Swiggy',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=faces',
      quote: 'The caliber of freshers and lateral engineers on Career Connect Pro is outstanding. We scaled our merchant tooling team across 3 cities without paying a single external agency fee.',
      company: 'Swiggy'
    },
    {
      name: 'Manoj Kumar',
      role: 'Dean of Placements, PSG Tech Coimbatore',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=faces',
      quote: 'Over 850 students from our 2026 batch participated in the national hackathons on Career Connect Pro, with 40+ students receiving direct placement offers from unicorn startups.',
      company: 'PSG College of Technology'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-100 rounded-full text-red-600 font-semibold text-xs">
            <Heart className="w-3.5 h-3.5 fill-red-500" />
            Wall of Love & Case Studies
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Trusted by India's Top Tech Employers & Universities
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            See how enterprise leaders hire high-signal software talent at scale with zero recruiting waste.
          </p>
        </div>
      </section>

      {/* Case Studies Deep Dive */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-900">Featured Customer Stories</h2>
          <p className="text-xs sm:text-sm text-slate-500">Measurable impact from real recruitment drives</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INITIAL_CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <img
                    src={cs.companyLogo}
                    alt={cs.company}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                  />
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {cs.industry}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-900 leading-snug">{cs.headline}</h3>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {cs.metrics.map((m: { stat: string; label: string }, i: number) => (
                    <div key={i} className="text-center space-y-0.5">
                      <div className="text-lg font-extrabold text-indigo-700">{m.stat}</div>
                      <div className="text-[10px] text-slate-500 font-medium leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>

                <blockquote className="text-xs text-slate-600 italic leading-relaxed border-l-2 border-indigo-500 pl-3">
                  "{cs.quote}"
                </blockquote>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-slate-900">{cs.authorName}</div>
                  <div className="text-[11px] text-slate-400">{cs.authorTitle}</div>
                </div>
                <Link
                  to="/contact-sales"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  Read full story <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Wall of Love Testimonial Quotes */}
        <div className="pt-12 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">What Hiring Leaders Say</h2>
            <p className="text-xs sm:text-sm text-slate-500">Unfiltered feedback from enterprise recruitment directors</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-xs text-slate-900">{t.name}</div>
                    <div className="text-[10px] text-slate-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  DollarSign,
  TrendingUp,
  Calculator,
  Building2,
  ChevronRight,
  Info
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'

export const SalariesPage: React.FC = () => {
  const { companies } = useJobContext()
  const [annualCtc, setAnnualCtc] = useState<number>(800000)

  // In-hand calculation logic (standard Indian CTC breakdown)
  const basicSalary = Math.round(annualCtc * 0.45)
  const monthlyBasic = Math.round(basicSalary / 12)
  const monthlyPf = Math.round(monthlyBasic * 0.12)
  const monthlyPt = 200 // Professional tax
  const monthlyGross = Math.round(annualCtc / 12)
  const monthlyTakeHome = Math.max(0, monthlyGross - monthlyPf - monthlyPt)

  const benchmarks = [
    { role: 'Graduate Trainee / SDE-1', fresher: '₹4.5 - ₹8.5 LPA', mid: '₹9 - ₹18 LPA', senior: '₹20 - ₹35 LPA' },
    { role: 'Frontend Engineer (React/TS)', fresher: '₹5.0 - ₹9.0 LPA', mid: '₹10 - ₹20 LPA', senior: '₹22 - ₹40 LPA' },
    { role: 'DevOps & Cloud Engineer', fresher: '₹5.5 - ₹10.0 LPA', mid: '₹12 - ₹24 LPA', senior: '₹26 - ₹50 LPA' },
    { role: 'Data Analyst / BI', fresher: '₹4.2 - ₹7.5 LPA', mid: '₹8 - ₹15 LPA', senior: '₹18 - ₹30 LPA' },
    { role: 'Cybersecurity SOC Analyst', fresher: '₹4.5 - ₹8.0 LPA', mid: '₹9 - ₹16 LPA', senior: '₹19 - ₹32 LPA' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">Salary Insights & Calculator</span>
      </nav>

      {/* Hero Banner */}
      <div className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-amber-300 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider">
            <DollarSign className="w-4 h-4" />
            Naukri Salary Trends &middot; 2026 Edition
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Tech Salary Insights & In-Hand Calculator
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Real market compensation benchmarks across Indian tech hubs (Bengaluru, Chennai, Pune, Hyderabad) and an instant in-hand monthly salary estimator.
          </p>
        </div>
      </div>

      {/* 2-Column Grid: In-Hand Calculator + Benchmarks Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: TAKE-HOME CALCULATOR */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 font-bold text-base text-slate-900">
            <Calculator className="w-5 h-5 text-indigo-600" />
            <h3>In-Hand Monthly Calculator</h3>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Convert annual CTC into estimated monthly in-hand bank credit after PF and professional tax deductions.
          </p>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Annual Offered CTC (INR)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">₹</span>
              <input
                type="number"
                step="50000"
                value={annualCtc}
                onChange={(e) => setAnnualCtc(Number(e.target.value))}
                className="w-full text-sm font-bold text-slate-900 pl-8 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="text-[11px] text-slate-400">
              {(annualCtc / 100000).toFixed(1)} Lakhs Per Annum (LPA)
            </div>
          </div>

          {/* Result Card */}
          <div className="p-4 bg-indigo-50/70 border border-indigo-200/80 rounded-2xl space-y-3">
            <div className="text-xs text-indigo-700 font-bold uppercase tracking-wider">
              Estimated Monthly In-Hand
            </div>
            <div className="text-3xl font-black text-indigo-900">
              ₹{monthlyTakeHome.toLocaleString()}
              <span className="text-xs text-indigo-600 font-medium"> / month</span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 border-t border-indigo-100 pt-2.5">
              <div className="flex justify-between">
                <span>Gross Monthly CTC:</span>
                <span className="font-semibold">₹{monthlyGross.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>Employee PF (12%):</span>
                <span>- ₹{monthlyPf.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>Professional Tax:</span>
                <span>- ₹{monthlyPt}</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-start gap-1.5 bg-slate-50 p-3 rounded-xl">
            <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
            <span>Actual figures may vary based on company gratuity rules, medical insurance, and income tax tax regime.</span>
          </div>
        </div>

        {/* RIGHT 2 COLS: BENCHMARKS TABLE & COMPANY COMPARISON */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Market Salary Benchmarks by Role</h3>
                <p className="text-xs text-slate-500">Surveyed across 2,400+ hiring offers in 2026</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Updated Monthly
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-3">Role / Discipline</th>
                    <th className="py-3 px-3">Freshers (0-1 Yr)</th>
                    <th className="py-3 px-3">Mid-Level (1-3 Yrs)</th>
                    <th className="py-3 px-3">Senior (3-5+ Yrs)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {benchmarks.map((b, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-slate-900">{b.role}</td>
                      <td className="py-3.5 px-3 text-emerald-700 font-semibold">{b.fresher}</td>
                      <td className="py-3.5 px-3">{b.mid}</td>
                      <td className="py-3.5 px-3">{b.senior}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Company Median Salaries Grid */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              Median SDE-1 Package at Top Employers
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { company: 'Google India', median: '₹32.0 LPA', perks: 'Base + GSUs + Meals' },
                { company: 'Razorpay', median: '₹16.5 LPA', perks: 'Base + ESOPs' },
                { company: 'Swiggy', median: '₹15.0 LPA', perks: 'Remote allowance + Bonus' },
                { company: 'Persistent Systems', median: '₹7.5 LPA', perks: 'Certification perks + Bonus' },
                { company: 'Zoho Corporation', median: '₹8.5 LPA', perks: 'Zero bond + Full benefits' },
                { company: 'Tech Mahindra', median: '₹4.8 LPA', perks: 'Health insurance + Training' }
              ].map((c, i) => (
                <div key={i} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{c.company}</div>
                    <div className="text-[11px] text-slate-400">{c.perks}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-indigo-600 text-sm">{c.median}</span>
                    <span className="text-[10px] text-slate-400 block">Median CTC</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <Link to="/jobs" className="text-xs font-bold text-indigo-600 hover:underline">
                Browse jobs with verified salary disclosures &rarr;
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}


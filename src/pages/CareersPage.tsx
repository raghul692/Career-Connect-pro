import React, { useState } from 'react'
import {
  MapPin,
  Clock,
  Sparkles,
  Heart,
  Coffee,
  Laptop,
  X
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'

export const CareersPage: React.FC = () => {
  const { showNotification } = useJobContext()
  const [selectedDept, setSelectedDept] = useState('All')
  const [applyRole, setApplyRole] = useState<string | null>(null)
  const [applicantName, setApplicantName] = useState('')
  const [applicantEmail, setApplicantEmail] = useState('')

  const internalJobs = [
    { id: 'ccp-1', title: 'Senior Frontend Engineer (React/TypeScript)', dept: 'Engineering', location: 'Bengaluru / Remote', type: 'Full-time', exp: '3-6 Yrs' },
    { id: 'ccp-2', title: 'Backend Systems Architect (Go / Node)', dept: 'Engineering', location: 'Bengaluru', type: 'Full-time', exp: '5+ Yrs' },
    { id: 'ccp-3', title: 'Product Designer (Design Systems)', dept: 'Design', location: 'Chennai / Hybrid', type: 'Full-time', exp: '2-4 Yrs' },
    { id: 'ccp-4', title: 'Enterprise Account Executive', dept: 'Sales', location: 'Mumbai / Pune', type: 'Full-time', exp: '3-7 Yrs' },
    { id: 'ccp-5', title: 'Campus Partnership Associate', dept: 'Operations', location: 'Chennai', type: 'Full-time', exp: '1-3 Yrs' }
  ]

  const depts = ['All', 'Engineering', 'Design', 'Sales', 'Operations']

  const filtered = selectedDept === 'All' ? internalJobs : internalJobs.filter((j) => j.dept === selectedDept)

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault()
    showNotification(`Application submitted for ${applyRole}! Our team will contact you.`)
    setApplyRole(null)
    setApplicantName('')
    setApplicantEmail('')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 font-semibold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Join the Career Connect Pro Team
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Help Shape the Future of Tech Careers in India
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We are building high-trust, AI-empowered hiring infrastructure that connects thousands of ambitious students with India's fastest growing tech companies.
          </p>
        </div>
      </section>

      {/* Perks & Culture */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-3">
            <Laptop className="w-6 h-6 text-indigo-600" />
            <h3 className="font-bold text-base text-slate-900">Remote-Friendly Flexibility</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Work from our hubs in Bengaluru and Chennai, or 100% remotely with a dedicated home office stipend.</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-3">
            <Heart className="w-6 h-6 text-indigo-600" />
            <h3 className="font-bold text-base text-slate-900">Comprehensive Health & Wellness</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Full medical insurance coverage for you and your dependents, wellness days, and mental health subscriptions.</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-3">
            <Coffee className="w-6 h-6 text-indigo-600" />
            <h3 className="font-bold text-base text-slate-900">Learning & Tech Allowances</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Annual ₹50,000 budget for books, technical conferences, AWS certifications, and developer tooling.</p>
          </div>
        </div>

        {/* Open Positions List */}
        <div className="space-y-6 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Open Opportunities ({filtered.length})</h2>
              <p className="text-xs text-slate-500">Explore active roles across engineering, product, and enterprise growth</p>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {depts.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDept(d)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedDept === d ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
            {filtered.map((job) => (
              <div key={job.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-900">{job.title}</h3>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                      {job.dept}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {job.type}
                    </span>
                    <span>•</span>
                    <span>{job.exp}</span>
                  </div>
                </div>

                <button
                  onClick={() => setApplyRole(job.title)}
                  className="px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
                >
                  Apply for Role
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {applyRole && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Apply for Position</h3>
                <p className="text-xs text-indigo-600 font-semibold">{applyRole}</p>
              </div>
              <button onClick={() => setApplyRole(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApply} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Karthik Subramanian"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Work Email / Contact Email *</label>
                <input
                  type="email"
                  required
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  placeholder="karthik@example.com"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Portfolio / GitHub / LinkedIn URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/username"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setApplyRole(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


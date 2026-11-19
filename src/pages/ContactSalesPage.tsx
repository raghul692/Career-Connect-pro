import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'

export const ContactSalesPage: React.FC = () => {
  const { showNotification } = useJobContext()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    companyName: '',
    companySize: '50-200',
    hiringVolume: '10-50 hires / quarter',
    primaryGoal: 'Campus Trainee Drives',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    showNotification('Demo request scheduled! Our enterprise team will send a calendar invite.')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 font-semibold text-xs">
            <Calendar className="w-3.5 h-3.5" />
            Enterprise Consultation
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Schedule a Customized Enterprise Demo
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            See how Career Connect Pro streamlines national college campus drives, automates ATS pre-qualification, and synchronizes with Workday HCM.
          </p>
        </div>
      </section>

      {/* Main Grid: Benefits + Form */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Enterprise Benefits */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-slate-900">What to expect on the 30-min call</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A tailored walkthrough with an Enterprise Solutions Architect specializing in tech hiring and campus placement infrastructure.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-slate-900">Live NCAT Assessment Demo</div>
                  <div className="text-xs text-slate-500">How standardized student aptitude scoring eliminates 4 manual screening rounds.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-slate-900">Custom ATS & Webhook Architecture</div>
                  <div className="text-xs text-slate-500">Connecting candidate profiles directly with Greenhouse, Lever, or SAP SuccessFactors.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-slate-900">Security & Procurement Review</div>
                  <div className="text-xs text-slate-500">SOC 2 Type II compliance reports, SAML SSO setup, and dedicated SLA contracts.</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-indigo-50/80 rounded-3xl border border-indigo-100 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-700">Enterprise Helpline</div>
              <div className="space-y-1 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-indigo-600" />
                  +91 (080) 4123-8900 (Mon-Fri 9am-7pm IST)
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-indigo-600" />
                  enterprise@careerconnectpro.com
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                  Koramangala, Bengaluru, Karnataka, India
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Demo Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">Demo Request Received!</h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.firstName}</strong>. An Enterprise Solutions Architect has reserved your slot and sent a calendar invite to <strong>{formData.workEmail}</strong>.
                  </p>
                  <div className="pt-4">
                    <Link
                      to="/product-tour"
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
                    >
                      Explore Interactive Sandbox in the meantime →
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-extrabold text-xl text-slate-900">Book Your 1-on-1 Session</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">First Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="e.g. Vikram"
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="e.g. Joshi"
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Company Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="vikram.j@company.com"
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Company Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Persistent Systems"
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Company Headcount</label>
                      <select
                        value={formData.companySize}
                        onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                      >
                        <option value="1-50">1 - 50 employees</option>
                        <option value="50-200">50 - 200 employees</option>
                        <option value="200-1000">200 - 1,000 employees</option>
                        <option value="1000+">1,000+ employees (Global Enterprise)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Target Hiring Priority</label>
                      <select
                        value={formData.primaryGoal}
                        onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                      >
                        <option value="Campus Trainee Drives">Campus Trainee Drives (2025/2026 Batch)</option>
                        <option value="Lateral SDE & Tech Roles">Lateral SDE & Tech Hiring (1-5 Yrs)</option>
                        <option value="National Hackathons">Branded National Hackathon Sponsorship</option>
                        <option value="ATS & API Integration">ATS & Greenhouse API Integration</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Anything specific you'd like covered?</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="E.g. We are planning a 500-engineer fresher drive across 12 engineering colleges in Tamil Nadu and Karnataka..."
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-100 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    Confirm & Schedule Demo Call
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    By submitting, you agree to our <Link to="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link> and SOC 2 data protection terms.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


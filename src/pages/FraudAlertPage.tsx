import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldAlert,
  AlertTriangle,
  Send,
  CheckCircle2,
  ChevronRight
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'

export const FraudAlertPage: React.FC = () => {
  const { showNotification } = useJobContext()
  const [reported, setReported] = useState(false)
  const [reportData, setReportData] = useState({
    scamType: 'Demanded registration fee for interview',
    imposterName: '',
    contactInfo: '',
    details: ''
  })

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault()
    setReported(true)
    showNotification('Fraud report logged! Our Trust & Security forensics unit will investigate immediately.')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">Trust & Safety &middot; Fraud Alert</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-gradient-to-tr from-rose-950 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          Zero Tolerance Safety Protocol
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
          Trust & Safety: Protect Yourself from Job Scams
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Career Connect Pro and verified corporate hiring partners <strong>NEVER</strong> demand money, registration fees, security deposits, or gift cards at any stage of the recruitment process.
        </p>
      </div>

      {/* 3 Common Red Flags */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Demanding &quot;Registration&quot; Fees</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Scammers ask for ₹500 to ₹5,000 claiming it is a &quot;refundable interview security deposit&quot;. Legitimate employers never charge candidates.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Unsolicited Offer Letters</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Receiving an immediate high-paying offer letter via WhatsApp or Telegram without any technical assessment or video interview is a standard fraud tactic.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Free Public Email Domains</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Real recruiters communicate via official company domains (e.g. <code>@techmahindra.com</code> or <code>@infosys.com</code>), not generic <code>gmail.com</code> addresses.
          </p>
        </div>
      </div>

      {/* Report Form */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Report an Imposter Recruiter or Fraudulent Post</h2>
          <p className="text-xs text-slate-500 mt-1">Our forensics unit blacklists fraudulent phone numbers and accounts within 15 minutes of investigation.</p>
        </div>

        {reported ? (
          <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2 text-xs text-emerald-800">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <div className="font-bold text-sm">Fraud Report Submitted</div>
            <p>Thank you for protecting our student community. Our trust unit is reviewing the evidence provided.</p>
          </div>
        ) : (
          <form onSubmit={handleReport} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Type of Fraud Observed *</label>
                <select
                  value={reportData.scamType}
                  onChange={(e) => setReportData({ ...reportData, scamType: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
                >
                  <option value="Demanded registration fee for interview">Demanded money or registration fee</option>
                  <option value="Fake appointment letter received">Fake appointment letter or job offer</option>
                  <option value="Asked for bank account OTP or card details">Asked for bank OTP / credit card details</option>
                  <option value="Impersonating verified company">Impersonating verified corporate brand</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Imposter Name / Claimed Company *</label>
                <input
                  type="text"
                  required
                  placeholder="E.g. Imposter claiming to be from Infosys HR"
                  value={reportData.imposterName}
                  onChange={(e) => setReportData({ ...reportData, imposterName: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-semibold text-slate-700">Imposter Phone Number, Email, or WhatsApp Link *</label>
                <input
                  type="text"
                  required
                  placeholder="E.g. +91 98765 00000 or fake-hr@gmail.com"
                  value={reportData.contactInfo}
                  onChange={(e) => setReportData({ ...reportData, contactInfo: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-semibold text-slate-700">Description of Incident & Evidence *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain what the imposter asked for, payment links sent, or messages received..."
                  value={reportData.details}
                  onChange={(e) => setReportData({ ...reportData, details: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Submit Urgent Fraud Report
            </button>
          </form>
        )}
      </div>

    </div>
  )
}


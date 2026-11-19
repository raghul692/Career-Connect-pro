import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  MailX,
  CheckCircle2,
  BellOff,
  RotateCcw,
  ShieldCheck,
  Briefcase
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

interface PreferenceItem {
  id: string
  title: string
  description: string
  enabled: boolean
}

const DEFAULT_PREFERENCES: PreferenceItem[] = [
  {
    id: 'daily_jobs',
    title: 'Daily Verified Job Alerts & Recommendations',
    description: 'Instant notifications when freshers, IT, and campus recruitment roles match your profile.',
    enabled: true
  },
  {
    id: 'recruiter_inmail',
    title: 'Direct Recruiter InMails & Interview Invitations',
    description: 'Verified enterprise employers reaching out with shortlisted interview slots.',
    enabled: true
  },
  {
    id: 'campus_contests',
    title: 'Campus Hackathons & National NCAT Test Alerts',
    description: 'Updates on national placement tests, scholarship exams, and hiring hackathons.',
    enabled: true
  },
  {
    id: 'career_guides',
    title: 'Salary Benchmarks & Career Placement Guides',
    description: 'Weekly breakdowns of fresher salaries, tech interview questions, and resume advice.',
    enabled: false
  },
  {
    id: 'marketing_offers',
    title: 'Career Connect FastForward & Partner Promotions',
    description: 'Discounts on premium AI resume reviews, priority recruiter reach, and mock interviews.',
    enabled: false
  }
]

export const UnsubscribePage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const emailParam = searchParams.get('email') || 'alex.johnson@example.com'
  const { showNotification } = useJobContext()

  const [preferences, setPreferences] = useState<PreferenceItem[]>(DEFAULT_PREFERENCES)
  const [unsubscribedAll, setUnsubscribedAll] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [canUndo, setCanUndo] = useState(false)
  const [previousState, setPreviousState] = useState<PreferenceItem[] | null>(null)

  const handleToggle = (id: string) => {
    setPreferences((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    )
    setSavedSuccess(false)
    setUnsubscribedAll(false)
  }

  const handleUnsubscribeAll = () => {
    setPreviousState([...preferences])
    setPreferences((prev) => prev.map((item) => ({ ...item, enabled: false })))
    setUnsubscribedAll(true)
    setCanUndo(true)
    setSavedSuccess(true)
    showNotification('You have been unsubscribed from all email communications.')
  }

  const handleUndo = () => {
    if (previousState) {
      setPreferences(previousState)
      setUnsubscribedAll(false)
      setCanUndo(false)
      setSavedSuccess(true)
      showNotification('Subscription preferences restored.')
    }
  }

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault()
    setSavedSuccess(true)
    showNotification('Email notification preferences saved successfully.')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
      {/* Brand & Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Briefcase className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 group-hover:text-indigo-600">CareerConnectPro</span>
        </Link>
        <span className="text-slate-400">Email Preferences Center</span>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
        
        {/* Header */}
        <div className="space-y-2 border-b border-slate-100 pb-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
            <MailX className="w-4 h-4 text-indigo-600" />
            1-Click Email Management
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Manage Email Subscriptions
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Updating delivery preferences for: <strong className="text-slate-900">{emailParam}</strong>
          </p>
        </div>

        {/* 1-Click Unsubscribe from All Banner */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BellOff className="w-5 h-5 text-slate-600 shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-900">Stop All Future Emails</div>
              <div className="text-[11px] text-slate-500">Instantly halt all job alerts, newsletters, and marketing</div>
            </div>
          </div>

          <button
            onClick={handleUnsubscribeAll}
            className="w-full sm:w-auto px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs rounded-xl cursor-pointer transition-colors shrink-0"
          >
            Unsubscribe from All
          </button>
        </div>

        {/* Success / Undo Notification */}
        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-xs text-emerald-900 animate-in fade-in">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              {unsubscribedAll
                ? 'You have been unsubscribed from all optional email channels.'
                : 'Your email preferences have been recorded.'}
            </div>

            {canUndo && (
              <button
                onClick={handleUndo}
                className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-900 underline cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Undo
              </button>
            )}
          </div>
        )}

        {/* Granular Toggles List */}
        <form onSubmit={handleSavePreferences} className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Or Customize Individual Notifications:
          </div>

          <div className="space-y-3">
            {preferences.map((item) => (
              <label
                key={item.id}
                className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                  item.enabled
                    ? 'bg-indigo-50/40 border-indigo-200'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.enabled}
                  onChange={() => handleToggle(item.id)}
                  className="mt-0.5 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 accent-indigo-600"
                />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-900">{item.title}</div>
                  <div className="text-[11px] text-slate-500 leading-relaxed">{item.description}</div>
                </div>
              </label>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Essential transactional emails (such as password resets and payment invoices) cannot be disabled.</span>
          </div>

          <div className="flex justify-between items-center pt-4">
            <Link to="/jobs" className="text-xs font-bold text-slate-500 hover:text-slate-800">
              &larr; Return to Job Search
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-colors"
            >
              Save Email Preferences
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}


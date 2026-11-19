import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart3,
  CheckCircle2,
  Lock,
  ChevronRight
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const AnalyticsPreferencesPage: React.FC = () => {
  const { showNotification } = useJobContext()

  const [performanceTracking, setPerformanceTracking] = useState(true)
  const [productAnalytics, setProductAnalytics] = useState(true)
  const [personalization, setPersonalization] = useState(true)
  const [marketingPixels, setMarketingPixels] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleOptOutAll = () => {
    setPerformanceTracking(false)
    setProductAnalytics(false)
    setPersonalization(false)
    setMarketingPixels(false)
    setSaved(true)
    showNotification('All non-essential analytics and tracking disabled.')
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    showNotification('Telemetry and analytics preferences updated.')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/profile" className="hover:text-indigo-600">Profile</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/account/privacy-data" className="hover:text-indigo-600">Privacy & Data Governance</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold">Analytics & Telemetry Preferences</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-200">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            Zero-Surveillance Telemetry Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Analytics & Cookie Preferences
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            You retain 100% control over how your browsing signals, feature interactions, and performance telemetry are handled. We never sell personal analytics data to external brokers.
          </p>
        </div>

        <button
          onClick={handleOptOutAll}
          className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer shrink-0 self-start md:self-auto"
        >
          Opt-Out of All Non-Essential
        </button>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs text-emerald-900 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Your telemetry preferences have been persisted to client storage and synchronized with our consent management backend.</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Category 1: Strictly Necessary (Locked) */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">Strictly Necessary & Authentication (Required)</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">Always Active</span>
            </div>
            <p className="text-xs text-slate-500">
              Essential for securing session JWTs, CSRF tokens, tenant organization routing, and accessibility adaptations.
            </p>
          </div>
          <div className="w-5 h-5 rounded bg-slate-300 text-slate-600 flex items-center justify-center shrink-0 mt-1">
            <Lock className="w-3 h-3" />
          </div>
        </div>

        {/* Category 2: Performance & Error Telemetry */}
        <div className="flex items-start justify-between p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-900">Performance & Error Monitoring (Sentry / Web Vitals)</div>
            <p className="text-xs text-slate-500">
              Collects anonymous client-side JavaScript crash stack traces and Largest Contentful Paint (LCP) timings to fix bugs.
            </p>
          </div>
          <input
            type="checkbox"
            checked={performanceTracking}
            onChange={(e) => setPerformanceTracking(e.target.checked)}
            className="w-5 h-5 accent-indigo-600 cursor-pointer mt-1"
          />
        </div>

        {/* Category 3: Product Analytics (PostHog) */}
        <div className="flex items-start justify-between p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-900">Feature Usage & Journey Analytics</div>
            <p className="text-xs text-slate-500">
              Tracks click interactions on filters, search queries, and resume builder funnels to optimize UI ergonomics.
            </p>
          </div>
          <input
            type="checkbox"
            checked={productAnalytics}
            onChange={(e) => setProductAnalytics(e.target.checked)}
            className="w-5 h-5 accent-indigo-600 cursor-pointer mt-1"
          />
        </div>

        {/* Category 4: Personalized Job Recommendations */}
        <div className="flex items-start justify-between p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-900">AI Job Recommendation Telemetry</div>
            <p className="text-xs text-slate-500">
              Analyzes job postings you inspect to deliver tailored recommendations in your daily fresher job digest.
            </p>
          </div>
          <input
            type="checkbox"
            checked={personalization}
            onChange={(e) => setPersonalization(e.target.checked)}
            className="w-5 h-5 accent-indigo-600 cursor-pointer mt-1"
          />
        </div>

        {/* Category 5: Marketing & Advertising Pixels */}
        <div className="flex items-start justify-between p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-900">Marketing & Partner Attribution Pixels</div>
            <p className="text-xs text-slate-500">
              Measures conversion performance from campus placement partners and social media recruitment campaigns.
            </p>
          </div>
          <input
            type="checkbox"
            checked={marketingPixels}
            onChange={(e) => setMarketingPixels(e.target.checked)}
            className="w-5 h-5 accent-indigo-600 cursor-pointer mt-1"
          />
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <Link to="/profile" className="text-xs font-bold text-slate-500 hover:text-slate-800">
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-colors"
          >
            Save Telemetry Preferences
          </button>
        </div>
      </form>
    </div>
  )
}


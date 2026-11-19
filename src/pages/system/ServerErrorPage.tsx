import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, RefreshCw } from 'lucide-react'

export const ServerErrorPage: React.FC = () => {
  const [retrying, setRetrying] = useState(false)
  const [traceId] = useState(() => `trc_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`)

  const handleRetry = () => {
    setRetrying(true)
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
            HTTP 500 · Internal Server Error
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Something Went Wrong</h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Our site reliability engineering team has been automatically alerted via PagerDuty. We are working to restore normal service.
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-500 space-y-1 text-left font-mono">
          <div>Incident Trace ID: <strong>{traceId}</strong></div>
          <div>Region: <strong>ap-south-1 (Mumbai)</strong></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <button
            onClick={handleRetry}
            disabled={retrying}
            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${retrying ? 'animate-spin' : ''}`} />
            {retrying ? 'Reloading...' : 'Retry Request'}
          </button>
          <Link
            to="/status"
            className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            View Live Status
          </Link>
        </div>
      </div>
    </div>
  )
}


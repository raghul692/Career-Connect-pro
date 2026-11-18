import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Zap, Home, Sparkles } from 'lucide-react'

export const RateLimitPage: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(30)

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [secondsLeft])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
          <Clock className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            HTTP 429 · Rate Limit Reached
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Too Many Requests</h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Your client has exceeded the standard API rate limit threshold of <strong>100 requests per minute</strong>.
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 space-y-1">
          <div>Quota resets in: <strong className="font-mono text-indigo-700 text-base">{secondsLeft}s</strong></div>
          <div className="text-[11px] text-slate-400">Header: X-RateLimit-Reset</div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Link
            to="/pricing"
            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> Upgrade to Enterprise Throughput
          </Link>
          <Link
            to="/app"
            className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}


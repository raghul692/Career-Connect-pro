import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, ArrowRight, RefreshCw } from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const MagicLinkSentPage: React.FC = () => {
  const { showNotification } = useJobContext()
  const [countdown, setCountdown] = useState(45)
  const navigate = useNavigate()

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleResend = () => {
    setCountdown(60)
    showNotification('A fresh magic login link has been dispatched to your email!')
  }

  const handleSimulateClick = () => {
    showNotification('Magic link token verified! Redirecting to dashboard...')
    setTimeout(() => {
      navigate('/app')
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 animate-bounce" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Check Your Inbox</h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We’ve emailed a passwordless magic sign-in link to your corporate work address.
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-500 space-y-1">
          <div>Links are valid for <strong>15 minutes</strong>.</div>
          <div>Check your spam or junk folder if you don’t see it in 1 minute.</div>
        </div>

        {/* Quick simulation button for testing */}
        <div className="pt-2">
          <button
            onClick={handleSimulateClick}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-100 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <span>Simulate Clicking Email Magic Link</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400">Didn't receive code?</span>
          {countdown > 0 ? (
            <span className="text-slate-400 font-mono">Resend in {countdown}s</span>
          ) : (
            <button
              onClick={handleResend}
              className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Resend Link
            </button>
          )}
        </div>

        <div className="text-[11px] text-slate-400">
          Want to use password instead? <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Return to Login</Link>
        </div>
      </div>
    </div>
  )
}


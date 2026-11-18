import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, CheckCircle2, RefreshCw, ArrowRight, X } from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const VerifyEmailPage: React.FC = () => {
  const { userProfile, showNotification } = useJobContext()
  const [resending, setResending] = useState(false)
  const navigate = useNavigate()

  const handleResend = () => {
    setResending(true)
    setTimeout(() => {
      setResending(false)
      showNotification('A fresh verification link has been sent to your inbox!')
    }, 1000)
  }

  const handleSimulateVerify = () => {
    showNotification('Email verified! Welcome to Career Connect Pro.')
    setTimeout(() => {
      navigate('/onboarding')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-indigo-600 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Verify Your Email Address</h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We sent an activation link to <strong>{userProfile.email}</strong>. Please confirm your address to activate full workspace access.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleSimulateVerify}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-100 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <span>Simulate Clicking Email Verification Link</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleResend}
            disabled={resending}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
            <span>{resending ? 'Sending...' : 'Resend Verification Email'}</span>
          </button>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <Link to="/register" className="hover:text-slate-600">Wrong email? Change address</Link>
          <Link to="/login" className="hover:text-slate-600">Sign Out</Link>
        </div>
      </div>
    </div>
  )
}


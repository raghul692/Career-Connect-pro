import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, CheckCircle2, XCircle, ArrowRight, ShieldCheck } from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const ResetPasswordPage: React.FC = () => {
  const { showNotification } = useJobContext()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
    match: password.length > 0 && password === confirmPassword
  }

  const isFormValid = Object.values(checks).every(Boolean)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    showNotification('Password updated successfully! Please sign in with your new password.')
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
          <Lock className="w-5 h-5" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Set New Password</h1>
          <p className="text-xs text-slate-600">
            Choose a strong password to protect your candidate applications and workspace data.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">New Password *</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600 transition-all font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Confirm New Password *</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600 transition-all font-mono"
            />
          </div>

          {/* Password Security Checklist */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
            <div className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">Security Requirements</div>
            <div className="grid grid-cols-1 gap-1.5 text-slate-600">
              <div className="flex items-center gap-2">
                {checks.length ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-slate-300" />}
                <span className={checks.length ? 'text-slate-900 font-semibold' : ''}>At least 8 characters</span>
              </div>
              <div className="flex items-center gap-2">
                {checks.uppercase ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-slate-300" />}
                <span className={checks.uppercase ? 'text-slate-900 font-semibold' : ''}>Contains an uppercase letter (A-Z)</span>
              </div>
              <div className="flex items-center gap-2">
                {checks.number ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-slate-300" />}
                <span className={checks.number ? 'text-slate-900 font-semibold' : ''}>Contains a number (0-9)</span>
              </div>
              <div className="flex items-center gap-2">
                {checks.special ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-slate-300" />}
                <span className={checks.special ? 'text-slate-900 font-semibold' : ''}>Contains a symbol (!@#$%^&*)</span>
              </div>
              <div className="flex items-center gap-2">
                {checks.match ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-slate-300" />}
                <span className={checks.match ? 'text-slate-900 font-semibold' : ''}>Passwords match exactly</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isFormValid
                ? 'bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100'
                : 'bg-slate-300 cursor-not-allowed'
            }`}
          >
            <span>Reset Password & Log In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Remember password? <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Return to Login</Link>
        </div>
      </div>
    </div>
  )
}


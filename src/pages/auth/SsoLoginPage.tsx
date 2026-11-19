import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight, CheckCircle2
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const SsoLoginPage: React.FC = () => {
  const { showNotification } = useJobContext()
  const [workEmail, setWorkEmail] = useState('')
  const [detectedProvider, setDetectedProvider] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setWorkEmail(val)
    if (val.includes('@techmahindra.com')) {
      setDetectedProvider('Okta Enterprise SSO (Tech Mahindra Directory)')
    } else if (val.includes('@razorpay.com')) {
      setDetectedProvider('Google Workspace SAML (Razorpay)')
    } else if (val.includes('@persistent.com')) {
      setDetectedProvider('Microsoft Entra ID / Azure AD (Persistent Systems)')
    } else {
      setDetectedProvider(null)
    }
  }

  const handleSsoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    showNotification('Redirecting to your enterprise Identity Provider (IdP)...')
    setTimeout(() => {
      navigate('/app')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-extrabold text-sm">
              C
            </div>
            <span className="font-extrabold text-sm tracking-tight text-slate-900">CareerConnectPro</span>
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
            Enterprise SAML
          </span>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Enterprise Single Sign-On</h1>
          <p className="text-xs text-slate-600">
            Sign in via Okta, Microsoft Entra ID (Azure AD), Ping Identity, or Google Workspace.
          </p>
        </div>

        <form onSubmit={handleSsoSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Enter your corporate work email</label>
            <input
              type="email"
              required
              value={workEmail}
              onChange={handleEmailChange}
              placeholder="e.g. name@techmahindra.com or name@razorpay.com"
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600 transition-all"
            />
          </div>

          {detectedProvider && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Configured IdP: <strong>{detectedProvider}</strong></span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-100 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Proceed with Single Sign-On</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <Link to="/login" className="hover:text-indigo-600">Password Login</Link>
          <Link to="/contact-sales" className="text-indigo-600 font-semibold hover:underline">Setup SAML for your domain</Link>
        </div>
      </div>
    </div>
  )
}


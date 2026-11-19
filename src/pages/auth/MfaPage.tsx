import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShieldCheck, Lock } from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const MfaPage: React.FC = () => {
  const { showNotification } = useJobContext()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [useBackupCodes, setUseBackupCodes] = useState(false)
  const [backupCode, setBackupCode] = useState('')
  const [trustDevice, setTrustDevice] = useState(true)
  const navigate = useNavigate()

  const handleOtpChange = (val: string, index: number) => {
    if (val.length > 1) val = val.slice(-1)
    const next = [...otp]
    next[index] = val
    setOtp(next)

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    showNotification('Two-Factor Authentication verified successfully!')
    setTimeout(() => {
      navigate('/app')
    }, 800)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
            2FA Active
          </span>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Two-Factor Authentication</h1>
          <p className="text-xs text-slate-600">
            Open your authenticator app (Google Authenticator, 1Password, Duo) and enter the 6-digit code.
          </p>
        </div>

        {!useBackupCodes ? (
          <form onSubmit={handleVerify} className="space-y-6">
            {/* 6-box input */}
            <div className="flex justify-between gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  className="w-12 h-14 text-center font-mono text-xl font-bold rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="trust"
                checked={trustDevice}
                onChange={(e) => setTrustDevice(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
              />
              <label htmlFor="trust" className="text-xs text-slate-600 cursor-pointer">
                Trust this browser session for 30 days
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-100 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Verify & Continue</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Enter Emergency Backup Recovery Code</label>
              <input
                type="text"
                required
                value={backupCode}
                onChange={(e) => setBackupCode(e.target.value)}
                placeholder="e.g. 4829-1092-4412"
                className="w-full text-xs font-mono p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
            >
              Verify Recovery Code
            </button>
          </form>
        )}

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <button
            type="button"
            onClick={() => setUseBackupCodes(!useBackupCodes)}
            className="text-indigo-600 font-semibold hover:underline cursor-pointer"
          >
            {useBackupCodes ? 'Use Authenticator App' : 'Lost phone? Use Backup Code'}
          </button>
          <Link to="/login" className="hover:text-slate-700">Sign Out</Link>
        </div>
      </div>
    </div>
  )
}


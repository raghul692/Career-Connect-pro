import React, { useState } from 'react'
import { ShieldAlert, KeyRound, X, Lock, CheckCircle2 } from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const SudoModeModal: React.FC = () => {
  const { isSudoModalOpen, sudoActionName, closeSudoModal, verifySudoPassword } = useJobContext()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  if (!isSudoModalOpen) return null

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) {
      setError(true)
      return
    }
    const success = verifySudoPassword(password)
    if (!success) {
      setError(true)
    } else {
      setPassword('')
      setError(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-5 animate-in zoom-in-95">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Step-Up Authentication</h3>
              <p className="text-xs text-slate-500 font-medium">Sudo session required for sensitive operation</p>
            </div>
          </div>
          <button
            onClick={closeSudoModal}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900">
          <span className="font-bold">Privileged Action:</span>{' '}
          <span className="font-mono text-amber-950 font-semibold">{sudoActionName || 'Master Security Configuration'}</span>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
              <span>Account Master Password</span>
              <span className="text-[11px] text-slate-400">Testing pwd: any 4+ chars</span>
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (error) setError(false)
                }}
                autoFocus
                placeholder="Enter your login password"
                className={`w-full pl-9 pr-3 py-2 text-xs border rounded-xl focus:outline-none focus:ring-2 ${
                  error
                    ? 'border-red-300 focus:ring-red-200 bg-red-50/30'
                    : 'border-slate-200 focus:ring-indigo-200 focus:border-indigo-500'
                }`}
              />
            </div>
            {error && (
              <p className="text-[11px] text-red-600 font-medium">
                Invalid verification password. Please try again (min 4 characters).
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={closeSudoModal}
              className="flex-1 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              Confirm & Authorize
            </button>
          </div>
        </form>

        <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1.5 border-t border-slate-100 pt-3">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          <span>Sudo grant expires in 15 minutes of inactivity</span>
        </div>
      </div>
    </div>
  )
}


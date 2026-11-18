import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldAlert, ArrowLeft, Home, HelpCircle } from 'lucide-react'

export const ForbiddenPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            HTTP 403 · Access Denied
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Permission Required</h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Your current enterprise user role does not have authorization to view this administrative resource. Contact your Organization Owner to request access.
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-500 space-y-1 text-left font-mono">
          <div>Required Scope: <strong>admin.rbac_write</strong></div>
          <div>Current Role: <strong>Recruiter</strong></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Link
            to="/app"
            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" /> Return to Dashboard
          </Link>
          <Link
            to="/contact-sales"
            className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            Request Access
          </Link>
        </div>
      </div>
    </div>
  )
}


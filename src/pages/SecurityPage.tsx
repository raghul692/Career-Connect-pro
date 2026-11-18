import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Lock, Server, Key, ChevronRight, CheckCircle2 } from 'lucide-react'

export const SecurityPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">Security Standards</span>
      </nav>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
        
        <div className="space-y-2 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            ISO 27001 & SOC 2 Type II Architecture
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Security Architecture & Data Encryption
          </h1>
          <p className="text-xs text-slate-400">Enterprise Grade Infrastructure Security</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <Lock className="w-6 h-6 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-900">256-bit AES Encryption at Rest</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All candidate resumes, personal contact records, and assessment test scores are encrypted at rest using AES-256 with automated key rotation.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <Server className="w-6 h-6 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">TLS 1.3 Encryption in Transit</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every API call and web page transmission is protected via modern TLS 1.3 with Perfect Forward Secrecy and Strict Transport Security (HSTS).
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <Key className="w-6 h-6 text-amber-600" />
            <h3 className="font-bold text-sm text-slate-900">Role-Based Access Control (RBAC)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Granular access control policies ensure recruiters only access applications submitted directly to their verified open positions.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900">Responsible Disclosure Program</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We welcome independent security researchers. Vulnerability reports can be submitted securely to <code>security@careerconnectpro.in</code>.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}


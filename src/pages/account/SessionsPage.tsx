import React, { useState } from 'react'
import { Laptop, Smartphone, Globe, Shield, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

interface Session {
  id: string
  device: string
  browser: string
  os: string
  ip: string
  location: string
  lastActive: string
  isCurrent: boolean
}

export const SessionsPage: React.FC = () => {
  const { showNotification } = useJobContext()
  const [sessions, setSessions] = useState<Session[]>([
    { id: 'sess-1', device: 'Desktop', browser: 'Chrome 122', os: 'Windows 11', ip: '103.21.244.18', location: 'Chennai, Tamil Nadu, India', lastActive: 'Active now', isCurrent: true },
    { id: 'sess-2', device: 'Mobile', browser: 'Safari Mobile', os: 'iOS 17.3', ip: '49.207.185.92', location: 'Bengaluru, Karnataka, India', lastActive: '2 hours ago', isCurrent: false },
    { id: 'sess-3', device: 'Laptop', browser: 'Firefox 120', os: 'macOS Sonoma', ip: '103.21.244.18', location: 'Chennai, Tamil Nadu, India', lastActive: '3 days ago', isCurrent: false }
  ])

  const revokeSession = (id: string, device: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id))
    showNotification(`Revoked ${device} session successfully.`)
  }

  const revokeAllOthers = () => {
    setSessions((prev) => prev.filter((s) => s.isCurrent))
    showNotification('All other device sessions have been revoked.')
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Active Sessions & Device Security</h1>
          <p className="text-xs text-slate-500">Manage authenticated browser sessions across your desktop and mobile devices</p>
        </div>

        <button
          onClick={revokeAllOthers}
          className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Revoke All Other Sessions
        </button>
      </div>

      {/* Sessions List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {sessions.map((sess) => (
          <div key={sess.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                {sess.device === 'Mobile' ? <Smartphone className="w-6 h-6" /> : <Laptop className="w-6 h-6" />}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">{sess.browser} on {sess.os}</span>
                  {sess.isCurrent && (
                    <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                      Current Session
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>{sess.location}</span>
                  <span>•</span>
                  <span className="font-mono">{sess.ip}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Last active: {sess.lastActive}
                </div>
              </div>
            </div>

            <div>
              {!sess.isCurrent ? (
                <button
                  onClick={() => revokeSession(sess.id, sess.device)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Revoke
                </button>
              ) : (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active Browser
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


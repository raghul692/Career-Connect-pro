import React, { useState } from 'react'
import { Plug, ShieldCheck, CheckCircle2, Trash2, ExternalLink } from 'lucide-react'
import { INITIAL_INTEGRATIONS } from '../../data/mockData'
import { useJobContext } from '../../context/JobContext'

export const ConnectedAppsPage: React.FC = () => {
  const { showNotification } = useJobContext()
  const [apps, setApps] = useState(INITIAL_INTEGRATIONS.filter((i) => i.connected))

  const handleDisconnect = (id: string, name: string) => {
    setApps((prev) => prev.filter((a) => a.id !== id))
    showNotification(`OAuth authorization revoked for ${name}.`)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Connected Apps & OAuth Tokens</h1>
          <p className="text-xs text-slate-500">Third-party software authorized to access your candidate data, jobs, and workspace telemetry</p>
        </div>

        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          {apps.length} Authorized Apps
        </span>
      </div>

      {/* Connected Apps List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {apps.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No active OAuth applications authorized.
          </div>
        ) : (
          apps.map((app) => (
            <div key={app.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
              <div className="flex items-start gap-4">
                <img
                  src={app.logo}
                  alt={app.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{app.name}</span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {app.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-lg">{app.description}</p>
                  <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 pt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Authorized via OAuth 2.0 PKCE · Read & Write Scopes
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDisconnect(app.id, app.name)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
              >
                Revoke Access
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}


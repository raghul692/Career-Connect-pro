import React from 'react'
import { Link } from 'react-router-dom'
import { Layers, Sparkles, TrendingUp, AlertTriangle, ArrowRight, CheckCircle2, Zap } from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const UsageDashboardPage: React.FC = () => {
  const { activeOrg, usageMeters } = useJobContext()

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-1">
            Current Tier: {activeOrg.plan}
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Usage & Consumption Metering</h1>
          <p className="text-xs text-slate-500">Real-time tracking of resume unlock credits, job slots, and API allocations</p>
        </div>

        <Link
          to="/pricing"
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          Upgrade Plan & Slots
        </Link>
      </div>

      {/* Usage Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {usageMeters.map((m) => {
          const pct = Math.round((m.current / m.max) * 100)
          const isHigh = pct >= m.warningThreshold
          return (
            <div key={m.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{m.name}</h3>
                  <div className="text-xs text-slate-400 mt-0.5">{m.unit}</div>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                  isHigh ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-600'
                }`}>
                  {pct}% Used
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-bold text-slate-800">{m.current.toLocaleString()}</span>
                  <span className="text-slate-400">Quota: {m.max.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${isHigh ? 'bg-amber-500' : 'bg-indigo-600'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {isHigh ? (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-800">
                  <span className="flex items-center gap-1.5 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    Approaching monthly limit
                  </span>
                  <Link to="/pricing" className="font-bold underline">Add Top-up</Link>
                </div>
              ) : (
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Optimal quota runway for current billing cycle
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Auto-recharge Setting */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-600" />
            Automatic Credit Auto-Recharge
          </h4>
          <p className="text-xs text-slate-500">
            Automatically purchase 200 candidate resume unlock credits if balance falls below 50. Prevents drive interruption.
          </p>
        </div>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl shrink-0">
          Enabled (₹1,999 / recharge)
        </span>
      </div>
    </div>
  )
}


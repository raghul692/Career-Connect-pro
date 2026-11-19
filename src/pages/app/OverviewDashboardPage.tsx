import React from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowUpRight,
  Building2
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const OverviewDashboardPage: React.FC = () => {
  const { activeOrg, jobs, auditLogs, usageMeters } = useJobContext()

  const stats = [
    { label: 'Total Candidates Sourced', value: '1,420', change: '+18% this month', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Job Openings', value: `${jobs.length}`, change: '3 urgent roles', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Avg. Time to Hire', value: '18 Days', change: '-4 days vs industry', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'NCAT Pass Rate', value: '84.2%', change: '+6% placement score', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' }
  ]

  const pipelineStages = [
    { stage: 'Applications Received', count: 420, percent: '100%', color: 'bg-indigo-600' },
    { stage: 'NCAT Aptitude Cleared', count: 285, percent: '68%', color: 'bg-indigo-500' },
    { stage: 'Technical Interviews', count: 94, percent: '22%', color: 'bg-indigo-400' },
    { stage: 'Final Leadership Round', count: 32, percent: '8%', color: 'bg-indigo-300' },
    { stage: 'Offers Extended', count: 18, percent: '4%', color: 'bg-emerald-500' }
  ]

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
            <Building2 className="w-3 h-3" />
            {activeOrg.name} · {activeOrg.plan} Workspace
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Executive Talent Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Live overview of university recruitment drives, automated ATS scoring, and candidate pipeline throughput.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/post-job"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Post New Opening
          </Link>
          <Link
            to="/app/reports"
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Export Analytics
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((st, i) => {
          const Icon = st.icon
          return (
            <div key={i} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{st.label}</span>
                <div className={`w-9 h-9 rounded-xl ${st.bg} ${st.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">{st.value}</div>
              <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                {st.change}
              </div>
            </div>
          )
        })}
      </div>

      {/* 2-Column Section: Pipeline Funnel + Resource Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Funnel */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Campus Hiring Conversion Funnel</h2>
              <p className="text-xs text-slate-400">Class of 2026 Engineering Graduate Drive</p>
            </div>
            <Link to="/app/reports" className="text-xs font-bold text-indigo-600 hover:underline">
              Detailed Breakdown →
            </Link>
          </div>

          <div className="space-y-4">
            {pipelineStages.map((stg, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{stg.stage}</span>
                  <span className="font-mono font-bold text-slate-900">{stg.count} candidates ({stg.percent})</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`${stg.color} h-full rounded-full transition-all`}
                    style={{ width: stg.percent }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Usage Meters */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Plan Quota Consumption</h2>
            <Link to="/billing/usage" className="text-xs font-bold text-indigo-600 hover:underline">
              Manage Quotas
            </Link>
          </div>

          <div className="space-y-4">
            {usageMeters.map((meter) => {
              const pct = Math.round((meter.current / meter.max) * 100)
              const isHigh = pct >= meter.warningThreshold
              return (
                <div key={meter.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{meter.name}</span>
                    <span className={`font-mono font-bold ${isHigh ? 'text-amber-600' : 'text-slate-600'}`}>
                      {meter.current.toLocaleString()} / {meter.max.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isHigh ? 'bg-amber-500' : 'bg-indigo-600'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center justify-between">
                    <span>{pct}% utilized</span>
                    <span>{meter.unit}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Live Recent Activity Audit Feed */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Real-Time Team & Security Activity</h2>
            <p className="text-xs text-slate-400">Chronological audit stream recorded for SOC 2 governance</p>
          </div>
          <Link to="/admin/audit-logs" className="text-xs font-bold text-indigo-600 hover:underline">
            View All Audit Logs →
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {auditLogs.slice(0, 5).map((log) => (
            <div key={log.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-3">
                <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  log.severity === 'critical' ? 'bg-red-500' : log.severity === 'high' ? 'bg-amber-500' : 'bg-emerald-500'
                }`} />
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900">{log.action}</div>
                  <div className="text-slate-600">{log.details}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-400 shrink-0">
                <span className="font-medium text-slate-500">{log.actorName}</span>
                <span className="font-mono text-[11px]">{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


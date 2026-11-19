import React from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle2, ArrowLeft
} from 'lucide-react'

export const StatusPage: React.FC = () => {
  const components = [
    { name: 'Public Web Application & Jobs Portal', uptime: '99.99%', status: 'Operational', responseTime: '68ms' },
    { name: 'REST API & Webhook Dispatcher', uptime: '99.98%', status: 'Operational', responseTime: '92ms' },
    { name: 'Authentication (OAuth 2.0 & SAML SSO)', uptime: '100.0%', status: 'Operational', responseTime: '45ms' },
    { name: 'NCAT Assessment Scoring Engine', uptime: '99.95%', status: 'Operational', responseTime: '110ms' },
    { name: 'AI ATS Resume Parsing Cluster', uptime: '99.92%', status: 'Operational', responseTime: '180ms' }
  ]

  const pastIncidents = [
    {
      date: '24 October 2026',
      title: 'Resolved: Transient Latency on Resume Parsing Worker Pool',
      desc: 'Between 14:10 and 14:35 UTC, background resume extraction jobs experienced slight queue delays due to AWS ap-south-1 memory autoscaling. No candidate files were lost.'
    },
    {
      date: '12 September 2026',
      title: 'Scheduled Maintenance: Database Index Optimization',
      desc: 'Successfully completed planned zero-downtime PostgreSQL schema index migrations across all candidate talent tables.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Career Connect Pro
            </Link>
            <span className="text-xs font-mono text-slate-400">Refreshed 1 min ago</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Status & Component Health</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Real-time service availability across our global cloud infrastructure</p>
            </div>

            <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs rounded-2xl flex items-center gap-2 self-start sm:self-auto">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Fully Operational
            </div>
          </div>
        </div>
      </section>

      {/* Components Health List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {components.map((comp, idx) => (
            <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="font-bold text-sm text-slate-900">{comp.name}</div>
                <div className="text-xs text-slate-400 font-mono">p95 Latency: {comp.responseTime}</div>
              </div>

              <div className="flex items-center gap-6 self-start sm:self-auto">
                <span className="font-mono text-xs font-bold text-slate-700">{comp.uptime} Uptime</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {comp.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 90-Day Uptime Visualization */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>90 Days Continuous Service History</span>
            <span className="text-emerald-600">99.98% Average Overall</span>
          </div>

          <div className="grid grid-cols-45 sm:grid-cols-90 gap-0.5 h-7">
            {[...Array(90)].map((_, i) => (
              <div
                key={i}
                className="bg-emerald-500 hover:bg-emerald-600 rounded-xs transition-colors cursor-pointer"
                title={`Day ${90 - i}: 100% operational`}
              />
            ))}
          </div>

          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>90 days ago</span>
            <span>Today</span>
          </div>
        </div>

        {/* Past Incidents */}
        <div className="space-y-4 pt-4">
          <h2 className="text-lg font-bold text-slate-900">Past Incidents & Scheduled Maintenance</h2>
          <div className="space-y-4">
            {pastIncidents.map((inc, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1.5 shadow-xs">
                <div className="text-[11px] font-mono font-bold text-slate-400">{inc.date}</div>
                <h3 className="font-bold text-sm text-slate-900">{inc.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{inc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


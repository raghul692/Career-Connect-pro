import React, { useState } from 'react'
import { ShieldAlert, Search, Filter, Download, Code2, ChevronDown, ChevronRight, User } from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const AuditLogsPage: React.FC = () => {
  const { auditLogs, showNotification } = useJobContext()
  const [search, setSearch] = useState('')
  const [severityFilter, setSeverityFilter] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSev = severityFilter === 'all' || log.severity === severityFilter
    const matchesSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.actorName.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      log.ipAddress.includes(search)
    return matchesSev && matchesSearch
  })

  const handleExport = () => {
    showNotification('Audit log archive downloaded (JSON format).')
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Security Audit Logs</h1>
          <p className="text-xs text-slate-500">Immutable chronological telemetry for enterprise compliance, SOC 2, and forensic audits</p>
        </div>

        <button
          onClick={handleExport}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          Export JSON Log
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {['all', 'critical', 'high', 'medium', 'low'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                severityFilter === sev
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5 max-w-xs w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search action, actor, or IP..."
            className="w-full text-xs outline-none bg-transparent text-slate-800"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100 text-xs">
          {filteredLogs.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              No audit records matching your filter criteria.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isExpanded = expandedId === log.id
              return (
                <div key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : log.id)}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span
                        className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                          log.severity === 'critical'
                            ? 'bg-red-500 ring-4 ring-red-100'
                            : log.severity === 'high'
                            ? 'bg-amber-500 ring-4 ring-amber-100'
                            : 'bg-indigo-500'
                        }`}
                      />
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-bold text-slate-900">{log.action}</span>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {log.severity}
                          </span>
                        </div>
                        <div className="text-slate-600 truncate">{log.details}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-slate-400 shrink-0">
                      <div className="text-right">
                        <div className="font-semibold text-slate-700">{log.actorName}</div>
                        <div className="text-[10px] font-mono text-slate-400">{log.ipAddress}</div>
                      </div>
                      <span className="font-mono text-[11px] text-slate-500">{log.timestamp}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90 text-indigo-600' : ''}`} />
                    </div>
                  </div>

                  {/* Expanded Payload Inspector */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 bg-slate-50 border-t border-slate-100 font-mono text-[11px] text-slate-700 space-y-2">
                      <div className="text-[10px] font-bold uppercase text-slate-400">Structured Forensic Payload</div>
                      <div className="p-3 bg-slate-900 text-slate-200 rounded-xl overflow-x-auto">
                        <pre>
{JSON.stringify(
  {
    event_id: log.id,
    timestamp: log.timestamp,
    actor: {
      name: log.actorName,
      email: log.actorEmail,
      ip: log.ipAddress
    },
    action: log.action,
    details: log.details,
    user_agent: log.userAgent
  },
  null,
  2
)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}


import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

const SAMPLE_TIMESTAMP = '2026-11-18T10:30:00.000Z'

interface Endpoint {
  id: string
  method: 'GET' | 'POST' | 'DELETE' | 'PUT'
  path: string
  title: string
  desc: string
  requestSample?: string
  responseSample: string
}

export const ApiDocsPage: React.FC = () => {
  const { showNotification } = useJobContext()
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('ep-1')
  const [copiedCode, setCopiedCode] = useState(false)

  const endpoints: Endpoint[] = [
    {
      id: 'ep-1',
      method: 'GET',
      path: '/v1/jobs',
      title: 'List Active Requisitions',
      desc: 'Retrieve paginated lists of open jobs across your organization with applicant counters.',
      responseSample: `{
  "object": "list",
  "data": [
    {
      "id": "job-101",
      "title": "Graduate Trainee Engineer",
      "department": "Software & QA",
      "status": "active",
      "applicants_count": 420,
      "min_ctc_lpa": 4.25,
      "max_ctc_lpa": 5.50
    }
  ],
  "has_more": false
}`
    },
    {
      id: 'ep-2',
      method: 'POST',
      path: '/v1/candidates/score',
      title: 'Score Candidate with AI ATS',
      desc: 'Submit a base64 PDF resume to calculate Workday & Taleo keyword matching score.',
      requestSample: `curl https://api.careerconnectpro.com/v1/candidates/score \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "candidate_name": "Karthik Subramanian",
    "target_skills": ["React", "TypeScript", "Node.js"],
    "resume_base64": "JVBERi0xLjQK..."
  }'`,
      responseSample: `{
  "ats_score": 92,
  "match_verdict": "Top Tier",
  "detected_skills": ["React.js", "TypeScript", "Node.js", "PostgreSQL"],
  "missing_keywords": ["Docker", "Jest"],
  "metric_density": 0.84
}`
    },
    {
      id: 'ep-3',
      method: 'POST',
      path: '/v1/applications/shortlist',
      title: 'Advance Candidate to Interview',
      desc: 'Move an applicant to the next interview round and trigger calendar invites.',
      requestSample: `curl -X POST https://api.careerconnectpro.com/v1/applications/shortlist \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "application_id": "app-104",
    "new_status": "Shortlisted",
    "interviewer_email": "priya.n@company.com"
  }'`,
      responseSample: `{
  "success": true,
  "application_id": "app-104",
  "status": "Shortlisted",
  "timestamp": "${SAMPLE_TIMESTAMP}"
}`
    }
  ]

  const currentEp = endpoints.find((e) => e.id === selectedEndpoint) || endpoints[0]

  const copyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText)
    setCopiedCode(true)
    showNotification('Code snippet copied to clipboard!')
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">REST API & Documentation</h1>
          <p className="text-xs text-slate-500">Programmatic reference for syncing candidates, requisitions, and NCAT assessment scores</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
            API v1.4.0 (Stable)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Endpoints Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-4 shadow-xs space-y-2 h-fit">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
            API Endpoints
          </div>
          {endpoints.map((ep) => {
            const isSelected = ep.id === selectedEndpoint
            return (
              <button
                key={ep.id}
                onClick={() => setSelectedEndpoint(ep.id)}
                className={`w-full p-3 rounded-2xl text-left transition-all cursor-pointer ${
                  isSelected ? 'bg-indigo-50 border border-indigo-200' : 'hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`font-mono font-extrabold text-[10px] px-1.5 py-0.5 rounded ${
                      ep.method === 'GET'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span className="font-mono text-xs font-semibold text-slate-900">{ep.path}</span>
                </div>
                <div className="text-xs text-slate-500 truncate">{ep.title}</div>
              </button>
            )
          })}
        </div>

        {/* Selected Endpoint Explorer */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`font-mono font-extrabold text-xs px-2 py-0.5 rounded ${
                  currentEp.method === 'GET' ? 'bg-emerald-100 text-emerald-800' : 'bg-indigo-100 text-indigo-800'
                }`}
              >
                {currentEp.method}
              </span>
              <span className="font-mono font-bold text-sm text-slate-900">{currentEp.path}</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 pt-2">{currentEp.title}</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{currentEp.desc}</p>
          </div>

          {/* cURL Request Sample */}
          {currentEp.requestSample && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Example cURL Request</span>
                <button
                  onClick={() => copyCode(currentEp.requestSample!)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy cURL
                </button>
              </div>
              <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs overflow-x-auto">
                <pre>{currentEp.requestSample}</pre>
              </div>
            </div>
          )}

          {/* JSON Response Sample */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Response Payload (200 OK)</span>
              <button
                onClick={() => copyCode(currentEp.responseSample)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" /> Copy JSON
              </button>
            </div>
            <div className="p-4 bg-slate-900 text-emerald-300 rounded-2xl font-mono text-xs overflow-x-auto">
              <pre>{currentEp.responseSample}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


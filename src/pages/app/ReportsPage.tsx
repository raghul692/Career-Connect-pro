import React, { useState } from 'react'
import {
  Download
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const ReportsPage: React.FC = () => {
  const { showNotification } = useJobContext()
  const [timeRange, setTimeRange] = useState('Last 30 Days')
  const [exporting, setExporting] = useState<string | null>(null)

  const handleExport = (format: 'CSV' | 'PDF') => {
    setExporting(format)
    setTimeout(() => {
      setExporting(null)
      showNotification(`Report successfully downloaded: Campus_Talent_Report_2026.${format.toLowerCase()}`)
    }, 1200)
  }

  const campusBreakdown = [
    { college: 'Anna University, Chennai', students: 420, shortlisted: 86, avgScore: '91.4' },
    { college: 'PSG College of Tech, Coimbatore', students: 310, shortlisted: 64, avgScore: '89.2' },
    { college: 'NIT Trichy', students: 280, shortlisted: 72, avgScore: '93.0' },
    { college: 'Vellore Institute of Technology (VIT)', students: 540, shortlisted: 98, avgScore: '87.5' },
    { college: 'College of Engineering, Guindy', students: 220, shortlisted: 58, avgScore: '92.1' }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Custom Reports & Analytics</h1>
          <p className="text-xs text-slate-500">Filter recruiting metrics and export presentation-ready reports</p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none"
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Q3 FY26</option>
            <option>Full Year 2026</option>
          </select>

          <button
            onClick={() => handleExport('CSV')}
            disabled={!!exporting}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            {exporting === 'CSV' ? 'Exporting...' : 'CSV'}
          </button>

          <button
            onClick={() => handleExport('PDF')}
            disabled={!!exporting}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            {exporting === 'PDF' ? 'Generating...' : 'PDF'}
          </button>
        </div>
      </div>

      {/* Sourcing Channel Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="text-xs font-semibold text-slate-400">NCAT Aptitude Direct Applicants</div>
          <div className="text-2xl font-extrabold text-slate-900">894 candidates</div>
          <div className="text-xs text-emerald-600 font-semibold">+24% vs last drive</div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="text-xs font-semibold text-slate-400">National Hackathon Sourced</div>
          <div className="text-2xl font-extrabold text-slate-900">340 candidates</div>
          <div className="text-xs text-emerald-600 font-semibold">Top 5% coding signal</div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="text-xs font-semibold text-slate-400">Direct In-House Job Board</div>
          <div className="text-2xl font-extrabold text-slate-900">186 candidates</div>
          <div className="text-xs text-slate-500 font-semibold">Organic referrals</div>
        </div>
      </div>

      {/* College Breakdown Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">University Placement Signal by College</h2>
            <p className="text-xs text-slate-400">Class of 2026 Batch Performance</p>
          </div>
          <span className="text-xs text-slate-400 font-medium">{timeRange}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-6">College / University</th>
                <th className="py-3.5 px-4 text-center">Evaluated Students</th>
                <th className="py-3.5 px-4 text-center">Shortlisted</th>
                <th className="py-3.5 px-4 text-center">Avg NCAT Percentile</th>
                <th className="py-3.5 px-6 text-right">Yield Ratio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {campusBreakdown.map((row, idx) => {
                const yieldPct = Math.round((row.shortlisted / row.students) * 100)
                return (
                  <tr key={idx} className="hover:bg-slate-50/80">
                    <td className="py-4 px-6 font-bold text-slate-900">{row.college}</td>
                    <td className="py-4 px-4 text-center font-mono">{row.students}</td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-indigo-700">{row.shortlisted}</td>
                    <td className="py-4 px-4 text-center font-mono text-emerald-600 font-bold">{row.avgScore}%</td>
                    <td className="py-4 px-6 text-right font-mono font-bold">{yieldPct}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


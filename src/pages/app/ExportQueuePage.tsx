import React, { useState } from 'react'
import {
  DownloadCloud,
  FileArchive,
  FileText,
  Clock,
  Plus,
  RefreshCw,
  HardDrive
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const ExportQueuePage: React.FC = () => {
  const { exportJobs, triggerExportJob, showNotification } = useJobContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [exportTitle, setExportTitle] = useState('')
  const [exportType, setExportType] = useState<'candidate_resumes_zip' | 'applicant_metrics_csv' | 'compliance_audit_json' | 'campus_results_xlsx'>('candidate_resumes_zip')

  const handleCreateExport = (e: React.FormEvent) => {
    e.preventDefault()
    if (!exportTitle.trim()) {
      showNotification('Please enter a title for the export.')
      return
    }
    triggerExportJob(exportTitle, exportType)
    setIsModalOpen(false)
    setExportTitle('')
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'candidate_resumes_zip':
        return <FileArchive className="w-5 h-5 text-indigo-600" />
      case 'applicant_metrics_csv':
      case 'campus_results_xlsx':
        return <FileText className="w-5 h-5 text-emerald-600" />
      default:
        return <HardDrive className="w-5 h-5 text-purple-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 uppercase tracking-wider">
              Asynchronous Processing
            </span>
            <span className="text-xs text-slate-400">SOC 2 Compliant Queue</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Background Jobs & Bulk Export Queue
          </h1>
          <p className="text-xs text-slate-500">
            Export massive candidate resume bundles, compliance audit trails, and ATS metrics in the background without browser timeouts.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          Queue New Bulk Export
        </button>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs font-semibold text-slate-500">Active Queue Tasks</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {exportJobs.filter((j) => j.status === 'processing' || j.status === 'queued').length}
          </div>
          <div className="text-[11px] text-indigo-600 font-medium mt-1">Processing in worker fleet</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs font-semibold text-slate-500">Completed Archives Ready</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            {exportJobs.filter((j) => j.status === 'completed').length}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">Available for direct download</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs font-semibold text-slate-500">Total Export Storage</div>
          <div className="text-2xl font-black text-slate-900 mt-1">81.2 MB</div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">Auto-expires after 7 days</div>
        </div>
      </div>

      {/* Export Tasks List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="text-xs font-bold text-slate-700">Recent Export Deliverables</div>
          <span className="text-[11px] text-slate-400">Worker Heartbeat: Active (Mumbai AWS)</span>
        </div>

        <div className="divide-y divide-slate-100">
          {exportJobs.map((job) => (
            <div key={job.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  {getTypeIcon(job.type)}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-slate-900">{job.title}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        job.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : job.status === 'processing'
                          ? 'bg-amber-100 text-amber-800 animate-pulse'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 flex items-center gap-3 flex-wrap">
                    <span>Requested by {job.requestedBy}</span>
                    <span>·</span>
                    <span>{job.createdAt}</span>
                    <span>·</span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {job.expiresAt}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  {job.status === 'processing' && (
                    <div className="w-full sm:w-80 pt-2 space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                        <span>
                          Packing: {job.processedRecords} of {job.totalRecords} files
                        </span>
                        <span>{job.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                {job.status === 'completed' ? (
                  <button
                    onClick={() => showNotification(`Initiated download for ${job.title} (${job.fileSize})`)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <DownloadCloud className="w-3.5 h-3.5" />
                    Download File ({job.fileSize})
                  </button>
                ) : (
                  <span className="text-xs text-amber-600 font-semibold flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Building Archive...
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Export Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 max-w-md w-full space-y-4 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900">Queue New Bulk Export</h3>
            <p className="text-xs text-slate-500">
              Select the data set you want to package. The server worker will process it in the background and notify you when ready.
            </p>

            <form onSubmit={handleCreateExport} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Export Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 Campus Shortlist (IIT/NIT)"
                  value={exportTitle}
                  onChange={(e) => setExportTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Deliverable Format & Type</label>
                <select
                  value={exportType}
                  onChange={(e) => setExportType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white cursor-pointer"
                >
                  <option value="candidate_resumes_zip">Candidate Resumes (.ZIP Bundle with Folders)</option>
                  <option value="applicant_metrics_csv">Applicant Metrics & Statuses (.CSV)</option>
                  <option value="campus_results_xlsx">Campus Aptitude Test Scores (.XLSX)</option>
                  <option value="compliance_audit_json">SOC 2 & DPDP User Audit Log (.JSON)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Start Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


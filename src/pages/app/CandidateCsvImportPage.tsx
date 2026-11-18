import React, { useState } from 'react'
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Download,
  Trash2,
  Sparkles,
  RefreshCw,
  SlidersHorizontal,
  Table
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'
import confetti from 'canvas-confetti'

export const CandidateCsvImportPage: React.FC = () => {
  const { importBatch, setImportBatch, showNotification, addAuditLog } = useJobContext()
  const [activeTab, setActiveTab] = useState<'mapping' | 'preview' | 'errors'>('mapping')
  const [isImporting, setIsImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(0)
  const [mappings, setMappings] = useState(importBatch.mappings)

  const targetFields = [
    { value: 'name', label: 'Candidate Full Name *' },
    { value: 'email', label: 'Email Address *' },
    { value: 'phone', label: 'Phone / WhatsApp *' },
    { value: 'cgpa', label: 'CGPA / Percentage Score' },
    { value: 'skills', label: 'Technical & Soft Skills' },
    { value: 'currentCtc', label: 'Current CTC (LPA)' },
    { value: 'expectedCtc', label: 'Expected CTC (LPA)' },
    { value: 'noticePeriod', label: 'Notice Period Days' },
    { value: 'graduationYear', label: 'Graduation / Batch Year' },
    { value: 'ignore', label: '— Ignore This Column —' }
  ]

  const handleFieldChange = (csvHeader: string, newTarget: string) => {
    setMappings((prev) =>
      prev.map((m) => (m.csvHeader === csvHeader ? { ...m, targetField: newTarget } : m))
    )
  }

  const handleStartImport = () => {
    setIsImporting(true)
    setImportProgress(10)

    const timer = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setIsImporting(false)
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 }
          })
          addAuditLog(
            'Candidate Batch Imported',
            `Successfully imported ${importBatch.validRows} candidates from "${importBatch.fileName}"`,
            'medium'
          )
          showNotification(`Successfully imported ${importBatch.validRows} candidates to talent pool!`)
          setImportBatch((b) => ({ ...b, status: 'Completed' }))
          return 100
        }
        return prev + 30
      })
    }, 600)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 uppercase tracking-wider">
              Zero-Friction Ingestion
            </span>
            <span className="text-xs text-slate-400">Campus & Lateral Talent</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Smart CSV / Excel Candidate Importer
          </h1>
          <p className="text-xs text-slate-500">
            Bulk onboard thousands of candidate profiles from spreadsheets or campus lists with automated column mapping.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showNotification('Downloaded Career Connect Pro standard candidate template.')}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Download Sample CSV
          </button>
        </div>
      </div>

      {/* Upload & File Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">{importBatch.fileName}</span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  {importBatch.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Uploaded {importBatch.uploadedAt} · File Size: {importBatch.fileSize}
              </p>
            </div>
          </div>

          <button
            onClick={() => showNotification('Dropzone refreshed. Ready to upload new file.')}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
            title="Replace File"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 bg-white rounded-2xl border border-slate-200 p-3 shadow-xs">
          <div className="bg-slate-50 p-2.5 rounded-xl text-center">
            <div className="text-[10px] font-semibold text-slate-400">Total Rows</div>
            <div className="text-lg font-black text-slate-900">{importBatch.totalRows}</div>
          </div>
          <div className="bg-emerald-50/60 p-2.5 rounded-xl text-center border border-emerald-100">
            <div className="text-[10px] font-semibold text-emerald-700">Valid Rows</div>
            <div className="text-lg font-black text-emerald-700">{importBatch.validRows}</div>
          </div>
          <div className="bg-amber-50/60 p-2.5 rounded-xl text-center border border-amber-100">
            <div className="text-[10px] font-semibold text-amber-700">Errors</div>
            <div className="text-lg font-black text-amber-700">{importBatch.errorRows}</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('mapping')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'mapping'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Column Schema Mapping ({mappings.length})
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'preview'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Table className="w-3.5 h-3.5" />
          Sample Data Preview (First 4 Rows)
        </button>
        <button
          onClick={() => setActiveTab('errors')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'errors'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
          Validation Errors ({importBatch.errorRows})
        </button>
      </div>

      {/* Tab 1: Column Mapping */}
      {activeTab === 'mapping' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              CSV Header & Sample Value
            </span>
            <span className="text-xs font-bold text-slate-700">
              Target Candidate Schema Field
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {mappings.map((item, idx) => (
              <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/40 transition-colors">
                <div className="space-y-1 min-w-0 sm:w-1/2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 font-mono">{item.csvHeader}</span>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                      {item.confidence}% Match
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    Sample: <span className="text-slate-600 font-medium font-mono">"{item.sampleValue}"</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:w-1/2 justify-end">
                  <ArrowRight className="w-4 h-4 text-slate-300 hidden sm:block shrink-0" />
                  <select
                    value={item.targetField}
                    onChange={(e) => handleFieldChange(item.csvHeader, e.target.value)}
                    className="w-full sm:w-72 text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 cursor-pointer"
                  >
                    {targetFields.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Import Action Bar */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              <span className="font-bold text-slate-800">{importBatch.validRows} candidates</span> will be ingested into your active talent pool.
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleStartImport}
                disabled={isImporting}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                {isImporting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Ingesting ({importProgress}%)...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Confirm & Import {importBatch.validRows} Candidates
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Sample Data Preview */}
      {activeTab === 'preview' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th className="p-3.5">#</th>
                  <th className="p-3.5">Student Full Name</th>
                  <th className="p-3.5">Institute Email</th>
                  <th className="p-3.5">Mobile</th>
                  <th className="p-3.5">CGPA</th>
                  <th className="p-3.5">Technical Stack</th>
                  <th className="p-3.5">Grad Year</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {importBatch.previewRows.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="p-3.5 font-bold text-slate-400">{i + 1}</td>
                    <td className="p-3.5 font-bold text-slate-900">{row['Student Full Name']}</td>
                    <td className="p-3.5 text-slate-600 font-mono text-[11px]">{row['Institute Email ID']}</td>
                    <td className="p-3.5 text-slate-600 font-mono text-[11px]">{row['Mobile Number']}</td>
                    <td className="p-3.5 font-bold text-emerald-700">{row['CGPA Score']}</td>
                    <td className="p-3.5">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                        {row['Key Technical Skills']}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-500 font-medium">{row['Graduation Year']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Errors */}
      {activeTab === 'errors' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-amber-800 bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <div className="font-bold">22 Rows Failed Validation</div>
              <p className="text-amber-700">
                These rows will be skipped during import. You can download the error-log CSV to fix and re-upload them later.
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 font-mono">Row 42:</span>{' '}
                <span className="text-slate-600">Email missing TLD ('rohit.kumar@iitd')</span>
              </div>
              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                Invalid Email
              </span>
            </div>
            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 font-mono">Row 89:</span>{' '}
                <span className="text-slate-600">Mobile number has 9 digits instead of 10</span>
              </div>
              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                Malformed Phone
              </span>
            </div>
            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 font-mono">Row 114:</span>{' '}
                <span className="text-slate-600">Mandatory Candidate Full Name is blank</span>
              </div>
              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                Missing Required Field
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


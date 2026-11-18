import React, { useState } from 'react'
import {
  X,
  FileCheck2,
  CheckCircle2,
  Upload,
  Send,
  Building2,
  MapPin,
  IndianRupee,
  Briefcase
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const QuickApplyModal: React.FC = () => {
  const { quickApplyJob, setQuickApplyJob, applyToJob, userProfile } = useJobContext()
  const [selectedResume, setSelectedResume] = useState(userProfile.resumeName)
  const [customFile, setCustomFile] = useState<string | null>(null)
  const [coverNote, setCoverNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!quickApplyJob) return null

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      applyToJob(quickApplyJob, customFile || selectedResume, coverNote)
      setIsSubmitting(false)
    }, 600)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCustomFile(e.target.files[0].name)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-3">
            <img
              src={quickApplyJob.companyLogo}
              alt={quickApplyJob.company}
              className="w-11 h-11 rounded-xl object-cover border border-slate-200"
            />
            <div>
              <h3 className="font-bold text-base text-slate-900 leading-tight">
                Quick Apply to {quickApplyJob.company}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-1">{quickApplyJob.title}</p>
            </div>
          </div>
          <button
            onClick={() => setQuickApplyJob(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleApply} className="p-6 space-y-4">
          
          {/* Quick Metrics Badge */}
          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="truncate">{quickApplyJob.location.split(',')[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Briefcase className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{quickApplyJob.experience}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <IndianRupee className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">{quickApplyJob.salary.split(' - ')[0]}</span>
            </div>
          </div>

          {/* Candidate Profile Summary */}
          <div className="border border-slate-200 rounded-xl p-3.5 bg-white space-y-1.5">
            <div className="text-xs font-semibold text-slate-700">Submitting Profile As:</div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-900">{userProfile.name}</span>
              <span className="text-slate-500">{userProfile.phone}</span>
            </div>
            <div className="text-xs text-slate-500 truncate">{userProfile.email}</div>
          </div>

          {/* Resume Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Select Resume for Application
            </label>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors bg-indigo-50/40 border-indigo-200">
                <div className="flex items-center gap-2.5">
                  <FileCheck2 className="w-5 h-5 text-indigo-600" />
                  <div>
                    <div className="text-xs font-semibold text-slate-900">
                      {customFile || selectedResume}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {customFile ? 'Custom upload' : 'Default Profile Resume (ATS Verified)'}
                    </div>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              </label>

              <label className="flex items-center justify-center gap-2 py-2 px-3 border border-dashed border-slate-300 rounded-xl hover:border-indigo-400 hover:bg-slate-50 text-xs text-slate-600 cursor-pointer transition-all">
                <Upload className="w-3.5 h-3.5 text-slate-400" />
                <span>Upload a different PDF resume</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Optional Short Pitch / Note */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Recruiter Note / Relevant Experience (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="E.g. Class of 2026 CS graduate with strong React and Java Spring Boot experience, built 2 full-stack projects..."
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Recruiter Guarantee notice */}
          <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>Applications are forwarded directly to {quickApplyJob.company}&apos;s verified HR talent portal.</span>
          </div>

          {/* Submit Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setQuickApplyJob(null)}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-100 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              {isSubmitting ? 'Submitting Application...' : 'Submit Application Now'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}


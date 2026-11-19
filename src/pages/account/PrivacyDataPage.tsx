import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, Trash2, AlertTriangle, X, Sliders, MailX, ChevronRight } from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const PrivacyDataPage: React.FC = () => {
  const { userProfile, showNotification } = useJobContext()
  const [downloading, setDownloading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [confirmText, setConfirmText] = useState('')

  const handleExportData = () => {
    setDownloading(true)
    setTimeout(() => {
      setDownloading(false)
      const dataStr = JSON.stringify(userProfile, null, 2)
      const blob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `career_connect_pro_data_export_${Date.now()}.json`
      link.click()
      showNotification('Your personal data archive (GDPR Article 20) has downloaded!')
    }, 1200)
  }

  const handleDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault()
    if (confirmText.toLowerCase() === 'delete my account') {
      setShowDeleteModal(false)
      showNotification('Account deletion request queued. All candidate records will be purged within 48 hours.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-1">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">GDPR & Privacy Rights Center</h1>
        <p className="text-xs text-slate-500">Exercise your data privacy rights, request data portability exports, or permanently erase your profile</p>
      </div>

      {/* Export Data Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Download className="w-5 h-5 text-indigo-600" />
              Download Machine-Readable Archive (JSON)
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
              Under GDPR Article 20 and India DPDP Act 2023, you have the right to receive all personal data you provided to Career Connect Pro, including education records, job applications, and NCAT test scores.
            </p>
          </div>

          <button
            onClick={handleExportData}
            disabled={downloading}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4" />
            {downloading ? 'Preparing Archive...' : 'Export JSON Data'}
          </button>
        </div>
      </div>

      {/* Right to be Forgotten (Deletion) */}
      <div className="bg-white rounded-3xl border border-red-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-red-600 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Permanently Erase Account & Candidate Profile
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
              Permanently delete your login credentials, active job applications, ATS diagnostics, and recruitment history. This action is irreversible.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/account/delete-account"
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Trash2 className="w-4 h-4" />
              Erasure Wizard &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Additional Consent Portals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/account/analytics-preferences"
          className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 transition-all shadow-xs space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              Analytics & Telemetry Preferences
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <p className="text-xs text-slate-500">
            Configure cookies, performance traces, and job recommendation telemetry toggles.
          </p>
        </Link>

        <Link
          to="/unsubscribe"
          className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 transition-all shadow-xs space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 flex items-center gap-2">
              <MailX className="w-4 h-4 text-indigo-600" />
              Email Subscription Center
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <p className="text-xs text-slate-500">
            1-click unsubscribe or customize notifications for daily jobs and recruiter messages.
          </p>
        </Link>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-lg text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Confirm Account Erasure
              </h3>
              <button onClick={() => setShowDeleteModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              This will permanently delete all records associated with <strong>{userProfile.email}</strong>. Type <strong className="text-slate-900">DELETE MY ACCOUNT</strong> below to confirm.
            </p>

            <form onSubmit={handleDeleteAccount} className="space-y-4">
              <input
                type="text"
                required
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type 'DELETE MY ACCOUNT'"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-red-600 font-mono"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={confirmText.toLowerCase() !== 'delete my account'}
                  className={`px-5 py-2.5 font-bold text-xs rounded-xl text-white transition-all ${
                    confirmText.toLowerCase() === 'delete my account'
                      ? 'bg-red-600 hover:bg-red-700 shadow-xs cursor-pointer'
                      : 'bg-slate-300 cursor-not-allowed'
                  }`}
                >
                  Confirm Permanent Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AlertTriangle,
  Download,
  Trash2,
  ShieldAlert,
  Clock,
  CheckCircle2,
  FileText,
  ChevronRight,
  ArrowLeft,
  XCircle,
  Lock
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const DeleteAccountPage: React.FC = () => {
  const { userProfile, showNotification } = useJobContext()
  const navigate = useNavigate()

  const [step, setStep] = useState<number>(1)
  const [downloadedArchive, setDownloadedArchive] = useState(false)
  const [deletionMode, setDeletionMode] = useState<'grace' | 'instant'>('grace')
  const [confirmPhrase, setConfirmPhrase] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const REQUIRED_PHRASE = 'DELETE MY ACCOUNT FOREVER'

  const handleDownloadArchive = () => {
    // Generate JSON blob containing all user data
    const dataDump = {
      exportedAt: new Date().toISOString(),
      user: userProfile,
      complianceNote: 'Exported under DPDP Act 2023 & GDPR Article 20 Right to Data Portability',
      applicationsCount: 14,
      resumesCount: 2,
      ncatAssessmentPercentile: 94.2
    }
    const blob = new Blob([JSON.stringify(dataDump, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `career-connect-data-export-${userProfile.name.toLowerCase().replace(/\s+/g, '-')}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setDownloadedArchive(true)
    showNotification('Complete personal data archive downloaded successfully.')
  }

  const handleExecuteDeletion = () => {
    if (confirmPhrase.trim() !== REQUIRED_PHRASE) {
      showNotification('Confirmation phrase does not match exactly.')
      return
    }

    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      if (deletionMode === 'grace') {
        showNotification('Account placed in 30-day deletion freeze. A confirmation has been emailed to you.')
      } else {
        showNotification('Account and all associated records have been permanently shredded.')
      }
      navigate('/')
    }, 1200)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/profile" className="hover:text-indigo-600">Profile & Settings</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/account/privacy-data" className="hover:text-indigo-600">Privacy & Data Governance</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-red-600 font-semibold">Delete Account</span>
      </nav>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-red-200 p-6 sm:p-10 shadow-xs space-y-8">
        
        {/* Header Alert */}
        <div className="flex items-start gap-4 border-b border-red-100 pb-6">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              DPDP Act 2023 & GDPR Right to Erasure
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Delete Career Connect Pro Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Account: <strong>{userProfile.email}</strong> ({userProfile.name})
            </p>
          </div>
        </div>

        {/* Step Progression Indicators */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 text-xs font-semibold">
          <span className={step >= 1 ? 'text-indigo-600' : 'text-slate-400'}>1. Export Data</span>
          <span className="text-slate-300">&rarr;</span>
          <span className={step >= 2 ? 'text-indigo-600' : 'text-slate-400'}>2. Impact Inventory</span>
          <span className="text-slate-300">&rarr;</span>
          <span className={step >= 3 ? 'text-red-600 font-bold' : 'text-slate-400'}>3. Confirm Purge</span>
        </div>

        {/* STEP 1: Pre-deletion Data Archive Download */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">Step 1: Download Your Personal Data Archive</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Before deleting your account, we recommend exporting your candidate history, including your uploaded resumes, job application records, and verified NCAT test certificates. Once purged, this data cannot be recovered.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-indigo-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Complete Profile & Application History</div>
                  <div className="text-[11px] text-slate-500">JSON Archive &middot; 420 KB &middot; Includes ATS Scores</div>
                </div>
              </div>

              <button
                onClick={handleDownloadArchive}
                className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Data Archive
              </button>
            </div>

            {downloadedArchive && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Data archive downloaded. You may proceed to review deletion impacts.
              </div>
            )}

            <div className="flex justify-between items-center pt-4">
              <Link to="/profile" className="text-xs font-bold text-slate-500 hover:text-slate-800">
                Cancel & Return to Profile
              </Link>
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Continue to Step 2 &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Impact Breakdown & Deletion Mode */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">Step 2: Understand Deletion Consequences</h2>
              <p className="text-xs text-slate-600">
                The following resources associated with your identity will be permanently decommissioned:
              </p>
            </div>

            {/* Impact Checklist */}
            <div className="space-y-2.5 text-xs">
              {[
                { title: 'Uploaded Resumes & Portfolios', detail: 'All PDF/DOCX files removed from encrypted S3 storage.' },
                { title: 'Active Job Applications', detail: 'Recruiters will no longer have access to your candidate dossier.' },
                { title: 'National NCAT Percentile', detail: 'Your verified campus aptitude assessment certificate will be revoked.' },
                { title: 'Saved Jobs & Job Alerts', detail: 'All daily email digests and recruiter InMails will cease immediately.' }
              ].map((item) => (
                <div key={item.title} className="p-3.5 rounded-xl bg-red-50/60 border border-red-100 flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">{item.title}:</strong>
                    <div className="text-slate-600 text-[11px] mt-0.5">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mode Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Select Deletion Timeline:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeletionMode('grace')}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    deletionMode === 'grace'
                      ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    30-Day Cold Freeze (Recommended)
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Hides profile immediately. If you change your mind within 30 days, simply log back in to reactivate.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeletionMode('instant')}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    deletionMode === 'instant'
                      ? 'border-red-600 bg-red-50/70 ring-2 ring-red-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-red-900">
                    <Lock className="w-4 h-4 text-red-600" />
                    Immediate Cryptographic Shred
                  </div>
                  <div className="text-[11px] text-red-600 mt-1">
                    Purges encryption keys and deletes all database rows instantly. Absolutely irreversible.
                  </div>
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Step 1
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Proceed to Confirmation &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Strict Confirmation Input */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-2 text-xs text-red-900">
              <div className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Final Authorization Warning
              </div>
              <p>
                To prevent accidental deletion, please type the confirmation phrase below exactly as shown.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">
                Type <span className="font-mono text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">{REQUIRED_PHRASE}</span> to confirm:
              </label>
              <input
                type="text"
                value={confirmPhrase}
                onChange={(e) => setConfirmPhrase(e.target.value)}
                placeholder={REQUIRED_PHRASE}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
              />
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setStep(2)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Step 2
              </button>

              <button
                onClick={handleExecuteDeletion}
                disabled={confirmPhrase.trim() !== REQUIRED_PHRASE || isProcessing}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                {isProcessing ? 'Executing Cryptographic Purge...' : 'Permanently Delete Account'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}


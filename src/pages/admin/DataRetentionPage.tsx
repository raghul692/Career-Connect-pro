import React from 'react'
import {
  Trash2,
  FileCheck2,
  Scale,
  CheckCircle2
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const DataRetentionPage: React.FC = () => {
  const { retentionPolicies, runRetentionPurge, openSudoModal, showNotification } = useJobContext()

  const handleTriggerPurge = (id: string, category: string, count: number) => {
    if (count === 0) {
      showNotification('No records are currently eligible for purge under this policy.')
      return
    }

    // Require Step-Up Sudo Authentication for irreversible data destruction
    openSudoModal(`Execute DPDP Data Purge: ${category} (${count} records)`, () => {
      runRetentionPurge(id)
    })
  }

  const totalEligible = retentionPolicies.reduce((acc, p) => acc + p.recordsEligible, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 uppercase tracking-wider">
              Statutory Compliance
            </span>
            <span className="text-xs text-slate-400">DPDP Act 2023 & GDPR Art. 5</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Data Retention & DPDP Auto-Purge Policy
          </h1>
          <p className="text-xs text-slate-500">
            Automate regulatory data erasure schedules for unhired applicants, assessment videos, and talent pools to comply with Indian & international privacy statutes.
          </p>
        </div>

        <button
          onClick={() => showNotification('Generated and downloaded Data Protection Officer (DPO) Compliance Certificate.')}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <FileCheck2 className="w-3.5 h-3.5 text-indigo-600" />
          Export DPO Certificate (PDF)
        </button>
      </div>

      {/* DPO Seal & Legal Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-4 h-4 text-emerald-400" />
            DPDP Purpose Limitation & Storage Erasure Console
          </div>
          <div className="text-lg font-black tracking-tight">
            Indian Digital Personal Data Protection Act Compliance Active
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Personal resumes, telephone numbers, and college transcripts cannot be retained indefinitely once recruitment processes conclude. Automated purge cycles ensure your enterprise avoids non-compliance penalties up to ₹250 Crores.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 text-center shrink-0">
          <div className="text-[11px] text-slate-300 font-semibold">Total Records Due for Erasure</div>
          <div className="text-3xl font-black text-amber-400 mt-1">{totalEligible.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-400 font-bold mt-1">Protected by Sudo Mode</div>
        </div>
      </div>

      {/* Retention Policies Table */}
      <div className="space-y-4">
        {retentionPolicies.map((policy) => (
          <div
            key={policy.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-base text-slate-900">{policy.category}</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    Retain for {policy.retentionPeriodMonths} Months
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      policy.autoPurgeEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Auto-Purge: {policy.autoPurgeEnabled ? 'Enabled' : 'Manual'}
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-mono text-[11px]">
                  Governed by: <span className="font-semibold text-slate-700">{policy.dpdpRegulationRef}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-900">
                    {policy.recordsEligible.toLocaleString()} Records Due
                  </div>
                  <div className="text-[10px] text-slate-400">Scheduled: {policy.nextScheduledPurge}</div>
                </div>

                <button
                  onClick={() => handleTriggerPurge(policy.id, policy.category, policy.recordsEligible)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Execute Sudo Purge
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Destruction Action</span>
                <div className="font-bold text-slate-800 mt-0.5">{policy.purgeAction}</div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Last Execution Audit</span>
                <div className="font-medium text-slate-600 mt-0.5">{policy.lastPurgedAt}</div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Cryptographic Erasure</span>
                <div className="font-semibold text-emerald-700 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  NIST SP 800-88 Purge Confirmed
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


import React, { useState } from 'react'
import {
  ArrowRightLeft,
  ShieldAlert,
  CheckCircle2,
  Lock,
  Clock
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const OwnershipTransferPage: React.FC = () => {
  const { teamMembers, userProfile, openSudoModal, showNotification, addAuditLog } = useJobContext()

  const eligibleMembers = teamMembers.filter((m) => m.email !== userProfile.email && m.status === 'active')
  const [selectedMemberId, setSelectedMemberId] = useState(eligibleMembers[0]?.id || '')
  const [ackBilling, setAckBilling] = useState(false)
  const [ackSecurity, setAckSecurity] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const selectedMember = teamMembers.find((m) => m.id === selectedMemberId)

  const handleStartTransfer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMember) {
      showNotification('Please select an eligible verified team member.')
      return
    }

    if (!ackBilling || !ackSecurity) {
      showNotification('Please acknowledge all legal and security transfer terms.')
      return
    }

    // Trigger Step-Up Sudo Mode Modal
    openSudoModal(`Transfer Organization Master Ownership to ${selectedMember.name} (${selectedMember.email})`, () => {
      setIsCompleted(true)
      addAuditLog(
        'Master Ownership Transferred',
        `Transferred primary organization master account to ${selectedMember.name} (${selectedMember.email})`,
        'critical'
      )
      showNotification(`Ownership successfully transferred to ${selectedMember.name}! Confirmation email dispatched.`)
    })
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200 uppercase tracking-wider flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-red-600" />
            Privileged Operation
          </span>
          <span className="text-xs text-slate-400">Account Governance</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
          Transfer Organization Master Ownership
        </h1>
        <p className="text-xs text-slate-500">
          Reassign primary billing liability, enterprise SAML SSO signing permissions, and super-admin authority to another verified team member.
        </p>
      </div>

      {/* Critical Caution Box */}
      <div className="bg-red-50/70 border border-red-200 rounded-2xl p-5 flex items-start gap-4 text-xs text-red-900">
        <ShieldAlert className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
        <div className="space-y-1.5">
          <span className="font-bold text-sm text-red-950">Irreversible Enterprise Ownership Transfer</span>
          <p className="text-red-800 leading-relaxed">
            By completing this transfer, you relinquish Master Owner authority over this workspace. Your account will automatically be demoted to <strong>Admin</strong>. Only the new owner will possess permissions to delete the organization or modify primary bank wire payment profiles.
          </p>
        </div>
      </div>

      {isCompleted ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Ownership Transfer Initiated</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            An encrypted invitation with dual-key authentication has been dispatched to{' '}
            <strong>{selectedMember?.email}</strong>. Once accepted via their MFA token, the master handoff will conclude.
          </p>
        </div>
      ) : (
        <form onSubmit={handleStartTransfer} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          {/* Step 1: Select Member */}
          <div className="space-y-3 pb-6 border-b border-slate-100">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Step 1: Select Verified Successor
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">Eligible Team Members</label>
              <select
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
                className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 cursor-pointer"
              >
                {eligibleMembers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.email}) — Current Role: {m.role}
                  </option>
                ))}
              </select>
            </div>

            {selectedMember && (
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="font-bold text-xs text-slate-900">{selectedMember.name}</div>
                  <div className="text-[11px] text-slate-400">{selectedMember.email}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                    Verified Active Account · MFA Enforced
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Legal Acknowledgements */}
          <div className="space-y-3 pb-6 border-b border-slate-100">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Step 2: Legal & Financial Liability Acknowledgements
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ackBilling}
                  onChange={(e) => setAckBilling(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-red-600 rounded cursor-pointer shrink-0"
                />
                <span className="text-slate-700">
                  I confirm that all pending invoice obligations, recurring subscription fees, and registered GSTIN tax profiles will transfer to the new owner.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ackSecurity}
                  onChange={(e) => setAckSecurity(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-red-600 rounded cursor-pointer shrink-0"
                />
                <span className="text-slate-700">
                  I understand that this action immediately triggers a SOC 2 audit record and will require Step-Up Sudo Authentication to proceed.
                </span>
              </label>
            </div>
          </div>

          {/* Step 3: Action Trigger */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <div className="text-xs text-slate-400">
              Current Owner: <span className="font-semibold text-slate-700">{userProfile.name}</span>
            </div>

            <button
              type="submit"
              disabled={!ackBilling || !ackSecurity}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              Authorize Handoff with Sudo Mode
            </button>
          </div>
        </form>
      )}

      {/* Historical Ownership Audit Log */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs text-xs">
        <div className="font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400" />
          Ownership History & Audit Log
        </div>
        <div className="divide-y divide-slate-100">
          <div className="py-2.5 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800">Organization Created & Master Account Initialized</span>
              <p className="text-[11px] text-slate-400">Owner: {userProfile.name} ({userProfile.email})</p>
            </div>
            <span className="text-slate-400 text-[11px]">2025-04-12</span>
          </div>
        </div>
      </div>
    </div>
  )
}


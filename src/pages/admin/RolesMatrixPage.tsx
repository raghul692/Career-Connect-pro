import React, { useState } from 'react'
import { Shield, Check, X, Info, Save, RotateCcw } from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

interface PermissionScope {
  id: string
  name: string
  description: string
  category: 'Job Requisitions' | 'Candidate Pipeline' | 'Team & Governance' | 'FinOps' | 'API & Security'
  roles: {
    Owner: boolean
    Admin: boolean
    Recruiter: boolean
    'Hiring Manager': boolean
    'Billing Viewer': boolean
  }
}

export const RolesMatrixPage: React.FC = () => {
  const { showNotification } = useJobContext()

  const [permissions, setPermissions] = useState<PermissionScope[]>([
    {
      id: 'p-post-jobs',
      name: 'Publish & Edit Job Openings',
      description: 'Create new requisitions, edit job descriptions, change CTC brackets',
      category: 'Job Requisitions',
      roles: { Owner: true, Admin: true, Recruiter: true, 'Hiring Manager': false, 'Billing Viewer': false }
    },
    {
      id: 'p-view-resumes',
      name: 'Unlock & Download Candidate Resumes',
      description: 'Access full candidate PII, phone numbers, and download PDF resumes',
      category: 'Candidate Pipeline',
      roles: { Owner: true, Admin: true, Recruiter: true, 'Hiring Manager': true, 'Billing Viewer': false }
    },
    {
      id: 'p-scorecard',
      name: 'Submit Interview Scorecards & Notes',
      description: 'Record ratings, write technical feedback, and move candidates between pipeline stages',
      category: 'Candidate Pipeline',
      roles: { Owner: true, Admin: true, Recruiter: true, 'Hiring Manager': true, 'Billing Viewer': false }
    },
    {
      id: 'p-manage-team',
      name: 'Invite & Manage Team Members',
      description: 'Send organization invitations, change user roles, remove team members',
      category: 'Team & Governance',
      roles: { Owner: true, Admin: true, Recruiter: false, 'Hiring Manager': false, 'Billing Viewer': false }
    },
    {
      id: 'p-invoices',
      name: 'View Invoices & Manage Subscriptions',
      description: 'Download billing tax invoices, upgrade plan tiers, manage corporate cards',
      category: 'FinOps',
      roles: { Owner: true, Admin: false, Recruiter: false, 'Hiring Manager': false, 'Billing Viewer': true }
    },
    {
      id: 'p-api-keys',
      name: 'Generate & Revoke API Keys & Webhooks',
      description: 'Manage production secret tokens and configure automated webhooks',
      category: 'API & Security',
      roles: { Owner: true, Admin: true, Recruiter: false, 'Hiring Manager': false, 'Billing Viewer': false }
    },
    {
      id: 'p-audit-logs',
      name: 'Inspect Security Audit Logs',
      description: 'Access complete immutable chronological audit logs and actor IP records',
      category: 'API & Security',
      roles: { Owner: true, Admin: true, Recruiter: false, 'Hiring Manager': false, 'Billing Viewer': false }
    }
  ])

  const togglePermission = (scopeId: string, roleKey: keyof PermissionScope['roles']) => {
    if (roleKey === 'Owner') {
      showNotification('Owner permissions are permanently locked and cannot be disabled.')
      return
    }
    setPermissions((prev) =>
      prev.map((item) =>
        item.id === scopeId
          ? {
              ...item,
              roles: {
                ...item.roles,
                [roleKey]: !item.roles[roleKey]
              }
            }
          : item
      )
    )
  }

  const handleSave = () => {
    showNotification('Role permissions matrix saved and synced to all active sessions!')
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Roles & Permissions (RBAC)</h1>
          <p className="text-xs text-slate-500">Granular capability matrix governing access controls across your workspace</p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          Save Matrix Changes
        </button>
      </div>

      {/* Matrix Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-100 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-4 px-6 w-2/5">Permission Scope</th>
                <th className="py-4 px-3 text-center">Owner</th>
                <th className="py-4 px-3 text-center">Admin</th>
                <th className="py-4 px-3 text-center">Recruiter</th>
                <th className="py-4 px-3 text-center">Hiring Mgr</th>
                <th className="py-4 px-3 text-center">Billing View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissions.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70">
                  <td className="py-4 px-6 space-y-0.5">
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">{p.name}</div>
                    <div className="text-[11px] text-slate-500">{p.description}</div>
                    <span className="inline-block text-[9px] font-extrabold uppercase bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded mt-1">
                      {p.category}
                    </span>
                  </td>

                  {(['Owner', 'Admin', 'Recruiter', 'Hiring Manager', 'Billing Viewer'] as const).map((r) => {
                    const isChecked = p.roles[r]
                    return (
                      <td key={r} className="py-4 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => togglePermission(p.id, r)}
                          disabled={r === 'Owner'}
                          className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-emerald-500 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-300 hover:bg-slate-200'
                          } ${r === 'Owner' ? 'opacity-80 cursor-not-allowed' : ''}`}
                        >
                          {isChecked ? <Check className="w-4 h-4 stroke-[3]" /> : <X className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


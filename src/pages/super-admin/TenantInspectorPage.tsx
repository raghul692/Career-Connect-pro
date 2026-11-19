import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Crown,
  Search,
  TrendingUp,
  UserCheck
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const TenantInspectorPage: React.FC = () => {
  const { superAdminTenants, startImpersonation, organizations } = useJobContext()
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const filteredTenants = superAdminTenants.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.domain.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalMrr = superAdminTenants.reduce((acc, t) => acc + t.mrr, 0)
  const totalCandidates = superAdminTenants.reduce((acc, t) => acc + t.candidatesCount, 0)

  const handleImpersonate = (tenantId: string) => {
    // Find matching organization in context
    const match = organizations.find((o) => o.slug === tenantId.replace('org-', '')) || organizations[0]
    startImpersonation(match)
    navigate('/app')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 uppercase tracking-wider flex items-center gap-1">
              <Crown className="w-3.5 h-3.5 text-amber-600" />
              Founder & Master Admin
            </span>
            <span className="text-xs text-slate-400">Backoffice Console</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Super-Admin Multi-Tenant Inspector
          </h1>
          <p className="text-xs text-slate-500">
            God-Mode management of all registered enterprise companies, billing contracts, seat utilization, and support impersonation.
          </p>
        </div>
      </div>

      {/* High-Level Platform Portfolio Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs font-semibold text-slate-400">Total Platform MRR</div>
          <div className="text-2xl font-black text-slate-900 mt-1">₹{(totalMrr / 1000).toFixed(0)}k/mo</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +18.4% QoQ Growth
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs font-semibold text-slate-400">Active Enterprise Tenants</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{superAdminTenants.length} Companies</div>
          <div className="text-[11px] text-indigo-600 font-medium mt-1">100% Contract Retention</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs font-semibold text-slate-400">Total Candidate Records</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{totalCandidates.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">Distributed across tenants</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs font-semibold text-slate-400">Support Impersonation</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">Read-Only / Edit</div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">Full audit logged to SOC 2</div>
        </div>
      </div>

      {/* Tenant Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tenant by company or domain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white"
            />
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Showing {filteredTenants.length} of {superAdminTenants.length} Enterprise Tenants
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredTenants.map((tenant) => (
            <div
              key={tenant.id}
              className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-start gap-4 min-w-0">
                <img
                  src={tenant.logo}
                  alt={tenant.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                />

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-base text-slate-900">{tenant.name}</span>
                    <span className="text-xs font-mono text-slate-400">{tenant.domain}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-100">
                      {tenant.plan}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        tenant.healthStatus === 'healthy'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {tenant.healthStatus.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 flex items-center gap-3 flex-wrap">
                    <span>Admin: <strong className="text-slate-700">{tenant.primaryAdmin.name}</strong> ({tenant.primaryAdmin.email})</span>
                    <span>·</span>
                    <span>Support: {tenant.supportTier}</span>
                    <span>·</span>
                    <span>Joined: {tenant.joinedDate}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Contract MRR</span>
                      <div className="font-black text-slate-900">₹{tenant.mrr.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Seat Utilization</span>
                      <div className="font-bold text-slate-800">
                        {tenant.seatsUsed} / {tenant.seatsMax} Seats
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Jobs</span>
                      <div className="font-bold text-slate-800">{tenant.jobsCount} Openings</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Impersonate Button */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleImpersonate(tenant.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  title="Simulate customer support session"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Login as Recruiter (Impersonate)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


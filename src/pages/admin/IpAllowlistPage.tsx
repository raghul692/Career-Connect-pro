import React, { useState } from 'react'
import {
  Network,
  ShieldCheck,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Globe2,
  Server
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const IpAllowlistPage: React.FC = () => {
  const { ipRules, addIpRule, toggleIpRule, showNotification } = useJobContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [label, setLabel] = useState('')
  const [cidr, setCidr] = useState('')
  const [scope, setScope] = useState<'All Portals' | 'Recruiter Dashboard' | 'Developer API'>('Recruiter Dashboard')
  const [description, setDescription] = useState('')

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault()
    if (!label.trim() || !cidr.trim()) return
    addIpRule({
      label,
      cidr,
      scope,
      status: 'active',
      createdBy: 'You (Security Lead)',
      description: description || 'Authorized corporate IP gateway'
    })
    setIsModalOpen(false)
    setLabel('')
    setCidr('')
    setDescription('')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 uppercase tracking-wider">
              Zero-Trust Perimeter
            </span>
            <span className="text-xs text-slate-400">CISO Compliance</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            IP Allowlisting & Geofencing Configuration
          </h1>
          <p className="text-xs text-slate-500">
            Restrict recruiter workspace access and candidate resume database queries to corporate leased lines, headquarters networks, and approved VPN CIDR blocks.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          Add IP / CIDR Block
        </button>
      </div>

      {/* Security Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-400">Enforcement Posture</div>
            <div className="text-sm font-bold text-slate-900">Enforced on Recruiter Portal</div>
            <div className="text-[10px] text-emerald-600 font-semibold">Strict Zero-Trust Active</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
            <Globe2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-400">Your Current Client IP</div>
            <div className="text-sm font-mono font-bold text-slate-900">103.24.120.45</div>
            <div className="text-[10px] text-indigo-600 font-semibold">Matched Rule #1 (HQ Office)</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-400">Active Network Rules</div>
            <div className="text-sm font-bold text-slate-900">{ipRules.length} CIDR Gateways</div>
            <div className="text-[10px] text-purple-600 font-semibold">100% Policy Health</div>
          </div>
        </div>
      </div>

      {/* Rules Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="text-xs font-bold text-slate-700">Authorized Network Gateways</div>
          <span className="text-[11px] text-slate-400">Subnet Mask Support: IPv4 (/32 to /16) & IPv6</span>
        </div>

        <div className="divide-y divide-slate-100">
          {ipRules.map((rule) => (
            <div
              key={rule.id}
              className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-bold text-sm text-slate-900">{rule.label}</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 font-mono text-xs font-bold text-slate-800 border border-slate-200">
                    {rule.cidr}
                  </span>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                    {rule.scope}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{rule.description}</p>
                <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-0.5">
                  <span>Created {rule.createdAt} by {rule.createdBy}</span>
                  <span>·</span>
                  <span>Last traffic match: {rule.lastActive}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => toggleIpRule(rule.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    rule.status === 'active'
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {rule.status === 'active' ? 'Active' : 'Disabled'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add IP Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 max-w-md w-full space-y-4 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900">Add Trusted IP / CIDR Gateway</h3>
            <p className="text-xs text-slate-500">
              Connections from IP addresses outside your allowlist will be rejected with an HTTP 403 Forbidden barrier.
            </p>

            <form onSubmit={handleAddRule} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Location / Rule Label</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai Corporate VPN Gateway"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">IPv4 or IPv6 CIDR Block</label>
                  <button
                    type="button"
                    onClick={() => setCidr('103.24.120.45/32')}
                    className="text-[10px] text-indigo-600 font-bold hover:underline cursor-pointer"
                  >
                    Use Current IP
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. 103.24.120.0/24 or 13.127.44.18/32"
                  value={cidr}
                  onChange={(e) => setCidr(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Enforcement Scope</label>
                <select
                  value={scope}
                  onChange={(e) => setScope(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white cursor-pointer"
                >
                  <option value="Recruiter Dashboard">Recruiter Dashboard & ATS Only</option>
                  <option value="Developer API">Developer & Webhook API Endpoints</option>
                  <option value="All Portals">All Corporate Portals (Global Lockdown)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Description (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Leased fiber link for TA Floor 4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                />
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
                  Save Allowlist Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


import React, { useState } from 'react'
import {
  Globe,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Copy,
  Plus,
  RefreshCw
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const DomainVerificationPage: React.FC = () => {
  const { domainRecords, verifyDomain, showNotification } = useJobContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newDomain, setNewDomain] = useState('')
  const [isChecking, setIsChecking] = useState<string | null>(null)

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    showNotification(`Copied ${label} to clipboard!`)
  }

  const handleVerifyCheck = (id: string, _domain: string) => {
    setIsChecking(id)
    setTimeout(() => {
      verifyDomain(id)
      setIsChecking(null)
    }, 1200)
  }

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDomain.trim()) return
    showNotification(`Domain "${newDomain}" added. Please add the DNS TXT record to verify ownership.`)
    setIsModalOpen(false)
    setNewDomain('')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 uppercase tracking-wider">
              Identity & Trust Governance
            </span>
            <span className="text-xs text-slate-400">DNS Ownership</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Corporate Domain Verification & Claiming
          </h1>
          <p className="text-xs text-slate-500">
            Verify corporate email domains (@company.com) via DNS TXT challenges to enforce enterprise SAML SSO and prevent unauthorized recruitment postings.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          Claim New Domain
        </button>
      </div>

      {/* Info Callout */}
      <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-4 flex items-start gap-3.5 text-xs text-indigo-900">
        <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold">Why claim your corporate email domain?</span>
          <p className="text-indigo-800 leading-relaxed">
            Claiming your domain ensures that any employee registering with your company's domain (e.g. <code>@swiggy.in</code>) is automatically routed to your enterprise tenant with mandatory Okta/Azure SSO, locking out spoofed accounts.
          </p>
        </div>
      </div>

      {/* Domain Cards */}
      <div className="space-y-4">
        {domainRecords.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 font-bold shrink-0">
                  <Globe className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-slate-900 font-mono">{item.domain}</span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                        item.status === 'verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.status === 'verified' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Verified
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 text-amber-600" />
                          Pending DNS
                        </>
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Claimed by {item.claimedByOrg} · {item.lastChecked}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {item.status === 'pending' && (
                  <button
                    onClick={() => handleVerifyCheck(item.id, item.domain)}
                    disabled={isChecking === item.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isChecking === item.id ? 'animate-spin' : ''}`} />
                    {isChecking === item.id ? 'Checking DNS...' : 'Verify DNS Record'}
                  </button>
                )}

                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <span className="text-xs font-medium text-slate-600">Auto-Enforce SSO:</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.autoEnforceSso ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {item.autoEnforceSso ? 'Enforced' : 'Optional'}
                  </span>
                </div>
              </div>
            </div>

            {/* DNS Instructions Block */}
            <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-100">
              <div className="text-xs font-bold text-slate-700">
                Required DNS TXT Configuration (Add at your DNS Registrar: Cloudflare, Route53, GoDaddy)
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Record Type</span>
                  <div className="p-2 bg-white rounded-lg border border-slate-200 font-mono font-bold text-slate-800">
                    TXT
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Host / Name</span>
                  <div className="p-2 bg-white rounded-lg border border-slate-200 font-mono text-slate-800 flex items-center justify-between">
                    <span className="truncate">{item.txtRecordName}</span>
                    <button
                      onClick={() => handleCopy(item.txtRecordName, 'Host Record')}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Value / Target</span>
                  <div className="p-2 bg-white rounded-lg border border-slate-200 font-mono text-slate-800 flex items-center justify-between">
                    <span className="truncate">{item.txtRecordValue}</span>
                    <button
                      onClick={() => handleCopy(item.txtRecordValue, 'Challenge Token')}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Claim Domain Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 max-w-md w-full space-y-4 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900">Claim Corporate Domain</h3>
            <p className="text-xs text-slate-500">
              Enter your corporate apex or sub-domain. We will generate a unique cryptographic token for you to add to your DNS records.
            </p>

            <form onSubmit={handleAddDomain} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Domain FQDN</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. yourcompany.com or careers.company.in"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
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
                  Generate Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


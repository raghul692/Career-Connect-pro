import React, { useState } from 'react'
import { Key, Plus, Trash2, Copy, Check, ShieldAlert, AlertTriangle, Eye, X } from 'lucide-react'
import { useJobContext } from '../../context/JobContext'
import { ApiKey } from '../../types'

export const ApiKeysPage: React.FC = () => {
  const { apiKeys, generateApiKey, revokeApiKey, showNotification } = useJobContext()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [keyName, setKeyName] = useState('')
  const [keyScope, setKeyScope] = useState<ApiKey['scope']>('Full Access')
  const [createdKeySecret, setCreatedKeySecret] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState(false)

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const newKey = generateApiKey(keyName, keyScope)
    setCreatedKeySecret(`sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`)
    setShowCreateModal(false)
    setKeyName('')
  }

  const copySecret = () => {
    if (createdKeySecret) {
      navigator.clipboard.writeText(createdKeySecret)
      setCopiedKey(true)
      showNotification('Secret API key copied to clipboard!')
      setTimeout(() => setCopiedKey(false), 2000)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">API Keys & Tokens</h1>
          <p className="text-xs text-slate-500">Manage secret credentials for programmatic access to candidates, jobs, and NCAT test scores</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Create New Secret Key
        </button>
      </div>

      {/* Secret Key Revealed Banner (One-time viewing) */}
      {createdKeySecret && (
        <div className="p-6 bg-slate-900 text-white rounded-3xl space-y-4 border border-slate-800 shadow-xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <ShieldAlert className="w-4 h-4" />
              Save Your Secret Key (Will never be displayed again)
            </div>
            <button
              onClick={() => setCreatedKeySecret(null)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3 p-3 bg-slate-950 rounded-xl font-mono text-xs border border-slate-800">
            <span className="text-emerald-300 truncate">{createdKeySecret}</span>
            <button
              onClick={copySecret}
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] rounded-lg shrink-0 flex items-center gap-1 cursor-pointer"
            >
              {copiedKey ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
              {copiedKey ? 'Copied' : 'Copy'}
            </button>
          </div>

          <p className="text-[11px] text-slate-400">
            Store this token securely in your environment variables. Never commit secret tokens to public repositories.
          </p>
        </div>
      )}

      {/* Keys Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-6">Key Name</th>
                <th className="py-3.5 px-4">Token Preview</th>
                <th className="py-3.5 px-4">Scope</th>
                <th className="py-3.5 px-4">Last Used</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {apiKeys.map((key) => (
                <tr key={key.id} className="hover:bg-slate-50/80">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{key.name}</div>
                    <div className="text-[11px] text-slate-400">Created: {key.createdAt}</div>
                  </td>

                  <td className="py-4 px-4 font-mono text-slate-600 text-xs">
                    {key.maskedKey}
                  </td>

                  <td className="py-4 px-4">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {key.scope}
                    </span>
                  </td>

                  <td className="py-4 px-4 font-mono text-slate-500 text-[11px]">
                    {key.lastUsed}
                  </td>

                  <td className="py-4 px-6 text-right">
                    {key.status === 'active' ? (
                      <button
                        onClick={() => revokeApiKey(key.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Revoke Key"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        Revoked
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-lg text-slate-900">Generate Secret Key</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Key Name / Description *</label>
                <input
                  type="text"
                  required
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  placeholder="e.g. Greenhouse Webhook Sourcing"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Permission Scope</label>
                <select
                  value={keyScope}
                  onChange={(e) => setKeyScope(e.target.value as ApiKey['scope'])}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                >
                  <option value="Full Access">Full Access (Read + Write + Admin)</option>
                  <option value="Jobs & Candidates">Jobs & Candidates (Sourcing only)</option>
                  <option value="Read Only">Read Only (Telemetry and queries)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Generate Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


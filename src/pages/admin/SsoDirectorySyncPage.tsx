import React, { useState } from 'react'
import {
  CheckCircle2, Copy, Check
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const SsoDirectorySyncPage: React.FC = () => {
  const { activeOrg, showNotification } = useJobContext()
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [scimEnabled, setScimEnabled] = useState(true)
  const [enforceMfa, setEnforceMfa] = useState(true)
  const [samlMetadataUrl, setSamlMetadataUrl] = useState('https://login.okta.com/app/exk99a8b/sso/saml/metadata')

  const acsUrl = `https://api.careerconnectpro.com/v1/auth/saml/${activeOrg.slug}/acs`
  const entityId = `urn:careerconnectpro:${activeOrg.slug}`

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldName)
    showNotification(`${fieldName} copied to clipboard!`)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    showNotification('SAML 2.0 metadata & SCIM directory sync settings saved!')
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">SSO & Directory Sync (SCIM)</h1>
          <p className="text-xs text-slate-500">Configure SAML 2.0 Identity Provider connections with Okta, Microsoft Entra ID (Azure AD), or Google Workspace</p>
        </div>

        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl self-start sm:self-auto flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          SAML 2.0 Active
        </span>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Service Provider (SP) Credentials */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-slate-900">Career Connect Pro (Service Provider) Configuration</h3>
            <p className="text-xs text-slate-500">Paste these values into your Okta or Azure AD SAML Application settings</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Assertion Consumer Service (ACS) URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={acsUrl}
                  className="flex-1 font-mono text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 select-all"
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(acsUrl, 'ACS URL')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  {copiedField === 'ACS URL' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Entity ID (Audience URI)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={entityId}
                  className="flex-1 font-mono text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 select-all"
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(entityId, 'Entity ID')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  {copiedField === 'Entity ID' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Identity Provider (IdP) Metadata */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-slate-900">Identity Provider (IdP) Metadata</h3>
            <p className="text-xs text-slate-500">Provide your IdP metadata URL or upload the X.509 certificate</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">IdP Metadata XML URL</label>
              <input
                type="url"
                value={samlMetadataUrl}
                onChange={(e) => setSamlMetadataUrl(e.target.value)}
                className="w-full text-xs font-mono p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
              />
            </div>

            {/* SCIM Toggle */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="font-bold text-xs sm:text-sm text-slate-900">Automated SCIM Directory Sync (v2.0)</div>
                <p className="text-xs text-slate-500">Automatically invite users and revoke access when employees join or leave your company directory.</p>
              </div>
              <input
                type="checkbox"
                checked={scimEnabled}
                onChange={(e) => setScimEnabled(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded mt-1 cursor-pointer"
              />
            </div>

            {/* Enforce MFA Toggle */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="font-bold text-xs sm:text-sm text-slate-900">Enforce Mandatory Two-Factor (2FA) for All Users</div>
                <p className="text-xs text-slate-500">Block passwords-only sign-ins for all {activeOrg.seatsUsed} team accounts.</p>
              </div>
              <input
                type="checkbox"
                checked={enforceMfa}
                onChange={(e) => setEnforceMfa(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded mt-1 cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}


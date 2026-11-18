import React, { useState } from 'react'
import {
  Palette,
  Globe,
  Sliders,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Eye,
  ShieldCheck,
  Building2
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const WhiteLabelPage: React.FC = () => {
  const { whiteLabelConfig, updateWhiteLabelConfig, showNotification } = useJobContext()

  const [brandName, setBrandName] = useState(whiteLabelConfig.brandName)
  const [portalTitle, setPortalTitle] = useState(whiteLabelConfig.portalTitle)
  const [primaryColor, setPrimaryColor] = useState(whiteLabelConfig.primaryColor)
  const [customDomain, setCustomDomain] = useState(whiteLabelConfig.customDomain)
  const [customFields, setCustomFields] = useState(whiteLabelConfig.customFields)

  // New field modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newLabel, setNewLabel] = useState('')
  const [newType, setNewType] = useState<'text' | 'number' | 'select' | 'textarea' | 'file'>('text')
  const [newRequired, setNewRequired] = useState(true)
  const [newAppliesTo, setNewAppliesTo] = useState<'candidate_apply' | 'job_post'>('candidate_apply')

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault()
    updateWhiteLabelConfig({
      brandName,
      portalTitle,
      primaryColor,
      customDomain,
      customFields
    })
  }

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLabel.trim()) return

    const createdField = {
      id: `cf-${Date.now()}`,
      label: newLabel,
      fieldType: newType,
      required: newRequired,
      appliesTo: newAppliesTo
    }

    setCustomFields((prev) => [...prev, createdField])
    updateWhiteLabelConfig({ customFields: [...customFields, createdField] })
    setIsModalOpen(false)
    setNewLabel('')
  }

  const handleDeleteField = (id: string) => {
    const updated = customFields.filter((f) => f.id !== id)
    setCustomFields(updated)
    updateWhiteLabelConfig({ customFields: updated })
    showNotification('Applicant question removed from schema.')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 uppercase tracking-wider flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-indigo-600" />
              Enterprise Tier Feature
            </span>
            <span className="text-xs text-slate-400">Custom Branding & Fields</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            White-Label Studio & Custom Schema Builder
          </h1>
          <p className="text-xs text-slate-500">
            Customize your public candidate experience with custom career domains, company color palettes, and bespoke application question fields.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Brand & Visual Identity Form */}
        <form onSubmit={handleSaveBranding} className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Palette className="w-4 h-4 text-indigo-600" />
            Visual Identity & Custom Domain
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Display Brand Name</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Career Portal Page Title</label>
            <input
              type="text"
              value={portalTitle}
              onChange={(e) => setPortalTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Custom CNAME Domain</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-bold mt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Automated TLS/SSL Provisioned
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Primary Brand Accent Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-0.5"
              />
              <span className="font-mono text-xs font-bold text-slate-700">{primaryColor}</span>
            </div>
          </div>

          {/* Mini Live Preview Swatch */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Live Preview Button</span>
            <button
              type="button"
              style={{ backgroundColor: primaryColor }}
              className="w-full py-2 rounded-xl text-white text-xs font-bold shadow-xs"
            >
              Apply to {brandName}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            Save Brand Changes
          </button>
        </form>

        {/* Right Column: Custom Applicant Fields Schema Builder */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-600" />
                Custom Applicant Fields & Form Schema
              </h3>
              <p className="text-xs text-slate-500">
                Collect specific candidate data (e.g. Current CTC, Notice Period, GitHub link) during job application.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Custom Question
            </button>
          </div>

          {/* Fields Table */}
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            {customFields.map((field) => (
              <div
                key={field.id}
                className="p-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{field.label}</span>
                    {field.required ? (
                      <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                        Required
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        Optional
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Type: <span className="font-mono text-slate-600 font-semibold">{field.fieldType}</span> · Scope:{' '}
                    <span className="capitalize text-slate-600">{field.appliesTo.replace('_', ' ')}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteField(field.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove Field"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Custom Question Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 max-w-md w-full space-y-4 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900">Add Custom Applicant Field</h3>
            <p className="text-xs text-slate-500">
              Configure a question that candidate job applicants must complete when applying for your openings.
            </p>

            <form onSubmit={handleAddField} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Question / Field Label</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Current Fixed Annual CTC (INR Lakhs)"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Input Data Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white cursor-pointer"
                  >
                    <option value="text">Single-line Text</option>
                    <option value="number">Number (CTC, GPA)</option>
                    <option value="select">Dropdown Select</option>
                    <option value="textarea">Multi-line Paragraph</option>
                    <option value="file">File / Portfolio Upload</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Applies To</label>
                  <select
                    value={newAppliesTo}
                    onChange={(e) => setNewAppliesTo(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white cursor-pointer"
                  >
                    <option value="candidate_apply">Candidate Application Form</option>
                    <option value="job_post">Job Requisition Opening Form</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="reqCheck"
                  checked={newRequired}
                  onChange={(e) => setNewRequired(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                />
                <label htmlFor="reqCheck" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Mandatory (Applicant cannot submit without answering)
                </label>
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
                  Add Field
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


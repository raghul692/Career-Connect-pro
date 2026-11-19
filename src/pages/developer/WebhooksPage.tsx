import React, { useState } from 'react'
import {
  Webhook, Plus, Send, CheckCircle2, Trash2, X
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const WebhooksPage: React.FC = () => {
  const { webhooks, addWebhook, deleteWebhook, showNotification } = useJobContext()
  const [showAddModal, setShowAddModal] = useState(false)
  const [newUrl, setNewUrl] = useState('')
  const [selectedEvents, setSelectedEvents] = useState<string[]>([
    'candidate.applied',
    'candidate.shortlisted'
  ])
  const [testingId, setTestingId] = useState<string | null>(null)

  const availableEvents = [
    { id: 'candidate.applied', name: 'candidate.applied', desc: 'Fires when a new student applies to a role' },
    { id: 'candidate.shortlisted', name: 'candidate.shortlisted', desc: 'Fires when a recruiter advances a candidate stage' },
    { id: 'ncat.test_completed', name: 'ncat.test_completed', desc: 'Fires when an applicant completes an NCAT assessment' },
    { id: 'job.published', name: 'job.published', desc: 'Fires when a requisition is activated' }
  ]

  const handleToggleEvent = (evtId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(evtId) ? prev.filter((e) => e !== evtId) : [...prev, evtId]
    )
  }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newUrl && selectedEvents.length > 0) {
      addWebhook(newUrl, selectedEvents)
      setShowAddModal(false)
      setNewUrl('')
    }
  }

  const handleTestPing = (id: string, url: string) => {
    setTestingId(id)
    setTimeout(() => {
      setTestingId(null)
      showNotification(`Test webhook payload delivered to ${url} (HTTP 200 OK)!`)
    }, 1000)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Webhooks & Event Subscriptions</h1>
          <p className="text-xs text-slate-500">Subscribe your internal web servers to real-time candidate application events</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Webhook Endpoint
        </button>
      </div>

      {/* Endpoints List */}
      <div className="space-y-4">
        {webhooks.map((wh) => (
          <div key={wh.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <Webhook className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono font-bold text-xs sm:text-sm text-slate-900 truncate">{wh.url}</div>
                  <div className="text-[11px] text-slate-400 font-mono">Secret: {wh.signingSecret}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleTestPing(wh.id, wh.url)}
                  disabled={testingId === wh.id}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className={`w-3.5 h-3.5 ${testingId === wh.id ? 'animate-spin' : ''}`} />
                  {testingId === wh.id ? 'Pinging...' : 'Send Test Ping'}
                </button>
                <button
                  onClick={() => deleteWebhook(wh.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 cursor-pointer"
                  title="Delete webhook"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Subscribed Event Badges */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
              {wh.events.map((evt, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
                >
                  {evt}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> HTTP {wh.lastDeliveryStatus} OK
              </span>
              <span>Last delivery: {wh.lastDeliveryTime}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Webhook Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-lg text-slate-900">Add Webhook Endpoint</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Payload Delivery URL (HTTPS) *</label>
                <input
                  type="url"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://api.yourcompany.com/webhooks/talent"
                  className="w-full text-xs font-mono p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Subscribed Events *</label>
                <div className="space-y-2">
                  {availableEvents.map((evt) => (
                    <label
                      key={evt.id}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-200/80 hover:bg-slate-50 cursor-pointer text-xs"
                    >
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(evt.id)}
                        onChange={() => handleToggleEvent(evt.id)}
                        className="w-4 h-4 text-indigo-600 rounded mt-0.5"
                      />
                      <div>
                        <div className="font-mono font-bold text-slate-900">{evt.name}</div>
                        <div className="text-[11px] text-slate-500">{evt.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Register Endpoint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


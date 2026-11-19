import React, { useState } from 'react'
import {
  Radio,
  Send,
  Eye,
  Trash2
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const BroadcastBannerPage: React.FC = () => {
  const { broadcastMessage, setBroadcastMessage, showNotification, addAuditLog } = useJobContext()

  const [title, setTitle] = useState(broadcastMessage?.title || 'Scheduled AWS Mumbai Database Maintenance')
  const [message, setMessage] = useState(
    broadcastMessage?.message ||
      'Career Connect Pro will undergo planned read-replica database optimization on Sunday, Nov 8 between 02:00 AM – 03:30 AM IST. Candidate submissions will queue safely without data loss.'
  )
  const [severity, setSeverity] = useState<'info' | 'maintenance' | 'critical'>(broadcastMessage?.severity || 'maintenance')
  const [audience, setAudience] = useState<'all' | 'recruiters_only' | 'candidates_only'>('all')
  const [ctaText, setCtaText] = useState(broadcastMessage?.ctaText || 'View Status Dashboard')
  const [ctaLink, setCtaLink] = useState(broadcastMessage?.ctaLink || '/status')

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !message.trim()) return

    const newBroadcast = {
      id: `broad-${Date.now()}`,
      title,
      message,
      severity,
      active: true,
      audience,
      startsAt: 'Immediately',
      endsAt: 'Until Dismissed',
      ctaText: ctaText.trim() || undefined,
      ctaLink: ctaLink.trim() || undefined
    }

    setBroadcastMessage(newBroadcast)
    addAuditLog('System Broadcast Published', `Published global banner: "${title}" (${severity.toUpperCase()})`, 'high')
    showNotification('System Broadcast banner published live across all screens!')
  }

  const handleDeactivate = () => {
    setBroadcastMessage(null)
    addAuditLog('System Broadcast Deactivated', 'Global maintenance banner was taken down', 'medium')
    showNotification('Broadcast banner deactivated.')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 uppercase tracking-wider flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-amber-600" />
              Real-Time Out-of-Band Broadcast
            </span>
            <span className="text-xs text-slate-400">Public & Workspace</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Global System Broadcast Banner Creator
          </h1>
          <p className="text-xs text-slate-500">
            Push real-time notification alerts, maintenance downtime warnings, and national campus announcements across all user screens instantly.
          </p>
        </div>
      </div>

      {/* Current Status Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            broadcastMessage?.active ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-400'
          }`}>
            <Radio className={`w-5 h-5 ${broadcastMessage?.active ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">
              Broadcast Status:{' '}
              <span className={broadcastMessage?.active ? 'text-emerald-600' : 'text-slate-400'}>
                {broadcastMessage?.active ? 'Live Banner Active' : 'No Active Broadcast'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {broadcastMessage?.active
                ? `Displaying "${broadcastMessage.title}" to ${broadcastMessage.audience}`
                : 'All pages are currently operating in normal banner-free mode'}
            </p>
          </div>
        </div>

        {broadcastMessage?.active && (
          <button
            onClick={handleDeactivate}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Take Down Live Banner
          </button>
        )}
      </div>

      {/* Live Preview Bar */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-indigo-600" />
          Real-Time Render Preview
        </div>

        <div
          className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-between ${
            severity === 'critical'
              ? 'bg-red-50 text-red-900 border-red-200'
              : severity === 'maintenance'
              ? 'bg-amber-50 text-amber-900 border-amber-200'
              : 'bg-indigo-50 text-indigo-900 border-indigo-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Radio className="w-3.5 h-3.5 animate-pulse shrink-0" />
            <span>
              <strong>{title || 'Banner Title'}:</strong> {message || 'Your announcement message here.'}
            </span>
          </div>
          {ctaText && (
            <span className="underline font-bold text-xs shrink-0 ml-4">
              {ctaText} →
            </span>
          )}
        </div>
      </div>

      {/* Banner Configuration Form */}
      <form onSubmit={handlePublish} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
        <h3 className="text-base font-bold text-slate-900">Broadcast Configuration</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Announcement Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Scheduled AWS Maintenance"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Severity Level</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value as any)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white cursor-pointer"
            >
              <option value="info">Informational Announcement (Indigo)</option>
              <option value="maintenance">Planned Maintenance Window (Amber)</option>
              <option value="critical">Critical Incident / Latency Advisory (Red)</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Announcement Message Body</label>
          <textarea
            rows={3}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Explain the maintenance window, impacted services, and fallback measures..."
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Target Audience</label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value as any)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white cursor-pointer"
            >
              <option value="all">All Users (Public + Workspace)</option>
              <option value="recruiters_only">Recruiters & Hiring Managers Only</option>
              <option value="candidates_only">Candidate Job Seekers Only</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">CTA Button Text (Optional)</label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="e.g. View Status Dashboard"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">CTA Link Target</label>
            <input
              type="text"
              value={ctaLink}
              onChange={(e) => setCtaLink(e.target.value)}
              placeholder="e.g. /status"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            Publish Live Broadcast
          </button>
        </div>
      </form>
    </div>
  )
}


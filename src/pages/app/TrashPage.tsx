import React, { useState } from 'react'
import { Trash2, RotateCcw, AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

interface TrashedItem {
  id: string
  name: string
  type: 'Job Requisition' | 'Candidate Profile' | 'Webhook Endpoint' | 'API Key'
  deletedDate: string
  daysLeft: number
  deletedBy: string
}

export const TrashPage: React.FC = () => {
  const { showNotification } = useJobContext()
  const [items, setItems] = useState<TrashedItem[]>([
    { id: 'tr-1', name: 'Junior Cloud DevOps Engineer (Pune)', type: 'Job Requisition', deletedDate: '26 Oct 2026', daysLeft: 24, deletedBy: 'Vikram Joshi' },
    { id: 'tr-2', name: 'Legacy Zapier Webhook Hook', type: 'Webhook Endpoint', deletedDate: '18 Oct 2026', daysLeft: 16, deletedBy: 'Priya Narayanan' },
    { id: 'tr-3', name: 'Draft 2025 Placement Guidelines', type: 'Candidate Profile', deletedDate: '10 Oct 2026', daysLeft: 8, deletedBy: 'Ananya Sharma' }
  ])

  const handleRestore = (id: string, name: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
    showNotification(`Restored "${name}" back to active workspace!`)
  }

  const handlePermanentDelete = (id: string, name: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
    showNotification(`Permanently purged "${name}". This cannot be undone.`)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Archived & Trash Bin</h1>
          <p className="text-xs text-slate-500">Soft-deleted records are retained for 30 days before permanent zero-trace deletion</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Auto-purge in 30 days</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {items.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Trash2 className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="font-bold text-sm text-slate-700">Trash Bin is Empty</div>
            <div className="text-xs text-slate-400">No deleted records currently pending purge.</div>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {items.map((item) => (
              <div key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{item.name}</span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Deleted by {item.deletedBy} on {item.deletedDate} · <strong className="text-amber-600">{item.daysLeft} days remaining</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRestore(item.id, item.name)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Restore
                  </button>
                  <button
                    onClick={() => handlePermanentDelete(item.id, item.name)}
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Purge
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


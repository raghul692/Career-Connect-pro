import React from 'react'
import { CheckCircle2, X } from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const NotificationToast: React.FC = () => {
  const { notification, showNotification } = useJobContext()

  if (!notification) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-5 duration-200 max-w-md">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      <span className="text-xs font-medium leading-relaxed">{notification}</span>
      <button
        onClick={() => showNotification('')}
        className="ml-auto text-slate-400 hover:text-white transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}


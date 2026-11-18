import React, { useState } from 'react'
import { UserCheck, Shield, Code2, Briefcase, ChevronUp } from 'lucide-react'
import { useJobContext } from '../../context/JobContext'
import { Persona } from '../../types'

export const PersonaSwitcher: React.FC = () => {
  const { persona, setPersona, showNotification } = useJobContext()
  const [isOpen, setIsOpen] = useState(false)

  const personas: { id: Persona; label: string; roleDesc: string; icon: React.ElementType; badgeBg: string }[] = [
    { id: 'candidate', label: 'Candidate', roleDesc: 'Job seeker & student view', icon: Briefcase, badgeBg: 'bg-emerald-500' },
    { id: 'recruiter', label: 'Recruiter', roleDesc: 'Hiring pipeline & resumes', icon: UserCheck, badgeBg: 'bg-indigo-500' },
    { id: 'admin', label: 'Org Admin', roleDesc: 'Full RBAC, team & billing', icon: Shield, badgeBg: 'bg-amber-500' },
    { id: 'developer', label: 'Developer', roleDesc: 'API keys, webhooks & docs', icon: Code2, badgeBg: 'bg-purple-500' }
  ]

  const activePersonaObj = personas.find((p) => p.id === persona) || personas[2]

  const handleSelect = (newPersona: Persona) => {
    setPersona(newPersona)
    setIsOpen(false)
    showNotification(`Switched testing persona to: ${newPersona.toUpperCase()}`)
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 space-y-1 animate-in fade-in slide-in-from-bottom-2">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Testing Persona Switcher
          </div>
          {personas.map((item) => {
            const Icon = item.icon
            const isSelected = item.id === persona
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                  isSelected ? 'bg-indigo-50 text-indigo-900 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold leading-tight">{item.label}</div>
                  <div className="text-[10px] text-slate-400 truncate">{item.roleDesc}</div>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-full shadow-lg hover:bg-slate-800 transition-all text-xs font-medium border border-slate-700 cursor-pointer"
        title="Toggle Testing Persona"
      >
        <span className={`w-2 h-2 rounded-full ${activePersonaObj.badgeBg} animate-pulse`} />
        <span>Persona: <strong>{activePersonaObj.label}</strong></span>
        <ChevronUp className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
    </div>
  )
}


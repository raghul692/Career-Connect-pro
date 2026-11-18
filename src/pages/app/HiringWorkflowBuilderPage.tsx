import React, { useState } from 'react'
import {
  GitFork,
  Sparkles,
  Play,
  Plus,
  CheckCircle2,
  ArrowDown,
  ArrowRight,
  Sliders,
  Clock,
  Send,
  Zap,
  Power
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const HiringWorkflowBuilderPage: React.FC = () => {
  const { hiringWorkflows, toggleWorkflow, showNotification } = useJobContext()
  const [selectedWorkflowId, setSelectedWorkflowId] = useState(hiringWorkflows[0]?.id || '')
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationLogs, setSimulationLogs] = useState<string[]>([])

  const currentWf = hiringWorkflows.find((w) => w.id === selectedWorkflowId) || hiringWorkflows[0]

  const handleRunSimulation = () => {
    setIsSimulating(true)
    setSimulationLogs([])

    const steps = [
      '⚡ [Trigger]: Received incoming application from candidate "Aarav Sundaram" (IIT Bombay)',
      '🔍 [Condition]: Checking rule "CGPA >= 8.5" -> Result: 8.84 (PASSED)',
      '🔍 [Condition]: Checking rule "NCAT Score >= 80%" -> Result: 94% (PASSED)',
      '🚀 [Action]: Dispatching automated HackerEarth webhook with test ID "HE-TEST-SDE1-2026"',
      '📨 [Action]: Assigned candidate profile to Talent Lead "Priya Mehta" and notified via Slack',
      '✅ [Success]: Workflow executed in 142ms with zero errors.'
    ]

    steps.forEach((step, index) => {
      setTimeout(() => {
        setSimulationLogs((prev) => [...prev, step])
        if (index === steps.length - 1) {
          setIsSimulating(false)
          showNotification('Workflow dry-run simulation completed successfully!')
        }
      }, (index + 1) * 450)
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-indigo-600" />
              Event-Driven ATS Engine
            </span>
            <span className="text-xs text-slate-400">Zero-Code Automation</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Visual Hiring Workflow & Pipeline Builder
          </h1>
          <p className="text-xs text-slate-500">
            Automate routine recruiter tasks: screen incoming resumes, trigger coding assessments, route profiles to hiring managers, and dispatch personalized feedback.
          </p>
        </div>

        <button
          onClick={() => showNotification('Opened new automation canvas template.')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          Create New Automation
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflows Navigation List */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Configured Pipelines ({hiringWorkflows.length})
          </div>

          {hiringWorkflows.map((wf) => {
            const isSelected = wf.id === currentWf?.id
            return (
              <div
                key={wf.id}
                onClick={() => setSelectedWorkflowId(wf.id)}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-100'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-xs text-slate-900 leading-snug">{wf.title}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWorkflow(wf.id)
                    }}
                    className={`p-1 rounded-lg text-[10px] font-bold ${
                      wf.active
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {wf.active ? 'Active' : 'Paused'}
                  </button>
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1.5">{wf.description}</p>

                <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-3 border-t border-slate-100 mt-3">
                  <span>{wf.totalRuns.toLocaleString()} Runs</span>
                  <span>·</span>
                  <span>Last active: {wf.lastRunAt}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Workflow Visual Canvas View */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black text-slate-900">{currentWf.title}</h2>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      currentWf.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {currentWf.active ? 'Active in Production' : 'Paused'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{currentWf.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunSimulation}
                  disabled={isSimulating}
                  className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                  {isSimulating ? 'Simulating...' : 'Test Dry Run'}
                </button>
              </div>
            </div>

            {/* Node Pipeline Diagram */}
            <div className="relative space-y-4 py-2 flex flex-col items-center">
              {currentWf.nodes.map((node, i) => {
                const isTrigger = node.type === 'trigger'
                const isCondition = node.type === 'condition'

                return (
                  <React.Fragment key={node.id}>
                    {/* Node Card */}
                    <div
                      className={`w-full max-w-lg p-4 rounded-2xl border transition-all ${
                        isTrigger
                          ? 'bg-purple-50/60 border-purple-200 text-purple-950'
                          : isCondition
                          ? 'bg-amber-50/60 border-amber-200 text-amber-950'
                          : 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-1.5 border-b border-black/5">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            isTrigger
                              ? 'bg-purple-200 text-purple-900'
                              : isCondition
                              ? 'bg-amber-200 text-amber-900'
                              : 'bg-emerald-200 text-emerald-900'
                          }`}
                        >
                          Step {i + 1}: {node.type}
                        </span>
                        <Sliders className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-slate-700" />
                      </div>

                      <div className="mt-2 space-y-0.5">
                        <div className="font-bold text-xs text-slate-900">{node.title}</div>
                        <p className="text-[11px] text-slate-600">{node.description}</p>
                      </div>
                    </div>

                    {/* Connecting Connector Arrow */}
                    {i < currentWf.nodes.length - 1 && (
                      <div className="flex flex-col items-center py-1">
                        <div className="w-0.5 h-4 bg-slate-300" />
                        <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    )}
                  </React.Fragment>
                )
              })}
            </div>

            {/* Dry Run Simulation Output Console */}
            {simulationLogs.length > 0 && (
              <div className="mt-6 bg-slate-950 text-slate-100 rounded-2xl p-4 font-mono text-xs space-y-2 border border-slate-800 shadow-inner">
                <div className="flex items-center justify-between text-slate-400 text-[11px] pb-2 border-b border-slate-800">
                  <span>Simulation Execution Terminal</span>
                  <span>Test Event Trace #8942</span>
                </div>
                <div className="space-y-1 pt-1">
                  {simulationLogs.map((log, index) => (
                    <div key={index} className="text-emerald-400 leading-relaxed">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


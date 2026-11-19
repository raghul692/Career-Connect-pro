import React, { useState } from 'react'
import {
  Sparkles,
  Sliders,
  BarChart2
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const AiCreditsPage: React.FC = () => {
  const { aiScreeningUsage, updateAiBudgetCap } = useJobContext()
  const [budgetCap, setBudgetCap] = useState(aiScreeningUsage.hardBudgetCapInr)
  const [autoShutoff, setAutoShutoff] = useState(aiScreeningUsage.autoShutoffEnabled)

  const handleSaveGuardrail = (e: React.FormEvent) => {
    e.preventDefault()
    updateAiBudgetCap(budgetCap, autoShutoff)
  }

  const currentSpend = (aiScreeningUsage.usedCredits * aiScreeningUsage.costPerScanInr)
  const usagePercentage = Math.round((aiScreeningUsage.usedCredits / aiScreeningUsage.monthlyQuota) * 100)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Gemini 2.5 Flash Inference
            </span>
            <span className="text-xs text-slate-400">FinOps Metering</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            AI Screening Credits & Cost Guardrails
          </h1>
          <p className="text-xs text-slate-500">
            Monitor real-time token expenditure, resume parsing volume, and configure hard budget caps to eliminate AI billing surprises.
          </p>
        </div>
      </div>

      {/* Top Consumption Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Monthly Screening Scans</span>
            <span className="text-xs font-bold text-indigo-600 font-mono">{usagePercentage}% Used</span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {aiScreeningUsage.usedCredits.toLocaleString()} / {aiScreeningUsage.monthlyQuota.toLocaleString()}
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${usagePercentage}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400">
            {(aiScreeningUsage.monthlyQuota - aiScreeningUsage.usedCredits).toLocaleString()} credits remaining this billing cycle
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Incurred Model Spend</span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              ₹{aiScreeningUsage.costPerScanInr}/scan
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            ₹{currentSpend.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${(currentSpend / budgetCap) * 100}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400">
            Hard cap set at ₹{budgetCap.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Circuit Breaker</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              autoShutoff ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
            }`}>
              {autoShutoff ? 'Armed' : 'Disarmed'}
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {autoShutoff ? 'Auto-Shutoff On' : 'Uncapped Overage'}
          </div>
          <p className="text-[11px] text-slate-500 leading-tight">
            {autoShutoff
              ? 'Screening worker automatically halts once ₹' + budgetCap.toLocaleString() + ' is reached'
              : 'Warning: Automatic overages will be billed at regular rates'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-indigo-600" />
            Departmental Token Consumption
          </h3>

          <div className="space-y-3.5">
            {aiScreeningUsage.departments.map((dept, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{dept.name}</span>
                  <span className="font-mono font-bold text-slate-900">{dept.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-800 rounded-full"
                    style={{ width: `${dept.percentage}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400">
                  {dept.used.toLocaleString()} of {dept.allocated.toLocaleString()} scans utilized
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Guardrail Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-600" />
            Configure Monthly Cost Guardrail & Hard Cap
          </h3>

          <form onSubmit={handleSaveGuardrail} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Monthly Budget Threshold (INR)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                <input
                  type="number"
                  min={5000}
                  step={1000}
                  value={budgetCap}
                  onChange={(e) => setBudgetCap(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl font-mono font-bold focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Recommended for your {aiScreeningUsage.monthlyQuota} scan tier: ₹35,000 – ₹45,000 / month.
              </p>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/60">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-900">Enforce Hard Stop (Zero-Overage Guarantee)</span>
                <p className="text-[11px] text-slate-500">
                  When enabled, any candidate submission after reaching the threshold will be queued for manual recruiter review without calling the Gemini API.
                </p>
              </div>
              <input
                type="checkbox"
                checked={autoShutoff}
                onChange={(e) => setAutoShutoff(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              Update AI Guardrail Settings
            </button>
          </form>
        </div>
      </div>

      {/* Live AI Evaluation Stream */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="text-xs font-bold text-slate-700">Recent Candidate Resume Evaluations</div>
          <span className="text-[11px] text-slate-400">Model: Gemini 2.5 Flash (Latency: 280ms)</span>
        </div>

        <div className="divide-y divide-slate-100">
          {aiScreeningUsage.recentEvaluations.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between gap-4 text-xs">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900">{item.candidateName}</div>
                <div className="text-slate-500">{item.jobRole}</div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <div className="font-bold text-emerald-700">{item.matchScore}% Fit</div>
                  <div className="text-[10px] text-slate-400 font-mono">{item.tokensUsed} tokens</div>
                </div>
                <span className="text-[11px] text-slate-400">{item.evaluatedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


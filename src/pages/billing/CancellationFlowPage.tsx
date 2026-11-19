import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AlertTriangle, Gift
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const CancellationFlowPage: React.FC = () => {
  const { activeOrg, showNotification } = useJobContext()
  const [step, setStep] = useState<number>(1)
  const [reason, setReason] = useState('Hiring freeze / seasonality')
  const [feedback, setFeedback] = useState('')
  const navigate = useNavigate()

  const handleClaimDiscount = () => {
    showNotification('50% retention discount applied to your next 3 billing cycles!')
    navigate('/app')
  }

  const handlePauseSubscription = () => {
    showNotification('Workspace paused for 60 days. Your candidate data and NCAT scores are safely archived.')
    navigate('/app')
  }

  const handleFinalCancel = () => {
    showNotification('Subscription cancelled. Access will remain active until the end of the current billing period.')
    navigate('/app')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider mb-2">
          <AlertTriangle className="w-4 h-4" />
          Subscription Retention Management
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Cancel Subscription</h1>
        <p className="text-xs text-slate-500 mt-1">
          Managing plan for <strong>{activeOrg.name}</strong> ({activeOrg.plan} Tier)
        </p>
      </div>

      {/* Step 1: Reason Survey */}
      {step === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-slate-900">Why are you looking to cancel?</h3>
            <p className="text-xs text-slate-500">Your feedback helps our product engineering team prioritize improvements.</p>
          </div>

          <div className="space-y-2.5">
            {[
              'Hiring freeze / seasonality',
              'Too expensive for our current budget',
              'Missing specific ATS integration (e.g. BambooHR)',
              'Found alternative sourcing platform',
              'Temporary pause between campus batches'
            ].map((r) => (
              <label
                key={r}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border text-xs font-semibold cursor-pointer transition-all ${
                  reason === r ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="reason"
                  checked={reason === r}
                  onChange={() => setReason(r)}
                  className="w-4 h-4 text-indigo-600"
                />
                <span>{r}</span>
              </label>
            ))}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Any additional notes?</label>
            <textarea
              rows={2}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what we could have done better..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <Link to="/app" className="text-xs font-semibold text-slate-500 hover:text-slate-800">
              Never mind, keep subscription
            </Link>
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: What you lose + Retention Offer */}
      {step === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              What will happen upon cancellation:
            </div>
            <ul className="list-disc pl-5 space-y-1 text-amber-800">
              <li>Active job slots will be unlisted immediately from search feeds.</li>
              <li>Unused candidate resume unlock credits (840 credits) will expire.</li>
              <li>Webhook events and REST API keys will be deactivated.</li>
              <li>Team members will lose write access to candidate scorecards.</li>
            </ul>
          </div>

          {/* Retention Offer Box */}
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-200 space-y-4">
            <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-base">
              <Gift className="w-5 h-5 text-indigo-600" />
              Special Retention Offer Just for You
            </div>
            <p className="text-xs text-indigo-800 leading-relaxed">
              We'd hate to see your campus placement momentum stall. Claim <strong>50% OFF for the next 3 months</strong> or <strong>pause your subscription for 60 days</strong> at zero cost.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={handleClaimDiscount}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Claim 50% Discount (Save ₹24,999)
              </button>
              <button
                onClick={handlePauseSubscription}
                className="py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-indigo-200 transition-colors cursor-pointer"
              >
                Pause for 60 Days (Free)
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              ← Back
            </button>
            <button
              onClick={handleFinalCancel}
              className="text-xs font-bold text-red-600 hover:text-red-800 cursor-pointer"
            >
              Proceed with Final Cancellation
            </button>
          </div>
        </div>
      )}
    </div>
  )
}


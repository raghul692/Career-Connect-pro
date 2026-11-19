import React, { useState } from 'react'
import { ShieldCheck, Check, Settings2, X } from 'lucide-react'

export const CookieConsentModal: React.FC = () => {
  const [showBanner, setShowBanner] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return !localStorage.getItem('ccp_cookie_consent')
  })
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    analytics: true,
    marketing: false
  })

  const handleAcceptAll = () => {
    localStorage.setItem('ccp_cookie_consent', JSON.stringify({ essential: true, analytics: true, marketing: true }))
    setShowBanner(false)
    setShowPreferences(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem('ccp_cookie_consent', JSON.stringify(preferences))
    setShowBanner(false)
    setShowPreferences(false)
  }

  if (!showBanner) return null

  return (
    <>
      {/* Floating Bottom Banner */}
      <div className="fixed bottom-4 left-4 z-40 max-w-md w-full bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 space-y-4 animate-in fade-in slide-in-from-bottom-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
            Cookie & Privacy Preferences
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          We use strictly essential cookies for enterprise session security and opt-in analytics to measure hiring funnel performance. We never sell your personal or candidate data.
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleAcceptAll}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2 px-3 rounded-xl transition-colors cursor-pointer"
          >
            Accept All
          </button>
          <button
            onClick={() => setShowPreferences(true)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <Settings2 className="w-3.5 h-3.5" />
            Customize
          </button>
        </div>
      </div>

      {/* Preferences Detailed Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Custom Cookie Settings</h3>
                <p className="text-xs text-slate-500 mt-0.5">Manage which cookies you allow on Career Connect Pro</p>
              </div>
              <button
                onClick={() => setShowPreferences(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Essential */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    Essential Security Cookies
                    <span className="text-[10px] font-extrabold uppercase bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                      Required
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Necessary for user login, authentication sessions, CSRF protection, and workspace switching.
                  </p>
                </div>
                <input type="checkbox" checked disabled className="w-4 h-4 text-indigo-600 rounded mt-1" />
              </div>

              {/* Analytics */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-sm text-slate-900">Analytics & Performance</div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Helps us understand recruitment funnel conversion rates, ATS parser speed, and error telemetry.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded mt-1 cursor-pointer"
                />
              </div>

              {/* Marketing */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-sm text-slate-900">Marketing & Partner Referrals</div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Measures campus outreach campaign effectiveness and university partnership attribution.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded mt-1 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


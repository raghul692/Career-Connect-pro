import React, { useState, useEffect } from 'react'
import {
  X,
  Eye,
  Type,
  RotateCcw,
  Keyboard
} from 'lucide-react'

interface AccessibilityModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({ isOpen, onClose }) => {
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('ccp_a11y_high_contrast') === 'true'
  })
  const [fontSize, setFontSize] = useState<number>(() => {
    return Number(localStorage.getItem('ccp_a11y_font_size')) || 100
  })
  const [dyslexicFont, setDyslexicFont] = useState(() => {
    return localStorage.getItem('ccp_a11y_dyslexic') === 'true'
  })
  const [reduceMotion, setReduceMotion] = useState(() => {
    return localStorage.getItem('ccp_a11y_reduce_motion') === 'true'
  })
  const [focusIndicators, setFocusIndicators] = useState(() => {
    return localStorage.getItem('ccp_a11y_focus_rings') === 'true'
  })

  // Apply styles to document root
  useEffect(() => {
    const root = document.documentElement

    // Font size
    root.style.fontSize = `${fontSize}%`
    localStorage.setItem('ccp_a11y_font_size', fontSize.toString())

    // High contrast
    if (highContrast) {
      root.classList.add('a11y-high-contrast')
    } else {
      root.classList.remove('a11y-high-contrast')
    }
    localStorage.setItem('ccp_a11y_high_contrast', highContrast.toString())

    // Dyslexic font
    if (dyslexicFont) {
      root.classList.add('a11y-dyslexic-font')
    } else {
      root.classList.remove('a11y-dyslexic-font')
    }
    localStorage.setItem('ccp_a11y_dyslexic', dyslexicFont.toString())

    // Reduce motion
    if (reduceMotion) {
      root.classList.add('a11y-reduce-motion')
    } else {
      root.classList.remove('a11y-reduce-motion')
    }
    localStorage.setItem('ccp_a11y_reduce_motion', reduceMotion.toString())

    // Focus indicators
    if (focusIndicators) {
      root.classList.add('a11y-enhanced-focus')
    } else {
      root.classList.remove('a11y-enhanced-focus')
    }
    localStorage.setItem('ccp_a11y_focus_rings', focusIndicators.toString())
  }, [highContrast, fontSize, dyslexicFont, reduceMotion, focusIndicators])

  const handleResetDefaults = () => {
    setHighContrast(false)
    setFontSize(100)
    setDyslexicFont(false)
    setReduceMotion(false)
    setFocusIndicators(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="a11y-title"
        className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 id="a11y-title" className="text-lg font-bold text-slate-900">
                Accessibility Preferences
              </h2>
              <p className="text-xs text-slate-500">WCAG 2.2 AA compliant display adaptations</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close accessibility options"
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Text Size Scale */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <Type className="w-4 h-4 text-indigo-600" />
                Text Scaling
              </label>
              <span className="text-xs font-mono font-bold text-indigo-600">{fontSize}%</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Normal (100%)', val: 100 },
                { label: 'Large (115%)', val: 115 },
                { label: 'Extra (130%)', val: 130 }
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setFontSize(opt.val)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    fontSize === opt.val
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="space-y-3 pt-2">
            
            {/* High Contrast */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-900">High Contrast Mode</div>
                <div className="text-[11px] text-slate-500">Increases text contrast ratio to &gt; 7:1 (WCAG AAA)</div>
              </div>
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                className="w-5 h-5 accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Dyslexia Friendly */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-900">Dyslexia-Friendly Spacing</div>
                <div className="text-[11px] text-slate-500">Wider letter spacing and weighted bottom letterforms</div>
              </div>
              <input
                type="checkbox"
                checked={dyslexicFont}
                onChange={(e) => setDyslexicFont(e.target.checked)}
                className="w-5 h-5 accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Reduce Motion */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-900">Reduce Animations</div>
                <div className="text-[11px] text-slate-500">Disables hover bounces, sliding banners, and parallax</div>
              </div>
              <input
                type="checkbox"
                checked={reduceMotion}
                onChange={(e) => setReduceMotion(e.target.checked)}
                className="w-5 h-5 accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* High-Visibility Focus Rings */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-900">High-Visibility Focus Rings</div>
                <div className="text-[11px] text-slate-500">Thick contrast outline when navigating with Tab key</div>
              </div>
              <input
                type="checkbox"
                checked={focusIndicators}
                onChange={(e) => setFocusIndicators(e.target.checked)}
                className="w-5 h-5 accent-indigo-600 cursor-pointer"
              />
            </div>

          </div>

          {/* Keyboard Shortcuts Reference */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Keyboard className="w-3.5 h-3.5 text-indigo-600" />
              Keyboard Navigation Shortcuts
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-mono">
              <div><kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-bold">Alt + S</kbd> Search Jobs</div>
              <div><kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-bold">Alt + J</kbd> Job Listings</div>
              <div><kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-bold">Alt + C</kbd> Campus Hub</div>
              <div><kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-bold">Esc</kbd> Close Modals</div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Standard Defaults
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  )
}


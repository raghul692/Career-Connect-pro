import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FileCheck2,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ChevronRight,
  FileText,
  RotateCcw
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'

export const ResumeBuilderPage: React.FC = () => {
  const { userProfile, updateProfile, showNotification } = useJobContext()
  const [analyzing, setAnalyzing] = useState(false)
  const [_analyzed, setAnalyzed] = useState(true)
  const [resumeFile, setResumeFile] = useState<string>(userProfile.resumeName)
  const [atsScore, setAtsScore] = useState<number>(84)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setResumeFile(file.name)
      setAnalyzing(true)
      setAnalyzed(false)
      
      setTimeout(() => {
        setAnalyzing(false)
        setAnalyzed(true)
        const randomScore = Math.floor(Math.random() * 11) + 82 // 82 to 92
        setAtsScore(randomScore)
        updateProfile({ resumeName: file.name })
        showNotification(`ATS analysis complete for "${file.name}"! Score: ${randomScore}/100`)
      }, 1500)
    }
  }

  const triggerSampleTest = () => {
    setAnalyzing(true)
    setAnalyzed(false)
    setTimeout(() => {
      setAnalyzing(false)
      setAnalyzed(true)
      setAtsScore(88)
      showNotification('Diagnostic re-scan complete! Score: 88/100')
    }, 1200)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">AI ATS Resume Checker</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-emerald-300 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider">
            <FileCheck2 className="w-4 h-4" />
            Naukri FastForward &middot; ATS Scoring Model
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Free AI Resume Score & ATS Diagnostic
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            See your resume through the eyes of enterprise ATS parsers like Workday, Taleo, and Greenhouse. Discover missing keywords, formatting errors, and metric density gaps.
          </p>
        </div>
      </div>

      {/* Main Grid: Upload Dropzone + Detailed Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: UPLOAD DROPZONE */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <h3 className="font-bold text-base text-slate-900">Upload Your Resume</h3>

            <label className="border-2 border-dashed border-indigo-200 hover:border-indigo-500 bg-indigo-50/30 hover:bg-indigo-50/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all group block">
              <Upload className="w-10 h-10 text-indigo-500 group-hover:scale-110 transition-transform mb-3" />
              <div className="font-bold text-sm text-slate-800">Choose PDF file to scan</div>
              <div className="text-xs text-slate-400 mt-1">Supports PDF, DOCX (Max 5MB)</div>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleUpload}
                className="hidden"
              />
            </label>

            {/* Current Active File */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5 truncate">
                <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="font-bold text-slate-800 truncate">{resumeFile}</span>
              </div>
              <button
                onClick={triggerSampleTest}
                className="text-xs text-indigo-600 hover:underline font-semibold shrink-0 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Re-scan
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-500 border-t border-slate-100 pt-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Private: Never shared publicly</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Tested against Workday & Taleo algorithms</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT 2 COLS: DETAILED DIAGNOSTIC SCORECARD */}
        <div className="lg:col-span-2 space-y-6">
          
          {analyzing ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin mx-auto" />
              <h3 className="font-bold text-base text-slate-900">Running Deep ATS Parsing...</h3>
              <p className="text-xs text-slate-500">Checking section hierarchy, keyword density, and table safety...</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Score Header Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    ATS Compatibility Result
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Overall Pass Readiness: {atsScore >= 80 ? 'Excellent' : 'Needs Optimization'}
                  </h2>
                  <p className="text-xs text-slate-500 max-w-md">
                    Your resume has high machine readability and passes the preliminary screening filters for 85% of tech enterprise portals.
                  </p>
                </div>

                <div className="shrink-0 text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 to-emerald-500 text-white flex flex-col items-center justify-center shadow-lg shadow-indigo-100">
                    <span className="text-3xl font-black">{atsScore}</span>
                    <span className="text-[10px] uppercase font-bold opacity-80">/ 100</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 mt-2 block">Top 10% Tier</span>
                </div>
              </div>

              {/* 4-Category Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Metric 1 */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                    <span>Layout & Machine Parsing</span>
                    <span className="text-emerald-600">95% (Pass)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '95%' }} />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Single-column layout with clean standard headers: Education, Experience, Skills.
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                    <span>Key Skill Keywords Match</span>
                    <span className="text-indigo-600">78% (Good)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: '78%' }} />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Contains React, TypeScript, and Node.js. Missing: CI/CD, Docker, and Unit Testing.
                  </p>
                </div>

                {/* Metric 3 */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                    <span>Action Verbs & Impact Metrics</span>
                    <span className="text-amber-600">82% (Strong)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '82%' }} />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Found strong verbs: &quot;Engineered&quot;, &quot;Optimized&quot;, &quot;Implemented&quot;.
                  </p>
                </div>

                {/* Metric 4 */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                    <span>Contact & Portfolio Verification</span>
                    <span className="text-emerald-600">100% (Perfect)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    LinkedIn URL, GitHub repository link, phone number, and college email validated.
                  </p>
                </div>

              </div>

              {/* Actionable Recommendations to Reach 95%+ */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  Actionable Steps to Reach 95+ Score
                </h3>

                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-3 text-xs">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 block">Add 2-3 Missing Cloud & Tool Keywords</strong>
                      <span className="text-slate-500 leading-relaxed">
                        Top job descriptions for full-stack developers actively look for &quot;Docker&quot;, &quot;Jest&quot;, and &quot;REST APIs&quot;. Add these under your Skills matrix.
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 block">Quantify Project Outcomes</strong>
                      <span className="text-slate-500 leading-relaxed">
                        Specify numerical metrics in bullet points (e.g. &quot;increased test coverage to 85%&quot; or &quot;served 500+ active student users&quot;).
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Link
                    to="/jobs"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    <span>Apply to Jobs with this Resume</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  )
}


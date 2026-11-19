import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  Star
} from 'lucide-react'

const SAMPLE_TIMESTAMP = '2026-11-18T10:30:00.000Z'

export const ProductTourPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1)
  const [demoSkill, setDemoSkill] = useState('React')
  const [demoScore, setDemoScore] = useState(88)

  const steps = [
    { id: 1, title: '1. Sourcing & Filters', desc: 'Faceted search across 100k+ candidates' },
    { id: 2, title: '2. AI ATS Parser', desc: 'Workday & Taleo algorithm simulator' },
    { id: 3, title: '3. Team Collaboration', desc: 'Scorecards & recruiter notes' },
    { id: 4, title: '4. REST API & Webhooks', desc: 'Bi-directional ATS synchronization' }
  ]

  const mockCandidates = [
    { name: 'Karthik Subramanian', college: 'Anna University', score: 94, skills: ['React', 'TypeScript', 'Node.js'], exp: 'Fresher (2026 Batch)', status: 'Top 5%' },
    { name: 'Sneha Venkatesh', college: 'PSG College of Technology', score: 91, skills: ['React', 'Java', 'SQL'], exp: '1 Yr Exp', status: 'Shortlisted' },
    { name: 'Rahul Choudhury', college: 'NIT Trichy', score: 86, skills: ['React', 'Python', 'AWS'], exp: 'Fresher (2026 Batch)', status: 'Interview Ready' }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Tour Header Banner */}
      <section className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800 font-semibold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Zero-Login Sandbox
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Experience Career Connect Pro Live
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Test the recruiter workflow without creating an account or providing a credit card.
          </p>
        </div>
      </section>

      {/* Interactive Step Navigator */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pb-8">
          {steps.map((st) => (
            <button
              key={st.id}
              onClick={() => setActiveStep(st.id)}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                activeStep === st.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="font-bold text-xs sm:text-sm">{st.title}</div>
              <div className={`text-[11px] mt-0.5 ${activeStep === st.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                {st.desc}
              </div>
            </button>
          ))}
        </div>

        {/* Live Interactive Sandbox Panel */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Top Panel Control Bar */}
          <div className="bg-slate-900 text-white p-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline">
                sandbox.careerconnectpro.com/demo-session
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-amber-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Live Demo Mode
              </span>
              <Link
                to="/register"
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* Interactive Screen 1: Candidate Sourcing */}
          {activeStep === 1 && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Candidate Talent Search</h3>
                  <p className="text-xs text-slate-500">Filter students by college, NCAT percentile, and technical skills</p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs text-slate-500 font-medium">Filter Skill:</span>
                  {['React', 'TypeScript', 'Java', 'Python'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setDemoSkill(s)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        demoSkill === s ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Candidate Cards Table */}
              <div className="divide-y divide-slate-100">
                {mockCandidates.map((cand, i) => (
                  <div key={i} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
                        {cand.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">{cand.name}</div>
                        <div className="text-xs text-slate-500">{cand.college} · {cand.exp}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {cand.skills.map((sk, idx) => (
                        <span
                          key={idx}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            sk === demoSkill ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {sk}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                        NCAT Score: {cand.score}/100
                      </span>
                      <button className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 cursor-pointer">
                        View Dossier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Screen 2: AI ATS Parser */}
          {activeStep === 2 && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Workday & Taleo Parser Simulator</h3>
                <p className="text-xs text-slate-500">Test how candidate resumes score against target enterprise job descriptions</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Candidate Resume Preview</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs font-mono space-y-2 text-slate-700">
                    <p className="font-bold text-slate-900">Karthik Subramanian — B.Tech CSE (8.7 CGPA)</p>
                    <p>• Engineered full-stack web platforms using React 19, TypeScript, and Node.js.</p>
                    <p>• Integrated PostgreSQL database schemas with indexed queries reducing p95 latency.</p>
                    <p>• Automated continuous integration and deployment with GitHub Actions.</p>
                  </div>
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Parser Score</span>
                    <span className="text-xl font-extrabold text-indigo-700">{demoScore} / 100</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Keywords Match (React, TypeScript, SQL)</span>
                      <span className="font-bold text-emerald-600">92%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[92%]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Metric Density & Quantified Outcomes</span>
                      <span className="font-bold text-indigo-600">84%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full w-[84%]" />
                    </div>
                  </div>

                  <button
                    onClick={() => setDemoScore(demoScore === 88 ? 96 : 88)}
                    className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Simulate Adding Docker & Jest Keywords →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Screen 3: Team Collaboration */}
          {activeStep === 3 && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Recruiter Scorecards & Interview Sync</h3>
                <p className="text-xs text-slate-500">Collaborative scorecards shared with hiring managers in real time</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=faces"
                    alt="Priya"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">Priya Narayanan (VP Talent)</span>
                      <span className="text-xs text-slate-400">10 mins ago</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      "Karthik demonstrated clear problem-solving in the NCAT assessment (94th percentile). Recommended for technical round with frontend team lead."
                    </p>
                    <div className="flex items-center gap-1 text-amber-500 pt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                      <span className="text-xs font-bold text-slate-700 ml-1">5.0 / 5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Screen 4: REST API & Webhooks */}
          {activeStep === 4 && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Bi-directional Webhook Dispatcher</h3>
                <p className="text-xs text-slate-500">Instant JSON payloads pushed directly into your enterprise stack</p>
              </div>

              <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs space-y-2 overflow-x-auto">
                <div className="text-emerald-400">// POST https://api.techmahindra.com/webhooks/campus-hires (200 OK)</div>
                <pre className="text-slate-300">
{`{
  "event": "candidate.shortlisted",
  "candidate": {
    "name": "Karthik Subramanian",
    "email": "karthik.subramanian@college.edu",
    "ncat_score": 94,
    "target_role": "Graduate Trainee Engineer"
  },
  "organization_id": "org-techm",
  "timestamp": "${SAMPLE_TIMESTAMP}"
}`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* CTA Footer */}
        <div className="text-center pt-10 space-y-4">
          <h4 className="font-bold text-lg text-slate-900">Ready to deploy Career Connect Pro for your hiring team?</h4>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/register"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              Start Free 14-Day Trial
            </Link>
            <Link
              to="/contact-sales"
              className="px-6 py-3 bg-white text-slate-700 font-bold text-sm rounded-xl border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
            >
              Schedule Live Enterprise Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Plus,
  Trash2
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const OnboardingWizardPage: React.FC = () => {
  const { userProfile, updateProfile, activeOrg, showNotification } = useJobContext()
  const [step, setStep] = useState<number>(1)
  const navigate = useNavigate()

  // Step 1: Profile
  const [name, setName] = useState(userProfile.name)
  const [title, setTitle] = useState(userProfile.headline)

  // Step 2: Org
  const [orgName, setOrgName] = useState(activeOrg.name)
  const [industry, setIndustry] = useState('Technology & Software')
  const [headcount, setHeadcount] = useState('50-200')

  // Step 3: Team invites
  const [inviteEmails, setInviteEmails] = useState<string[]>(['priya.n@company.com'])
  const [newEmail, setNewEmail] = useState('')

  // Step 4: Primary Goal
  const [selectedGoal, setSelectedGoal] = useState('Campus Fresher Recruitment (2025/2026 Batch)')

  const goals = [
    { title: 'Campus Fresher Recruitment (2025/2026 Batch)', desc: 'Pre-screened engineering graduates with verified NCAT scores' },
    { title: 'Lateral Tech & SDE Hiring', desc: '1-5 years experienced developers in React, Java, Cloud, and AI' },
    { title: 'National Hackathons & Challenges', desc: 'Host high-stakes coding competitions to attract top 1% engineers' },
    { title: 'ATS Integration & FastForward Tools', desc: 'Sync candidate pipelines directly with Workday or Greenhouse' }
  ]

  const handleAddEmail = () => {
    if (newEmail && !inviteEmails.includes(newEmail)) {
      setInviteEmails([...inviteEmails, newEmail])
      setNewEmail('')
    }
  }

  const handleRemoveEmail = (email: string) => {
    setInviteEmails(inviteEmails.filter((e) => e !== email))
  }

  const handleComplete = () => {
    updateProfile({ name, headline: title })
    showNotification('Workspace onboarding complete! Welcome to your executive dashboard.')
    navigate('/app')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Step Progress Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-sm">
              C
            </div>
            <div>
              <div className="font-bold text-sm">Career Connect Pro Onboarding</div>
              <div className="text-[11px] text-slate-400">Step {step} of 4</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-7 h-1.5 rounded-full transition-all ${
                  step >= s ? 'bg-indigo-500' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 sm:p-10 space-y-6">
          {/* STEP 1: Profile Setup */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Step 1: Set Up Your Profile</h2>
                <p className="text-xs text-slate-500">Your profile is visible to team members and candidates in scorecards.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Role / Job Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Lead Campus Recruiter / VP of Engineering"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Organization Creation */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Step 2: Organization Details</h2>
                <p className="text-xs text-slate-500">Configure your primary company workspace and tenant settings.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Organization Name *</label>
                  <input
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Industry</label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                    >
                      <option>Technology & Software</option>
                      <option>Fintech & BFSI</option>
                      <option>E-Commerce & Retail</option>
                      <option>Healthcare & Biotech</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Company Size</label>
                    <select
                      value={headcount}
                      onChange={(e) => setHeadcount(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                    >
                      <option>1 - 50 employees</option>
                      <option>50 - 200 employees</option>
                      <option>200 - 1,000 employees</option>
                      <option>1,000+ employees</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Invite Team */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Step 3: Invite Your Hiring Team</h2>
                <p className="text-xs text-slate-500">Collaborate with recruiters, hiring managers, and interviewers.</p>
              </div>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="teammate@company.com"
                    className="flex-1 text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                  />
                  <button
                    type="button"
                    onClick={handleAddEmail}
                    className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>

                <div className="space-y-2 pt-2">
                  {inviteEmails.map((em, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                      <span className="font-medium text-slate-700">{em}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveEmail(em)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Select Primary Goal */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Step 4: What is your primary hiring priority?</h2>
                <p className="text-xs text-slate-500">We'll customize your dashboard widgets and notifications accordingly.</p>
              </div>

              <div className="space-y-3">
                {goals.map((g, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedGoal(g.title)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      selectedGoal === g.title
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900">{g.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{g.desc}</div>
                    </div>
                    {selectedGoal === g.title && (
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                Continue
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleComplete}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Launch Workspace Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


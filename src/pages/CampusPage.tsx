import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  GraduationCap,
  Trophy,
  BookOpen,
  Video,
  CheckCircle2,
  Calendar,
  Users,
  Award,
  Clock,
  ChevronRight
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'

interface CampusPageProps {
  initialTab?: 'contests' | 'tests' | 'webinars'
}

export const CampusPage: React.FC<CampusPageProps> = ({ initialTab = 'contests' }) => {
  const { contests, showNotification } = useJobContext()
  const [activeTab, setActiveTab] = useState<'contests' | 'tests' | 'webinars'>(initialTab)

  // Interactive NCAT Mock Test State
  const [testStarted, setTestStarted] = useState(false)
  const [testScore, setTestScore] = useState<number | null>(null)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})

  const mockQuestions = [
    {
      q: 'A train 180 meters long is running at 54 km/hr. How much time (in seconds) will it take to cross an electric pole?',
      options: ['10 seconds', '12 seconds', '15 seconds', '18 seconds'],
      correct: 1 // 12 seconds: 54 * (5/18) = 15 m/s. 180 / 15 = 12s
    },
    {
      q: 'Which of the following data structures is optimal for implementing an LRU (Least Recently Used) cache?',
      options: ['Array + Stack', 'Doubly Linked List + HashMap', 'Binary Search Tree', 'Queue only'],
      correct: 1 // DLL + HashMap
    },
    {
      q: 'If all Zips are Zaps, and some Zaps are Zops, which of the following is necessarily true?',
      options: ['All Zips are Zops', 'Some Zips may be Zops', 'No Zips are Zops', 'All Zops are Zips'],
      correct: 1 // Some Zips may be Zops
    }
  ]

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))
  }

  const handleFinishTest = () => {
    let score = 0
    mockQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        score += 1
      }
    })
    const percentage = Math.round((score / mockQuestions.length) * 100)
    setTestScore(percentage)
    showNotification(`Diagnostic Test Completed! You scored ${percentage}% (92nd percentile)`)
  }

  const handleRegisterContest = (contestTitle: string) => {
    showNotification(`Successfully enrolled in "${contestTitle}"! Check your email for contest access tokens.`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">Campus & Freshers Hub</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-gradient-to-tr from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-amber-300 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            Naukri Campus Model &middot; Class of 2025 / 2026
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Launch Your Tech Career Before Graduation
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Take national aptitude assessments, enter high-stakes coding hackathons, attend masterclasses from senior architects, and land direct campus placement interviews.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('tests')}
              className="bg-white text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-slate-100 transition-all text-xs sm:text-sm cursor-pointer shadow-md"
            >
              Take Free NCAT Aptitude Test
            </button>
            <button
              onClick={() => setActiveTab('contests')}
              className="bg-indigo-600/60 hover:bg-indigo-600 border border-indigo-400/40 text-white font-bold px-6 py-3 rounded-xl transition-all text-xs sm:text-sm cursor-pointer"
            >
              View Active Hackathons &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'contests', label: 'Contests & Hackathons', icon: Trophy },
          { id: 'tests', label: 'NCAT Aptitude Center', icon: BookOpen },
          { id: 'webinars', label: 'Masterclasses & Webinars', icon: Video }
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'contests' | 'tests' | 'webinars')}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* TAB 1: CONTESTS & HACKATHONS */}
      {activeTab === 'contests' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">National Contests & Hiring Challenges</h2>
              <p className="text-xs text-slate-500 mt-0.5">Top performers receive direct interview calls and cash rewards</p>
            </div>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              {contests.length} Challenges Live
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contests.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 flex flex-col justify-between hover:shadow-lg hover:border-indigo-300 transition-all group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <img
                      src={c.logo}
                      alt={c.organizer}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                    />
                    <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {c.type}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {c.title}
                  </h3>
                  <div className="text-xs text-slate-500 mt-1 font-medium">{c.organizer}</div>

                  {/* Prize Badge */}
                  <div className="mt-4 p-3 bg-amber-50/80 rounded-xl border border-amber-200/70 text-xs">
                    <div className="text-[10px] text-amber-700 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5 text-amber-600" />
                      Grand Prize & Offers
                    </div>
                    <div className="font-extrabold text-amber-950 mt-0.5">{c.prize}</div>
                  </div>

                  {/* Meta stats */}
                  <div className="space-y-1.5 mt-4 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Registration Closes: <strong>{c.entryDeadline}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{c.enrolledCount.toLocaleString()} Students Enrolled</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {c.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleRegisterContest(c.title)}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Register for Free
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: NCAT APTITUDE CENTER */}
      {activeTab === 'tests' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 mb-1">
                <Award className="w-4 h-4" />
                NCAT Official Practice Assessment
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                National Career Aptitude Diagnostic Test
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Evaluates Quantitative Aptitude, Logical Reasoning, and Core Data Structures.
              </p>
            </div>

            {testScore !== null ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
                <div className="text-xs font-bold text-emerald-800">Your Diagnostic Score</div>
                <div className="text-3xl font-black text-emerald-600 mt-1">{testScore}%</div>
                <div className="text-[10px] text-emerald-700 font-medium">92nd Percentile</div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Format: 3 Questions &middot; Instant Score &middot; Free</span>
              </div>
            )}
          </div>

          {!testStarted && testScore === null ? (
            <div className="text-center py-10 space-y-4 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Ready to test your placement readiness?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Over 250+ enterprise recruiters use NCAT scores to shortlist freshers for technical interview rounds without GPA filtering.
              </p>
              <button
                onClick={() => setTestStarted(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm px-8 py-3 rounded-xl shadow-md shadow-indigo-100 transition-all cursor-pointer"
              >
                Start Diagnostic Test Now &rarr;
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {mockQuestions.map((q, idx) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                  <div className="font-bold text-xs text-indigo-600 uppercase tracking-wider">
                    Question {idx + 1} of {mockQuestions.length}
                  </div>
                  <h4 className="font-semibold text-sm text-slate-900 leading-relaxed">{q.q}</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[idx] === optIdx
                      const isCorrect = testScore !== null && optIdx === q.correct
                      return (
                        <button
                          key={optIdx}
                          disabled={testScore !== null}
                          onClick={() => handleSelectOption(idx, optIdx)}
                          className={`p-3 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300'
                          } ${isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold' : ''}`}
                        >
                          <span>{opt}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}

              {testScore === null ? (
                <div className="text-right pt-2">
                  <button
                    onClick={handleFinishTest}
                    disabled={Object.keys(selectedAnswers).length < mockQuestions.length}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm px-8 py-3 rounded-xl shadow-md transition-all disabled:opacity-40 cursor-pointer"
                  >
                    Submit Test & View Results
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold text-sm text-emerald-950">Official Certificate Verified</div>
                      <div className="text-xs text-emerald-700">Score added to your candidate profile for campus recruiter visibility.</div>
                    </div>
                  </div>
                  <Link
                    to="/jobs/freshers"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all shrink-0"
                  >
                    View Matching 0-Exp Jobs &rarr;
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MASTERCLASSES & WEBINARS */}
      {activeTab === 'webinars' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Live Campus Masterclasses</h2>
            <span className="text-xs text-slate-500 font-medium">Free interactive video streams</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'System Design Fundamentals for SDE-1 Campus Drives',
                speaker: 'Aditya Verma',
                role: 'Staff Architect @ Amazon',
                date: '08 Nov 2026, 6:30 PM IST',
                enrolled: 1840,
                topics: ['Load Balancers', 'Database Sharding', 'Microservices Basics']
              },
              {
                title: 'How to Crack Frontend Engineering Rounds at Unicorns',
                speaker: 'Sneha Patel',
                role: 'Lead UI Engineer @ Swiggy',
                date: '12 Nov 2026, 7:00 PM IST',
                enrolled: 2150,
                topics: ['React 19 internals', 'State Management', 'Web Performance']
              }
            ].map((web, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 hover:shadow-md transition-all">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-rose-50 text-rose-700 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-rose-200">
                    <Video className="w-3 h-3 text-rose-600" />
                    Upcoming Live Stream
                  </span>
                  <span className="text-slate-500 font-medium">{web.enrolled}+ Registered</span>
                </div>

                <h3 className="font-bold text-base text-slate-900">{web.title}</h3>
                
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center">
                    {web.speaker[0]}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{web.speaker}</div>
                    <div className="text-slate-500 text-[11px]">{web.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{web.date}</span>
                </div>

                <button
                  onClick={() => showNotification(`Registered for webinar: "${web.title}"! Calendar invite sent.`)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Reserve Free Seat
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}


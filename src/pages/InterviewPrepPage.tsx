import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  HelpCircle,
  Search,
  ThumbsUp,
  ChevronRight,
  ChevronDown,
  CheckCircle2
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'

export const InterviewPrepPage: React.FC = () => {
  const { questions, showNotification } = useJobContext()
  const [selectedCompany, setSelectedCompany] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [expandedIds, setExpandedIds] = useState<string[]>(['q-1'])
  const [upvotes, setUpvotes] = useState<Record<string, number>>({})

  const companiesList = ['Amazon', 'Google', 'Tech Mahindra', 'Infosys']
  const categoriesList = ['Coding', 'System Design', 'Aptitude', 'HR / Behavioral']

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleUpvote = (id: string, initialVotes: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setUpvotes((prev) => {
      const current = prev[id] || initialVotes
      const next = current + 1
      showNotification('Helpful upvote recorded! Thank you for contributing to the community.')
      return { ...prev, [id]: next }
    })
  }

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (search.trim()) {
        const query = search.toLowerCase()
        const matchesQ = q.question.toLowerCase().includes(query)
        const matchesCompany = q.company.toLowerCase().includes(query)
        const matchesRole = q.role.toLowerCase().includes(query)
        if (!matchesQ && !matchesCompany && !matchesRole) return false
      }
      if (selectedCompany !== 'all' && q.company !== selectedCompany) return false
      if (selectedCategory !== 'all' && q.category !== selectedCategory) return false
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false
      return true
    })
  }, [questions, search, selectedCompany, selectedCategory, selectedDifficulty])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">Interview Preparation Bank</span>
      </nav>

      {/* Hero Banner */}
      <div className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-amber-300 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            Naukri &middot; AmbitionBox Model
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Interview Questions & Solution Guide
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Real, recently asked technical and behavioral questions from campus placements and off-campus drives at Amazon, Google, Infosys, and Tech Mahindra.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row items-center gap-3">
          
          <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 w-full">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search interview questions by keyword, role, or concept..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs text-slate-800 focus:outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
            >
              <option value="all">All Companies</option>
              {companiesList.map((comp) => (
                <option key={comp} value={comp}>{comp}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const isExpanded = expandedIds.includes(q.id)
          const currentVotes = upvotes[q.id] || q.votes

          return (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:border-indigo-300 transition-all shadow-xs"
            >
              <div
                onClick={() => toggleExpand(q.id)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <img
                      src={q.logo}
                      alt={q.company}
                      className="w-5 h-5 rounded object-cover border border-slate-200"
                    />
                    <span className="font-bold text-slate-800">{q.company}</span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="text-slate-600 font-medium">{q.role}</span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">
                      {q.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      q.difficulty === 'Easy'
                        ? 'bg-emerald-50 text-emerald-700'
                        : q.difficulty === 'Medium'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 leading-snug">
                    {q.question}
                  </h3>

                  <div className="text-[11px] text-slate-400">
                    Asked in {q.timesAsked}+ verified campus interview rounds
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                  <button
                    onClick={(e) => handleUpvote(q.id, q.votes, e)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                    title="Upvote helpful answer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-slate-500" />
                    <span>{currentVotes}</span>
                  </button>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-indigo-600' : ''}`}
                  />
                </div>
              </div>

              {/* Collapsible Solution Section */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-3">
                  <div className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Recommended Architectural Answer & Explanation:
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                    {q.answerSnippet}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Reviewed by Senior Technical Interview Panel</span>
                    <button
                      onClick={() => showNotification('Feedback recorded! Thank you.')}
                      className="text-indigo-600 hover:underline font-semibold"
                    >
                      Report issue or request alternate approach
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}


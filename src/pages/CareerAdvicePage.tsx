import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  BookOpen,
  Clock,
  ChevronRight,
  ArrowRight,
  Search
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'

export const CareerAdvicePage: React.FC = () => {
  const { articles } = useJobContext()
  const [selectedCat, setSelectedCat] = useState<string>('all')
  const [search, setSearch] = useState('')

  const categories = ['Placement Strategy', 'Resume & Career', 'Salary & Compensation']

  const filtered = articles.filter((art) => {
    if (search.trim()) {
      const q = search.toLowerCase()
      if (!art.title.toLowerCase().includes(q) && !art.summary.toLowerCase().includes(q)) return false
    }
    if (selectedCat !== 'all' && art.category !== selectedCat) return false
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">Career Advice & Guides</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-amber-300 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            Naukri Career Blog &middot; Campus Placement Series
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Career Guidance & Placement Playbooks
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Written by senior tech leads, recruiters, and placement officers to help Indian students navigate campus hiring and career transitions.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 w-full sm:w-96 text-xs">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search articles & roadmaps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-slate-800 focus:outline-none bg-transparent"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCat === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Guides
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCat === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((art) => (
          <Link
            key={art.id}
            to={`/career-advice/${art.id}`}
            className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden hover:shadow-lg hover:border-indigo-300 transition-all flex flex-col justify-between p-6 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="bg-indigo-50 text-indigo-700 font-bold px-2.5 py-1 rounded-full text-[10px]">
                  {art.category}
                </span>
                <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3" />
                  {art.readTime}
                </span>
              </div>

              <h2 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                {art.title}
              </h2>

              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                {art.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {art.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={art.avatar}
                  alt={art.author}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-xs font-semibold text-slate-700">{art.author}</span>
              </div>
              <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Guide &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}


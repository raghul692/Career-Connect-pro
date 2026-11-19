import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home, Briefcase, Building2, Map } from 'lucide-react'

export const NotFoundPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      navigate('/jobs')
    }
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-14 shadow-lg max-w-lg w-full text-center space-y-6">
        
        <div className="w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-3xl mx-auto shadow-xs">
          404
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl font-black text-slate-900">Page Not Found</h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            The page you are looking for may have been moved, renamed, or temporarily unavailable.
          </p>
        </div>

        {/* Quick Search */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search jobs instead (e.g. React, Freshers)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Navigation Quick Links */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2 text-xs">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-semibold"
          >
            <Home className="w-3.5 h-3.5 text-indigo-600" />
            Home
          </Link>
          <Link
            to="/jobs"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-semibold"
          >
            <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
            All Jobs
          </Link>
          <Link
            to="/companies"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-semibold"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            Companies
          </Link>
          <Link
            to="/sitemap"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-semibold"
          >
            <Map className="w-3.5 h-3.5 text-amber-600" />
            Sitemap
          </Link>
        </div>

      </div>
    </div>
  )
}


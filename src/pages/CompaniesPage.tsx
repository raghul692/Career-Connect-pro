import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  Search,
  ChevronRight,
  Sparkles,
  Users,
  CheckCircle2
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'
import { CompanyCard } from '../components/common/CompanyCard'
import { CompanyType } from '../types'

export const CompaniesPage: React.FC = () => {
  const { companies } = useJobContext()
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')

  const companyCategories = [
    { id: 'all', label: 'All Companies', count: companies.length },
    { id: 'mnc', label: 'MNCs', count: companies.filter((c) => c.type.includes('MNC')).length },
    { id: 'product', label: 'Product & SaaS', count: companies.filter((c) => c.type === 'Product' || c.industry.toLowerCase().includes('saas') || c.industry.toLowerCase().includes('software')).length },
    { id: 'unicorn', label: 'Unicorns', count: companies.filter((c) => c.type === 'Unicorn').length },
    { id: 'startup', label: 'Startups', count: companies.filter((c) => c.type === 'Startup').length },
    { id: 'fintech', label: 'Banking & FinTech', count: companies.filter((c) => c.industry.toLowerCase().includes('fintech') || c.industry.toLowerCase().includes('bank')).length }
  ]

  const filteredCompanies = useMemo(() => {
    return companies.filter((comp) => {
      if (search.trim()) {
        const query = search.toLowerCase()
        const matchesName = comp.name.toLowerCase().includes(query)
        const matchesIndustry = comp.industry.toLowerCase().includes(query)
        if (!matchesName && !matchesIndustry) return false
      }
      if (selectedType === 'mnc') {
        return comp.type.includes('MNC')
      }
      if (selectedType === 'product') {
        return comp.type === 'Product' || comp.industry.toLowerCase().includes('saas') || comp.industry.toLowerCase().includes('software')
      }
      if (selectedType === 'unicorn') {
        return comp.type === 'Unicorn'
      }
      if (selectedType === 'startup') {
        return comp.type === 'Startup'
      }
      if (selectedType === 'fintech') {
        return comp.industry.toLowerCase().includes('fintech') || comp.industry.toLowerCase().includes('bank')
      }
      return true
    })
  }, [companies, search, selectedType])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">Top Companies</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-amber-300" />
            Verified Enterprise Employers
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Discover Top Companies Hiring in India
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Read verified employee reviews, compare salary compensation benchmarks, and apply directly to verified open positions at global MNCs and unicorns.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 w-full">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search companies by name or industry (e.g. Persistent, FinTech, Tech Mahindra)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs sm:text-sm text-slate-800 focus:outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {companyCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedType(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  selectedType === cat.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] ${selectedType === cat.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                  ({cat.count})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredCompanies.map((comp) => (
          <CompanyCard key={comp.id} company={comp} />
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">No companies match &quot;{search}&quot;</h3>
          <p className="text-xs text-slate-500 mt-1">Try clearing your search query or choosing another company type.</p>
        </div>
      )}

    </div>
  )
}


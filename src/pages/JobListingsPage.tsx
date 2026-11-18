import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  SlidersHorizontal,
  RotateCcw,
  Search,
  MapPin,
  ChevronRight,
  BellRing,
  Sparkles,
  Inbox
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'
import { JobCard } from '../components/common/JobCard'
import { WorkMode, CompanyType } from '../types'

interface JobListingsPageProps {
  specialFilter?: 'remote' | 'freshers' | 'internships' | 'walk-in'
}

export const JobListingsPage: React.FC<JobListingsPageProps> = ({ specialFilter }) => {
  const { jobs, filters, setFilters, resetFilters } = useJobContext()

  // Dynamic count calculators matching Naukri faceted search
  const counts = useMemo(() => {
    return {
      exp: {
        all: jobs.length,
        fresher: jobs.filter((j) => j.minExp === 0).length,
        '1-2': jobs.filter((j) => j.minExp <= 2 && j.maxExp >= 1).length,
        '3-5': jobs.filter((j) => j.minExp <= 5 && j.maxExp >= 3).length,
        '5+': jobs.filter((j) => j.maxExp >= 5).length
      },
      workMode: {
        Remote: jobs.filter((j) => j.workMode === 'Remote').length,
        Hybrid: jobs.filter((j) => j.workMode === 'Hybrid').length,
        'Work from office': jobs.filter((j) => j.workMode === 'Work from office').length
      },
      salary: {
        '0-3 LPA': jobs.filter((j) => j.minSalaryLakhs <= 3).length,
        '3-6 LPA': jobs.filter((j) => j.minSalaryLakhs <= 6 && j.maxSalaryLakhs >= 3).length,
        '6-10 LPA': jobs.filter((j) => j.minSalaryLakhs <= 10 && j.maxSalaryLakhs >= 6).length,
        '10-15 LPA': jobs.filter((j) => j.minSalaryLakhs <= 15 && j.maxSalaryLakhs >= 10).length,
        '15+ LPA': jobs.filter((j) => j.maxSalaryLakhs >= 15).length
      },
      dept: {
        'Software & QA': jobs.filter((j) => j.department === 'Software & QA').length,
        'Hardware & Networks': jobs.filter((j) => j.department === 'Hardware & Networks').length,
        'IT & Information Security': jobs.filter((j) => j.department === 'IT & Information Security').length,
        'Analytics & Data Science': jobs.filter((j) => j.department === 'Analytics & Data Science').length
      },
      companyType: {
        'Indian MNC': jobs.filter((j) => j.companyType === 'Indian MNC').length,
        'Foreign MNC': jobs.filter((j) => j.companyType === 'Foreign MNC').length,
        'Startup': jobs.filter((j) => j.companyType === 'Startup').length,
        'Unicorn': jobs.filter((j) => j.companyType === 'Unicorn').length,
        'Product': jobs.filter((j) => j.companyType === 'Product').length
      }
    }
  }, [jobs])

  // Filter options definitions
  const departments = ['Software & QA', 'Hardware & Networks', 'IT & Information Security', 'Analytics & Data Science']
  const workModes: WorkMode[] = ['Remote', 'Hybrid', 'Work from office']
  const companyTypes: CompanyType[] = ['Indian MNC', 'Foreign MNC', 'Startup', 'Unicorn', 'Product']
  const salaryRanges = ['0-3 LPA', '3-6 LPA', '6-10 LPA', '10-15 LPA', '15+ LPA']

  // Handle department toggle
  const toggleDepartment = (dept: string) => {
    setFilters((prev) => ({
      ...prev,
      department: prev.department.includes(dept)
        ? prev.department.filter((d) => d !== dept)
        : [...prev.department, dept]
    }))
  }

  // Handle workMode toggle
  const toggleWorkMode = (mode: WorkMode) => {
    setFilters((prev) => ({
      ...prev,
      workMode: prev.workMode.includes(mode)
        ? prev.workMode.filter((m) => m !== mode)
        : [...prev.workMode, mode]
    }))
  }

  // Handle companyType toggle
  const toggleCompanyType = (type: CompanyType) => {
    setFilters((prev) => ({
      ...prev,
      companyTypes: prev.companyTypes.includes(type)
        ? prev.companyTypes.filter((t) => t !== type)
        : [...prev.companyTypes, type]
    }))
  }

  // Handle salary toggle
  const toggleSalaryRange = (range: string) => {
    setFilters((prev) => ({
      ...prev,
      salaryRanges: prev.salaryRanges.includes(range)
        ? prev.salaryRanges.filter((r) => r !== range)
        : [...prev.salaryRanges, range]
    }))
  }

  // Compute filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Handle special page routes
      if (specialFilter === 'remote' && job.workMode !== 'Remote') return false
      if (specialFilter === 'freshers' && job.minExp > 0) return false
      if (specialFilter === 'internships' && !job.title.toLowerCase().includes('trainee') && !job.title.toLowerCase().includes('intern')) return false

      // Keyword search
      if (filters.keyword.trim()) {
        const query = filters.keyword.toLowerCase()
        const matchesTitle = job.title.toLowerCase().includes(query)
        const matchesCompany = job.company.toLowerCase().includes(query)
        const matchesSkill = job.mandatorySkills.some((s) => s.toLowerCase().includes(query))
        const matchesDesc = job.description.toLowerCase().includes(query)
        if (!matchesTitle && !matchesCompany && !matchesSkill && !matchesDesc) return false
      }

      // Location search
      if (filters.location.trim()) {
        const locQuery = filters.location.toLowerCase()
        if (!job.location.toLowerCase().includes(locQuery)) return false
      }

      // Experience filter
      if (filters.experience === 'fresher' && job.minExp > 0) return false
      if (filters.experience === '1-2' && (job.minExp > 2 || job.maxExp < 1)) return false
      if (filters.experience === '3-5' && (job.minExp > 5 || job.maxExp < 3)) return false
      if (filters.experience === '5+' && job.maxExp < 5) return false

      // Department filter
      if (filters.department.length > 0 && !filters.department.includes(job.department)) {
        return false
      }

      // Work Mode filter
      if (filters.workMode.length > 0 && !filters.workMode.includes(job.workMode)) {
        return false
      }

      // Company Type filter
      if (filters.companyTypes.length > 0 && !filters.companyTypes.includes(job.companyType)) {
        return false
      }

      // Salary Filter
      if (filters.salaryRanges.length > 0) {
        const matchesAnySalary = filters.salaryRanges.some((range) => {
          if (range === '0-3 LPA' && job.minSalaryLakhs <= 3) return true
          if (range === '3-6 LPA' && job.minSalaryLakhs <= 6 && job.maxSalaryLakhs >= 3) return true
          if (range === '6-10 LPA' && job.minSalaryLakhs <= 10 && job.maxSalaryLakhs >= 6) return true
          if (range === '10-15 LPA' && job.minSalaryLakhs <= 15 && job.maxSalaryLakhs >= 10) return true
          if (range === '15+ LPA' && job.maxSalaryLakhs >= 15) return true
          return false
        })
        if (!matchesAnySalary) return false
      }

      return true
    }).sort((a, b) => {
      if (filters.sortBy === 'newest') return a.postedDaysAgo - b.postedDaysAgo
      if (filters.sortBy === 'salary-high') return b.maxSalaryLakhs - a.maxSalaryLakhs
      return 0
    })
  }, [jobs, filters, specialFilter])

  const hasActiveFilters =
    filters.keyword ||
    filters.location ||
    filters.experience !== 'all' ||
    filters.department.length > 0 ||
    filters.workMode.length > 0 ||
    filters.salaryRanges.length > 0 ||
    filters.companyTypes.length > 0

  const pageTitle = specialFilter === 'remote'
    ? 'Remote Jobs in India'
    : specialFilter === 'freshers'
    ? 'Freshers & Graduate Trainee Jobs (0 Exp)'
    : specialFilter === 'internships'
    ? 'Paid College Internships'
    : specialFilter === 'walk-in'
    ? 'Walk-In Interview Drives'
    : 'All Job Openings'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/jobs" className="hover:text-indigo-600 transition-colors">Jobs</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">{pageTitle}</span>
      </nav>

      {/* Page Heading & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              {pageTitle}
              <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-200">
                {filteredJobs.length} Results
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified enterprise opportunities matching your search parameters
            </p>
          </div>

          {/* Quick Clear All Filters button */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>

        {/* Inline Search Bar Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search keyword (React, Java, Full Stack)..."
              value={filters.keyword}
              onChange={(e) => setFilters((prev) => ({ ...prev, keyword: e.target.value }))}
              className="w-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Location (Chennai, Bengaluru, Remote)..."
              value={filters.location}
              onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
              className="w-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, sortBy: e.target.value as 'relevance' | 'newest' | 'salary-high' }))
              }
              className="w-full text-xs text-slate-800 focus:outline-none bg-transparent font-medium cursor-pointer"
            >
              <option value="relevance">Sort By: Relevance</option>
              <option value="newest">Sort By: Freshness (Newest First)</option>
              <option value="salary-high">Sort By: Highest Salary (CTC)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2-Column Responsive Layout: Filter Sidebar + Job Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* LEFT COLUMN: FACETED FILTER SIDEBAR (Naukri Pattern) */}
        <aside className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-6 sticky top-20">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
              All Filters
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Filter 1: Experience */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Experience</div>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'all', label: 'Any Experience', count: counts.exp.all },
                { id: 'fresher', label: '🎓 Freshers (0 Yrs Exp)', count: counts.exp.fresher },
                { id: '1-2', label: '1 - 2 Years', count: counts.exp['1-2'] },
                { id: '3-5', label: '3 - 5 Years', count: counts.exp['3-5'] },
                { id: '5+', label: '5+ Years', count: counts.exp['5+'] }
              ].map((opt) => (
                <label key={opt.id} className="flex items-center justify-between text-slate-700 cursor-pointer hover:text-indigo-600 group">
                  <div className="flex items-center gap-2 truncate">
                    <input
                      type="radio"
                      name="exp-filter"
                      checked={filters.experience === opt.id}
                      onChange={() => setFilters((prev) => ({ ...prev, experience: opt.id }))}
                      className="text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <span className="truncate">{opt.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono group-hover:text-indigo-600 shrink-0">
                    ({opt.count})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter 2: Work Mode */}
          <div className="space-y-2.5 border-t border-slate-100 pt-4">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Work Mode</div>
            <div className="space-y-1.5 text-xs">
              {workModes.map((mode) => (
                <label key={mode} className="flex items-center justify-between text-slate-700 cursor-pointer hover:text-indigo-600 group">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.workMode.includes(mode)}
                      onChange={() => toggleWorkMode(mode)}
                      className="text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span>{mode}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono group-hover:text-indigo-600 shrink-0">
                    ({counts.workMode[mode] || 0})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter 3: Salary LPA */}
          <div className="space-y-2.5 border-t border-slate-100 pt-4">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Salary (CTC)</div>
            <div className="space-y-1.5 text-xs">
              {salaryRanges.map((salary) => (
                <label key={salary} className="flex items-center justify-between text-slate-700 cursor-pointer hover:text-indigo-600 group">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.salaryRanges.includes(salary)}
                      onChange={() => toggleSalaryRange(salary)}
                      className="text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span>{salary}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono group-hover:text-indigo-600 shrink-0">
                    ({(counts.salary as any)[salary] || 0})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter 4: Department */}
          <div className="space-y-2.5 border-t border-slate-100 pt-4">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Department</div>
            <div className="space-y-1.5 text-xs">
              {departments.map((dept) => (
                <label key={dept} className="flex items-center justify-between text-slate-700 cursor-pointer hover:text-indigo-600 group">
                  <div className="flex items-center gap-2 truncate">
                    <input
                      type="checkbox"
                      checked={filters.department.includes(dept)}
                      onChange={() => toggleDepartment(dept)}
                      className="text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span className="truncate">{dept}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono group-hover:text-indigo-600 shrink-0 ml-1">
                    ({(counts.dept as any)[dept] || 0})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter 5: Company Classification */}
          <div className="space-y-2.5 border-t border-slate-100 pt-4">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Company Type</div>
            <div className="space-y-1.5 text-xs">
              {companyTypes.map((type) => (
                <label key={type} className="flex items-center justify-between text-slate-700 cursor-pointer hover:text-indigo-600 group">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.companyTypes.includes(type)}
                      onChange={() => toggleCompanyType(type)}
                      className="text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span>{type}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono group-hover:text-indigo-600 shrink-0">
                    ({(counts.companyType as any)[type] || 0})
                  </span>
                </label>
              ))}
            </div>
          </div>

        </aside>

        {/* RIGHT COLUMN: JOB CARDS FEED & ALERT BANNER */}
        <main className="lg:col-span-3 space-y-4">
          
          {/* Email Job Alert Box */}
          <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <BellRing className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900">Get Instant Job Alerts For This Search</span>
                <p className="text-slate-500">We will notify you the moment a matching opening goes live.</p>
              </div>
            </div>
            <button
              onClick={() => alert('Job alert activated! You will receive daily digests matching your criteria.')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl transition-all shrink-0 cursor-pointer"
            >
              Set Free Alert
            </button>
          </div>

          {/* Empty State when no jobs match */}
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 mx-auto flex items-center justify-center">
                <Inbox className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">No Jobs Match Your Current Filters</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Try widening your experience range, clearing specific department checkboxes, or resetting your search keywords.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}

          {/* Quick Fresher Promo Card */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-amber-300 shrink-0" />
              <div>
                <h4 className="font-bold text-sm sm:text-base">Are you a graduating college student (2025/2026)?</h4>
                <p className="text-xs text-emerald-100">Take the NCAT test to unlock 120+ direct campus interview fast-tracks.</p>
              </div>
            </div>
            <Link
              to="/campus"
              className="bg-white text-emerald-800 text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors shrink-0"
            >
              Explore Campus Hub &rarr;
            </Link>
          </div>

        </main>

      </div>
    </div>
  )
}


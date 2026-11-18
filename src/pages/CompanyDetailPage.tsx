import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Building2,
  Star,
  MapPin,
  Users,
  ExternalLink,
  Briefcase,
  ChevronRight,
  Heart,
  CheckCircle2,
  HelpCircle
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'
import { JobCard } from '../components/common/JobCard'

export const CompanyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { companies, jobs, questions } = useJobContext()
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'reviews' | 'interviews'>('jobs')

  // Find company by matching ID or name
  const company = companies.find((c) => c.id === id || c.name.toLowerCase().includes(id?.replace(/-/g, ' ') || '')) || companies[0]

  // Filter jobs for this company
  const companyJobs = jobs.filter((j) => j.company.toLowerCase() === company.name.toLowerCase())

  // Filter questions for this company
  const companyQuestions = questions.filter((q) => q.company.toLowerCase().includes(company.name.toLowerCase()))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/companies" className="hover:text-indigo-600 transition-colors">Companies</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">{company.name}</span>
      </nav>

      {/* Hero Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        
        {/* Cover strip */}
        <div className="h-32 bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-900" />

        <div className="p-6 sm:p-8 -mt-12 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <img
                src={company.logo}
                alt={company.name}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {company.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-1">
                  <span>{company.industry}</span>
                  <span>&bull;</span>
                  <span className="font-semibold text-slate-800">{company.type}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3 py-1.5 rounded-xl border border-amber-200 text-sm font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span>{company.rating}</span>
                <span className="text-xs text-amber-700 font-normal">({(company.reviewCount / 1000).toFixed(1)}k Reviews)</span>
              </div>
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
              >
                Website
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              <span>HQ: {company.headquarters}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-500" />
              <span>Employees: {company.employeeCount}</span>
            </div>
            {company.ceoName && (
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-500" />
                <span>CEO: {company.ceoName}</span>
              </div>
            )}
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 sm:px-8 border-t border-slate-100 overflow-x-auto">
          {[
            { id: 'jobs', label: `Open Jobs (${companyJobs.length})`, icon: Briefcase },
            { id: 'overview', label: 'About & Benefits', icon: Building2 },
            { id: 'reviews', label: 'Reviews & Ratings', icon: Star },
            { id: 'interviews', label: `Interview Q&A (${companyQuestions.length})`, icon: HelpCircle }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'overview' | 'jobs' | 'reviews' | 'interviews')}
                className={`flex items-center gap-2 py-3.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all shrink-0 cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

      </div>

      {/* TAB CONTENT */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              Active Job Openings at {company.name}
            </h2>
            <span className="text-xs text-slate-500 font-medium">{companyJobs.length} positions available</span>
          </div>

          {companyJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {companyJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No active postings right now for this company.</p>
              <Link to="/jobs" className="text-xs text-indigo-600 font-bold hover:underline mt-2 inline-block">
                Browse other enterprise openings &rarr;
              </Link>
            </div>
          )}
        </div>
      )}

      {activeTab === 'overview' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Company Overview</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{company.overview}</p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              Employee Benefits & Perks
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {company.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Employee Rating & Culture Breakdown</h3>
              <p className="text-xs text-slate-500">Based on verified reviews from current and former employees</p>
            </div>
            <div className="text-3xl font-black text-amber-500 flex items-center gap-2">
              <Star className="w-7 h-7 fill-amber-400" />
              <span>{company.rating}</span>
              <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Work-Life Balance', score: 4.1 },
              { label: 'Salary & Compensation', score: 3.9 },
              { label: 'Career Growth & Learning', score: 4.3 },
              { label: 'Company Culture & Values', score: 4.2 },
              { label: 'Job Security', score: 4.0 },
              { label: 'Skill Development for Freshers', score: 4.4 }
            ].map((metric, i) => (
              <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-800">
                  <span>{metric.label}</span>
                  <span className="text-amber-600">★ {metric.score}</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full"
                    style={{ width: `${(metric.score / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'interviews' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Interview Questions Asked at {company.name}
          </h3>

          {companyQuestions.length > 0 ? (
            <div className="space-y-4">
              {companyQuestions.map((q) => (
                <div key={q.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">{q.role}</span>
                    <span className="text-xs font-semibold text-indigo-600">{q.difficulty}</span>
                  </div>
                  <h4 className="font-semibold text-sm text-slate-900">{q.question}</h4>
                  <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-100">
                    <strong className="text-slate-800">Key concept: </strong>
                    {q.answerSnippet}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-6 text-center">
              No specific questions recorded yet for this company. Check our general Interview Prep Hub!
            </p>
          )}
        </div>
      )}

    </div>
  )
}


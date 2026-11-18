import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  MapPin,
  Briefcase,
  IndianRupee,
  Star,
  Bookmark,
  Share2,
  CheckCircle2,
  Send,
  Building2,
  Calendar,
  Users,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  GraduationCap
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'
import { JobCard } from '../components/common/JobCard'

export const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { jobs, toggleSaveJob, isJobSaved, setQuickApplyJob, hasApplied, showNotification } = useJobContext()
  const navigate = useNavigate()

  const job = jobs.find((j) => j.id === id) || jobs[0]
  const saved = isJobSaved(job.id)
  const applied = hasApplied(job.id)

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      showNotification('Job link copied to clipboard!')
    }
  }

  // Similar jobs
  const similarJobs = jobs.filter((j) => j.id !== job.id).slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb Nav */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/jobs" className="hover:text-indigo-600 transition-colors">Jobs</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold truncate max-w-xs">{job.title}</span>
      </nav>

      {/* Main Grid: Details Container + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT 2 COLS: MAIN JOB DETAILS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <Link to={`/companies/${job.company.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
                  />
                </Link>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs">
                    <Link
                      to={`/companies/${job.company.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      className="font-bold text-slate-800 hover:text-indigo-600 transition-colors flex items-center gap-1"
                    >
                      <Building2 className="w-4 h-4 text-slate-400" />
                      {job.company}
                    </Link>
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md font-bold text-xs border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{job.rating}</span>
                      <span className="text-amber-700 font-normal">({(job.reviewCount / 1000).toFixed(1)}k reviews)</span>
                    </div>
                    <span className="text-slate-400">&bull;</span>
                    <span className="text-slate-500 font-medium">{job.companyType}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Top */}
              <div className="flex items-center gap-2 self-start">
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                  title="Share job"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleSaveJob(job.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    saved
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                  title={saved ? 'Remove bookmark' : 'Save job'}
                >
                  <Bookmark className={`w-4 h-4 ${saved ? 'fill-indigo-600' : ''}`} />
                </button>
              </div>
            </div>

            {/* 4-Box Key Stats (Experience, Salary, Location, Openings) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
                <div className="text-slate-400 flex items-center gap-1 mb-1">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                  Experience
                </div>
                <div className="font-bold text-slate-900 text-sm">{job.experience}</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
                <div className="text-slate-400 flex items-center gap-1 mb-1">
                  <IndianRupee className="w-3.5 h-3.5 text-amber-600" />
                  Salary (CTC)
                </div>
                <div className="font-bold text-slate-900 text-sm">{job.salary}</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
                <div className="text-slate-400 flex items-center gap-1 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                  Location
                </div>
                <div className="font-bold text-slate-900 text-sm truncate">{job.location.split(',')[0]}</div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
                <div className="text-slate-400 flex items-center gap-1 mb-1">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  Openings
                </div>
                <div className="font-bold text-slate-900 text-sm">{job.openings} Positions</div>
              </div>
            </div>

            {/* Sub-header meta bar: Posted, Applicants, CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Posted {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo} days ago`}</span>
                </div>
                <span>&bull;</span>
                <div>
                  <span className="font-semibold text-slate-800">{job.applicants}+</span> candidates applied
                </div>
              </div>

              {applied ? (
                <div className="flex items-center gap-1.5 px-6 py-3 bg-emerald-50 text-emerald-800 font-bold text-sm rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Application Submitted
                </div>
              ) : (
                <button
                  onClick={() => setQuickApplyJob(job)}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-100 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Apply on Career Connect Pro
                </button>
              )}
            </div>
          </div>

          {/* Job Description & Responsibilities */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-3">Job Description & Overview</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3">Key Responsibilities</h3>
              <ul className="space-y-2.5">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Skills breakdown */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Key Skills & Competencies</h3>
              
              <div>
                <div className="text-xs font-semibold text-slate-500 mb-2">Mandatory Skills (Primary Evaluation):</div>
                <div className="flex flex-wrap gap-2">
                  {job.mandatorySkills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-indigo-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {job.secondarySkills.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-500 mb-2">Good to Have / Bonus:</div>
                  <div className="flex flex-wrap gap-2">
                    {job.secondarySkills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Education & Eligibility */}
            <div className="border-t border-slate-100 pt-6 space-y-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                Education & Eligibility Criteria
              </h3>
              <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 font-medium">
                {job.education}
              </p>
            </div>

            {/* Specifications Table */}
            <div className="border-t border-slate-100 pt-6 space-y-3">
              <h3 className="text-base font-bold text-slate-900">Role Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block mb-0.5">Department</span>
                  <span className="font-semibold text-slate-800">{job.department}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block mb-0.5">Work Mode</span>
                  <span className="font-semibold text-slate-800">{job.workMode}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block mb-0.5">Employment Type</span>
                  <span className="font-semibold text-slate-800">Full Time, Permanent</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block mb-0.5">Company Type</span>
                  <span className="font-semibold text-slate-800">{job.companyType}</span>
                </div>
              </div>
            </div>

            {/* Trust & Safety Warning Notice (Naukri Pattern) */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Beware of Imposters & Scam Recruiters!</span>
                <p className="text-amber-800 mt-0.5 leading-relaxed">
                  Career Connect Pro or {job.company} never asks for money, registration fees, or laptop security deposits. If anyone requests payment for interview rounds, report them immediately.
                </p>
              </div>
            </div>

          </div>

          {/* Similar Jobs Feed */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold text-slate-900">Similar Job Openings</h3>
            <div className="space-y-4">
              {similarJobs.map((simJob) => (
                <JobCard key={simJob.id} job={simJob} />
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: ABOUT COMPANY SIDEBAR */}
        <aside className="lg:col-span-1 space-y-6 sticky top-20">
          
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-3">
              <img
                src={job.companyLogo}
                alt={job.company}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200"
              />
              <div>
                <h3 className="font-bold text-base text-slate-900">{job.company}</h3>
                <span className="text-xs text-slate-500">{job.companyType}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Global technology leader providing digital transformation and engineering services. Rated {job.rating} / 5 by verified employees.
            </p>

            <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Industry:</span>
                <span className="font-semibold text-slate-800">{job.department}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Employee Rating:</span>
                <span className="font-semibold text-amber-600">★ {job.rating} / 5.0</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Verified Reviews:</span>
                <span className="font-semibold text-slate-800">{job.reviewCount.toLocaleString()}+</span>
              </div>
            </div>

            <Link
              to={`/companies/${job.company.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className="block text-center py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-indigo-600 text-xs font-bold rounded-xl border border-slate-200 transition-colors"
            >
              View Full Company Profile & Jobs &rarr;
            </Link>
          </div>

          {/* Quick Apply Sidecard */}
          <div className="bg-gradient-to-tr from-indigo-900 to-slate-900 text-white rounded-3xl p-6 shadow-md space-y-4">
            <h4 className="font-bold text-base">Ready to Join {job.company}?</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Submit your verified candidate profile directly into the recruiter&apos;s interview pipeline.
            </p>
            {applied ? (
              <div className="text-center py-3 bg-emerald-500/20 text-emerald-300 rounded-xl text-xs font-bold border border-emerald-400/30">
                Application Submitted
              </div>
            ) : (
              <button
                onClick={() => setQuickApplyJob(job)}
                className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                Apply for this Role Now
              </button>
            )}
          </div>

        </aside>

      </div>
    </div>
  )
}


import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  MapPin,
  Briefcase,
  IndianRupee,
  Star,
  Bookmark,
  Check,
  Send,
  Zap,
  Building2,
  Clock
} from 'lucide-react'
import { Job } from '../../types'
import { useJobContext } from '../../context/JobContext'

interface JobCardProps {
  job: Job
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { toggleSaveJob, isJobSaved, setQuickApplyJob, hasApplied } = useJobContext()
  const navigate = useNavigate()
  const saved = isJobSaved(job.id)
  const applied = hasApplied(job.id)

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all p-5 sm:p-6 group relative flex flex-col justify-between">
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <Link to={`/companies/${job.company.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
              <img
                src={job.companyLogo}
                alt={job.company}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs transition-colors shrink-0"
              />
            </Link>
            <div>
              <Link
                to={`/jobs/${job.id}`}
                className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-[#275df5] transition-colors leading-snug line-clamp-1"
              >
                {job.title}
              </Link>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs">
                <Link
                  to={`/companies/${job.company.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className="font-semibold text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {job.company}
                </Link>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full font-bold text-[11px] border border-amber-200/60">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                  <span>{job.rating}</span>
                  <span className="text-amber-700 font-normal">({(job.reviewCount / 1000).toFixed(1)}k Reviews)</span>
                </div>
                {job.urgentHiring && (
                  <span className="bg-rose-50 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-rose-200/60">
                    <Zap className="w-2.5 h-2.5 fill-rose-500" />
                    Actively Hiring
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleSaveJob(job.id)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              saved
                ? 'bg-blue-50 border-blue-200 text-blue-600'
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
            title={saved ? 'Remove bookmark' : 'Save job to dashboard'}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-blue-600' : ''}`} />
          </button>
        </div>

        {/* 3-Point Meta Cluster (Experience, CTC, Location) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 my-4 py-2.5 px-3.5 bg-slate-50/80 rounded-xl border border-slate-100 text-xs font-medium">
          <div className="flex items-center gap-2 text-slate-600">
            <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800">{job.experience}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <IndianRupee className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-bold text-slate-900">{job.salary}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate text-slate-700">{job.location}</span>
          </div>
        </div>

        {/* 2-line Description snippet */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
          {job.description}
        </p>

        {/* Skill Tag Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.mandatorySkills.slice(0, 4).map((skill, i) => (
            <span
              key={i}
              className="bg-slate-100/80 text-slate-700 text-[11px] font-medium px-2.5 py-0.5 rounded-md border border-slate-200/80"
            >
              {skill}
            </span>
          ))}
          {job.mandatorySkills.length > 4 && (
            <span className="text-[11px] text-slate-400 font-medium px-2 py-0.5">
              +{job.mandatorySkills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Timeline + Action Buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
          <Clock className="w-3 h-3" />
          <span>{job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo}d ago`}</span>
          <span>&middot;</span>
          <span>{job.applicants}+ applied</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/jobs/${job.id}`)}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#275df5] hover:bg-blue-50/60 rounded-lg transition-colors cursor-pointer"
          >
            View Details
          </button>
          
          {applied ? (
            <span className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200">
              <Check className="w-3.5 h-3.5" />
              Applied
            </span>
          ) : (
            <button
              onClick={() => setQuickApplyJob(job)}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#275df5] hover:bg-[#1e4ed8] rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <Send className="w-3 h-3" />
              Quick Apply
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

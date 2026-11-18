import React from 'react'
import { Link } from 'react-router-dom'
import { Star, MapPin, Users, Briefcase, ArrowRight } from 'lucide-react'
import { Company } from '../../types'

interface CompanyCardProps {
  company: Company
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all p-5 flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-3">
          <img
            src={company.logo}
            alt={company.name}
            className="w-14 h-14 rounded-xl object-cover border border-slate-200 transition-colors"
          />
          <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-lg font-bold text-xs border border-amber-200">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{company.rating}</span>
            <span className="text-[10px] text-amber-700 font-normal">({(company.reviewCount / 1000).toFixed(1)}k)</span>
          </div>
        </div>

        <div className="mt-3">
          <Link
            to={`/companies/${company.id}`}
            className="font-bold text-base text-slate-900 group-hover:text-[#275df5] transition-colors"
          >
            {company.name}
          </Link>
          <div className="text-xs text-slate-500 font-medium">{company.industry}</div>
        </div>

        <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
          {company.overview}
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-600">
          <div className="flex items-center gap-1 text-[11px]">
            <MapPin className="w-3 h-3 text-blue-500" />
            <span className="truncate">{company.headquarters.split(',')[0]}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <Users className="w-3 h-3 text-emerald-500" />
            <span>{company.employeeCount}</span>
          </div>
        </div>

        {/* Benefits Badges */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {company.benefits.slice(0, 3).map((benefit, i) => (
            <span
              key={i}
              className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium"
            >
              {benefit}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
          <Briefcase className="w-3.5 h-3.5" />
          <span>{company.openJobsCount} Active Jobs</span>
        </div>
        <Link
          to={`/companies/${company.id}`}
          className="text-xs font-bold text-[#275df5] hover:text-blue-800 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
        >
          View Profile
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}


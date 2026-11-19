import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Briefcase,
  Bookmark,
  BellRing,
  ChevronRight,
  Eye,
  MapPin,
  IndianRupee
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'
import { JobCard } from '../components/common/JobCard'

export const DashboardPage: React.FC = () => {
  const { applications, savedJobIds, jobs, userProfile } = useJobContext()
  const [activeTab, setActiveTab] = useState<'applied' | 'saved' | 'alerts' | 'analytics'>('applied')

  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id))

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Shortlisted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'Interview':
        return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'Reviewing':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'Offered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-extrabold'
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">Candidate Dashboard</span>
      </nav>

      {/* Top Profile Summary & Completeness Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-md">
              {userProfile.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {userProfile.name}
                </h1>
                <span className="bg-indigo-50 text-indigo-700 font-bold text-[10px] px-2 py-0.5 rounded-full border border-indigo-200">
                  {userProfile.experienceLevel}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">{userProfile.headline}</p>
              <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <span>{userProfile.location}</span>
                <span>&bull;</span>
                <Link to="/profile" className="text-indigo-600 font-semibold hover:underline">
                  Edit Profile &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Completeness Gauge */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 w-full sm:w-72 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700">Profile Strength</span>
              <span className="text-emerald-600">{userProfile.profileCompletion}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all"
                style={{ width: `${userProfile.profileCompletion}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-500">
              Add 1 hackathon or project link to reach 100% visibility.
            </div>
          </div>

        </div>

        {/* 4 Stats Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-xl text-xs">
            <span className="text-slate-400 block mb-0.5">Applied Jobs</span>
            <span className="text-lg font-black text-slate-900">{applications.length}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-xs">
            <span className="text-slate-400 block mb-0.5">Shortlisted</span>
            <span className="text-lg font-black text-emerald-600">
              {applications.filter((a) => a.status === 'Shortlisted').length}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-xs">
            <span className="text-slate-400 block mb-0.5">Saved Jobs</span>
            <span className="text-lg font-black text-indigo-600">{savedJobs.length}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-xs">
            <span className="text-slate-400 block mb-0.5">Recruiter Views</span>
            <span className="text-lg font-black text-amber-600">48 this week</span>
          </div>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'applied', label: `Applied Jobs (${applications.length})`, icon: Briefcase },
          { id: 'saved', label: `Saved Jobs (${savedJobs.length})`, icon: Bookmark },
          { id: 'analytics', label: 'Recruiter Views & Analytics', icon: Eye },
          { id: 'alerts', label: 'Job Alerts Settings', icon: BellRing }
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'applied' | 'saved' | 'alerts' | 'analytics')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all shrink-0 cursor-pointer ${
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

      {/* TAB 1: APPLIED JOBS TRACKER (Naukri Status Pipeline) */}
      {activeTab === 'applied' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Application Pipeline Status</h2>
            <Link to="/jobs" className="text-xs font-semibold text-indigo-600 hover:underline">
              Apply to more jobs &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-300 transition-all"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={app.companyLogo}
                    alt={app.company}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-base text-slate-900 leading-snug">
                      {app.jobTitle}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                      <span className="font-semibold text-slate-700">{app.company}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {app.location.split(',')[0]}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <IndianRupee className="w-3 h-3 text-slate-400" />
                        {app.salary}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-start sm:self-center">
                  <div className="text-right hidden sm:block text-xs text-slate-400">
                    <div>Applied {app.appliedDate}</div>
                    <div className="text-[11px] text-emerald-600 font-semibold">Resume delivered</div>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>
                  <Link
                    to={`/jobs/${app.jobId}`}
                    className="text-xs font-bold text-slate-600 hover:text-indigo-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200"
                  >
                    View JD
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SAVED JOBS */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Your Bookmarked Opportunities</h2>
            <span className="text-xs text-slate-500">{savedJobs.length} roles saved</span>
          </div>

          {savedJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {savedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No saved jobs yet.</p>
              <Link to="/jobs" className="text-xs text-indigo-600 font-bold hover:underline mt-2 inline-block">
                Explore openings & save for later &rarr;
              </Link>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: RECRUITER ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Profile Visibility & Performance</h3>
            <p className="text-xs text-slate-500">Track how often enterprise recruiters view and download your resume</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100">
              <div className="text-xs font-semibold text-indigo-700">Recruiter Profile Searches</div>
              <div className="text-2xl font-black text-indigo-900 mt-1">128</div>
              <div className="text-[11px] text-emerald-600 mt-1 font-semibold">&uarr; 34% more than last week</div>
            </div>
            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
              <div className="text-xs font-semibold text-emerald-700">Resume Downloads</div>
              <div className="text-2xl font-black text-emerald-900 mt-1">19</div>
              <div className="text-[11px] text-emerald-600 mt-1 font-semibold">By Persistent, Zoho, Tech M</div>
            </div>
            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100">
              <div className="text-xs font-semibold text-amber-700">Shortlist Invitations</div>
              <div className="text-2xl font-black text-amber-900 mt-1">4</div>
              <div className="text-[11px] text-amber-700 mt-1 font-semibold">Direct interview triggers</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: JOB ALERTS SETTINGS */}
      {activeTab === 'alerts' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Job Alert Email Preferences</h3>
          <p className="text-xs text-slate-500">Manage daily automated job match alerts sent to {userProfile.email}</p>

          <div className="space-y-3 pt-2">
            {[
              { title: 'Full Stack & Frontend Developer Openings (Chennai / Bengaluru / Remote)', freq: 'Daily Digest' },
              { title: 'Graduate Trainee Freshers Drives (0-1 Yr Exp)', freq: 'Instant Notification' },
              { title: 'National Hackathons & Hiring Challenges', freq: 'Weekly Alert' }
            ].map((al, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-800">{al.title}</div>
                  <div className="text-slate-400 mt-0.5">{al.freq} &middot; Active</div>
                </div>
                <button
                  onClick={() => alert('Alert settings updated')}
                  className="text-xs text-indigo-600 hover:underline font-semibold cursor-pointer"
                >
                  Manage
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}


import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Briefcase,
  Building2,
  GraduationCap,
  FileCheck2,
  HelpCircle,
  Menu,
  X,
  Search,
  User,
  Bookmark,
  ChevronDown,
  Sparkles,
  PlusCircle,
  DollarSign,
  Radio,
  Eye,
  Zap,
  Globe,
  ShieldCheck,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'
import { BrandLogo } from '../common/BrandLogo'

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  const {
    applications,
    savedJobIds,
    userProfile,
    setIsCommandPaletteOpen,
    broadcastMessage,
    dismissBroadcast
  } = useJobContext()

  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const triggerA11yModal = () => {
    window.dispatchEvent(new CustomEvent('open-a11y-modal'))
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs transition-all overflow-x-clip">
      {/* Global Broadcast Banner (if active) */}
      {broadcastMessage && broadcastMessage.active && (
        <div
          className={`px-4 py-2 text-xs font-semibold flex items-center justify-between border-b ${
            broadcastMessage.severity === 'critical'
              ? 'bg-red-50 text-red-900 border-red-200'
              : broadcastMessage.severity === 'maintenance'
              ? 'bg-amber-50 text-amber-900 border-amber-200'
              : 'bg-blue-50 text-blue-900 border-blue-200'
          }`}
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <Radio className="w-3.5 h-3.5 text-[#275df5] animate-pulse shrink-0" />
              <span className="truncate">
                <strong>{broadcastMessage.title}:</strong> {broadcastMessage.message}
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-4">
              {broadcastMessage.ctaText && broadcastMessage.ctaLink && (
                <Link
                  to={broadcastMessage.ctaLink}
                  className="underline font-bold text-xs hover:opacity-80 transition-opacity"
                >
                  {broadcastMessage.ctaText} →
                </Link>
              )}
              <button
                onClick={dismissBroadcast}
                className="p-1 hover:bg-black/5 rounded cursor-pointer transition-colors"
                title="Dismiss banner"
                aria-label="Dismiss banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar Bar - Strict 64px Height with Perfect Vertical Centering */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          
          {/* Left Zone: Brand Logo & Desktop Navigation */}
          <div className="flex items-center gap-4 xl:gap-8 shrink-0">
            {/* Clean Brand Logo */}
            <BrandLogo size="md" showTagline={true} />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
              
              {/* 1. Jobs Mega Menu Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setJobsDropdownOpen(true)}
                onMouseLeave={() => setJobsDropdownOpen(false)}
              >
                <button
                  onClick={() => navigate('/jobs')}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                    isActive('/jobs')
                      ? 'text-[#275df5] bg-blue-50/80 font-bold'
                      : 'text-slate-700 hover:text-[#275df5] hover:bg-slate-100/70'
                  }`}
                  aria-expanded={jobsDropdownOpen}
                >
                  <span>Jobs</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      jobsDropdownOpen ? 'rotate-180 text-[#275df5]' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {jobsDropdownOpen && (
                  <div className="absolute left-0 top-full pt-1 w-76 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2.5 space-y-1">
                      <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Explore Opportunities
                      </div>

                      <Link
                        to="/jobs"
                        onClick={() => setJobsDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-800 hover:bg-blue-50/70 hover:text-[#275df5] transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#275df5] flex items-center justify-center shrink-0 group-hover:bg-[#275df5] group-hover:text-white transition-colors">
                          <Search className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold leading-tight">All Open Positions</div>
                          <div className="text-xs text-slate-500 mt-0.5">Explore 50,000+ verified roles</div>
                        </div>
                      </Link>

                      <Link
                        to="/jobs/freshers"
                        onClick={() => setJobsDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-800 hover:bg-emerald-50/70 hover:text-emerald-700 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold leading-tight flex items-center gap-1.5">
                            Freshers & Graduates
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-extrabold">
                              0 Exp
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">Entry-level & trainee openings</div>
                        </div>
                      </Link>

                      <Link
                        to="/jobs/remote"
                        onClick={() => setJobsDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-800 hover:bg-amber-50/70 hover:text-amber-700 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                          <Globe className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold leading-tight">Remote Work (Pan-India)</div>
                          <div className="text-xs text-slate-500 mt-0.5">Work from home & hybrid roles</div>
                        </div>
                      </Link>

                      <Link
                        to="/jobs/internships"
                        onClick={() => setJobsDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-800 hover:bg-purple-50/70 hover:text-purple-700 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold leading-tight">Paid Internships</div>
                          <div className="text-xs text-slate-500 mt-0.5">Summer & pre-placement internships</div>
                        </div>
                      </Link>

                      <div className="pt-1 border-t border-slate-100">
                        <Link
                          to="/jobs/walk-in"
                          onClick={() => setJobsDropdownOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#275df5] transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            Walk-in Interview Drives
                          </span>
                          <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-bold">
                            Live
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Companies Link */}
              <Link
                to="/companies"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  isActive('/companies')
                    ? 'text-[#275df5] bg-blue-50/80 font-bold'
                    : 'text-slate-700 hover:text-[#275df5] hover:bg-slate-100/70'
                }`}
              >
                Companies
              </Link>

              {/* 3. Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button
                  onClick={() => navigate('/services')}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                    isActive('/services') || isActive('/resume-builder') || isActive('/salaries')
                      ? 'text-[#275df5] bg-blue-50/80 font-bold'
                      : 'text-slate-700 hover:text-[#275df5] hover:bg-slate-100/70'
                  }`}
                  aria-expanded={servicesDropdownOpen}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      servicesDropdownOpen ? 'rotate-180 text-[#275df5]' : ''
                    }`}
                  />
                </button>

                {servicesDropdownOpen && (
                  <div className="absolute left-0 top-full pt-1 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2.5 space-y-1">
                      <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        FastForward Career Services
                      </div>

                      <Link
                        to="/services"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-800 hover:bg-blue-50/70 hover:text-[#275df5] transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#275df5] flex items-center justify-center shrink-0 group-hover:bg-[#275df5] group-hover:text-white transition-colors">
                          <Zap className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold leading-tight">Priority Recruiter Reach</div>
                          <div className="text-xs text-slate-500 mt-0.5">3x more profile views from top HRs</div>
                        </div>
                      </Link>

                      <Link
                        to="/resume-builder"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-800 hover:bg-emerald-50/70 hover:text-emerald-700 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <FileCheck2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold leading-tight">ATS Resume Checker</div>
                          <div className="text-xs text-slate-500 mt-0.5">Instant AI score & keyword audit</div>
                        </div>
                      </Link>

                      <Link
                        to="/salaries"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-800 hover:bg-amber-50/70 hover:text-amber-700 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                          <DollarSign className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold leading-tight">Salary Benchmarking</div>
                          <div className="text-xs text-slate-500 mt-0.5">Real compensation insights in INR</div>
                        </div>
                      </Link>

                      <Link
                        to="/interview-prep"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-800 hover:bg-indigo-50/70 hover:text-indigo-700 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold leading-tight">Interview Q&A Bank</div>
                          <div className="text-xs text-slate-500 mt-0.5">2,500+ MNC technical questions</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Campus Hub */}
              <Link
                to="/campus"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  isActive('/campus')
                    ? 'text-[#275df5] bg-blue-50/80 font-bold'
                    : 'text-slate-700 hover:text-[#275df5] hover:bg-slate-100/70'
                }`}
              >
                Campus
              </Link>

              {/* 5. Enterprise Console Portal */}
              <Link
                to="/app"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  isActive('/app') || isActive('/admin')
                    ? 'text-[#275df5] bg-blue-50/80 font-bold'
                    : 'text-slate-700 hover:text-[#275df5] hover:bg-slate-100/70'
                }`}
              >
                Enterprise
              </Link>

            </nav>
          </div>

          {/* Right Action Cluster - Clean, Responsive, Zero-Wrap Protection */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            
            {/* Quick ⌘K Search: Capsule on XL (>=1280px), Icon on LG (1024-1279px) */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="hidden xl:flex items-center gap-2 text-xs text-slate-500 bg-slate-100/80 hover:bg-slate-200/70 px-3 py-1.5 rounded-xl border border-slate-200 transition-all cursor-pointer shadow-2xs hover:border-slate-300 w-44 2xl:w-52 justify-between"
              aria-label="Open Command Palette Search (Press Command K)"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">Search jobs...</span>
              </div>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300/80 rounded-md text-[10px] font-mono text-slate-500 shadow-2xs font-semibold shrink-0">
                ⌘K
              </kbd>
            </button>

            {/* Compact Search Trigger for LG (1024px-1279px) */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="xl:hidden p-2 text-slate-500 hover:text-[#275df5] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Search (⌘K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Accessibility Settings Shortcut */}
            <button
              onClick={triggerA11yModal}
              className="p-2 text-slate-500 hover:text-[#275df5] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Accessibility & High Contrast (Alt+A)"
              aria-label="Accessibility Settings"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Saved Jobs Bookmark */}
            <Link
              to="/dashboard"
              className="relative p-2 text-slate-500 hover:text-[#275df5] hover:bg-slate-100 rounded-xl transition-colors"
              title="Saved Jobs"
              aria-label="Saved Jobs"
            >
              <Bookmark className="w-4 h-4" />
              {savedJobIds.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                  {savedJobIds.length}
                </span>
              )}
            </Link>

            <div className="h-4 w-px bg-slate-200 mx-0.5" />

            {/* For Employers CTA Button */}
            <Link
              to="/post-job"
              className="hidden xl:inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#275df5] px-2.5 xl:px-3 py-1.5 rounded-xl border border-slate-200 hover:border-blue-300 transition-all bg-white hover:bg-blue-50/40 shadow-2xs shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#275df5]" />
              <span>For Employers</span>
            </Link>

            {/* Candidate Dashboard CTA */}
            <Link
              to="/dashboard"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all shadow-xs shrink-0 ${
                location.pathname.startsWith('/dashboard')
                  ? 'bg-[#275df5] text-white shadow-blue-200'
                  : 'bg-blue-50 text-[#275df5] hover:bg-[#275df5] hover:text-white border border-blue-200/60 hover:border-transparent'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Dashboard</span>
              {applications.length > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    location.pathname.startsWith('/dashboard')
                      ? 'bg-white text-[#275df5]'
                      : 'bg-[#275df5] text-white'
                  }`}
                >
                  {applications.length}
                </span>
              )}
            </Link>

            {/* User Profile Avatar & Flyout Menu */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => setUserDropdownOpen(true)}
              onMouseLeave={() => setUserDropdownOpen(false)}
            >
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-1 p-0.5 pl-1 pr-1.5 rounded-full border border-slate-200 hover:border-[#275df5] transition-all bg-slate-50/60 hover:bg-white cursor-pointer group"
                title={userProfile.name}
                aria-label="User Account Menu"
                aria-expanded={userDropdownOpen}
              >
                <div className="w-7 h-7 rounded-full bg-[#275df5] text-white font-extrabold flex items-center justify-center text-xs shadow-2xs">
                  {userProfile.name ? userProfile.name.charAt(0) : 'U'}
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600 transition-transform" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full pt-1 w-68 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 space-y-2">
                    <div className="pb-2.5 border-b border-slate-100">
                      <div className="font-bold text-slate-900 text-sm truncate flex items-center gap-1.5">
                        {userProfile.name}
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      </div>
                      <div className="text-xs text-slate-500 truncate mt-0.5">{userProfile.email}</div>
                      
                      {/* Profile Strength Meter */}
                      <div className="mt-2.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
                          <span>Profile Strength</span>
                          <span className="text-[#275df5] font-bold">{userProfile.profileCompletion}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-[#275df5] h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${userProfile.profileCompletion}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-0.5 text-xs font-semibold">
                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:text-[#275df5] hover:bg-blue-50/60 rounded-xl transition-colors"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>Candidate Profile</span>
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center justify-between px-3 py-2 text-slate-700 hover:text-[#275df5] hover:bg-blue-50/60 rounded-xl transition-colors"
                      >
                        <span className="flex items-center gap-2.5">
                          <Briefcase className="w-4 h-4 text-slate-400" />
                          <span>Applied Jobs</span>
                        </span>
                        <span className="text-xs text-[#275df5] font-bold px-1.5 py-0.2 bg-blue-50 rounded">
                          {applications.length}
                        </span>
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center justify-between px-3 py-2 text-slate-700 hover:text-[#275df5] hover:bg-blue-50/60 rounded-xl transition-colors"
                      >
                        <span className="flex items-center gap-2.5">
                          <Bookmark className="w-4 h-4 text-slate-400" />
                          <span>Saved Jobs</span>
                        </span>
                        <span className="text-xs text-slate-500 font-bold px-1.5 py-0.2 bg-slate-100 rounded">
                          {savedJobIds.length}
                        </span>
                      </Link>
                      <Link
                        to="/account/analytics-preferences"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:text-[#275df5] hover:bg-blue-50/60 rounded-xl transition-colors"
                      >
                        <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                        <span>Privacy & Preferences</span>
                      </Link>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <Link
                        to="/login"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        Switch Account / Sign Out
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Mobile Right Controls: Search + Applied Pill + Menu Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="p-1.5 sm:p-2 text-slate-600 hover:text-[#275df5] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            <Link
              to="/dashboard"
              className="hidden sm:flex text-xs font-bold bg-blue-50 text-[#275df5] px-2.5 py-1.5 rounded-lg items-center gap-1 border border-blue-200/60"
            >
              <span>Applied</span>
              <span className="bg-[#275df5] text-white rounded-full px-1.5 py-0.2 text-[10px] font-extrabold">
                {applications.length}
              </span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200/80 cursor-pointer"
              aria-label="Toggle navigation drawer"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          
          {/* Quick Search Button in Drawer */}
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              setIsCommandPaletteOpen(true)
            }}
            className="w-full flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200 text-left cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#275df5]" />
              <span>Search 50,000+ jobs, companies...</span>
            </span>
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono text-slate-500">
              ⌘K
            </kbd>
          </button>

          {/* Primary Quick Tiles (2x2 Grid) */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/jobs"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-3 rounded-xl text-sm font-bold bg-slate-50 text-slate-800 border border-slate-200/80 hover:bg-blue-50/60 hover:text-[#275df5] transition-colors"
            >
              <Search className="w-4 h-4 text-[#275df5]" />
              <span>All Jobs</span>
            </Link>
            <Link
              to="/jobs/freshers"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-3 rounded-xl text-sm font-bold bg-emerald-50/70 text-emerald-900 border border-emerald-200/80 hover:bg-emerald-100 transition-colors"
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Freshers (0 Exp)</span>
            </Link>
            <Link
              to="/companies"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-3 rounded-xl text-sm font-bold bg-slate-50 text-slate-800 border border-slate-200/80 hover:bg-blue-50/60 hover:text-[#275df5] transition-colors"
            >
              <Building2 className="w-4 h-4 text-amber-500" />
              <span>Companies</span>
            </Link>
            <Link
              to="/campus"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-3 rounded-xl text-sm font-bold bg-blue-50/70 text-[#275df5] border border-blue-200/80 hover:bg-blue-100 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#275df5]" />
              <span>Campus NCAT</span>
            </Link>
          </div>

          {/* Secondary Link List */}
          <div className="space-y-1 pt-1 border-t border-slate-100 text-sm font-medium">
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50"
            >
              <span className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-amber-500" />
                FastForward Career Services
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">
                Featured
              </span>
            </Link>
            <Link
              to="/resume-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              AI Resume ATS Checker
            </Link>
            <Link
              to="/salaries"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50"
            >
              <DollarSign className="w-4 h-4 text-slate-500" />
              Salary Benchmarking in INR
            </Link>
            <Link
              to="/interview-prep"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50"
            >
              <HelpCircle className="w-4 h-4 text-indigo-500" />
              Interview Preparation Bank
            </Link>
            <Link
              to="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50"
            >
              <span className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-slate-500" />
                Enterprise Recruiter Suite
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>

          {/* Action Row: Employer CTA & Log In */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <Link
              to="/post-job"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 shadow-2xs"
            >
              <PlusCircle className="w-4 h-4 text-[#275df5]" />
              <span>For Employers — Post a Job</span>
            </Link>

            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 text-sm font-bold text-white bg-[#275df5] hover:bg-[#1f4ed8] rounded-xl shadow-xs transition-colors"
              >
                Register Free
              </Link>
            </div>
          </div>

        </div>
      )}
    </header>
  )
}

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Sparkles,
  GraduationCap,
  Building2,
  ArrowRight,
  HelpCircle,
  FileCheck2,
  Code2,
  Cpu,
  Layers,
  Smartphone,
  CheckCircle,
  Briefcase,
  TrendingUp,
  Award
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'
import { SearchBar } from '../components/common/SearchBar'
import { JobCard } from '../components/common/JobCard'
import { CompanyCard } from '../components/common/CompanyCard'

export const HomePage: React.FC = () => {
  const { jobs, companies, contests, questions, setFilters } = useJobContext()
  const navigate = useNavigate()

  const handleCategoryClick = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      keyword: category,
      department: [],
      workMode: []
    }))
    navigate('/jobs')
  }

  const roleCollections = [
    { name: 'Full Stack Developer', count: '17.8k+ Jobs', icon: Code2, keyword: 'Full Stack' },
    { name: 'Frontend Developer (React)', count: '8.4k+ Jobs', icon: Layers, keyword: 'Frontend' },
    { name: 'DevOps & Cloud Engineer', count: '4.2k+ Jobs', icon: Cpu, keyword: 'DevOps' },
    { name: 'Mobile App Developer', count: '3.1k+ Jobs', icon: Smartphone, keyword: 'Mobile' },
    { name: 'Data Analyst & Scientist', count: '5.6k+ Jobs', icon: TrendingUp, keyword: 'Data' },
    { name: 'Fresher Trainee (0 Exp)', count: '12.4k+ Jobs', icon: GraduationCap, keyword: 'Fresher' }
  ]

  return (
    <div className="space-y-16 pb-20">
      
      {/* HERO SECTION — Clean, Restrained, Product-Focused */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 bg-slate-50/60 overflow-hidden border-b border-slate-200/80">
        
        <div className="max-w-5xl mx-auto text-center space-y-6">
          
          {/* Status Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200/90 shadow-2xs text-xs font-medium text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-bold text-slate-900">Verified Hiring Network</span>
            <span className="text-slate-300">&vert;</span>
            <span className="text-slate-600 font-medium">50,000+ Active Roles Across India</span>
          </div>

          {/* Main Headline — Weight 700 with Brand Accent */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.12]">
            Find Verified Engineering & <br className="hidden sm:inline" />
            <span className="text-[#275df5]">Campus Opportunities</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Connect directly with 2,500+ verified enterprise employers, MNCs, and college placement drives with transparent INR salaries and zero recruiter spam.
          </p>

          {/* 3-Part Composite Search Bar */}
          <div className="pt-2 max-w-4xl mx-auto">
            <SearchBar />
          </div>

          {/* Trending Discovery Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="text-slate-400 font-medium">Trending Searches:</span>
            {[
              { label: 'Remote', path: '/jobs/remote' },
              { label: 'MNC', path: '/companies' },
              { label: 'Software & IT', keyword: 'Software' },
              { label: 'Banking & Finance', keyword: 'Banking' },
              { label: 'HR', keyword: 'HR' },
              { label: 'Marketing', keyword: 'Marketing' },
              { label: 'Fortune 500', path: '/companies' },
              { label: 'Internship', path: '/jobs/internships' },
              { label: 'Data Science', keyword: 'Data Science' },
              { label: 'Fresher Trainee', path: '/jobs/freshers' }
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (chip.path) navigate(chip.path)
                  else if (chip.keyword) handleCategoryClick(chip.keyword)
                }}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 hover:text-[#275df5] border border-slate-200 hover:border-slate-300 shadow-2xs font-semibold transition-colors cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 1: TOP COMPANIES CAROUSEL CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Top Companies Hiring Now
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Explore 2,500+ verified enterprise employers actively searching for talent
            </p>
          </div>
          <Link
            to="/companies"
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group"
          >
            <span>View all companies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Company Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { name: 'MNCs', count: '2.5K+ hiring', tag: 'Global Leaders' },
            { name: 'Unicorns', count: '99+ hiring', tag: 'Fast Scale' },
            { name: 'Product Tech', count: '1.2K+ hiring', tag: 'Core Software' },
            { name: 'Startups', count: '920+ hiring', tag: 'Early Stage' },
            { name: 'Fintech', count: '450+ hiring', tag: 'Payments & BFSI' },
            { name: 'Edtech & AI', count: '280+ hiring', tag: 'Next-Gen' }
          ].map((cat, i) => (
            <div
              key={i}
              onClick={() => navigate('/companies')}
              className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </div>
              <div className="text-xs font-semibold text-emerald-600 mt-1">{cat.count}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{cat.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: CAMPUS & FRESHERS HUB — Solid Graphite with Crisp Hairlines */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0f172a] rounded-2xl p-6 sm:p-10 text-white relative overflow-hidden border border-slate-800 shadow-sm">
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              Campus Connect &middot; Student & Freshers Hub
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight">
              Direct Campus Hiring, Aptitude Tests & National Hackathons
            </h2>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Take the NCAT National Aptitude test, participate in coding contests, practice verified company interview questions, and connect directly with hiring teams.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <Link
                to="/campus/tests"
                className="bg-slate-800/90 hover:bg-slate-800 p-3.5 rounded-xl border border-slate-700/80 transition-colors group block"
              >
                <div className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                  NCAT Aptitude
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs text-slate-400 mt-1">Diagnostic exam & scores</div>
              </Link>

              <Link
                to="/campus/contests"
                className="bg-slate-800/90 hover:bg-slate-800 p-3.5 rounded-xl border border-slate-700/80 transition-colors group block"
              >
                <div className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                  Contests & AI
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs text-slate-400 mt-1">₹10 Lakh+ prizes & offers</div>
              </Link>

              <Link
                to="/interview-prep"
                className="bg-slate-800/90 hover:bg-slate-800 p-3.5 rounded-xl border border-slate-700/80 transition-colors group block"
              >
                <div className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                  Interview Bank
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs text-slate-400 mt-1">Amazon, TCS, Infosys Qs</div>
              </Link>

              <Link
                to="/jobs/freshers"
                className="bg-slate-800/90 hover:bg-slate-800 p-3.5 rounded-xl border border-emerald-500/30 transition-colors group block"
              >
                <div className="font-bold text-sm text-emerald-400 flex items-center justify-between">
                  0-Exp Jobs
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs text-slate-400 mt-1">Graduate trainee roles</div>
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span>Verified across 350+ Engineering Colleges & Universities across India</span>
            </div>
            <Link
              to="/campus"
              className="bg-[#275df5] hover:bg-[#1f4ed8] text-white font-bold px-5 py-2.5 rounded-xl transition-colors shadow-2xs"
            >
              Enter Campus Hub &rarr;
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION 3: DISCOVER JOBS ACROSS POPULAR ROLES (Naukri Pattern) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Discover Jobs Across Popular Roles
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Select a role and we&apos;ll show you verified matching opportunities
            </p>
          </div>
          <Link
            to="/jobs"
            className="text-xs sm:text-sm font-semibold text-[#275df5] hover:text-blue-800 flex items-center gap-1 group"
          >
            <span>Browse all roles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roleCollections.map((role, i) => {
            const Icon = role.icon
            return (
              <div
                key={i}
                onClick={() => handleCategoryClick(role.keyword)}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-[#275df5] group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-[#275df5] transition-colors text-sm sm:text-base">
                      {role.name}
                    </h3>
                    <div className="text-xs font-semibold text-emerald-600 mt-0.5">{role.count}</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#275df5] group-hover:translate-x-1 transition-transform" />
              </div>
            )
          })}
        </div>
      </section>

      {/* SECTION 4: FEATURED JOBS FEED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Featured Job Opportunities
              </h2>
              <span className="bg-rose-50 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-200">
                Live &amp; Verified
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Hand-picked openings from premium enterprise hiring partners
            </p>
          </div>
          <Link
            to="/jobs"
            className="text-xs sm:text-sm font-semibold text-[#275df5] hover:text-blue-800 flex items-center gap-1 group"
          >
            <span>View all 50k+ jobs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {jobs.slice(0, 6).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 hover:border-blue-500 text-slate-800 hover:text-[#275df5] text-sm font-bold rounded-xl shadow-2xs transition-all"
          >
            <Briefcase className="w-4 h-4" />
            <span>Load More Verified Job Openings</span>
          </Link>
        </div>
      </section>

      {/* SECTION 5: FEATURED COMPANIES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Featured Companies Actively Hiring
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Explore culture reviews, salary scales, and direct application routes
            </p>
          </div>
          <Link
            to="/companies"
            className="text-xs sm:text-sm font-semibold text-[#275df5] hover:text-blue-800 flex items-center gap-1 group"
          >
            <span>Browse all employers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {companies.slice(0, 4).map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </section>

      {/* SECTION 6: INTERVIEW PREPARATION TEASER (Naukri AmbitionBox Pattern) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#275df5] mb-1">
                <HelpCircle className="w-4 h-4" />
                Interview Preparation Bank
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Frequently Asked Interview Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Real interview questions asked by hiring panels at Amazon, Google, TCS, and Tech Mahindra
              </p>
            </div>
            <Link
              to="/interview-prep"
              className="self-start md:self-auto text-xs sm:text-sm font-bold text-[#275df5] bg-white border border-slate-200 px-4 py-2 rounded-xl hover:border-blue-400 shadow-2xs transition-all"
            >
              Explore All 2,500+ Questions &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions.slice(0, 4).map((q) => (
              <div
                key={q.id}
                onClick={() => navigate('/interview-prep')}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={q.logo}
                      alt={q.company}
                      className="w-6 h-6 rounded-md object-cover border border-slate-200"
                    />
                    <span className="font-bold text-xs text-slate-900">{q.company}</span>
                    <span className="text-xs text-slate-400">&bull;</span>
                    <span className="text-xs text-slate-500">{q.role}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    q.difficulty === 'Easy'
                      ? 'bg-emerald-50 text-emerald-700'
                      : q.difficulty === 'Medium'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-rose-50 text-rose-700'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-800 text-sm group-hover:text-[#275df5] transition-colors line-clamp-2">
                  {q.question}
                </h3>
                <div className="flex items-center justify-between mt-3 text-[11px] text-slate-400">
                  <span>Asked {q.timesAsked} times in campus drives</span>
                  <span className="text-[#275df5] font-semibold flex items-center gap-1">
                    View Solution &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: ATS RESUME CHECKER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider">
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              Free Instant Diagnostic
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Test Your Resume Against Enterprise ATS Parsers
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              70% of resumes are rejected before human review due to incorrect formatting or missing keyword density. Upload your resume to get an instant ATS score and keyword gap analysis.
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Instant Score / 100</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Missing Skill Keywords</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>100% Free for Students</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <Link
              to="/resume-builder"
              className="block text-center bg-[#275df5] hover:bg-[#1f4ed8] text-white font-semibold text-sm px-7 py-3.5 rounded-xl shadow-sm transition-colors"
            >
              Check My Resume Score Free &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7.5: INTERACTIVE DEMO SANDBOX & WALL OF LOVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-[#0f172a] text-white rounded-2xl border border-slate-800 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm relative overflow-hidden">
          <div className="space-y-4 max-w-xl z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Zero-Login Interactive Sandbox
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Test Our Candidate Search &amp; AI ATS Live in Under 60 Seconds
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Experience how our pre-screened NCAT aptitude engine, scorecards, and Workday-compatible ATS parser work without entering a credit card or creating an account.
            </p>
            <div className="pt-2">
              <Link
                to="/product-tour"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#275df5] hover:bg-[#1f4ed8] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-colors"
              >
                Launch Interactive Tour <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="w-full md:w-auto bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-3 z-10 shrink-0">
            <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Trusted by 100,000+ Engineers</span>
              <Link to="/customers" className="text-blue-400 hover:underline">Wall of Love →</Link>
            </div>
            <div className="text-xs text-slate-400 italic">
              &quot;Cut our campus hiring cycle from 90 days to 3 weeks across 1,200+ hires.&quot;
            </div>
            <div className="text-[11px] font-bold text-slate-200">
              — Aditi Deshmukh, Head of Campus Recruiting @ Persistent Systems
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: RECRUITER CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#275df5] uppercase tracking-wider">
              For Employers &amp; Campus Placement Officers
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Looking to Hire Top Engineering &amp; Fresher Talent?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Post job openings, search our database of pre-assessed graduating candidates, and schedule campus interviews in minutes.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/pricing"
              className="px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
            >
              View Pricing
            </Link>
            <Link
              to="/post-job"
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#275df5] hover:bg-[#1f4ed8] rounded-xl shadow-sm transition-all"
            >
              Post a Job for Free &rarr;
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}


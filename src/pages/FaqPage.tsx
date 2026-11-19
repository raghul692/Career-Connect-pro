import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronDown,
  ChevronRight,
  Search
} from 'lucide-react'

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const [query, setQuery] = useState('')

  const faqs = [
    {
      category: 'For Candidates & Freshers',
      q: 'Is Career Connect Pro 100% free for college students and job seekers?',
      a: 'Yes, completely free. We never charge candidates any fees for creating profiles, applying to jobs, taking the NCAT diagnostic aptitude test, or downloading ATS resume scores. Career Connect Pro is funded strictly through enterprise employer recruitment packages.'
    },
    {
      category: 'For Candidates & Freshers',
      q: 'What is the NCAT assessment and how does it help me get placed?',
      a: 'NCAT (National Career Aptitude Test) is a standardized 3-part diagnostic covering Quantitative Aptitude, Logical Reasoning, and Core Data Structures. Over 250+ enterprise partner companies use NCAT scores to bypass initial GPA/college cutoffs and directly offer technical interview rounds.'
    },
    {
      category: 'For Candidates & Freshers',
      q: 'How does the AI ATS Resume Checker calculate my score?',
      a: 'Our diagnostic engine parses your resume in the exact same manner as Workday, Taleo, and Greenhouse ATS engines. It evaluates single-column machine readability, scans for required keyword density (e.g. React, TypeScript, Java), and measures the density of measurable impact metrics in project descriptions.'
    },
    {
      category: 'For Candidates & Freshers',
      q: 'How do I know if an employer has viewed or shortlisted my application?',
      a: 'Your Candidate Dashboard features a real-time status tracker with verified milestones: "Applied", "Resume Delivered & Viewed", "Shortlisted", and "Interview Scheduled". You also receive instant WhatsApp/email notifications when a recruiter triggers a status change.'
    },
    {
      category: 'Trust, Safety & Security',
      q: 'What should I do if a recruiter asks me for money or registration fees?',
      a: 'NEVER pay any money. Legitimate companies never charge fees for interviews, training materials, or uniform/laptop deposits. If anyone claiming to represent a company demands payment, report them immediately via our Fraud Alert page. We ban and blacklist verified imposters within 15 minutes.'
    },
    {
      category: 'For Recruiters & Employers',
      q: 'How can our company post jobs and access pre-screened fresher candidates?',
      a: 'Employers can register a verified recruiter account, choose our Campus Free plan or Pro Growth tier, and publish openings within 2 minutes. You can also filter candidates by NCAT percentile scores and export candidate profiles to CSV.'
    }
  ]

  const filtered = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(query.toLowerCase()) ||
      f.a.toLowerCase().includes(query.toLowerCase()) ||
      f.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">Help Center & FAQ</span>
      </nav>

      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
          Knowledge Base & Help Center
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Everything you need to know about job applications, NCAT assessments, ATS scoring, and recruiter verification.
        </p>

        {/* Search Input */}
        <div className="max-w-md mx-auto pt-2">
          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search questions (e.g. NCAT, fees, ATS, refund)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-xs text-slate-800 focus:outline-none bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filtered.map((faq, idx) => {
          const isOpen = openIdx === idx
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:border-indigo-300 transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                    {faq.category}
                  </span>
                  <span className="font-bold text-sm text-slate-900">{faq.q}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                    isOpen ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Bottom Helpdesk card */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center space-y-2">
        <h4 className="font-bold text-sm text-slate-900">Still have questions?</h4>
        <p className="text-xs text-slate-500">Our candidate & recruiter support desk is available 6 days a week.</p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-indigo-700 transition-colors"
          >
            <span>Contact Support Desk</span>
          </Link>
        </div>
      </div>

    </div>
  )
}


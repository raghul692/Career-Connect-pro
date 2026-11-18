import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, ChevronRight } from 'lucide-react'

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">Terms of Service</span>
      </nav>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
        
        <div className="space-y-2 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            User Agreement & Recruiter Guidelines
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-400">Effective Date: 01 November 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
          
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing or creating an account on Career Connect Pro, you agree to comply with and be bound by these Terms of Service. If you disagree with any portion of these terms, you must discontinue platform use immediately.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Candidate Code of Conduct</h2>
            <p>
              Candidates agree to submit accurate, authentic educational qualifications and work history. Misrepresenting academic degrees, fabricating work certificates, or submitting plagiarized project repositories constitutes grounds for immediate account suspension.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Employer & Recruiter Obligations</h2>
            <p>
              Recruiting entities must post legitimate, bona fide vacancies with accurate compensation disclosures. Employers are strictly prohibited from:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Charging candidates any form of application, interview, or onboarding fee.</li>
              <li>Posting deceptive multi-level marketing (MLM) schemes or commission-only roles masked as salaried jobs.</li>
              <li>Re-selling candidate resumes or personal contact numbers to external third parties.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Intellectual Property</h2>
            <p>
              All proprietary algorithms, UI architectures, NCAT assessment question banks, and design tokens of Career Connect Pro are protected by copyright and intellectual property laws.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">5. Limitation of Liability & Dispute Resolution</h2>
            <p>
              Career Connect Pro acts as an intermediary discovery platform. We do not guarantee employment or hiring offers. Any legal disputes shall be subject to the exclusive jurisdiction of the courts of Chennai/Bengaluru, India.
            </p>
          </section>

        </div>

      </div>
    </div>
  )
}


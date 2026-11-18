import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Lock, ChevronRight, FileText } from 'lucide-react'

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">Privacy Policy</span>
      </nav>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
        
        <div className="space-y-2 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            DPDP Act 2023 & GDPR Compliant
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Privacy Policy & Data Protection
          </h1>
          <p className="text-xs text-slate-400">Last updated: 01 November 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
          
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Introduction & Scope</h2>
            <p>
              Career Connect Pro (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting the privacy and personal data of job seekers, college students, and recruiting organizations. This Privacy Policy governs our data handling practices across our web platform and affiliated services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Information We Collect</h2>
            <p>
              When you register as a candidate, we collect personal identity attributes including your name, college email address, contact telephone number, academic history (institution, CGPA, graduation batch), employment records, skills proficiencies, and uploaded resume files (PDF/DOCX).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Purpose and Use of Data</h2>
            <p>
              Your personal data is utilized strictly to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Process your job applications and deliver candidate dossiers to verified recruiters.</li>
              <li>Perform automated AI ATS scoring to identify formatting errors and skill gaps.</li>
              <li>Administer the NCAT diagnostic aptitude assessments and issue verified score percentiles.</li>
              <li>Deliver automated job alerts matching your stated career preferences.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Third-Party Sharing and Disclosures</h2>
            <p>
              We do <strong>NOT</strong> sell, rent, or trade candidate personal data to advertisers, telemarketers, or unverified brokers. Your resume is disclosed to an employer only when you explicitly submit an application or opt-in to verified recruiter discovery.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">5. Candidate Data Rights</h2>
            <p>
              Under India&apos;s Digital Personal Data Protection Act (DPDP Act 2023) and GDPR, you retain the permanent right to request a complete export of your personal data, rectify inaccuracies, or delete your account and associated resumes permanently.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">6. Grievance Officer Contact</h2>
            <p>
              For privacy inquiries or data removal requests, contact our designated Data Protection Officer at <code>privacy@careerconnectpro.in</code>.
            </p>
          </section>

        </div>

      </div>
    </div>
  )
}


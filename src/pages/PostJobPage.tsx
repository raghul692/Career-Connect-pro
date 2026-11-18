import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Briefcase,
  Building2,
  MapPin,
  IndianRupee,
  CheckCircle2,
  ChevronRight,
  Send,
  Sparkles
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'
import { WorkMode, CompanyType } from '../types'

export const PostJobPage: React.FC = () => {
  const { postNewJob, showNotification } = useJobContext()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&h=128&fit=crop&crop=faces',
    rating: 4.0,
    reviewCount: 1200,
    experience: '0-2 Yrs',
    minExp: 0,
    maxExp: 2,
    salary: '₹6.00 - ₹10.00 LPA',
    minSalaryLakhs: 6,
    maxSalaryLakhs: 10,
    location: 'Bengaluru, Hyderabad, Remote',
    workMode: 'Hybrid' as WorkMode,
    department: 'Software & QA',
    companyType: 'Indian MNC' as CompanyType,
    description: '',
    responsibilities: '',
    mandatorySkills: 'React, TypeScript, Tailwind CSS, REST APIs',
    secondarySkills: 'Git, Docker, Jest',
    openings: 5,
    education: 'B.Tech / B.E. / BCA / MCA (2025/2026 Batch)'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.company || !formData.description) {
      showNotification('Please fill in all required fields.')
      return
    }

    const respArray = formData.responsibilities
      ? formData.responsibilities.split('\n').filter((r) => r.trim().length > 0)
      : [
          'Design and build high-performance user interfaces and backend APIs.',
          'Collaborate in agile sprints, write clean unit tests, and maintain CI/CD pipelines.',
          'Participate in architecture reviews and code quality audits.'
        ]

    const mandSkillsArray = formData.mandatorySkills
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)

    const secSkillsArray = formData.secondarySkills
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)

    postNewJob({
      ...formData,
      responsibilities: respArray,
      mandatorySkills: mandSkillsArray,
      secondarySkills: secSkillsArray,
      urgentHiring: true,
      featured: true,
      verifiedRecruiter: true
    })

    navigate('/jobs')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/employers" className="hover:text-indigo-600 transition-colors">Employers</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">Post a Job Opening</span>
      </nav>

      {/* Header Card */}
      <div className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-emerald-300 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Recruiter Self-Service Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Post an Opening on Career Connect Pro
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Your posting will immediately be broadcast to over 100,000+ verified engineering students, fresh graduates, and active job seekers.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
        
        {/* Section 1: Basic Information */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            1. Role & Employer Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Job Title *</label>
              <input
                type="text"
                required
                placeholder="E.g. Graduate Trainee Engineer / React Developer"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Hiring Company Name *</label>
              <input
                type="text"
                required
                placeholder="E.g. Persistent Systems, Zoho, Tech Mahindra"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Work Location(s) *</label>
              <input
                type="text"
                required
                placeholder="E.g. Chennai, Bengaluru, Pune, Hyderabad, Remote"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Work Mode *</label>
              <select
                value={formData.workMode}
                onChange={(e) => setFormData({ ...formData, workMode: e.target.value as WorkMode })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium cursor-pointer"
              >
                <option value="Hybrid">Hybrid (2-3 days office)</option>
                <option value="Remote">100% Remote (Work from anywhere)</option>
                <option value="Work from office">Work from office</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Compensation & Criteria */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            2. Compensation & Candidate Criteria
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Salary Range (CTC) *</label>
              <input
                type="text"
                required
                placeholder="E.g. ₹6.00 - ₹10.00 LPA"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Experience Bracket</label>
              <input
                type="text"
                placeholder="E.g. 0-2 Yrs or 0 Yrs (Freshers)"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Number of Openings</label>
              <input
                type="number"
                min="1"
                value={formData.openings}
                onChange={(e) => setFormData({ ...formData, openings: Number(e.target.value) })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
              >
                <option value="Software & QA">Software & QA</option>
                <option value="Hardware & Networks">Hardware & Networks</option>
                <option value="IT & Information Security">IT & Information Security</option>
                <option value="Analytics & Data Science">Analytics & Data Science</option>
              </select>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-bold text-slate-700">Education & Eligibility Requirements</label>
              <input
                type="text"
                placeholder="E.g. B.Tech / B.E. / BCA / MCA (2025/2026 Batch)"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Skills & Description */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            3. Skills & Job Description
          </h2>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Mandatory Skills (Comma separated) *</label>
              <input
                type="text"
                required
                placeholder="React, TypeScript, Tailwind CSS, Node.js"
                value={formData.mandatorySkills}
                onChange={(e) => setFormData({ ...formData, mandatorySkills: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Overview / Job Summary *</label>
              <textarea
                required
                rows={3}
                placeholder="Provide a summary of the role, team culture, and growth opportunities..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Key Responsibilities (One per line)</label>
              <textarea
                rows={4}
                placeholder="Write unit tests and maintain frontend performance...&#10;Collaborate with product designers on user feedback...&#10;Deploy code to AWS microservices..."
                value={formData.responsibilities}
                onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
          <Link
            to="/jobs"
            className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-indigo-100 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Publish Job Opening Now
          </button>
        </div>

      </form>
    </div>
  )
}


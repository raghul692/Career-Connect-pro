import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Briefcase,
  User,
  Mail,
  Lock,
  Phone,
  Upload,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  GraduationCap
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'

export const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<'student' | 'experienced' | 'recruiter'>('student')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [resumeUploaded, setResumeUploaded] = useState(false)
  const { updateProfile, showNotification } = useJobContext()
  const navigate = useNavigate()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({
      name: fullName || 'New Candidate',
      email: email || 'candidate@college.edu',
      phone: phone || '+91 98765 00000',
      experienceLevel: role === 'student' ? 'Fresher' : '1-2 Years'
    })
    showNotification(`Account created successfully! Welcome to Career Connect Pro.`)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
        
        {/* LEFT COLUMN: BRAND HIGHLIGHTS */}
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white p-8 sm:p-12 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white">
                CareerConnect<span className="text-indigo-400">Pro</span>
              </span>
            </Link>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Create Your Verified Candidate Profile.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Join 100,000+ ambitious graduates and tech professionals. Apply with one click and get matched directly by enterprise recruiters.
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Free for College Students & Freshers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Free ATS Resume Diagnostic & Score</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant alerts for matching campus drives</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: REGISTRATION FORM */}
        <div className="p-8 sm:p-10 space-y-5">
          
          <div>
            <h3 className="text-xl font-bold text-slate-900">Create New Account</h3>
            <p className="text-xs text-slate-500 mt-1">Select your profile type to customize your recommendations</p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold text-center">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                role === 'student' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              🎓 Student / Fresher
            </button>
            <button
              type="button"
              onClick={() => setRole('experienced')}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                role === 'experienced' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Experienced
            </button>
            <button
              type="button"
              onClick={() => setRole('recruiter')}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                role === 'recruiter' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Recruiter
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-3 text-xs">
            
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Full Legal Name *</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  required
                  placeholder="E.g. Karthik Subramanian"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs text-slate-800 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">College / Personal Email *</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="email"
                  required
                  placeholder="name@college.edu or name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs text-slate-800 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Mobile Number (For WhatsApp Alerts) *</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs text-slate-800 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Create Secure Password *</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="password"
                  required
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs text-slate-800 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Resume Upload on Register */}
            <div className="pt-1">
              <label className="flex items-center justify-between p-3 border border-dashed border-slate-300 hover:border-indigo-400 bg-slate-50 rounded-xl cursor-pointer">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-indigo-500" />
                  <span className="text-slate-700 font-medium">
                    {resumeUploaded ? 'Resume attached (PDF)' : 'Attach Resume (Optional for now)'}
                  </span>
                </div>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={() => setResumeUploaded(true)}
                  className="hidden"
                />
                {resumeUploaded && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Register for Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-bold hover:underline">
              Sign In
            </Link>
          </div>

        </div>

      </div>
    </div>
  )
}


import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Briefcase,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'

export const LoginPage: React.FC = () => {
  const [role, setRole] = useState<'candidate' | 'recruiter'>('candidate')
  const [email, setEmail] = useState('karthik.subramanian@college.edu')
  const [password, setPassword] = useState('password123')
  const [useOtp, setUseOtp] = useState(false)
  const { showNotification } = useJobContext()
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    showNotification(`Welcome back, ${role === 'candidate' ? 'Karthik' : 'Recruiter Partner'}!`)
    navigate(role === 'candidate' ? '/dashboard' : '/employers')
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
        
        {/* LEFT COLUMN: BRAND PROOF & TESTIMONIAL */}
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
              One account for 50,000+ tech openings.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Log in to track your job applications, view who downloaded your resume, and check test results.
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct access to 2,500+ verified enterprise hiring portals</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Real-time recruiter application status updates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Free instant ATS Resume review score</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LOGIN FORM */}
        <div className="p-8 sm:p-10 space-y-6 flex flex-col justify-center">
          
          {/* Role selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setRole('candidate')}
              className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                role === 'candidate' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Job Seeker
            </button>
            <button
              type="button"
              onClick={() => setRole('recruiter')}
              className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                role === 'recruiter' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Recruiter / Employer
            </button>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {role === 'candidate' ? 'Job Seeker Sign In' : 'Recruiter Portal Login'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">Enter your registered email address to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Email Address</label>
              <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-indigo-500">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs text-slate-800 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {!useOtp ? (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-700">Password</label>
                  <Link to="/forgot-password" className="text-xs text-indigo-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-indigo-500">
                  <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs text-slate-800 bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-semibold">
                An instant OTP will be sent to your email and phone upon submitting.
              </div>
            )}

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={() => setUseOtp(!useOtp)}
                className="text-xs text-indigo-600 hover:underline font-semibold cursor-pointer"
              >
                {useOtp ? 'Sign in with Password instead' : 'Use One-Time OTP Login'}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign In to Career Connect</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-indigo-600 font-bold hover:underline">
              Create an account for free
            </Link>
          </div>

        </div>

      </div>
    </div>
  )
}


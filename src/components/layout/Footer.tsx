import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Briefcase,
  ShieldCheck,
  Mail,
  CheckCircle2,
  Lock,
  Heart
} from 'lucide-react'
import { BrandLogo } from '../common/BrandLogo'

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm mt-auto">
      
      {/* Top Banner: Fraud Warning Bar (Naukri Pattern) */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong className="text-slate-200">Security Advisory:</strong> Career Connect Pro never charges any fees for job applications or interviews. Beware of fraudsters.
            </span>
          </div>
          <Link
            to="/fraud-alert"
            className="text-indigo-400 hover:text-indigo-300 underline font-medium shrink-0"
          >
            Report Fraud & Imposters &rarr;
          </Link>
        </div>
      </div>

      {/* Main Footer Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          
          {/* Col 1: Brand Info & Newsletter (Spans 2 cols on LG) */}
          <div className="col-span-2 space-y-4">
            <BrandLogo size="md" inverted={true} showTagline={true} />
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              India&apos;s fastest growing career network for students, fresh graduates, and experienced engineers. Connecting 100,000+ candidates with verified global enterprises and unicorn startups.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                Subscribe to Daily Freshers Job Digest
              </div>
              {subscribed ? (
                <div className="text-xs font-medium text-emerald-400 flex items-center gap-1.5 bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800">
                  <CheckCircle2 className="w-4 h-4" />
                  Subscribed! Check your inbox for verified openings.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter college email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-800/90 border border-slate-700 text-slate-100 text-xs rounded-lg px-3 py-2 w-full focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3 py-2 rounded-lg shrink-0 transition-colors cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-2">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              256-bit SSL encrypted &middot; ISO 27001 Certified
            </div>
          </div>

          {/* Col 2: Job Seekers */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-100">Job Seekers</div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/jobs" className="hover:text-white transition-colors">Search All Jobs</Link></li>
              <li><Link to="/jobs/freshers" className="hover:text-white transition-colors text-emerald-400 font-medium">Freshers Hub (0 Exp)</Link></li>
              <li><Link to="/jobs/remote" className="hover:text-white transition-colors">Remote Jobs in India</Link></li>
              <li><Link to="/jobs/internships" className="hover:text-white transition-colors">College Internships</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Applied Jobs Tracker</Link></li>
              <li><Link to="/profile" className="hover:text-white transition-colors">Candidate Profile</Link></li>
            </ul>
          </div>

          {/* Col 3: Campus & Freshers */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-100">Campus & Students</div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/campus" className="hover:text-white transition-colors font-medium text-indigo-400">Campus Hub</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors text-amber-400 font-medium">FastForward Services</Link></li>
              <li><Link to="/campus/contests" className="hover:text-white transition-colors">National Hackathons</Link></li>
              <li><Link to="/campus/tests" className="hover:text-white transition-colors">NCAT Aptitude Assessment</Link></li>
              <li><Link to="/interview-prep" className="hover:text-white transition-colors">Company Interview Q&A</Link></li>
              <li><Link to="/resume-builder" className="hover:text-white transition-colors">Free ATS Resume Checker</Link></li>
              <li><Link to="/salaries" className="hover:text-white transition-colors">Salary Insights & Benchmarks</Link></li>
              <li><Link to="/career-advice" className="hover:text-white transition-colors">Placement Guides & Blog</Link></li>
            </ul>
          </div>

          {/* Col 4: Employers & Enterprise */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-100">Enterprise SaaS</div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/features" className="hover:text-white transition-colors">Features & Solutions</Link></li>
              <li><Link to="/product-tour" className="hover:text-white transition-colors text-amber-400 font-medium">Interactive Demo</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing & Plans</Link></li>
              <li><Link to="/integrations" className="hover:text-white transition-colors">Integrations Directory</Link></li>
              <li><Link to="/customers" className="hover:text-white transition-colors">Customer Case Studies</Link></li>
              <li><Link to="/app" className="hover:text-white transition-colors text-indigo-400 font-bold">Enterprise Console</Link></li>
              <li><Link to="/contact-sales" className="hover:text-white transition-colors font-medium">Book a Demo</Link></li>
            </ul>
          </div>

          {/* Col 5: Developers & Trust */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-100">Dev & Reliability</div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/developer/docs" className="hover:text-white transition-colors">REST API Docs</Link></li>
              <li><Link to="/developer/api-keys" className="hover:text-white transition-colors">API Keys & Tokens</Link></li>
              <li><Link to="/developer/webhooks" className="hover:text-white transition-colors">Webhooks Engine</Link></li>
              <li><Link to="/changelog" className="hover:text-white transition-colors">Product Changelog</Link></li>
              <li><Link to="/security/ssl" className="hover:text-white transition-colors text-slate-300">SSL/TLS Security</Link></li>
              <li><Link to="/status" className="hover:text-white transition-colors text-emerald-400 font-medium">System Status (99.98%)</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">We're Hiring!</Link></li>
            </ul>
          </div>

          {/* Col 6: Company & Legal */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-100">Trust & Legal</div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact & Support</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Help Center & FAQ</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/fraud-alert" className="hover:text-white transition-colors text-amber-400 font-medium">Fraud Alert & Safety</Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors">Security Standards</Link></li>
              <li><Link to="/unsubscribe" className="hover:text-white transition-colors">Email Preferences</Link></li>
              <li>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-a11y-modal'))}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Accessibility Options
                </button>
              </li>
              <li><Link to="/sitemap" className="hover:text-white transition-colors text-slate-300 font-medium">Complete Sitemap</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Career Connect Pro Pvt Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Indian Students, Engineers & Recruiters</span>
          </div>
        </div>

      </div>
    </footer>
  )
}


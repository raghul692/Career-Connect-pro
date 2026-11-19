import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  ChevronRight,
  Building2
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'

export const ContactPage: React.FC = () => {
  const { showNotification } = useJobContext()
  const [submitted, setSubmitted] = useState(false)
  const [ticketId, setTicketId] = useState('84920')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Candidate Support',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTicketId(String(Math.floor(Math.random() * 90000 + 10000)))
    setSubmitted(true)
    showNotification('Inquiry received! A support representative will respond within 24 hours.')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">Contact & Support</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          How Can We Help You Today?
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Whether you are a student preparing for campus drives, an employer posting a vacancy, or reporting a fraudulent recruiter, our team is here for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Send an Inquiry or Support Request
          </h2>

          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-emerald-900">Message Delivered Successfully</h3>
              <p className="text-xs text-emerald-700 max-w-md mx-auto">
                Ticket #CCP-{ticketId} has been logged. Our priority response team will reach out to {formData.email}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-emerald-800 underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Karthik S"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@college.edu or name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Department / Nature of Request</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
                  >
                    <option value="Candidate Support">Candidate Placement & Application Help</option>
                    <option value="Campus Placement Partnerships">College Placement Cell Partnership</option>
                    <option value="Employer Hiring Plans">Recruiter & Employer Account Inquiries</option>
                    <option value="Fraud & Safety Report">Report Fake Job or Fraudulent Recruiter</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="Summary of your inquiry..."
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Detailed Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your question or issue in detail..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Support Ticket
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Office Locations & Hotlines */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900">Direct Support Channels</h3>
            
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <Mail className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">Candidate Email</div>
                  <div className="text-slate-500">support@careerconnectpro.in</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <Building2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">Recruiter Support</div>
                  <div className="text-slate-500">hiring@careerconnectpro.in</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <Phone className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">Toll-Free Helpline</div>
                  <div className="text-slate-500">1800-419-2026 (Mon-Sat, 9AM-7PM IST)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Tech Hubs */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-sm text-slate-900">Regional Technology Hubs</h3>
            
            <div className="space-y-2 text-slate-600">
              <div>
                <strong className="text-slate-800 block">Bengaluru HQ</strong>
                <span>Tech Park, Outer Ring Road, Bellandur, Bengaluru 560103</span>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <strong className="text-slate-800 block">Chennai Campus Hub</strong>
                <span>Tidel Park, Rajiv Gandhi Salai (OMR), Taramani, Chennai 600113</span>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <strong className="text-slate-800 block">Pune Operations</strong>
                <span>Magarpatta Cybercity, Hadapsar, Pune 411028</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}


import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Code2,
  FileCheck2,
  ExternalLink,
  GitBranch,
  Plus,
  X,
  Save,
  CheckCircle2,
  ChevronRight
} from 'lucide-react'
import { useJobContext } from '../context/JobContext'

export const ProfilePage: React.FC = () => {
  const { userProfile, updateProfile, showNotification } = useJobContext()
  const [isEditing, setIsEditing] = useState(false)
  const [newSkill, setNewSkill] = useState('')

  // Local form state
  const [formData, setFormData] = useState({
    name: userProfile.name,
    headline: userProfile.headline,
    bio: userProfile.bio,
    phone: userProfile.phone,
    location: userProfile.location,
    skills: [...userProfile.skills]
  })

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }))
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove)
    }))
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile(formData)
    setIsEditing(false)
    showNotification('Profile information saved!')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">Candidate Profile</span>
      </nav>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Header Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-700 to-blue-600 text-white flex items-center justify-center font-black text-3xl shadow-md">
                {formData.name[0]}
              </div>
              <div className="space-y-1.5">
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="text-xl font-bold text-slate-900 border border-slate-300 rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500 w-full"
                  />
                ) : (
                  <h1 className="text-2xl font-black text-slate-900">{formData.name}</h1>
                )}

                {isEditing ? (
                  <input
                    type="text"
                    value={formData.headline}
                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                    className="text-xs text-slate-600 border border-slate-300 rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500 w-full"
                  />
                ) : (
                  <p className="text-xs text-slate-600">{formData.headline}</p>
                )}

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                    {formData.location}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {userProfile.email}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {formData.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Toggle Edit Button */}
            <div>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Changes
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer"
                >
                  Edit Profile
                </button>
              )}
            </div>

          </div>

          {/* Bio */}
          <div className="border-t border-slate-100 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">About & Summary</h3>
            {isEditing ? (
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full text-xs text-slate-700 p-2 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed">{formData.bio}</p>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-600" />
              Technical Skills & Proficiencies
            </h3>
            <span className="text-xs text-slate-400 font-medium">{formData.skills.length} skills listed</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-indigo-200 flex items-center gap-1.5"
              >
                {skill}
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-indigo-400 hover:text-indigo-700 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
          </div>

          {isEditing && (
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                placeholder="Add a new skill (e.g. Docker, GraphQL, Kubernetes)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-500 w-64"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Skill
              </button>
            </div>
          )}
        </div>

        {/* Education Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            Education History
          </h3>

          <div className="space-y-4">
            {userProfile.education.map((edu, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{edu.degree}</h4>
                  <div className="text-xs text-slate-600 mt-0.5">{edu.college}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{edu.year}</div>
                </div>
                <span className="text-xs font-extrabold text-indigo-700 bg-indigo-100/70 px-2.5 py-1 rounded-lg">
                  {edu.grade}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-600" />
            Featured Software Projects
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userProfile.projects.map((proj, idx) => (
              <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <h4 className="font-bold text-sm text-slate-900">{proj.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.map((tech, i) => (
                    <span key={i} className="text-[10px] font-semibold bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-2 text-xs">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-600 hover:text-indigo-600 font-semibold flex items-center gap-1"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      Repository
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:underline font-semibold flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Attachment Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900">{userProfile.resumeName}</div>
              <div className="text-xs text-slate-400">Default resume for one-click application submission</div>
            </div>
          </div>
          <Link
            to="/resume-builder"
            className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-xs font-bold transition-colors"
          >
            Check ATS Score & Replace
          </Link>
        </div>

      </form>
    </div>
  )
}

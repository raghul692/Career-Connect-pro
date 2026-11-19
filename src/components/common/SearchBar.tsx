import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Briefcase, ChevronDown, X } from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

interface SearchBarProps {
  compact?: boolean
  initialKeyword?: string
  initialLocation?: string
}

const POPULAR_SUGGESTIONS = [
  { text: 'Full Stack Developer', category: 'Role' },
  { text: 'Frontend Developer (React)', category: 'Skill' },
  { text: 'Backend Developer (Java/Spring Boot)', category: 'Skill' },
  { text: 'Data Scientist & AI/ML Engineer', category: 'Role' },
  { text: 'DevOps & Cloud Engineer (AWS)', category: 'Skill' },
  { text: 'Graduate Engineer Trainee (Fresher)', category: 'Campus' },
  { text: 'Razorpay Technologies', category: 'Company' },
  { text: 'Tech Mahindra', category: 'Company' },
  { text: 'Persistent Systems', category: 'Company' },
  { text: 'Zoho Corporation', category: 'Company' }
]

const METRO_LOCATIONS = [
  'Bengaluru / Bangalore',
  'Delhi / NCR (Gurugram, Noida)',
  'Mumbai / Navi Mumbai',
  'Hyderabad / Secunderabad',
  'Pune',
  'Chennai',
  'Remote (Work from Home)'
]

export const SearchBar: React.FC<SearchBarProps> = ({
  compact = false,
  initialKeyword = '',
  initialLocation = ''
}) => {
  const [keyword, setKeyword] = useState(initialKeyword)
  const [location, setLocation] = useState(initialLocation)
  const [experience, setExperience] = useState('all')
  const [isSuggestorOpen, setIsSuggestorOpen] = useState(false)
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const { setFilters } = useJobContext()
  const navigate = useNavigate()

  const suggestorRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)

  // Filter autocomplete based on input
  const filteredSuggestions = keyword.trim()
    ? POPULAR_SUGGESTIONS.filter((s) => s.text.toLowerCase().includes(keyword.toLowerCase()))
    : POPULAR_SUGGESTIONS.slice(0, 6)

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestorRef.current && !suggestorRef.current.contains(e.target as Node)) {
        setIsSuggestorOpen(false)
      }
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setIsLocationOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSuggestorOpen(false)
    setIsLocationOpen(false)
    setFilters((prev) => ({
      ...prev,
      keyword,
      location,
      experience
    }))
    navigate('/jobs')
  }

  const handleSelectSuggestion = (text: string) => {
    setKeyword(text)
    setIsSuggestorOpen(false)
  }

  const handleSelectLocation = (loc: string) => {
    setLocation(loc)
    setIsLocationOpen(false)
  }

  return (
    <div className={`relative ${compact ? 'max-w-4xl mx-auto' : 'w-full'}`}>
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl md:rounded-full shadow-md shadow-slate-900/5 border border-slate-300 p-2 sm:p-2.5 transition-all flex flex-col md:flex-row items-stretch md:items-center gap-1.5 md:gap-0"
      >
        {/* Field 1: Skills / Titles / Companies with Suggestor */}
        <div ref={suggestorRef} className="relative flex-1 flex items-center gap-2.5 px-4 py-2.5 border-b md:border-b-0 md:border-r border-slate-200/80">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            placeholder="Enter skills / designations / companies"
            value={keyword}
            onFocus={() => setIsSuggestorOpen(true)}
            onChange={(e) => {
              setKeyword(e.target.value)
              setIsSuggestorOpen(true)
            }}
            className="w-full text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none bg-transparent"
          />
          {keyword && (
            <button
              type="button"
              onClick={() => setKeyword('')}
              className="p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Autocomplete Suggestor Dropdown */}
          {isSuggestorOpen && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-lg border border-slate-200 p-2 z-40 space-y-0.5 animate-in fade-in slide-in-from-top-1">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Trending Searches</span>
                <span className="text-blue-600">Naukri Intelligence</span>
              </div>
              {filteredSuggestions.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSuggestion(item.text)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-blue-50/60 transition-colors text-xs text-slate-700 cursor-pointer group"
                >
                  <span className="font-semibold group-hover:text-blue-700">{item.text}</span>
                  <span className="text-[10px] font-medium text-slate-400 bg-slate-100 group-hover:bg-blue-100 group-hover:text-blue-700 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Field 2: Experience Selector */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b md:border-b-0 md:border-r border-slate-200/80 relative min-w-[190px]">
          <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full text-xs sm:text-sm text-slate-800 focus:outline-none bg-transparent cursor-pointer appearance-none pr-6 font-semibold"
          >
            <option value="all">Select experience</option>
            <option value="fresher">🎓 Fresher (0 Yrs)</option>
            <option value="1-2">1 - 2 Years</option>
            <option value="3-5">3 - 5 Years</option>
            <option value="5+">5+ Years</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 pointer-events-none" />
        </div>

        {/* Field 3: Location with Metro Suggestions */}
        <div ref={locationRef} className="relative flex-1 flex items-center gap-2.5 px-4 py-2.5">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onFocus={() => setIsLocationOpen(true)}
            onChange={(e) => {
              setLocation(e.target.value)
              setIsLocationOpen(true)
            }}
            className="w-full text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none bg-transparent"
          />
          {location && (
            <button
              type="button"
              onClick={() => setLocation('')}
              className="p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Location Dropdown */}
          {isLocationOpen && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-lg border border-slate-200 p-2 z-40 space-y-0.5 animate-in fade-in slide-in-from-top-1">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Top Hiring Metros
              </div>
              {METRO_LOCATIONS.map((loc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectLocation(loc)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left hover:bg-blue-50/60 transition-colors text-xs text-slate-700 cursor-pointer font-medium"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{loc}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Pill CTA Button */}
        <div className="p-1 sm:p-0 sm:pr-1 shrink-0">
          <button
            type="submit"
            className="w-full md:w-auto px-7 py-3 bg-[#275df5] hover:bg-[#1e4ed8] text-white rounded-full font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  )
}

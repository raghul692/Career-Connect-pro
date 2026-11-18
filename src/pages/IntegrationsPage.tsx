import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Plug,
  Search,
  CheckCircle2,
  ExternalLink,
  Plus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react'
import { INITIAL_INTEGRATIONS } from '../data/mockData'
import { useJobContext } from '../context/JobContext'

export const IntegrationsPage: React.FC = () => {
  const { showNotification } = useJobContext()
  const [integrations, setIntegrations] = useState(INITIAL_INTEGRATIONS)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['all', 'ATS', 'Communication', 'Sourcing', 'HRIS', 'Productivity']

  const toggleConnect = (id: string, name: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, connected: !item.connected } : item
      )
    )
    const isNowConnected = !integrations.find((i) => i.id === id)?.connected
    showNotification(
      isNowConnected
        ? `${name} integration successfully connected to workspace!`
        : `${name} disconnected from workspace.`
    )
  }

  const filtered = integrations.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 font-semibold text-xs">
            <Plug className="w-3.5 h-3.5" />
            Ecosystem Directory
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Connect With Your Existing HR & Engineering Stack
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Career Connect Pro seamlessly integrates with Workday, Greenhouse, Slack, GitHub, and Stripe with zero-code setup.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search integrations (e.g. Slack, Greenhouse, GitHub)..."
                className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Integrations' : cat}
            </button>
          ))}
        </div>

        {/* Integration Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <img
                    src={app.logo}
                    alt={app.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                  />
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {app.category}
                    </span>
                    {app.connected ? (
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Connected
                      </span>
                    ) : null}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900">{app.name}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{app.description}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{app.rating}</span>
                  <span className="text-slate-400">({app.reviewsCount})</span>
                </div>

                <button
                  onClick={() => toggleConnect(app.id, app.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    app.connected
                      ? 'bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  }`}
                >
                  {app.connected ? 'Disconnect' : 'Connect App'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Developer API CTA Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Need a custom integration for your internal portal?</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Use our full-featured REST API with webhook event subscriptions to build bespoke hiring pipelines.
            </p>
          </div>
          <Link
            to="/developer/docs"
            className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm rounded-xl shrink-0 transition-colors flex items-center gap-2"
          >
            Explore Developer Docs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}


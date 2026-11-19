import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Gauge,
  ShieldAlert,
  Play,
  RotateCcw,
  Activity,
  Server,
  Zap,
  ChevronRight,
  Flame
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

interface RateTier {
  name: string
  ratePerMinute: number
  burstAllowance: number
  quotaPeriod: string
  description: string
  activeUsers: string
}

const DEFAULT_TIERS: RateTier[] = [
  {
    name: 'Public / Anonymous',
    ratePerMinute: 60,
    burstAllowance: 15,
    quotaPeriod: 'Per IP / Rolling 60s',
    description: 'Applied to unauthenticated job searches and landing page queries to prevent aggressive web scrapers.',
    activeUsers: '14,800 active IPs'
  },
  {
    name: 'Verified Candidates',
    ratePerMinute: 180,
    burstAllowance: 40,
    quotaPeriod: 'Per Candidate JWT / 60s',
    description: 'Allows rapid job bookmarking, resume ATS scoring, and NCAT test submission without friction.',
    activeUsers: '89,400 sessions'
  },
  {
    name: 'Enterprise Recruiters',
    ratePerMinute: 1200,
    burstAllowance: 200,
    quotaPeriod: 'Per Organization / 60s',
    description: 'High-throughput access for bulk applicant CSV ingestion, candidate filtering, and interview scheduling.',
    activeUsers: '340 organizations'
  },
  {
    name: 'ATS Webhooks & Partner APIs',
    ratePerMinute: 6000,
    burstAllowance: 800,
    quotaPeriod: 'Per API Key / 60s',
    description: 'Dedicated high-capacity pipe for Workday, Greenhouse, SAP SuccessFactors synchronization.',
    activeUsers: '58 integrations'
  }
]

export const RateLimitConfigPage: React.FC = () => {
  const { showNotification } = useJobContext()
  const [tiers, setTiers] = useState<RateTier[]>(DEFAULT_TIERS)
  const [selectedTierIndex, setSelectedTierIndex] = useState(0)

  // Interactive Token Bucket Simulator State
  const [bucketCapacity, setBucketCapacity] = useState(60)
  const [currentTokens, setCurrentTokens] = useState(60)
  const [requestSurgeRate, setRequestSurgeRate] = useState(45)
  const [isSimulating, setIsSimulating] = useState(false)
  const [droppedRequests, setDroppedRequests] = useState(0)
  const [processedRequests, setProcessedRequests] = useState(0)

  // Token bucket refill loop when simulating
  useEffect(() => {
    let interval: any = null
    if (isSimulating) {
      interval = setInterval(() => {
        // Refill 1 token per tick, consume surge
        setCurrentTokens((prev) => {
          const refillRate = Math.floor(bucketCapacity / 10)
          const newTokens = Math.min(bucketCapacity, prev + refillRate)
          const consumed = Math.floor(requestSurgeRate / 5)
          
          if (newTokens >= consumed) {
            setProcessedRequests((p) => p + consumed)
            return newTokens - consumed
          } else {
            const allowed = newTokens
            const rejected = consumed - newTokens
            setProcessedRequests((p) => p + allowed)
            setDroppedRequests((d) => d + rejected)
            return 0
          }
        })
      }, 500)
    }
    return () => clearInterval(interval)
  }, [isSimulating, bucketCapacity, requestSurgeRate])

  const handleResetSimulation = () => {
    setIsSimulating(false)
    setCurrentTokens(bucketCapacity)
    setDroppedRequests(0)
    setProcessedRequests(0)
  }

  const handleUpdateTierLimit = (newLimit: number) => {
    const updated = [...tiers]
    updated[selectedTierIndex].ratePerMinute = newLimit
    setTiers(updated)
    setBucketCapacity(newLimit)
    setCurrentTokens(newLimit)
    showNotification(`Updated ${updated[selectedTierIndex].name} rate limit to ${newLimit} req/min`)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/app" className="hover:text-indigo-600">Enterprise Console</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/developer/docs" className="hover:text-indigo-600">Developer Platform</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold">Rate Limiting & Throttling</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full border border-amber-200">
            <Gauge className="w-4 h-4 text-amber-600" />
            Distributed Sliding-Window Token Bucket Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            API Rate Limiting & DDoS Governance
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Protect recruitment APIs, resume parsing pipelines, and NCAT test servers against high-volume scraping and DDoS amplification attacks with dynamic Redis-backed rate limiting.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-1 text-center min-w-[130px]">
            <div className="text-2xl font-black text-amber-400">0.02%</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">429 Throttle Rate</div>
          </div>
          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl space-y-1 text-center min-w-[130px]">
            <div className="text-2xl font-black text-indigo-700">&lt; 1.2ms</div>
            <div className="text-[10px] text-indigo-600 uppercase tracking-wider font-semibold">Redis Lookup Latency</div>
          </div>
        </div>
      </div>

      {/* Tier Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiers.map((tier, idx) => {
          const isSelected = selectedTierIndex === idx
          return (
            <button
              key={tier.name}
              onClick={() => {
                setSelectedTierIndex(idx)
                setBucketCapacity(tier.ratePerMinute)
                setCurrentTokens(tier.ratePerMinute)
                handleResetSimulation()
              }}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-50/80 border-indigo-400 ring-2 ring-indigo-500/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-semibold">{tier.quotaPeriod}</span>
                <Zap className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
              </div>
              <div className="font-extrabold text-slate-900 text-base">{tier.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-2xl font-black text-indigo-700">{tier.ratePerMinute}</span>
                <span className="text-xs text-slate-500">req / min</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Burst capacity: <strong>+{tier.burstAllowance} tokens</strong>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 text-[10px] text-slate-400">
                {tier.activeUsers}
              </div>
            </button>
          )
        })}
      </div>

      {/* Interactive Token Bucket Visualizer & Real-time Throttle Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Bucket Simulator (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-600" />
                Live Token Bucket Traffic Simulator
              </h3>
              <p className="text-xs text-slate-500">
                Simulate traffic spikes against the <strong>{tiers[selectedTierIndex].name}</strong> policy.
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700">
              Capacity: {bucketCapacity}
            </span>
          </div>

          {/* Visual Bucket Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700">Available Tokens in Bucket:</span>
              <span className={currentTokens === 0 ? 'text-red-600 font-mono' : 'text-indigo-600 font-mono'}>
                {currentTokens} / {bucketCapacity} ({Math.round((currentTokens / bucketCapacity) * 100)}%)
              </span>
            </div>
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  currentTokens === 0
                    ? 'bg-red-500'
                    : currentTokens < bucketCapacity * 0.3
                    ? 'bg-amber-500'
                    : 'bg-indigo-600'
                }`}
                style={{ width: `${(currentTokens / bucketCapacity) * 100}%` }}
              />
            </div>
          </div>

          {/* Sliders for Surge Rate */}
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>Inbound Request Surge Rate:</span>
                <span className="font-bold text-slate-900">{requestSurgeRate} req / tick</span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                step="5"
                value={requestSurgeRate}
                onChange={(e) => setRequestSurgeRate(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>Adjust Bucket Capacity (Rate Limit):</span>
                <span className="font-bold text-slate-900">{bucketCapacity} req / min</span>
              </div>
              <input
                type="range"
                min="30"
                max="2000"
                step="30"
                value={bucketCapacity}
                onChange={(e) => handleUpdateTierLimit(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Controls & Metrics */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                isSimulating
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isSimulating ? (
                <>
                  <Flame className="w-4 h-4 animate-pulse" />
                  Pause Traffic Surge
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Simulate Inbound Surge
                </>
              )}
            </button>

            <button
              onClick={handleResetSimulation}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Counters
            </button>

            <div className="flex items-center gap-4 ml-auto text-xs">
              <div>
                <span className="text-slate-400">Processed: </span>
                <strong className="text-emerald-700 font-mono">{processedRequests}</strong>
              </div>
              <div>
                <span className="text-slate-400">429 Throttled: </span>
                <strong className="text-red-600 font-mono">{droppedRequests}</strong>
              </div>
            </div>
          </div>

          {/* Warning Banner if Throttling Active */}
          {droppedRequests > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-900 text-xs animate-in fade-in">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <strong>HTTP 429 Too Many Requests Generated:</strong> Client received <code>Retry-After: 42</code> header. IP queued for temporary 5-minute cool-down.
              </div>
            </div>
          )}
        </div>

        {/* Right: HTTP 429 Response Headers & Endpoint Meters (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header Specifications */}
          <div className="bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider font-mono">
                <Server className="w-4 h-4" />
                RFC 6585 Standard Headers
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">Active</span>
            </div>

            <div className="space-y-2 font-mono text-xs text-slate-300">
              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-amber-400">X-RateLimit-Limit:</span> {bucketCapacity}
              </div>
              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-emerald-400">X-RateLimit-Remaining:</span> {currentTokens}
              </div>
              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-indigo-400">X-RateLimit-Reset:</span> 1762013890 (in 38s)
              </div>
              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-red-400">Retry-After:</span> 60
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              Clients are encouraged to employ exponential backoff with jitter when encountering HTTP 429 status codes.
            </p>
          </div>

          {/* Protected Endpoints Real-Time Meter */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Critical Endpoint Quotas
            </div>

            <div className="space-y-2 text-xs">
              {[
                { endpoint: 'POST /api/v1/auth/login', limit: '5 req / 5 min (Brute-Force Guard)', status: 'Strict' },
                { endpoint: 'POST /api/v1/resumes/parse', limit: '30 req / min (AI GPU Guard)', status: 'Protected' },
                { endpoint: 'GET /api/v1/jobs/search', limit: '120 req / min (Elasticsearch)', status: 'Cached' },
                { endpoint: 'POST /api/v1/campus/ncat/submit', limit: '3 req / test session', status: 'Anti-Cheat' }
              ].map((ep) => (
                <div key={ep.endpoint} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-mono font-bold text-slate-800 text-[11px]">{ep.endpoint}</div>
                    <div className="text-[10px] text-slate-500">{ep.limit}</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700">
                    {ep.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}


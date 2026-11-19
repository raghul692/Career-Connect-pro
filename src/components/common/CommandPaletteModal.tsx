import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Briefcase,
  Building2,
  Users,
  ShieldAlert,
  CreditCard,
  Key,
  Webhook,
  FileText,
  Bell,
  Code2,
  HelpCircle,
  X,
  ArrowRight,
  Sparkles,
  UploadCloud,
  DownloadCloud,
  GitFork,
  Globe,
  Network,
  Clock,
  Crown,
  Radio,
  Cpu,
  Palette,
  Receipt,
  ArrowRightLeft
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

interface CommandItem {
  id: string
  title: string
  subtitle: string
  category: 'Navigation' | 'Admin & Team' | 'FinOps' | 'Developer' | 'Candidate'
  icon: React.ElementType
  url: string
}

const COMMANDS: CommandItem[] = [
  { id: 'c-jobs', title: 'Browse All Job Openings', subtitle: 'Search 50,000+ verified positions', category: 'Navigation', icon: Briefcase, url: '/jobs' },
  { id: 'c-campus', title: 'Campus Hub & NCAT', subtitle: 'Aptitude tests & national hackathons', category: 'Navigation', icon: Sparkles, url: '/campus' },
  { id: 'c-companies', title: 'Companies Directory', subtitle: 'Explore MNCs, Unicorns & Startups', category: 'Navigation', icon: Building2, url: '/companies' },
  { id: 'c-tour', title: 'Interactive Product Tour', subtitle: 'Test candidate search without signing in', category: 'Navigation', icon: ArrowRight, url: '/product-tour' },
  { id: 'c-pricing', title: 'Pricing & Plan Matrix', subtitle: 'Compare Free, Pro and Enterprise plans', category: 'FinOps', icon: CreditCard, url: '/pricing' },
  { id: 'c-features', title: 'Features & Solutions', subtitle: 'Use cases for startups and enterprise', category: 'Navigation', icon: FileText, url: '/features' },
  { id: 'c-integrations', title: 'Integrations Directory', subtitle: 'Slack, GitHub, Workday, Stripe', category: 'Developer', icon: Code2, url: '/integrations' },
  
  // App & Admin Operations
  { id: 'c-dash', title: 'Enterprise Overview Dashboard', subtitle: 'Executive KPIs, pipelines & charts', category: 'Admin & Team', icon: Building2, url: '/app' },
  { id: 'c-import', title: 'Candidate CSV Importer', subtitle: 'Bulk Excel & CSV column mapping wizard', category: 'Admin & Team', icon: UploadCloud, url: '/app/import-candidates' },
  { id: 'c-export', title: 'Export & Bulk Queue', subtitle: 'Background ZIP & CSV downloads', category: 'Admin & Team', icon: DownloadCloud, url: '/app/export-queue' },
  { id: 'c-workflows', title: 'Hiring Automations Canvas', subtitle: 'If-This-Then-That candidate routing', category: 'Admin & Team', icon: GitFork, url: '/app/workflows' },
  { id: 'c-team', title: 'Team Members & Roles', subtitle: 'Invite users & configure RBAC matrix', category: 'Admin & Team', icon: Users, url: '/admin/team' },
  { id: 'c-roles', title: 'RBAC Permissions Matrix', subtitle: 'Granular capability toggles per role', category: 'Admin & Team', icon: ShieldAlert, url: '/admin/roles' },
  { id: 'c-domain', title: 'Domain Verification (@company.com)', subtitle: 'Claim domain via DNS TXT records', category: 'Admin & Team', icon: Globe, url: '/admin/domain-verification' },
  { id: 'c-ip', title: 'IP Allowlist & Geofence', subtitle: 'Restrict recruiter access to office VPNs', category: 'Admin & Team', icon: Network, url: '/admin/ip-allowlist' },
  { id: 'c-retention', title: 'DPDP Data Retention & Purge', subtitle: 'Auto-delete rejected candidate profiles', category: 'Admin & Team', icon: Clock, url: '/admin/data-retention' },
  { id: 'c-branding', title: 'White-Label Branding & Schema', subtitle: 'Custom domain, colors & applicant questions', category: 'Admin & Team', icon: Palette, url: '/admin/branding' },
  { id: 'c-transfer', title: 'Transfer Organization Ownership', subtitle: 'Step-up sudo authentication handoff', category: 'Admin & Team', icon: ArrowRightLeft, url: '/admin/transfer-ownership' },
  { id: 'c-audit', title: 'Security Audit Logs', subtitle: 'Immutable actor, IP & action audit stream', category: 'Admin & Team', icon: ShieldAlert, url: '/admin/audit-logs' },
  { id: 'c-sso', title: 'SSO & Directory Sync', subtitle: 'SAML 2.0, Okta, Azure AD SCIM sync', category: 'Admin & Team', icon: Key, url: '/admin/sso' },
  
  // Super-Admin God Mode
  { id: 'c-tenants', title: 'Tenant Inspector (God-Mode)', subtitle: 'View all companies & login-as-recruiter', category: 'Admin & Team', icon: Crown, url: '/super-admin/tenants' },
  { id: 'c-broadcast', title: 'Global System Broadcast Banners', subtitle: 'Publish live maintenance alerts', category: 'Admin & Team', icon: Radio, url: '/super-admin/broadcast' },

  // FinOps & Billing
  { id: 'c-usage', title: 'Plan & Usage Metering', subtitle: 'Resume credits, job slots & API usage', category: 'FinOps', icon: CreditCard, url: '/billing/usage' },
  { id: 'c-ai-credits', title: 'AI Screening Credits & Cap', subtitle: 'Gemini API tokens & monthly budget guardrail', category: 'FinOps', icon: Cpu, url: '/billing/ai-credits' },
  { id: 'c-quote', title: 'B2B Proforma Quote Generator', subtitle: 'Official GST procurement quote PDF', category: 'FinOps', icon: Receipt, url: '/billing/quote-generator' },
  { id: 'c-invoices', title: 'Invoices & Billing History', subtitle: 'Download past receipts and GST invoices', category: 'FinOps', icon: FileText, url: '/billing/invoices' },
  { id: 'c-payment', title: 'Payment Methods & Tax Info', subtitle: 'Manage credit cards and GSTIN', category: 'FinOps', icon: CreditCard, url: '/billing/payment-methods' },
  
  // Developer
  { id: 'c-keys', title: 'API Keys Management', subtitle: 'Create live & test API tokens', category: 'Developer', icon: Key, url: '/developer/api-keys' },
  { id: 'c-webhooks', title: 'Webhooks Configuration', subtitle: 'Register endpoints & test 200 OK pings', category: 'Developer', icon: Webhook, url: '/developer/webhooks' },
  { id: 'c-docs', title: 'Interactive API Docs', subtitle: 'Explore REST endpoints and cURL samples', category: 'Developer', icon: Code2, url: '/developer/docs' },
  { id: 'c-changelog', title: 'Product Changelog', subtitle: 'View latest release notes and fixes', category: 'Developer', icon: FileText, url: '/changelog' },
  
  // Candidate
  { id: 'c-resume', title: 'ATS Resume Scorer', subtitle: 'Score your resume against Workday & Taleo', category: 'Candidate', icon: FileText, url: '/resume-builder' },
  { id: 'c-salary', title: 'In-Hand Salary Calculator', subtitle: 'Calculate monthly take-home pay', category: 'Candidate', icon: CreditCard, url: '/salaries' },
  { id: 'c-notifs', title: 'Notification Inbox', subtitle: 'Mentions, alerts & system updates', category: 'Candidate', icon: Bell, url: '/app/notifications' },
  { id: 'c-status', title: 'System Status Uptime', subtitle: 'Real-time API & service uptime monitoring', category: 'Navigation', icon: HelpCircle, url: '/status' }
]

export const CommandPaletteModal: React.FC = () => {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen } = useJobContext()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigate = useNavigate()

  if (!isCommandPaletteOpen) return null

  const filteredCommands = COMMANDS.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (url: string) => {
    setIsCommandPaletteOpen(false)
    setQuery('')
    navigate(url)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length))
    } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      e.preventDefault()
      handleSelect(filteredCommands[selectedIndex].url)
    } else if (e.key === 'Escape') {
      setIsCommandPaletteOpen(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4 sm:px-6"
      onClick={() => setIsCommandPaletteOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Type a command or search pages (e.g. 'API Keys', 'Pricing', 'Team')..."
            className="w-full text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-transparent outline-none"
          />
          <div className="flex items-center gap-1.5 shrink-0">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-slate-100 text-slate-500 rounded border border-slate-200">
              ESC
            </kbd>
            <button
              onClick={() => setIsCommandPaletteOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-50">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              No matching pages or commands found for "{query}".
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon
              const isSelected = idx === selectedIndex
              return (
                <button
                  key={cmd.id}
                  onClick={() => handleSelect(cmd.url)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors cursor-pointer ${
                    isSelected ? 'bg-indigo-50/80 text-indigo-900' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm truncate">{cmd.title}</div>
                      <div className="text-xs text-slate-400 truncate">{cmd.subtitle}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {cmd.category}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-600' : 'text-slate-300'}`} />
                  </div>
                </button>
              )
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 text-[10px] font-mono bg-white rounded border border-slate-200">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 text-[10px] font-mono bg-white rounded border border-slate-200">↵</kbd> Select
            </span>
          </div>
          <span className="text-slate-400 text-[11px]">Quick Jump with Cmd+K</span>
        </div>
      </div>
    </div>
  )
}


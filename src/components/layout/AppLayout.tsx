import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Shield,
  Key,
  Webhook,
  FileText,
  CreditCard,
  Bell,
  Trash2,
  ChevronDown,
  Building2,
  Search,
  ExternalLink,
  Menu,
  X,
  LogOut,
  Sparkles,
  BarChart3,
  Plug,
  Layers,
  HelpCircle,
  ShieldAlert,
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
  ArrowRightLeft,
  Database,
  Activity
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'
import { SudoModeModal } from '../common/SudoModeModal'
import { BrandLogo } from '../common/BrandLogo'

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  badge?: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    activeOrg,
    setActiveOrg,
    organizations,
    userProfile,
    notifications,
    setIsCommandPaletteOpen,
    impersonatingOrg,
    exitImpersonation,
    broadcastMessage,
    dismissBroadcast
  } = useJobContext()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length

  const navSections: NavSection[] = [
    {
      title: 'Candidate & ATS Operations',
      items: [
        { name: 'Overview', href: '/app', icon: LayoutDashboard },
        { name: 'Candidate CSV Importer', href: '/app/import-candidates', icon: UploadCloud, badge: 'New' },
        { name: 'Export & Bulk Queue', href: '/app/export-queue', icon: DownloadCloud },
        { name: 'Hiring Automations', href: '/app/workflows', icon: GitFork, badge: 'AI' },
        { name: 'Notification Inbox', href: '/app/notifications', icon: Bell, badge: unreadNotificationsCount > 0 ? `${unreadNotificationsCount}` : undefined },
        { name: 'Reports & Analytics', href: '/app/reports', icon: BarChart3 },
        { name: 'Archived & Trash', href: '/app/trash', icon: Trash2 }
      ]
    },
    {
      title: 'Security & IT Governance',
      items: [
        { name: 'Team Members', href: '/admin/team', icon: Users },
        { name: 'RBAC Roles Matrix', href: '/admin/roles', icon: Shield },
        { name: 'Domain Verification', href: '/admin/domain-verification', icon: Globe, badge: 'DNS' },
        { name: 'IP Allowlist & Geofence', href: '/admin/ip-allowlist', icon: Network },
        { name: 'DPDP Data Retention', href: '/admin/data-retention', icon: Clock },
        { name: 'White-Label & Schema', href: '/admin/branding', icon: Palette },
        { name: 'Security Audit Logs', href: '/admin/audit-logs', icon: ShieldAlert },
        { name: 'Row-Level Security (RLS)', href: '/admin/security/rls', icon: Shield, badge: 'Kernel' },
        { name: 'Automated Backups & DR', href: '/admin/backups', icon: Database, badge: 'PITR' },
        { name: 'SSO & Directory Sync', href: '/admin/sso', icon: Key },
        { name: 'Transfer Ownership', href: '/admin/transfer-ownership', icon: ArrowRightLeft }
      ]
    },
    {
      title: 'FinOps & Procurement',
      items: [
        { name: 'Usage Metering', href: '/billing/usage', icon: Layers },
        { name: 'AI Screening Credits', href: '/billing/ai-credits', icon: Cpu, badge: 'Token' },
        { name: 'Proforma Quote PDF', href: '/billing/quote-generator', icon: Receipt },
        { name: 'Invoices & Tax Bills', href: '/billing/invoices', icon: FileText },
        { name: 'Payment Methods & GST', href: '/billing/payment-methods', icon: CreditCard },
        { name: 'Plan & Cancellation', href: '/billing/cancel', icon: HelpCircle }
      ]
    },
    {
      title: 'Platform Super-Admin',
      items: [
        { name: 'Tenant Inspector', href: '/super-admin/tenants', icon: Crown, badge: 'God Mode' },
        { name: 'System Broadcasts', href: '/super-admin/broadcast', icon: Radio }
      ]
    },
    {
      title: 'Developer Platform',
      items: [
        { name: 'API Keys', href: '/developer/api-keys', icon: Key },
        { name: 'Rate Limiting & DDoS', href: '/developer/rate-limiting', icon: Activity, badge: '429' },
        { name: 'Webhooks & Logs', href: '/developer/webhooks', icon: Webhook },
        { name: 'Connected Apps', href: '/developer/apps', icon: Plug },
        { name: 'REST API Docs', href: '/developer/docs', icon: FileText },
        { name: 'Changelog', href: '/changelog', icon: Sparkles }
      ]
    }
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      <SudoModeModal />

      {/* Impersonation Banner */}
      {impersonatingOrg && (
        <div className="bg-red-600 text-white px-4 py-2.5 text-xs font-semibold flex items-center justify-between sticky top-0 z-40 shadow-md">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping shrink-0" />
            <span>
              Support Impersonation Active: You are viewing tenant <strong>{impersonatingOrg.name}</strong> as an authorized platform administrator.
            </span>
          </div>
          <button
            onClick={exitImpersonation}
            className="bg-white text-red-700 px-3 py-1 rounded-lg font-bold text-xs hover:bg-red-50 transition-colors shadow-xs cursor-pointer shrink-0"
          >
            Exit Impersonation
          </button>
        </div>
      )}

      {/* Global Broadcast Banner */}
      {broadcastMessage && broadcastMessage.active && (
        <div
          className={`px-4 py-2 text-xs font-medium flex items-center justify-between border-b sticky ${
            impersonatingOrg ? 'top-10' : 'top-0'
          } z-30 ${
            broadcastMessage.severity === 'critical'
              ? 'bg-red-50 text-red-900 border-red-200'
              : broadcastMessage.severity === 'maintenance'
              ? 'bg-amber-50 text-amber-900 border-amber-200'
              : 'bg-indigo-50 text-indigo-900 border-indigo-200'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Radio className="w-3.5 h-3.5 text-indigo-600 animate-pulse shrink-0" />
            <span className="truncate">
              <strong>{broadcastMessage.title}:</strong> {broadcastMessage.message}
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-4">
            {broadcastMessage.ctaText && broadcastMessage.ctaLink && (
              <Link to={broadcastMessage.ctaLink} className="underline font-bold text-xs hover:opacity-80">
                {broadcastMessage.ctaText} →
              </Link>
            )}
            <button
              onClick={dismissBroadcast}
              className="p-1 hover:bg-black/5 rounded cursor-pointer"
              title="Dismiss broadcast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col lg:flex-row min-w-0">
        {/* Sidebar for Desktop */}
        <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col shrink-0 select-none">
          {/* Brand Header */}
          <div className="p-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
            <BrandLogo size="sm" showTagline={false} />
            <span className="text-[10px] bg-blue-50 text-[#275df5] font-extrabold px-1.5 py-0.5 rounded border border-blue-200/60 uppercase">
              ATS Suite
            </span>
          </div>

          {/* Organization Switcher */}
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <button
                onClick={() => setIsOrgDropdownOpen(!isOrgDropdownOpen)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 hover:bg-slate-50 transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={activeOrg.logo}
                    alt={activeOrg.name}
                    className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-1.5">
                      {activeOrg.name}
                      {activeOrg.verified && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="Verified" />
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">
                      {activeOrg.plan} Plan · {activeOrg.seatsUsed}/{activeOrg.seatsMax} Seats
                    </div>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
              </button>

              {/* Org Dropdown */}
              {isOrgDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 p-1.5 z-30 space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                    Switch Workspace
                  </div>
                  {organizations.map((org) => (
                    <button
                      key={org.id}
                      onClick={() => {
                        setActiveOrg(org)
                        setIsOrgDropdownOpen(false)
                      }}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                        org.id === activeOrg.id ? 'bg-indigo-50 font-bold text-indigo-900' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <img src={org.logo} alt={org.name} className="w-6 h-6 rounded-md object-cover" />
                      <span className="truncate">{org.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Sections */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-1">
                <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {section.title}
                </div>
                <div className="space-y-0.5 pt-1">
                  {section.items.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href)
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          active
                            ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-200'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
                          <span className="truncate">{item.name}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                              active
                                ? 'bg-indigo-500 text-white'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* User Profile Footer */}
          <div className="p-4 border-t border-slate-100 space-y-2">
            <Link
              to="/jobs"
              className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <span className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5" />
                Public Job Portal
              </span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                    {userProfile.name.charAt(0)}
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="text-xs font-bold text-slate-900 truncate">{userProfile.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{userProfile.email}</div>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-1.5 bg-white rounded-xl shadow-xl border border-slate-200 p-1.5 z-30 space-y-0.5 text-xs">
                  <Link
                    to="/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"
                  >
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    Account Profile
                  </Link>
                  <Link
                    to="/account/sessions"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"
                  >
                    <Key className="w-3.5 h-3.5 text-slate-400" />
                    Active Sessions & Devices
                  </Link>
                  <Link
                    to="/account/privacy-data"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"
                  >
                    <Shield className="w-3.5 h-3.5 text-slate-400" />
                    GDPR & Privacy Data
                  </Link>
                  <div className="border-t border-slate-100 my-1" />
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false)
                      navigate('/login')
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 font-semibold cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-500" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header Bar */}
          <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
            <div className="flex items-center gap-3 min-w-0">
              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-500 hover:text-slate-900 rounded-lg cursor-pointer"
                aria-label="Toggle Navigation"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Mobile Brand Logo */}
              <div className="lg:hidden flex items-center">
                <BrandLogo size="sm" showTagline={false} />
              </div>

              {/* Breadcrumb / Title */}
              <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500 truncate">
                <span className="font-bold text-slate-900">{activeOrg.name}</span>
                <span>/</span>
                <span className="capitalize text-slate-700">{location.pathname.replace('/', '').replace('-', ' ') || 'Overview'}</span>
              </div>
            </div>

            {/* Quick Actions Header */}
            <div className="flex items-center gap-2.5 shrink-0">
              {/* Command Palette Trigger */}
              <button
                onClick={() => setIsCommandPaletteOpen(true)}
                className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-xl border border-slate-200 transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Search app...</span>
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white text-slate-500 rounded border border-slate-200">
                  ⌘K
                </kbd>
              </button>

              {/* Notification Bell */}
              <Link
                to="/app/notifications"
                className="relative p-2 text-slate-500 hover:text-[#275df5] rounded-xl hover:bg-slate-100 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#275df5] rounded-full" />
                )}
              </Link>

              {/* Post Job Quick CTA */}
              <Link
                to="/post-job"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#275df5] hover:bg-[#1f4ed8] text-white text-xs font-bold rounded-xl shadow-2xs transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Post Opening
              </Link>
            </div>
          </header>

          {/* Mobile Navigation Drawer */}
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 flex">
              <div className="w-72 bg-white h-full flex flex-col p-4 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-bold text-sm text-slate-900">{activeOrg.name}</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {navSections.map((section, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {section.title}
                      </div>
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block px-3 py-2 rounded-lg text-xs font-semibold ${
                            isActive(item.href) ? 'bg-indigo-600 text-white' : 'text-slate-600'
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* View Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

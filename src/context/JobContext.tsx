import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  Job,
  Company,
  Contest,
  InterviewQuestion,
  Article,
  Application,
  UserProfile,
  FilterState,
  Organization,
  TeamMember,
  EnterpriseRole,
  AuditLogEntry,
  Invoice,
  UsageMeter,
  ApiKey,
  WebhookEndpoint,
  NotificationItem,
  Persona,
  CandidateImportBatch,
  ExportQueueJob,
  DomainVerificationRecord,
  IpAllowlistRule,
  DataRetentionPolicy,
  SuperAdminTenant,
  SystemBroadcastMessage,
  AiScreeningUsage,
  HiringWorkflow,
  WhiteLabelSettings,
  ProformaQuote
} from '../types'
import {
  INITIAL_JOBS,
  INITIAL_COMPANIES,
  INITIAL_CONTESTS,
  INITIAL_INTERVIEW_QUESTIONS,
  INITIAL_ARTICLES,
  INITIAL_APPLICATIONS,
  INITIAL_USER_PROFILE,
  INITIAL_ORGANIZATIONS,
  INITIAL_TEAM_MEMBERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_INVOICES,
  INITIAL_USAGE_METERS,
  INITIAL_API_KEYS,
  INITIAL_WEBHOOKS,
  INITIAL_NOTIFICATIONS,
  INITIAL_IMPORT_BATCH,
  INITIAL_EXPORT_JOBS,
  INITIAL_DOMAIN_RECORDS,
  INITIAL_IP_RULES,
  INITIAL_RETENTION_POLICIES,
  INITIAL_SUPERADMIN_TENANTS,
  INITIAL_BROADCAST_MESSAGE,
  INITIAL_AI_SCREENING_USAGE,
  INITIAL_HIRING_WORKFLOWS,
  INITIAL_WHITELABEL_CONFIG,
  INITIAL_PROFORMA_QUOTE
} from '../data/mockData'

interface JobContextType {
  jobs: Job[]
  companies: Company[]
  contests: Contest[]
  questions: InterviewQuestion[]
  articles: Article[]
  applications: Application[]
  savedJobIds: string[]
  userProfile: UserProfile
  filters: FilterState
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>
  resetFilters: () => void
  toggleSaveJob: (jobId: string) => void
  isJobSaved: (jobId: string) => boolean
  applyToJob: (job: Job, resumeName?: string, coverNote?: string) => void
  hasApplied: (jobId: string) => boolean
  updateProfile: (updated: Partial<UserProfile>) => void
  postNewJob: (jobData: Omit<Job, 'id' | 'postedDaysAgo' | 'applicants'>) => void
  quickApplyJob: Job | null
  setQuickApplyJob: (job: Job | null) => void
  notification: string | null
  showNotification: (msg: string) => void

  // Enterprise SaaS Phase 1 State
  organizations: Organization[]
  activeOrg: Organization
  setActiveOrg: (org: Organization) => void
  persona: Persona
  setPersona: (p: Persona) => void
  teamMembers: TeamMember[]
  inviteTeamMember: (name: string, email: string, role: EnterpriseRole) => void
  removeTeamMember: (id: string) => void
  auditLogs: AuditLogEntry[]
  addAuditLog: (action: string, details: string, severity?: AuditLogEntry['severity']) => void
  invoices: Invoice[]
  usageMeters: UsageMeter[]
  apiKeys: ApiKey[]
  generateApiKey: (name: string, scope: ApiKey['scope']) => ApiKey
  revokeApiKey: (id: string) => void
  webhooks: WebhookEndpoint[]
  addWebhook: (url: string, events: string[]) => void
  deleteWebhook: (id: string) => void
  notifications: NotificationItem[]
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  isCommandPaletteOpen: boolean
  setIsCommandPaletteOpen: (open: boolean) => void

  // Enterprise SaaS Phase 2 State
  impersonatingOrg: Organization | null
  startImpersonation: (org: Organization) => void
  exitImpersonation: () => void
  broadcastMessage: SystemBroadcastMessage | null
  setBroadcastMessage: (msg: SystemBroadcastMessage | null) => void
  dismissBroadcast: () => void
  importBatch: CandidateImportBatch
  setImportBatch: React.Dispatch<React.SetStateAction<CandidateImportBatch>>
  exportJobs: ExportQueueJob[]
  triggerExportJob: (title: string, type: ExportQueueJob['type']) => void
  domainRecords: DomainVerificationRecord[]
  verifyDomain: (id: string) => void
  ipRules: IpAllowlistRule[]
  addIpRule: (rule: Omit<IpAllowlistRule, 'id' | 'createdAt' | 'lastActive'>) => void
  toggleIpRule: (id: string) => void
  retentionPolicies: DataRetentionPolicy[]
  runRetentionPurge: (id: string) => void
  superAdminTenants: SuperAdminTenant[]
  aiScreeningUsage: AiScreeningUsage
  updateAiBudgetCap: (amount: number, autoShutoff: boolean) => void
  hiringWorkflows: HiringWorkflow[]
  toggleWorkflow: (id: string) => void
  whiteLabelConfig: WhiteLabelSettings
  updateWhiteLabelConfig: (cfg: Partial<WhiteLabelSettings>) => void
  proformaQuotes: ProformaQuote[]
  addProformaQuote: (quote: ProformaQuote) => void

  // Step-Up Authentication (Sudo Mode)
  isSudoModalOpen: boolean
  sudoActionName: string
  openSudoModal: (actionName: string, onSuccess: () => void) => void
  closeSudoModal: () => void
  verifySudoPassword: (password: string) => boolean
}

const defaultFilters: FilterState = {
  keyword: '',
  location: '',
  experience: 'all',
  department: [],
  workMode: [],
  salaryRanges: [],
  companyTypes: [],
  freshness: 'all',
  sortBy: 'relevance'
}

const JobContext = createContext<JobContextType | undefined>(undefined)

const generateJobId = () => `job-${Date.now()}`
const generateUserId = () => `usr-${Date.now()}`
const generateAppId = () => `app-${Date.now()}`

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('ccp_jobs')
    return saved ? JSON.parse(saved) : INITIAL_JOBS
  })

  const [companies] = useState<Company[]>(INITIAL_COMPANIES)
  const [contests] = useState<Contest[]>(INITIAL_CONTESTS)
  const [questions] = useState<InterviewQuestion[]>(INITIAL_INTERVIEW_QUESTIONS)
  const [articles] = useState<Article[]>(INITIAL_ARTICLES)

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('ccp_saved_jobs')
    return saved ? JSON.parse(saved) : ['job-101', 'job-104']
  })

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem('ccp_applications')
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS
  })

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ccp_profile')
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE
  })

  // Enterprise SaaS Phase 1 States
  const [organizations] = useState<Organization[]>(INITIAL_ORGANIZATIONS)
  const [activeOrg, setActiveOrg] = useState<Organization>(INITIAL_ORGANIZATIONS[0])
  const [persona, setPersona] = useState<Persona>('admin')
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS)
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS)
  const [invoices] = useState<Invoice[]>(INITIAL_INVOICES)
  const [usageMeters] = useState<UsageMeter[]>(INITIAL_USAGE_METERS)
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(INITIAL_API_KEYS)
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>(INITIAL_WEBHOOKS)
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)

  // Enterprise SaaS Phase 2 States
  const [impersonatingOrg, setImpersonatingOrg] = useState<Organization | null>(null)
  const [broadcastMessage, setBroadcastMessage] = useState<SystemBroadcastMessage | null>(INITIAL_BROADCAST_MESSAGE)
  const [importBatch, setImportBatch] = useState<CandidateImportBatch>(INITIAL_IMPORT_BATCH)
  const [exportJobs, setExportJobs] = useState<ExportQueueJob[]>(INITIAL_EXPORT_JOBS)
  const [domainRecords, setDomainRecords] = useState<DomainVerificationRecord[]>(INITIAL_DOMAIN_RECORDS)
  const [ipRules, setIpRules] = useState<IpAllowlistRule[]>(INITIAL_IP_RULES)
  const [retentionPolicies, setRetentionPolicies] = useState<DataRetentionPolicy[]>(INITIAL_RETENTION_POLICIES)
  const [superAdminTenants] = useState<SuperAdminTenant[]>(INITIAL_SUPERADMIN_TENANTS)
  const [aiScreeningUsage, setAiScreeningUsage] = useState<AiScreeningUsage>(INITIAL_AI_SCREENING_USAGE)
  const [hiringWorkflows, setHiringWorkflows] = useState<HiringWorkflow[]>(INITIAL_HIRING_WORKFLOWS)
  const [whiteLabelConfig, setWhiteLabelConfig] = useState<WhiteLabelSettings>(INITIAL_WHITELABEL_CONFIG)
  const [proformaQuotes, setProformaQuotes] = useState<ProformaQuote[]>([INITIAL_PROFORMA_QUOTE])

  // Step-Up Auth (Sudo Mode)
  const [isSudoModalOpen, setIsSudoModalOpen] = useState(false)
  const [sudoActionName, setSudoActionName] = useState('')
  const [sudoCallback, setSudoCallback] = useState<(() => void) | null>(null)

  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [quickApplyJob, setQuickApplyJob] = useState<Job | null>(null)
  const [notification, setNotification] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem('ccp_saved_jobs', JSON.stringify(savedJobIds))
  }, [savedJobIds])

  useEffect(() => {
    localStorage.setItem('ccp_applications', JSON.stringify(applications))
  }, [applications])

  useEffect(() => {
    localStorage.setItem('ccp_jobs', JSON.stringify(jobs))
  }, [jobs])

  useEffect(() => {
    localStorage.setItem('ccp_profile', JSON.stringify(userProfile))
  }, [userProfile])

  // Cmd+K global keybind listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsCommandPaletteOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const showNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  const resetFilters = () => {
    setFilters(defaultFilters)
  }

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      const exists = prev.includes(jobId)
      const next = exists ? prev.filter((id) => id !== jobId) : [...prev, jobId]
      showNotification(exists ? 'Job removed from bookmarks' : 'Job saved to your dashboard!')
      return next
    })
  }

  const isJobSaved = (jobId: string) => savedJobIds.includes(jobId)

  const hasApplied = (jobId: string) => applications.some((app) => app.jobId === jobId)

  const applyToJob = (job: Job, _resumeName?: string, _coverNote?: string) => {
    if (hasApplied(job.id)) {
      showNotification('You have already submitted an application for this role!')
      return
    }

    const newApp: Application = {
      id: generateAppId(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      companyLogo: job.companyLogo,
      appliedDate: 'Just now',
      status: 'Applied',
      location: job.location,
      salary: job.salary
    }

    setApplications((prev) => [newApp, ...prev])

    // Update applicants count on job
    setJobs((prev) =>
      prev.map((j) => (j.id === job.id ? { ...j, applicants: (j.applicants || 0) + 1 } : j))
    )

    // Trigger celebratory confetti dynamically on demand
    import('canvas-confetti').then((mod) => {
      const triggerConfetti = mod.default || mod
      triggerConfetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      })
    })

    showNotification(`Application submitted successfully to ${job.company}!`)
  }

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }))
    showNotification('Profile updated successfully!')
  }

  const postNewJob = (jobData: Omit<Job, 'id' | 'postedDaysAgo' | 'applicants'>) => {
    const newJob: Job = {
      ...jobData,
      id: generateJobId(),
      postedDaysAgo: 0,
      applicants: 1
    }

    setJobs((prev) => [newJob, ...prev])
    addAuditLog('Job Opening Created', `Published new job listing: "${jobData.title}" (${jobData.location})`, 'low')
    showNotification(`Job "${jobData.title}" has been published live on Career Connect Pro!`)
  }

  const inviteTeamMember = (name: string, email: string, role: EnterpriseRole) => {
    const newMember: TeamMember = {
      id: generateUserId(),
      name,
      email,
      role,
      twoFactorEnabled: false,
      lastActive: 'Invitation Pending',
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop`,
      status: 'invited'
    }
    setTeamMembers((prev) => [newMember, ...prev])
    addAuditLog('Team Member Invited', `Invited ${name} (${email}) as ${role}`, 'medium')
    showNotification(`Invitation sent to ${email} as ${role}!`)
  }

  const removeTeamMember = (id: string) => {
    const member = teamMembers.find((m) => m.id === id)
    setTeamMembers((prev) => prev.filter((m) => m.id !== id))
    if (member) {
      addAuditLog('Team Member Removed', `Revoked workspace access for ${member.name} (${member.email})`, 'high')
    }
    showNotification('Team member access revoked.')
  }

  const addAuditLog = (
    action: string,
    details: string,
    severity: AuditLogEntry['severity'] = 'low'
  ) => {
    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actorName: userProfile.name,
      actorEmail: userProfile.email,
      action,
      ipAddress: '103.24.120.45',
      userAgent: 'Chrome 122 (Windows 11)',
      severity,
      details
    }
    setAuditLogs((prev) => [newLog, ...prev])
  }

  const generateApiKey = (name: string, scope: ApiKey['scope']): ApiKey => {
    const randomHex = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10)
    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      name,
      prefix: 'ccp_live_',
      maskedKey: `ccp_live_••••••••••••${randomHex.substring(0, 4)}`,
      createdAt: 'Just now',
      lastUsed: 'Never',
      scope,
      status: 'active'
    }
    setApiKeys((prev) => [newKey, ...prev])
    addAuditLog('API Key Generated', `Created API key "${name}" with scope ${scope}`, 'high')
    showNotification(`API Key "${name}" created successfully.`)
    return newKey
  }

  const revokeApiKey = (id: string) => {
    const target = apiKeys.find((k) => k.id === id)
    setApiKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: 'revoked' as const } : k))
    )
    if (target) {
      addAuditLog('API Key Revoked', `Revoked API key "${target.name}"`, 'high')
    }
    showNotification('API Key has been revoked immediately.')
  }

  const addWebhook = (url: string, events: string[]) => {
    const newWebhook: WebhookEndpoint = {
      id: `wh-${Date.now()}`,
      url,
      events,
      status: 'Active',
      signingSecret: `whsec_${Math.random().toString(36).substring(2, 12)}`,
      lastDeliveryStatus: 200,
      lastDeliveryTime: 'Just now'
    }
    setWebhooks((prev) => [newWebhook, ...prev])
    addAuditLog('Webhook Endpoint Added', `Configured webhook listener at ${url}`, 'medium')
    showNotification('Webhook endpoint added and tested.')
  }

  const deleteWebhook = (id: string) => {
    setWebhooks((prev) => prev.filter((w) => w.id !== id))
    showNotification('Webhook endpoint removed.')
  }

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    showNotification('All notifications marked as read.')
  }

  // Phase 2 Handlers
  const startImpersonation = (org: Organization) => {
    setImpersonatingOrg(org)
    setActiveOrg(org)
    addAuditLog('Impersonation Session Started', `Super-Admin started support session for tenant "${org.name}"`, 'high')
    showNotification(`Entered Impersonation Mode for ${org.name}`)
  }

  const exitImpersonation = () => {
    const previous = impersonatingOrg?.name
    setImpersonatingOrg(null)
    setActiveOrg(organizations[0])
    addAuditLog('Impersonation Session Exited', `Exited support session for tenant "${previous}"`, 'medium')
    showNotification('Exited impersonation mode.')
  }

  const dismissBroadcast = () => {
    setBroadcastMessage(null)
  }

  const triggerExportJob = (title: string, type: ExportQueueJob['type']) => {
    const newJob: ExportQueueJob = {
      id: `exp-${Date.now()}`,
      title,
      type,
      status: 'processing',
      progress: 5,
      totalRecords: 2400,
      processedRecords: 120,
      createdAt: 'Just now',
      expiresAt: 'In 7 days',
      requestedBy: `${userProfile.name} (${userProfile.email})`
    }
    setExportJobs((prev) => [newJob, ...prev])
    addAuditLog('Bulk Export Triggered', `Initiated background export task: "${title}"`, 'medium')
    showNotification(`Background export task "${title}" queued! View progress in Export Queue.`)

    // Simulate progress updates
    const timer = setInterval(() => {
      setExportJobs((prev) =>
        prev.map((j) => {
          if (j.id === newJob.id) {
            const nextProgress = Math.min(100, j.progress + 25)
            return {
              ...j,
              progress: nextProgress,
              processedRecords: Math.floor((nextProgress / 100) * j.totalRecords),
              status: nextProgress >= 100 ? 'completed' : 'processing',
              fileSize: nextProgress >= 100 ? '18.4 MB' : undefined,
              downloadUrl: nextProgress >= 100 ? '#download-ready' : undefined
            }
          }
          return j
        })
      )
    }, 1200)

    setTimeout(() => clearInterval(timer), 6000)
  }

  const verifyDomain = (id: string) => {
    setDomainRecords((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'verified', lastChecked: 'Just now (DNS confirmed)' } : d))
    )
    addAuditLog('Domain Verified', `DNS TXT challenge confirmed for domain record id: ${id}`, 'high')
    showNotification('DNS TXT record verified! Corporate domain claimed.')
  }

  const addIpRule = (rule: Omit<IpAllowlistRule, 'id' | 'createdAt' | 'lastActive'>) => {
    const newRule: IpAllowlistRule = {
      ...rule,
      id: `ip-${Date.now()}`,
      createdAt: new Date().toISOString().substring(0, 10),
      lastActive: 'Just now'
    }
    setIpRules((prev) => [newRule, ...prev])
    addAuditLog('IP Allowlist Rule Added', `Whitelisted CIDR ${rule.cidr} for ${rule.scope}`, 'high')
    showNotification(`IP CIDR ${rule.cidr} added to allowlist.`)
  }

  const toggleIpRule = (id: string) => {
    setIpRules((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextStatus = r.status === 'active' ? 'disabled' : 'active'
          addAuditLog('IP Rule Toggled', `Rule "${r.label}" set to ${nextStatus}`, 'medium')
          return { ...r, status: nextStatus }
        }
        return r
      })
    )
    showNotification('IP allowlist rule status updated.')
  }

  const runRetentionPurge = (id: string) => {
    setRetentionPolicies((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const purgedCount = p.recordsEligible
          addAuditLog('DPDP Data Purge Executed', `Purged ${purgedCount} records under policy "${p.category}"`, 'critical')
          showNotification(`Purged ${purgedCount} records according to ${p.dpdpRegulationRef}.`)
          return {
            ...p,
            recordsEligible: 0,
            lastPurgedAt: `Today (Purged ${purgedCount} records)`
          }
        }
        return p
      })
    )
  }

  const updateAiBudgetCap = (amount: number, autoShutoff: boolean) => {
    setAiScreeningUsage((prev) => ({
      ...prev,
      hardBudgetCapInr: amount,
      autoShutoffEnabled: autoShutoff
    }))
    addAuditLog('AI Budget Cap Modified', `Updated hard stop threshold to ₹${amount.toLocaleString()} (Auto-shutoff: ${autoShutoff})`, 'high')
    showNotification('AI screening budget caps and guardrails updated.')
  }

  const toggleWorkflow = (id: string) => {
    setHiringWorkflows((prev) =>
      prev.map((wf) => {
        if (wf.id === id) {
          const nextActive = !wf.active
          showNotification(`Workflow "${wf.title}" is now ${nextActive ? 'Active' : 'Paused'}.`)
          return { ...wf, active: nextActive }
        }
        return wf
      })
    )
  }

  const updateWhiteLabelConfig = (cfg: Partial<WhiteLabelSettings>) => {
    setWhiteLabelConfig((prev) => ({ ...prev, ...cfg }))
    addAuditLog('White-Label Branding Updated', 'Modified corporate brand colors, domain, or applicant schema', 'medium')
    showNotification('Brand & Portal customization saved.')
  }

  const addProformaQuote = (quote: ProformaQuote) => {
    setProformaQuotes((prev) => [quote, ...prev])
    addAuditLog('Proforma Quote Generated', `Generated formal quotation ${quote.quoteNumber} for ${quote.clientName}`, 'medium')
    showNotification(`Quote ${quote.quoteNumber} created successfully!`)
  }

  // Sudo Mode Authentication Helper
  const openSudoModal = (actionName: string, onSuccess: () => void) => {
    setSudoActionName(actionName)
    setSudoCallback(() => onSuccess)
    setIsSudoModalOpen(true)
  }

  const closeSudoModal = () => {
    setIsSudoModalOpen(false)
    setSudoActionName('')
    setSudoCallback(null)
  }

  const verifySudoPassword = (password: string) => {
    // In our prototype / testing harness, any password >= 4 chars or 'admin' succeeds
    if (password.length >= 4) {
      if (sudoCallback) {
        sudoCallback()
      }
      closeSudoModal()
      showNotification('Step-Up Authentication Verified.')
      return true
    }
    return false
  }

  return (
    <JobContext.Provider
      value={{
        jobs,
        companies,
        contests,
        questions,
        articles,
        applications,
        savedJobIds,
        userProfile,
        filters,
        setFilters,
        resetFilters,
        toggleSaveJob,
        isJobSaved,
        applyToJob,
        hasApplied,
        updateProfile,
        postNewJob,
        quickApplyJob,
        setQuickApplyJob,
        notification,
        showNotification,

        // Enterprise SaaS Phase 1
        organizations,
        activeOrg,
        setActiveOrg,
        persona,
        setPersona,
        teamMembers,
        inviteTeamMember,
        removeTeamMember,
        auditLogs,
        addAuditLog,
        invoices,
        usageMeters,
        apiKeys,
        generateApiKey,
        revokeApiKey,
        webhooks,
        addWebhook,
        deleteWebhook,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,

        // Enterprise SaaS Phase 2
        impersonatingOrg,
        startImpersonation,
        exitImpersonation,
        broadcastMessage,
        setBroadcastMessage,
        dismissBroadcast,
        importBatch,
        setImportBatch,
        exportJobs,
        triggerExportJob,
        domainRecords,
        verifyDomain,
        ipRules,
        addIpRule,
        toggleIpRule,
        retentionPolicies,
        runRetentionPurge,
        superAdminTenants,
        aiScreeningUsage,
        updateAiBudgetCap,
        hiringWorkflows,
        toggleWorkflow,
        whiteLabelConfig,
        updateWhiteLabelConfig,
        proformaQuotes,
        addProformaQuote,

        // Step-Up Sudo Mode
        isSudoModalOpen,
        sudoActionName,
        openSudoModal,
        closeSudoModal,
        verifySudoPassword
      }}
    >
      {children}
    </JobContext.Provider>
  )
}

// oxlint-disable-next-line react/only-export-components
export const useJobContext = () => {
  const ctx = useContext(JobContext)
  if (!ctx) {
    throw new Error('useJobContext must be used within a JobProvider')
  }
  return ctx
}

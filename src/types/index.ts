export type WorkMode = 'Remote' | 'Hybrid' | 'Work from office'

export type CompanyType = 'Foreign MNC' | 'Indian MNC' | 'Startup' | 'Corporate' | 'Product' | 'Unicorn'

export interface Job {
  id: string
  title: string
  company: string
  companyLogo: string
  rating: number
  reviewCount: number
  experience: string
  minExp: number
  maxExp: number
  salary: string
  minSalaryLakhs: number
  maxSalaryLakhs: number
  location: string
  workMode: WorkMode
  department: string
  companyType: CompanyType
  postedDaysAgo: number
  description: string
  responsibilities: string[]
  mandatorySkills: string[]
  secondarySkills: string[]
  openings: number
  applicants: number
  education: string
  urgentHiring?: boolean
  featured?: boolean
  verifiedRecruiter?: boolean
}

export interface Company {
  id: string
  name: string
  logo: string
  rating: number
  reviewCount: number
  industry: string
  type: CompanyType
  employeeCount: string
  headquarters: string
  website: string
  overview: string
  openJobsCount: number
  benefits: string[]
  glassdoorRating?: number
  ceoName?: string
}

export interface Contest {
  id: string
  title: string
  organizer: string
  logo: string
  entryDeadline: string
  prize: string
  enrolledCount: number
  tags: string[]
  type: 'Hiring Challenge' | 'Hackathon' | 'Aptitude Test' | 'Case Study'
  eligibility: string
}

export interface InterviewQuestion {
  id: string
  company: string
  logo: string
  role: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  question: string
  category: 'Coding' | 'System Design' | 'Aptitude' | 'HR / Behavioral'
  answerSnippet: string
  votes: number
  timesAsked: number
}

export interface Article {
  id: string
  title: string
  category: string
  readTime: string
  publishedDate: string
  summary: string
  author: string
  authorRole: string
  avatar: string
  tags: string[]
  content: string[]
}

export interface Application {
  id: string
  jobId: string
  jobTitle: string
  company: string
  companyLogo: string
  appliedDate: string
  status: 'Applied' | 'Reviewing' | 'Shortlisted' | 'Interview' | 'Offered' | 'Rejected'
  location: string
  salary: string
}

export interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
  headline: string
  bio: string
  experienceLevel: 'Fresher' | '1-2 Years' | '3-5 Years' | '5+ Years'
  skills: string[]
  education: {
    degree: string
    college: string
    year: string
    grade: string
  }[]
  projects: {
    title: string
    description: string
    techStack: string[]
    githubUrl?: string
    liveUrl?: string
  }[]
  resumeName: string
  profileCompletion: number
}

export interface FilterState {
  keyword: string
  location: string
  experience: string
  department: string[]
  workMode: WorkMode[]
  salaryRanges: string[]
  companyTypes: CompanyType[]
  freshness: string
  sortBy: 'relevance' | 'newest' | 'salary-high'
}

// ==========================================
// ENTERPRISE SAAS DOMAIN TYPES
// ==========================================

export type Persona = 'candidate' | 'recruiter' | 'admin' | 'developer'

export type EnterpriseRole = 'Owner' | 'Admin' | 'Recruiter' | 'Hiring Manager' | 'Billing Viewer'

export interface Organization {
  id: string
  name: string
  slug: string
  logo: string
  domain: string
  plan: 'Free' | 'Pro' | 'Enterprise'
  seatsUsed: number
  seatsMax: number
  createdAt: string
  verified: boolean
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: EnterpriseRole
  twoFactorEnabled: boolean
  lastActive: string
  avatar: string
  status: 'active' | 'invited' | 'suspended'
}

export interface AuditLogEntry {
  id: string
  timestamp: string
  actorName: string
  actorEmail: string
  action: string
  ipAddress: string
  userAgent: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  details: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  date: string
  amount: string
  currency: string
  status: 'Paid' | 'Pending' | 'Draft'
  planName: string
  pdfUrl: string
}

export interface UsageMeter {
  id: string
  name: string
  current: number
  max: number
  unit: string
  warningThreshold: number
}

export interface ApiKey {
  id: string
  name: string
  prefix: string
  maskedKey: string
  createdAt: string
  lastUsed: string
  scope: 'Full Access' | 'Read Only' | 'Jobs & Candidates'
  status: 'active' | 'revoked'
}

export interface WebhookEndpoint {
  id: string
  url: string
  events: string[]
  status: 'Active' | 'Failing' | 'Disabled'
  signingSecret: string
  lastDeliveryStatus: number
  lastDeliveryTime: string
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
  category: 'mention' | 'application' | 'system' | 'billing'
  link?: string
}

export interface IntegrationApp {
  id: string
  name: string
  slug: string
  category: 'ATS' | 'Communication' | 'Sourcing' | 'HRIS' | 'Productivity'
  description: string
  logo: string
  connected: boolean
  featured?: boolean
  rating: number
  reviewsCount: number
}

export interface CaseStudy {
  id: string
  company: string
  companyLogo: string
  headline: string
  metrics: {
    stat: string
    label: string
  }[]
  quote: string
  authorName: string
  authorTitle: string
  industry: string
}



// ==========================================
// ENTERPRISE SAAS PHASE 2 TYPES
// ==========================================

export interface ColumnMapping {
  csvHeader: string
  targetField: string
  sampleValue: string
  required: boolean
  confidence: number // 0 - 100
}

export interface CandidateImportBatch {
  id: string
  fileName: string
  fileSize: string
  uploadedAt: string
  totalRows: number
  validRows: number
  errorRows: number
  status: 'Ready to Map' | 'Validating' | 'Importing' | 'Completed' | 'Failed'
  mappings: ColumnMapping[]
  previewRows: Record<string, string>[]
}

export interface ExportQueueJob {
  id: string
  title: string
  type: 'candidate_resumes_zip' | 'applicant_metrics_csv' | 'compliance_audit_json' | 'campus_results_xlsx'
  status: 'queued' | 'processing' | 'completed' | 'failed'
  progress: number // 0 to 100
  totalRecords: number
  processedRecords: number
  fileSize?: string
  downloadUrl?: string
  createdAt: string
  expiresAt: string
  requestedBy: string
}

export interface DomainVerificationRecord {
  id: string
  domain: string
  status: 'verified' | 'pending' | 'failed'
  verificationType: 'DNS TXT' | 'CNAME'
  txtRecordName: string
  txtRecordValue: string
  autoEnforceSso: boolean
  lastChecked: string
  claimedByOrg: string
  orgLogo: string
}

export interface IpAllowlistRule {
  id: string
  label: string
  cidr: string
  scope: 'All Portals' | 'Recruiter Dashboard' | 'Developer API'
  status: 'active' | 'disabled'
  createdAt: string
  createdBy: string
  lastActive: string
  description: string
}

export interface DataRetentionPolicy {
  id: string
  category: 'Rejected Candidates' | 'Talent Pool Leads' | 'Interview Video Recordings' | 'Assessment Test Results' | 'Audit Access Logs'
  retentionPeriodMonths: number
  autoPurgeEnabled: boolean
  purgeAction: 'Hard Delete' | 'Anonymize PII' | 'Archive & Notify DPO'
  recordsEligible: number
  lastPurgedAt: string
  nextScheduledPurge: string
  dpdpRegulationRef: string
}

export interface SuperAdminTenant {
  id: string
  name: string
  slug: string
  domain: string
  logo: string
  plan: 'Free' | 'Pro' | 'Enterprise'
  mrr: number
  seatsUsed: number
  seatsMax: number
  jobsCount: number
  candidatesCount: number
  joinedDate: string
  healthStatus: 'healthy' | 'at_risk' | 'trial' | 'churned'
  supportTier: 'Dedicated Slack + TAM' | '24/7 Priority Email' | 'Standard'
  primaryAdmin: {
    name: string
    email: string
    phone: string
  }
}

export interface SystemBroadcastMessage {
  id: string
  title: string
  message: string
  severity: 'info' | 'maintenance' | 'critical'
  active: boolean
  audience: 'all' | 'recruiters_only' | 'candidates_only'
  startsAt: string
  endsAt: string
  ctaText?: string
  ctaLink?: string
}

export interface AiScreeningUsage {
  monthlyQuota: number
  usedCredits: number
  costPerScanInr: number
  hardBudgetCapInr: number
  autoShutoffEnabled: boolean
  departments: {
    name: string
    used: number
    allocated: number
    percentage: number
  }[]
  recentEvaluations: {
    id: string
    candidateName: string
    jobRole: string
    matchScore: number
    tokensUsed: number
    evaluatedAt: string
  }[]
}

export interface HiringWorkflowNode {
  id: string
  type: 'trigger' | 'condition' | 'action'
  title: string
  description: string
  config: Record<string, any>
}

export interface HiringWorkflow {
  id: string
  title: string
  description: string
  active: boolean
  triggerEvent: string
  conditionsCount: number
  actionsCount: number
  totalRuns: number
  lastRunAt: string
  nodes: HiringWorkflowNode[]
}

export interface CustomApplicantField {
  id: string
  label: string
  fieldType: 'text' | 'number' | 'select' | 'textarea' | 'boolean' | 'file'
  required: boolean
  placeholder?: string
  options?: string[]
  appliesTo: 'candidate_apply' | 'job_post'
}

export interface WhiteLabelSettings {
  brandName: string
  portalTitle: string
  logoUrl: string
  faviconUrl: string
  primaryColor: string // hex
  customDomain: string
  sslStatus: 'active' | 'provisioning' | 'pending_dns' | 'failed'
  customFields: CustomApplicantField[]
}

export interface QuoteItem {
  id: string
  description: string
  unitPrice: number
  quantity: number
  amount: number
}

export interface ProformaQuote {
  quoteNumber: string
  date: string
  validUntil: string
  clientName: string
  clientGst: string
  billingAddress: string
  contactPerson: string
  contactEmail: string
  planName: string
  items: QuoteItem[]
  subtotal: number
  gstRate: number // 18%
  cgst: number
  sgst: number
  igst: number
  totalAmount: number
  currency: string
  status: 'Draft' | 'Sent' | 'Approved'
}

export interface OwnershipTransferRequest {
  id: string
  currentOwnerName: string
  currentOwnerEmail: string
  targetMemberId: string
  targetMemberName: string
  targetMemberEmail: string
  initiatedAt: string
  status: 'pending_sudo' | 'pending_acceptance' | 'completed' | 'cancelled'
  securityToken: string
}

import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { JobProvider } from './context/JobContext'

// Layouts & Global Components
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { AppLayout } from './components/layout/AppLayout'
import { CommandPaletteModal } from './components/common/CommandPaletteModal'
import { PersonaSwitcher } from './components/common/PersonaSwitcher'
import { CookieConsentModal } from './components/common/CookieConsentModal'
import { QuickApplyModal } from './components/modals/QuickApplyModal'
import { NotificationToast } from './components/common/NotificationToast'

// Public Marketing & Discovery Pages
import { HomePage } from './pages/HomePage'
import { FeaturesPage } from './pages/FeaturesPage'
import { ProductTourPage } from './pages/ProductTourPage'
import { PricingPage } from './pages/PricingPage'
import { IntegrationsPage } from './pages/IntegrationsPage'
import { CustomersPage } from './pages/CustomersPage'
import { CareersPage } from './pages/CareersPage'
import { ContactSalesPage } from './pages/ContactSalesPage'

// Core Candidate Job Discovery Pages
import { JobListingsPage } from './pages/JobListingsPage'
import { JobDetailPage } from './pages/JobDetailPage'
import { CompaniesPage } from './pages/CompaniesPage'
import { CompanyDetailPage } from './pages/CompanyDetailPage'
import { CampusPage } from './pages/CampusPage'
import { InterviewPrepPage } from './pages/InterviewPrepPage'
import { ResumeBuilderPage } from './pages/ResumeBuilderPage'
import { SalariesPage } from './pages/SalariesPage'
import { CareerAdvicePage } from './pages/CareerAdvicePage'
import { CareerArticleDetailPage } from './pages/CareerArticleDetailPage'
import { DashboardPage } from './pages/DashboardPage'
import { ProfilePage } from './pages/ProfilePage'
import { EmployersPage } from './pages/EmployersPage'
import { PostJobPage } from './pages/PostJobPage'

// Authentication & Onboarding Pages
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage'
import { MagicLinkSentPage } from './pages/auth/MagicLinkSentPage'
import { SsoLoginPage } from './pages/auth/SsoLoginPage'
import { MfaPage } from './pages/auth/MfaPage'
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage'
import { VerifyEmailPage } from './pages/auth/VerifyEmailPage'
import { OnboardingWizardPage } from './pages/auth/OnboardingWizardPage'

// Core App & Workspace Pages (rendered within AppLayout)
import { OverviewDashboardPage } from './pages/app/OverviewDashboardPage'
import { CandidateCsvImportPage } from './pages/app/CandidateCsvImportPage'
import { ExportQueuePage } from './pages/app/ExportQueuePage'
import { HiringWorkflowBuilderPage } from './pages/app/HiringWorkflowBuilderPage'
import { NotificationsPage } from './pages/app/NotificationsPage'
import { ReportsPage } from './pages/app/ReportsPage'
import { TrashPage } from './pages/app/TrashPage'

// Enterprise Admin & Team Pages
import { TeamMembersPage } from './pages/admin/TeamMembersPage'
import { RolesMatrixPage } from './pages/admin/RolesMatrixPage'
import { DomainVerificationPage } from './pages/admin/DomainVerificationPage'
import { IpAllowlistPage } from './pages/admin/IpAllowlistPage'
import { DataRetentionPage } from './pages/admin/DataRetentionPage'
import { WhiteLabelPage } from './pages/admin/WhiteLabelPage'
import { OwnershipTransferPage } from './pages/admin/OwnershipTransferPage'
import { AuditLogsPage } from './pages/admin/AuditLogsPage'
import { SessionsPage } from './pages/account/SessionsPage'
import { SsoDirectorySyncPage } from './pages/admin/SsoDirectorySyncPage'

// FinOps & Billing Pages
import { UsageDashboardPage } from './pages/billing/UsageDashboardPage'
import { AiCreditsPage } from './pages/billing/AiCreditsPage'
import { ProformaQuotePage } from './pages/billing/ProformaQuotePage'
import { PaymentMethodsPage } from './pages/billing/PaymentMethodsPage'
import { InvoicesPage } from './pages/billing/InvoicesPage'
import { CancellationFlowPage } from './pages/billing/CancellationFlowPage'

// FastForward & Placement Acceleration
import { FastForwardServicesPage } from './pages/FastForwardServicesPage'

// Enterprise RLS & Infrastructure Security
import { RowLevelSecurityPage } from './pages/admin/RowLevelSecurityPage'
import { BackupsPage } from './pages/admin/BackupsPage'

// Account Lifecycle & GDPR / DPDP Erasure
import { DeleteAccountPage } from './pages/account/DeleteAccountPage'
import { UnsubscribePage } from './pages/account/UnsubscribePage'
import { AnalyticsPreferencesPage } from './pages/account/AnalyticsPreferencesPage'

// Accessibility Modal
import { AccessibilityModal } from './components/common/AccessibilityModal'

// Platform Super-Admin (God Mode)
import { TenantInspectorPage } from './pages/super-admin/TenantInspectorPage'
import { BroadcastBannerPage } from './pages/super-admin/BroadcastBannerPage'

// Developer Platform Pages
import { ApiKeysPage } from './pages/developer/ApiKeysPage'
import { RateLimitConfigPage } from './pages/developer/RateLimitConfigPage'
import { WebhooksPage } from './pages/developer/WebhooksPage'
import { ConnectedAppsPage } from './pages/developer/ConnectedAppsPage'
import { ApiDocsPage } from './pages/developer/ApiDocsPage'
import { ChangelogPage } from './pages/ChangelogPage'

// System, Error & Legal Compliance Pages
import { ForbiddenPage } from './pages/system/ForbiddenPage'
import { ServerErrorPage } from './pages/system/ServerErrorPage'
import { RateLimitPage } from './pages/system/RateLimitPage'
import { StatusPage } from './pages/system/StatusPage'
import { HttpsSslPage } from './pages/system/HttpsSslPage'
import { PrivacyDataPage } from './pages/account/PrivacyDataPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { FaqPage } from './pages/FaqPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'
import { FraudAlertPage } from './pages/FraudAlertPage'
import { SecurityPage } from './pages/SecurityPage'
import { SitemapPage } from './pages/SitemapPage'
import { NotFoundPage } from './pages/NotFoundPage'

// Auto scroll to top on page navigation
const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Shell Router switching between Public Marketing Shell and Enterprise Workspace Layout
const AppContent = () => {
  const location = useLocation()
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault()
        setIsAccessibilityModalOpen((prev: boolean) => !prev)
      }
    }
    const handleCustomOpen = () => setIsAccessibilityModalOpen(true)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-a11y-modal', handleCustomOpen)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-a11y-modal', handleCustomOpen)
    }
  }, [])

  const isWorkspaceRoute =
    location.pathname.startsWith('/app') ||
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/billing') ||
    location.pathname.startsWith('/developer') ||
    location.pathname.startsWith('/account') ||
    location.pathname.startsWith('/super-admin')

  return (
    <>
      <ScrollToTop />
      {isWorkspaceRoute ? (
        <AppLayout>
          <Routes>
            {/* Core Candidate & ATS Operations */}
            <Route path="/app" element={<OverviewDashboardPage />} />
            <Route path="/app/import-candidates" element={<CandidateCsvImportPage />} />
            <Route path="/app/export-queue" element={<ExportQueuePage />} />
            <Route path="/app/workflows" element={<HiringWorkflowBuilderPage />} />
            <Route path="/app/notifications" element={<NotificationsPage />} />
            <Route path="/app/reports" element={<ReportsPage />} />
            <Route path="/app/trash" element={<TrashPage />} />

            {/* Admin & Security Governance */}
            <Route path="/admin/team" element={<TeamMembersPage />} />
            <Route path="/admin/roles" element={<RolesMatrixPage />} />
            <Route path="/admin/domain-verification" element={<DomainVerificationPage />} />
            <Route path="/admin/ip-allowlist" element={<IpAllowlistPage />} />
            <Route path="/admin/data-retention" element={<DataRetentionPage />} />
            <Route path="/admin/branding" element={<WhiteLabelPage />} />
            <Route path="/admin/transfer-ownership" element={<OwnershipTransferPage />} />
            <Route path="/admin/audit-logs" element={<AuditLogsPage />} />
            <Route path="/admin/sso" element={<SsoDirectorySyncPage />} />
            <Route path="/admin/security/rls" element={<RowLevelSecurityPage />} />
            <Route path="/admin/row-level-security" element={<RowLevelSecurityPage />} />
            <Route path="/admin/backups" element={<BackupsPage />} />

            {/* Account & Devices */}
            <Route path="/account/sessions" element={<SessionsPage />} />
            <Route path="/account/privacy-data" element={<PrivacyDataPage />} />
            <Route path="/account/delete-account" element={<DeleteAccountPage />} />
            <Route path="/account/analytics-preferences" element={<AnalyticsPreferencesPage />} />

            {/* FinOps & Procurement */}
            <Route path="/billing/usage" element={<UsageDashboardPage />} />
            <Route path="/billing/ai-credits" element={<AiCreditsPage />} />
            <Route path="/billing/quote-generator" element={<ProformaQuotePage />} />
            <Route path="/billing/payment-methods" element={<PaymentMethodsPage />} />
            <Route path="/billing/invoices" element={<InvoicesPage />} />
            <Route path="/billing/cancel" element={<CancellationFlowPage />} />

            {/* Platform Super-Admin (Founder God Mode) */}
            <Route path="/super-admin/tenants" element={<TenantInspectorPage />} />
            <Route path="/super-admin/broadcast" element={<BroadcastBannerPage />} />

            {/* Developer Platform */}
            <Route path="/developer/api-keys" element={<ApiKeysPage />} />
            <Route path="/developer/rate-limiting" element={<RateLimitConfigPage />} />
            <Route path="/developer/webhooks" element={<WebhooksPage />} />
            <Route path="/developer/apps" element={<ConnectedAppsPage />} />
            <Route path="/developer/docs" element={<ApiDocsPage />} />
          </Routes>
        </AppLayout>
      ) : (
        <div className="min-h-screen flex flex-col bg-slate-50/60 text-slate-900 font-sans antialiased selection:bg-indigo-600 selection:text-white">
          <Navbar />
          <div className="flex-1">
            <Routes>
              {/* Public Marketing & Discovery */}
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/product-tour" element={<ProductTourPage />} />
              <Route path="/integrations" element={<IntegrationsPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/contact-sales" element={<ContactSalesPage />} />
              <Route path="/changelog" element={<ChangelogPage />} />
              <Route path="/status" element={<StatusPage />} />

              {/* Jobs & Candidate Hub */}
              <Route path="/jobs" element={<JobListingsPage />} />
              <Route path="/jobs/freshers" element={<JobListingsPage specialFilter="freshers" />} />
              <Route path="/jobs/remote" element={<JobListingsPage specialFilter="remote" />} />
              <Route path="/jobs/internships" element={<JobListingsPage specialFilter="internships" />} />
              <Route path="/jobs/walk-in" element={<JobListingsPage specialFilter="walk-in" />} />
              <Route path="/jobs/:id" element={<JobDetailPage />} />

              {/* FastForward Placement & Resume Services */}
              <Route path="/services" element={<FastForwardServicesPage />} />
              <Route path="/fastforward" element={<FastForwardServicesPage />} />

              {/* Companies & Campus */}
              <Route path="/companies" element={<CompaniesPage />} />
              <Route path="/companies/:id" element={<CompanyDetailPage />} />
              <Route path="/campus" element={<CampusPage />} />
              <Route path="/campus/contests" element={<CampusPage initialTab="contests" />} />
              <Route path="/campus/tests" element={<CampusPage initialTab="tests" />} />
              <Route path="/campus/webinars" element={<CampusPage initialTab="webinars" />} />

              {/* Tools & Resources */}
              <Route path="/interview-prep" element={<InterviewPrepPage />} />
              <Route path="/resume-builder" element={<ResumeBuilderPage />} />
              <Route path="/salaries" element={<SalariesPage />} />
              <Route path="/career-advice" element={<CareerAdvicePage />} />
              <Route path="/career-advice/:id" element={<CareerArticleDetailPage />} />
              <Route path="/docs" element={<ApiDocsPage />} />

              {/* Candidate Dashboard & Profile */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/account/delete-account" element={<DeleteAccountPage />} />
              <Route path="/account/analytics-preferences" element={<AnalyticsPreferencesPage />} />

              {/* Recruiter & Pricing */}
              <Route path="/employers" element={<EmployersPage />} />
              <Route path="/post-job" element={<PostJobPage />} />
              <Route path="/pricing" element={<PricingPage />} />

              {/* Authentication & Onboarding Flows */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/auth/magic-link-sent" element={<MagicLinkSentPage />} />
              <Route path="/auth/sso" element={<SsoLoginPage />} />
              <Route path="/auth/mfa" element={<MfaPage />} />
              <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
              <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
              <Route path="/onboarding" element={<OnboardingWizardPage />} />

              {/* Trust, Legal & Safety */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/fraud-alert" element={<FraudAlertPage />} />
              <Route path="/security" element={<SecurityPage />} />
              <Route path="/security/ssl" element={<HttpsSslPage />} />
              <Route path="/unsubscribe" element={<UnsubscribePage />} />
              <Route path="/sitemap" element={<SitemapPage />} />

              {/* System Edge Cases & Errors */}
              <Route path="/403" element={<ForbiddenPage />} />
              <Route path="/500" element={<ServerErrorPage />} />
              <Route path="/429" element={<RateLimitPage />} />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      )}

      {/* Global Interactive Elements Accessible Everywhere */}
      <CommandPaletteModal />
      <PersonaSwitcher />
      <CookieConsentModal />
      <QuickApplyModal />
      <NotificationToast />
      <AccessibilityModal
        isOpen={isAccessibilityModalOpen}
        onClose={() => setIsAccessibilityModalOpen(false)}
      />
    </>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <JobProvider>
        <AppContent />
      </JobProvider>
    </BrowserRouter>
  )
}

export default App

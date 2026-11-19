import React, { useEffect, useState, Suspense, lazy } from 'react'
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
import { AccessibilityModal } from './components/common/AccessibilityModal'
import { RouteFallbackLoader } from './components/common/SkeletonLoader'

// Public Marketing & Discovery Pages (Lazy Loaded)
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })))
const FeaturesPage = lazy(() => import('./pages/FeaturesPage').then((m) => ({ default: m.FeaturesPage })))
const ProductTourPage = lazy(() => import('./pages/ProductTourPage').then((m) => ({ default: m.ProductTourPage })))
const PricingPage = lazy(() => import('./pages/PricingPage').then((m) => ({ default: m.PricingPage })))
const IntegrationsPage = lazy(() => import('./pages/IntegrationsPage').then((m) => ({ default: m.IntegrationsPage })))
const CustomersPage = lazy(() => import('./pages/CustomersPage').then((m) => ({ default: m.CustomersPage })))
const CareersPage = lazy(() => import('./pages/CareersPage').then((m) => ({ default: m.CareersPage })))
const ContactSalesPage = lazy(() => import('./pages/ContactSalesPage').then((m) => ({ default: m.ContactSalesPage })))

// Core Candidate Job Discovery Pages (Lazy Loaded)
const JobListingsPage = lazy(() => import('./pages/JobListingsPage').then((m) => ({ default: m.JobListingsPage })))
const JobDetailPage = lazy(() => import('./pages/JobDetailPage').then((m) => ({ default: m.JobDetailPage })))
const CompaniesPage = lazy(() => import('./pages/CompaniesPage').then((m) => ({ default: m.CompaniesPage })))
const CompanyDetailPage = lazy(() => import('./pages/CompanyDetailPage').then((m) => ({ default: m.CompanyDetailPage })))
const CampusPage = lazy(() => import('./pages/CampusPage').then((m) => ({ default: m.CampusPage })))
const InterviewPrepPage = lazy(() => import('./pages/InterviewPrepPage').then((m) => ({ default: m.InterviewPrepPage })))
const ResumeBuilderPage = lazy(() => import('./pages/ResumeBuilderPage').then((m) => ({ default: m.ResumeBuilderPage })))
const SalariesPage = lazy(() => import('./pages/SalariesPage').then((m) => ({ default: m.SalariesPage })))
const CareerAdvicePage = lazy(() => import('./pages/CareerAdvicePage').then((m) => ({ default: m.CareerAdvicePage })))
const CareerArticleDetailPage = lazy(() => import('./pages/CareerArticleDetailPage').then((m) => ({ default: m.CareerArticleDetailPage })))
const DashboardPage = lazy(() => import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage })))
const ProfilePage = lazy(() => import('./pages/ProfilePage').then((m) => ({ default: m.ProfilePage })))
const EmployersPage = lazy(() => import('./pages/EmployersPage').then((m) => ({ default: m.EmployersPage })))
const PostJobPage = lazy(() => import('./pages/PostJobPage').then((m) => ({ default: m.PostJobPage })))

// Authentication & Onboarding Pages (Lazy Loaded)
const LoginPage = lazy(() => import('./pages/LoginPage').then((m) => ({ default: m.LoginPage })))
const RegisterPage = lazy(() => import('./pages/RegisterPage').then((m) => ({ default: m.RegisterPage })))
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })))
const MagicLinkSentPage = lazy(() => import('./pages/auth/MagicLinkSentPage').then((m) => ({ default: m.MagicLinkSentPage })))
const SsoLoginPage = lazy(() => import('./pages/auth/SsoLoginPage').then((m) => ({ default: m.SsoLoginPage })))
const MfaPage = lazy(() => import('./pages/auth/MfaPage').then((m) => ({ default: m.MfaPage })))
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage })))
const VerifyEmailPage = lazy(() => import('./pages/auth/VerifyEmailPage').then((m) => ({ default: m.VerifyEmailPage })))
const OnboardingWizardPage = lazy(() => import('./pages/auth/OnboardingWizardPage').then((m) => ({ default: m.OnboardingWizardPage })))

// Core App & Workspace Pages (rendered within AppLayout, Lazy Loaded)
const OverviewDashboardPage = lazy(() => import('./pages/app/OverviewDashboardPage').then((m) => ({ default: m.OverviewDashboardPage })))
const CandidateCsvImportPage = lazy(() => import('./pages/app/CandidateCsvImportPage').then((m) => ({ default: m.CandidateCsvImportPage })))
const ExportQueuePage = lazy(() => import('./pages/app/ExportQueuePage').then((m) => ({ default: m.ExportQueuePage })))
const HiringWorkflowBuilderPage = lazy(() => import('./pages/app/HiringWorkflowBuilderPage').then((m) => ({ default: m.HiringWorkflowBuilderPage })))
const NotificationsPage = lazy(() => import('./pages/app/NotificationsPage').then((m) => ({ default: m.NotificationsPage })))
const ReportsPage = lazy(() => import('./pages/app/ReportsPage').then((m) => ({ default: m.ReportsPage })))
const TrashPage = lazy(() => import('./pages/app/TrashPage').then((m) => ({ default: m.TrashPage })))

// Enterprise Admin & Team Pages (Lazy Loaded)
const TeamMembersPage = lazy(() => import('./pages/admin/TeamMembersPage').then((m) => ({ default: m.TeamMembersPage })))
const RolesMatrixPage = lazy(() => import('./pages/admin/RolesMatrixPage').then((m) => ({ default: m.RolesMatrixPage })))
const DomainVerificationPage = lazy(() => import('./pages/admin/DomainVerificationPage').then((m) => ({ default: m.DomainVerificationPage })))
const IpAllowlistPage = lazy(() => import('./pages/admin/IpAllowlistPage').then((m) => ({ default: m.IpAllowlistPage })))
const DataRetentionPage = lazy(() => import('./pages/admin/DataRetentionPage').then((m) => ({ default: m.DataRetentionPage })))
const WhiteLabelPage = lazy(() => import('./pages/admin/WhiteLabelPage').then((m) => ({ default: m.WhiteLabelPage })))
const OwnershipTransferPage = lazy(() => import('./pages/admin/OwnershipTransferPage').then((m) => ({ default: m.OwnershipTransferPage })))
const AuditLogsPage = lazy(() => import('./pages/admin/AuditLogsPage').then((m) => ({ default: m.AuditLogsPage })))
const SessionsPage = lazy(() => import('./pages/account/SessionsPage').then((m) => ({ default: m.SessionsPage })))
const SsoDirectorySyncPage = lazy(() => import('./pages/admin/SsoDirectorySyncPage').then((m) => ({ default: m.SsoDirectorySyncPage })))

// FinOps & Billing Pages (Lazy Loaded)
const UsageDashboardPage = lazy(() => import('./pages/billing/UsageDashboardPage').then((m) => ({ default: m.UsageDashboardPage })))
const AiCreditsPage = lazy(() => import('./pages/billing/AiCreditsPage').then((m) => ({ default: m.AiCreditsPage })))
const ProformaQuotePage = lazy(() => import('./pages/billing/ProformaQuotePage').then((m) => ({ default: m.ProformaQuotePage })))
const PaymentMethodsPage = lazy(() => import('./pages/billing/PaymentMethodsPage').then((m) => ({ default: m.PaymentMethodsPage })))
const InvoicesPage = lazy(() => import('./pages/billing/InvoicesPage').then((m) => ({ default: m.InvoicesPage })))
const CancellationFlowPage = lazy(() => import('./pages/billing/CancellationFlowPage').then((m) => ({ default: m.CancellationFlowPage })))

// FastForward & Placement Acceleration (Lazy Loaded)
const FastForwardServicesPage = lazy(() => import('./pages/FastForwardServicesPage').then((m) => ({ default: m.FastForwardServicesPage })))

// Enterprise RLS & Infrastructure Security (Lazy Loaded)
const RowLevelSecurityPage = lazy(() => import('./pages/admin/RowLevelSecurityPage').then((m) => ({ default: m.RowLevelSecurityPage })))
const BackupsPage = lazy(() => import('./pages/admin/BackupsPage').then((m) => ({ default: m.BackupsPage })))

// Account Lifecycle & GDPR / DPDP Erasure (Lazy Loaded)
const DeleteAccountPage = lazy(() => import('./pages/account/DeleteAccountPage').then((m) => ({ default: m.DeleteAccountPage })))
const UnsubscribePage = lazy(() => import('./pages/account/UnsubscribePage').then((m) => ({ default: m.UnsubscribePage })))
const AnalyticsPreferencesPage = lazy(() => import('./pages/account/AnalyticsPreferencesPage').then((m) => ({ default: m.AnalyticsPreferencesPage })))

// Platform Super-Admin (God Mode, Lazy Loaded)
const TenantInspectorPage = lazy(() => import('./pages/super-admin/TenantInspectorPage').then((m) => ({ default: m.TenantInspectorPage })))
const BroadcastBannerPage = lazy(() => import('./pages/super-admin/BroadcastBannerPage').then((m) => ({ default: m.BroadcastBannerPage })))

// Developer Platform Pages (Lazy Loaded)
const ApiKeysPage = lazy(() => import('./pages/developer/ApiKeysPage').then((m) => ({ default: m.ApiKeysPage })))
const RateLimitConfigPage = lazy(() => import('./pages/developer/RateLimitConfigPage').then((m) => ({ default: m.RateLimitConfigPage })))
const WebhooksPage = lazy(() => import('./pages/developer/WebhooksPage').then((m) => ({ default: m.WebhooksPage })))
const ConnectedAppsPage = lazy(() => import('./pages/developer/ConnectedAppsPage').then((m) => ({ default: m.ConnectedAppsPage })))
const ApiDocsPage = lazy(() => import('./pages/developer/ApiDocsPage').then((m) => ({ default: m.ApiDocsPage })))
const ChangelogPage = lazy(() => import('./pages/ChangelogPage').then((m) => ({ default: m.ChangelogPage })))

// System, Error & Legal Compliance Pages (Lazy Loaded)
const ForbiddenPage = lazy(() => import('./pages/system/ForbiddenPage').then((m) => ({ default: m.ForbiddenPage })))
const ServerErrorPage = lazy(() => import('./pages/system/ServerErrorPage').then((m) => ({ default: m.ServerErrorPage })))
const RateLimitPage = lazy(() => import('./pages/system/RateLimitPage').then((m) => ({ default: m.RateLimitPage })))
const StatusPage = lazy(() => import('./pages/system/StatusPage').then((m) => ({ default: m.StatusPage })))
const HttpsSslPage = lazy(() => import('./pages/system/HttpsSslPage').then((m) => ({ default: m.HttpsSslPage })))
const PrivacyDataPage = lazy(() => import('./pages/account/PrivacyDataPage').then((m) => ({ default: m.PrivacyDataPage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const FaqPage = lazy(() => import('./pages/FaqPage').then((m) => ({ default: m.FaqPage })))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })))
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })))
const FraudAlertPage = lazy(() => import('./pages/FraudAlertPage').then((m) => ({ default: m.FraudAlertPage })))
const SecurityPage = lazy(() => import('./pages/SecurityPage').then((m) => ({ default: m.SecurityPage })))
const SitemapPage = lazy(() => import('./pages/SitemapPage').then((m) => ({ default: m.SitemapPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

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
          <Suspense fallback={<RouteFallbackLoader />}>
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
          </Suspense>
        </AppLayout>
      ) : (
        <div className="min-h-screen flex flex-col bg-slate-50/60 text-slate-900 font-sans antialiased selection:bg-indigo-600 selection:text-white">
          <Navbar />
          <div className="flex-1">
            <Suspense fallback={<RouteFallbackLoader />}>
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
            </Suspense>
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

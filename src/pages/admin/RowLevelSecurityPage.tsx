import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Database,
  Lock,
  Code2,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Layers,
  ChevronRight,
  Eye,
  Key
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

interface RlsPolicy {
  id: string
  tableName: string
  policyName: string
  command: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'ALL'
  roles: string[]
  usingExpression: string
  withCheckExpression?: string
  status: 'ACTIVE' | 'ENFORCING'
  recordsCount: string
}

const RLS_POLICIES: RlsPolicy[] = [
  {
    id: 'pol-1',
    tableName: 'candidates',
    policyName: 'tenant_candidate_isolation_policy',
    command: 'ALL',
    roles: ['authenticated_recruiter', 'ats_service_role'],
    usingExpression: `tenant_id = (current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id')::uuid`,
    withCheckExpression: `tenant_id = (current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id')::uuid`,
    status: 'ENFORCING',
    recordsCount: '142,850 rows'
  },
  {
    id: 'pol-2',
    tableName: 'resumes',
    policyName: 'candidate_and_authorized_recruiter_resume_access',
    command: 'SELECT',
    roles: ['authenticated'],
    usingExpression: `(auth.uid() = candidate_user_id) OR (EXISTS (SELECT 1 FROM job_applications ja WHERE ja.resume_id = resumes.id AND ja.tenant_id = (current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id')::uuid))`,
    status: 'ENFORCING',
    recordsCount: '89,420 files'
  },
  {
    id: 'pol-3',
    tableName: 'job_applications',
    policyName: 'strict_application_tenant_isolation',
    command: 'ALL',
    roles: ['recruiter', 'hiring_manager'],
    usingExpression: `tenant_id = current_tenant_id()`,
    withCheckExpression: `tenant_id = current_tenant_id()`,
    status: 'ACTIVE',
    recordsCount: '210,500 rows'
  },
  {
    id: 'pol-4',
    tableName: 'audit_logs',
    policyName: 'immutable_tenant_audit_trail',
    command: 'SELECT',
    roles: ['security_auditor', 'tenant_admin'],
    usingExpression: `tenant_id = current_tenant_id()`,
    status: 'ENFORCING',
    recordsCount: '1,420,900 logs'
  },
  {
    id: 'pol-5',
    tableName: 'salary_compensation_records',
    policyName: 'ciso_pii_ctc_masking_policy',
    command: 'SELECT',
    roles: ['authorized_hr_lead'],
    usingExpression: `tenant_id = current_tenant_id() AND (current_user_has_permission('view_compensation'))`,
    status: 'ENFORCING',
    recordsCount: '34,120 records'
  }
]

export const RowLevelSecurityPage: React.FC = () => {
  const { activeOrg, showNotification } = useJobContext()
  const [selectedPolicy, setSelectedPolicy] = useState<RlsPolicy>(RLS_POLICIES[0])
  const [simulatedTenant, setSimulatedTenant] = useState<'current' | 'competitor' | 'anonymous'>('current')
  const [simulationRunning, setSimulationRunning] = useState(false)
  const [simulationResult, setSimulationResult] = useState<{
    query: string
    rowsReturned: number
    leakageDetected: boolean
    executionTimeMs: number
    jwtClaimsChecked: string
  } | null>(null)

  const runSimulation = () => {
    setSimulationRunning(true)
    setSimulationResult(null)

    setTimeout(() => {
      setSimulationRunning(false)
      if (simulatedTenant === 'current') {
        setSimulationResult({
          query: `SELECT id, name, cgpa, email, ctc FROM candidates LIMIT 10;`,
          rowsReturned: 8,
          leakageDetected: false,
          executionTimeMs: 1.42,
          jwtClaimsChecked: `{"sub":"usr_9921","tenant_id":"${activeOrg.id}","role":"recruiter"}`
        })
        showNotification('Simulation executed: Query returned 8 tenant-scoped records. Zero data leakage.')
      } else if (simulatedTenant === 'competitor') {
        setSimulationResult({
          query: `SELECT id, name, cgpa, email, ctc FROM candidates WHERE tenant_id = '${activeOrg.id}' LIMIT 10;`,
          rowsReturned: 0,
          leakageDetected: false,
          executionTimeMs: 0.94,
          jwtClaimsChecked: `{"sub":"hacker_bad","tenant_id":"org_competitor_778","role":"recruiter"}`
        })
        showNotification('Security Check PASSED: 0 rows returned. Cross-tenant access cryptographically blocked!')
      } else {
        setSimulationResult({
          query: `SELECT id, name, cgpa, email, ctc FROM candidates;`,
          rowsReturned: 0,
          leakageDetected: false,
          executionTimeMs: 0.48,
          jwtClaimsChecked: `{"role":"anon"}`
        })
        showNotification('Security Check PASSED: Unauthenticated access rejected by Postgres RLS kernel.')
      }
    }, 700)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb & Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/app" className="hover:text-indigo-600">Enterprise Console</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/admin/team" className="hover:text-indigo-600">Security & Governance</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold">Row-Level Security (RLS)</span>
      </nav>

      {/* Hero Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            PostgreSQL 16 Multi-Tenant RLS Kernel Active
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Row-Level Security (RLS) Policies
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Strict database-level cryptographic boundaries ensure candidate resumes, applications, and CTC compensation data are inaccessible across rival corporate tenants, even under malicious SQL injection attempts.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-1 text-center min-w-[140px]">
            <div className="text-2xl font-black text-emerald-400">100%</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Tenant Isolation</div>
          </div>
          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl space-y-1 text-center min-w-[140px]">
            <div className="text-2xl font-black text-indigo-700">5 Active</div>
            <div className="text-[10px] text-indigo-600 uppercase tracking-wider font-semibold">Table Policies</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Policies Inventory + DDL Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Policy List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Enforced Database Tables
          </div>

          <div className="space-y-2">
            {RLS_POLICIES.map((pol) => {
              const isSelected = selectedPolicy.id === pol.id
              return (
                <button
                  key={pol.id}
                  onClick={() => setSelectedPolicy(pol)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-300 ring-2 ring-indigo-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Database className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`} />
                      <span className="font-bold text-sm text-slate-900 font-mono">
                        public.{pol.tableName}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                      {pol.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 font-mono mt-1.5 truncate">
                    {pol.policyName}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                      <Lock className="w-3 h-3 text-indigo-500" />
                      Command: {pol.command}
                    </span>
                    <span>{pol.recordsCount}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* CISO Security Callout */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl text-xs space-y-2 border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Lock className="w-4 h-4" />
              Defense-In-Depth Guarantee
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              RLS policies are executed inside the PostgreSQL database engine kernel. Even if an application bug omits a <code>WHERE tenant_id = ...</code> clause, PostgreSQL will automatically deny access to unauthorized tenant rows.
            </p>
          </div>
        </div>

        {/* Right: Policy DDL Code & Interactive Simulator (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Policy DDL Code Viewer */}
          <div className="bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider font-mono">
                <Code2 className="w-4 h-4" />
                SQL DDL Specification
              </div>
              <span className="text-[11px] text-slate-400 font-mono">PostgreSQL 16.2</span>
            </div>

            <pre className="text-xs font-mono text-emerald-400 leading-relaxed overflow-x-auto bg-slate-900/90 p-4 rounded-xl border border-slate-800">
{`-- Enable Row Level Security
ALTER TABLE public.${selectedPolicy.tableName} ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.${selectedPolicy.tableName} FORCE ROW LEVEL SECURITY;

-- Cryptographic Isolation Policy Definition
CREATE POLICY "${selectedPolicy.policyName}"
ON public.${selectedPolicy.tableName}
FOR ${selectedPolicy.command}
TO ${selectedPolicy.roles.join(', ')}
USING (
  ${selectedPolicy.usingExpression}
)${selectedPolicy.withCheckExpression ? `\nWITH CHECK (\n  ${selectedPolicy.withCheckExpression}\n);` : ';'}`}
            </pre>

            <div className="text-[11px] text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Bypassed by Superuser only; all standard recruiter and candidate connections strictly bounded.</span>
            </div>
          </div>

          {/* Interactive RLS Tenant Boundary Simulator */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Play className="w-4 h-4 text-indigo-600" />
                  Live Tenant Boundary Breach Simulator
                </h3>
                <p className="text-xs text-slate-500">
                  Simulate an attempt to access table <code>{selectedPolicy.tableName}</code> from different JWT identity contexts.
                </p>
              </div>
            </div>

            {/* Persona Simulator Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setSimulatedTenant('current')}
                className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                  simulatedTenant === 'current'
                    ? 'border-indigo-600 bg-indigo-50/80 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">Valid Recruiter JWT</div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">Tenant: {activeOrg.name}</div>
              </button>

              <button
                onClick={() => setSimulatedTenant('competitor')}
                className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                  simulatedTenant === 'competitor'
                    ? 'border-red-600 bg-red-50/80 ring-2 ring-red-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold text-red-900 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-red-500" />
                  Rival Competitor JWT
                </div>
                <div className="text-[10px] text-red-600 truncate mt-0.5">Attempt Cross-Tenant Leak</div>
              </button>

              <button
                onClick={() => setSimulatedTenant('anonymous')}
                className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                  simulatedTenant === 'anonymous'
                    ? 'border-amber-600 bg-amber-50/80 ring-2 ring-amber-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold text-amber-900">Anonymous / Public</div>
                <div className="text-[10px] text-amber-600 truncate mt-0.5">Zero Authentication Claims</div>
              </button>
            </div>

            {/* Run Button */}
            <button
              onClick={runSimulation}
              disabled={simulationRunning}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              {simulationRunning ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  Executing Kernel RLS Query...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Simulate Query Execution
                </>
              )}
            </button>

            {/* Simulation Results Display */}
            {simulationResult && (
              <div
                className={`p-5 rounded-2xl border space-y-3 animate-in fade-in duration-200 ${
                  simulationResult.leakageDetected
                    ? 'bg-red-50 border-red-200 text-red-900'
                    : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Security Verification: 0 Data Leakage
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-slate-500">
                    Execution: {simulationResult.executionTimeMs} ms
                  </span>
                </div>

                <div className="space-y-1 font-mono text-xs bg-white/80 p-3 rounded-xl border border-emerald-100">
                  <div className="text-slate-500 text-[10px] uppercase font-bold">Query:</div>
                  <div className="text-slate-800">{simulationResult.query}</div>
                  <div className="text-slate-500 text-[10px] uppercase font-bold pt-1.5">JWT Context:</div>
                  <div className="text-slate-700 truncate">{simulationResult.jwtClaimsChecked}</div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="font-semibold">
                    Rows Returned:{' '}
                    <strong className="text-slate-900 font-bold">{simulationResult.rowsReturned}</strong>
                  </span>
                  <span className="text-emerald-700 font-bold">
                    {simulationResult.rowsReturned > 0
                      ? '✓ Authorized Tenant Records Only'
                      : '✓ Unauthorized Query Completely Blocked (Empty Set)'}
                  </span>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  )
}


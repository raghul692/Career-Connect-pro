import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Lock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  RefreshCw
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const HttpsSslPage: React.FC = () => {
  const { showNotification } = useJobContext()
  const [testingRedirect, setTestingRedirect] = useState(false)
  const [redirectResult, setRedirectResult] = useState<{
    inboundUrl: string
    statusCode: number
    targetUrl: string
    hstsHeaderPresent: boolean
  } | null>(null)

  const handleTestRedirect = () => {
    setTestingRedirect(true)
    setRedirectResult(null)
    setTimeout(() => {
      setTestingRedirect(false)
      setRedirectResult({
        inboundUrl: 'http://careerconnectpro.com/jobs',
        statusCode: 301,
        targetUrl: 'https://careerconnectpro.com/jobs',
        hstsHeaderPresent: true
      })
      showNotification('HTTPS Redirect Test PASSED: Seamless 301 redirect with HSTS header enforced.')
    }, 600)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/security" className="hover:text-indigo-600">Trust & Security</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold">HTTPS & SSL/TLS Verification</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Qualys SSL Labs A+ Grade Verified
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            HTTPS & SSL Transport Security
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Every byte transferred between job seekers, enterprise recruiters, and our backend clusters is encrypted via TLS 1.3 with automated certificate renewal and strict HSTS preloading.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-1 text-center min-w-[130px]">
            <div className="text-2xl font-black text-emerald-400">TLS 1.3</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Protocol Level</div>
          </div>
          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl space-y-1 text-center min-w-[130px]">
            <div className="text-2xl font-black text-indigo-700">256-bit</div>
            <div className="text-[10px] text-indigo-600 uppercase tracking-wider font-semibold">AES-GCM Cipher</div>
          </div>
        </div>
      </div>

      {/* Certificate Details Card */}
      <div className="bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-emerald-400" />
            <h2 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              X.509 SSL Certificate Specification
            </h2>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Valid & Trusted
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="space-y-1 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div className="text-slate-400 text-[11px] uppercase">Common Name (CN)</div>
            <div className="text-white font-bold">*.careerconnectpro.com</div>
          </div>

          <div className="space-y-1 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div className="text-slate-400 text-[11px] uppercase">Certificate Authority (Issuer)</div>
            <div className="text-indigo-400 font-bold">Let&apos;s Encrypt / ISRG Root X1</div>
          </div>

          <div className="space-y-1 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div className="text-slate-400 text-[11px] uppercase">Public Key Algorithm</div>
            <div className="text-emerald-400 font-bold">Elliptic Curve ECDSA (secp384r1 / 384 bits)</div>
          </div>

          <div className="space-y-1 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div className="text-slate-400 text-[11px] uppercase">Validity Period</div>
            <div className="text-slate-200">Active (Auto-renews every 60 days via ACME v2)</div>
          </div>
        </div>

        <div className="space-y-1.5 bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs font-mono">
          <div className="text-slate-400 text-[11px] uppercase">SHA-256 Fingerprint:</div>
          <div className="text-amber-400 break-all">
            4E:71:0C:8B:2F:3A:9D:6C:51:7A:49:12:8B:0E:54:19:D2:8C:31:0B:44:91:6F:09:A8:12:5E:3C:D1:44:7E:90
          </div>
        </div>
      </div>

      {/* Security Headers Verification Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1">
          <h2 className="text-base font-extrabold text-slate-900">HTTP Response Security Headers</h2>
          <p className="text-xs text-slate-500">
            All responses emitted from Cloudflare CDN edge nodes include strict security headers to prevent XSS, MIME sniffing, and framing attacks.
          </p>
        </div>

        <div className="space-y-2.5 text-xs">
          {[
            {
              header: 'Strict-Transport-Security (HSTS)',
              value: 'max-age=31536000; includeSubDomains; preload',
              status: 'A+',
              detail: 'Enforces browser-level HTTPS only for 1 year, even if a user explicitly types http://.'
            },
            {
              header: 'Content-Security-Policy (CSP)',
              value: "default-src 'self'; script-src 'self' 'nonce-...' https://apis.google.com;",
              status: 'Strict',
              detail: 'Prevents arbitrary third-party inline JavaScript execution and malicious XSS injections.'
            },
            {
              header: 'X-Frame-Options',
              value: 'DENY',
              status: 'Enforced',
              detail: 'Blocks embedding of Career Connect Pro in malicious iframes to prevent clickjacking.'
            },
            {
              header: 'X-Content-Type-Options',
              value: 'nosniff',
              status: 'Enforced',
              detail: 'Forces browsers to adhere to explicit MIME types and prevents executable spoofing.'
            },
            {
              header: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
              status: 'Compliant',
              detail: 'Prevents leakage of sensitive candidate URLs and search queries to external sites.'
            }
          ].map((item) => (
            <div key={item.header} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="font-bold text-slate-900 font-mono text-[11px]">{item.header}</div>
                <div className="text-indigo-600 font-mono text-[10px] break-all">{item.value}</div>
                <div className="text-slate-500 text-[11px]">{item.detail}</div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 self-start sm:self-auto shrink-0">
                {item.status}
              </span>
            </div>
          ))}
        </div>

        {/* Live HTTP-to-HTTPS Redirect Simulator */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900">Automated HTTP &rarr; HTTPS Redirect Test</div>
              <div className="text-[11px] text-slate-500">Verify non-secure requests are immediately promoted to encrypted TLS</div>
            </div>

            <button
              onClick={handleTestRedirect}
              disabled={testingRedirect}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testingRedirect ? 'animate-spin' : ''}`} />
              {testingRedirect ? 'Testing Redirect...' : 'Simulate Non-Secure Request'}
            </button>
          </div>

          {redirectResult && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Permanent Redirect Enforced (HTTP 301 Moved Permanently)
              </div>
              <div className="font-mono text-[11px] text-slate-700 space-y-1">
                <div>Client Requested: <span className="text-red-700">{redirectResult.inboundUrl}</span></div>
                <div>Server Promoted: <span className="text-emerald-700 font-bold">{redirectResult.targetUrl}</span></div>
                <div>HSTS Preload Header: <span className="text-emerald-700 font-bold">Present (max-age=31536000)</span></div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}


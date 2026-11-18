import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Database,
  CloudDownload,
  RotateCcw,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Play,
  HardDrive,
  Calendar,
  Layers,
  ChevronRight,
  Server
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

interface BackupSnapshot {
  id: string
  timestamp: string
  size: string
  type: 'Automated Daily' | 'Hourly Incremental' | 'Manual On-Demand' | 'Pre-Migration'
  status: 'Completed' | 'Verified'
  region: string
  checksum: string
}

const INITIAL_SNAPSHOTS: BackupSnapshot[] = [
  {
    id: 'snap-20261102-0800',
    timestamp: 'Today at 08:00 AM (14 mins ago)',
    size: '14.8 GB',
    type: 'Hourly Incremental',
    status: 'Verified',
    region: 'AWS Mumbai (ap-south-1)',
    checksum: 'sha256:8f4a...92b1'
  },
  {
    id: 'snap-20261102-0000',
    timestamp: 'Today at 12:00 AM',
    size: '48.2 GB',
    type: 'Automated Daily',
    status: 'Verified',
    region: 'AWS Mumbai + GCS Frankfurt',
    checksum: 'sha256:1e2b...44a7'
  },
  {
    id: 'snap-20261101-0000',
    timestamp: 'Yesterday at 12:00 AM',
    size: '47.9 GB',
    type: 'Automated Daily',
    status: 'Verified',
    region: 'AWS Mumbai + GCS Frankfurt',
    checksum: 'sha256:c93a...d811'
  },
  {
    id: 'snap-20261031-1830',
    timestamp: '31 Oct 2026 at 06:30 PM',
    size: '47.6 GB',
    type: 'Pre-Migration',
    status: 'Completed',
    region: 'AWS Mumbai (Immutable WORM)',
    checksum: 'sha256:77ae...2041'
  }
]

export const BackupsPage: React.FC = () => {
  const { showNotification } = useJobContext()
  const [snapshots, setSnapshots] = useState<BackupSnapshot[]>(INITIAL_SNAPSHOTS)
  const [pitrMinutesAgo, setPitrMinutesAgo] = useState<number>(45)
  const [isCreatingBackup, setIsCreatingBackup] = useState(false)
  const [isRestoringSandbox, setIsRestoringSandbox] = useState(false)
  const [sandboxRestored, setSandboxRestored] = useState(false)

  const handleCreateSnapshot = () => {
    setIsCreatingBackup(true)
    setTimeout(() => {
      setIsCreatingBackup(false)
      const newSnap: BackupSnapshot = {
        id: `snap-${Date.now().toString().slice(-8)}`,
        timestamp: 'Just now (On-Demand)',
        size: '14.9 GB',
        type: 'Manual On-Demand',
        status: 'Verified',
        region: 'AWS Mumbai (ap-south-1)',
        checksum: `sha256:${Math.random().toString(16).substring(2, 10)}...`
      }
      setSnapshots([newSnap, ...snapshots])
      showNotification('Snapshot created and cryptographically verified in S3!')
    }, 1200)
  }

  const handleRestoreSandbox = () => {
    setIsRestoringSandbox(true)
    setSandboxRestored(false)
    setTimeout(() => {
      setIsRestoringSandbox(false)
      setSandboxRestored(true)
      showNotification(`Sandbox successfully restored to state at ${pitrMinutesAgo} minutes ago. PII masked.`)
    }, 1500)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/app" className="hover:text-indigo-600">Enterprise Console</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/admin/team" className="hover:text-indigo-600">Governance & Reliability</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold">Automated Backups & Disaster Recovery</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Continuous WAL Archival & PITR Active
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Database Backups & Disaster Recovery (DR)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Automated hourly snapshots, continuous Write-Ahead Log streaming, and multi-cloud geographic replication ensure zero data loss with RPO &lt; 2 minutes and RTO &lt; 15 minutes.
          </p>
        </div>

        <button
          onClick={handleCreateSnapshot}
          disabled={isCreatingBackup}
          className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-colors self-start md:self-auto shrink-0"
        >
          <Database className={`w-4 h-4 ${isCreatingBackup ? 'animate-bounce' : ''}`} />
          {isCreatingBackup ? 'Taking Snapshot...' : 'Create Snapshot Now'}
        </button>
      </div>

      {/* 3-2-1 Backup Rule Compliance Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">3 Data Copies</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <div className="text-base font-extrabold text-slate-900">Triple Redundancy</div>
          <p className="text-xs text-slate-500">
            Primary Postgres cluster + hot standby replica + encrypted object store archive.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">2 Storage Media</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <div className="text-base font-extrabold text-slate-900">Multi-Cloud Isolation</div>
          <p className="text-xs text-slate-500">
            AWS S3 (Mumbai, India) mirrored hourly to Google Cloud Storage (Frankfurt, EU).
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">1 Immutable Copy</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <div className="text-base font-extrabold text-slate-900">WORM Ransomware Guard</div>
          <p className="text-xs text-slate-500">
            S3 Object Lock prevents alteration or deletion of backups even under compromised root keys.
          </p>
        </div>
      </div>

      {/* Interactive Point-in-Time Recovery (PITR) Sandbox Tool */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              Point-in-Time Recovery (PITR) Sandbox
            </h3>
            <p className="text-xs text-slate-500">
              Restore the database to any exact minute in the past 35 days without impacting production traffic.
            </p>
          </div>

          <div className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-xl text-xs font-mono font-bold text-indigo-700">
            Restore Target: {pitrMinutesAgo} minutes ago
          </div>
        </div>

        {/* Time Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-600 font-medium">
            <span>Now (Latest commit)</span>
            <span>24 Hours Ago</span>
            <span>7 Days Ago</span>
            <span>35 Days (Retention Limit)</span>
          </div>
          <input
            type="range"
            min="5"
            max="1440"
            step="15"
            value={pitrMinutesAgo}
            onChange={(e) => {
              setPitrMinutesAgo(Number(e.target.value))
              setSandboxRestored(false)
            }}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Restores into an ephemeral staging database with synthetic data masking enabled.</span>
          </div>

          <button
            onClick={handleRestoreSandbox}
            disabled={isRestoringSandbox}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRestoringSandbox ? 'animate-spin' : ''}`} />
            {isRestoringSandbox ? 'Spawning Sandbox Database...' : 'Restore Staging Sandbox'}
          </button>
        </div>

        {sandboxRestored && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 font-bold text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Staging Sandbox Database Ready
            </div>
            <p className="text-emerald-800">
              Isolated database cluster provisioned at <code>postgres://sandbox-pitr-881.internal:5432/careerconnect_test</code>. PII phone numbers and salaries masked for developer safety.
            </p>
          </div>
        )}
      </div>

      {/* Snapshots Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-base text-slate-900">Available Immutable Snapshots</h3>
          <span className="text-xs text-slate-500">{snapshots.length} Verified Copies</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Snapshot ID & Timestamp</th>
                <th className="px-6 py-3.5">Type</th>
                <th className="px-6 py-3.5">Size</th>
                <th className="px-6 py-3.5">Storage Region</th>
                <th className="px-6 py-3.5">Integrity</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {snapshots.map((snap) => (
                <tr key={snap.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-slate-900">
                    <div>{snap.id}</div>
                    <div className="text-[11px] text-slate-500 font-sans">{snap.timestamp}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700">
                      {snap.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-slate-900">{snap.size}</td>
                  <td className="px-6 py-4 text-slate-600">{snap.region}</td>
                  <td className="px-6 py-4 font-mono text-[11px] text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {snap.checksum}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => showNotification(`Initiated encrypted download of ${snap.id}. Check downloads folder.`)}
                      className="px-3 py-1.5 border border-slate-200 hover:border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 font-semibold cursor-pointer transition-colors"
                    >
                      Download Archive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


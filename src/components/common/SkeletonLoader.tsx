import React from 'react'

export const SkeletonMetricCard: React.FC = () => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 animate-pulse space-y-3">
    <div className="flex items-center justify-between">
      <div className="h-4 bg-slate-200 rounded w-24" />
      <div className="w-8 h-8 bg-slate-200 rounded-lg" />
    </div>
    <div className="h-7 bg-slate-200 rounded w-16" />
    <div className="h-3 bg-slate-100 rounded w-32" />
  </div>
)

export const SkeletonTableRow: React.FC = () => (
  <tr className="animate-pulse border-b border-slate-100">
    <td className="py-4 px-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-200" />
        <div className="space-y-1.5">
          <div className="h-3.5 bg-slate-200 rounded w-28" />
          <div className="h-2.5 bg-slate-100 rounded w-40" />
        </div>
      </div>
    </td>
    <td className="py-4 px-4">
      <div className="h-4 bg-slate-200 rounded w-16" />
    </td>
    <td className="py-4 px-4">
      <div className="h-4 bg-slate-200 rounded w-24" />
    </td>
    <td className="py-4 px-4 text-right">
      <div className="h-4 bg-slate-200 rounded w-12 ml-auto" />
    </td>
  </tr>
)

export const SkeletonJobCard: React.FC = () => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 animate-pulse space-y-4">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-slate-200 rounded-2xl" />
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-slate-200 rounded w-1/2" />
        <div className="h-3 bg-slate-100 rounded w-1/4" />
      </div>
    </div>
    <div className="flex gap-2">
      <div className="h-6 bg-slate-100 rounded w-20" />
      <div className="h-6 bg-slate-100 rounded w-24" />
      <div className="h-6 bg-slate-100 rounded w-28" />
    </div>
    <div className="h-10 bg-slate-100 rounded-xl" />
  </div>
)

export const RouteFallbackLoader: React.FC = () => (
  <div
    className="min-h-[55vh] flex flex-col items-center justify-center p-8 space-y-4 animate-pulse"
    role="status"
    aria-label="Loading page content"
  >
    <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
      <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
    </div>
    <div className="h-3 w-32 bg-slate-200 rounded-full" />
    <span className="sr-only">Loading page content...</span>
  </div>
)


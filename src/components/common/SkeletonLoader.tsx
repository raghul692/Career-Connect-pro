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


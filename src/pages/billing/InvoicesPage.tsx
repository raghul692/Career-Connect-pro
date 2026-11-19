import React, { useState } from 'react'
import { Download, Eye, X } from 'lucide-react'
import { useJobContext } from '../../context/JobContext'
import { Invoice } from '../../types'

export const InvoicesPage: React.FC = () => {
  const { invoices, showNotification, activeOrg } = useJobContext()
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const handleDownloadPdf = (invoiceNumber: string) => {
    showNotification(`Downloading official tax receipt: ${invoiceNumber}.pdf`)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Invoices & Billing History</h1>
          <p className="text-xs text-slate-500">Download GST-compliant tax invoices, receipts, and subscription charges</p>
        </div>

        <div className="text-xs font-semibold text-slate-500">
          Billing Email: <strong className="text-slate-800">finance@{activeOrg.domain}</strong>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-6">Invoice #</th>
                <th className="py-3.5 px-4">Billing Date</th>
                <th className="py-3.5 px-4">Plan / Description</th>
                <th className="py-3.5 px-4 text-center">Amount</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80">
                  <td className="py-4 px-6 font-mono font-bold text-slate-900">{inv.invoiceNumber}</td>
                  <td className="py-4 px-4 text-slate-500">{inv.date}</td>
                  <td className="py-4 px-4 font-semibold text-slate-800">{inv.planName}</td>
                  <td className="py-4 px-4 text-center font-mono font-bold text-slate-900">{inv.amount}</td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" /> View
                    </button>
                    <button
                      onClick={() => handleDownloadPdf(inv.invoiceNumber)}
                      className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Viewer Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 space-y-6 border border-slate-200 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="font-extrabold text-xl text-slate-900">Career Connect Pro Pvt Ltd</div>
                <div className="text-xs text-slate-400">GSTIN: 29AAAAA0000A1Z5 · Koramangala, Bengaluru</div>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <div className="text-slate-400 font-bold uppercase text-[10px]">Billed To</div>
                <div className="font-bold text-slate-900">{activeOrg.name}</div>
                <div className="text-slate-600">GSTIN: 33AABCT2319P1Z8</div>
                <div className="text-slate-500">finance@{activeOrg.domain}</div>
              </div>
              <div className="space-y-1 text-right">
                <div className="text-slate-400 font-bold uppercase text-[10px]">Invoice Details</div>
                <div className="font-mono font-bold text-slate-900">{selectedInvoice.invoiceNumber}</div>
                <div className="text-slate-600">Date: {selectedInvoice.date}</div>
                <div className="text-emerald-600 font-bold">Status: {selectedInvoice.status} (Paid via Card)</div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-4">Line Item</th>
                    <th className="py-2.5 px-4 text-right">Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-800">{selectedInvoice.planName}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">{selectedInvoice.amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400">This is a computer-generated tax invoice.</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownloadPdf(selectedInvoice.invoiceNumber)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


import React, { useState } from 'react'
import {
  Receipt,
  Printer,
  Sliders
} from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const ProformaQuotePage: React.FC = () => {
  const { proformaQuotes, addProformaQuote, showNotification } = useJobContext()
  const activeQuote = proformaQuotes[0]

  const [clientName, setClientName] = useState(activeQuote.clientName)
  const [clientGst, setClientGst] = useState(activeQuote.clientGst)
  const [billingAddress, setBillingAddress] = useState(activeQuote.billingAddress)
  const [seatsCount, setSeatsCount] = useState(20)
  const [includeAi, setIncludeAi] = useState(true)
  const [includeWhitelabel, setIncludeWhitelabel] = useState(true)

  // Recalculate totals
  const basePlanFee = 120000
  const seatFee = seatsCount * 3000
  const aiFee = includeAi ? 45000 : 0
  const whitelabelFee = includeWhitelabel ? 25000 : 0

  const subtotal = basePlanFee + seatFee + aiFee + whitelabelFee
  const cgst = subtotal * 0.09
  const sgst = subtotal * 0.09
  const total = subtotal + cgst + sgst

  const handleDownloadPdf = () => {
    window.print()
    showNotification('Official Proforma Quote PDF generated for procurement approval.')
  }

  const handleSaveQuote = (e: React.FormEvent) => {
    e.preventDefault()
    const newQuote = {
      ...activeQuote,
      quoteNumber: `CCP-QT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName,
      clientGst,
      billingAddress,
      subtotal,
      cgst,
      sgst,
      totalAmount: total
    }
    addProformaQuote(newQuote)
  }

  return (
    <div className="space-y-6">
      {/* Page Header (Hidden when printing) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 uppercase tracking-wider flex items-center gap-1">
              <Receipt className="w-3.5 h-3.5 text-indigo-600" />
              Corporate Procurement
            </span>
            <span className="text-xs text-slate-400">GST Invoice Ready</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Self-Serve B2B Proforma Quote & Invoice Generator
          </h1>
          <p className="text-xs text-slate-500">
            Generate an official enterprise quotation with GSTIN details to submit for managerial and procurement purchase order (PO) approval.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save Official PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Sizing Configurator (Hidden on Print) */}
        <form
          onSubmit={handleSaveQuote}
          className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs print:hidden"
        >
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-600" />
            Procurement Sizing Parameters
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Client Legal Entity Name</label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Client GSTIN / Tax ID</label>
            <input
              type="text"
              required
              value={clientGst}
              onChange={(e) => setClientGst(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Billing Address</label>
            <textarea
              rows={2}
              required
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 text-slate-700"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-700">Recruiter Seats Required</label>
              <span className="font-mono font-bold text-indigo-600">{seatsCount} Seats</span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              step={5}
              value={seatsCount}
              onChange={(e) => setSeatsCount(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">₹3,000 per dedicated seat per annum</div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <label className="font-semibold text-slate-700 block">Optional Enterprise Add-Ons</label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeAi}
                onChange={(e) => setIncludeAi(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded"
              />
              <span>AI Screening Copilot (50,000 scans) · +₹45,000</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeWhitelabel}
                onChange={(e) => setIncludeWhitelabel(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded"
              />
              <span>White-Label Career Subdomain & SSL · +₹25,000</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            Update Quote Snapshot
          </button>
        </form>

        {/* Right Column: Printable Pixel-Perfect PDF Layout */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6 print:border-none print:shadow-none print:p-0">
          {/* Proforma Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                  CCP
                </div>
                <span className="font-black text-lg text-slate-900 tracking-tight">
                  Career Connect Pro Pvt. Ltd.
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 max-w-sm">
                Registered Office: Tower B, 14th Floor, Prestige Tech Park, Marathahalli Outer Ring Road, Bengaluru, KA 560103
                <br />
                GSTIN: <strong>29AABCC4921K1ZX</strong> · CIN: U72900KA2024PTC192081
              </p>
            </div>

            <div className="text-right space-y-1">
              <span className="inline-block bg-slate-900 text-white px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider">
                PROFORMA QUOTATION
              </span>
              <div className="font-mono font-bold text-xs text-slate-900 pt-1">{activeQuote.quoteNumber}</div>
              <div className="text-[11px] text-slate-400">Date: {activeQuote.date}</div>
              <div className="text-[11px] text-red-600 font-semibold">Valid Until: {activeQuote.validUntil}</div>
            </div>
          </div>

          {/* Bill-To Block */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quotation Prepared For:</span>
              <div className="font-bold text-sm text-slate-900 mt-0.5">{clientName}</div>
              <div className="text-slate-500 mt-1">{billingAddress}</div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tax & Contact Details:</span>
              <div className="font-mono text-slate-800 font-bold mt-0.5">GSTIN: {clientGst}</div>
              <div className="text-slate-500 mt-1">Contact: {activeQuote.contactPerson}</div>
              <div className="text-slate-500 font-mono text-[11px]">{activeQuote.contactEmail}</div>
            </div>
          </div>

          {/* Line Items Table */}
          <table className="w-full text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-y border-slate-200">
              <tr>
                <th className="p-3 text-left">Description of Services</th>
                <th className="p-3 text-center">HSN/SAC</th>
                <th className="p-3 text-right">Qty</th>
                <th className="p-3 text-right">Unit Price</th>
                <th className="p-3 text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-semibold text-slate-900">Career Connect Pro Annual Platform License</td>
                <td className="p-3 text-center text-slate-500 font-mono">998313</td>
                <td className="p-3 text-right font-mono">1</td>
                <td className="p-3 text-right font-mono">₹1,20,000</td>
                <td className="p-3 text-right font-bold text-slate-900 font-mono">₹1,20,000</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900">Dedicated Recruiter Seats (Full RBAC + Sourcing)</td>
                <td className="p-3 text-center text-slate-500 font-mono">998313</td>
                <td className="p-3 text-right font-mono">{seatsCount}</td>
                <td className="p-3 text-right font-mono">₹3,000</td>
                <td className="p-3 text-right font-bold text-slate-900 font-mono">₹{seatFee.toLocaleString()}</td>
              </tr>
              {includeAi && (
                <tr>
                  <td className="p-3 font-semibold text-slate-900">AI Resume Copilot & Candidate Scorer (50,000 Scans)</td>
                  <td className="p-3 text-center text-slate-500 font-mono">998313</td>
                  <td className="p-3 text-right font-mono">1</td>
                  <td className="p-3 text-right font-mono">₹45,000</td>
                  <td className="p-3 text-right font-bold text-slate-900 font-mono">₹45,000</td>
                </tr>
              )}
              {includeWhitelabel && (
                <tr>
                  <td className="p-3 font-semibold text-slate-900">White-Label Custom Career Portal & Dedicated TLS</td>
                  <td className="p-3 text-center text-slate-500 font-mono">998313</td>
                  <td className="p-3 text-right font-mono">1</td>
                  <td className="p-3 text-right font-mono">₹25,000</td>
                  <td className="p-3 text-right font-bold text-slate-900 font-mono">₹25,000</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Totals & Tax Calculation */}
          <div className="flex flex-col sm:flex-row justify-between gap-6 pt-4 border-t border-slate-200">
            <div className="space-y-1.5 text-xs text-slate-500 max-w-sm">
              <span className="font-bold text-slate-900">Official Banking & Remittance Details:</span>
              <p className="font-mono text-[11px] leading-relaxed">
                Bank: HDFC Bank Ltd. · Koramangala Branch
                <br />
                A/C Name: Career Connect Pro Private Limited
                <br />
                A/C No: 50200084920194 · IFSC: HDFC0000240
              </p>
            </div>

            <div className="w-full sm:w-72 space-y-1.5 text-xs">
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Subtotal:</span>
                <span className="font-mono font-bold text-slate-900">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-t border-slate-100">
                <span className="text-slate-500">CGST (9%):</span>
                <span className="font-mono text-slate-700">₹{cgst.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-t border-slate-100">
                <span className="text-slate-500">SGST (9%):</span>
                <span className="font-mono text-slate-700">₹{sgst.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-t-2 border-slate-900 text-sm font-black">
                <span>Grand Total (INR):</span>
                <span className="text-indigo-600 font-mono">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


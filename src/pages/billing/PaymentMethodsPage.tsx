import React, { useState } from 'react'
import { CreditCard, Plus, CheckCircle2, Trash2, Building, ShieldCheck, X } from 'lucide-react'
import { useJobContext } from '../../context/JobContext'

export const PaymentMethodsPage: React.FC = () => {
  const { showNotification } = useJobContext()
  const [cards, setCards] = useState([
    { id: 'card-1', brand: 'Mastercard', last4: '8821', exp: '08/28', isDefault: true, holder: 'Tech Mahindra Corporate Finance' },
    { id: 'card-2', brand: 'Visa', last4: '4190', exp: '11/27', isDefault: false, holder: 'Priya Narayanan' }
  ])
  const [gstin, setGstin] = useState('33AABCT2319P1Z8')
  const [billingAddress, setBillingAddress] = useState('Tech Mahindra Ltd, Sholinganallur, OMR, Chennai, Tamil Nadu 600119')
  const [showAddCard, setShowAddCard] = useState(false)
  const [newCardNumber, setNewCardNumber] = useState('')

  const handleSetDefault = (id: string) => {
    setCards((prev) => prev.map((c) => ({ ...c, isDefault: c.id === id })))
    showNotification('Primary billing payment card updated!')
  }

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault()
    const last4 = newCardNumber.slice(-4) || '9921'
    setCards((prev) => [
      ...prev,
      { id: `card-${Date.now()}`, brand: 'Visa', last4, exp: '12/29', isDefault: false, holder: 'Corporate Account' }
    ])
    setShowAddCard(false)
    setNewCardNumber('')
    showNotification('Payment card added successfully!')
  }

  const handleSaveTax = (e: React.FormEvent) => {
    e.preventDefault()
    showNotification('GSTIN and corporate billing invoice address saved!')
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Payment Methods & Tax ID</h1>
          <p className="text-xs text-slate-500">Manage corporate purchasing cards, GSTIN numbers for input tax credit, and invoicing details</p>
        </div>

        <button
          onClick={() => setShowAddCard(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Payment Card
        </button>
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Saved Cards & Payment Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`p-6 rounded-3xl border transition-all ${
                card.isDefault
                  ? 'bg-slate-900 text-white border-slate-800 shadow-md'
                  : 'bg-white text-slate-900 border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between">
                <CreditCard className={`w-8 h-8 ${card.isDefault ? 'text-indigo-400' : 'text-slate-400'}`} />
                {card.isDefault ? (
                  <span className="text-[10px] font-extrabold uppercase bg-emerald-500 text-white px-2 py-0.5 rounded">
                    Default Card
                  </span>
                ) : (
                  <button
                    onClick={() => handleSetDefault(card.id)}
                    className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
                  >
                    Set as Default
                  </button>
                )}
              </div>

              <div className="py-4 space-y-1">
                <div className="font-mono text-lg font-bold tracking-wider">
                  •••• •••• •••• {card.last4}
                </div>
                <div className={`text-xs ${card.isDefault ? 'text-slate-400' : 'text-slate-500'}`}>
                  Expires: {card.exp} · {card.holder}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100/20 text-[11px] flex justify-between">
                <span>{card.brand}</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 256-bit Tokenized
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate Tax Information Form */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="space-y-1">
          <h3 className="font-bold text-base text-slate-900">Tax & GST Information (India)</h3>
          <p className="text-xs text-slate-500">Provide your GSTIN number to claim 18% Input Tax Credit on recruitment software expenses</p>
        </div>

        <form onSubmit={handleSaveTax} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">GSTIN / Tax ID Number *</label>
            <input
              type="text"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              className="w-full text-xs font-mono p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Official Billing Address *</label>
            <textarea
              rows={2}
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Update Tax Details
          </button>
        </form>
      </div>

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-lg text-slate-900">Add Credit / Debit Card</h3>
              <button onClick={() => setShowAddCard(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCard} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Card Number *</label>
                <input
                  type="text"
                  required
                  value={newCardNumber}
                  onChange={(e) => setNewCardNumber(e.target.value)}
                  placeholder="4111 2222 3333 4444"
                  className="w-full text-xs font-mono p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Expiry (MM/YY) *</label>
                  <input
                    type="text"
                    required
                    placeholder="12/28"
                    className="w-full text-xs font-mono p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">CVV / CVC *</label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    placeholder="•••"
                    className="w-full text-xs font-mono p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddCard(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


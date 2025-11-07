import React from 'react';

function formatCurrency(amount) {
  return amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}

export default function PaymentSummary({ total, onPay }) {
  return (
    <div className="bg-gray-900 text-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-300">Total Due</p>
          <p className="text-2xl font-semibold">{formatCurrency(total)}</p>
        </div>
        <button
          onClick={onPay}
          className="inline-flex items-center justify-center rounded-lg bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/20"
        >
          Pay Now
        </button>
      </div>
      <p className="mt-2 text-xs text-gray-400">Secure payment • Encrypted • Instant receipt</p>
    </div>
  );
}

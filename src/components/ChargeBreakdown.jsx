import React from 'react';

function formatCurrency(amount) {
  return amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}

export default function ChargeBreakdown({ rent, transactionFee, penalty }) {
  const subtotal = rent + penalty;
  const total = subtotal + transactionFee;

  const rows = [
    { label: 'Hostel Rent', amount: rent },
    { label: 'Penalty', amount: penalty },
    { label: 'Transaction Charge', amount: transactionFee },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-medium text-gray-900">Charge Breakdown</h2>
      <div className="mt-4 space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{r.label}</span>
            <span className="font-medium text-gray-900">{formatCurrency(r.amount)}</span>
          </div>
        ))}
        <div className="border-t border-gray-200 my-3" />
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Subtotal</span>
          <span className="text-base font-semibold text-gray-900">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Total Due</span>
          <span className="text-lg font-bold text-gray-900">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}

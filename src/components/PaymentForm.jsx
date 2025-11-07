import React, { useMemo, useState } from 'react';

const inputBase =
  'block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-offset-0 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 placeholder:text-gray-400';

export default function PaymentForm({ initial, onChange }) {
  const [values, setValues] = useState({
    rent: initial?.rent ?? 300,
    penalty: initial?.penalty ?? 0,
    transactionRate: initial?.transactionRate ?? 0.025, // 2.5%
  });

  const transactionFee = useMemo(() => {
    return Math.max(0.5, (values.rent + values.penalty) * values.transactionRate);
  }, [values]);

  const emit = (next) => {
    onChange?.({
      rent: next.rent,
      penalty: next.penalty,
      transactionFee: transactionFee,
      total: next.rent + next.penalty + transactionFee,
    });
  };

  const update = (key, raw) => {
    const numeric = key === 'transactionRate' ? parseFloat(raw) : parseFloat(raw) || 0;
    const next = { ...values, [key]: isNaN(numeric) ? 0 : numeric };
    setValues(next);
    // transactionFee uses values, but for immediate consistency compute fresh
    const fee = Math.max(0.5, (next.rent + next.penalty) * next.transactionRate);
    onChange?.({
      rent: next.rent,
      penalty: next.penalty,
      transactionFee: fee,
      total: next.rent + next.penalty + fee,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-medium text-gray-900">Payment Details</h2>
      <div className="mt-4 grid grid-cols-1 gap-4">
        <label className="text-sm font-medium text-gray-700">
          Hostel Rent
          <input
            type="number"
            min="0"
            className={`${inputBase} mt-1`}
            value={values.rent}
            onChange={(e) => update('rent', e.target.value)}
          />
        </label>

        <label className="text-sm font-medium text-gray-700">
          Penalty
          <input
            type="number"
            min="0"
            className={`${inputBase} mt-1`}
            value={values.penalty}
            onChange={(e) => update('penalty', e.target.value)}
          />
        </label>

        <label className="text-sm font-medium text-gray-700">
          Transaction Rate (%)
          <input
            type="number"
            min="0"
            step="0.1"
            className={`${inputBase} mt-1`}
            value={(values.transactionRate * 100).toFixed(1)}
            onChange={(e) => update('transactionRate', parseFloat(e.target.value) / 100)}
          />
        </label>

        <div className="rounded-lg bg-gray-50 text-sm text-gray-700 p-3">
          Transaction Charge auto-calculates as max($0.50, (rent + penalty) × rate)
        </div>
      </div>
    </div>
  );
}

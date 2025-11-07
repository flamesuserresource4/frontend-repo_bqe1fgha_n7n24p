import React, { useMemo, useState } from 'react';
import PageHeader from './components/PageHeader';
import PaymentForm from './components/PaymentForm';
import ChargeBreakdown from './components/ChargeBreakdown';
import PaymentSummary from './components/PaymentSummary';

export default function App() {
  const [calc, setCalc] = useState({ rent: 300, penalty: 0, transactionFee: 0, total: 300 });

  const handleChange = (next) => setCalc(next);

  const handlePay = () => {
    alert(`Payment of $${calc.total.toFixed(2)} initiated. This is a demo.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <PageHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PaymentForm initial={{ rent: 300, penalty: 0, transactionRate: 0.025 }} onChange={handleChange} />
          <div className="space-y-6">
            <ChargeBreakdown rent={calc.rent} penalty={calc.penalty} transactionFee={calc.transactionFee} />
            <PaymentSummary total={calc.total} onPay={handlePay} />
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          This is a minimal demo page. Adjust amounts to see totals update instantly.
        </p>
      </div>
    </div>
  );
}

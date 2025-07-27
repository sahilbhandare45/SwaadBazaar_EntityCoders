'use client';
import React from 'react';

const orders = [
  { product: 'Tomatoes', demand: 120, vendors: 10 },
  { product: 'Onions', demand: 90, vendors: 7 },
  { product: 'Green Chillies', demand: 60, vendors: 4 },
];

export default function OrderTable() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[#ff4e3d]">Group Order Demand</h2>
      <table className="w-full table-auto text-sm bg-white/40 backdrop-blur-md border border-white/30 rounded-xl overflow-hidden">
        <thead className="bg-white/60">
          <tr>
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-left">Demand (kg)</th>
            <th className="p-3 text-left">No. of Vendors</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={i} className="border-t border-white/30">
              <td className="p-3">{o.product}</td>
              <td className="p-3">{o.demand}</td>
              <td className="p-3">{o.vendors}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

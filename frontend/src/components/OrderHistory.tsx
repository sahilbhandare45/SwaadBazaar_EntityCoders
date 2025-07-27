// components/OrderHistory.tsx
'use client';
import React from 'react';

const mockOrders = [
  { id: 1, product: 'Tomatoes', quantity: '10kg', date: '2025-07-24', status: 'Delivered' },
  { id: 2, product: 'Onions', quantity: '5kg', date: '2025-07-20', status: 'In Transit' },
];

export default function OrderHistory() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white/60 rounded-xl overflow-hidden">
        <thead className="bg-[#ff4e3d]/80 text-white text-sm">
          <tr>
            <th className="py-3 px-4 text-left">Product</th>
            <th className="py-3 px-4 text-left">Quantity</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800">
          {mockOrders.map((order) => (
            <tr key={order.id} className="border-b border-gray-300">
              <td className="py-3 px-4">{order.product}</td>
              <td className="py-3 px-4">{order.quantity}</td>
              <td className="py-3 px-4">{order.date}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Delivered'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// components/DashboardContent.tsx
'use client';
import { FaShoppingCart, FaBoxOpen, FaChartLine, FaFire } from 'react-icons/fa';

const cards = [
  {
    icon: <FaShoppingCart />,
    label: 'Orders Placed',
    value: 28,
    color: 'bg-green-100 text-green-800',
  },
  {
    icon: <FaBoxOpen />,
    label: 'Active Group Buys',
    value: 5,
    color: 'bg-blue-100 text-blue-800',
  },
  {
    icon: <FaChartLine />,
    label: 'Forecast Accuracy',
    value: '92%',
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    icon: <FaFire />,
    label: 'Top Product',
    value: 'Fresh Tomatoes',
    color: 'bg-red-100 text-red-800',
  },
];

export default function DashboardContent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`rounded-xl p-6 shadow-md ${card.color} transition-all duration-200`}
        >
          <div className="text-2xl mb-2">{card.icon}</div>
          <p className="text-sm font-medium text-gray-600">{card.label}</p>
          <p className="text-2xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
}

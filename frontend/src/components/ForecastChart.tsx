// components/ForecastChart.tsx
'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Jul 20', demand: 10 },
  { date: 'Jul 21', demand: 15 },
  { date: 'Jul 22', demand: 22 },
  { date: 'Jul 23', demand: 18 },
  { date: 'Jul 24', demand: 30 },
];

export default function ForecastChart() {
  return (
    <div className="bg-white/60 p-6 rounded-xl shadow-lg w-full h-80">
      <h3 className="text-lg font-semibold text-[#ff4e3d] mb-4">Demand Forecast</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="demand" stroke="#ff4e3d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

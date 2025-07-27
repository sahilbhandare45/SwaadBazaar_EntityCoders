'use client';
import React from 'react';
import { FaStar } from 'react-icons/fa';

const reviews = [
  { product: 'Tomatoes', avgRating: 4.6 },
  { product: 'Onions', avgRating: 4.2 },
  { product: 'Chillies', avgRating: 3.8 },
];

export default function RatingOverview() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[#ff4e3d]">Ratings Overview</h2>
      <ul className="space-y-4">
        {reviews.map((r, i) => (
          <li key={i} className="bg-white/30 p-4 rounded-xl border border-white/30">
            <div className="flex justify-between">
              <span>{r.product}</span>
              <span className="flex items-center gap-1 text-yellow-500 font-medium">
                <FaStar /> {r.avgRating.toFixed(1)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

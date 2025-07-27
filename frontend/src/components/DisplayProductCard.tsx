'use client';
import React from 'react';
import { FaClock, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  supplierVerified: boolean;
  joined: number;
  total: number;
  endsIn: string;
}

interface Props {
  product: Product;
  onClick: () => void;
}

export default function DisplayProductCard({ product, onClick }: Props) {
  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl overflow-hidden shadow">
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={250}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-sm text-gray-700">{product.price}</p>
        <div className="flex justify-between items-center text-sm">
          <span
            className={`flex items-center gap-1 ${
              product.supplierVerified ? 'text-green-600' : 'text-yellow-600'
            }`}
          >
            {product.supplierVerified ? <FaUserCheck /> : <FaUserTimes />}
            {product.supplierVerified ? 'Verified Supplier' : 'Unverified'}
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <FaClock /> {product.endsIn}
          </span>
        </div>
        <button
          onClick={onClick}
          className="mt-3 w-full bg-[#ff4e3d] hover:bg-[#e03b2d] text-white py-2 rounded-full text-sm transition"
        >
          Join Group Buy
        </button>
      </div>
    </div>
  );
}

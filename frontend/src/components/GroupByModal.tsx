'use client';
import React from 'react';
import Image from 'next/image';

export default function GroupBuyModal({ product, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-lg p-6 rounded-xl max-w-md w-full relative shadow-xl">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl">
          ✕
        </button>
        <Image src={product.image} alt={product.name} width={500} height={300} className="rounded-xl mb-4" />
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-2">{product.price}</p>
        <p className="text-sm mb-2">Group Target: {product.joined}/{product.total} joined</p>
        <p className="text-sm text-gray-500 mb-4">Ends In: {product.endsIn}</p>
        <button className="w-full bg-primary hover:bg-[#e03b2d] text-white py-2 rounded-lg font-semibold">
          Confirm Join
        </button>
      </div>
    </div>
  );
}

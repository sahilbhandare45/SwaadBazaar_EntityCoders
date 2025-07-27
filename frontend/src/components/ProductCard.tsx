'use client';
import React, { useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import AddProductForm from './AddProductForm';

export default function ProductCard() {
  const [products, setProducts] = useState([
    { name: 'Tomatoes', price: '₹40/kg', description: 'Fresh red tomatoes', image: '' },
    { name: 'Onions', price: '₹35/kg', description: 'Best quality onions', image: '' },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddOrEditProduct = (product: any) => {
    if (editingIndex !== null) {
      const updated = [...products];
      updated[editingIndex] = product;
      setProducts(updated);
      setEditingIndex(null);
    } else {
      setProducts([...products, product]);
    }
    setIsAdding(false);
  };

  const handleDelete = (index: number) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#ff4e3d]">My Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((prod, i) => (
          <div key={i} className="bg-white/40 p-4 rounded-xl shadow-md border border-white/30">
            {prod.image && (
              <img
                src={prod.image}
                alt={prod.name}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
            )}
            <h3 className="text-lg font-bold">{prod.name}</h3>
            <p className="text-sm text-gray-700">{prod.description}</p>
            <p className="mt-1 font-medium">{prod.price}</p>

            <div className="flex gap-4 mt-3 text-sm">
              <button
                onClick={() => {
                  setIsAdding(true);
                  setEditingIndex(i);
                }}
                className="flex items-center gap-1 text-[#ff4e3d] hover:underline"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(i)}
                className="flex items-center gap-1 text-red-600 hover:underline"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white/30 p-4 rounded-xl border border-white/30">
        {!isAdding ? (
          <button
            onClick={() => {
              setIsAdding(true);
              setEditingIndex(null);
            }}
            className="flex items-center gap-2 px-5 py-2 bg-[#ff4e3d] text-white rounded-full hover:bg-[#e03b2d] transition-transform transform hover:scale-105 shadow-lg"
          >
            <FaPlus />
            Add Product
          </button>
        ) : (
          <AddProductForm
            onSubmit={handleAddOrEditProduct}
            onCancel={() => {
              setIsAdding(false);
              setEditingIndex(null);
            }}
            defaultValues={editingIndex !== null ? products[editingIndex] : undefined}
          />
        )}
      </div>
    </div>
  );
}

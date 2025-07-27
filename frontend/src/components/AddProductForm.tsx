'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Product {
  name: string;
  price: string;
  description: string;
  image: string;
}

interface AddProductFormProps {
  onSubmit: (product: Product) => void;
  onCancel: () => void;
  defaultValues?: Product;
}

export default function AddProductForm({
  onSubmit,
  onCancel,
  defaultValues,
}: AddProductFormProps) {
  const [form, setForm] = useState<Product>(
    defaultValues || { name: '', price: '', description: '', image: '' }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-orange-300"
        required
      />
      <input
        type="text"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price (e.g. ₹50/kg)"
        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-orange-300"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Short description"
        rows={3}
        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-orange-300"
      />
      <input
        type="text"
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-orange-300"
      />

      <div className="flex justify-end gap-4 mt-4">
        <button
          type="submit"
          className="bg-[#ff4e3d] text-white px-5 py-2 rounded hover:bg-[#e03b2d] transition"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-600 border border-gray-300 px-5 py-2 rounded hover:bg-gray-100 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

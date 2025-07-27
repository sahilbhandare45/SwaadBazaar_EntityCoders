'use client';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaCheck, FaFileDownload, FaTimes, FaPlus } from 'react-icons/fa';
import Image from 'next/image';

const initialSuppliers = [
  { name: 'Vendor One', region: 'Delhi', kyc: '/kyc/doc1.png', status: 'Pending' },
  { name: 'Vendor Two', region: 'Mumbai', kyc: '/kyc/doc2.png', status: 'Approved' },
  { name: 'Vendor Three', region: 'Kolkata', kyc: '/kyc/doc3.png', status: 'Rejected' },
];

const regions = ['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore'];

export default function AdminPanel() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [selectedKYC, setSelectedKYC] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isModalOpen, setModalOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    region: '',
    kyc: '',
    status: 'Pending',
  });

  const handleStatusChange = (name: string, newStatus: string) => {
    setSuppliers(prev =>
      prev.map(s => (s.name === name ? { ...s, status: newStatus } : s))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, region, kyc } = newSupplier;
    if (!name || !region || !kyc) return;
    setSuppliers([...suppliers, newSupplier]);
    setNewSupplier({ name: '', region: '', kyc: '', status: 'Pending' });
    setModalOpen(false);
  };

  const handleLogout = () => {
    // ✅ Replace with real logout logic (NextAuth, Firebase, etc.)
    // localStorage.removeItem('authToken'); // if using tokens
    // sessionStorage.clear();              // optional
    window.location.href = '/login';        // redirect to login
  };

  const filteredSuppliers =
    statusFilter === 'All'
      ? suppliers
      : suppliers.filter(s => s.status === statusFilter);

  const pieChartData = [
    { name: 'Approved', value: suppliers.filter(s => s.status === 'Approved').length },
    { name: 'Pending', value: suppliers.filter(s => s.status === 'Pending').length },
    { name: 'Rejected', value: suppliers.filter(s => s.status === 'Rejected').length },
  ];

  const pieColors = ['#4ade80', '#facc15', '#f87171'];

  const barChartData = regions.map(region => ({
    region,
    suppliers: suppliers.filter(s => s.region === region).length,
  }));

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full hover:bg-white/20 transition"
          >
            <FaPlus /> Add Supplier
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/10 text-red-300 border border-red-300/30 px-4 py-2 rounded-full hover:bg-red-500/20 transition"
          >
            <FaTimes /> Logout
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {[
          { icon: <FaUsers />, label: 'Total Vendors', value: suppliers.length },
          {
            icon: <FaCheck />,
            label: 'Approved',
            value: suppliers.filter(s => s.status === 'Approved').length,
          },
          {
            icon: <FaTimes />,
            label: 'Rejected',
            value: suppliers.filter(s => s.status === 'Rejected').length,
          },
          { icon: <FaFileDownload />, label: 'Reports', value: 'Export' },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/10 border border-white/20 backdrop-blur-lg p-6 rounded-2xl text-center shadow"
          >
            <div className="text-2xl mb-2">{card.icon}</div>
            <p className="text-sm uppercase text-white/70">{card.label}</p>
            <p className="text-xl font-bold">{card.value}</p>
          </motion.div>
        ))}
      </section>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Pie Chart */}
        <div className="bg-white/10 border border-white/20 backdrop-blur-lg p-6 rounded-2xl shadow">
          <h3 className="text-lg font-bold mb-4 text-center">Supplier Status Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                dataKey="value"
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white/10 border border-white/20 backdrop-blur-lg p-6 rounded-2xl shadow">
          <h3 className="text-lg font-bold mb-4 text-center">Suppliers by Region</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData}>
              <XAxis dataKey="region" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="suppliers" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex gap-2">
          {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-full border ${
                statusFilter === status
                  ? 'bg-white/20 border-white/30'
                  : 'border-white/10 hover:bg-white/10'
              } transition backdrop-blur-md text-sm`}
            >
              {status}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 bg-green-500/10 text-green-300 border border-green-300/30 px-4 py-2 rounded-full hover:bg-green-500/20 transition">
          <FaFileDownload /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-2xl border border-white/20 backdrop-blur-lg bg-white/5">
        <table className="min-w-full text-sm">
          <thead className="bg-white/10">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Region</th>
              <th className="p-4 text-left">KYC</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map((s, i) => (
              <tr key={i} className="border-t border-white/10">
                <td className="p-4">{s.name}</td>
                <td className="p-4">{s.region}</td>
                <td className="p-4">
                  <button
                    onClick={() => setSelectedKYC(s.kyc)}
                    className="text-blue-400 underline"
                  >
                    View
                  </button>
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      s.status === 'Approved'
                        ? 'bg-green-500/10 text-green-300'
                        : s.status === 'Rejected'
                        ? 'bg-red-500/10 text-red-300'
                        : 'bg-yellow-500/10 text-yellow-300'
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleStatusChange(s.name, 'Approved')}
                    className="px-3 py-1 bg-green-600/20 text-green-300 rounded hover:bg-green-600/30 text-xs"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(s.name, 'Rejected')}
                    className="px-3 py-1 bg-red-600/20 text-red-300 rounded hover:bg-red-600/30 text-xs"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* KYC Modal */}
      {selectedKYC && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl max-w-md w-full text-center relative">
            <button
              onClick={() => setSelectedKYC(null)}
              className="absolute top-2 right-2 text-white hover:text-red-400 text-lg"
            >
              ✕
            </button>
            <Image
              src={selectedKYC}
              alt="KYC Document"
              width={400}
              height={300}
              className="rounded-lg mx-auto"
            />
            <p className="mt-3 text-sm text-white/70">KYC Document Preview</p>
          </div>
        </div>
      )}

      {/* Add Supplier Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-xl p-6 w-full max-w-md relative text-white">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-white text-xl hover:text-red-400"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Supplier</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 placeholder-white/60 focus:outline-none"
                value={newSupplier.name}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, name: e.target.value })
                }
              />
              <select
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white/80 focus:outline-none"
                value={newSupplier.region}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, region: e.target.value })
                }
              >
                <option value="" disabled>
                  Select Region
                </option>
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="KYC Image Path (e.g. /kyc/doc4.png)"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 placeholder-white/60 focus:outline-none"
                value={newSupplier.kyc}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, kyc: e.target.value })
                }
              />
              <button
                type="submit"
                className="w-full bg-green-500/20 border border-green-400 text-green-200 py-2 rounded-lg hover:bg-green-500/30 transition"
              >
                Add Supplier
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

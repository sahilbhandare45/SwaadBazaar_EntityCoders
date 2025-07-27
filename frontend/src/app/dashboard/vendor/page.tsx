'use client';
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import DisplayProductCard from '@/components/DisplayProductCard';
import GroupBuyModal from '@/components/GroupByModal';
import DashboardContent from '@/components/DashboardContent';
import OrderHistory from '@/components/OrderHistory';
import ForecastChart from '@/components/ForecastChart';

const tabs = ['Dashboard', 'Available Products', 'My Orders', 'Forecast'];

const sampleProducts = [
  {
    id: 1,
    name: 'Fresh Tomatoes',
    price: '₹40/kg',
    image: '/products/tomatoes.jpg',
    supplierVerified: true,
    joined: 5,
    total: 20,
    endsIn: '02:12:45',
  },
  {
    id: 2,
    name: 'Onions',
    price: '₹35/kg',
    image: '/products/onions.jpg',
    supplierVerified: false,
    joined: 8,
    total: 15,
    endsIn: '04:03:20',
  },
];


export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  const renderContent = () => {
     switch (activeTab) {
       case 'Products':
         return <DisplayProductCard  product={sampleProducts[0]} onClick={() => setSelectedProduct(sampleProducts[0])} />;
       case 'Orders':
         return <OrderHistory />;
 
       default:
     }
   };

  return (
<main className="flex min-h-screen bg-gradient-to-br from-[#fff3ec] to-[#ffe9e3] font-sans text-gray-900">
  <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

  <section className="flex-1 ml-0 md:ml-64 p-6 md:p-10 transition-all duration-300">
        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-4">
          {tabs.map((tab) => (
            <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition backdrop-blur-md ${
                activeTab === tab
                ? 'bg-primary text-black border-primary'
                : 'bg-white/40 text-primary border-white/60 hover:bg-white/60'
              }`}
              >
              {tab}
            </button>
          ))}
        </div>
          {renderContent()}



        {/* Tab Content */}
        {activeTab === 'Available Products' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProducts.map((product) => (
              <DisplayProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}
        {activeTab === 'Dashboard' && <DashboardContent />}
        {activeTab === 'My Orders' && (
          <OrderHistory />
        )}

        {activeTab === 'Forecast' && (
          <ForecastChart />
        )}
      </section>

      {/* Modal */}
      {selectedProduct && (
        <GroupBuyModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}

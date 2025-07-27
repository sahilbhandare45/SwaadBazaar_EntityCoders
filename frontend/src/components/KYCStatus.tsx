'use client';
import React, { useState } from 'react';

export default function KYCStatus() {
  const [kycUploaded, setKycUploaded] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#ff4e3d]">KYC Document Verification</h2>
      {!kycUploaded ? (
        <>
          <input
            type="file"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#ff4e3d]/80 file:text-white hover:file:bg-[#e03b2d] cursor-pointer"
          />
          <button
            onClick={() => setKycUploaded(true)}
            className="px-6 py-2 bg-[#ff4e3d] text-white rounded-full hover:bg-[#e03b2d]"
          >
            Upload
          </button>
        </>
      ) : (
        <div className="bg-green-100/60 p-4 text-green-800 rounded-lg border border-green-300">
          ✅ Document uploaded. Verification Pending.
        </div>
      )}
    </div>
  );
}

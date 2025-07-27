'use client';
import React, { useState } from 'react';
import { UserPlus, LogIn, Building } from 'lucide-react';

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'vendor' 
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    // --- 1. Client-side Password Confirmation ---
    if (form.password !== form.confirmPassword) {
      setMessage('❌ Passwords do not match.');
      return; // Stop submission if passwords don't match
    }

    setIsLoading(true);
    try {
      // --- 2. Live API Call ---
      // This now makes a real request to your backend endpoint.
      const res = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // We don't send confirmPassword to the backend as it's not needed there.
        body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
            role: form.role
        }),
      });

      const data = await res.json();

      // --- 3. Handle API Response ---
      if (!res.ok) {
        // If the server responds with an error, use its message.
        throw new Error(data.error || 'Registration failed due to an unknown error.');
      }

      // On success, display the success message from the backend.
      setMessage(`✅ ${data.message || 'Account created successfully! You can now log in.'}`);
      // Reset the form fields after successful registration.
      setForm({ name: '', email: '', password: '', confirmPassword: '', role: 'vendor' }); 

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setMessage(`❌ ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const messageClasses = message.includes('✅') 
    ? 'bg-green-100 text-green-700' 
    : 'bg-red-100 text-red-700';

  return (
    <main className="min-h-screen w-full bg-[#f8f9fa] flex items-center justify-center p-4 font-sans">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 z-0 opacity-50">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-repeat" 
          style={{backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23dce1e7" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`}}>
        </div>
      </div>
      
      <div className="relative w-full max-w-4xl grid md:grid-cols-2 rounded-2xl shadow-2xl overflow-hidden bg-white border border-gray-200">
        
        {/* Left Panel: Login CTA */}
        <div className="p-12 bg-[#ff4e3d] text-white flex-col justify-center items-center text-center hidden md:flex">
          <div className="w-full max-w-md">
            <LogIn size={60} className="mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl font-bold mb-4">Already a Member?</h2>
            <p className="text-indigo-100 text-lg mb-8">
              If you already have an account, just sign in. We've missed you!
            </p>
            <a href="/login" className="inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold bg-white text-[#ff4e3d] rounded-full shadow-md transition-all duration-300 hover:bg-gray-100 hover:scale-105">
                <UserPlus size={18} />
                Sign In
            </a>
          </div>
        </div>

        {/* Right Panel: Signup Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="text-left mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Create an Account</h2>
            <p className="mt-2 text-gray-500">Join us today! It takes only a few seconds.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <label htmlFor="name" className="text-sm font-medium text-gray-600">Full Name</label>
              <input id="name" name="name" type="text" required placeholder="John Doe" value={form.name} onChange={handleChange} disabled={isLoading} className="mt-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"/>
            </div>
            
            <div className="relative">
              <label htmlFor="email" className="text-sm font-medium text-gray-600">Email Address</label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" value={form.email} onChange={handleChange} disabled={isLoading} className="mt-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"/>
            </div>

            <div className="relative">
              <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
              <input id="password" name="password" type="password" required placeholder="••••••••" value={form.password} onChange={handleChange} disabled={isLoading} className="mt-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"/>
            </div>
            
            <div className="relative">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-600">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" required placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} disabled={isLoading} className="mt-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"/>
            </div>

            <div className="relative">
              <label htmlFor="role" className="text-sm font-medium text-gray-600">I am a...</label>
              <select id="role" name="role" required value={form.role} onChange={handleChange} disabled={isLoading} className="mt-1 block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition">
                <option value="vendor">Vendor</option>
                <option value="supplier">Supplier</option>
              </select>
            </div>

            <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 rounded-lg bg-[#ff4e3d] py-3 px-4 text-base font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#ff3926] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed">
              <UserPlus size={18} />
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
            
            {message && (
              <div className={`rounded-lg p-3 text-center text-sm font-medium ${messageClasses}`}>
                <p>{message}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
'use client';
import React, { useState, useEffect } from 'react';
import { LogIn, UserPlus, Building, Shield, Truck, LayoutDashboard, LogOut, UserCircle, ChevronDown, BarChart, ShoppingCart, Settings } from 'lucide-react';

// --- TYPE DEFINITIONS ---
// The role can be one of these three strings.
type Role = 'vendor' | 'admin' | 'supplier';

// Defines the structure of the user data object.
interface UserData {
  name: string;
  email: string;
  role: Role; // The backend sends uppercase, but we'll handle it.
}

// --- MAIN ROUTER COMPONENT ---
// This component acts as a simple client-side router.
export default function App() {
  const [path, setPath] = useState('');

  // This effect runs once when the component mounts.
  // It sets the initial path and listens for URL changes (e.g., back/forward buttons).
  useEffect(() => {
    setPath(window.location.pathname);

    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // The switch statement renders the correct component based on the current URL path.
  switch (path) {
    case '/dashboard/vendor':
      return <VendorDashboard />;
    case '/dashboard/admin':
      return <AdminDashboard />;
    case '/dashboard/supplier':
      return <SupplierDashboard />;
    // You can add a route for your signup page here if needed
    // case '/signup':
    //   return <SignupPage />;
    default:
      return <LoginPage />;
  }
}

// --- LOGIN PAGE COMPONENT ---
const LoginPage: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    // --- Special Case: Hardcoded Admin Login ---
    // You can change these credentials as needed.
    if (form.email === 'admin@example.com' && form.password === 'admin123') {
        const adminUser: UserData = { name: 'Swaad Admin', email: 'admin@swaad.com', role: 'admin' };
        localStorage.setItem('user', JSON.stringify(adminUser));
        localStorage.setItem('authToken', 'mock_admin_token_for_dev'); // Use a mock token for the hardcoded admin
        window.location.href = '/dashboard/admin';
        return; // Stop execution to prevent API call
    }

    try {
      // --- Live API Call to Backend ---
      // The form now only sends email and password.
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: form.email,
            password: form.password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Use the error message from the backend response
        throw new Error(data.error || 'Login failed. Please check your credentials.');
      }
      
      // --- Store Session and Redirect on Success ---
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('authToken', data.token);
      
      // Redirect to the appropriate dashboard based on the role from the backend response.
      // We convert the role to lowercase to match our URL structure.
      window.location.href = `/dashboard/${data.user.role.toLowerCase()}`;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setMessage(`❌ ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const messageClasses = message.includes('❌') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';

  return (
    <main className="min-h-screen w-full bg-[#f8f9fa] flex items-center justify-center p-4 font-sans">
       <div className="absolute inset-0 z-0 opacity-50">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-repeat" 
          style={{backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23dce1e7" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`}}>
        </div>
      </div>
      <div className="relative w-full max-w-4xl grid md:grid-cols-2 rounded-2xl shadow-2xl overflow-hidden bg-white border border-gray-200">
        <div className="p-8 md:p-12 order-2 md:order-1 flex flex-col justify-center">
          <div className="text-left mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
            <p className="mt-2 text-gray-500">Please sign in to continue.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <label htmlFor="email" className="text-sm font-medium text-gray-600">Email Address</label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" value={form.email} onChange={handleChange} disabled={isLoading} className="mt-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"/>
            </div>
            <div className="relative">
              <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
              <input id="password" name="password" type="password" required placeholder="••••••••" value={form.password} onChange={handleChange} disabled={isLoading} className="mt-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"/>
            </div>
            <div className="flex items-center justify-end text-sm">
              <a href="#" className="font-medium text-[#ff4e3d] hover:text-[#ff3926] transition-colors">Forgot password?</a>
            </div>
            <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 rounded-lg bg-[#ff4e3d] py-3 px-4 text-base font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#ff3926] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed">
              <LogIn size={18} />
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            {message && (<div className={`rounded-lg p-3 text-center text-sm font-medium ${messageClasses}`}><p>{message}</p></div>)}
          </form>
        </div>
        <div className="p-12 order-1 md:order-2 bg-[#ff4e3d] text-white flex-col justify-center items-center text-center hidden md:flex">
          <div className="w-full max-w-md">
             <Building size={60} className="mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl font-bold mb-4">New Here?</h2>
            <p className="text-indigo-100 text-lg mb-8">Create an account to join our supply chain ecosystem. It's quick and easy.</p>
            <a href="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold bg-white text-[#ff4e3d] rounded-full shadow-md transition-all duration-300 hover:bg-gray-100 hover:scale-105">
                <UserPlus size={18} />
                Sign Up Now
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};


// --- DASHBOARD LAYOUT COMPONENT ---
interface DashboardLayoutProps {
  user: UserData;
  children: React.ReactNode;
  title: string;
  Icon: React.ElementType;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, children, title, Icon }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        window.location.href = '/';
    };
    
    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-4">
                            <Icon className="h-8 w-8 text-indigo-600" />
                            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                        </div>
                        <div className="relative">
                            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition">
                                <UserCircle className="h-8 w-8 text-gray-600" />
                                <span className="hidden md:inline font-medium text-gray-700">{user.name}</span>
                                <ChevronDown size={16} className={`text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                                    <div className="border-t border-gray-200 my-1"></div>
                                    <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

// --- ROLE-SPECIFIC DASHBOARD COMPONENTS ---
// These components now safely retrieve user data from localStorage and redirect if the user is not logged in
// or does not have the correct role for that specific dashboard.

const VendorDashboard: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        // Check if the stored user's role is VENDOR (case-insensitive check)
        if (parsedUser.role && parsedUser.role.toLowerCase() === 'vendor') {
            setUser(parsedUser);
        } else {
            window.location.href = '/'; // Redirect if role is incorrect
        }
    } else {
        window.location.href = '/'; // Redirect if not logged in
    }
  }, []);

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <DashboardLayout user={user} title="Vendor Dashboard" Icon={ShoppingCart}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700">My Orders</h3>
                <p className="text-3xl font-bold text-indigo-600 mt-2">12</p>
                <p className="text-sm text-gray-500">Active Orders</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700">Group Buys</h3>
                <p className="text-3xl font-bold text-indigo-600 mt-2">3</p>
                <p className="text-sm text-gray-500">Available to Join</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700">Demand Forecast</h3>
                <BarChart className="w-full h-24 text-gray-300 mt-2" />
            </div>
             <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700">Account Settings</h3>
                <Settings className="w-full h-24 text-gray-300 mt-2" />
            </div>
        </div>
    </DashboardLayout>
  );
};

const AdminDashboard: React.FC = () => {
    const [user, setUser] = useState<UserData | null>(null);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.role && parsedUser.role.toLowerCase() === 'admin') {
                setUser(parsedUser);
            } else {
                window.location.href = '/'; 
            }
        } else {
            window.location.href = '/';
        }
    }, []);

    if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <DashboardLayout user={user} title="Admin Dashboard" Icon={Shield}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">1,250</p>
                    <p className="text-sm text-gray-500">+20 this week</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700">Pending Approvals</h3>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">15</p>
                    <p className="text-sm text-gray-500">Vendors & Suppliers</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700">System Status</h3>
                    <p className="text-2xl font-bold text-green-600 mt-2 flex items-center gap-2">Operational</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700">Platform Analytics</h3>
                     <BarChart className="w-full h-24 text-gray-300 mt-2" />
                </div>
            </div>
        </DashboardLayout>
    );
};

const SupplierDashboard: React.FC = () => {
    const [user, setUser] = useState<UserData | null>(null);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.role && parsedUser.role.toLowerCase() === 'supplier') {
                setUser(parsedUser);
            } else {
                window.location.href = '/'; 
            }
        } else {
            window.location.href = '/';
        }
    }, []);

    if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <DashboardLayout user={user} title="Supplier Dashboard" Icon={Truck}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700">Incoming Orders</h3>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">8</p>
                    <p className="text-sm text-gray-500">Awaiting fulfillment</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700">Inventory</h3>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">95%</p>
                    <p className="text-sm text-gray-500">Stock Level</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700">My Products</h3>
                     <p className="text-3xl font-bold text-indigo-600 mt-2">42</p>
                    <p className="text-sm text-gray-500">Active Listings</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700">Payouts</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">$4,520</p>
                    <p className="text-sm text-gray-500">This month</p>
                </div>
            </div>
        </DashboardLayout>
    );
};
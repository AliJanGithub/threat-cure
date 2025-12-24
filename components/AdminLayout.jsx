'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, Key, Settings, LogOut, 
  Menu, X, Home, BarChart3,
  Calendar, PlusCircle, Bell,
  Search, Filter, Download
} from 'lucide-react';
import { PHP_API_URL } from '../lib/auth';

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminData, setAdminData] = useState(null);
 const checkAdminSession = async () => {
    try {
      const res = await fetch(`${PHP_API_URL}/admin/check-session`);
      const data = await res.json();
      if (!data.isAdmin) {
        router.push('/admin');
      } else {
        setAdminData(data.session);
      }
    } catch (err) {
      router.push('/admin');
    }
  };

  useEffect(() => {
    // setTimeout(()=>checkAdminSession(),300);
  }, []);

 
  const handleLogout = async () => {
    try {
      await fetch(`${PHP_API_URL}/admin/logout`, { method: 'POST',credentials: 'include' });
      router.push('/');
    } catch (err) {
      console.error('Logout failed');
    }
  };

  const navItems = [
    { icon: <Home size={20} />, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: <Users size={20} />, label: 'Users', href: '/admin/users' },
    { icon: <Key size={20} />, label: 'Partner IDs', href: '/admin/partner-ids' },
    { icon: <Calendar size={20} />, label: 'Tasks', href: '/admin/tasks' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', href: '/admin/analytics' },
    { icon: <Settings size={20} />, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg"></div>
              <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
              />
            </div>

            {/* Notifications */}
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-pink-500 rounded-full"></span>
            </button>

            {/* Admin Profile */}
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                {adminData?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-800">
                  {adminData?.email || 'Admin User'}
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-800"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 text-gray-700 transition-colors"
                  >
                    <span className="text-orange-500">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </a>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl border border-orange-100">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Users</span>
                    <span className="font-bold text-orange-600">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Partner IDs</span>
                    <span className="font-bold text-pink-600">100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Tasks</span>
                    <span className="font-bold text-gray-800">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminAuth from '../../components/AdminAuth';
import { PHP_API_URL } from '../../lib/auth';

const AdminPage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check session on component mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch(`${PHP_API_URL}/admin/check-session`,{
    credentials: 'include',  // ← THIS IS CRITICAL
 
});
      const data = await res.json();
      console.log('Session check response:', data);
      if (data.isAdmin) {
        console.log('Admin already authenticated, redirecting to dashboard');
        setIsAuthenticated(true);
        router.push('/admin/dashboard');
      } else {
        console.log('No active admin session');
      }
    } catch (err) {
      console.error('Session check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    console.log('Login successful, redirecting to dashboard');
    setIsAuthenticated(true);
    router.push('/admin/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    // This shouldn't happen since we redirect immediately, but just in case
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return <AdminAuth onLoginSuccess={handleLoginSuccess} />;
};

export default AdminPage;
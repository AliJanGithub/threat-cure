'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Lock, Mail, Eye, EyeOff, Shield, 
  LogIn, Loader2, CheckCircle 
} from 'lucide-react';
import { PHP_API_URL } from '../lib/auth';

const AdminAuth = ({ onLoginSuccess }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Check if already logged in
  useEffect(() => {
    checkAdminSession();
  }, []);

  const checkAdminSession = async () => {
    try {
      const res = await fetch(`${PHP_API_URL}/admin/check-session`,{
        credentials:'include'
      });
      const data = await res.json();
      if (data.isAdmin) {
        console.log('Admin already logged in, redirecting...');
        onLoginSuccess();
      }
    } catch (err) {
      console.log('No admin session found');
    }
  };

// In handleLogin function
const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
        console.log('Admin login attempt:', { email, password });
        
        const res = await fetch(`${PHP_API_URL}/admin/login`, {
            method: 'POST',
            credentials: 'include', // ← THIS IS CRITICAL
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        console.log('Response status:', res.status);
        console.log('Response headers:', res.headers);
        
        const data = await res.json();
        console.log('Response data:', data);

        if (data.success) {
            setSuccess('Login successful! Checking session...');
            
            // Wait a moment for session to be established
            setTimeout(async () => {
                try {
                    // Check session with credentials included
                    const sessionRes = await fetch(`${PHP_API_URL}/admin/check-session`, {
                        method: 'GET',
                        credentials: 'include' // ← THIS IS CRITICAL
                    });
                    
                    const sessionData = await sessionRes.json();
                    console.log('Session check data:', sessionData);
                    
                    if (sessionData.isAdmin) {
                        setSuccess('Session confirmed! Redirecting to dashboard...');
                        setTimeout(() => {
                            onLoginSuccess();
                        }, 500);
                    } else {
                        setError('Session not created. Debug: ' + JSON.stringify(sessionData.debug));
                    }
                } catch (sessionErr) {
                    console.error('Session check failed:', sessionErr);
                    setError('Session verification failed: ' + sessionErr.message);
                }
            }, 500);
            
        } else {
            setError(data.error || 'Login failed. Please check credentials.');
        }
    } catch (err) {
        console.error('Network error:', err);
        setError('Network error. Please check if server is running.');
    } finally {
        setLoading(false);
    }
};
  const handleTestLogin = async () => {
    // Auto-fill test credentials
    setEmail('alijan061333@gmail.com');
    setPassword('Admin@123');
    
    // Automatically submit after a brief delay
    setTimeout(() => {
      const submitEvent = new Event('submit', { cancelable: true });
      document.querySelector('form')?.dispatchEvent(submitEvent);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6">
            <div className="flex items-center justify-center space-x-3">
              <Shield className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
            </div>
            <p className="text-orange-100 text-center mt-2">
              Simple admin login - No 2FA required
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <p className="text-red-600 flex items-center">
                  <span className="mr-2">⚠</span>
                  {error}
                </p>
                <p className="text-sm text-red-500 mt-1">
                  API URL: {PHP_API_URL}/admin/login
                </p>
              </motion.div>
            )}

            {success && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <p className="text-green-600 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  {success}
                </p>
              </motion.div>
            )}

            {/* Login Form - NO 2FA STEP */}
            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                      placeholder="alijan061333@gmail.com"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5 mr-2" />
                      Sign In
                    </>
                  )}
                </button>

                {/* Test Login Button */}
                <button
                  type="button"
                  onClick={handleTestLogin}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center"
                >
                  <span>Test with Demo Credentials</span>
                </button>
              </div>
            </form>

            {/* Debug Info */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Admin Credentials & Info
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Email: <span className="font-mono">alijan061333@gmail.com</span></p>
                <p>Password: <span className="font-mono">Admin@123</span></p>
                <p className="mt-2 text-xs text-gray-500">
                  API Endpoint: <code>{PHP_API_URL}/admin/login</code>
                </p>
                <button
                  onClick={checkAdminSession}
                  className="mt-2 text-xs text-blue-500 hover:text-blue-600"
                >
                  Check Current Session Status
                </button>
              </div>
            </div>

            {/* Direct Test Buttons */}
            <div className="mt-4 space-y-2">
              <button
                onClick={() => window.open(`${PHP_API_URL}/admin/check-session`, '_blank')}
                className="w-full text-sm text-gray-600 hover:text-gray-800 p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Test API Directly (New Tab)
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAuth;
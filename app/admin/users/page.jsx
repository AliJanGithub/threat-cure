"use client";

import { useState, useEffect } from 'react';
import { 
  Users, Key, Mail, UserCheck, UserX, Shield, Search, 
  Filter, RefreshCw, Edit, Trash2, CheckCircle, XCircle,
  Plus, Download, Upload, BarChart3, Settings, LogOut,
  Eye, EyeOff, Copy, QrCode, Phone, Calendar, Globe,
  CreditCard, DollarSign, Tag, Hash, Award, Crown
} from 'lucide-react';
import AdminLayout from '../../../components/AdminLayout';

const PHP_API_URL = process.env.NEXT_PUBLIC_PHP_API_URL || 'http://localhost/threat-cure-php-backend/my-api/public';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPartnerIds: 0,
    availableIds: 0,
    assignedIds: 0
  });
  const [users, setUsers] = useState([]);
  const [partnerIds, setPartnerIds] = useState([]);
  const [availableIds, setAvailableIds] = useState([]);
  const [assignedIds, setAssignedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPartnerId, setSelectedPartnerId] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [assignForm, setAssignForm] = useState({
    partnerId: '',
    email: '',
    services: []
  });
  const [editForm, setEditForm] = useState({
    email: '',
    services: []
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch initial data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch all data in parallel
      const [usersRes, partnerIdsRes, availableRes, assignedRes] = await Promise.all([
        fetch(`${PHP_API_URL}/admin/users`, { credentials: 'include' }),
        fetch(`${PHP_API_URL}/admin/partner-ids`, { credentials: 'include' }),
        fetch(`${PHP_API_URL}/admin/partner-ids/available`, { credentials: 'include' }),
        fetch(`${PHP_API_URL}/admin/partner-ids/assigned`, { credentials: 'include' })
      ]);

      const [usersData, partnerIdsData, availableData, assignedData] = await Promise.all([
        usersRes.json(),
        partnerIdsRes.json(),
        availableRes.json(),
        assignedRes.json()
      ]);

      if (usersData.success) setUsers(usersData.data || []);
      if (partnerIdsData.success) setPartnerIds(partnerIdsData.data || []);
      if (availableData.success) setAvailableIds(availableData.data || []);
      if (assignedData.success) setAssignedIds(assignedData.data || []);

      // Update stats
      setStats({
        totalUsers: usersData.data?.length || 0,
        totalPartnerIds: partnerIdsData.data?.length || 0,
        availableIds: availableData.data?.length || 0,
        assignedIds: assignedData.data?.length || 0
      });

    } catch (err) {
      setError('Failed to fetch data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${PHP_API_URL}/admin/partner-ids/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(assignForm)
      });

      const data = await response.json();
        console.log(data)
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to assign partner ID');
      }

      setSuccess('Partner ID assigned successfully!');
      setShowAssignModal(false);
      setAssignForm({ partnerId: '', email: '', services: [] });
      fetchDashboardData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPartnerId) return;

    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${PHP_API_URL}/admin/partner-ids/${selectedPartnerId.partner_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(editForm)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to update partner ID');
      }

      setSuccess('Partner ID updated successfully!');
      setShowEditModal(false);
      setEditForm({ email: '', services: [] });
      fetchDashboardData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnassign = async (partnerId) => {
    if (!confirm('Are you sure you want to unassign this partner ID?')) return;

    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${PHP_API_URL}/admin/partner-ids/${partnerId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to unassign partner ID');
      }

      setSuccess('Partner ID unassigned successfully!');
      fetchDashboardData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSuccess('Copied to clipboard!');
    setTimeout(() => setSuccess(''), 2000);
  };

  const filteredUsers = users.filter(user =>
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.partner_net_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPartnerIds = partnerIds.filter(pid =>
    pid.partner_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pid.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pid.services?.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage users, partner IDs, and system settings</p>
          </div>
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Partner IDs</p>
                <p className="text-3xl font-bold mt-2">{stats.totalPartnerIds}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Key className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Available IDs</p>
                <p className="text-3xl font-bold mt-2">{stats.availableIds}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Assigned IDs</p>
                <p className="text-3xl font-bold mt-2">{stats.assignedIds}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users, partner IDs, emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>All Users</option>
              <option>With Partner ID</option>
              <option>Without Partner ID</option>
              <option>Active Users</option>
            </select>
          </div>
        </div>

        {/* Tabs Content */}
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              {['dashboard', 'users', 'partner-ids', 'available', 'assigned'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Users */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-4">Recent Users</h3>
                    <div className="space-y-3">
                      {users.slice(0, 5).map(user => (
                        <div key={user.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${user.partner_net_id ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {user.partner_net_id || 'No ID'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Partner IDs */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-4">Recent Partner IDs</h3>
                    <div className="space-y-3">
                      {partnerIds.slice(0, 5).map(pid => (
                        <div key={pid.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                          <div>
                            <p className="font-medium">{pid.partner_id}</p>
                            <p className="text-sm text-gray-500">{pid.email || 'Unassigned'}</p>
                          </div>
                          <div className="flex gap-2">
                            {pid.services?.map(service => (
                              <span key={service} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Partner ID</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Created</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium">{user.name?.charAt(0) || 'U'}</span>
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-500">ID: {user.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span>{user.email}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {user.partner_net_id ? (
                            <div className="flex items-center gap-2">
                              <Key className="w-4 h-4 text-green-500" />
                              <span className="font-mono">{user.partner_net_id}</span>
                              <button
                                onClick={() => handleCopyToClipboard(user.partner_net_id)}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-400">Not assigned</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {user.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-500">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowAssignModal(true);
                                setAssignForm({ ...assignForm, email: user.email });
                              }}
                              className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                              title="Assign Partner ID"
                            >
                              <Key className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 text-yellow-500 hover:bg-yellow-50 rounded"
                              title="Edit User"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 text-red-500 hover:bg-red-50 rounded"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'partner-ids' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Partner ID</th>
                      <th className="text-left py-3 px-4">Assigned To</th>
                      <th className="text-left py-3 px-4">Services</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Created</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPartnerIds.map(pid => (
                      <tr key={pid.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Hash className="w-4 h-4 text-blue-500" />
                            <span className="font-mono font-medium">{pid.partner_id}</span>
                            <button
                              onClick={() => handleCopyToClipboard(pid.partner_id)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {pid.email ? (
                            <div className="flex items-center gap-2">
                              <UserCheck className="w-4 h-4 text-green-500" />
                              <div>
                                <p className="font-medium">{pid.email}</p>
                                <p className="text-sm text-gray-500">
                                  {users.find(u => u.email === pid.email)?.name || 'User'}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-gray-400">
                              <UserX className="w-4 h-4" />
                              <span>Unassigned</span>
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {pid.services?.map((service, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {service}
                              </span>
                            )) || <span className="text-gray-400">No services</span>}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${pid.email ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {pid.email ? 'Assigned' : 'Available'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-500">
                          {new Date(pid.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            {pid.email ? (
                              <>
                                <button
                                  onClick={() => {
                                    setSelectedPartnerId(pid);
                                    setEditForm({ email: pid.email, services: pid.services || [] });
                                    setShowEditModal(true);
                                  }}
                                  className="p-2 text-yellow-500 hover:bg-yellow-50 rounded"
                                  title="Edit Assignment"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleUnassign(pid.partner_id)}
                                  className="p-2 text-red-500 hover:bg-red-50 rounded"
                                  title="Unassign"
                                >
                                  <UserX className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => {
                                  setSelectedPartnerId(pid);
                                  setAssignForm({ ...assignForm, partnerId: pid.partner_id });
                                  setShowAssignModal(true);
                                }}
                                className="p-2 text-green-500 hover:bg-green-50 rounded"
                                title="Assign"
                              >
                                <UserCheck className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'available' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableIds.map(pid => (
                    <div key={pid.id} className="bg-gray-50 p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Hash className="w-4 h-4 text-blue-500" />
                            <span className="font-mono font-bold">{pid.partner_id}</span>
                          </div>
                          <p className="text-sm text-gray-500">Available for assignment</p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedPartnerId(pid);
                            setAssignForm({ ...assignForm, partnerId: pid.partner_id });
                            setShowAssignModal(true);
                          }}
                          className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm rounded-lg hover:opacity-90"
                        >
                          Assign
                        </button>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Created: {new Date(pid.created_at).toLocaleDateString()}</p>
                        <p className="mt-1">Services: {pid.services?.join(', ') || 'None'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'assigned' && (
              <div className="space-y-4">
                {assignedIds.map(pid => (
                  <div key={pid.id} className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Hash className="w-5 h-5 text-green-500" />
                          <h3 className="font-bold text-lg">{pid.partner_id}</h3>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Assigned</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{pid.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-blue-400" />
                          <span>{users.find(u => u.email === pid.email)?.name || 'Unknown User'}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedPartnerId(pid);
                            setEditForm({ email: pid.email, services: pid.services || [] });
                            setShowEditModal(true);
                          }}
                          className="p-2 text-yellow-500 hover:bg-yellow-50 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUnassign(pid.partner_id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded"
                        >
                          <UserX className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {pid.services && pid.services.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm text-gray-500 mb-2">Services:</p>
                        <div className="flex flex-wrap gap-1">
                          {pid.services.map((service, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className="text-green-700">{success}</p>
            </div>
          </div>
        )}
      </div>

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Assign Partner ID</h2>
              <form onSubmit={handleAssignSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Partner ID</label>
                  <input
                    type="text"
                    value={assignForm.partnerId}
                    onChange={(e) => setAssignForm({...assignForm, partnerId: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Enter partner ID"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={assignForm.email}
                    onChange={(e) => setAssignForm({...assignForm, email: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="user@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Services (comma separated)</label>
                  <input
                    type="text"
                    value={assignForm.services.join(', ')}
                    onChange={(e) => setAssignForm({...assignForm, services: e.target.value.split(',').map(s => s.trim())})}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Service 1, Service 2, Service 3"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50"
                  >
                    {loading ? 'Assigning...' : 'Assign Partner ID'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAssignModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedPartnerId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Edit Partner ID: {selectedPartnerId.partner_id}</h2>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="user@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Services (comma separated)</label>
                  <input
                    type="text"
                    value={editForm.services.join(', ')}
                    onChange={(e) => setEditForm({...editForm, services: e.target.value.split(',').map(s => s.trim())})}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Service 1, Service 2, Service 3"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Partner ID'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
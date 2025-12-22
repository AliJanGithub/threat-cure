'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import {
  Search, Filter, Download, Plus, Edit2, 
  Trash2, Copy, Check, X, Key, Mail,
  Calendar, ArrowUpDown
} from 'lucide-react';
import { PHP_API_URL } from '../../../lib/auth';

const PartnerIdsPage = () => {
  const [partnerIds, setPartnerIds] = useState([]);
  const [filteredIds, setFilteredIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, assigned, available
  const [selectedId, setSelectedId] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    services: ''
  });

  useEffect(() => {
    fetchPartnerIds();
  }, []);

  useEffect(() => {
    filterPartnerIds();
  }, [searchTerm, filter, partnerIds]);

  const fetchPartnerIds = async () => {
    try {
      const res = await fetch(`${PHP_API_URL}/admin/partner-ids`, {
          method: 'GET',
          credentials: 'include', // <--- CRITICAL: Sends cookies to PHP
      });
      const data = await res.json();
      console.log('Fetched partner IDs:', data); // Debug log
      if (data.success) {
        setPartnerIds(data.data);
      }

    } catch (error) {
      console.error('Failed to fetch partner IDs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPartnerIds = () => {
    let filtered = [...partnerIds];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.partner_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.email && p.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (filter === 'assigned') {
      filtered = filtered.filter(p => p.email);
    } else if (filter === 'available') {
      filtered = filtered.filter(p => !p.email);
    }

    setFilteredIds(filtered);
  };

  const handleAssign = async (partnerId) => {
    setSelectedId(partnerId);
    setShowAssignModal(true);
  };

  const handleEdit = (partnerId) => {
    const partner = partnerIds.find(p => p.partner_id === partnerId);
    setSelectedId(partnerId);
    setFormData({
      email: partner.email || '',
      services: partner.services ? JSON.stringify(partner.services) : ''
    });
    setShowEditModal(true);
  };

  const handleUnassign = async (partnerId) => {
    if (!confirm('Are you sure you want to unassign this partner ID?')) return;

    try {
      const res = await fetch(`${PHP_API_URL}/admin/partner-ids/${partnerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include' // Important for session-based auth
      });
      
      const data = await res.json();
      if (data.success) {
        fetchPartnerIds();
      } else {
        alert(data.message || 'Failed to unassign');
      }
    } catch (error) {
      console.error('Failed to unassign:', error);
      alert('Failed to unassign partner ID');
    }
  };

  const submitAssign = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${PHP_API_URL}/admin/partner-ids/assign`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for session-based auth
        body: JSON.stringify({
          partnerId: selectedId,
          email: formData.email,
          services: formData.services ? JSON.parse(formData.services) : []
        })
      });
      
      const data = await res.json();
      if (data.success) {
        setShowAssignModal(false);
        setSelectedId(null);
        setFormData({ email: '', services: '' });
        fetchPartnerIds();
      } else {
        alert(data.message || 'Failed to assign partner ID');
      }
    } catch (error) {
      console.error('Failed to assign:', error);
      alert('Failed to assign partner ID');
    }
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      // If email is empty, we should unassign instead of updating
      if (!formData.email.trim()) {
        if (confirm('Email is empty. This will unassign the partner ID. Continue?')) {
          await handleUnassign(selectedId);
          setShowEditModal(false);
          setFormData({ email: '', services: '' });
          return;
        } else {
          return;
        }
      }

      const res = await fetch(`${PHP_API_URL}/admin/partner-ids/${selectedId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for session-based auth
        body: JSON.stringify({
          email: formData.email.trim(),
          services: formData.services ? JSON.parse(formData.services) : []
        })
      });
      
      const data = await res.json();
      if (data.success) {
        setShowEditModal(false);
        setSelectedId(null);
        setFormData({ email: '', services: '' });
        fetchPartnerIds();
      } else {
        alert(data.message || 'Failed to update partner ID');
      }
    } catch (error) {
      console.error('Failed to update:', error);
      alert('Failed to update partner ID');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const stats = {
    total: partnerIds.length,
    assigned: partnerIds.filter(p => p.email).length,
    available: partnerIds.filter(p => !p.email).length
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Partner IDs Management</h1>
            <p className="text-gray-600">Manage and assign partner identification codes</p>
          </div>
          <button
            onClick={() => {
              setSelectedId(null);
              setFormData({ email: '', services: '' });
              setShowAssignModal(true);
            }}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Assign ID</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total IDs</p>
                <p className="text-2xl font-bold mt-2">{stats.total}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-100 to-orange-50 rounded-full">
                <Key className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Assigned</p>
                <p className="text-2xl font-bold mt-2">{stats.assigned}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-pink-100 to-pink-50 rounded-full">
                <Mail className="h-6 w-6 text-pink-500" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold mt-2">{stats.available}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-100 to-green-50 rounded-full">
                <Check className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['all', 'assigned', 'available'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition ${
                      filter === f
                        ? 'bg-white text-orange-600 shadow'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter size={20} />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Partner IDs Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button className="flex items-center space-x-1 hover:text-gray-700">
                      <span>Partner ID</span>
                      <ArrowUpDown size={12} />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Services
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredIds.map((partner) => (
                  <tr key={partner.partner_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {partner.partner_id.substring(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{partner.partner_id}</div>
                          <button
                            onClick={() => copyToClipboard(partner.partner_id)}
                            className="text-xs text-gray-500 hover:text-orange-600 flex items-center space-x-1"
                          >
                            <Copy size={10} />
                            <span>Copy</span>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {partner.email ? (
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-900">{partner.email}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">Not assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {partner.services && partner.services.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(partner.services) ? (
                            partner.services.map((service, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                              >
                                {service}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-gray-600">{partner.services}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">No services</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {partner.assigned_at ? (
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-900">
                            {new Date(partner.assigned_at).toLocaleDateString()}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        partner.email
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {partner.email ? 'Assigned' : 'Available'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {partner.email ? (
                          <>
                            <button
                              onClick={() => handleEdit(partner.partner_id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleUnassign(partner.partner_id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              title="Unassign"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleAssign(partner.partner_id)}
                            className="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm"
                          >
                            Assign
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Assign Modal */}
        {showAssignModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Assign Partner ID</h3>
                  <button
                    onClick={() => {
                      setShowAssignModal(false);
                      setSelectedId(null);
                      setFormData({ email: '', services: '' });
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={submitAssign}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Partner ID
                      </label>
                      <input
                        type="text"
                        value={selectedId || ''}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="user@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Services (JSON array)
                      </label>
                      <textarea
                        value={formData.services}
                        onChange={(e) => setFormData({...formData, services: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder='["service1", "service2"]'
                        rows="3"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter services as JSON array. Leave empty for no services.
                      </p>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAssignModal(false);
                          setSelectedId(null);
                          setFormData({ email: '', services: '' });
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600"
                      >
                        Assign
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Edit Partner ID</h3>
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedId(null);
                      setFormData({ email: '', services: '' });
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={submitEdit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Partner ID
                      </label>
                      <input
                        type="text"
                        value={selectedId}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Leave empty to unassign"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Services (JSON array)
                      </label>
                      <textarea
                        value={formData.services}
                        onChange={(e) => setFormData({...formData, services: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder='["service1", "service2"]'
                        rows="3"
                      />
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowEditModal(false);
                          setSelectedId(null);
                          setFormData({ email: '', services: '' });
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PartnerIdsPage;
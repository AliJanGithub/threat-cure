'use client';

import { useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import {
  Plus, Filter, Calendar, Clock, CheckCircle,
  AlertCircle, MoreVertical, Edit2, Trash2,
  TrendingUp, Users, Target, Flag,
  X
} from 'lucide-react';

const TasksPage = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Monthly System Review',
      description: 'Review system performance and security logs',
      assignedTo: 'Admin Team',
      dueDate: '2024-01-20',
      priority: 'high',
      status: 'pending',
      category: 'system'
    },
    {
      id: 2,
      title: 'User Account Audit',
      description: 'Audit all user accounts for compliance',
      assignedTo: 'Security Team',
      dueDate: '2024-01-18',
      priority: 'medium',
      status: 'in-progress',
      category: 'security'
    },
    {
      id: 3,
      title: 'Partner ID Allocation',
      description: 'Allocate new partner IDs for Q1 2024',
      assignedTo: 'Admin User',
      dueDate: '2024-01-25',
      priority: 'high',
      status: 'pending',
      category: 'management'
    },
    {
      id: 4,
      title: 'Database Backup',
      description: 'Perform weekly database backup',
      assignedTo: 'IT Team',
      dueDate: '2024-01-17',
      priority: 'low',
      status: 'completed',
      category: 'maintenance'
    },
    {
      id: 5,
      title: 'API Documentation Update',
      description: 'Update API documentation with new endpoints',
      assignedTo: 'Development Team',
      dueDate: '2024-01-30',
      priority: 'medium',
      status: 'pending',
      category: 'documentation'
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    priority: 'medium',
    category: 'general'
  });

  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  const statusColors = {
    pending: 'bg-orange-100 text-orange-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
  };

  const categoryIcons = {
    system: <TrendingUp className="h-4 w-4" />,
    security: <AlertCircle className="h-4 w-4" />,
    management: <Users className="h-4 w-4" />,
    maintenance: <Target className="h-4 w-4" />,
    documentation: <Flag className="h-4 w-4" />,
    general: <CheckCircle className="h-4 w-4" />
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const task = {
      ...newTask,
      id: tasks.length + 1,
      status: 'pending'
    };
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      assignedTo: '',
      dueDate: '',
      priority: 'medium',
      category: 'general'
    });
    setShowNewTaskModal(false);
  };

  const handleDeleteTask = (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Tasks Management</h1>
            <p className="text-gray-600">Create and manage admin tasks</p>
          </div>
          <button
            onClick={() => setShowNewTaskModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>New Task</span>
          </button>
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold mt-2">{tasks.length}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-100 to-orange-50 rounded-full">
                <CheckCircle className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold mt-2">
                  {tasks.filter(t => t.status === 'pending').length}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-full">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold mt-2">
                  {tasks.filter(t => t.status === 'in-progress').length}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold mt-2">
                  {tasks.filter(t => t.status === 'completed').length}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-100 to-green-50 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tasks.map(task => (
            <div key={task.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-2 rounded-lg ${
                        task.category === 'system' ? 'bg-purple-100 text-purple-600' :
                        task.category === 'security' ? 'bg-red-100 text-red-600' :
                        task.category === 'management' ? 'bg-orange-100 text-orange-600' :
                        task.category === 'maintenance' ? 'bg-blue-100 text-blue-600' :
                        task.category === 'documentation' ? 'bg-pink-100 text-pink-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {categoryIcons[task.category]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{task.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                            {task.priority.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                            {task.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{task.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>Due: {task.dueDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users size={14} />
                          <span>{task.assignedTo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreVertical size={18} />
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 hidden group-hover:block">
                      <div className="py-1">
                        <button
                          onClick={() => handleStatusChange(task.id, 'pending')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Mark as Pending
                        </button>
                        <button
                          onClick={() => handleStatusChange(task.id, 'in-progress')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Mark as In Progress
                        </button>
                        <button
                          onClick={() => handleStatusChange(task.id, 'completed')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Mark as Completed
                        </button>
                        <hr className="my-1" />
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                          <Edit2 size={14} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress/Status Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex space-x-2">
                    {['pending', 'in-progress', 'completed'].map(status => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(task.id, status)}
                        className={`px-3 py-1 rounded-lg text-sm ${
                          task.status === status
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {status.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500">
                    ID: #{task.id.toString().padStart(3, '0')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* New Task Modal */}
        {showNewTaskModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-2xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Create New Task</h3>
                  <button
                    onClick={() => setShowNewTaskModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <form onSubmit={handleAddTask}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Task Title *
                        </label>
                        <input
                          type="text"
                          value={newTask.title}
                          onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Enter task title"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Assigned To
                        </label>
                        <input
                          type="text"
                          value={newTask.assignedTo}
                          onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Team or person"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <select
                          value={newTask.category}
                          onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="general">General</option>
                          <option value="system">System</option>
                          <option value="security">Security</option>
                          <option value="management">Management</option>
                          <option value="maintenance">Maintenance</option>
                          <option value="documentation">Documentation</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={newTask.description}
                          onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Task description"
                          rows="4"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Due Date
                          </label>
                          <input
                            type="date"
                            value={newTask.dueDate}
                            onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Priority
                          </label>
                          <select
                            value={newTask.priority}
                            onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowNewTaskModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600"
                    >
                      Create Task
                    </button>
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

export default TasksPage;
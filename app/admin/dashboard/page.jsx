'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../components/AdminLayout';
import { 
  Plus, Calendar, Trash2, GripVertical,
  Save, RefreshCw, Download, Edit, Check, X
} from 'lucide-react';
import { PHP_API_URL } from '../../../lib/auth';

const DashboardPage = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [timelineStart, setTimelineStart] = useState('');
  const [timelineEnd, setTimelineEnd] = useState('');
  const [parts, setParts] = useState(6);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskStart, setNewTaskStart] = useState('');
  const [newTaskEnd, setNewTaskEnd] = useState('');
  const [loading, setLoading] = useState(true);
  const [draggingTask, setDraggingTask] = useState(null);
  const [draggingTimeline, setDraggingTimeline] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskName, setEditTaskName] = useState('');
  const [editTaskStart, setEditTaskStart] = useState('');
  const [editTaskEnd, setEditTaskEnd] = useState('');
  const [hasTimeline, setHasTimeline] = useState(false); // Track if timeline exists
  const [timelineId, setTimelineId] = useState(null); // Store timeline ID for updates
  const timelineRef = useRef(null);

  // Color palette for tasks
  const colorPalette = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ];

  useEffect(() => {
    fetchTasks();
    fetchTimeline(); // Fetch timeline data on load
  }, []);

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${PHP_API_URL}/gantt/tasks`);
      console.log('Fetch tasks response status:', res.status);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const text = await res.text();
      console.log('Raw tasks response:', text);
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        throw new Error('Invalid JSON response from server');
      }
      
      if (data.success) {
        setTasks(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      alert(`Error fetching tasks: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch timeline settings from gantt_timeline table
  const fetchTimeline = async () => {
    try {
      const res = await fetch(`${PHP_API_URL}/gantt/timeline`);
      console.log('Fetch timeline response status:', res.status);
      
      if (!res.ok) {
        console.log('Timeline endpoint not found or error');
        return;
      }
      
      const text = await res.text();
      console.log('Raw timeline response:', text);
      
      if (text.trim()) {
        let data;
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          console.error('Failed to parse timeline JSON:', parseError);
          return;
        }
        
        if (data.success && data.data) {
          // Set timeline from fetched data
          if (data.data.id) {
            setTimelineId(data.data.id);
            setHasTimeline(true);
          }
          setTimelineStart(data.data.timeline_start || '');
          setTimelineEnd(data.data.timeline_end || '');
          setParts(data.data.parts || 6);
        }
      }
    } catch (error) {
      console.error('Failed to fetch timeline:', error);
    }
  };

  // Save or Update timeline to database
  const saveTimelineToDatabase = async () => {
    if (!timelineStart || !timelineEnd || parts < 1) {
      alert('Please fill all timeline fields (Start, End, and Parts)');
      return;
    }

    const timelineData = {
      timeline_start: timelineStart,
      timeline_end: timelineEnd,
      parts: parts
    };

    console.log('Saving timeline to database:', timelineData);
    console.log('Has existing timeline:', hasTimeline);
    console.log('Timeline ID:', timelineId);

    try {
      // Using POST to /gantt/timeline endpoint
      const res = await fetch(`${PHP_API_URL}/gantt/timeline`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(timelineData)
      });
      
      const text = await res.text();
      console.log('Timeline save response:', text);
      console.log('Response status:', res.status);
      
      if (!text.trim()) {
        throw new Error('Server returned empty response');
      }
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('Failed to parse timeline save response:', parseError);
        throw new Error('Invalid JSON response from server');
      }
      
      if (data.success) {
        setHasTimeline(true);
        alert('Timeline saved to database successfully!');
        
        // Also update tasks with timeline data
        const updateTasksRes = await fetch(`${PHP_API_URL}/gantt/timeline/update`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(timelineData)
        });
        
        const updateTasksText = await updateTasksRes.text();
        console.log('Update tasks with timeline response:', updateTasksText);
        
        // Refresh timeline data
        fetchTimeline();
        
      } else {
        alert(data.message || 'Failed to save timeline to database');
      }
    } catch (error) {
      console.error('Failed to save timeline to database:', error);
      alert(`Error: ${error.message}`);
      
      // Test the endpoint directly
      try {
        console.log('Testing timeline endpoint...');
        const testRes = await fetch(`${PHP_API_URL}/gantt/timeline`, {
          method: 'GET'
        });
        const testText = await testRes.text();
        console.log('Timeline test GET response:', testText);
      } catch (testError) {
        console.error('Timeline endpoint test failed:', testError);
      }
    }
  };

  // Add new task (keeping your existing function)
  const addNewTask = async () => {
    if (!newTaskName.trim()) {
      alert('Please enter a task name');
      return;
    }

    const taskData = {
      task_name: newTaskName.trim(),
      start_date: newTaskStart || null,
      end_date: newTaskEnd || null
    };

    console.log('Adding task:', taskData);

    try {
      const res = await fetch(`${PHP_API_URL}/gantt/tasks`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(taskData)
      });
      
      const text = await res.text();
      console.log('Response:', text);
      
      if (!text.trim()) {
        throw new Error('Server returned empty response');
      }
      
      const data = JSON.parse(text);
      
      if (data.success) {
        setTasks([...tasks, data.data]);
        setNewTaskName('');
        setNewTaskStart('');
        setNewTaskEnd('');
        alert('Task added!');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add task: ' + error.message);
    }
  };

  // Start editing a task
  const startEditTask = (task) => {
    setEditingTask(task.id);
    setEditTaskName(task.task_name);
    setEditTaskStart(task.start_date || '');
    setEditTaskEnd(task.end_date || '');
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingTask(null);
    setEditTaskName('');
    setEditTaskStart('');
    setEditTaskEnd('');
  };

  // Update task with API call
  const saveTaskEdit = async (taskId) => {
    if (!editTaskName.trim()) {
      alert('Task name cannot be empty');
      return;
    }

    const updates = {
      task_name: editTaskName.trim(),
      start_date: editTaskStart || null,
      end_date: editTaskEnd || null
    };

    try {
      const res = await fetch(`${PHP_API_URL}/gantt/tasks`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ id: taskId, ...updates })
      });
      
      const text = await res.text();
      console.log('Update response:', text);
      
      if (!text.trim()) {
        throw new Error('Server returned empty response');
      }
      
      const data = JSON.parse(text);
      
      if (data.success) {
        setTasks(tasks.map(task => 
          task.id === taskId ? { ...task, ...updates } : task
        ));
        cancelEdit();
        alert('Task updated successfully!');
      } else {
        alert(data.message || 'Failed to update task');
      }
    } catch (error) {
      console.error('Failed to update task:', error);
      alert(`Error: ${error.message}`);
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      const res = await fetch(`${PHP_API_URL}/gantt/tasks`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ id: taskId })
      });
      
      const text = await res.text();
      console.log('Delete response:', text);
      
      if (!text.trim()) {
        throw new Error('Server returned empty response');
      }
      
      const data = JSON.parse(text);
      
      if (data.success) {
        setTasks(tasks.filter(task => task.id !== taskId));
        alert('Task deleted successfully!');
      } else {
        alert(data.message || 'Failed to delete task');
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const calculateTimelinePosition = (task) => {
    if (!timelineStart || !timelineEnd || !task.start_date || !task.end_date) {
      return { left: 0, width: 0 };
    }

    const start = new Date(timelineStart);
    const end = new Date(timelineEnd);
    const taskStart = new Date(task.start_date);
    const taskEnd = new Date(task.end_date);

    const totalDuration = end - start;
    const taskDuration = taskEnd - taskStart;
    const taskOffset = taskStart - start;

    const left = (taskOffset / totalDuration) * 100;
    const width = (taskDuration / totalDuration) * 100;

    return { left: Math.max(0, Math.min(left, 100)), width: Math.min(width, 100 - left) };
  };

  const getMonthLabels = () => {
    if (!timelineStart || !timelineEnd) return [];

    const start = new Date(timelineStart);
    const end = new Date(timelineEnd);
    const months = [];
    const durationInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

    for (let i = 0; i <= durationInMonths; i++) {
      const date = new Date(start.getFullYear(), start.getMonth() + i, 1);
      months.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
    }

    return months;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Project Timeline Dashboard</h1>
            <p className="text-gray-600">Manage tasks and timelines with drag & drop</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => {
                fetchTasks();
                fetchTimeline();
              }}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
            >
              <RefreshCw size={16} />
              <span>Refresh All</span>
            </button>
          </div>
        </div>

        {/* Add New Task with Start/End Dates */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Task</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Task Name</label>
              <input
                type="text"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                placeholder="Enter task name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={newTaskStart}
                onChange={(e) => setNewTaskStart(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={newTaskEnd}
                onChange={(e) => setNewTaskEnd(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={addNewTask}
                className="w-full px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 flex items-center justify-center space-x-2"
              >
                <Plus size={16} />
                <span>Add Task</span>
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Settings with Save Button */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Master Timeline Settings</h2>
            <div className="flex items-center space-x-2">
              {hasTimeline && (
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  ✓ Timeline Saved
                </span>
              )}
              <button 
                onClick={saveTimelineToDatabase}
                className={`px-6 py-2 rounded-lg flex items-center space-x-2 ${
                  hasTimeline 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
                    : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600'
                } text-white`}
              >
                <Save size={16} />
                <span>{hasTimeline ? 'Update Timeline' : 'Save Timeline to Database'}</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timeline Start</label>
              <input
                type="date"
                value={timelineStart}
                onChange={(e) => setTimelineStart(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timeline End</label>
              <input
                type="date"
                value={timelineEnd}
                onChange={(e) => setTimelineEnd(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parts/Intervals</label>
              <input
                type="number"
                min="1"
                max="24"
                value={parts}
                onChange={(e) => setParts(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {hasTimeline && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Note:</span> Timeline is saved in database. Click Update Timeline  to save changes.
              </p>
            </div>
          )}
        </div>
 
        {/* Gantt Chart */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Timeline Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Project Timeline</h2>
            {!timelineStart || !timelineEnd ? (
              <p className="text-sm text-amber-600 mt-1">
                ⚠️ Set and save timeline dates above to view the chart
              </p>
            ) : null}
          </div>

          {/* Tasks and Timeline */}
          <div className="p-6 space-y-8">
            {tasks.map((task, index) => (
              <div key={task.id} className="flex items-center space-x-4">
                {/* Task Name with Action Buttons */}
                <div className="w-48 flex items-center space-x-3">
                  <div className="cursor-move">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                  </div>
                  
                  {editingTask === task.id ? (
                    <input
                      type="text"
                      value={editTaskName}
                      onChange={(e) => setEditTaskName(e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded text-sm flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && saveTaskEdit(task.id)}
                    />
                  ) : (
                    <span className="font-medium text-gray-800 flex-1">{task.task_name}</span>
                  )}
                  
                  <div className="flex space-x-1">
                    {editingTask === task.id ? (
                      <>
                        <button
                          onClick={() => saveTaskEdit(task.id)}
                          className="p-1 text-green-500 hover:text-green-600 hover:bg-green-50 rounded"
                          title="Save"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1 text-red-500 hover:text-red-600 hover:bg-red-50 rounded"
                          title="Cancel"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditTask(task)}
                          className="p-1 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1 text-red-500 hover:text-red-600 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Task Date Inputs */}
                <div className="flex space-x-3">
                  {editingTask === task.id ? (
                    <>
                      <input
                        type="date"
                        value={editTaskStart}
                        onChange={(e) => setEditTaskStart(e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded text-sm"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="date"
                        value={editTaskEnd}
                        onChange={(e) => setEditTaskEnd(e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded text-sm"
                      />
                    </>
                  ) : (
                    <>
                      <div className="px-3 py-1 text-sm text-gray-700">
                        {task.start_date || 'Not set'}
                      </div>
                      <span className="text-gray-500">to</span>
                      <div className="px-3 py-1 text-sm text-gray-700">
                        {task.end_date || 'Not set'}
                      </div>
                    </>
                  )}
                </div>

                {/* Timeline Bar */}
                <div 
                  ref={timelineRef}
                  className="flex-1 h-16 relative bg-gray-100 rounded-lg overflow-hidden border border-gray-300"
                >
                  {/* Month Labels */}
                  {timelineStart && timelineEnd && (
                    <div className="absolute top-0 left-0 w-full h-6 flex border-b border-gray-300">
                      {getMonthLabels().map((month, i) => (
                        <div 
                          key={i} 
                          className="h-full border-r border-gray-300 flex-1 text-xs text-gray-600 flex items-center justify-center"
                        >
                          {month}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Task Bar */}
                  {task.start_date && task.end_date && timelineStart && timelineEnd && (
                    <div className="absolute top-6 left-0 w-full h-10">
                      <div
                        className="absolute h-8 rounded-md flex items-center justify-center text-white text-sm font-medium cursor-move"
                        style={{
                          ...calculateTimelinePosition(task),
                          backgroundColor: task.color || '#3B82F6',
                          top: '50%',
                          transform: 'translateY(-50%)'
                        }}
                      >
                        <span className="px-2 truncate">{task.task_name}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Timeline Ruler */}
          {timelineStart && timelineEnd && (
            <div className="p-6 border-t border-gray-200">
              <div className="h-12 bg-gray-50 rounded-lg border border-gray-300 relative">
                {/* Partition Lines */}
                {Array.from({ length: parts - 1 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 h-full border-r-2 border-dashed border-gray-400"
                    style={{ left: `${(i + 1) * (100 / parts)}%` }}
                  >
                    <div className="absolute -top-6 left-0 w-px h-4 bg-gray-400" />
                  </div>
                ))}
                
                {/* Start and End Labels */}
                <div className="absolute -top-8 left-0 text-sm text-gray-600">
                  {new Date(timelineStart).toLocaleDateString()}
                </div>
                <div className="absolute -top-8 right-0 text-sm text-gray-600">
                  {new Date(timelineEnd).toLocaleDateString()}
                </div>
                
                {/* Part Labels */}
                {Array.from({ length: parts }).map((_, i) => (
                  <div
                    key={`label-${i}`}
                    className="absolute -top-8 text-xs text-gray-500"
                    style={{ left: `${(i * 100 / parts)}%`, transform: 'translateX(-50%)' }}
                  >
                    Part {i + 1}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Timeline Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">Total Tasks</p>
              <p className="text-2xl font-bold text-blue-900">{tasks.length}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">Timeline Duration</p>
              <p className="text-2xl font-bold text-green-900">
                {timelineStart && timelineEnd 
                  ? Math.ceil((new Date(timelineEnd) - new Date(timelineStart)) / (1000 * 60 * 60 * 24)) + ' days'
                  : 'Not set'
                }
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-700">Parts / Intervals</p>
              <p className="text-2xl font-bold text-purple-900">{parts}</p>
            </div>
          </div>
          
          {/* Timeline Info */}
          {timelineStart && timelineEnd && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-700 mb-1">Timeline Range</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(timelineStart).toLocaleDateString()} 
                    <span className="mx-2">→</span>
                    {new Date(timelineEnd).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-700 mb-1">Database Status</p>
                  <p className={`text-lg font-semibold ${hasTimeline ? 'text-green-600' : 'text-amber-600'}`}>
                    {hasTimeline ? '✓ Saved' : '⚠️ Not Saved'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
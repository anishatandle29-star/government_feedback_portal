import { ArrowLeft, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface AnalyticsDashboardProps {
  onBack: () => void;
}

export function AnalyticsDashboard({ onBack }: AnalyticsDashboardProps) {
  const { stats } = useAppContext();

  // If all data is cleared, show empty state
  if (stats.totalComplaints === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button onClick={onBack} className="flex items-center text-indigo-600 hover:text-indigo-700 mb-2">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-gray-900">Analytics & Insights</h1>
            <p className="text-gray-600 mt-1">Detailed analysis of complaint trends and performance</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">No Analytics Data Available</h3>
            <p className="text-gray-600">All data has been cleared. Analytics will appear once new complaints are filed.</p>
          </div>
        </div>
      </div>
    );
  }

  // Mock data for complaints over time
  const timelineData = [
    { month: 'Jan', total: 85, resolved: 62, pending: 23 },
    { month: 'Feb', total: 92, resolved: 68, pending: 24 },
    { month: 'Mar', total: 108, resolved: 79, pending: 29 },
    { month: 'Apr', total: 125, resolved: 88, pending: 37 },
    { month: 'May', total: 118, resolved: 91, pending: 27 },
    { month: 'Jun', total: 134, resolved: 98, pending: 36 },
    { month: 'Jul', total: 145, resolved: 105, pending: 40 },
    { month: 'Aug', total: 156, resolved: 118, pending: 38 },
    { month: 'Sep', total: 142, resolved: 109, pending: 33 },
    { month: 'Oct', total: 138, resolved: 102, pending: 36 },
    { month: 'Nov', total: 129, resolved: 95, pending: 34 },
    { month: 'Dec', total: 121, resolved: 88, pending: 33 }
  ];

  // Complaints by department
  const departmentData = [
    { name: 'Road Infrastructure', complaints: 324, resolved: 189 },
    { name: 'Water & Drainage', complaints: 287, resolved: 201 },
    { name: 'Electricity', complaints: 245, resolved: 178 },
    { name: 'Transportation', complaints: 218, resolved: 142 },
    { name: 'Health Care', complaints: 173, resolved: 127 }
  ];

  // Status distribution
  const statusData = [
    { name: 'Resolved', value: 767, color: '#10b981' },
    { name: 'In Progress', value: 156, color: '#f59e0b' },
    { name: 'Pending', value: 324, color: '#ef4444' }
  ];

  // Resolution time analysis
  const resolutionTimeData = [
    { department: 'Road', avgDays: 12 },
    { department: 'Water', avgDays: 8 },
    { department: 'Electricity', avgDays: 6 },
    { department: 'Transport', avgDays: 15 },
    { department: 'Health', avgDays: 10 }
  ];

  // Performance metrics by department (Radar Chart)
  const performanceData = [
    { metric: 'Response Time', Road: 65, Water: 80, Electricity: 85, Transport: 60, Health: 70 },
    { metric: 'Resolution Rate', Road: 58, Water: 70, Electricity: 73, Transport: 65, Health: 73 },
    { metric: 'User Satisfaction', Road: 70, Water: 75, Electricity: 80, Transport: 65, Health: 78 },
    { metric: 'Efficiency', Road: 68, Water: 82, Electricity: 88, Transport: 62, Health: 75 }
  ];

  // Area chart for trend analysis
  const trendData = [
    { week: 'W1', complaints: 28, resolved: 22 },
    { week: 'W2', complaints: 32, resolved: 24 },
    { week: 'W3', complaints: 29, resolved: 26 },
    { week: 'W4', complaints: 35, resolved: 28 },
    { week: 'W5', complaints: 31, resolved: 29 },
    { week: 'W6', complaints: 27, resolved: 25 },
    { week: 'W7', complaints: 33, resolved: 30 },
    { week: 'W8', complaints: 30, resolved: 28 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button onClick={onBack} className="flex items-center text-indigo-600 hover:text-indigo-700 mb-2">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-gray-900">Analytics & Insights</h1>
          <p className="text-gray-600 mt-1">Detailed analysis of complaint trends and performance</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Resolution Rate</p>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h2 className="text-gray-900">61.5%</h2>
            <p className="text-sm text-green-600 mt-1">↑ 5.2% from last month</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Avg Response Time</p>
              <Activity className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-gray-900">10.2 days</h2>
            <p className="text-sm text-green-600 mt-1">↓ 1.3 days improved</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Active Rate</p>
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <h2 className="text-gray-900">12.5%</h2>
            <p className="text-sm text-orange-600 mt-1">In Progress issues</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Pending Rate</p>
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-gray-900">26.0%</h2>
            <p className="text-sm text-red-600 mt-1">Needs attention</p>
          </div>
        </div>

        {/* Monthly Complaints Timeline */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-gray-900 mb-4">Monthly Complaint Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={2} name="Total Complaints" />
              <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} name="Resolved" />
              <Line type="monotone" dataKey="pending" stroke="#ef4444" strokeWidth={2} name="Pending" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Comparison and Status Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Department Bar Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-gray-900 mb-4">Complaints by Department</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" angle={-15} textAnchor="end" height={80} />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="complaints" fill="#6366f1" name="Total" radius={[8, 8, 0, 0]} />
                <Bar dataKey="resolved" fill="#10b981" name="Resolved" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Status Pie Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-gray-900 mb-4">Status Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Trend Area Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-gray-900 mb-4">Weekly Trend Analysis (Last 8 Weeks)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="complaints" stackId="1" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} name="New Complaints" />
              <Area type="monotone" dataKey="resolved" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Resolved" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Resolution Time and Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Average Resolution Time */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-gray-900 mb-4">Average Resolution Time (Days)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resolutionTimeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="department" type="category" stroke="#6b7280" width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="avgDays" fill="#f59e0b" name="Days" radius={[0, 8, 8, 0]}>
                  {resolutionTimeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.avgDays > 12 ? '#ef4444' : entry.avgDays > 8 ? '#f59e0b' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Department Performance Radar */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-gray-900 mb-4">Department Performance Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={performanceData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6b7280" />
                <Radar name="Road" dataKey="Road" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                <Radar name="Water" dataKey="Water" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Radar name="Electricity" dataKey="Electricity" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights Section */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-md p-6 border-l-4 border-indigo-600">
          <h2 className="text-gray-900 mb-4">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-gray-900 mb-2">🎯 Top Priority</h3>
              <p className="text-gray-700 text-sm">Road Infrastructure has the highest number of complaints (324). Recommend increasing resource allocation.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-gray-900 mb-2">⚡ Best Performance</h3>
              <p className="text-gray-700 text-sm">Electricity department shows fastest resolution time at 6 days average with 73% resolution rate.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-gray-900 mb-2">📈 Trend Alert</h3>
              <p className="text-gray-700 text-sm">Overall complaint volume increased by 8.2% in last quarter. Monitor peak months (Jul-Aug).</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-gray-900 mb-2">✨ Improvement</h3>
              <p className="text-gray-700 text-sm">Resolution rate improved from 56.3% to 61.5% YoY. Keep up the momentum!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { AlertCircle, CheckCircle, Clock, FileText } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface DashboardProps {
  onNavigateToComplaints: () => void;
  onNavigateToSimilarReports: () => void;
  onNavigateToAnalytics: () => void;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

function StatCard({ title, value, icon, color, bgColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 mb-1">{title}</p>
          <h2 className="text-gray-900">{value}</h2>
        </div>
        <div className={`${bgColor} ${color} p-4 rounded-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export function Dashboard({ onNavigateToComplaints, onNavigateToSimilarReports, onNavigateToAnalytics }: DashboardProps) {
  const { stats } = useAppContext();

  const statsData = [
    {
      title: 'Total Complaints',
      value: stats.totalComplaints,
      icon: <FileText className="w-8 h-8" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: <Clock className="w-8 h-8" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: <AlertCircle className="w-8 h-8" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Resolved',
      value: stats.resolved,
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-gray-900">Government Feedback Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and manage community complaints</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={onNavigateToComplaints}
              className="bg-indigo-600 text-white px-6 py-4 rounded-lg hover:bg-indigo-700 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white">File New Complaint</h3>
                  <p className="text-indigo-100 text-sm mt-1">Report an issue by department</p>
                </div>
                <FileText className="w-6 h-6" />
              </div>
            </button>
            <button
              onClick={onNavigateToSimilarReports}
              className="bg-white border-2 border-indigo-600 text-indigo-600 px-6 py-4 rounded-lg hover:bg-indigo-50 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3>View Similar Reports</h3>
                  <p className="text-gray-600 text-sm mt-1">Check reports in your area</p>
                </div>
                <AlertCircle className="w-6 h-6" />
              </div>
            </button>
            <button
              onClick={onNavigateToAnalytics}
              className="bg-white border-2 border-green-600 text-green-600 px-6 py-4 rounded-lg hover:bg-green-50 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3>View Analytics</h3>
                  <p className="text-gray-600 text-sm mt-1">Detailed data insights</p>
                </div>
                <CheckCircle className="w-6 h-6" />
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        {stats.totalComplaints > 0 ? (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { dept: 'Road Infrastructure', status: 'Resolved', time: '2 hours ago', color: 'text-green-600' },
                { dept: 'Water & Drainage', status: 'In Progress', time: '5 hours ago', color: 'text-orange-600' },
                { dept: 'Electricity', status: 'Pending', time: '1 day ago', color: 'text-yellow-600' },
                { dept: 'Health Care', status: 'Resolved', time: '2 days ago', color: 'text-green-600' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div>
                    <p className="text-gray-900">{activity.dept}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${activity.color} bg-opacity-10 ${activity.color.replace('text-', 'bg-')}`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">No Complaints Yet</h3>
            <p className="text-gray-600">All complaints have been cleared. The system is ready for new reports.</p>
          </div>
        )}
      </div>
    </div>
  );
}
import { ArrowLeft, MapPin, Calendar, User, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

interface SimilarReportsPageProps {
  onBack: () => void;
}

export function SimilarReportsPage({ onBack }: SimilarReportsPageProps) {
  const { reports, clearAllData, updateReportStatus } = useAppContext();
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [showClearAllModal, setShowClearAllModal] = useState(false);

  const handleReportClick = (report: any) => {
    setSelectedReport(report);
  };

  const handleClearReport = () => {
    if (selectedReport) {
      updateReportStatus(selectedReport.id);
      setSelectedReport(null);
    }
  };

  const handleClearAllReports = () => {
    clearAllData();
    setShowClearAllModal(false);
    alert('All reports and complaints have been cleared! System reset to zero.');
  };

  const handleCancelClear = () => {
    setSelectedReport(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-700';
      case 'In Progress':
        return 'bg-orange-100 text-orange-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Modal for clearing all data
  if (showClearAllModal) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button onClick={() => setShowClearAllModal(false)} className="flex items-center text-indigo-600 hover:text-indigo-700 mb-2">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Reports
            </button>
            <h1 className="text-gray-900">Clear All Data</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-gray-900 mb-2">Reset Entire System?</h2>
              <p className="text-gray-600">This will clear all data permanently</p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-6 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-red-800">Warning: This action cannot be undone!</h3>
                  <p className="text-red-700 text-sm mt-1">
                    This will reset the entire system including:
                  </p>
                  <ul className="text-red-700 text-sm mt-2 space-y-1 list-disc list-inside">
                    <li>All complaint counts will be set to 0</li>
                    <li>All similar reports will be removed</li>
                    <li>Dashboard statistics will reset</li>
                    <li>Analytics data will be cleared</li>
                  </ul>
                  <p className="text-red-700 text-sm mt-2">
                    The system will be like using it for the first time.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleClearAllReports}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="w-5 h-5" />
                Yes, Clear Everything
              </button>
              <button
                onClick={() => setShowClearAllModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Modal for confirming clear action
  if (selectedReport) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button onClick={handleCancelClear} className="flex items-center text-indigo-600 hover:text-indigo-700 mb-2">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Reports
            </button>
            <h1 className="text-gray-900">Report Details</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-indigo-600" />
              </div>
              <h2 className="text-gray-900 mb-2">{selectedReport.location}</h2>
              <p className="text-gray-600">{selectedReport.city}, {selectedReport.pincode}</p>
            </div>

            <div className="space-y-6">
              {/* Report Details */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-gray-900 mb-4">Report Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Department:</span>
                    <span className="text-gray-900">{selectedReport.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Similar Reports:</span>
                    <span className="text-indigo-600">{selectedReport.reportCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedReport.status)}`}>
                      {selectedReport.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date Reported:</span>
                    <span className="text-gray-900">{new Date(selectedReport.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location Coordinates:</span>
                    <span className="text-gray-900">{selectedReport.coords.lat.toFixed(4)}°, {selectedReport.coords.lng.toFixed(4)}°</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-gray-900 mb-2">Original Description</h3>
                <p className="text-gray-700 italic mb-4">"{selectedReport.description}"</p>
                <h3 className="text-gray-900 mb-2">AI-Analyzed Summary</h3>
                <p className="text-blue-800">{selectedReport.analyzedDescription}</p>
              </div>

              {/* Warning Message */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-yellow-800">Clear This Report?</h3>
                    <p className="text-yellow-700 text-sm mt-1">
                      This action will clear the {selectedReport.reportCount} similar reports at this location and update system statistics.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleClearReport}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Clear This Report
                </button>
                <button
                  onClick={handleCancelClear}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button onClick={onBack} className="flex items-center text-indigo-600 hover:text-indigo-700 mb-2">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">Similar Reports by Location</h1>
              <p className="text-gray-600 mt-1">Click on any report to view details and clear</p>
            </div>
            {reports.length > 0 && (
              <button
                onClick={() => setShowClearAllModal(true)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <XCircle className="w-5 h-5" />
                Clear All Data
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {reports.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">No Reports Available</h3>
            <p className="text-gray-600">All reports have been cleared. The system has been reset to zero.</p>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Total Similar Reports</p>
                    <h2 className="text-gray-900 mt-1">{reports.reduce((sum, r) => sum + r.reportCount, 0)}</h2>
                  </div>
                  <TrendingUp className="w-10 h-10 text-indigo-600" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Unique Locations</p>
                    <h2 className="text-gray-900 mt-1">{reports.length}</h2>
                  </div>
                  <MapPin className="w-10 h-10 text-indigo-600" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">Active Issues</p>
                    <h2 className="text-gray-900 mt-1">{reports.filter(r => r.status !== 'Resolved').length}</h2>
                  </div>
                  <User className="w-10 h-10 text-indigo-600" />
                </div>
              </div>
            </div>

            {/* Reports List */}
            <div className="space-y-6">
              {reports.map((report) => (
                <div 
                  key={report.id} 
                  onClick={() => handleReportClick(report)}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-gray-900">{report.location}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {report.city}, {report.pincode}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(report.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg">
                        <p className="text-sm">Similar Reports</p>
                        <p className="text-center">{report.reportCount}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600 mb-1">Department: <span className="text-gray-900">{report.department}</span></p>
                      <p className="text-sm text-gray-600 mb-3">Original: <span className="text-gray-700 italic">"{report.description}"</span></p>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-blue-900 mb-1">AI-Analyzed Description:</p>
                          <p className="text-blue-800">{report.analyzedDescription}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        Coordinates: {report.coords.lat.toFixed(4)}°, {report.coords.lng.toFixed(4)}°
                      </p>
                      <button className="text-indigo-600 hover:text-indigo-700 text-sm">
                        Click to View & Clear →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
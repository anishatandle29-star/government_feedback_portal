import { createContext, useContext, useState, ReactNode } from 'react';

interface AppStats {
  totalComplaints: number;
  pending: number;
  inProgress: number;
  resolved: number;
}

interface Report {
  id: string;
  location: string;
  pincode: string;
  city: string;
  department: string;
  description: string;
  analyzedDescription: string;
  reportCount: number;
  status: string;
  date: string;
  coords: { lat: number; lng: number };
}

interface AppContextType {
  stats: AppStats;
  reports: Report[];
  clearAllData: () => void;
  updateReportStatus: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialStats: AppStats = {
  totalComplaints: 1247,
  pending: 324,
  inProgress: 156,
  resolved: 767
};

const initialReports: Report[] = [
  {
    id: '1',
    location: 'Near City Hospital, Main Road',
    pincode: '110001',
    city: 'New Delhi',
    department: 'Road Infrastructure',
    description: 'Large pothole causing traffic issues',
    analyzedDescription: 'Multiple reports of road damage in high-traffic area. Pothole approximately 2 feet wide causing vehicle damage. Urgent repair needed.',
    reportCount: 12,
    status: 'In Progress',
    date: '2025-12-20',
    coords: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: '2',
    location: 'Green Park Extension, Sector 2',
    pincode: '110016',
    city: 'New Delhi',
    department: 'Water & Drainage',
    description: 'Water leakage on street',
    analyzedDescription: 'Consistent water drainage issues reported. Main pipe leak identified. Affecting 50+ households. Water wastage significant.',
    reportCount: 8,
    status: 'Pending',
    date: '2025-12-22',
    coords: { lat: 28.5494, lng: 77.2001 }
  },
  {
    id: '3',
    location: 'Rajiv Chowk Metro Station',
    pincode: '110001',
    city: 'New Delhi',
    department: 'Electricity',
    description: 'Street lights not working',
    analyzedDescription: 'Street lighting failure in public area. Multiple lamp posts non-functional. Safety concern for pedestrians during night hours.',
    reportCount: 15,
    status: 'Resolved',
    date: '2025-12-15',
    coords: { lat: 28.6328, lng: 77.2197 }
  },
  {
    id: '4',
    location: 'Saket District Hospital',
    pincode: '110017',
    city: 'New Delhi',
    department: 'Health Care',
    description: 'Long waiting times for patients',
    analyzedDescription: 'Healthcare accessibility concerns raised. Patient waiting times exceeding 3-4 hours. Staff shortage identified. Need for additional medical personnel.',
    reportCount: 6,
    status: 'In Progress',
    date: '2025-12-23',
    coords: { lat: 28.5244, lng: 77.2066 }
  },
  {
    id: '5',
    location: 'Vasant Vihar Bus Stand',
    pincode: '110057',
    city: 'New Delhi',
    department: 'Transportation',
    description: 'Irregular bus timings',
    analyzedDescription: 'Public transportation irregularities reported. Bus schedule inconsistent causing commuter inconvenience. Route optimization recommended.',
    reportCount: 9,
    status: 'Pending',
    date: '2025-12-24',
    coords: { lat: 28.5677, lng: 77.1615 }
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<AppStats>(initialStats);
  const [reports, setReports] = useState<Report[]>(initialReports);

  const clearAllData = () => {
    // Reset all stats to zero
    setStats({
      totalComplaints: 0,
      pending: 0,
      inProgress: 0,
      resolved: 0
    });
    
    // Clear all reports
    setReports([]);
  };

  const updateReportStatus = (id: string) => {
    // Find the report and update stats
    const report = reports.find(r => r.id === id);
    if (report) {
      const countToRemove = report.reportCount;
      
      // Update stats
      setStats(prev => ({
        totalComplaints: Math.max(0, prev.totalComplaints - countToRemove),
        pending: report.status === 'Pending' ? Math.max(0, prev.pending - countToRemove) : prev.pending,
        inProgress: report.status === 'In Progress' ? Math.max(0, prev.inProgress - countToRemove) : prev.inProgress,
        resolved: prev.resolved
      }));

      // Update or remove report
      setReports(reports.map(r => 
        r.id === id 
          ? { ...r, reportCount: 0, status: 'Resolved' }
          : r
      ));
    }
  };

  return (
    <AppContext.Provider value={{ stats, reports, clearAllData, updateReportStatus }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

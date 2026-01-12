import { useState } from 'react';
import { ArrowLeft, Droplets, Heart, Bus, Construction, Zap, MapPin, Upload, Languages } from 'lucide-react';
import { MockMap } from './MockMap';

interface ComplaintsPageProps {
  onBack: () => void;
}

interface Department {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

export function ComplaintsPage({ onBack }: ComplaintsPageProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    city: '',
    pincode: '',
    location: '',
    description: '',
    detectedLanguage: 'English'
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);

  const departments: Department[] = [
    { id: 'water', name: 'Water & Drainage', icon: <Droplets className="w-8 h-8" />, color: 'bg-blue-500' },
    { id: 'health', name: 'Health Care', icon: <Heart className="w-8 h-8" />, color: 'bg-red-500' },
    { id: 'transport', name: 'Transportation', icon: <Bus className="w-8 h-8" />, color: 'bg-green-500' },
    { id: 'road', name: 'Road Infrastructure', icon: <Construction className="w-8 h-8" />, color: 'bg-yellow-500' },
    { id: 'electricity', name: 'Electricity', icon: <Zap className="w-8 h-8" />, color: 'bg-purple-500' }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionChange = (text: string) => {
    setFormData({ ...formData, description: text });
    
    // Mock language detection
    const hasNonEnglishChars = /[^\x00-\x7F]/.test(text);
    if (hasNonEnglishChars) {
      setFormData(prev => ({ ...prev, detectedLanguage: 'Non-English' }));
      setShowTranslation(true);
    } else {
      setFormData(prev => ({ ...prev, detectedLanguage: 'English' }));
      setShowTranslation(false);
    }
  };

  const getMockTranslation = (text: string) => {
    // Mock translation - in production, this would call Google Translate API
    return `Translated: ${text} (This is a mock translation to English)`;
  };

  const handleSubmit = () => {
    alert('Complaint submitted successfully!');
    setSelectedDepartment(null);
    setFormData({ city: '', pincode: '', location: '', description: '', detectedLanguage: 'English' });
    setImagePreview(null);
    setShowTranslation(false);
  };

  if (selectedDepartment) {
    const dept = departments.find(d => d.id === selectedDepartment);
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button onClick={() => setSelectedDepartment(null)} className="flex items-center text-indigo-600 hover:text-indigo-700 mb-2">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Departments
            </button>
            <h1 className="text-gray-900">File Complaint - {dept?.name}</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-gray-900 mb-4">Location Details</h2>
              <MockMap />
              
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Enter city name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Pincode</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="Enter pincode"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Specific Location</label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                    <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., Near City Hospital"
                      className="flex-1 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Complaint Details Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-gray-900 mb-4">Complaint Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Upload Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-indigo-500 transition-colors">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                      ) : (
                        <div>
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">Click to upload JPG image</p>
                          <p className="text-sm text-gray-400">Maximum file size: 5MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-gray-700">Description</label>
                    <div className="flex items-center text-sm text-gray-500">
                      <Languages className="w-4 h-4 mr-1" />
                      {formData.detectedLanguage}
                    </div>
                  </div>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                    placeholder="Describe the issue in detail (any language)"
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                {showTranslation && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800 mb-2">Auto-Translated to English:</p>
                    <p className="text-gray-700">{getMockTranslation(formData.description)}</p>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!formData.city || !formData.pincode || !formData.description}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Submit Complaint
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
          <h1 className="text-gray-900">File a Complaint</h1>
          <p className="text-gray-600 mt-1">Select a department to report your issue</p>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(dept.id)}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 text-left"
            >
              <div className={`${dept.color} text-white w-16 h-16 rounded-xl flex items-center justify-center mb-4`}>
                {dept.icon}
              </div>
              <h3 className="text-gray-900 mb-2">{dept.name}</h3>
              <p className="text-gray-600 text-sm">Click to file a complaint</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

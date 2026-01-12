import { MapPin } from 'lucide-react';
import { useState } from 'react';

export function MockMap() {
  const [marker, setMarker] = useState({ x: 50, y: 50 });

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMarker({ x, y });
  };

  return (
    <div className="relative">
      <div
        onClick={handleMapClick}
        className="w-full h-64 bg-gradient-to-br from-green-100 via-blue-100 to-green-200 rounded-lg cursor-crosshair relative overflow-hidden border-2 border-gray-200"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(200,200,200,0.1) 0px, rgba(200,200,200,0.1) 20px, transparent 20px, transparent 40px),
            repeating-linear-gradient(90deg, rgba(200,200,200,0.1) 0px, rgba(200,200,200,0.1) 20px, transparent 20px, transparent 40px)
          `
        }}
      >
        {/* Mock roads */}
        <div className="absolute top-1/3 left-0 w-full h-2 bg-gray-400 opacity-50"></div>
        <div className="absolute top-2/3 left-0 w-full h-2 bg-gray-400 opacity-50"></div>
        <div className="absolute left-1/4 top-0 h-full w-2 bg-gray-400 opacity-50"></div>
        <div className="absolute left-3/4 top-0 h-full w-2 bg-gray-400 opacity-50"></div>

        {/* Marker */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-full transition-all duration-300"
          style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
        >
          <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg" fill="currentColor" />
        </div>

        {/* Map controls */}
        <div className="absolute top-2 right-2 bg-white rounded-lg shadow-md p-2 space-y-1">
          <button className="block w-8 h-8 bg-white border border-gray-300 rounded hover:bg-gray-50 text-center">+</button>
          <button className="block w-8 h-8 bg-white border border-gray-300 rounded hover:bg-gray-50 text-center">−</button>
        </div>

        {/* Map attribution */}
        <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-600">
          Click to set location
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        <MapPin className="w-4 h-4 inline mr-1" />
        Selected: {marker.x.toFixed(1)}°, {marker.y.toFixed(1)}°
      </p>
    </div>
  );
}


import React, { useState, useRef, useEffect } from 'react';
import { CultureFieldProps } from './CultureField';

interface SimpleInteractiveMapProps {
  fields: CultureFieldProps[];
  singleField?: CultureFieldProps;
  onSelectField?: (field: CultureFieldProps) => void;
}

// Obtenir une couleur basée sur le statut
const getStatusColor = (status: string) => {
  switch(status) {
    case 'planted': return '#3b82f6';  // blue
    case 'growing': return '#22c55e';  // green
    case 'ready': return '#f59e0b';    // amber
    case 'harvested': return '#6b7280'; // gray
    default: return '#6b7280';
  }
};

// Get status text in French
const getStatusText = (status: string) => {
  switch(status) {
    case 'planted': return 'Semé';
    case 'growing': return 'En croissance';
    case 'ready': return 'Prêt à récolter';
    case 'harvested': return 'Récolté';
    default: return status;
  }
};

// Generate a "position" for a field based on its name + surface to get consistency
const getFieldPosition = (field: CultureFieldProps) => {
  // Using field name and surface to generate a consistent position
  const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  };
  
  const nameHash = hashCode(field.name + field.surface.toString());
  
  // Generate a grid position
  const col = Math.abs(nameHash % 6); // 0 to 5 columns
  const row = Math.abs((nameHash >> 4) % 4); // 0 to 3 rows
  
  return { x: col, y: row };
};

const SimpleInteractiveMap: React.FC<SimpleInteractiveMapProps> = ({ fields, singleField, onSelectField }) => {
  const [selectedField, setSelectedField] = useState<CultureFieldProps | null>(singleField || null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);
  
  // For single field mode
  useEffect(() => {
    if (singleField) {
      setSelectedField(singleField);
    }
  }, [singleField]);

  // Handle zoom
  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      if (direction === 'in' && prev < 1.5) return prev + 0.1;
      if (direction === 'out' && prev > 0.6) return prev - 0.1;
      return prev;
    });
  };

  // Handle pan start
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  // Handle panning
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  // Handle pan end
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle field selection
  const handleFieldClick = (field: CultureFieldProps) => {
    setSelectedField(field);
    if (onSelectField) {
      onSelectField(field);
    }
  };

  // Reset view
  const resetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Display fields on the grid
  const fieldsToShow = singleField ? [singleField] : fields;
  
  return (
    <div className="w-full border rounded-lg overflow-hidden bg-gradient-sky relative">
      {/* Background image that resembles satellite view */}
      <div className="absolute inset-0 bg-cover bg-center"
           style={{ backgroundImage: "url('https://raw.githubusercontent.com/codrops/DistortionHoverEffect/master/img/fields.jpg')" }}>
      </div>
      
      {/* Controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button 
          onClick={() => handleZoom('in')} 
          className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-plantera-softGreen"
        >
          +
        </button>
        <button 
          onClick={() => handleZoom('out')} 
          className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-plantera-softGreen"
        >
          -
        </button>
        <button 
          onClick={resetView} 
          className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-plantera-softGreen"
        >
          ↻
        </button>
      </div>
      
      {/* Map container */}
      <div 
        ref={mapRef}
        className="relative h-[600px] overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Interactive map area with zoom and pan */}
        <div 
          className="absolute inset-0 transition-transform duration-200"
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
            transformOrigin: 'center'
          }}
        >
          {/* Fields grid container */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-4 p-8">
            {fieldsToShow.map(field => {
              const position = getFieldPosition(field);
              
              // Calculate size proportional to surface area
              const baseSize = 80;
              const scaleFactor = 0.5 + (field.surface / 100 * 0.5); // Scale between 50-100% based on surface
              const size = baseSize * scaleFactor;
              
              return (
                <div
                  key={field.id}
                  className={`absolute hover:z-10 transition-all duration-200 ${
                    selectedField?.id === field.id ? 'z-10 ring-4 ring-plantera-green/50' : ''
                  }`}
                  style={{ 
                    left: `calc(${position.x / 6 * 100}% + 10px)`, 
                    top: `calc(${position.y / 4 * 100}% + 10px)`,
                    width: `${size}px`,
                    height: `${size}px`
                  }}
                  onClick={() => handleFieldClick(field)}
                >
                  {/* Field shape */}
                  <div 
                    className="cursor-pointer bg-gradient-field bg-opacity-70 backdrop-blur-sm rounded-md shadow-lg border-2 border-white flex flex-col items-center justify-center h-full w-full hover:shadow-xl transform hover:scale-105 transition-all"
                    style={{ borderColor: getStatusColor(field.status) }}
                  >
                    <span className="text-xs font-bold text-gray-800">{field.name}</span>
                    <span className="text-[8px] text-gray-600">{field.culture}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Field info overlay - shown when a field is selected */}
      {selectedField && (
        <div className="absolute left-4 bottom-4 p-4 bg-white rounded-lg shadow-lg max-w-xs z-20 border-l-4"
             style={{ borderLeftColor: getStatusColor(selectedField.status) }}>
          <h3 className="font-bold">{selectedField.name}</h3>
          <div className="text-sm space-y-1 mt-1">
            <p><span className="font-medium">Culture:</span> {selectedField.culture}</p>
            <p><span className="font-medium">Surface:</span> {selectedField.surface} ha</p>
            <p><span className="font-medium">Statut:</span> {getStatusText(selectedField.status)}</p>
            <p><span className="font-medium">Planté le:</span> {new Date(selectedField.plantedDate).toLocaleDateString('fr-FR')}</p>
            {selectedField.estimatedHarvestDate && (
              <p><span className="font-medium">Récolte estimée:</span> {new Date(selectedField.estimatedHarvestDate).toLocaleDateString('fr-FR')}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleInteractiveMap;

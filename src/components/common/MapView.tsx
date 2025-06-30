import React from 'react';
import { Box, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix für Leaflet Icons in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icon für Windkraftanlagen
const windkraftanlageIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [20, 32],
  iconAnchor: [10, 32],
  popupAnchor: [1, -34],
  shadowSize: [32, 32],
  className: 'windkraftanlage-marker'
});

interface MarkerData {
  id: string;
  position: [number, number]; // [lat, lng]
  title: string;
  description?: string;
}

interface MapViewProps {
  projectName: string;
  coordinates?: [number, number]; // [lat, lng] - optional, wird automatisch berechnet
  height?: string;
  markers?: MarkerData[];
  zoom?: number;
  flaeche?: [number, number][]; // Liste von Koordinaten für das Polygon
  windkraftanlagen?: [number, number][]; // Liste von Koordinaten für Windkraftanlagen
}

const MapView: React.FC<MapViewProps> = ({ 
  projectName, 
  coordinates,
  height = '217px',
  markers = [],
  zoom = 12,
  flaeche = [],
  windkraftanlagen = []
}) => {
  // Berechne automatisch das Zentrum aus dem Polygon
  const calculateCenter = (polygon: [number, number][]): [number, number] => {
    if (polygon.length === 0) {
      return coordinates || [54.4, 9.0]; // Fallback
    }
    
    const latSum = polygon.reduce((sum, point) => sum + point[0], 0);
    const lngSum = polygon.reduce((sum, point) => sum + point[1], 0);
    
    return [latSum / polygon.length, lngSum / polygon.length];
  };

  const mapCenter = flaeche.length > 0 ? calculateCenter(flaeche) : (coordinates || [54.4, 9.0]);

  // Wenn keine Marker übergeben werden und kein Polygon vorhanden ist, erstelle einen Standard-Marker
  const defaultMarkers: MarkerData[] = markers.length > 0 ? markers : 
    (flaeche.length === 0 ? [
      {
        id: 'main',
        position: mapCenter,
        title: projectName,
        description: 'Windpark Standort'
      }
    ] : []);

  return (
    <Box sx={{ mb: 3, position: 'relative' }}>
      {/* Standort Label in der Umrandung */}
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          top: '-8px',
          left: '14px',
          backgroundColor: 'white',
          px: 1,
          color: 'rgba(0, 0, 0, 0.6)',
          fontSize: '0.75rem',
          zIndex: 1000,
        }}
      >
        Standort
      </Typography>
      
      <Box
        sx={{
          width: '100%',
          height: height,
          border: '1px solid rgba(0, 0, 0, 0.23)',
          borderRadius: 1,
          position: 'relative',
          overflow: 'hidden',
          '& .leaflet-container': {
            height: '100%',
            width: '100%',
            borderRadius: '4px',
          },
          '&:hover': {
            borderColor: 'rgba(0, 0, 0, 0.87)',
            transition: 'border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          },
          '&:focus-within': {
            borderColor: '#1976d2',
            borderWidth: '2px',
          }
        }}
      >
        <MapContainer
          center={mapCenter}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="topright" />
          
          {/* Standard Marker */}
          {defaultMarkers.map((marker) => (
            <Marker key={marker.id} position={marker.position}>
              <Popup>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {marker.title}
                  </Typography>
                  {marker.description && (
                    <Typography variant="body2" color="text.secondary">
                      {marker.description}
                    </Typography>
                  )}
                </Box>
              </Popup>
            </Marker>
          ))}

          {/* Windpark-Fläche als Polygon */}
          {flaeche.length > 0 && (
            <Polygon
              positions={flaeche}
              pathOptions={{
                color: '#1976d2',
                weight: 2,
                opacity: 0.8,
                fillColor: '#1976d2',
                fillOpacity: 0.2
              }}
            >
              <Popup>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {projectName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Windpark-Fläche
                  </Typography>
                </Box>
              </Popup>
            </Polygon>
          )}

          {/* Windkraftanlagen */}
          {windkraftanlagen.map((position, index) => (
            <Marker 
              key={`windkraftanlage-${index}`} 
              position={position}
              icon={windkraftanlageIcon}
            >
              <Popup>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Windkraftanlage {index + 1}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Koordinaten: {position[0].toFixed(4)}, {position[1].toFixed(4)}
                  </Typography>
                </Box>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
    </Box>
  );
};

export default MapView; 
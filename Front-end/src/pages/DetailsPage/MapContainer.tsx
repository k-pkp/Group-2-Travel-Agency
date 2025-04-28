// MyMap.tsx
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Defining the container style for the Google Map (size and border-radius)
const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '20px',
};
// Defining the interface for location prop types
interface location {
  markerPosition: { lat: number; lng: number } | null;
  onMapLoad: (map: google.maps.Map) => void;
}


const defaultCenter = { lat: 13.7896878, lng: 100.3263603 };

const MyMap: React.FC<location> = ({
  markerPosition,
  onMapLoad,
}) => {

  return (
    <LoadScript googleMapsApiKey="AIzaSyCZHdnHV_Br4R3djqHG4KlIjCnjnPsw9hU">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={14}
        onLoad={onMapLoad}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MyMap;
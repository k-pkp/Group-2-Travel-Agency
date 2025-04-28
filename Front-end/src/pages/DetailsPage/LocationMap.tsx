import React from "react";
import MapContainer from "./MapContainer";
import { useState } from "react";

// Define the interface for the props that will be passed into the LocationMap component
interface LocationMapProps {
  name: string;
  address: string;
  lat?: number;
  lng?: number;
}



// Define the LocationMap functional component
const LocationMap: React.FC<LocationMapProps> = ({ 
  address,
  lat = 13.7896878,
  lng = 100.3263603,
  name = "Faculty of Information And Communication Technology, Mahidol University",
 }) => 
  {
    const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);

    
    const onMapLoad = (map: google.maps.Map) => {
      const geocoder = new google.maps.Geocoder();
  
      geocoder.geocode({ address: name }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          const coords = { lat: location.lat(), lng: location.lng() };
          setMarkerPosition(coords);
  
         
          map.setCenter(coords);
        } else {
          geocoder.geocode({ address: address }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
              const location = results[0].geometry.location;
              const coords = { lat: location.lat(), lng: location.lng() };
              setMarkerPosition(coords);
      
              map.setCenter(coords);
            }
          });
          setMarkerPosition({ lat, lng });
          console.error('Geocode error:', status);
        }
      });
    };

    // Function to open the location in Google Maps when the button is click
    const handleClickViewMaps = () => {
      window.open(`https://www.google.com/maps/search/?api=1&query=${markerPosition?.lat},${markerPosition?.lng}`, '_blank');
    }

  return (
    <div className="w-full mt-16 max-md:max-w-full max-md:mt-10">
      <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap max-md:max-w-full">
        <h2 className="text-xl font-normal self-stretch my-auto">
          Location/Map
        </h2>
        <div className="self-stretch text-sm font-semibold w-[189px] my-auto">
          <button className="self-stretch rounded min-h-12 w-full gap-1 p-4 bg-[#8DB1D3] text-[#112211] transition duration-500 hover:bg-[#6c9bc7] hover:text-[#112211] cursor-pointer"
            onClick={handleClickViewMaps}
          >
            View on google maps
          </button>
        </div>
      </div>
      <div className="flex w-full flex-col items-stretch text-sm font-medium mt-8 max-md:max-w-full">
          <MapContainer 
            markerPosition={markerPosition}
            onMapLoad={onMapLoad}
          />
        <div className="flex gap-0.5 mt-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/78984070a83bb4fbb317bf80ce1ffb429d842d16?placeholderIfAbsent=true"
            alt="Location pin"
            className="aspect-[1] object-contain w-[18px] shrink-0"
          />
          <div className="opacity-75">{address}</div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
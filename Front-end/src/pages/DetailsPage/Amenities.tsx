import React from "react";

// Define the props interface for a single AmenityItem
interface AmenityItemProps {
  icon: string;
  name: string;
}

// Define the AmenityItem functional component
const AmenityItem: React.FC<AmenityItemProps> = ({ icon, name }) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={icon}
        alt={name}
        className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
      />
      <div className="self-stretch my-auto">{name}</div>
    </div>
  );
};

// Define the main Amenities functional component
const Amenities: React.FC = () => {
   // First column of amenities (array of amenity objects)
  const amenitiesColumn1 = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/842baaa64f9ddc12379649c1f6f53eca7a2e03a0?placeholderIfAbsent=true", name: "Outdoor pool" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/842baaa64f9ddc12379649c1f6f53eca7a2e03a0?placeholderIfAbsent=true", name: "Indoor pool" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/de82469f9c358348cf71c3a403f9afca3d01dcb8?placeholderIfAbsent=true", name: "Spa and wellness center" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/32f66bc7049bfcf41017e4d89580d95a38dcd308?placeholderIfAbsent=true", name: "Restaurant" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/dd94512fe5660d5f79417ed51985a8e4af39eaa9?placeholderIfAbsent=true", name: "Room service" },
  ];
// Second column of amenities (array of amenity objects)
  const amenitiesColumn2 = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/d8b687a687e085d10b1a307aa2350b7509311977?placeholderIfAbsent=true", name: "Fitness center" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/a7b6dcaa068fcaa9b045677d84f4546bce887e37?placeholderIfAbsent=true", name: "Bar/Lounge" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/808d41b40403bdcb0e1766644ae97622981dfa29?placeholderIfAbsent=true", name: "Free Wi-Fi" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/d239c9c2025f2ea21eebbfb6d1e62624b7cd30d2?placeholderIfAbsent=true", name: "Tea/coffee machine" },
  ];

  return (
     // Outer container for the Amenities section with top margin and responsive adjustment
    <div className="mt-16 max-md:max-w-full max-md:mt-10">
      <h2 className="text-xl font-normal">Amenities</h2>
      <div className="flex text-base font-medium flex-wrap mt-8 max-md:max-w-full">
        <div className="flex flex-col mr-16">
          {amenitiesColumn1.map((amenity, index) => (
            <div key={index} className={index > 0 ? "mt-6" : ""}>
              <AmenityItem icon={amenity.icon} name={amenity.name} />
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          {amenitiesColumn2.map((amenity, index) => (
            <div key={index} className={index > 0 ? "mt-6" : ""}>
              <AmenityItem icon={amenity.icon} name={amenity.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Amenities;
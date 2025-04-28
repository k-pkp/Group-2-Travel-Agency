import React from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

// Interface to define the expected props for the FilterSidebar component
interface FilterSidebarProps {
  priceRange: number[];
  onPriceRangeChange: (value: number[]) => void;
  rate: number;
  onRateChange: (value: number) => void;
}

// FilterSidebar component that receives filter options and handlers as props
const FilterSidebar: React.FC<FilterSidebarProps> = ({
  priceRange,
  onPriceRangeChange,
  rate,
  onRateChange,
}) => {
  // Other local state for filters (rating, freebies, amenities) remain here.
  const [priceExpanded, setPriceExpanded] = React.useState(true);
  const [ratingExpanded, setRatingExpanded] = React.useState(true);
  const [freebiesExpanded, setFreebiesExpanded] = React.useState(true);
  const [amenitiesExpanded, setAmenitiesExpanded] = React.useState(true);
  const [selectedFreebies, setSelectedFreebies] = React.useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>([]);

  const handleRatingClick = (ratingLabel: string) => {
    const newRating = parseInt(ratingLabel); // "0+", "1+", etc. (we assume the number part)
    onRateChange(newRating === rate ? 0 : newRating);
  };

  const handleFreebieToggle = (freebie: string) => {
    setSelectedFreebies((prev) =>
      prev.includes(freebie) ? prev.filter((item) => item !== freebie) : [...prev, freebie]
    );
  };

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((item) => item !== amenity) : [...prev, amenity]
    );
  };


  const freebies = [
    "Free breakfast",
    "Free parking",
    "Free internet",
    "Free airport shuttle",
    "Free cancellation",
  ];

  const amenities = [
    "24hr front desk",
    "Air-conditioned",
    "Fitness",
    "Pool",
  ];

  return (
    <div>
      <div className="text-[#121] text-xl font-semibold">Filters</div>

      {/* Price Filter */}
      <div className="w-full max-w-[343px] mt-8">
        <div className="flex w-full gap-[40px_100px] text-base text-[#121] font-semibold whitespace-nowrap justify-between">
          <div>Price</div>
          <button onClick={() => setPriceExpanded(!priceExpanded)}>
            <img
              src={
                priceExpanded
                  ? "https://cdn.builder.io/api/v1/image/assets/TEMP/82fa5c47220d3d3579581d1764525cd5ef7adf74?placeholderIfAbsent=true"
                  : "https://cdn.builder.io/api/v1/image/assets/TEMP/113dccf007fe0f9340ab2127a43e7665d6eae6c4?placeholderIfAbsent=true"
              }
              className="aspect-[1] object-contain w-6 shrink-0"
              alt={priceExpanded ? "Collapse" : "Expand"}
            />
          </button>
        </div>
        {priceExpanded && (
          <div className="w-full mt-6">
            <Slider
              defaultValue={[50, 1200]}
              min={0}
              max={1500}
              step={50}
              value={priceRange}
              onValueChange={onPriceRangeChange}  // Use the prop callback
              className="w-full"
            />
            <div className="flex justify-between text-xs text-[#121] font-medium whitespace-nowrap mt-4">
              <div>${priceRange[0]}</div>
              <div className="text-right">${priceRange[1]}</div>
            </div>
          </div>
        )}
      </div>

      {/* You can leave the rest of the filters (Rating, Freebies, Amenities) unchanged */}
      <div className="bg-[rgba(17,34,17,0.25)] flex min-h-px max-w-full w-[343px] mt-8" />
      <div className="w-full max-w-[343px] text-[#121] whitespace-nowrap mt-8">
        <div className="flex w-full gap-[40px_100px] text-base font-semibold justify-between">
          <div>Rating</div>
          <button onClick={() => setRatingExpanded(!ratingExpanded)}>
            <img
              src={
                ratingExpanded
                  ? "https://cdn.builder.io/api/v1/image/assets/TEMP/113dccf007fe0f9340ab2127a43e7665d6eae6c4?placeholderIfAbsent=true"
                  : "https://cdn.builder.io/api/v1/image/assets/TEMP/82fa5c47220d3d3579581d1764525cd5ef7adf74?placeholderIfAbsent=true"
              }
              className="aspect-[1] object-contain w-6 shrink-0"
              alt={ratingExpanded ? "Collapse" : "Expand"}
            />
          </button>
        </div>
        {ratingExpanded && (
          <div className="flex w-full gap-4 text-xs font-medium mt-4">
            {["0+", "1+", "2+", "3+", "4+"].map((ratingLabel) => (
              <div key={ratingLabel} className="w-10">
                <button
                  className={`w-full rounded border border-[#8DB1D3] min-h-8 px-3 py-[9px] ${
                    // Highlight if the current rate equals the parsed rating value.
                    rate === parseInt(ratingLabel) ? "bg-[#8DB1D3] text-white" : "text-[#121]"
                  }`}
                  onClick={() => handleRatingClick(ratingLabel)}
                >
                  {ratingLabel}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-[rgba(17,34,17,0.25)] flex min-h-0 max-w-full w-[343px] mt-8" />
      <div className="w-full text-[#121] mt-8">
        <div className="flex w-full gap-[40px_100px] text-base font-semibold whitespace-nowrap justify-between">
          <div>Freebies</div>
          <button onClick={() => setFreebiesExpanded(!freebiesExpanded)}>
            <img
              src={
                freebiesExpanded
                  ? "https://cdn.builder.io/api/v1/image/assets/TEMP/82fa5c47220d3d3579581d1764525cd5ef7adf74?placeholderIfAbsent=true"
                  : "https://cdn.builder.io/api/v1/image/assets/TEMP/113dccf007fe0f9340ab2127a43e7665d6eae6c4?placeholderIfAbsent=true"
              }
              className="aspect-[1] object-contain w-6 shrink-0"
              alt={freebiesExpanded ? "Collapse" : "Expand"}
            />
          </button>
        </div>
        {freebiesExpanded && (
          <div className="w-full text-sm font-medium mt-4">
            {freebies.map((freebie) => (
              <div
                key={freebie}
                className="flex w-full items-center gap-2 mt-2 first:mt-0"
              >
                <Checkbox
                  id={freebie.replace(/\s+/g, "-").toLowerCase()}
                  checked={selectedFreebies.includes(freebie)}
                  onCheckedChange={() => handleFreebieToggle(freebie)}
                  className="h-6 w-6 rounded-sm border-gray-400 data-[state=checked]:bg-[#8DB1D3]"
                />
                <label
                  htmlFor={freebie.replace(/\s+/g, "-").toLowerCase()}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className="self-stretch my-auto">{freebie}</div>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-[rgba(17,34,17,0.25)] flex min-h-px max-w-full w-[343px] mt-8" />
      <div className="w-full text-[#121] mt-8">
        <div className="w-full">
          <div className="flex w-full gap-[40px_100px] text-base font-semibold whitespace-nowrap justify-between">
            <div>Amenities</div>
            <button onClick={() => setAmenitiesExpanded(!amenitiesExpanded)}>
              <img
                src={
                  amenitiesExpanded
                    ? "https://cdn.builder.io/api/v1/image/assets/TEMP/113dccf007fe0f9340ab2127a43e7665d6eae6c4?placeholderIfAbsent=true"
                    : "https://cdn.builder.io/api/v1/image/assets/TEMP/82fa5c47220d3d3579581d1764525cd5ef7adf74?placeholderIfAbsent=true"
                }
                className="aspect-[1] object-contain w-6 shrink-0"
                alt={amenitiesExpanded ? "Collapse" : "Expand"}
              />
            </button>
          </div>
          {amenitiesExpanded && (
            <div className="flex w-full flex-col text-sm font-medium mt-4">
              {amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2 mt-2 first:mt-0"
                >
                  <Checkbox
                    id={amenity.replace(/\s+/g, "-").toLowerCase()}
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityToggle(amenity)}
                    className="h-6 w-6 rounded-sm border-gray-400 data-[state=checked]:bg-[#8DB1D3]"
                  />
                  <label
                    htmlFor={amenity.replace(/\s+/g, "-").toLowerCase()}
                    className="flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <div className="self-stretch my-auto">{amenity}</div>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
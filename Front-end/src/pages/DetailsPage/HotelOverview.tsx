import React from "react";

// Define the types for the props that will be passed into the component
interface HotelOverviewProps {
  description: string;
  rating: number;
  reviews: string;
}

// HotelOverview component to display the hotel description, rating, and reviews
const HotelOverview: React.FC<HotelOverviewProps> = ({
  description,
  rating,
  reviews,
}) => {
  return (
    <div className="w-full mt-16 max-md:max-w-full max-md:mt-10">
      <div className="w-full">
        <h2 className="text-xl font-normal">Overview</h2>
        <p className="text-base font-medium opacity-75 mt-4 max-md:max-w-full">
          {description}
        </p>
      </div>
      <div className="flex w-[166px] max-w-full gap-4 mt-8">
        <div className="bg-[#8DB1D3] flex min-h-[145px] w-[166px] gap-2.5 pl-4 pr-16 py-[17px] rounded-xl max-md:pr-5">
          <div>
            <div className="text-[32px] font-normal">{rating.toFixed(1)}</div>
            <div className="mt-8">
              <div className="text-base font-bold">Very good</div>
              <div className="text-sm font-medium mt-1">{reviews} reviews</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelOverview;
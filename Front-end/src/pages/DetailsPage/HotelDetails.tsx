import React from "react";
import Rating from "@/components/ui/Rating";
import { useNavigate } from "react-router-dom";

// Define the types for the props that the HotelDetails component will receive
interface HotelDetailsProps {
  id: number;
  name: string;
  address: string;
  price: number;
  rating: number;
  reviews: string;
  checkInDate: string;
  checkOutDate: string;
}

// Define the HotelDetails component
const HotelDetails: React.FC<HotelDetailsProps> = ({
  id,
  name,
  address,
  price,
  rating,
  reviews,
  checkInDate,
  checkOutDate,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Booking?id=" + id+"&checkInDate=" + checkInDate + "&checkOutDate=" + checkOutDate);
  }

  // JSX structure for rendering the hotel details
  return (
    <div className="flex gap-[40px_100px] justify-between flex-wrap mt-8 max-md:max-w-full">
      <div className="flex min-w-60 flex-col items-stretch text-[#121] max-md:max-w-full">
        <div className="flex items-center gap-4 flex-wrap max-md:max-w-full">
          <h1 className="text-2xl font-normal self-stretch my-auto">{name}</h1>
          <div className="self-stretch flex items-center gap-1 text-xs font-medium my-auto">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/ef9663e99a777e8ff665c63f6db994eb526fd1f6?placeholderIfAbsent=true"
              alt="Five stars"
              className="aspect-[5] object-contain w-20 self-stretch shrink-0 my-auto"
            />
            <div className="self-stretch my-auto">5 Star Hotel</div>
          </div>
        </div>
        <div className="flex flex-col items-stretch font-medium mt-4">
          <div className="flex gap-0.5 text-sm">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/ba0ec444df9651256f8776f62042ea567918ae2b?placeholderIfAbsent=true"
              alt="Location pin"
              className="aspect-[1] object-contain w-[18px] shrink-0"
            />
            <div className="opacity-75">{address}</div>
          </div>
          <Rating
            score={rating}
            text="Very Good"
            reviews={reviews}
            className="mt-2"
          />
        </div>
      </div>
      <div className="flex flex-col w-[150px]">
        <div className="text-[#FF8682] text-right text-2xl font-bold">
          <span className="text-[32px] leading-[39px]">${price}</span>
          <span className="text-[14px] leading-[17px]">/night</span>
        </div>
        <div className="flex max-w-full w-[150px] gap-[15px] text-sm text-[#121] font-semibold mt-4">
          <button className="rounded min-h-12 w-full gap-1 p-4 text-center bg-[#8DB1D3] text-[#112211] transition duration-500 hover:bg-[#6c9bc7] hover:text-[#112211] cursor-pointer" onClick={handleClick}>
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
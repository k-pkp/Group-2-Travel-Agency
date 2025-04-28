import React from "react";
import { useNavigate } from "react-router-dom";

// Defining the interface for RoomCard component props
interface RoomCardProps {
  id: number;
  image: string;
  name: string;
  price: number;
  checkInDate: string;
  checkOutDate: string;
}

// RoomCard component definition
const RoomCard: React.FC<RoomCardProps> = ({ id, image, name, price, checkInDate, checkOutDate }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Booking?id=" + id + '&checkInDate=' + checkInDate + '&checkOutDate=' + checkOutDate);
  }
  return (
    <>
      <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap max-md:max-w-full">
        <div className="self-stretch flex min-w-60 items-center gap-4 text-base font-medium my-auto">
          <img
            src={image}
            alt={name}
            className="aspect-[1] object-contain w-12 rounded self-stretch shrink-0 my-auto"
          />
          <div className="self-stretch my-auto">{name}</div>
        </div>
        <div className="self-stretch flex min-w-60 items-center gap-[40px_64px] font-semibold my-auto">
          <div className="text-2xl self-stretch my-auto">
            ${price}
            <span className="text-[14px] leading-[17px]">/night</span>
          </div>
          <div className="self-stretch text-sm w-[150px] my-auto">
            <button className="self-stretch rounded min-h-12 w-full gap-1 p-4 bg-[#8DB1D3] text-[#112211] transition duration-500 hover:bg-[#6c9bc7] hover:text-[#112211] cursor-pointer"
            onClick={handleClick}>
              Book now
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(17,34,17,0.25)] flex min-h-px w-full mt-4" />
    </>
  );
};

export default RoomCard;
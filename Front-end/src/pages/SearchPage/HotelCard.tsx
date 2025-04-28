// HotelCard.tsx
import React from "react";
import { useNavigate } from 'react-router-dom';
import { X, Edit } from "lucide-react";

interface HotelCardProps {
  id: number;
  image: string;
  name: string;
  address: string;
  rating: string;
  reviews: string;
  price: number;
  onDelete: (id: number) => void;
  isEditorMode: boolean;
  checkInDate: string;
  checkOutDate: string;
  onEdit: (hotel: any) => void; 
}

const HotelCard: React.FC<HotelCardProps> = ({
  id,
  image,
  name,
  address,
  rating,
  reviews,
  price,
  onDelete,
  isEditorMode,
  checkInDate,
  checkOutDate,
  onEdit, 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/details?id='+id+'&checkInDate='+checkInDate+'&checkOutDate='+checkOutDate);
  }

  let editButton = null;
  let deleteButton = null;

  if (isEditorMode) {
    editButton = (
      <button
        onClick={() => onEdit({ id, image, name, address, rating, reviews, price })} // Call onEdit with hotel data
        className="absolute right-12 top-4 bg-white rounded-full p-1 shadow-md hover:bg-blue-50 transition-colors z-10"
        aria-label="Edit hotel"
      >
        <Edit className="h-5 w-5 text-blue-500" />
      </button>
    );
// Delete button to trigger deleting the hotel
    deleteButton = (
      <button
        onClick={() => onDelete(id)}
        className="absolute right-4 top-4 bg-white rounded-full p-1 shadow-md hover:bg-red-50 transition-colors z-10"
        aria-label="Delete hotel"
      >
        <X className="h-5 w-5 text-red-500" />
      </button>
    );
  }

  return (
    <div className="shadow-[0px_4px_16px_rgba(17,34,17,0.05)] relative flex max-md:max-w-full mb-6">
      <img
        src={image}
        className="aspect-[1.01] w-[300px] self-stretch z-0 min-w-60 rounded-[12px_0px_0px_12px]"
        alt={name}
      />
      <div className="bg-[rgba(255,255,255,0.5)] absolute z-0 flex min-h-8 items-center gap-2.5 text-xs font-medium justify-center h-8 px-2 py-[9px] rounded-lg left-[220px] top-2">
        <div className="opacity-75 self-stretch my-auto">5 images</div>
      </div>
      {deleteButton}
      {editButton} {/* Render the edit button */}
      <div className="bg-white z-0 min-w-60 w-[540px] p-6 rounded-[0px_12px_12px_0px] max-md:max-w-full max-md:px-5">
        <div className="flex w-full gap-6 flex-wrap max-md:max-w-full">
          <div className="flex min-w-60 flex-col items-stretch flex-1 shrink basis-[0%]">
            <div className="text-xl font-normal">{name}</div>
            <div className="flex flex-col text-xs font-medium mt-4">
              <div className="self-stretch flex gap-0.5">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ef3f15afb40389299ffd91a5d2f3f2aabb4985b?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-4 shrink-0"
                  alt="Location icon"
                />
                <div className="opacity-75">{address}</div>
              </div>
              <div className="flex gap-8 mt-3">
                <div className="flex items-center gap-1">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ef9663e99a777e8ff665c63f6db994eb526fd1f6?placeholderIfAbsent=true"
                    className="aspect-[5] object-contain w-20 self-stretch shrink-0 my-auto"
                    alt="5 stars"
                  />
                  <div className="self-stretch my-auto">5 Star Hotel</div>
                </div>
                <div className="flex gap-1">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/22cf272e4f20b015ec8d3f2fd4d81d8efcc126e0?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-4 shrink-0"
                    alt="Amenities icon"
                  />
                  <div>
                    <span className="font-bold">20+</span> Aminities
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                <div className="self-stretch whitespace-nowrap w-10 my-auto">
                  <div className="self-stretch rounded border border-[#8DB1D3] min-h-8 w-full gap-1 px-[11px] py-[9px] border-solid">
                    {rating}
                  </div>
                </div>
                <div className="self-stretch my-auto">
                  <span className="font-bold">Very Good</span> {reviews} reviews
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch text-xs font-medium w-[102px] mr-5">
            <div className="opacity-75">starting from</div>
            <div className="text-[#FF8682] text-right text-2xl font-bold">
              {`$${price}`}
              <span className="text-sm leading-[17px]">/night</span>
            </div>
            <div className="text-right opacity-75">excl. tax</div>
          </div>
        </div>
        <div className="bg-[rgba(17,34,17,0.25)] flex min-h-px w-full mt-6 max-md:max-w-full" />
        <div className="flex max-w-full w-[492px] gap-4 text-sm font-semibold mt-6">
          <button className="min-w-60 w-full flex-1 shrink basis-[0%] max-md:max-w-full rounded min-h-12 gap-1 p-4 bg-[#8DB1D3] text-[#112211] transition duration-500 hover:bg-[#6c9bc7] hover:text-[#112211] cursor-pointer" onClick={handleClick}>
            View Place
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
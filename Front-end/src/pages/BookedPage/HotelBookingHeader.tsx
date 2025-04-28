import { ButtonIcon } from "@/components/ui/button-icon";

// Define the props that HotelBookingHeader component accepts
interface HotelBookingHeaderProps {
  hotelName?: string;
  location?: string;
  price?: string;
  locationIcon: string;
  favoriteIcon: string;
}

// Functional component definition for HotelBookingHeader
export function HotelBookingHeader({
  hotelName,
  location,
  price,
  locationIcon,
  favoriteIcon,
}: HotelBookingHeaderProps) {
  return (
    // Outer container for the header, flex layout with responsive wrapping
    <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap max-md:max-w-full">
      <div className="self-stretch flex min-w-60 flex-col items-stretch text-[#121] my-auto">
        <div className="self-stretch gap-4 text-2xl font-normal">
          {hotelName}
        </div>
        <div className="text-sm font-medium mt-4">
          <div className="flex items-center gap-1">
            <img
              src={locationIcon}
              className="aspect-[1] object-contain w-[18px] self-stretch shrink-0 my-auto"
              alt="Location"
            />
            <div className="opacity-75 self-stretch my-auto">{location}</div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col my-auto">
        <div className="text-[#FF8682] text-right text-[32px] font-bold">
          {price}
        </div>
        <div className="flex gap-[15px] mt-4">
          <div className="w-12">
            <ButtonIcon icon={favoriteIcon} />
          </div>
          <button className="text-sm text-[#121] font-semibold whitespace-nowrap w-[150px]">
            <div className="self-stretch rounded bg-[#8DB1D3] min-h-12 w-full gap-1 p-4">
              Download
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

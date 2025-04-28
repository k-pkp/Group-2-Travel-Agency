import React from "react";
import { TimeIcon, DoorIcon, ChevronForwardIcon } from "./icons";

// Defining the types for the BookingCard component's props
interface BookingCardProps {
  logoUrl: string;
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  checkOutTime: string;
  roomInfo: string;
  onDownloadTicket?: () => void;
  onViewDetails?: () => void;
}

// The BookingCard component itself

export const BookingCard: React.FC<BookingCardProps> = ({
  logoUrl,
  checkInDate,
  checkOutDate,
  checkInTime,
  checkOutTime,
  roomInfo,
  onDownloadTicket,
  onViewDetails,
}) => {
  return (
    <article className="flex items-center gap-8 shadow-[0px_4px_16px_rgba(17,34,17,0.05)] bg-white px-6 py-8 rounded-2xl max-md:flex-col max-md:p-6 max-sm:gap-4 max-sm:p-4">
      {/* Logo Section */}
      <div className="flex w-20 h-20 justify-center items-center p-2.5 rounded-lg border-[0.5px] border-solid border-[#8DB1D3]">
        <img src={logoUrl} alt="Hotel Logo" className="w-[70px] h-[70px]" />
      </div>

      {/* Information Section */}
      <div className="flex items-center gap-6 flex-1 max-md:flex-col max-md:items-start">
        {/* Dates */}
        <div className="flex items-center gap-4 max-md:w-full max-md:justify-between max-sm:flex-col max-sm:gap-3">
          <div className="flex flex-col gap-2">
            <div className="text-base text-[#112211] opacity-75">Check-In</div>
            <div className="text-xl font-bold text-[#112211]">
              {checkInDate}
            </div>
          </div>
          <div className="text-xl font-bold text-[#112211]">—</div>
          <div className="flex flex-col gap-2">
            <div className="text-base text-[#112211] opacity-75">Check Out</div>
            <div className="text-xl font-bold text-[#112211]">
              {checkOutDate}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-12 bg-[#D7E2EE]" />

        {/* Details */}
        <div className="flex gap-6 max-md:w-full max-md:flex-col">
          <div className="flex flex-col gap-2 max-sm:w-full">
            {/* Check-in time */}
            <div className="flex items-center gap-2">
              <div className="flex w-8 h-8 justify-center items-center rounded bg-[#EBF6F2]">
                <TimeIcon />
              </div>
              <div className="flex flex-col">
                <div className="text-xs font-bold text-[#112211] opacity-60">
                  Check-In time
                </div>
                <div className="text-base text-[#112211]">{checkInTime}</div>
              </div>
            </div>

            {/* Check-out time */}
            <div className="flex items-center gap-2">
              <div className="flex w-8 h-8 justify-center items-center rounded bg-[#EBF6F2]">
                <TimeIcon />
              </div>
              <div className="flex flex-col">
                <div className="text-xs font-bold text-[#112211] opacity-60">
                  Check-In out
                </div>
                <div className="text-base text-[#112211]">{checkOutTime}</div>
              </div>
            </div>
          </div>

          {/* Room info */}
          <div className="flex flex-col gap-2 max-sm:w-full">
            <div className="flex items-center gap-2">
              <div className="flex w-8 h-8 justify-center items-center rounded bg-[#EBF6F2]">
                <DoorIcon />
              </div>
              <div className="flex flex-col">
                <div className="text-xs font-bold text-[#112211] opacity-60">
                  Room no.
                </div>
                <div className="text-base text-[#112211]">{roomInfo}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 max-md:w-full max-sm:flex-col">
        <button
          className="h-12 rounded text-sm text-[#112211] cursor-pointer bg-[#8DB1D3] px-4 py-2 border-[none] max-md:flex-1 max-sm:w-full hover:bg-[#6c9bc7] hover:text-[#112211] transition duration-500"
          onClick={onDownloadTicket}
          aria-label="Download Ticket"
        >
          Download Ticket
        </button>
        <button
          className="flex h-12 justify-center items-center border rounded cursor-pointer px-4 py-2 border-solid border-[#8DB1D3] max-md:flex-1 max-sm:w-full hover:bg-[#8DB1D3] hover:text-[#112211] transition duration-500"
          onClick={onViewDetails}
          aria-label="View Details"
        >
          <ChevronForwardIcon />
        </button>
      </div>
    </article>
  );
};

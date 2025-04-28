interface BookingDatesProps {
  checkInDate: string;
  checkOutDate: string;
  arrowIcon: string;
  dotIcon: string;
  arrowDownIcon: string;
}

export function BookingDates({
  checkInDate,
  checkOutDate,
  arrowIcon,
  dotIcon,
  arrowDownIcon,
}: BookingDatesProps) {
  return (
    <div className="bg-[rgba(235,246,242,1)] flex h-full grow flex-col justify-center w-full px-6 py-[35px] max-md:px-5">
      <div className="flex flex-col items-stretch text-[#121] text-right justify-center">
        <div className="text-[32px] font-semibold">{checkInDate}</div>
        <div className="text-xs font-medium opacity-60 mt-1">Check-In</div>
      </div>
      <div className="rotate-[1.0183166411256147e-16rad] rounded flex w-9 flex-col items-center mt-4">
        <img
          src={arrowIcon}
          className="aspect-[1.39] object-contain w-full stroke-[0.5px] stroke-[#121]"
          alt="Arrow"
        />
        <img
          src={dotIcon}
          className="aspect-[1] object-contain w-full mt-2"
          alt="Dot"
        />
        <img
          src={arrowDownIcon}
          className="aspect-[1.39] object-contain w-full stroke-[0.5px] stroke-[#121] mt-2"
          alt="Arrow Down"
        />
      </div>
      <div className="flex flex-col items-stretch text-[#121] justify-center mt-4">
        <div className="text-[32px] font-semibold">{checkOutDate}</div>
        <div className="text-xs font-medium opacity-60 mt-1">Check-Out</div>
      </div>
    </div>
  );
}

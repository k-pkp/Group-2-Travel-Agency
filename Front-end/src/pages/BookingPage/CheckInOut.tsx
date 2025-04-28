interface CheckInOutProps {
  checkInDate: string;
  checkOutDate: string;
}

export function CheckInOut({ checkInDate, checkOutDate }: CheckInOutProps) {
  return (
    <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap mt-10 max-md:max-w-full">
      <div className="self-stretch flex flex-col items-stretch text-[#121] justify-center my-auto">
        <div className="gap-2 text-xl font-semibold">{checkInDate}</div>
        <div className="flex gap-2 text-sm font-medium whitespace-nowrap mt-2">
          <div className="opacity-60">Check-In</div>
        </div>
      </div>
        <img
          src="https://i.ibb.co/Gf3gCbT0/message-Image-1744496044386.jpg"
          alt="Divider"
          className="w-45 mt-6"
        />
      <div className="self-stretch flex flex-col items-stretch text-[#121] justify-center my-auto">
        <div className="gap-2 text-xl font-semibold">{checkOutDate}</div>
        <div className="flex gap-2 text-sm font-medium whitespace-nowrap mt-2">
          <div className="opacity-60">Check-Out</div>
        </div>
      </div>
    </div>
  );
}
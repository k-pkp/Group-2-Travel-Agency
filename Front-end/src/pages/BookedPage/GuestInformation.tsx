interface TimeInfoProps {
  icon: string;
  label: string;
  time: string;
}

function TimeInfo({ icon, label, time }: TimeInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={icon}
        className="aspect-[1] object-contain w-8 rounded self-stretch shrink-0 my-auto"
        alt={label}
      />
      <div className="self-stretch flex flex-col items-stretch justify-center my-auto">
        <div className="text-xs font-semibold opacity-60">{label}</div>
        <div className="text-base font-medium">{time}</div>
      </div>
    </div>
  );
}

interface GuestInformationProps {
  guestName: string;
  guestAvatar: string;
  roomDetails: string;
  checkInTimeIcon: string;
  checkInTime: string;
  checkOutTimeIcon: string;
  checkOutTime: string;
  roomNumberIcon: string;
  roomNumber: string;
  bookingReference: string;
  bookingCode: string;
  barCodeIcon: string;
}

export function GuestInformation({
  guestName,
  guestAvatar,
  roomDetails,
  checkInTimeIcon,
  checkInTime,
  checkOutTimeIcon,
  checkOutTime,
  roomNumberIcon,
  roomNumber,
  bookingReference,
  bookingCode,
  barCodeIcon,
}: GuestInformationProps) {
  return (
    <div className="bg-white flex w-full h-full flex-col justify-between overflow-hidden items-stretch mx-auto max-md:max-w-full">
      <div className="bg-[#8DB1D3] flex gap-[40px_46px] text-[#121] font-normal p-6 max-md:px-5">
        <div className="flex min-w-60 w-full items-center gap-[40px_100px] justify-between flex-wrap flex-1 shrink basis-[0%] max-md:max-w-full">
          <div className="self-stretch flex items-center gap-4 text-xl my-auto">
            <img
              src={guestAvatar}
              className="aspect-[1] object-contain w-12 self-stretch shrink-0 my-auto rounded-[50%]"
              alt="Guest Avatar"
            />
            <div className="self-stretch w-[141px] my-auto">{guestName}</div>
          </div>
          <div className="text-right text-sm w-[228px] my-auto">
            {roomDetails}
          </div>
        </div>
      </div>
      <div className="flex w-full gap-8 text-[#121] flex-wrap p-6 max-md:max-w-full max-md:px-5">
        <TimeInfo
          icon={checkInTimeIcon}
          label="Check-In time"
          time={checkInTime}
        />
        <TimeInfo
          icon={checkOutTimeIcon}
          label="Check-Out time"
          time={checkOutTime}
        />
        <TimeInfo icon={roomNumberIcon} label="Room no." time={roomNumber} />
      </div>
      <div className="flex w-[580px] max-w-full gap-5 flex-wrap justify-between p-6">
        <div className="flex flex-col items-stretch text-[#121] whitespace-nowrap justify-center">
          <div className="text-[32px] font-semibold">{bookingReference}</div>
          <div className="text-xs font-medium opacity-60 mt-1">
            {bookingCode}
          </div>
        </div>
        <div className="flex items-center justify-center p-4">
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <img
                key={index}
                src={barCodeIcon}
                className="aspect-[0.49] object-contain w-6 fill-[#121] self-stretch shrink-0 my-auto"
                alt="Bar Code"
              />
            ))}
        </div>
      </div>
    </div>
  );
}

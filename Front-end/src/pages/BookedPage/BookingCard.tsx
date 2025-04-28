import { BookingDates } from "./BookingDates";
import { GuestInformation } from "./GuestInformation";

interface BookingCardProps {
  checkInDate: string;
  checkOutDate: string;
  arrowIcon: string;
  dotIcon: string;
  arrowDownIcon: string;
  guestName?: string;
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

export function BookingCard({
  checkInDate,
  checkOutDate,
  arrowIcon,
  dotIcon,
  arrowDownIcon,
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
}: BookingCardProps) {
  return (
    <div className="bg-white border min-w-60 overflow-hidden flex-1 shrink basis-[150px] rounded-2xl border-[rgba(234,234,234,1)] border-solid max-md:max-w-full">
      <div className="flex h-full max-md:flex-col max-md:items-stretch">
        <div className="w-[29%] h-full max-md:w-full max-md:ml-0">
          <div className="h-full">
            <BookingDates
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              arrowIcon={arrowIcon}
              dotIcon={dotIcon}
              arrowDownIcon={arrowDownIcon}
            />
          </div>
        </div>
        <div className="h-full max-md:w-full max-md:ml-0">
          <div className="h-full">
            <GuestInformation
              guestName={guestName!}
              guestAvatar={guestAvatar}
              roomDetails={roomDetails}
              checkInTimeIcon={checkInTimeIcon}
              checkInTime={checkInTime}
              checkOutTimeIcon={checkOutTimeIcon}
              checkOutTime={checkOutTime}
              roomNumberIcon={roomNumberIcon}
              roomNumber={roomNumber}
              bookingReference={bookingReference}
              bookingCode={bookingCode}
              barCodeIcon={barCodeIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

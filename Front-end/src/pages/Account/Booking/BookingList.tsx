import React from "react";
import { BookingCard } from "./BookingCard";

// Define the Booking interface to describe the shape of a booking object
interface Booking {
  id: string;
  logoUrl: string;
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  checkOutTime: string;
  roomInfo: string;
}

// Define the props for the BookingList component
interface BookingListProps {
  bookings: Booking[];
  onDownloadTicket?: (bookingId: string) => void;
  onViewDetails?: (bookingId: string) => void;
}

// Define the BookingList component
export const BookingList: React.FC<BookingListProps> = ({
  bookings,
  onDownloadTicket,
  onViewDetails,
}) => {
  return (
    <section className="flex flex-col gap-4">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          logoUrl={booking.logoUrl}
          checkInDate={booking.checkInDate}
          checkOutDate={booking.checkOutDate}
          checkInTime={booking.checkInTime}
          checkOutTime={booking.checkOutTime}
          roomInfo={booking.roomInfo}
          onDownloadTicket={() => onDownloadTicket?.(booking.id)}
          onViewDetails={() => onViewDetails?.(booking.id)}
        />
      ))}
    </section>
  );
};

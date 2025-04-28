import { useState } from "react";
import { BookingHeader } from "./BookingHeader";
import { BookingList } from "./BookingList";
import { toast } from "@/components/ui/use-toast";

// Mock data representing the bookings for demonstration purposes
const mockBookings = [
  {
    id: "1",
    logoUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/a469e36d43170176e5c3e361c42bc0fa43629ce5",
    checkInDate: "Thur, Dec 8",
    checkOutDate: "Fri, Dec 9",
    checkInTime: "12:00pm",
    checkOutTime: "11:30am",
    roomInfo: "On arrival",
  },
  {
    id: "2",
    logoUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/a469e36d43170176e5c3e361c42bc0fa43629ce5",
    checkInDate: "Thur, Dec 8",
    checkOutDate: "Fri, Dec 9",
    checkInTime: "12:00pm",
    checkOutTime: "11:30am",
    roomInfo: "On arrival",
  },
  {
    id: "3",
    logoUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/a469e36d43170176e5c3e361c42bc0fa43629ce5",
    checkInDate: "Thur, Dec 8",
    checkOutDate: "Fri, Dec 9",
    checkInTime: "12:00pm",
    checkOutTime: "11:30am",
    roomInfo: "On arrival",
  },
];

const Booking = () => {
  const [clickCount, setClickCount] = useState(0);
  const [displayedBookings, setDisplayedBookings] = useState(mockBookings);

  const handleFilterClick = () => {
   
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    
    
    if (newClickCount === 1) {
      setDisplayedBookings([]);
    } 
   
    else if (newClickCount === 2) {
      setDisplayedBookings(mockBookings);
    
      setClickCount(0);
    }
  };
// Function to handle the download ticket action
  const handleDownloadTicket = (bookingId: string) => {
    
    toast({
      title: "Download Started",
      description: `Downloading ticket for booking #${bookingId}`,
    });
  };
// Function to handle the view details action
  const handleViewDetails = (bookingId: string) => {
    
    toast({
      title: "View Details",
      description: `Viewing details for booking #${bookingId}`,
    });
  };

  return (
    <div className="bg-gray-50">
      
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <main className="flex flex-col gap-4 max-w-screen-xl mx-auto my-0 p-5 font-['Montserrat']">
        <BookingHeader
          onFilterClick={handleFilterClick}
        />

        <BookingList
          bookings={displayedBookings}
          onDownloadTicket={handleDownloadTicket}
          onViewDetails={handleViewDetails}
        />
      </main>
    </div>
  );
};

export default Booking;

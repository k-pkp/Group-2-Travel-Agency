import React, { useEffect, useState } from "react";
import { HotelInfo } from "./HotelInfo";
import { CheckInOut } from "./CheckInOut";
import { PaymentOptions } from "./PaymentOptions";
import { CreditCardSection } from "./CreditCardSection";
import { OrderSummary } from "./OrderSummary";
import { useLocation, useNavigate } from "react-router-dom";
import jsdate from "dayjs";

// Define TypeScript interfaces for Hotel, API responses, and component props
interface Hotel {
  id: number;
  image: string;
  name: string;
  address: string;
  rating: number;
  reviews: string;
  price: number;
  city: string;
  country: string;
}

interface HotelApiResponse {
  HotelID: number;
  Image?: string;
  name: string;
  city: string;
  address: string;
  price: string;
  rating: number | string;
  reviews: string;
  country: string;
}
interface ImageApiResponse {
  image_id: number;
  url1: string;
  url2?: string;
  url3?: string;
  url4?: string;
  url5?: string;
  HotelID: number;
}

interface BookingCardProps {
  userId: number;
  checkInDate: string;
  checkOutDate: string;
}

// Define the BookingCard component
export function BookingCard({userId, checkInDate, checkOutDate}: BookingCardProps) {
  const [paymentOption, setPaymentOption] = React.useState<"full" | "card">(
    "full",
  );

  const handlePaymentOptionChange = (option: "full" | "card") => {
    setPaymentOption(option);
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hotelIdParam = queryParams.get("id"); // Expecting, for example, "1"

  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const checkIn = jsdate(checkInDate).format("dddd, MMM D");
  const checkOut = jsdate(checkOutDate).format("dddd, MMM D");


  // Fetch hotel and image data when component mounts or hotelIdParam changes
  useEffect(() => {

    Promise.all([
      fetch("http://localhost:8081/hotel").then((res) => res.json()),
      fetch("http://localhost:8081/image").then((res) => res.json())
    ])
      .then(([hotelsJson, imagesJson]) => {
        const mappedHotels: Hotel[] = hotelsJson.map((item: HotelApiResponse) => {
          // Find matching image object using HotelID.
          const imageData: ImageApiResponse | undefined = imagesJson.find(
            (img: ImageApiResponse) => img.HotelID === item.HotelID
          );
          return {
            id: item.HotelID,
            image: imageData ? imageData.url1 : "https://placehold.co/300",
            name: item.name,
            address: `${item.address}, ${item.city}`,
            // Ensure rating is a number. If it's not, convert it.
            rating:
              typeof item.rating === "number"
                ? item.rating
                : Number(item.rating),
            reviews: item.reviews,
            price: parseInt(item.price, 10),
            city: item.city,
            country: item.country,
          };
        });
        // Filter down to the hotel whose id matches the query parameter.
        const hotelMatch = hotelIdParam
          ? mappedHotels.find((hotel) => hotel.id === Number(hotelIdParam))
          : null;
        setSelectedHotel(hotelMatch || null);
      })
      .catch((error) => console.error("Error fetching hotels and images:", error));
  }, [hotelIdParam]);

   // Calculate base price, taxes, and total price
  let price = selectedHotel ? selectedHotel.price : 0
  let tax = price * (7 / 100);
  let totalPrice = price + tax + 5;
    // Define price breakdown for the order summary
  const priceDetails = [
    { label: "Base Fare", amount: `$${selectedHotel ? selectedHotel.price : 0}` },
    { label: "Discount", amount: "$0" },
    { label: "Taxes", amount: "$"+tax.toFixed(2) },
    { label: "Service Fee", amount: "$5" },
  ];

  const Navigate = useNavigate();
  const handleContinue = () => {
    Navigate("/Booked?id=" + selectedHotel?.id + '&checkInDate=' + checkInDate + '&checkOutDate=' + checkOutDate);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-10 flex-wrap">
        <div className="min-w-60 w-[790px] max-md:max-w-full">
          <div className="shadow-[0px_4px_16px_0px_rgba(17,34,17,0.05)] bg-white w-full px-6 py-8 rounded-xl max-md:max-w-full max-md:px-5">
            <HotelInfo
              hotelName={selectedHotel ? selectedHotel.name : "Hotel Name Not Available"}
              hotelAddress={selectedHotel ? selectedHotel.address : "Hotel Address Not Available"}
              hotelImage={selectedHotel ? selectedHotel.image : "https://placehold.co/300"}
              roomType="Superior room - 1 double bed or 2 twin beds"
              pricePerNight={selectedHotel ? selectedHotel.price : 0}
            />
            <CheckInOut
              checkInDate={checkIn}
              checkOutDate={checkOut}
            />
          </div>
          <PaymentOptions
            selectedOption={paymentOption}
            onOptionChange={handlePaymentOptionChange}
          />
          <CreditCardSection
            selectedOption={paymentOption}
            onOptionChange={handlePaymentOptionChange}
            userId={userId}
          />
        </div>
        <OrderSummary
          hotelName={selectedHotel ? selectedHotel.name : "Hotel Name Not Available"}
          roomType="Superior room - 1 double bed or 2 twin beds"
          rating={selectedHotel ? selectedHotel.rating.toString() : "N/A"}
          reviews={selectedHotel ? selectedHotel.reviews : "N/A"}
          hotelImage={selectedHotel ? selectedHotel.image : "https://placehold.co/300"}
          priceDetails={priceDetails}
          totalAmount={"$"+totalPrice.toFixed(2)}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
}
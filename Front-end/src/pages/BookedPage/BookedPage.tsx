import React, { useEffect, useState } from "react";
import Header from "../Header";
import { BookingCard } from "./BookingCard";
import Footer from "../Footer";
import { Link, useLocation } from "react-router-dom";
import { HotelBookingHeader } from "./HotelBookingHeader";
import { Logo } from "./Logo";
import { TermsAndConditions } from "./TermsAndConditions";
import Logo_transparent from "@/assets/logo/Logo_transparent.png";
import jsdate from "dayjs";

// Interface for hotel information
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

// Interface for hotel API response
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

// Interface for image API response
interface ImageApiResponse {
  image_id: number;
  url1: string;
  url2?: string;
  url3?: string;
  url4?: string;
  url5?: string;
  HotelID: number;
}

// Interface for user data
interface User {
  UserID: number;
  Name: string;
  UserType: string;
  email: string;
  PasswordHash: string;
  PhoneNumber: string;
  DateOfBirth: string;
  Address: string;
}

// Main component for booked page
const BookedPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hotelIdParam = queryParams.get("id");
  const checkInDateParam = queryParams.get("checkInDate");
  const checkOutDateParam = queryParams.get("checkOutDate");


  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
     // Fetch hotels and their images concurrently
    Promise.all([
      fetch("http://localhost:8081/hotel").then((res) => res.json()),
      fetch("http://localhost:8081/image").then((res) => res.json())
    ])
      .then(([hotelsJson, imagesJson]) => {
        const mappedHotels: Hotel[] = hotelsJson.map((item: HotelApiResponse) => {
          
          const imageData: ImageApiResponse | undefined = imagesJson.find(
            (img: ImageApiResponse) => img.HotelID === item.HotelID
          );
          return {
            id: item.HotelID,
            image: imageData ? imageData.url1 : "https://placehold.co/300",
            name: item.name,
            address: `${item.address}, ${item.city}`,
            
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
   // Fetch user data from localStorage and API
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId'); // Get it again right before the fetch
    console.log('useEffect (fetch /user) - userId to send:', storedUserId);
    if (storedUserId) {
      fetch("http://localhost:8081/user", {
        method: 'GET',
        headers: {
          'user-id': storedUserId,
        },
      })

        .then((res) => res.json())
        .then(data => {
          console.log('Fetched User Data:', JSON.stringify(data, null, 2)); // You already have this

          
          if (data && data.length > 0) {
            const user = data[0];
            console.log('Received User Object:', user);
            console.log('Received User Type:', user.UserType);

            
            setUserData(user); 

            console.log('Received User Email:', user.email);
            
          } else {
            console.log('No user data received or data array is empty.');
            
          }
        })
        .catch((error) => console.error("Error fetching users:", error));
    } else {
      console.log('useEffect (fetch /user) - No userId found, skipping fetch.');
    }
  }, []);

  const checkIn = jsdate(checkInDateParam).format("ddd, MMM D");
  const checkOut = jsdate(checkOutDateParam).format("ddd, MMM D");


  return (
    <div className="bg-[rgba(250,251,252,1)] flex flex-col overflow-hidden items-stretch">
      <Header />
      <main className="self-center flex w-full max-w-[1232px] flex-col items-stretch mt-12 max-md:max-w-full max-md:mt-10">
        <div className="flex gap-2 text-sm text-[#FF8682] font-medium">
          <Link to={`../search?destination=${selectedHotel?.country}`} className="hover:underline">
            {selectedHotel?.country}
          </Link>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/63b09d35434d948060476a9a28c1f7fcec11de2a?placeholderIfAbsent=true"
            alt="Breadcrumb separator"
            className="aspect-[1] object-contain w-4 shrink-0"
          />
          <Link to={`../search?destination=${selectedHotel?.city}`} className="hover:underline">
            {selectedHotel?.city}
          </Link>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/63b09d35434d948060476a9a28c1f7fcec11de2a?placeholderIfAbsent=true"
            alt="Breadcrumb separator"
            className="aspect-[1] object-contain w-4 shrink-0"
          />
          <div className="text-[#121] opacity-75">{selectedHotel?.name}</div>
        </div>

        <div className="flex flex-col items-stretch text-[#121] my-16 max-md:max-w-full max-md:mt-10">
        <div className="container mx-auto px-4 py-8">
      <HotelBookingHeader
        hotelName={selectedHotel?.name}
        location={selectedHotel?.address}
        price={`$${(selectedHotel?.price ?? 0) + (selectedHotel?.price ?? 0)*0.07 + 5}`}
        locationIcon="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/78984070a83bb4fbb317bf80ce1ffb429d842d16?placeholderIfAbsent=true"
        favoriteIcon="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/b184959206a10cdea447f5d0e45e473e424c39bb?placeholderIfAbsent=true"
      />

      <div className="w-full mt-10 max-md:max-w-full">
        <div className="flex w-full max-w-[1231px] items-stretch flex-wrap max-md:max-w-full">
          <BookingCard
            checkInDate={checkIn}
            checkOutDate={checkOut}
            arrowIcon="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/c0956a3afa844909666fdaa9aa225c4a609b2d05?placeholderIfAbsent=true"
            dotIcon="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/0cbebfff05bfbbfc5128edcf7ccc57f5201a6bf7?placeholderIfAbsent=true"
            arrowDownIcon="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/6c941a212ffeba682bf19b474a1f8e77a9787fe9?placeholderIfAbsent=true"
            guestName={userData?.Name}
            guestAvatar="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/19d5810e543393196e5a4bc1adffb6bcc7f3c669?placeholderIfAbsent=true"
            roomDetails="Superior room - 1 double bed or 2 twin beds"
            checkInTimeIcon="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/f7232e6c60680062221a2a4890430506095284ce?placeholderIfAbsent=true"
            checkInTime="12:00pm"
            checkOutTimeIcon="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/f7232e6c60680062221a2a4890430506095284ce?placeholderIfAbsent=true"
            checkOutTime="11:30pm"
            roomNumberIcon="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/11c14716a439af1af36cab0204fd5f37fe300604?placeholderIfAbsent=true"
            roomNumber="On arival"
            bookingReference="EK"
            bookingCode="ABC12345"
            barCodeIcon="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/056ac1ad391253318f0a654e65b42c76050d0f23?placeholderIfAbsent=true"
          />

          <Logo Logo={Logo_transparent} />
        </div>

        <TermsAndConditions />
      </div>
    </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookedPage;
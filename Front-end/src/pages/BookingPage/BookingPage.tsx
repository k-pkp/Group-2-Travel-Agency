import React, { useEffect, useState } from "react";
import Header from "../Header";
import { BookingCard } from "./BookingCard";
import Footer from "../Footer";
import { Link, useLocation } from "react-router-dom";

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

const BookingPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hotelIdParam = queryParams.get("id"); 
  const checkInDateParam = queryParams.get("checkInDate");
  const checkOutDateParam = queryParams.get("checkOutDate");

  
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [userId, setUserId] = useState<any[]>([]);

  useEffect(() => {
    
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
        
        const hotelMatch = hotelIdParam
          ? mappedHotels.find((hotel) => hotel.id === Number(hotelIdParam))
          : null;
        setSelectedHotel(hotelMatch || null);
      })
      .catch((error) => console.error("Error fetching hotels and images:", error));
  }, [hotelIdParam]);

  useEffect(() => {
    const storedId: any = localStorage.getItem('userId');
    console.log('useEffect (initial) - storedUserId from localStorage:', storedId);
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  if (!selectedHotel) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading hotel details...</p>
      </div>
    );
  }


  return (
    <div className="bg-[rgba(250,251,252,1)] flex flex-col overflow-hidden items-stretch">
      <Header />
      <main className="self-center flex w-full max-w-[1232px] flex-col items-stretch mt-12 max-md:max-w-full max-md:mt-10">
        <div className="flex gap-2 text-sm text-[#FF8682] font-medium">
          <Link to={`../search?destination=${selectedHotel.country}`} className="hover:underline">
            {selectedHotel.country}
          </Link>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/63b09d35434d948060476a9a28c1f7fcec11de2a?placeholderIfAbsent=true"
            alt="Breadcrumb separator"
            className="aspect-[1] object-contain w-4 shrink-0"
          />
          <Link to={`../search?destination=${selectedHotel.city}`} className="hover:underline">
            {selectedHotel.city}
          </Link>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/8671db91b3d64fe09e949cebc9364f9c/63b09d35434d948060476a9a28c1f7fcec11de2a?placeholderIfAbsent=true"
            alt="Breadcrumb separator"
            className="aspect-[1] object-contain w-4 shrink-0"
          />
          <div className="text-[#121] opacity-75">{selectedHotel.name}</div>
        </div>

        <div className="flex flex-col items-stretch text-[#121] my-16 max-md:max-w-full max-md:mt-10">
            <BookingCard userId={Number(userId)} checkInDate={checkInDateParam || ''} checkOutDate={checkOutDateParam || ''}/>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;
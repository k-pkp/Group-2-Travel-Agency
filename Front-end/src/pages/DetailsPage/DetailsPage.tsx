import React, { useEffect, useState } from "react";
import Header from "../Header";
import HotelDetails from "./HotelDetails";
import HotelGallery from "./HotelGallery";
import HotelOverview from "./HotelOverview";
import AvailableRooms from "./AvailableRooms";
import LocationMap from "./LocationMap";
import Amenities from "./Amenities";
import Footer from "../Footer";
import { Link, useLocation } from "react-router-dom";

// Define the structure of the Hotel object
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

// Define the structure for the API response for hotels
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

// Define the structure for the API response for images
const DetailsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hotelIdParam = queryParams.get("id"); // Expecting, for example, "1"
  const checkIn = queryParams.get("checkInDate");
  const checkOut = queryParams.get("checkOutDate");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

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
        const hotelMatch = hotelIdParam
          ? mappedHotels.find((hotel) => hotel.id === Number(hotelIdParam))
          : null;
        setSelectedHotel(hotelMatch || null);
      })
      .catch((error) => console.error("Error fetching hotels and images:", error));
  }, [hotelIdParam]);

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

        <HotelDetails
          id={selectedHotel.id}
          name={selectedHotel.name}
          address={selectedHotel.address}
          price={selectedHotel.price}
          rating={selectedHotel.rating}
          reviews={selectedHotel.reviews}
          checkInDate={checkIn || ""}
          checkOutDate={checkOut || ""} // Pass the check-out date as well
        />

        <HotelGallery />

        <div className="flex flex-col items-stretch text-[#121] mt-16 max-md:max-w-full max-md:mt-10">
          <div className="bg-[rgba(17,34,17,0.25)] flex min-h-px w-full" />

          <HotelOverview
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            rating={selectedHotel.rating}
            reviews={selectedHotel.reviews}
          />

          <div className="bg-[rgba(17,34,17,0.25)] flex min-h-px w-full mt-16 max-md:mt-10" />

          <AvailableRooms
          id={selectedHotel.id}
          image={selectedHotel.image}
          name={selectedHotel.name}
          price={selectedHotel.price}
          checkInDate={checkIn || ""}
          checkOutDate={checkOut || ""} // Pass the check-out date as well
          />

          <LocationMap name={selectedHotel.name} address={selectedHotel.address} />

          <div className="bg-[rgba(17,34,17,0.25)] flex min-h-px w-full mt-16 max-md:mt-10" />

          <Amenities />

          <div className="bg-[rgba(17,34,17,0.25)] flex min-h-px w-full mt-16 max-md:mt-10" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DetailsPage;
import React, { useState, useEffect } from "react";
import Header from "../Header";
import SearchForm from "./SearchForm";
import FilterSidebar from "./FilterSidebar";
import HotelCard from "./HotelCard";
import Footer from "../Footer";
import AccommodationTabs from "./AccommodationTabs";
import { useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Hotel {
  id: number;
  image?: string;
  name: string;
  address: string;
  rating: string;
  reviews: string;
  country: string;
  price: number; 
  freebies: string[];
  amenities: string[];
  city: string;
  room: number;
  isAvailable: boolean;
}

interface HotelApiResponse {
  HotelID: number;
  Image?: string;
  name: string;
  city: string;
  country: string;
  address: string;
  price: number;
  rating: number;
  reviews: string;
  freebies?: string[];
  amenities?: string[];
  room: number;
  isAvailable: boolean;
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

interface EditButtonProps {
  isAdmin: boolean;
  isEditorMode: boolean;
  onToggleEditorMode: () => void;
}

interface Booking {
  BookingID: number;
  UserID: number;
  HotelID: number;
  StartDate: string;
  EndDate: string;
  NumberOfRoom: number;
  TotalPrice: string;
  Status: string;
}

const HotelListing: React.FC = () => {
  console.log("HotelListing component RE-MOUNTED"); 
  
  const [isAdmin, setIsAdmin] = useState(false);
 
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  
  const [priceRange, setPriceRange] = useState([50, 1200]);
  const [filterRate, setFilterRate] = useState(0);

  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const destination = queryParams.get("destination");
  const checkIn = queryParams.get("checkIn");
  const checkOut = queryParams.get("checkOut");
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hotelsResponse, imagesResponse] = await Promise.all([
          fetch("http://localhost:8081/hotel"),
          fetch("http://localhost:8081/image"),
        ]);

        if (!hotelsResponse.ok) {
          throw new Error(
            `HTTP error! status: ${hotelsResponse.status} - ${hotelsResponse.url}`
          );
        }
        if (!imagesResponse.ok) {
          throw new Error(
            `HTTP error! status: ${imagesResponse.status} - ${imagesResponse.url}`
          );
        }

        const hotelsJson: HotelApiResponse[] = await hotelsResponse.json();
        const imagesJson: ImageApiResponse[] = await imagesResponse.json();

        const mappedHotels = hotelsJson.map((hotel) => {
          const imageData = imagesJson.find(
            (img) => img.HotelID === hotel.HotelID
          );
          return {
            id: hotel.HotelID,
            image: imageData ? imageData.url1 : "https://placehold.co/300",
            name: hotel.name,
            address: `${hotel.address}, ${hotel.city}`,
            city: hotel.city,
            country: hotel.country,
            rating: hotel.rating !== null ? hotel.rating.toString() : "N/A",
            reviews: hotel.reviews || "N/A",
            price: hotel.price,
            freebies: hotel.freebies || [],
            amenities: hotel.amenities || [],
            room: hotel.room,
            isAvailable: hotel.isAvailable,
          };
        });
        setHotels(mappedHotels);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log("hotels", hotels);
  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    console.log(
      "useEffect (initial) - storedUserId from localStorage:",
      storedId
    );
  }, []);
 
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId"); 
    console.log("useEffect (fetch /user) - userId to send:", storedUserId);
    if (storedUserId) {
      fetch("http://localhost:8081/user", {
        method: "GET",
        headers: {
          "user-id": storedUserId,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched User Data:", JSON.stringify(data, null, 2)); 

          
          if (data && data.length > 0) {
            const user = data[0];
            console.log("Received User Object:", user);
            console.log("Received User Type:", user.UserType);

        
            setIsAdmin(user.UserType?.trim() === "Admin");

            
            
            console.log("Received User Email:", user.email);
            
          } else {
            console.log("No user data received or data array is empty.");
           
          }
        })
        .catch((error) => console.error("Error fetching users:", error));
    } else {
      console.log("useEffect (fetch /user) - No userId found, skipping fetch.");
    }
  }, []);

 
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newHotel, setNewHotel] = useState({
    name: "",
    address: "",
    city: "",
    country: "", 
    rating: "",
    reviews: "",
    price: "", 
    room: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
  });

  const handleToggleEditorMode = () => {
    setIsEditorMode((prev) => !prev);
  };
  const handleDelete = async (id: number) => {
    if (!isAdmin || !isEditorMode) {
      toast.error("You do not have permission to delete hotels.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/hotel/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setHotels(hotels.filter((hotel) => hotel.id !== id));
        toast.success("Hotel deleted successfully");
      } else {
        const errorData = await response.json();
        toast.error(
          `Error deleting hotel: ${errorData.message || response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error deleting hotel:", error);
      toast.error("Failed to delete hotel. Please try again.");
    }
  };

  const handleAddHotel = async () => {
    if (!isAdmin || !isEditorMode) {
      toast.error("You do not have permission to add hotels.");
      return;
    }

    
    if (
      !newHotel.name ||
      !newHotel.address ||
      !newHotel.country ||
      !newHotel.image1
    ) {
      toast.error(
        "Please fill in all required fields (Name, Address, Country, Image URL 1)"
      );
      return;
    }

    try {
      const price = parseFloat(
        newHotel.price.startsWith("$")
          ? newHotel.price.substring(1)
          : newHotel.price
      );

      const response = await fetch("http://localhost:8081/hotel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newHotel.name,
          address: newHotel.address,
          city: newHotel.city, 
          country: newHotel.country, 
          rating: parseFloat(newHotel.rating || "0.0"),
          reviews: newHotel.reviews || "0",
          price: price,
          url1: newHotel.image1,
          url2: newHotel.image2,
          url3: newHotel.image3,
          url4: newHotel.image4,
          url5: newHotel.image5,
          freebies: [],
          amenities: [],
        }),
      });

      if (response.ok) {
        const newHotelData: HotelApiResponse = await response.json();
        setHotels([
          ...hotels,
          {
            id: newHotelData.HotelID,
            image:
              newHotelData.Image ||
              newHotel.image1 ||
              "https://placehold.co/300",
            name: newHotelData.name,
            address: newHotelData.address,
            city: newHotelData.city,
            country: newHotelData.country,
            rating:
              newHotelData.rating !== null
                ? newHotelData.rating.toString()
                : "N/A",
            reviews: newHotelData.reviews || "N/A",
            price: newHotelData.price,
            freebies: newHotelData.freebies || [],
            amenities: newHotelData.amenities || [],
            room: newHotelData.room,
            isAvailable: newHotelData.isAvailable,
          },
        ]);
        setNewHotel({
          name: "",
          address: "",
          country: "",
          rating: "",
          reviews: "",
          price: "",
          room: "",
          image1: "",
          image2: "",
          image3: "",
          image4: "",
          image5: "",
          city: "", 
        });
        setShowAddDialog(false);
        toast.success("Hotel added successfully");
      } else {
        const errorData = await response.json();
        toast.error(
          `Error adding hotel: ${errorData.message || response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error adding hotel:", error);
      toast.error("Failed to add hotel. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewHotel({
      ...newHotel,
      [name]: value,
    });
  };

  const EditButtonComponent: React.FC<EditButtonProps> = ({
    isAdmin,
    isEditorMode,
    onToggleEditorMode,
  }) => {
    return (
      isAdmin && (
        <button onClick={onToggleEditorMode} className="cursor-pointer ">
          {isEditorMode ? "Disable Edit" : "Enable Edit"}
        </button>
      )
    );
  };

  const [bookings, setBookings] = useState<Booking[]>([]);

  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:8081/booking");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const bookingsData: Booking[] = await response.json();
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  
  const isHotelAvailable = (
    hotelId: number,
    checkInStr: string,
    checkOutStr: string
  ): boolean => {
    const checkInDate = new Date(checkInStr);
    const checkOutDate = new Date(checkOutStr);

    
    const hotelBookings = bookings.filter(
      (booking) => booking.HotelID === hotelId && booking.Status === "Confirmed"
    );

    
    for (let booking of hotelBookings) {
      const bookingStart = new Date(booking.StartDate);
      const bookingEnd = new Date(booking.EndDate);

      
      if (checkInDate < bookingEnd && bookingStart < checkOutDate) {
        return false; 
      }
    }
    return true; 
  };

// Filters the hotels based on destination, price range, rating, and availability.
  const filteredHotels = hotels.filter((hotel) => {
    const matchesDestination = destination
      ? hotel.address.toLowerCase().includes(destination.toLowerCase()) ||
        hotel.country.toLowerCase().includes(destination.toLowerCase()) ||
        hotel.name.toLowerCase().includes(destination.toLowerCase())
      : true;
    const matchesPrice =
      hotel.price >= priceRange[0] && hotel.price <= priceRange[1];

    
    const hotelRating = hotel.rating !== "N/A" ? parseFloat(hotel.rating) : 0;
    const matchesRating = filterRate === 0 || hotelRating >= filterRate;
    if (checkIn && checkOut) {
      return (
        matchesDestination &&
        matchesPrice &&
        isHotelAvailable(hotel.id, checkIn, checkOut) &&
        matchesRating
      );
    } else {
      return matchesDestination && matchesPrice && matchesRating;
    }
  });
  const [editHotelData, setEditHotelData] = useState<Partial<Hotel>>({});
  const [editingHotelId, setEditingHotelId] = useState<number | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
 
  console.log("Filtered Hotels (available for booking):", filteredHotels);
  const openEditDialog = (hotel: Hotel) => {
    setEditingHotelId(hotel.id);
    setEditHotelData({ ...hotel });
    setShowEditDialog(true);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const { name, value } = e.target;
    setEditHotelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleUpdateHotel = async () => {
    if (!isAdmin || !isEditorMode || editingHotelId === null) {
      toast.error("You do not have permission to edit hotels or no hotel selected.");
      return;
    }

    try {
     
      const price = parseFloat(String(editHotelData.price));

      const response = await fetch(`http://localhost:8081/hotel/${editingHotelId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editHotelData.name,
          address: editHotelData.address,
          city: editHotelData.city,
          country: editHotelData.country,
          rating: parseFloat(String(editHotelData.rating || "0.0")),
          reviews: editHotelData.reviews || "0",
          price: price,
          room: parseInt(String(editHotelData.room || 0)),
          isAvailable: editHotelData.isAvailable,
          freebies: editHotelData.freebies || [],
          amenities: editHotelData.amenities || [], 
        }),
      });

      if (response.ok) {
        const updatedHotelData: HotelApiResponse = await response.json();

       
        setHotels(hotels.map(hotel =>
          hotel.id === updatedHotelData.HotelID
            ? {
              ...hotel,
              name: updatedHotelData.name,
              address: `${updatedHotelData.address}, ${updatedHotelData.city}`,
              city: updatedHotelData.city,
              country: updatedHotelData.country,
              rating: updatedHotelData.rating !== null ? updatedHotelData.rating.toString() : "N/A",
              reviews: updatedHotelData.reviews || "N/A",
              price: updatedHotelData.price,
              room: updatedHotelData.room,
              isAvailable: updatedHotelData.isAvailable,
              freebies: updatedHotelData.freebies || [],
              amenities: updatedHotelData.amenities || [],
            }
            : hotel
        ));

        setShowEditDialog(false);
        setEditingHotelId(null);
        setEditHotelData({});
        toast.success("Hotel updated successfully");
      } else {
        const errorData = await response.json();
        toast.error(`Error updating hotel: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating hotel:", error);
      toast.error("Failed to update hotel. Please try again.");
    }
  };
  return (
    <>
      <Header />
      <div className="bg-[rgba(250,251,252,1)]">
        <div className="flex mt-[-30px] w-full flex-col items-center pl-20 max-md:max-w-full max-md:pl-5">
          <div className="bg-[rgba(250,251,252,1)] self-stretch flex w-full shrink-0 h-[110px]" />
          <SearchForm />
          <div className="flex w-full max-w-[1232px] gap-5 flex-wrap justify-between mt-[25px] max-md:max-w-full">
            <div>
              <FilterSidebar
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                rate={filterRate}
                onRateChange={setFilterRate}
              />
            </div>
            <div className="bg-[rgba(17,34,17,0.25)] flex w-px shrink-0 my-[30px]" />
            <div className="flex flex-col max-md:max-w-full">
              <AccommodationTabs hotel={filteredHotels.length} />
              <div className="flex justify-between gap-1 text-sm font-semibold flex-wrap mt-8 max-md:max-w-full">
                <div className="text-[#112211]">
                  Showing {filteredHotels.length} of{" "}
                  <span className="text-[rgba(255,134,130,1)]">
                    {filteredHotels.length} places
                  </span>
                </div>
                <EditButtonComponent
                  isAdmin={isAdmin}
                  isEditorMode={isEditorMode}
                  onToggleEditorMode={handleToggleEditorMode}
                />
                {isEditorMode && (
                  <Button
                    onClick={() => setShowAddDialog(true)}
                    className="flex items-center gap-2 bg-[#8DB1D3] text-[#112211] transition duration-500 hover:bg-[#6c9bc7] hover:text-[#112211] cursor-pointer px-4 py-2 rounded-md"
                  >
                    <Plus className="h-4 w-4" />
                    Add Hotel
                  </Button>
                )}
                <div className="fl gap-4 items-center">
                  

                  <div className="flex gap-1 text-[#121] text-right">
                    <div>
                      <span className="font-normal">Sort by</span> Recommended
                    </div>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/f6c30c9671369bc7a4d4d5c10b0e7c0ff63efa0e?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-[18px] shrink-0"
                      alt="Sort icon"
                    />
                  </div>
                </div>
              </div>
              <div className="text-[#121] mt-8 max-md:max-w-full">
                {filteredHotels
                  .slice() 
                  .sort((a, b) => a.price - b.price) 
                  .map((hotel) => (
                    <HotelCard
                      key={hotel.id}
                      id={hotel.id}
                      image={hotel.image || "https://placehold.co/300"}
                      name={hotel.name}
                      address={hotel.address}
                      rating={hotel.rating}
                      reviews={hotel.reviews}
                      price={hotel.price}
                      isEditorMode={isEditorMode}
                      onDelete={() => handleDelete(hotel.id)}
                      checkInDate={checkIn || ""}
                      checkOutDate={checkOut || ""}
                      onEdit={openEditDialog}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl">Add New Hotel</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Hotel Name*</Label>
                <Input
                  id="name"
                  name="name"
                  value={newHotel.name}
                  onChange={handleInputChange}
                  placeholder="Enter hotel name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address*</Label>
                <Input
                  id="address"
                  name="address"
                  value={newHotel.address}
                  onChange={handleInputChange}
                  placeholder="Enter hotel address"
                  required
                />
              </div>
              {/* Add City Input */}
              <div className="grid gap-2">
                <Label htmlFor="city">City*</Label>
                <Input
                  id="city"
                  name="city"
                  value={newHotel.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  required
                />
              </div>
              {/* Add Country Input */}
              <div className="grid gap-2">
                <Label htmlFor="country">Country*</Label>
                <Input
                  id="country"
                  name="country"
                  value={newHotel.country}
                  onChange={handleInputChange}
                  placeholder="Enter country"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    name="rating"
                    value={newHotel.rating}
                    onChange={handleInputChange}
                    placeholder="e.g. 4.5"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reviews">Reviews</Label>
                  <Input
                    id="reviews"
                    name="reviews"
                    value={newHotel.reviews}
                    onChange={handleInputChange}
                    placeholder="e.g. 120"
                    type="number"
                    min="0"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price per night</Label>
                <Input
                  id="price"
                  name="price"
                  value={newHotel.price}
                  onChange={handleInputChange}
                  placeholder="e.g. 120 or $120"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Number of Room</Label>
                <Input
                  id="room"
                  name="room"
                  value={newHotel.room}
                  onChange={handleInputChange}
                  placeholder="Enter room number"
                />
              </div>
              {/* Add Image URL Inputs */}
              <div className="grid gap-2">
                <Label htmlFor="image1">Image URL 1*</Label>
                <Input
                  id="image1"
                  name="image1"
                  value={newHotel.image1}
                  onChange={handleInputChange}
                  placeholder="Enter image URL 1"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image2">Image URL 2</Label>
                <Input
                  id="image2"
                  name="image2"
                  value={newHotel.image2}
                  onChange={handleInputChange}
                  placeholder="Enter image URL 2"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image3">Image URL 3</Label>
                <Input
                  id="image3"
                  name="image3"
                  value={newHotel.image3}
                  onChange={handleInputChange}
                  placeholder="Enter image URL 3"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image4">Image URL 4</Label>
                <Input
                  id="image4"
                  name="image4"
                  value={newHotel.image4}
                  onChange={handleInputChange}
                  placeholder="Enter image URL 4"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image5">Image URL 5</Label>
                <Input
                  id="image5"
                  name="image5"
                  value={newHotel.image5}
                  onChange={handleInputChange}
                  placeholder="Enter image URL 5"
                />
              </div>
              <div className="mt-4 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="bg-[#8DB1D3] hover:bg-[#7a9ebe]"
                  onClick={handleAddHotel}
                >
                  Add Hotel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Hotel</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Hotel Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={editHotelData?.name || ""}
                onChange={handleEditInputChange}
                placeholder="Enter hotel name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                name="address"
                value={editHotelData?.address || ""}
                onChange={handleEditInputChange}
                placeholder="Enter hotel address"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-city">City</Label>
              <Input
                id="edit-city"
                name="city"
                value={editHotelData?.city || ""}
                onChange={handleEditInputChange}
                placeholder="Enter city"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-country">Country</Label>
              <Input
                id="edit-country"
                name="country"
                value={editHotelData?.country || ""}
                onChange={handleEditInputChange}
                placeholder="Enter country"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-rating">Rating</Label>
                <Input
                  id="edit-rating"
                  name="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={editHotelData?.rating || ""}
                  onChange={handleEditInputChange}
                  placeholder="e.g. 4.5"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-reviews">Reviews</Label>
                <Input
                  id="edit-reviews"
                  name="reviews"
                  type="number"
                  min="0"
                  value={editHotelData?.reviews || ""}
                  onChange={handleEditInputChange}
                  placeholder="e.g. 120"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-price">Price per night</Label>
              <Input
                id="edit-price"
                name="price"
                value={editHotelData?.price !== undefined ? editHotelData.price.toString() : ""}
                onChange={handleEditInputChange}
                placeholder="e.g. 120 or $120"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-room">Number of Rooms</Label>
              <Input
                id="edit-room"
                name="room"
                type="number"
                min="0"
                value={editHotelData?.room !== undefined ? editHotelData.room.toString() : ""}
                onChange={handleEditInputChange}
                placeholder="Enter room number"
              />
            </div>
            {/* You might want to handle image editing differently or not at all in this basic dialog */}
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button
  type="button"
  className="bg-[#8DB1D3] hover:bg-[#7a9ebe]"
  onClick={handleUpdateHotel} // Make sure this is correct
>
  Update Hotel
</Button>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </>
  );
};

export default HotelListing;

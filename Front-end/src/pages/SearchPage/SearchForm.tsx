
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const SearchForm: React.FC = () => {

  const today = new Date();
 // States for destination, check-in and check-out dates, room count, and guest count
  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date(today.setDate(today.getDate() + 1)));
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(new Date(today.setDate(today.getDate() + 1)));
  const [roomCount, setRoomCount] = useState(1);
  const [guestCount, setGuestCount] = useState(2);
  const [roomsPopoverOpen, setRoomsPopoverOpen] = useState(false);
 // Functions to increment and decrement room count
  const incrementRoomCount = () => {
    setRoomCount((prev) => Math.min(prev + 1, 10));
  };

  const decrementRoomCount = () => {
    setRoomCount((prev) => Math.max(prev - 1, 1));
  };
 // Functions to increment and decrement guest count
  const incrementGuestCount = () => {
    setGuestCount((prev) => Math.min(prev + 1, 20));
  };

  const decrementGuestCount = () => {
    setGuestCount((prev) => Math.max(prev - 1, 1));
  };

  const navigate = useNavigate();
  // Function to handle redirection with parameters
  const handleOnclick = (path: string) => {
    navigate(path);
  }

  return (
    <div className="justify-center items-stretch shadow-[0px_4px_16px_0px_rgba(17,34,17,0.05)] bg-white z-10 flex mt-[-55px] w-full max-w-[1232px] flex-col px-6 py-8 rounded-2xl max-md:max-w-full max-md:px-5 sticky top-10">
      <div className="flex w-full items-center gap-4 flex-wrap max-md:max-w-full">
        {/* Destination Field */}
        <div className="self-stretch min-w-60 min-h-14 grow shrink w-[333px] my-auto rounded-[4px_4px_0px_0px]">
          <div className="rounded bg-white border w-full border-[rgba(121,116,126,1)] border-solid">
            <div className="flex w-full items-center pr-4 py-1 rounded-[4px_4px_0px_0px]">
              <div className="self-stretch flex min-h-12 flex-col items-center justify-center w-12 my-auto">
                <div className="flex w-full max-w-10 items-center gap-2.5 overflow-hidden justify-center rounded-[100px]">
                  <div className="self-stretch flex w-10 items-center gap-2.5 justify-center my-auto p-2">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f0cd79cc0204f709fda2cfc134855291f8764b5?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-6 self-stretch my-auto"
                      alt="Location icon"
                    />
                  </div>
                </div>
              </div>
              <div className="self-stretch relative flex min-w-60 min-h-10 flex-col text-[#1C1B1F] font-normal justify-center flex-1 shrink basis-[0%] my-auto">
                <Input 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="self-stretch z-0 text-base border-none shadow-none focus-visible:ring-0 p-0 h-auto"
                  placeholder="Enter location"
                />
                <div className="self-stretch bg-white absolute z-0 text-sm px-1 -left-9 -top-4">
                  Enter Destination
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Check In Field */}
        <div className="self-stretch min-h-14 grow shrink w-[229px] my-auto rounded-[4px_4px_0px_0px]">
          <Popover>
            <PopoverTrigger asChild>
              <div className="rounded bg-white border w-full border-[rgba(121,116,126,1)] border-solid cursor-pointer">
                <div className="flex w-full items-center pl-4 py-1 rounded-[4px_4px_0px_0px]">
                  <div className="self-stretch relative flex min-h-10 flex-col font-normal justify-center flex-1 shrink basis-6 my-auto">
                    <div className="self-stretch z-0 text-base text-[#1C1B1F]">
                      {checkInDate ? format(checkInDate, "EEE MM/dd") : "Select date"}
                    </div>
                    <div className="self-stretch bg-white absolute z-0 text-sm text-[#121] px-1 -left-1 -top-4">
                      Check In
                    </div>
                  </div>
                  <div className="self-stretch flex min-h-12 flex-col items-center justify-center w-12 my-auto p-3">
                    <CalendarIcon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50" align="start">
              <Calendar
                mode="single"
                selected={checkInDate}
                onSelect={setCheckInDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check Out Field */}
        <div className="self-stretch min-h-14 grow shrink w-[229px] my-auto rounded-[4px_4px_0px_0px]">
          <Popover>
            <PopoverTrigger asChild>
              <div className="rounded bg-white border w-full border-[rgba(121,116,126,1)] border-solid cursor-pointer">
                <div className="flex w-full items-center pl-4 py-1 rounded-[4px_4px_0px_0px]">
                  <div className="self-stretch relative flex min-h-10 flex-col font-normal justify-center flex-1 shrink basis-6 my-auto">
                    <div className="self-stretch z-0 text-base text-[#1C1B1F]">
                      {checkOutDate ? format(checkOutDate, "EEE MM/dd") : "Select date"}
                    </div>
                    <div className="self-stretch bg-white absolute z-0 text-sm text-[#121] px-1 -left-1 -top-4">
                      Check Out
                    </div>
                  </div>
                  <div className="self-stretch flex min-h-12 flex-col items-center justify-center w-12 my-auto p-3">
                    <CalendarIcon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50" align="start">
              <Calendar
                mode="single"
                selected={checkOutDate}
                onSelect={setCheckOutDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Rooms & Guests Field */}
        <div className="self-stretch min-h-14 grow shrink w-[229px] my-auto rounded-[4px_4px_0px_0px]">
          <Popover open={roomsPopoverOpen} onOpenChange={setRoomsPopoverOpen}>
            <PopoverTrigger asChild>
              <div className="rounded bg-white border w-full border-[rgba(121,116,126,1)] border-solid cursor-pointer">
                <div className="flex w-full items-center py-1 rounded-[4px_4px_0px_0px]">
                  <div className="self-stretch flex min-h-12 flex-col items-center justify-center w-12 my-auto">
                    <div className="flex w-full max-w-10 items-center gap-2.5 overflow-hidden justify-center rounded-[100px]">
                      <div className="self-stretch flex w-10 items-center gap-2.5 justify-center my-auto p-2">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6140123370fae9eb3452ac89c196402e9ddc7a3e?placeholderIfAbsent=true"
                          className="aspect-[1] object-contain w-6 self-stretch my-auto"
                          alt="People icon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch relative flex min-h-10 flex-col text-[#1C1B1F] font-normal justify-center flex-1 shrink basis-6 my-auto">
                    <div className="self-stretch z-0 text-base">
                      {roomCount} room, {guestCount} guests
                    </div>
                    <div className="self-stretch bg-white absolute z-0 text-sm px-1 -left-9 -top-4">
                      Rooms & Guests
                    </div>
                  </div>
                  <div className="self-stretch flex min-h-12 flex-col items-center justify-center w-12 my-auto p-3">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc977ad9b009edd82368449baa8e24c9f56957a2?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-6"
                      alt="Dropdown icon"
                    />
                  </div>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-4 z-50" align="start">
              <div className="space-y-6 border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">Room</span>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={decrementRoomCount}
                      className="flex items-center justify-center h-8 w-8 rounded-full border border-[#8DB1D3] cursor-pointer hover:bg-[#8DB1D3]"
                      disabled={roomCount <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center">{roomCount}</span>
                    <button 
                      onClick={incrementRoomCount}
                      className="flex items-center justify-center h-8 w-8 rounded-full border border-[#8DB1D3] cursor-pointer hover:bg-[#8DB1D3]"
                      disabled={roomCount >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">Guests</span>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={decrementGuestCount}
                      className="flex items-center justify-center h-8 w-8 rounded-full border border-[#8DB1D3] cursor-pointer hover:bg-[#8DB1D3]"
                      disabled={guestCount <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center">{guestCount}</span>
                    <button 
                      onClick={incrementGuestCount}
                      className="flex items-center justify-center h-8 w-8 rounded-full border border-[#8DB1D3] cursor-pointer hover:bg-[#8DB1D3]"
                      disabled={guestCount >= 20}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <div className="self-stretch grow shrink w-[45px]">
          <button className="justify-center items-center rounded flex w-14 gap-1 flex-1 h-14 px-4 z-100 bg-[#8DB1D3] text-[#112211] transition duration-500 hover:bg-[#6c9bc7] hover:text-[#112211] cursor-pointer"
          onClick={() => handleOnclick(`/search?destination=${destination}&checkIn=${checkInDate?.toISOString()}&checkOut=${checkOutDate?.toISOString()}&rooms=${roomCount}&guests=${guestCount}`)}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/53d54d203c8d0ab2b7f5fb382c95c149f2a304c5?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-6 self-stretch flex-1 shrink basis-[0%] my-auto"
              alt="Search icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
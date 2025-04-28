import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Minus, Plus } from "lucide-react";



  const today = new Date();

const SearchForm: React.FC = () => {

  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date(today.setDate(today.getDate() + 1)));
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(new Date(today.setDate(today.getDate() + 2)));
  const [roomCount, setRoomCount] = useState(1);
  const [guestCount, setGuestCount] = useState(2);
  const [roomsPopoverOpen, setRoomsPopoverOpen] = useState(false);

  const incrementRoomCount = () => {
    setRoomCount((prev) => Math.min(prev + 1, 10));
  };

  const decrementRoomCount = () => {
    setRoomCount((prev) => Math.max(prev - 1, 1));
  };

  const incrementGuestCount = () => {
    setGuestCount((prev) => Math.min(prev + 1, 20));
  };

  const decrementGuestCount = () => {
    setGuestCount((prev) => Math.max(prev - 1, 1));
  };

  return (
    <section className=" flex-col justify-start px-6 py-8 bg-white rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold text-neutral-900 max-md:max-w-full">
        Find your perfect stay?{" "}
      </h2>
      <div className="w-full flex justify-between flex-col">
      <div className="flex justify-between items-center relative gap-4 mt-8 w-5/6 max-md:max-w-4/5">
        <InputField
          label="Enter Destination"
          value=''
          onChange={setDestination}
          placeholder="Enter your destination"
          leadingIcon="https://cdn.builder.io/api/v1/image/assets/TEMP/d31d1300ee5999b99bed53a98f31e50b947fbb664fd83fb9448e1adf8215cfbb?placeholderIfAbsent=true&apiKey=0faacf3c0e244d62ae8917b197af2f46"
          className="flex-1 rounded basis-0 min-h-14 min-w-140"
        />

        {/* Check In Field */}
        <div className="self-stretch min-h-14 grow shrink w-[229px] my-auto rounded-[4px_4px_0px_0px] min-w-50">
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
        <div className="self-stretch min-h-14 grow shrink w-[229px] my-auto rounded-[4px_4px_0px_0px] min-w-50">
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
        <div className="self-stretch min-h-14 grow shrink w-[229px] my-auto rounded-[4px_4px_0px_0px] min-w-60">
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
      </div>
      </div>

      

      <div className="flex flex-wrap gap-6 items-center mt-8 w-full text-sm font-medium text-neutral-900 max-md:max-w-full">
        <div className="flex min-h-12 mx-auto" />
        <Button
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/0e1d2ea9fc115435200c68ad4858bf6b548867c877dcb307338bd6690ff5ede7?placeholderIfAbsent=true&apiKey=0faacf3c0e244d62ae8917b197af2f46"
          className="bg-[#8DB1D3] text-[#112211] transition duration-500 hover:bg-[#6c9bc7] hover:text-[#112211] cursor-pointer"
          path = {`/search?destination=${destination}&checkIn=${checkInDate?.toISOString()}&checkOut=${checkOutDate?.toISOString()}&rooms=${roomCount}&guests=${guestCount}`}
        >
          Show Places
        </Button>
      </div>
    </section>
  );
};

export default SearchForm;
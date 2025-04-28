import React from "react";
import { ChevronDownIcon } from "./icons";
import { useState } from "react";

// Defining the types for the BookingHeader component's props
interface BookingHeaderProps {
  onFilterClick?: () => void;
}

// The BookingHeader component itself
export const BookingHeader: React.FC<BookingHeaderProps> = ({
  onFilterClick,
}) => {
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
      setExpanded((prev) => !prev);
      onFilterClick?.();
    };
  return (
    <header className={`flex justify-between items-center mb-4 ${
        expanded ? 'gap-188.5': ''}`}>
      <h1 className="text-[32px] font-bold text-black max-sm:text-2xl">
        Booking
      </h1>
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={onFilterClick && handleClick}
        role="button"
        tabIndex={0}
      >
        <span className="text-sm font-bold text-[#112211]">Upcoming</span>
        <ChevronDownIcon />
      </div>
    </header>
  );
};

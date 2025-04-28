"use client";

import React from "react";
import CalendarComponent from "../../components/Calendar/Calendar";
import { useState } from "react";

interface DateFieldProps {
  label: string;
  value: string;
  className?: string;
}

// DateField component definition
const DateField: React.FC<DateFieldProps> = ({
  label,
  value,
  className = "",
}) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

  return (
    <div className={className}>
      <div className="w-60 max-w-full rounded min-h-14">
        <div className="w-full bg-white rounded border border-solid border-zinc-500">
          <div className="flex items-center py-1 pl-4 w-full rounded">
            <div className="flex relative flex-col flex-1 shrink justify-center items-start self-stretch my-auto basis-6 min-h-10">
              <div className="z-0 self-stretch text-base text-zinc-900">
                {value}
              </div>
              <div className="absolute -left-1 -top-4 z-0 self-stretch px-1 text-sm bg-white text-neutral-900">
                {label}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center self-stretch p-3 my-auto w-12 min-h-12" onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d939e94994c7fa4afc60747e654e1b1c224f8b8155c92eb40719afa2e860637?placeholderIfAbsent=true&apiKey=0faacf3c0e244d62ae8917b197af2f46"
                className="object-contain w-6 aspect-square"
                alt="Calendar"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute z-50">
      {isDropdownOpen && <CalendarComponent />}
      </div>
    </div>
    
  );
};

export default DateField;

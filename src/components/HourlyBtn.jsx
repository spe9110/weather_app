import React, { useState, useRef, useEffect } from "react";
import { getEnglishWeekday } from "../../Utils/dateHelper.js";

const HourlyBtn = ({ value, icon, days = [], onselect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="bg-neutral-600 border border-neutral-600 flex justify-center items-center font-bold rounded-md px-3 py-1 xs:px-3.5 xs:py-1.5 sm:px-4 sm:py-2 space-x-2 cursor-pointer text-white"
      >
        <span>{value}</span>
        <span>{icon}</span>
      </button>

      {isDropdownOpen && (
        <div className="absolute top-12 right-0 bg-neutral-700 border border-neutral-600 rounded-md shadow-md z-20 w-40">
          {days.map((d) => (
            <button
              key={d}
              onClick={() => {
                onselect?.(d); // always return ISO date
                setIsDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-white hover:bg-neutral-600"
            >
              {getEnglishWeekday(d)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HourlyBtn;
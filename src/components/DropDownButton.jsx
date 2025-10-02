import React, { useState, useRef, useEffect } from "react";
import arrowIcon from "../assets/images/icon-dropdown.svg";
import { DropDownElement } from "./featuresMenu/DropDownElement";

export const DropDownButton = ({ icon, value, tempUnit, setTempUnit, windUnit, setWindUnit, precipUnit, setPrecipUnit }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
        className="button-dropdown"
      >
        {icon}
        <span>{value}</span>
        <img src={arrowIcon} alt="arrow-icon" />
      </button>

      {isDropdownOpen && (
        <div className="w-[180px] md:w-[200px] absolute top-12 right-0 bg-neutral-700 border-2 border-neutral-700 rounded-md p-[8px] text-white shadow-md z-50 2xl:top-14">
          <h4 className="border-2 border-neutral-200 rounded-md p-[4px] px-[8px] mb-2">Switch Units</h4>

          <DropDownElement 
            title="Temperature" 
            valueOne={{ label: "Celsius (°C)", value: "C" }}
            valueTwo={{ label: "Fahrenheit (°F)", value: "F" }} 
            selectedUnit={tempUnit} 
            setSelectedUnit={setTempUnit} 
            />
          <DropDownElement 
            title="Wind Speed" 
            valueOne={{label: "km/h", value: "km/h"}} 
            valueTwo={{label: "mph", value: "mph"}} 
            selectedUnit={windUnit} 
            setSelectedUnit={setWindUnit} 
            />
          <DropDownElement 
            title="Precipitation" 
            valueOne={{label: "Millimeters (mm)", value: "mm"}} 
            valueTwo={{label: "Inches (in)", value: "in"}} 
            selectedUnit={precipUnit} 
            setSelectedUnit={setPrecipUnit} 
            />
        </div>
      )}
    </div>
  );
};

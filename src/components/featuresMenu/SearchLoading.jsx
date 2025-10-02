import React from "react";
import CircleSpinner from "./CircleSpinner";

function SearchLoading({ small = false }) {
  return (
    <div
      className={`flex items-center justify-center ${
        small ? "w-full py-0" : "w-full lg:w-[475px] p-3 px-6 mt-2 rounded-lg shadow-md"
      } bg-neutral-800`}
    >
      <CircleSpinner size={small ? 16 : 24} />
      <p className={`text-neutral-400 text-base pl-2 ${small ? "text-sm" : ""}`}>
        {small ? "Loading..." : "Search in progress"}
      </p>
    </div>
  );
}

export default SearchLoading;
import React, { memo } from "react";
import SearchLoading from "./SearchLoading";


const SearchResult = ({ results = [], onSelect, loading = false }) => {
  
    if (loading) {
    return (
      <ul className="search_main_suggestion" role="listbox">
        <li className="w-full flex items-center justify-center py-3 px-4">
          <SearchLoading /> 
        </li>
      </ul>
    );
  }

  if (results.length === 0) {
    return (
      <ul className="search_main_suggestion" role="listbox">
        <li className="w-full py-3 px-4 text-neutral-500 text-center italic" role="option">
          No results found
        </li>
      </ul>
    );
  }

  return (
    <ul className="search_main_suggestion" role="listbox">
      {results.map((city, index) => (
        <li
          key={index}
          role="option"
          className="w-full py-3 px-4 text-neutral-300 font-medium cursor-pointer text-start hover:bg-neutral-700 hover:border hover:border-neutral-600 rounded-md transition-colors"
          onMouseDown={() => onSelect?.(city)}
        >
          {city}
        </li>
      ))}
    </ul>
  );
}

export default memo(SearchResult);
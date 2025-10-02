import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import SearchResult from "./featuresMenu/SearchResult";

const Search = ({ setMeteoData, loading, setLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("city") || ""; // single source of truth
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // sidebar days of the week weather
  function groupByDay(hourly) {
    const grouped = {};
    hourly.time.forEach((time, idx) => {
      const day = time.split("T")[0]; // "2025-09-24"
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push({
        time,
        temperature: Math.round(hourly.apparent_temperature[idx]), // ✅ rounded
        precipitation: Math.round(hourly.precipitation[idx]),      // ✅ rounded
        humidity: Math.round(hourly.relative_humidity_2m[idx]),    // ✅ rounded
      });
    });
    return grouped;
  }

  // Define fetchResults so it's reusable
  const fetchResults = useCallback(
    async (city) => {
      if (!city) {
        setResults([]);
        setLoading(false);
        setMeteoData(null);
        return;
      }

      setLoading(true);
      try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=10&language=en&country=FR`;

        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
          console.log("No city found");
          setResults([]);
          setMeteoData(null);
          return;
        }

        setResults(geoData.results); // for dropdown
        console.log(
          "Dropdown results:",
          geoData.results.map((r) => r.name)
        );

        // Pick first match
        const exactCity =
          geoData.results.find((r) =>
            r.name.toLowerCase().includes(city.toLowerCase())
          ) || geoData.results[0];

        const { latitude, longitude, timezone, name, country } = exactCity;

        // Weather API
        const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=apparent_temperature,relative_humidity_2m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=${timezone}`;

        const forecastRes = await fetch(forecastUrl);
        const forecastData = await forecastRes.json();
        
        // Parse current time and hourly times to Date objects
        const currentTime = new Date(forecastData.current_weather.time).getTime();

        let closestIndex = 0;
        let smallestDiff = Infinity;

        forecastData.hourly.time.forEach((t, idx) => {
          const diff = Math.abs(new Date(t).getTime() - currentTime);
          if (diff < smallestDiff) {
            smallestDiff = diff;
            closestIndex = idx;
          }
        });
        // Weather API fetched successfully
        const groupedHourly = groupByDay(forecastData.hourly);
        
        // Send data to parent
        setMeteoData({
          location: { name, country, latitude, longitude, timezone },
          current: {
            ...forecastData.current_weather,
            temperature: Math.round(forecastData.current_weather.temperature),
            windspeed: Math.round(forecastData.current_weather.windspeed),
            feels_like: Math.round(forecastData.hourly.apparent_temperature[closestIndex]),
            humidity: forecastData.hourly.relative_humidity_2m[closestIndex],
            precipitation: forecastData.hourly.precipitation[closestIndex],
          },
          daily: {
            ...forecastData.daily,
            temperature_2m_max: forecastData.daily.temperature_2m_max.map(v => Math.round(v)),
            temperature_2m_min: forecastData.daily.temperature_2m_min.map(v => Math.round(v)),
            precipitation_sum: forecastData.daily.precipitation_sum.map(v => Math.round(v)),
          },
          hourlyByDay: groupedHourly,
        });
        console.log("Weather data fetched:", forecastData);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setResults([]);
        setMeteoData(null);
      } finally {
        setLoading(false);
      }
    },
    [setMeteoData, setLoading]
  );

  const fetchSuggestions = async (city) => {
    if (!city) {
      setResults([]);
      return;
    }
    setLoading(true);    
    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=10&language=en&country=FR`;

      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setResults([]);
        return;
      }

      setResults(geoData.results); // only suggestions
      // force spinner to stay at least 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    } catch (err) {
      console.error("Error fetching suggestions:", err.message);
      setResults([]);
    } finally {
      setLoading(false); // ✅ ensure spinner stops
    } 
  };

  // Handle typing → only show suggestions
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchParams(value ? { city: value } : {});
    setShowDropdown(true);
    fetchSuggestions(value)
  };

  // Handle selecting a suggestion → fetch weather
  const handleSelect = (city) => {
    setSearchParams({ city });
    fetchResults(city);
    setShowDropdown(false);
  };

  // Handle pressing search button → fetch weather
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      fetchResults(query); 
      setShowDropdown(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="search_form"
    >
      <div className="search_input_box">
        <FaSearch className="text-neutral-400 text-sm sm:text-sm xs:text-sm sm:text-[18px] md:text-[18px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => query && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          placeholder="Search for a place"
          className="w-full bg-transparent outline-none text-white placeholder:text-neutral-400 placeholder:font-semibold text-sm xs:text-sm xs:font-medium sm:text-[18px] md:text-[20px] lg:text-[18px]"
        />
      </div>

      <button
        type="submit"
        className="search_button"
      >
        Search
      </button>
      {showDropdown && query && (
        <div className="search_suggestion_result absolute top-full left-0 w-full z-20">
          <SearchResult
            results={results.map((r) => r.name)}
            onSelect={handleSelect}
            loading={loading}
          />
        </div>
      )}
    </form>
  );
};

export default Search;
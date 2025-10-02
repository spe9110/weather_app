import {useState, useEffect, useMemo } from 'react'
import Search from '../components/Search'
import HourlyBtn from '../components/HourlyBtn'
import { IoIosArrowDown } from "react-icons/io";
import ForecastItem from '../components/ForecastItem';
import iconSun from "../assets/images/icon-overcast.webp"
import Central_Icon from "../assets/images/icon-sunny.webp"
import IconDrizzle from "../assets/images/icon-drizzle.webp"
import IconFog from "../assets/images/icon-fog.webp"
import IconRain from "../assets/images/icon-rain.webp"
import IconPartyCloud from "../assets/images/icon-partly-cloudy.webp"
import IconSnow from "../assets/images/icon-snow.webp"
import IconStorm from "../assets/images/icon-storm.webp"
import DailyForcast from '../components/DailyForcast';
import { useOutletContext } from 'react-router-dom';
import { celsiusToFahrenheit, kmhToMph, mmToInches } from '../../Utils/conversions';
import { getEnglishWeekday } from '../../Utils/dateHelper.js';

function WeatherApp() {
  const { tempUnit, windUnit, precipUnit } = useOutletContext();
  
  const [ meteoData, setMeteoData ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ selectedDay, setSelectedDay ] = useState('');

 // Set default day when meteoData changes
  useEffect(() => {
    const keys = Object.keys(meteoData?.hourlyByDay || {});
    if (keys.length > 0 && !selectedDay) {
      setSelectedDay(keys[0]);
    }
  }, [meteoData, selectedDay]);

  const weatherCodeToIcon = (code) => {
    const c = Number(code);
    if (Number.isNaN(c)) return Central_Icon; // fallback

    // Open-Meteo mapping -> use your imported icon variables
    if (c === 0) return Central_Icon;                 // Clear sky
    if (c === 1 || c === 2) return IconPartyCloud;   // Mainly clear / partly cloudy
    if (c === 3) return iconSun;                     // Overcast (use your overcast asset)
    if (c >= 45 && c <= 48) return IconFog;          // Fog, depositing rime, etc.
    if (c >= 51 && c <= 57) return IconDrizzle;      // Drizzle (incl. freezing drizzle)
    if (c >= 61 && c <= 67) return IconRain;         // Rain (incl. freezing rain)
    if (c >= 71 && c <= 77) return IconSnow;         // Snow
    if (c >= 80 && c <= 82) return IconRain;         // Rain showers
    if (c >= 85 && c <= 86) return IconSnow;         // Snow showers
    if (c >= 95 && c <= 99) return IconStorm;        // Thunderstorms (+ hail)
    
    return iconSun; // final fallback
  };

   // Sort days Monday → Sunday
//   const weekdaysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

//   const sortedDays = Object.keys(meteoData?.hourlyByDay || {}).sort(
//     (a, b) =>
//       weekdaysOrder.indexOf(getEnglishWeekday(a)) -
//       weekdaysOrder.indexOf(getEnglishWeekday(b))
//   );
    const sortedDays = useMemo(() => {
    const weekdaysOrder = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return Object.keys(meteoData?.hourlyByDay || {}).sort(
      (a, b) =>
        weekdaysOrder.indexOf(getEnglishWeekday(a)) -
        weekdaysOrder.indexOf(getEnglishWeekday(b))
    );
  }, [meteoData]);

  return (
    <div className=''>
        <h1 className="heading_main">
            How's the sky looking today?
        </h1>

        {/* Pass setMeteoData to Search */}
      <Search setMeteoData={setMeteoData} loading={loading} setLoading={setLoading} />

      <div className='meteo_container'>
          
          <div className="meteo_main_content">
         {/* Top Grid Section */}
          <div className="first_grid_section">
            <div className="first_grid_section_content">
              <div className="display_meteo">
                <div className='display_main_board'>
                  <div className='display_main_board_location'>
                    <h3 className='display_main_board_location_city'>{meteoData?.location?.name || "Rennes"}{","}</h3>
                    <h3 className='display_main_board_location_country text-2xl'>{meteoData?.location?.country || "France"}</h3>
                  </div>
                  <div className='display_date'>
                    <h3 className='display_date_day'>
                      {new Date().toLocaleDateString("en-US", { weekday: "long" })}{","}</h3>
                    <h3 className='display_date_number'>{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</h3>
                  </div>
                </div>
                <div className='display_temperature'>
                  <img
                      className="display_weather_icon"
                      src={weatherCodeToIcon(meteoData?.current?.weathercode)}
                      alt="weather icon"
                      width={80}
                      height={80}
                      loading="lazy"
                    />
                  <h3 className='display_current_temperature'>{meteoData?.current?.temperature || "--"}°</h3>
                </div>
              </div>
              <div className="display_metrics">
                <h3 className='font-normal text-md md:text-lg'>Feels Like</h3>
                {/* <h3 className='font-medium text-2xl'>{meteoData?.current?.feels_like || "--"}°</h3> */}
                <h3 className='font-medium text-2xl md:text-3xl'>
                  {meteoData?.current?.feels_like !== undefined
                    ? tempUnit === "C"
                      ? `${meteoData.current.feels_like}°C`
                      : `${celsiusToFahrenheit(meteoData.current.feels_like)}°F`
                    : "--"}
                </h3>
              </div>
              <div className="display_metrics">
                <h3 className='font-normal text-md md:text-lg'>Humidity</h3>
                <h3 className='font-medium text-2xl md:text-3xl'>{meteoData?.current?.humidity || "--"}%</h3>
              </div>              
              <div className="display_metrics">
                <h3 className='font-normal text-md md:text-lg'>Wind</h3>
                <h3 className='font-medium text-2xl md:text-3xl'>
                  {meteoData?.current?.windspeed !== undefined
                    ? windUnit === "km/h"
                      ? `${meteoData.current.windspeed} km/h`
                      : `${kmhToMph(meteoData.current.windspeed)} mph`
                    : "--"}
                </h3>
              </div>
              <div className="display_metrics">
                <h3 className='font-normal text-md md:text-lg'>Precipitation</h3>
                <h3 className='font-medium text-2xl md:text-3xl'>
                  {meteoData?.current?.precipitation !== undefined
                    ? precipUnit === "mm"
                      ? `${meteoData.current.precipitation} mm`
                      : `${mmToInches(meteoData.current.precipitation)} in`
                    : "--"}
                </h3>
              </div>
            </div>
          </div>

          {/* Bottom Flex Section */}
          <div className='daily_forecast'>
            <h3 className='daily-forecast_title'>Daily forecast</h3>
            <div className="daily_forecast_container">
              {meteoData?.daily?.time?.map((day, index) => (
                <DailyForcast
                  key={day}
                  day={new Date(day).toLocaleDateString("en-US", { weekday: "short" })}
                  icon={weatherCodeToIcon(meteoData?.daily?.weathercode?.[index])}
                  temp={`${meteoData?.daily?.temperature_2m_min[index]}°`}
                  tempe={`${meteoData?.daily?.temperature_2m_max[index]}°`}
                />
              ))}
            </div>
            </div>
        </div>

          <div className='week-and-time custom-scrollbar'>
            <div className='header h-auto flex flex-row justify-between items-center sticky top-0 z-20 bg-neutral-700 px-[16px] pt-[24px] pb-[2px]'>
              <h3 className='font-bold text-gray-50 text-md'>Hourly forecast</h3>
              {/* {meteoData } */}
               <HourlyBtn
                value={selectedDay ? getEnglishWeekday(selectedDay) : "Day"}
                icon={<IoIosArrowDown />}
                days={sortedDays}
                onselect={(day) => setSelectedDay(day)}
              />

            </div>
            <div className='list px-[16px] z-0'>
              {selectedDay &&
              meteoData?.hourlyByDay[selectedDay]?.map((h, idx) => (
                <ForecastItem
                  key={idx}
                  icon={weatherCodeToIcon(h.weathercode)}
                  hour={new Date(h.time).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    hour12: true,
                  })}
                  temperature={`${h.temperature}°`}
                />
              ))}
            </div>
            <div className='footer w-full h-[14px] sticky bottom-0 bg-neutral-700'></div>
          </div>
        </div>
        
    </div>
  )
}

export default WeatherApp
import React, { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";
import Footer from './Footer';
import Header from './Header';
const Layout = () => {
  // Central unit states
  const [tempUnit, setTempUnit] = useState(localStorage.getItem("temperatureUnit") || "C");
  const [windUnit, setWindUnit] = useState(localStorage.getItem("windUnit") || "km/h");
  const [precipUnit, setPrecipUnit] = useState(localStorage.getItem("precipitationUnit") || "mm");

   // keep localStorage in sync when state changes
  useEffect(() => {
    localStorage.setItem("temperatureUnit", tempUnit);
  }, [tempUnit]);

  useEffect(() => {
    localStorage.setItem("windUnit", windUnit);
  }, [windUnit]);

  useEffect(() => {
    localStorage.setItem("precipitationUnit", precipUnit);
  }, [precipUnit]);

  return (
    <>
      {/* <Header /> */}
      <Header
        tempUnit={tempUnit}
        setTempUnit={setTempUnit}
        windUnit={windUnit}
        setWindUnit={setWindUnit}
        precipUnit={precipUnit}
        setPrecipUnit={setPrecipUnit}
      />
      {/* <Outlet /> */}
      <Outlet context={{tempUnit, windUnit, precipUnit}} />

      <Footer />
    </>
  )
}

export default Layout
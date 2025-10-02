import React from 'react'  
import WeatherApp from "./pages/WeatherApp";
import { Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

function App() {

  return (
    <div className='App'>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<WeatherApp />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

export default App
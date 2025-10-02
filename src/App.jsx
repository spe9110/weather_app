import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from './components/ErrorBoundary';
import SearchLoading from './components/featuresMenu/SearchLoading';
const WeatherApp = lazy(() => import('./pages/WeatherApp'));
const Layout = lazy(() => import("./components/Layout"));



function App() {

  return (
    <div className='App'>
      <ErrorBoundary>
        <Suspense fallback={<div className="flex justify-center items-center h-screen"><SearchLoading /></div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<WeatherApp />} />
            </Route>
          </Routes>
        </Suspense> 
      </ErrorBoundary>
    </div>
  )
}

export default App

// npm install --save-dev gh-pages

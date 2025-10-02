// Celsius → Fahrenheit
export const celsiusToFahrenheit = (celsius) => {
  if (celsius === null || celsius === undefined || isNaN(celsius)) return "--";
  return ((celsius * 9) / 5 + 32).toFixed(1); // keep 1 decimal
};

// km/h → mph
export const kmhToMph = (kmh) => {
  if (kmh === null || kmh === undefined || isNaN(kmh)) return "--";
  return (kmh * 0.621371).toFixed(1); // keep 1 decimal
};

// mm → inches
export const mmToInches = (mm) => {
  if (mm === null || mm === undefined || isNaN(mm)) return "--";
  return (mm / 25.4).toFixed(2); // keep 2 decimal places
};
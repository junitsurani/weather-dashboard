import React, { useState } from 'react';
import WeatherInput from './components/WeatherInput';
import WeatherDisplay from './components/WeatherDisplay';
import ErrorMessage from './components/ErrorMessage';
import ErrorBoundary from './components/ErrorBoundary';
import { fetchWeatherData } from './services/apiService';
import { transformWeatherData } from './utils/dataTransform';


const App = () => {
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (city) => {
    try {
      setError('');
      const cachedData = localStorage.getItem(city.toLowerCase());
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setWeather((prev) => Array.isArray(prev) ? [...prev, parsedData] : [parsedData]);
        return;
      }
  
      const data = await fetchWeatherData(city);
      const transformedData = transformWeatherData(data);
      setWeather((prev) => Array.isArray(prev) ? [...prev, transformedData] : [transformedData]);
      localStorage.setItem(city.toLowerCase(), JSON.stringify(transformedData));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      <WeatherInput onSearch={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ErrorBoundary>
      {weather && <WeatherDisplay weather={weather} />}
      </ErrorBoundary>
    </div>
  );
};

export default App;

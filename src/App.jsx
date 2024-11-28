import React, { useState } from 'react';
import WeatherInput from './components/WeatherInput';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherChart from './components/WeatherChart';
import { fetchWeatherData } from './services/apiService';
import { transformWeatherData } from './utils/dataTransform';

const App = () => {
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({ type: 'all', value: null });
  const [viewMode, setViewMode] = useState('textual'); // 'textual' or 'graphical'

  const handleSearch = async (city) => {
    try {
      setError('');
      const cachedData = localStorage.getItem(city.toLowerCase());
      if (cachedData) {
        setWeather((prev) => [...prev, JSON.parse(cachedData)]);
        return;
      }
      const data = await fetchWeatherData(city);
      const transformedData = transformWeatherData(data);
      setWeather((prev) => [...prev, transformedData]);
      localStorage.setItem(city.toLowerCase(), JSON.stringify(transformedData));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFilter = (type, value) => {
    setFilter({ type, value });
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'textual' ? 'graphical' : 'textual');
  };

  const filteredWeather = weather.filter((entry) => {
    if (filter.type === 'temperature' && filter.value) {
      return entry.temperature >= filter.value;
    }
    return true;
  });

  const sortedWeather = [...filteredWeather].sort((a, b) => a.city.localeCompare(b.city));

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      <div className="input-container">
        <WeatherInput onSearch={handleSearch} />
        <input
          type="number"
          placeholder="Filter by Temperature (°C)"
          onChange={(e) => handleFilter('temperature', Number(e.target.value))}
        />
        <button className="toggle-view" onClick={toggleViewMode}>
          {viewMode === 'textual' ? 'Visualize' : 'Text View'}
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {viewMode === 'textual' && <WeatherDisplay weather={sortedWeather} />}
      {viewMode === 'graphical' && <WeatherChart weather={sortedWeather} />}
    </div>
  );
};

export default App;

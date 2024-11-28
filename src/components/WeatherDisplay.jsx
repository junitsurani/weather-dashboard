import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const WeatherDisplay = ({ weather }) => {
  if (!Array.isArray(weather) || weather.length === 0) {
    return <Typography>No weather data available. Please search for a city.</Typography>;
  }

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
      {weather.map((entry, index) => (
        <Card key={index} style={{ minWidth: 270, margin: 20 }}>
          <CardContent>
            <Typography variant="h5">{entry.city}</Typography>
            <Typography variant="h6">
              {entry.temperature}°C - {entry.description}
            </Typography>
            <Typography>Humidity: {entry.humidity}%</Typography>
            <Typography>Description: {entry.description}</Typography>
            <img src={entry.icon} alt={entry.description} style={{ width: 50, height: 50 }} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WeatherDisplay;

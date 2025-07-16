
import { useState, useEffect } from 'react';
import { WeatherData, WeatherForecast, WeatherAlert } from '@/types/weather';

// Configuration pour OpenWeatherMap (API gratuite)
const WEATHER_API_KEY = 'demo_key'; // L'utilisateur devra remplacer par sa vraie clé
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const useWeather = (city: string = 'Paris') => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // En mode démo, on utilise des données simulées réalistes
      const mockWeatherData: WeatherData = {
        current: {
          temperature: 18,
          condition: 'Partly Cloudy',
          description: 'Partiellement nuageux',
          humidity: 68,
          windSpeed: 12,
          pressure: 1013,
          uvIndex: 5,
          visibility: 10,
          icon: '02d'
        },
        forecast: [
          {
            date: new Date().toISOString(),
            day: "Aujourd'hui",
            temperature: { min: 12, max: 22 },
            condition: 'Partly Cloudy',
            description: 'Partiellement nuageux',
            humidity: 65,
            windSpeed: 10,
            precipitation: 20,
            icon: '02d'
          },
          {
            date: new Date(Date.now() + 86400000).toISOString(),
            day: 'Demain',
            temperature: { min: 14, max: 25 },
            condition: 'Sunny',
            description: 'Ensoleillé',
            humidity: 55,
            windSpeed: 8,
            precipitation: 5,
            icon: '01d'
          },
          {
            date: new Date(Date.now() + 172800000).toISOString(),
            day: 'Mercredi',
            temperature: { min: 16, max: 28 },
            condition: 'Rain',
            description: 'Pluie modérée',
            humidity: 80,
            windSpeed: 15,
            precipitation: 75,
            icon: '10d'
          },
          {
            date: new Date(Date.now() + 259200000).toISOString(),
            day: 'Jeudi',
            temperature: { min: 13, max: 20 },
            condition: 'Cloudy',
            description: 'Nuageux',
            humidity: 70,
            windSpeed: 12,
            precipitation: 40,
            icon: '04d'
          },
          {
            date: new Date(Date.now() + 345600000).toISOString(),
            day: 'Vendredi',
            temperature: { min: 15, max: 24 },
            condition: 'Sunny',
            description: 'Ensoleillé',
            humidity: 50,
            windSpeed: 6,
            precipitation: 0,
            icon: '01d'
          }
        ],
        alerts: [
          {
            id: '1',
            type: 'warning',
            title: 'Alerte pluie',
            description: 'Fortes précipitations attendues mercredi. Planifiez vos activités agricoles en conséquence.',
            startDate: new Date(Date.now() + 172800000).toISOString(),
            endDate: new Date(Date.now() + 259200000).toISOString(),
            severity: 'moderate'
          }
        ],
        location: {
          name: city,
          country: 'France',
          lat: 48.8566,
          lon: 2.3522
        }
      };

      // Simulation d'un délai d'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWeatherData(mockWeatherData);
    } catch (err) {
      setError('Erreur lors du chargement des données météo');
      console.error('Weather API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const refreshWeather = () => {
    fetchWeatherData();
  };

  return {
    weatherData,
    isLoading,
    error,
    refreshWeather
  };
};

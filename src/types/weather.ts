
export interface WeatherData {
  current: {
    temperature: number;
    condition: string;
    description: string;
    humidity: number;
    windSpeed: number;
    pressure: number;
    uvIndex: number;
    visibility: number;
    icon: string;
  };
  forecast: WeatherForecast[];
  alerts: WeatherAlert[];
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
}

export interface WeatherForecast {
  date: string;
  day: string;
  temperature: {
    min: number;
    max: number;
  };
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  icon: string;
}

export interface WeatherAlert {
  id: string;
  type: 'warning' | 'info' | 'danger';
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  severity: 'low' | 'moderate' | 'high' | 'extreme';
}

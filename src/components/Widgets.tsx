import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  MapPin,
  Cloud,
  CloudRain,
  Wind,
  Droplets,
  Eye,
  Code2,
  GitCommit,
  Zap,
} from "lucide-react";

// Time Widget
export function TimeWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="backdrop-blur-2xl bg-white/10 rounded-3xl py-2 px-2.5 border border-white/20 shadow-2xl"
    >
      <div className="flex items-baseline gap-2">
        <div className="text-2xl min-[310px]:text-3xl font-extralight text-white tracking-tight">
          {formatTime(time)}
        </div>
        <div className="text-xs text-white/60 font-light">
          {formatDate(time)}
        </div>
      </div>
    </motion.div>
  );
}

// Stats Widget with Auto-Sliding
export function StatsWidget() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const stats = [
    {
      icon: Code2,
      label: "Projects",
      value: "15+",
      gradient: "from-blue-400 to-cyan-400",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: GitCommit,
      label: "Commits",
      value: "800+",
      gradient: "from-green-400 to-emerald-400",
      bgGradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: Zap,
      label: "Experience",
      value: "5+",
      gradient: "from-purple-400 to-pink-400",
      bgGradient: "from-purple-500/20 to-pink-500/20",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stats.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [stats.length]);

  const currentStat = stats[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.25 }}
      className="backdrop-blur-2xl bg-white/10 rounded-3xl p-2.5 border border-white/20 shadow-2xl"
    >
      <div className="text-[10px] relative left-2 text-white/70 font-medium mb-2 uppercase tracking-wider">
        Quick Stats
      </div>

      <div className="relative h-[45px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`bg-gradient-to-r ${currentStat.bgGradient} rounded-xl p-2 border border-white/10`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`hidden min-[366px]:flex bg-gradient-to-br ${currentStat.gradient} p-1.5 rounded-lg`}
                >
                  <currentStat.icon className="w-3 h-3 text-white" />
                </div>

                <span className="text-xs text-white/80 font-light">
                  {currentStat.label}
                </span>
              </div>
              <span
                className={`text-[13px] font-bold bg-gradient-to-r ${currentStat.gradient} bg-clip-text text-transparent`}
              >
                {currentStat.value}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-1.5 mt-2">
        {stats.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-4 bg-white" : "w-1 bg-white/30"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Weather Widget
interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  feelsLike: number;
  location: string;
  highTemp: number;
  lowTemp: number;
  icon: string;
  loading: boolean;
  error: string | null;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData>({
    temp: 0,
    condition: "Loading...",
    humidity: 0,
    windSpeed: 0,
    visibility: 0,
    feelsLike: 0,
    location: "Fetching location...",
    highTemp: 0,
    lowTemp: 0,
    icon: "sun",
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const geoPosition = await new Promise<GeolocationCoordinates>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (position) => resolve(position.coords),
              (error) => reject(error),
            );
          },
        );

        const { latitude, longitude } = geoPosition;

        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`,
        );

        if (!weatherResponse.ok) {
          throw new Error("Weather data fetch failed");
        }

        const weatherData = await weatherResponse.json();

        const geoResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        );

        let locationName = "Your Location";
        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          locationName =
            geoData.address?.city || geoData.address?.county || "Your Location";
        }

        const current = weatherData.current;
        const daily = weatherData.daily;

        const weatherDescription = getWeatherDescription(current.weather_code);
        const weatherIcon = getWeatherIcon(current.weather_code);

        setWeather({
          temp: Math.round(current.temperature_2m),
          condition: weatherDescription,
          humidity: current.relative_humidity_2m,
          windSpeed: Math.round(current.wind_speed_10m),
          visibility: Math.round((current.visibility / 1000) * 10) / 10,
          feelsLike: Math.round(current.apparent_temperature),
          location: locationName,
          highTemp: Math.round(daily.temperature_2m_max[0]),
          lowTemp: Math.round(daily.temperature_2m_min[0]),
          icon: weatherIcon,
          loading: false,
          error: null,
        });
      } catch (err) {
        setWeather((prev) => ({
          ...prev,
          loading: false,
          error: "Unable to fetch weather. Please enable location access.",
          location: "Location not available",
        }));
        console.error("Weather fetch error:", err);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIconComponent = () => {
    switch (weather.icon) {
      case "rain":
        return <CloudRain className="w-6 h-6" />;
      case "cloud":
        return <Cloud className="w-6 h-6" />;
      case "sun":
      default:
        return <Sun className="w-6 h-6" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="backdrop-blur-2xl bg-white/10 rounded-3xl p-3 border border-white/20 shadow-2xl col-span-2 md:col-span-1"
    >
      {weather.error ? (
        <div className="text-white/60 text-sm font-light">{weather.error}</div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="text-white/90">{getWeatherIconComponent()}</div>
            <div>
              <div className="text-2xl font-extralight text-white">
                {weather.temp}°
              </div>
              <div className="text-xs text-white/60 font-light">
                {weather.condition}
              </div>
              <div className="text-xs text-white/50 font-light mt-0.5">
                Feels like {weather.feelsLike}°
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-white/70 text-xs mb-1.5">
              <MapPin className="w-3 h-3" />
              <span className="font-light">{weather.location}</span>
            </div>
            <div className="text-xs text-white/50 font-light mb-1.5">
              H:{weather.highTemp}° L:{weather.lowTemp}°
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <Droplets className="w-3 h-3 text-white/50" />
                <span className="text-white/50">{weather.humidity}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="w-3 h-3 text-white/50" />
                <span className="text-white/50">{weather.windSpeed} km/h</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3 text-white/50" />
                <span className="text-white/50">{weather.visibility} km</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Helper functions
function getWeatherDescription(code: number): string {
  if (code === 0) return "Clear Sky";
  if (code === 1 || code === 2) return "Mostly Clear";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Foggy";
  if (code === 51 || code === 53 || code === 55) return "Light Drizzle";
  if (code === 61 || code === 63 || code === 65) return "Rainy";
  if (code === 71 || code === 73 || code === 75) return "Snowy";
  if (code === 77) return "Snow Grains";
  if (code === 80 || code === 81 || code === 82) return "Rain Showers";
  if (code === 85 || code === 86) return "Snow Showers";
  if (code === 95 || code === 96 || code === 99) return "Thunderstorm";
  return "Cloudy";
}

function getWeatherIcon(code: number): string {
  if (code === 0 || code === 1 || code === 2) return "sun";
  if (code === 3 || code === 45 || code === 48) return "cloud";
  if (
    code === 51 ||
    code === 53 ||
    code === 55 ||
    code === 61 ||
    code === 63 ||
    code === 65 ||
    code === 80 ||
    code === 81 ||
    code === 82 ||
    code === 95 ||
    code === 96 ||
    code === 99
  )
    return "rain";
  if (
    code === 71 ||
    code === 73 ||
    code === 75 ||
    code === 77 ||
    code === 85 ||
    code === 86
  )
    return "snow";
  return "cloud";
}

// Calendar Widget
export function CalendarWidget() {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.toLocaleDateString("en-US", { month: "long" });

  const getDaysInMonth = () => {
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const days = getDaysInMonth();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="backdrop-blur-2xl bg-white/10 rounded-3xl pt-3 pb-1 px-3 border border-white/20 shadow-2xl"
    >
      <div className="text-xs text-white/70 font-medium mb-2 uppercase tracking-wider">
        {currentMonth}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div
            key={i}
            className="text-center text-[10px] text-white/50 font-light mb-0.5"
          >
            {day}
          </div>
        ))}
        {days.map((day, i) => (
          <div
            key={i}
            className={`text-center text-[10px] py-0.5 rounded-lg transition-all ${
              day === currentDay
                ? "bg-white text-slate-900 font-semibold"
                : day
                  ? "text-white/80 font-light"
                  : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
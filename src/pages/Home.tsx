import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Briefcase, User, FileText, Mail, Wrench, Github, Linkedin, Sun, MapPin, Cloud, CloudRain, Wind, Droplets, Eye
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

// Time Widget (replaces Weather)
const TimeWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="backdrop-blur-2xl bg-white/10 rounded-3xl p-4 border border-white/20 shadow-2xl"
    >
      <div className="text-5xl font-extralight text-white tracking-tight mb-1">
        {formatTime(time)}
      </div>
      <div className="text-sm text-white/70 font-light">
        {formatDate(time)}
      </div>
    </motion.div>
  );
};

// Weather Widget - Real Weather Data
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

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData>({
    temp: 0,
    condition: 'Loading...',
    humidity: 0,
    windSpeed: 0,
    visibility: 0,
    feelsLike: 0,
    location: 'Fetching location...',
    highTemp: 0,
    lowTemp: 0,
    icon: 'sun',
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Get user's location
        const geoPosition = await new Promise<GeolocationCoordinates>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (position) => resolve(position.coords),
              (error) => reject(error)
            );
          }
        );

        const { latitude, longitude } = geoPosition;

        // Fetch weather data from Open-Meteo API (free, no key required)
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
        );
        
        if (!weatherResponse.ok) {
          throw new Error('Weather data fetch failed');
        }

        const weatherData = await weatherResponse.json();

        // Get location name using reverse geocoding (using open-meteo or alternative)
        const geoResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        
        let locationName = 'Your Location';
        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          locationName = geoData.address?.city || geoData.address?.county || 'Your Location';
        }

        const current = weatherData.current;
        const daily = weatherData.daily;

        // Convert WMO weather code to description
        const weatherDescription = getWeatherDescription(current.weather_code);
        const weatherIcon = getWeatherIcon(current.weather_code);

        setWeather({
          temp: Math.round(current.temperature_2m),
          condition: weatherDescription,
          humidity: current.relative_humidity_2m,
          windSpeed: Math.round(current.wind_speed_10m),
          visibility: (current.visibility / 1000).toFixed(1),
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
          error: 'Unable to fetch weather. Please enable location access.',
          location: 'Location not available',
        }));
        console.error('Weather fetch error:', err);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIconComponent = () => {
    switch (weather.icon) {
      case 'rain':
        return <CloudRain className="w-8 h-8" />;
      case 'cloud':
        return <Cloud className="w-8 h-8" />;
      case 'sun':
      default:
        return <Sun className="w-8 h-8" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="backdrop-blur-2xl bg-white/10 rounded-3xl p-4 border border-white/20 shadow-2xl col-span-2"
    >
      {weather.error ? (
        <div className="text-white/60 text-sm font-light">{weather.error}</div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-white/90">
              {getWeatherIconComponent()}
            </div>
            <div>
              <div className="text-2xl font-extralight text-white">
                {weather.temp}°
              </div>
              <div className="text-xs text-white/60 font-light">
                {weather.condition}
              </div>
              <div className="text-xs text-white/50 font-light mt-1">
                Feels like {weather.feelsLike}°
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-white/70 text-xs mb-2">
              <MapPin className="w-3 h-3" />
              <span className="font-light">{weather.location}</span>
            </div>
            <div className="text-xs text-white/50 font-light mb-2">
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
};

// Helper function to convert WMO weather codes to descriptions
function getWeatherDescription(code: number): string {
  if (code === 0) return 'Clear Sky';
  if (code === 1 || code === 2) return 'Mostly Clear';
  if (code === 3) return 'Overcast';
  if (code === 45 || code === 48) return 'Foggy';
  if (code === 51 || code === 53 || code === 55) return 'Light Drizzle';
  if (code === 61 || code === 63 || code === 65) return 'Rainy';
  if (code === 71 || code === 73 || code === 75) return 'Snowy';
  if (code === 77) return 'Snow Grains';
  if (code === 80 || code === 81 || code === 82) return 'Rain Showers';
  if (code === 85 || code === 86) return 'Snow Showers';
  if (code === 95 || code === 96 || code === 99) return 'Thunderstorm';
  return 'Cloudy';
}

// Helper function to get weather icon type
function getWeatherIcon(code: number): string {
  if (code === 0 || code === 1 || code === 2) return 'sun';
  if (code === 3 || code === 45 || code === 48) return 'cloud';
  if (
    code === 51 || code === 53 || code === 55 ||
    code === 61 || code === 63 || code === 65 ||
    code === 80 || code === 81 || code === 82 ||
    code === 95 || code === 96 || code === 99
  ) return 'rain';
  if (code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) return 'snow';
  return 'cloud';
}

// Calendar Widget
const CalendarWidget = () => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.toLocaleDateString('en-US', { month: 'long' });
  
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
      className="backdrop-blur-2xl bg-white/10 rounded-3xl p-4 border border-white/20 shadow-2xl"
    >
      <div className="text-xs text-white/70 font-medium mb-3 uppercase tracking-wider">
        {currentMonth}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="text-center text-xs text-white/50 font-light mb-1">
            {day}
          </div>
        ))}
        {days.map((day, i) => (
          <div
            key={i}
            className={`text-center text-xs py-1 rounded-lg transition-all ${
              day === currentDay
                ? 'bg-white text-slate-900 font-semibold'
                : day
                ? 'text-white/80 font-light'
                : ''
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// App Icon Component
const AppIcon = ({ icon: Icon, label, gradient, delay, onClick, id }: {
  icon: any;
  label: string;
  gradient: string;
  delay: number;
  onClick?: () => void;
  id: string;
}) => {
  const iconRef = useRef(null);

  const handleClick = () => {
    // GSAP zoom animation
    const tl = gsap.timeline();
    tl.to(iconRef.current, {
      scale: 1.2,
      duration: 0.2,
      ease: "power2.out"
    }).to(iconRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        // Smooth scroll to section
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: `#${id}`, offsetY: 80 },
          ease: "power3.inOut"
        });
      }
    });

    if (onClick) onClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center gap-2"
    >
      <button
        ref={iconRef}
        onClick={handleClick}
        className={`w-13 h-13 md:w-20 md:h-20 rounded-2xl ${gradient} 
                   shadow-xl hover:shadow-2xl transition-all duration-300
                   active:scale-95 flex items-center justify-center
                   border border-white/20 relative overflow-hidden group`}
      >
        <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Icon className="w-7 h-7 md:w-10 md:h-10 text-white relative z-10" strokeWidth={1.5} />
      </button>
      <span className="text-xs md:text-sm text-white font-light tracking-wide">
        {label}
      </span>
    </motion.div>
  );
};

// Dock Component
const Dock = ({ apps }: { apps: Array<{ icon: any; gradient: string; id: string }> }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="backdrop-blur-2xl bg-white/10 rounded-3xl px-4 py-3 border border-white/20 shadow-2xl">
        <div className="flex items-center gap-4">
          {apps.map((app, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2, y: -8 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                gsap.to(window, {
                  duration: 1,
                  scrollTo: { y: `#${app.id}`, offsetY: 80 },
                  ease: "power3.inOut"
                });
              }}
              className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${app.gradient} 
                         shadow-xl flex items-center justify-center
                         border border-white/20 relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent" />
              <app.icon className="w-6 h-6 md:w-8 md:h-8 text-white relative z-10" strokeWidth={1.5} />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Section Component
const Section = ({ id, title, children, gradient = "from-slate-900 to-slate-800" }: {
  id: string;
  title: string;
  children: React.ReactNode;
  gradient?: string;
}) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`min-h-screen bg-linear-to-br ${gradient} py-20 px-6 md:px-12`}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extralight text-white mb-12 tracking-tight"
        >
          {title}
        </motion.h2>
        {children}
      </div>
    </motion.section>
  );
};

// Main App
export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const apps = [
    { icon: Briefcase, label: 'Projects', gradient: 'bg-gradient-to-br from-blue-500 to-blue-700', id: 'projects' },
    { icon: User, label: 'About Me', gradient: 'bg-gradient-to-br from-purple-500 to-purple-700', id: 'about' },
    { icon: FileText, label: 'Resume', gradient: 'bg-gradient-to-br from-orange-500 to-orange-700', id: 'resume' },
    { icon: Mail, label: 'Contact', gradient: 'bg-gradient-to-br from-green-500 to-green-700', id: 'contact' },
    { icon: Wrench, label: 'Skills', gradient: 'bg-gradient-to-br from-red-500 to-red-700', id: 'skills' },
    { icon: Github, label: 'GitHub', gradient: 'bg-gradient-to-br from-gray-600 to-gray-800', id: 'github' },
    { icon: Linkedin, label: 'LinkedIn', gradient: 'bg-gradient-to-br from-blue-600 to-blue-800', id: 'linkedin' },
  ];

  const dockApps = [
    { icon: Briefcase, gradient: 'bg-gradient-to-br from-blue-500 to-blue-700', id: 'projects' },
    { icon: User, gradient: 'bg-gradient-to-br from-purple-500 to-purple-700', id: 'about' },
    { icon: Mail, gradient: 'bg-gradient-to-br from-green-500 to-green-700', id: 'contact' },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="fixed inset-0 bg-linear-to-br from-slate-900 via-indigo-900 to-purple-900 -z-10"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
      </motion.div>

      {/* Home Screen */}
      <div className="min-h-screen flex flex-col justify-between px-6 pt-8 pb-12 md:px-12">
        <div className="max-w-md mx-auto w-full">
          {/* Widgets Row */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <TimeWidget />
            <CalendarWidget />
          </div>

          {/* Weather Widget */}
          <div className="mb-8">
            <WeatherWidget />
          </div>

          {/* App Grid */}
          <div className="grid grid-cols-4 gap-6 mb-32">
            {apps.map((app, index) => (
              <AppIcon
                key={index}
                icon={app.icon}
                label={app.label}
                gradient={app.gradient}
                delay={0.1 + index * 0.05}
                id={app.id}
              />
            ))}
          </div>
        </div>

        {/* Dock */}
        <Dock apps={dockApps} />
      </div>

      {/* Sections */}
      <Section id="projects" title="Projects" gradient="from-slate-900 to-blue-900">
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((project) => (
            <motion.div
              key={project}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: project * 0.1 }}
              className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="aspect-video bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-2xl mb-4" />
              <h3 className="text-xl font-light text-white mb-2">Project {project}</h3>
              <p className="text-white/60 text-sm font-light leading-relaxed">
                A stunning application built with modern technologies and exceptional attention to detail.
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="about" title="About Me" gradient="from-blue-900 to-purple-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <User className="w-16 h-16 text-white" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-white/80 text-lg font-light leading-relaxed mb-4">
                I'm a creative developer passionate about building beautiful, functional experiences that delight users and solve real problems.
              </p>
              <p className="text-white/60 text-base font-light leading-relaxed">
                With expertise in modern web technologies, I bring ideas to life through clean code and thoughtful design.
              </p>
            </div>
          </div>
        </motion.div>
      </Section>

      <Section id="skills" title="Skills" gradient="from-purple-900 to-pink-900">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'GSAP', 'Framer Motion', 'Next.js', 'GraphQL', 'PostgreSQL'].map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10 text-center hover:bg-white/10 transition-all"
            >
              <span className="text-white font-light">{skill}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="resume" title="Resume" gradient="from-pink-900 to-orange-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10"
        >
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-light text-white mb-4">Experience</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-white/20 pl-6">
                  <div className="text-white/80 font-light">Senior Developer</div>
                  <div className="text-white/60 text-sm font-light">Tech Company • 2022 - Present</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-light text-white mb-4">Education</h3>
              <div className="border-l-2 border-white/20 pl-6">
                <div className="text-white/80 font-light">Computer Science</div>
                <div className="text-white/60 text-sm font-light">University • 2018 - 2022</div>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      <Section id="contact" title="Contact" gradient="from-orange-900 to-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 text-center"
        >
          <Mail className="w-16 h-16 text-white mx-auto mb-6" strokeWidth={1.5} />
          <h3 className="text-2xl font-light text-white mb-4">Let's Connect</h3>
          <p className="text-white/60 mb-8 font-light">
            I'm always open to new opportunities and conversations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@example.com"
              className="px-8 py-3 bg-white text-slate-900 rounded-full font-light hover:bg-white/90 transition-all"
            >
              Email Me
            </a>
            <a
              href="#"
              className="px-8 py-3 backdrop-blur-xl bg-white/10 text-white rounded-full font-light border border-white/20 hover:bg-white/20 transition-all"
            >
              Download Resume
            </a>
          </div>
        </motion.div>
      </Section>

      {/* GitHub Section */}
      <Section id="github" title="GitHub" gradient="from-slate-900 to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 text-center"
        >
          <Github className="w-16 h-16 text-white mx-auto mb-6" strokeWidth={1.5} />
          <p className="text-white/60 mb-6 font-light">
            Check out my open source contributions and projects.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-white text-slate-900 rounded-full font-light hover:bg-white/90 transition-all"
          >
            View GitHub Profile
          </a>
        </motion.div>
      </Section>

      {/* LinkedIn Section */}
      <Section id="linkedin" title="LinkedIn" gradient="from-gray-900 to-blue-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 text-center"
        >
          <Linkedin className="w-16 h-16 text-white mx-auto mb-6" strokeWidth={1.5} />
          <p className="text-white/60 mb-6 font-light">
            Connect with me professionally and stay updated with my journey.
          </p>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-white text-slate-900 rounded-full font-light hover:bg-white/90 transition-all"
          >
            View LinkedIn Profile
          </a>
        </motion.div>
      </Section>
    </div>
  );
}
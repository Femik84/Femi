import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  User, FileText, Mail, Wrench, Github, Linkedin,
  Package
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { TimeWidget, WeatherWidget, CalendarWidget, StatsWidget } from "../components/Widgets"
import { AppIcon, Dock } from '../components/AppComponents';
import { NavigationCard } from '../components/Navigationcard';
import Projects from '../sections/Projects';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Resume from '../sections/Resume';
import Contact from '../sections/Contact';

// Custom X (Twitter) Icon
const XIcon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> = (({ className = '', ...props }: LucideProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)) as any;

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const apps = [
    { icon: Package, label: 'Projects', gradient: 'bg-gradient-to-br from-blue-500 to-blue-700', id: 'projects' },
    { icon: User, label: 'About Me', gradient: 'bg-gradient-to-br from-purple-500 to-purple-700', id: 'about' },
    { icon: FileText, label: 'Resume', gradient: 'bg-gradient-to-br from-orange-500 to-orange-700', id: 'resume' },
    { icon: Mail, label: 'Contact', gradient: 'bg-gradient-to-br from-green-500 to-green-700', id: 'contact' },
    { icon: Wrench, label: 'Skills', gradient: 'bg-gradient-to-br from-red-500 to-red-700', id: 'skills' },
    { icon: Github, label: 'GitHub', gradient: 'bg-gradient-to-br from-gray-600 to-gray-800', id: 'github' },
    { icon: Linkedin, label: 'LinkedIn', gradient: 'bg-gradient-to-br from-blue-600 to-blue-800', id: 'linkedin' },
    { icon: XIcon, label: 'X', gradient: 'bg-gradient-to-br from-gray-800 to-black', id: 'twitter' },
  ];

  const topNavigationCards = [
    { 
      icon: Package, 
      label: 'Projects', 
      gradient: 'from-blue-500 to-blue-700', 
      id: 'projects' 
    },
    { 
      icon: User, 
      label: 'About', 
      gradient: 'from-purple-500 to-purple-700', 
      id: 'about' 
    },
    { 
      icon: Wrench, 
      label: 'Skills', 
      gradient: 'from-red-500 to-red-700', 
      id: 'skills' 
    },
    { 
      icon: FileText, 
      label: 'Resume', 
      gradient: 'from-orange-500 to-orange-700', 
      id: 'resume' 
    },
  ];

  const bottomNavigationCards = [
    { 
      icon: Mail, 
      label: 'Contact', 
      gradient: 'from-green-500 to-green-700', 
      id: 'contact' 
    },
    { 
      icon: Github, 
      label: 'GitHub', 
      gradient: 'from-gray-600 to-gray-800', 
      id: 'github' 
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      gradient: 'from-blue-600 to-blue-800', 
      id: 'linkedin' 
    },
    { 
      icon: XIcon, 
      label: 'X', 
      gradient: 'from-gray-800 to-black', 
      id: 'twitter' 
    },
  ];

  const dockApps = [
    { icon: Package, gradient: 'bg-gradient-to-br from-blue-500 to-blue-700', id: 'projects' },
    { icon: Mail, gradient: 'bg-gradient-to-br from-green-500 to-green-700', id: 'contact' },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Animated Background - Fixed positioning without parallax gap */}
      <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 -z-10" />
      
      <motion.div
        style={{ y: backgroundY }}
        className="fixed inset-0 w-full h-[120vh] bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 -z-10"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
      </motion.div>

      {/* Home Screen */}
      <div className="min-h-screen flex flex-col justify-between px-6 pt-8 pb-32 md:px-12 md:pb-8">
        {/* Mobile Layout (< 768px) - Original Design */}
        <div className="md:hidden max-w-md mx-auto w-full">
          {/* Widgets Row */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-4">
              <TimeWidget />
              <StatsWidget />
            </div>
            <CalendarWidget />
          </div>

          {/* Weather Widget */}
          <div className="mb-8">
            <WeatherWidget />
          </div>

          {/* App Grid */}
          <div className="grid grid-cols-4 gap-6">
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

        {/* Desktop Layout (>= 768px) - New Design */}
        <div className="hidden md:flex items-center justify-center min-h-[calc(100vh-12rem)] max-w-6xl mx-auto w-full gap-8 lg:gap-12">
          {/* Left Side - Widgets */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0 w-[380px] space-y-6"
          >
            {/* Top Row - Time and Stats */}
            <div className="grid grid-cols-2 gap-4">
              <TimeWidget />
              <StatsWidget />
            </div>

            {/* Calendar Widget */}
            <CalendarWidget />

            {/* Weather Widget */}
            <WeatherWidget />
          </motion.div>

          {/* Right Side - Navigation Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-shrink-0 w-[380px] space-y-6"
          >
            {/* Top 4 Cards */}
            <div className="grid grid-cols-2 gap-4">
              {topNavigationCards.map((card, index) => (
                <NavigationCard
                  key={index}
                  icon={card.icon}
                  label={card.label}
                  gradient={card.gradient}
                  id={card.id}
                  delay={0.1 + index * 0.05}
                />
              ))}
            </div>

            {/* Bottom 4 Cards */}
            <div className="grid grid-cols-4 gap-4">
              {bottomNavigationCards.map((card, index) => (
                <NavigationCard
                  key={index}
                  icon={card.icon}
                  label={card.label}
                  gradient={card.gradient}
                  id={card.id}
                  delay={0.3 + index * 0.05}
                  size="small"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dock - Fixed at bottom */}
      <Dock apps={dockApps} />

      {/* All Sections */}
      <div id="projects">
        <Projects />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="resume">
        <Resume />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}
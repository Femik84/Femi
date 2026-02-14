import { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Home } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollToPlugin);

// Type definitions
interface AppIconProps {
  icon: LucideIcon;
  label: string;
  gradient: string;
  delay: number;
  onClick?: () => void;
  id: string;
}

interface DockApp {
  icon: LucideIcon;
  gradient: string;
  id: string;
}

interface DockProps {
  apps: DockApp[];
}

// App Icon Component
export function AppIcon({ icon: Icon, label, gradient, delay, onClick, id }: AppIconProps) {
  const iconRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
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
  className="p-2 rounded-4xl bg-white/5 backdrop-blur-md 
             border border-white/10 inline-flex 
             hover:bg-white/10 transition-all duration-300"
>
  <div
    className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl ${gradient}
      shadow-md flex items-center justify-center
      border border-white/20 relative overflow-hidden group`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent 
                    opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300" />
    
    <Icon
      className="w-6 h-6 md:w-7 md:h-7 text-white relative z-10"
      strokeWidth={2}
    />
  </div>
</button>

      <span className="text-xs md:text-sm text-white font-light tracking-wide">
        {label}
      </span>
    </motion.div>
  );
}

// Dock Component
export function Dock({ apps }: DockProps) {
  const homeRef = useRef<HTMLButtonElement>(null);
  const firstAppRef = useRef<HTMLButtonElement>(null);
  const secondAppRef = useRef<HTMLButtonElement>(null);

  // Destructure icons from apps array
  const FirstIcon = apps[0].icon;
  const SecondIcon = apps[1].icon;

  const handleHomeClick = () => {
    if (!homeRef.current) return;
    
    const tl = gsap.timeline();
    tl.to(homeRef.current, {
      scale: 0.8,
      duration: 0.15,
      ease: "power2.in"
    }).to(homeRef.current, {
      scale: 1.3,
      duration: 0.2,
      ease: "power2.out"
    }).to(homeRef.current, {
      scale: 1,
      duration: 0.15,
      ease: "elastic.out(1.5, 0.5)",
      onComplete: () => {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: 0 },
          ease: "power3.inOut"
        });
      }
    });
  };

  const handleFirstAppClick = () => {
    if (!firstAppRef.current) return;
    
    const tl = gsap.timeline();
    tl.to(firstAppRef.current, {
      scale: 0.85,
      duration: 0.1,
      ease: "power2.in"
    }).to(firstAppRef.current, {
      scale: 1,
      duration: 0.15,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: `#${apps[0].id}`, offsetY: 80 },
          ease: "power3.inOut"
        });
      }
    });
  };

  const handleSecondAppClick = () => {
    if (!secondAppRef.current) return;
    
    const tl = gsap.timeline();
    tl.to(secondAppRef.current, {
      scale: 0.85,
      duration: 0.1,
      ease: "power2.in"
    }).to(secondAppRef.current, {
      scale: 1,
      duration: 0.15,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: `#${apps[1].id}`, offsetY: 80 },
          ease: "power3.inOut"
        });
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="relative pb-4">
        {/* Floating Home Icon - Above the dock */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-5 z-10">
          <motion.button
            ref={homeRef}
            whileHover={{ scale: 1.15, y: -8 }}
            whileTap={{ scale: 0.9 }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 17,
              delay: 0.7
            }}
            onClick={handleHomeClick}
            className="relative group"
          >
            <div className="p-2 rounded-4xl bg-white/10 backdrop-blur-xl border border-white/20 inline-flex shadow-2xl">
              <div
                className="w-12 h-12 md:w-16 md:h-16 rounded-3xl 
                           bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
                           shadow-2xl flex items-center justify-center
                           border border-white/30 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-tl from-white/20 to-transparent" />
                <Home
                  className="w-7 h-7 md:w-9 md:h-9 text-white relative z-10 drop-shadow-lg"
                  strokeWidth={2.5}
                />
              </div>
            </div>

            {/* Glow effects */}
            <div className="absolute inset-0 rounded-[1.4rem] bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-70 blur-xl transition-opacity duration-300 -z-10" />
            <div className="absolute inset-0 rounded-[1.4rem] bg-gradient-to-br from-indigo-400/40 via-purple-400/40 to-pink-400/40 opacity-60 blur-lg -z-10 animate-pulse" />
            
            {/* Connecting line to dock */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-white/30 to-transparent" />
          </motion.button>
        </div>

        {/* Main Dock Container */}
        <div className="backdrop-blur-3xl bg-white/5 rounded-[2.5rem] px-5 py-2 border border-white/10 shadow-2xl">
          <div className="flex items-center gap-5">
            {/* First App Icon */}
            <motion.button
              ref={firstAppRef}
              whileHover={{ scale: 1.15, y: -10 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={handleFirstAppClick}
              className="relative group"
            >
              <div className="p-2 rounded-4xl bg-white/5 backdrop-blur-md border border-white/10 inline-flex">
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl ${apps[0].gradient}
                    shadow-md flex items-center justify-center
                    border border-white/20 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <FirstIcon
                    className="w-6.5 h-6.5 md:w-7 md:h-7 text-white relative z-10"
                    strokeWidth={2}
                  />
                </div>
              </div>
            </motion.button>

            {/* Spacer for center home position */}
            <div className="w-12 md:w-14" />

            {/* Second App Icon */}
            <motion.button
              ref={secondAppRef}
              whileHover={{ scale: 1.15, y: -10 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={handleSecondAppClick}
              className="relative group"
            >
              <div className="p-2 rounded-4xl bg-white/5 backdrop-blur-md border border-white/10 inline-flex">
                <div
                  className={`w-9 h-9 md:w-12 md:h-12 rounded-2xl ${apps[1].gradient}
                    shadow-md flex items-center justify-center
                    border border-white/20 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <SecondIcon
                    className="w-6 h-6 md:w-7 md:h-7 text-white relative z-10"
                    strokeWidth={2}
                  />
                </div>
              </div>
            </motion.button>
          </div>
        </div>
        
        {/* Subtle reflection effect */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-gradient-to-b from-white/5 to-transparent rounded-[2.5rem] blur-md -z-10" />
      </div>
    </motion.div>
  );
}
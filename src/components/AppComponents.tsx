import { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

// App Icon Component
export function AppIcon({ icon: Icon, label, gradient, delay, onClick, id }: {
  icon: any;
  label: string;
  gradient: string;
  delay: number;
  onClick?: () => void;
  id: string;
}) {
  const iconRef = useRef(null);

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
}

// Dock Component
export function Dock({ apps }: { apps: Array<{ icon: any; gradient: string; id: string }> }) {
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
}
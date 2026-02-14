import { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollToPlugin);

interface NavigationCardProps {
  icon: LucideIcon;
  label: string;
  gradient: string;
  id: string;
  delay: number;
  size?: 'default' | 'small';
}

export function NavigationCard({ 
  icon: Icon, 
  label, 
  gradient, 
  id, 
  delay,
  size = 'default'
}: NavigationCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (!cardRef.current) return;

    const tl = gsap.timeline();
    tl.to(cardRef.current, {
      scale: 0.95,
      duration: 0.15,
      ease: "power2.in"
    }).to(cardRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        if (id === 'github') {
          window.open('https://github.com/yourusername', '_blank');
        } else if (id === 'linkedin') {
          window.open('https://linkedin.com/in/yourusername', '_blank');
        } else if (id === 'twitter') {
          window.open('https://twitter.com/yourusername', '_blank');
        } else {
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: `#${id}`, offsetY: 80 },
            ease: "power3.inOut"
          });
        }
      }
    });
  };

  if (size === 'small') {
    return (
      <motion.button
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay }}
        onClick={handleClick}
        className="group relative overflow-hidden backdrop-blur-2xl bg-white/5 
                   rounded-2xl p-3 border border-white/10 shadow-2xl
                   hover:bg-white/10 transition-all duration-300
                   flex flex-col items-center gap-2"
      >
        {/* Gradient overlay on hover */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 
                      group-hover:opacity-10 transition-opacity duration-300`}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Icon */}
          <div 
            className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${gradient}
                        shadow-lg group-hover:scale-110 
                        transition-transform duration-300`}
          >
            <Icon className="w-5 h-5 text-white" strokeWidth={2} />
          </div>

          {/* Text */}
          <span className="text-white text-xs font-light mt-2 
                          group-hover:text-white/90 transition-colors">
            {label}
          </span>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent 
                          via-white/5 to-transparent translate-x-[-100%] 
                          group-hover:translate-x-[100%] transition-transform 
                          duration-1000" />
        </div>

        {/* Border glow effect */}
        <div 
          className={`absolute inset-0 rounded-2xl opacity-0 
                      group-hover:opacity-30 transition-opacity duration-300
                      bg-gradient-to-br ${gradient} blur-lg -z-10`}
        />
      </motion.button>
    );
  }

  return (
    <motion.button
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={handleClick}
      className="group relative overflow-hidden backdrop-blur-2xl bg-white/5 
                 rounded-2xl p-4 border border-white/10 shadow-2xl
                 hover:bg-white/10 transition-all duration-300
                 flex flex-col items-center justify-center text-center
                 h-full"
    >
      {/* Gradient overlay on hover */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 
                    group-hover:opacity-10 transition-opacity duration-300`}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Icon */}
        <div 
          className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient}
                      shadow-lg mb-3 group-hover:scale-110 
                      transition-transform duration-300`}
        >
          <Icon className="w-6 h-6 text-white" strokeWidth={2} />
        </div>

        {/* Text */}
        <h3 className="text-white font-medium text-base
                      group-hover:text-white/90 transition-colors">
          {label}
        </h3>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent 
                        via-white/5 to-transparent translate-x-[-100%] 
                        group-hover:translate-x-[100%] transition-transform 
                        duration-1000" />
      </div>

      {/* Border glow effect */}
      <div 
        className={`absolute inset-0 rounded-2xl opacity-0 
                    group-hover:opacity-40 transition-opacity duration-300
                    bg-gradient-to-br ${gradient} blur-xl -z-10`}
      />
    </motion.button>
  );
}
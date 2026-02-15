import React from 'react';
import { motion } from 'framer-motion';

export function Section({ id, title, children, gradient = "from-slate-900 to-slate-800" }: {
  id: string;
  title: string;
  children: React.ReactNode;
  gradient?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`min-h-screen bg-gradient-to-br ${gradient} py-20 px-6 md:px-12`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              {title}
            </span>
          </motion.h2>
          
          <motion.div 
            className="flex items-center gap-3 max-w-md"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Decorative dots */}
            <motion.div 
              className="flex gap-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <div className="w-2 h-2 rounded-full bg-pink-400" />
            </motion.div>
            
            {/* Animated gradient line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 h-0.5 bg-gradient-to-r from-blue-400/60 via-purple-400/60 to-transparent origin-left"
            />
            
            {/* Glowing accent */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 blur-sm"
            />
          </motion.div>
        </div>
        
        {children}
      </div>
    </motion.section>
  );
}
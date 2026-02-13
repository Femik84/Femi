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
}
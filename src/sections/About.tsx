import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { Section } from './Section';

export default function About() {
  return (
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
  );
}
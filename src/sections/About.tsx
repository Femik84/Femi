import { motion } from 'framer-motion';
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
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl"
          >
            <motion.img
              src="/Femi.jpg"
              alt="Kayode Femi"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
          </motion.div>
          
          <div className="flex-1 space-y-4">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl font-semibold text-white"
            >
              Femi Kayode 
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-white/90 text-lg leading-relaxed"
            >
              I'm a Full Stack Developer specializing in building scalable applications 
              that transform innovative ideas into real-world solutions. With expertise in{' '}
              <span className="text-blue-300 font-semibold">React</span>,{' '}
              <span className="text-blue-300 font-semibold">React Native</span>, and{' '}
              <span className="text-green-300 font-semibold">Django</span>, I create 
              seamless experiences across web and mobile platforms.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-white/75 text-base leading-relaxed"
            >
              From pixel-perfect interfaces to robust backend systems, I bring a 
              holistic approach to every project, ensuring quality and performance 
              at every layer of the stack.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
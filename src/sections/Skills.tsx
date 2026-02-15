import { motion } from 'framer-motion';
import { Section } from './Section';

export default function Skills() {
  const frontendSkills = [
    'HTML5', 'CSS3', 'JavaScript', 
    'React', 'React Native', 'Next.js', 
    'Tailwind CSS', 'Figma'
  ];

  const backendSkills = [
    'Python', 'Django', 'Node.js',
    'Express', 'PostgreSQL', 'REST API'
  ];

  return (
    <Section id="skills" title="Skills" gradient="from-purple-900 to-pink-900">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Frontend Skills */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4"
          >
            Frontend
          </motion.h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {frontendSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-3 border border-blue-400/20 text-center hover:border-blue-400/40 transition-all shadow-lg hover:shadow-blue-500/20"
              >
                <span className="text-white font-semibold text-sm">{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Backend Skills */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-4"
          >
            Backend
          </motion.h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
            {backendSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-3 border border-green-400/20 text-center hover:border-green-400/40 transition-all shadow-lg hover:shadow-green-500/20"
              >
                <span className="text-white font-semibold text-sm">{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
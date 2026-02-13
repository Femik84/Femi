import { motion } from 'framer-motion';
import { Section } from './Section';

export default function Skills() {
  const skills = [
    'React', 'TypeScript', 'Tailwind CSS', 
    'Node.js', 'GSAP', 'Framer Motion', 
    'Next.js', 'GraphQL', 'PostgreSQL'
  ];

  return (
    <Section id="skills" title="Skills" gradient="from-purple-900 to-pink-900">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
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
  );
}
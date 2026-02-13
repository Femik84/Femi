import { motion } from 'framer-motion';
import { Section } from './Section';

export default function Projects() {
  return (
    <Section id="projects" title="Projects" gradient="from-slate-900 to-blue-900">
      <div className="grid md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((project) => (
          <motion.div
            key={project}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: project * 0.1 }}
            className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="aspect-video bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-2xl mb-4" />
            <h3 className="text-xl font-light text-white mb-2">Project {project}</h3>
            <p className="text-white/60 text-sm font-light leading-relaxed">
              A stunning application built with modern technologies and exceptional attention to detail.
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
import { motion } from 'framer-motion';
import { Section } from './Section';

export default function Resume() {
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Fintech Company",
      period: "2023 - 2025",
      type: "Contract"
    },
    {
      title: "Mobile Developer",
      company: "Tech Agency",
      period: "2022 - 2023",
      type: "Contract"
    },
    {
      title: "Web Developer",
      company: "Various Clients",
      period: "2021 - Present",
      type: "Freelance"
    }
  ];

  return (
    <Section id="resume" title="Resume" gradient="from-pink-900 to-orange-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10"
      >
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-12">
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold text-white mb-6"
            >
              Experience
            </motion.h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-l-2 border-white/20 pl-6 hover:border-white/40 transition-colors"
                >
                  <div className="text-white font-semibold text-lg">{exp.title}</div>
                  <div className="text-white/70 text-sm mt-1">
                    {exp.company} • {exp.period}
                  </div>
                  <div className="text-white/50 text-xs mt-1 inline-block bg-white/10 px-2 py-1 rounded">
                    {exp.type}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl font-semibold text-white mb-6"
            >
              Education
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="border-l-2 border-white/20 pl-6 hover:border-white/40 transition-colors"
            >
              <div className="text-white font-semibold text-lg">Accounting</div>
              <div className="text-white/70 text-sm mt-1">Polytechnic • 2018 - 2022</div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
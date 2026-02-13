import { motion } from 'framer-motion';
import { Section } from './Section';

export default function Resume() {
  return (
    <Section id="resume" title="Resume" gradient="from-pink-900 to-orange-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10"
      >
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-light text-white mb-4">Experience</h3>
            <div className="space-y-4">
              <div className="border-l-2 border-white/20 pl-6">
                <div className="text-white/80 font-light">Senior Developer</div>
                <div className="text-white/60 text-sm font-light">Tech Company • 2022 - Present</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-light text-white mb-4">Education</h3>
            <div className="border-l-2 border-white/20 pl-6">
              <div className="text-white/80 font-light">Computer Science</div>
              <div className="text-white/60 text-sm font-light">University • 2018 - 2022</div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Section } from './Section';

export default function Contact() {
  return (
    <Section id="contact" title="Contact" gradient="from-orange-900 to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 text-center"
      >
        <Mail className="w-16 h-16 text-white mx-auto mb-6" strokeWidth={1.5} />
        <h3 className="text-2xl font-light text-white mb-4">Let's Connect</h3>
        <p className="text-white/60 mb-8 font-light">
          I'm always open to new opportunities and conversations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:hello@example.com"
            className="px-8 py-3 bg-white text-slate-900 rounded-full font-light hover:bg-white/90 transition-all"
          >
            Email Me
          </a>
          <a
            href="#"
            className="px-8 py-3 backdrop-blur-xl bg-white/10 text-white rounded-full font-light border border-white/20 hover:bg-white/20 transition-all"
          >
            Download Resume
          </a>
        </div>
      </motion.div>
    </Section>
  );
}
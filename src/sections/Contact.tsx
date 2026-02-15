import { motion } from 'framer-motion';
import { Mail, Github, Twitter, Linkedin, Send, X } from 'lucide-react';
import { Section } from './Section';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [buttonText, setButtonText] = useState("Send Message");
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setButtonText("Sending...");

    const templateParams = {
      firstName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      message: `${formData.subject}\n\n${formData.message}`,
    };

    try {
      console.log("Sending to receiver...");
      await emailjs.send(
        "service_w27va0i",
        "template_nu1ti4f",
        templateParams,
        "0ZguZ331NCdgDPrpu",
      );
      console.log("Receiver email sent successfully");

      console.log("Sending to sender...");
      await emailjs.send(
        "service_w27va0i",
        "template_o8d38ie",
        templateParams,
        "0ZguZ331NCdgDPrpu",
      );
      console.log("Sender email sent successfully");

      setStatus("Message sent successfully!");
      setButtonText("Message sent!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setButtonText("Send Message");
      }, 2000);
    } catch (error: any) {
      console.error("EmailJS Error Details:", error);
      console.error("Error message:", error.text || error.message);
      console.error("Error status:", error.status);
      setStatus(`Error: ${error.text || error.message || "Please try again"}`);
      setButtonText("Send Message");
    }

    setIsSending(false);

    setTimeout(() => {
      setStatus("");
    }, 5000);
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:hello@example.com',
      color: 'hover:bg-orange-500'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/yourusername',
      color: 'hover:bg-blue-600'
    },
    {
       name: 'X',
      icon: X,
      url: 'https://twitter.com/yourusername',
      color: 'hover:bg-blue-500'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/yourusername',
      color: 'hover:bg-gray-700'
    }
  ];

  return (
    <Section id="contact" title="Contact" gradient="from-orange-900 to-slate-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h3 className="text-3xl md:text-5xl font-light text-white mb-3 tracking-wide">
            Let's Connect
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-white mx-auto rounded-full"></div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label htmlFor="firstName" className="block text-white/80 font-light mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-light"
                  placeholder="John"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label htmlFor="lastName" className="block text-white/80 font-light mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-light"
                  placeholder="Doe"
                />
              </motion.div>
            </div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label htmlFor="email" className="block text-white/80 font-light mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-light"
                placeholder="john.doe@example.com"
              />
            </motion.div>

            {/* Subject */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label htmlFor="subject" className="block text-white/80 font-light mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-light"
                placeholder="Project Inquiry"
              />
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label htmlFor="message" className="block text-white/80 font-light mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-light resize-none"
                placeholder="Tell me about your project or idea..."
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <motion.button
                type="submit"
                disabled={isSending}
                whileHover={{ scale: isSending ? 1 : 1.02 }}
                whileTap={{ scale: isSending ? 1 : 0.98 }}
                className={`w-full px-8 py-4 bg-white text-slate-900 rounded-xl font-light hover:bg-white/90 transition-all flex items-center justify-center gap-2 ${
                  isSending ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                <Send className="w-5 h-5" strokeWidth={1.5} />
                {buttonText}
              </motion.button>
            </motion.div>

            {/* Status Message */}
            {status && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center py-3 px-4 rounded-xl ${
                  status.includes('Error')
                    ? 'bg-red-500/20 text-red-200 border border-red-500/30'
                    : 'bg-green-500/20 text-green-200 border border-green-500/30'
                }`}
              >
                {status}
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Other Ways to Connect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 mb-12"
        >
          <h4 className="text-center text-white/60 font-light relative bottom-8 text-lg mb-4">
            Other ways to connect
          </h4>
          
          <div className="flex justify-center relative bottom-9 gap-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`backdrop-blur-xl bg-white/10 p-1.5 rounded-full border border-white/20 transition-all ${social.color}`}
                aria-label={social.name}
              >
                <social.icon className="w-4 h-4 text-white" strokeWidth={1.5} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
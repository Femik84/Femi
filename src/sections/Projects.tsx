import { motion } from 'framer-motion';
import { Section } from './Section';
import { useState } from 'react';
import { ExternalLink, Download, X } from 'lucide-react';

const portfolioData = {
  web: [
    {
      id: 1,
      name: 'Fade & Finishes',
      description: 'Modern salon & barber booking with gallery and appointment scheduling',
      fullDescription:
        'Fade & Finishes is a polished beauty and barber salon web experience that allows clients to browse services (hair styling, barbering, pedicures, manicures, etc.), explore high-quality service galleries, check availability, and book appointments online. Built for responsiveness and conversion, it focuses on clear service presentation, smooth booking flows, and visual inspiration to help users pick the right stylist or treatment.',
      image: '/Fade-Finishes.png',
      liveUrl: 'https://fade-and-finishes-frontend-f1ys.vercel.app/'
    },
    {
      id: 2,
      name: 'Wavify',
      description: 'Music discovery & playlist experience with clean, immersive UI',
      fullDescription:
        'Wavify is a modern music app centered on discovery, playlists, and effortless listening. Users can explore new releases and curated picks, build and manage personal playlists, and enjoy a minimal, responsive player interface that keeps listening smooth and delightful. Wavify emphasizes curated recommendations, quick access to trending tracks, and a cohesive playback experience across devices.',
      image: '/Wavify2.png',
      liveUrl: 'https://wavify-alpha.vercel.app/'
    }
  ],
  mobile: [
    {
      id: 1,
      name: 'Chattr',
      description: 'Social media app to post, follow, message and get instant notifications',
      fullDescription:
        'Chattr is a real-time social media experience where users can create posts, follow friends, maintain profiles, and message each other instantly. The app includes push notifications for new messages and interactions, clean feed and profile views, and a fast messaging flow so conversations stay snappy and engaging.',
      image: '/Chattr.png',
      apkUrl: 'https://pub-77bd1bed47ae42bc8acaac50a411c9ef.r2.dev/Chattr.apk',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.femik.chattr'
    },
    {
      id: 2,
      name: 'Ledgerly',
      description: 'Expense & budget tracker with spending insights and alerts',
      fullDescription:
        'Ledgerly helps users create budgets, record and categorize expenses, and visualize spending trends with clear charts and statistics. It provides budget alerts and notifications tied to spending thresholds, helping users stay on track financially with insightful summaries and easy transaction entry.',
      image: '/Ledgerly.png',
      apkUrl: 'https://pub-77bd1bed47ae42bc8acaac50a411c9ef.r2.dev/Ledgerly.apk',
      playStoreUrl: ''
    },
    {
      id: 3,
      name: 'FastCart',
      description: 'E‑commerce app for gadgets with Stripe payments and order tracking',
      fullDescription:
        'FastCart is a streamlined e‑commerce app focused on gadgets and electronics. Users can browse products, search for items, complete secure Stripe-powered checkouts, and view order details and status updates. FastCart emphasizes quick product discovery, clear order flows, and easy post-purchase tracking.',
      image: '/FastCart.png',
      apkUrl: 'https://pub-77bd1bed47ae42bc8acaac50a411c9ef.r2.dev/FastCart.apk',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.ayo234.Fastcart_'
    }
  ]
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [currentDownloadApp, setCurrentDownloadApp] = useState<any>(null);

  const handleDownloadClick = (app: any) => {
    setCurrentDownloadApp(app);
    setShowDownloadModal(true);
  };

  return (
    <Section id="projects" title="Projects" gradient="from-slate-900 to-blue-900">
      <div className="space-y-12">
        {/* Web Apps Section */}
        <div>
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                <span className="lg:hidden">Web Apps</span>
                <span className="hidden lg:inline">Web Applications</span>
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            </div>
            <p className="text-center text-white/50 text-sm font-medium">Full-stack web experiences</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {portfolioData.web.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="backdrop-blur-xl bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all group"
              >
                {/* Image at top */}
                <div className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Description at bottom */}
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-white mb-2">{project.name}</h4>
                  <p className="text-white/70 text-sm font-medium leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition-all"
                    >
                      View Details
                    </button>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-white text-sm font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={16} />
                      View Live
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Apps Section */}
        <div>
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                <span className="lg:hidden">Mobile Apps</span>
                <span className="hidden lg:inline">Mobile Applications</span>
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
            </div>
            <p className="text-center text-white/50 text-sm font-medium">Native Android experiences</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {portfolioData.mobile.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="backdrop-blur-xl bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all group"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image on left */}
                  <div className="w-full md:w-48 flex-shrink-0">
                    <div className="h-64 md:h-80 overflow-hidden">
                      <img
                        src={app.image}
                        alt={app.name}
                        className="w-full h-full pt-4 md:pb-3 object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Description on right */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">{app.name}</h4>
                      <p className="text-white/70 text-sm font-medium leading-relaxed mb-4">
                        {app.description}
                      </p>
                    </div>

                    {/* Buttons - Side by side on small screens, stacked on large screens */}
                    <div className="flex flex-row lg:flex-col gap-3">
                      <button
                        onClick={() => setSelectedProject(app)}
                        className="flex-1 lg:w-full px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition-all"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDownloadClick(app)}
                        className="flex-1 lg:w-full px-4 py-2 rounded-xl bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-white text-sm font-medium transition-all flex items-center justify-center gap-2"
                      >
                        <Download size={16} />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Details Modal - No Image, just description and action button */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-900 rounded-3xl max-w-2xl w-full border border-white/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold text-white">{selectedProject.name}</h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
              
              <p className="text-white/80 text-base font-medium leading-relaxed mb-8">
                {selectedProject.fullDescription}
              </p>

              {/* Action Button */}
              {selectedProject.liveUrl ? (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-white text-base font-semibold transition-all text-center flex items-center justify-center gap-2"
                >
                  <ExternalLink size={18} />
                  View Live Project
                </a>
              ) : (
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    handleDownloadClick(selectedProject);
                  }}
                  className="block w-full px-6 py-3 rounded-xl bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-white text-base font-semibold transition-all text-center flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Download App
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Download Modal */}
      {showDownloadModal && currentDownloadApp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowDownloadModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-slate-900 rounded-3xl max-w-md w-full border border-white/10 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white mb-4">Download {currentDownloadApp.name}</h3>
            <div className="space-y-3">
              <a
                href={currentDownloadApp.apkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-white text-sm font-semibold transition-all text-center"
              >
                Download APK
              </a>
              {currentDownloadApp.playStoreUrl && (
                <a
                  href={currentDownloadApp.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-3 rounded-xl bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-white text-sm font-semibold transition-all text-center"
                >
                  Download from Play Store
                </a>
              )}
              <button
                onClick={() => setShowDownloadModal(false)}
                className="block w-full px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </Section>
  );
}
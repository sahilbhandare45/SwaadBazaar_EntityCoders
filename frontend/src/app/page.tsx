'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaUsers, FaMapMarkedAlt, FaBrain, FaStar, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function LandingPage() {
  const navItems = ['Home', 'Features', 'How It Works', 'Team', 'Contact'];

  return (
    <>
      {/* Navbar */}
      <header className="w-full fixed top-0 left-0 z-50 bg-white/10 border-b border-white/20 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="SwaadBazaar Logo" width={40} height={40} className="rounded-full" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-black tracking-wide">SwaadBazaar</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                className="text-black/80 hover:text-[#4ade80] transition relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#4ade80] hover:after:w-full after:transition-all after:duration-300"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 bg-[#fcfbf7] text-gray-900">
        {/* Hero Section */}
        <section id="home" className="w-full bg-[#fef8f4] py-24 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            <div>
              <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6 flex flex-wrap text-center md:text-left">
                {'Smart Supply Chain for Street Food Vendors'.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="inline-block mr-2 text-black"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-lg mb-8 text-black/80 text-center md:text-left"
              >
                Buy in bulk. Source locally. Forecast with AI. Transform your street food business with SwaadBazaar.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex gap-4 flex-wrap justify-center md:justify-start"
              >
               <a href="/login">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px #ff3926' }}
                  whileTap={{ scale: 0.95 }}         
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative px-6 py-3 rounded-full bg-[#ff4e3d]/90 text-white font-semibold backdrop-blur-lg hover:bg-[#ff4e3d] hover:text-black transition-shadow duration-300 shadow-lg"
                >
                  Get Started
                  <span className="absolute inset-0 rounded-full border border-white/10 backdrop-blur-sm pointer-events-none -z-10" />
                </motion.button>
                </a>
               
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 12px #94a3b8' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative px-6 py-3 rounded-full border border-[#94a3b8]/50 text-black hover:bg-white/10 backdrop-blur-md transition-shadow duration-300 shadow-sm"
                >
                  Learn More
                  <span className="absolute inset-0 rounded-full border border-white/5 backdrop-blur-sm pointer-events-none -z-10" />
                </motion.button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <Image
                src="/vendorpic.png"
                alt="Vendor"
                width={620}
                height={620}
                className="w-full h-auto rounded-lg object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold">Why SwaadBazaar?</h2>
            <p className="mt-4 text-gray-600">Everything a food vendor needs to grow smarter and faster.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-white/50 border border-[#fde8dc] p-6 rounded-xl text-center backdrop-blur-md shadow hover:shadow-md transition"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-3xl text-[#ff4e3d] mb-4">
                    <Icon className="inline-block" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                  <p className="text-gray-600">{f.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 px-6 bg-[#fef8f4]">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3 text-center max-w-5xl mx-auto">
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/60 p-6 rounded-xl shadow hover:shadow-lg transition border backdrop-blur-md"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-[#ff4e3d]/20 text-[#ff4e3d] rounded-full flex items-center justify-center text-2xl font-bold">
                  {i + 1}
                </div>
                <h4 className="text-lg font-semibold mb-1">{step.title}</h4>
                <p className="text-sm text-gray-700">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section id="team" className="py-20 px-6 bg-white text-center">
          <h2 className="text-3xl font-bold mb-10">Meet the Team</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="p-6 bg-white/50 border border-[#fde8dc] rounded-xl shadow text-center backdrop-blur-md hover:shadow-md transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Image src={member.photo} alt={member.name} width={80} height={80} className="rounded-full mx-auto mb-3" />
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
                <div className="flex justify-center gap-3 mt-2">
                  <a href={member.linkedin}><FaLinkedin /></a>
                  <a href={member.github}><FaGithub /></a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#fef8f4] text-center text-sm py-6 text-gray-600">
          <div className="mb-2">
            <a href="#" className="mx-3 hover:underline">Privacy</a>
            <a href="#" className="mx-3 hover:underline">Terms</a>
            <a href="#" className="mx-3 hover:underline">Contact</a>
          </div>
          <p>&copy; 2025 SwaadBazaar. All rights reserved.</p>
        </footer>

        {/* Floating CTA */}
        <a href="/login">
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50 bg-[#ff4e3d]/20 border border-[#ff4e3d]/30 backdrop-blur-md text-[#ff4e3d] px-6 py-3 rounded-full shadow-lg hover:bg-[#ff4e3d]/40 hover:text-white hover:scale-105 transition-all duration-300"
        >
          Get Started
        </motion.button>
        </a>
      </main>
    </>
  );
}

// Data
const features = [
  { title: 'Group Buying', description: 'Vendors team up to buy in bulk and save costs.', icon: FaUsers },
  { title: 'Hyperlocal Suppliers', description: 'Find nearby trusted raw material sources.', icon: FaMapMarkedAlt },
  { title: 'Smart Forecasting', description: 'AI predicts your demand for next 7 days.', icon: FaBrain },
  { title: 'Trusted Reviews', description: 'Vendors rate suppliers for quality & trust.', icon: FaStar },
];

const howItWorks = [
  { title: 'Sign Up', description: 'Join as a vendor or supplier in just a few clicks.' },
  { title: 'Browse Products', description: 'Explore raw materials and join group buys nearby.' },
  { title: 'Save & Grow', description: 'Get bulk pricing, build trust, and grow your business.' },
];

const team = [
  { name: 'Sahil Bhandare', role: 'Frontend Developer', photo: '/team/sahill.jpg', linkedin: 'https://linkedin.com/in/sahil-bhandare045/', github: 'https://github.com/sahilbhandare45' },
  { name: 'Tushar Suryawanshi', role: 'Frontend Developer', photo: '/team/tushar.jpg', linkedin: 'https://www.linkedin.com/in/tushar2006/', github: 'https://github.com/Tushar862584' },
  { name: 'Kshitij Gulhane', role: 'Backend Engineer', photo: '/team/kshitij.jpeg', linkedin: 'https://linkedin.com/in/', github: 'https://github.com/' },
  { name: 'Prachita Singh', role: 'Backend Engineer', photo: '/team/prachita.jpeg', linkedin: 'https://linkedin.com/in/', github: 'https://github.com/' },
  { name: 'Yuvika Sood', role: 'Testing Engineer', photo: '/team/yuvika.jpeg', linkedin: 'https://linkedin.com/in/', github: 'https://github.com/' },
];
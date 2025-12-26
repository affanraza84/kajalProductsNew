"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiClock, FiPhone } from "react-icons/fi";

const outlets = [
  {
    name: "Kajal's Bake & Bliss",
    branch: "Budhiyakhad Branch",
    location: "Budhiyakhad, Giridih, Jharkhand",
    img: "/images/outlet2.jpg",
    mapLink: "https://maps.app.goo.gl/bXtewvyd2TZHEvg29",
    hours: "9:00 AM - 10:00 PM",
    phone: "+91 94705 09040",
    status: "Open Now",
    features: ["Live Kitchen", "Cozy Seating", "Parking Available"]
  },
  {
    name: "Kajal's Bake & Bliss",
    branch: "Bada Chowk Branch",
    location: "Bhadani Market, Bada Chowk, Giridih",
    img: "/images/outlet1.jpg",
    mapLink: "https://www.google.com/maps?q=Bhadani+Market,Bada+Chowk,Giridih,Jharkhand",
    hours: "9:30 AM - 10:30 PM",
    phone: "+91 95701 88409",
    status: "Open Now",
    features: ["City Center", "Quick Takeaway", "Party Orders"]
  },
];

const amenities = [
    { icon: "🎂", title: "Custom Cake Studio", desc: "Consult directly with our chefs to design your dream cake." },
    { icon: "✨", title: "Hygienic Standards", desc: "We maintain 5-star hygiene standards in our open kitchens." },
    { icon: "☕", title: "Premium Ambiance", desc: "A perfect aesthetic spot for your evening snacks and coffee." },
];

export default function OurOutlets() {
  return (
    <section id="outlets" className="relative min-h-screen bg-white overflow-hidden">
       {/* --- Premium Background --- */}
      <div 
        className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#fce7f3_1px,transparent_1px),linear-gradient(to_bottom,#fce7f3_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
        style={{ maskImage: "radial-gradient(circle at 50% 0%, #000 70%, transparent 100%)", WebkitMaskImage: "radial-gradient(circle at 50% 0%, #000 70%, transparent 100%)" }}
      />
      
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-[10%] w-[30rem] h-[30rem] bg-pink-200/40 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3], x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 right-[10%] w-[25rem] h-[25rem] bg-purple-200/40 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"
      />

      <div className="relative z-10 px-6 py-24 pt-36 md:pt-36 lg:pt-40 container mx-auto">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
        >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
              Visit Our <span className="text-pink-600">Bakeries</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience the aroma of freshly baked goodness at our premium locations.
            </p>
        </motion.div>

        {/* Outlet Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto mb-20">
          {outlets.map((outlet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/60 backdrop-blur-md rounded-[2rem] border border-white shadow-xl overflow-hidden hover:shadow-2xl hover:bg-white/80 transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row h-full">
                  {/* Image Section */}
                  <div className="w-full md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                      <Image
                        src={outlet.img}
                        alt={outlet.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-[0_0_15px_rgba(22,163,74,0.6)] flex items-center gap-2 z-10 backdrop-blur-sm border border-green-400">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                          </span>
                          {outlet.status}
                      </div>
                  </div>

                  {/* Content Section */}
                  <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
                      <div className="mb-4">
                          <h3 className="text-sm font-bold text-pink-600 uppercase tracking-wider mb-1">{outlet.branch}</h3>
                          <h2 className="text-2xl font-serif font-bold text-gray-900">{outlet.name}</h2>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                          <div className="flex items-start gap-3 text-gray-600">
                              <FiMapPin className="text-pink-500 mt-1 shrink-0" />
                              <span className="text-sm">{outlet.location}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-600">
                              <FiClock className="text-pink-500 shrink-0" />
                              <span className="text-sm">{outlet.hours}</span>
                          </div>
                           <div className="flex items-center gap-3 text-gray-600">
                              <FiPhone className="text-pink-500 shrink-0" />
                              <span className="text-sm">{outlet.phone}</span>
                          </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                          {outlet.features.map((feature, i) => (
                              <span key={i} className="px-3 py-1 bg-pink-50 text-pink-700 text-xs font-semibold rounded-lg border border-pink-100">
                                  {feature}
                              </span>
                          ))}
                      </div>

                      <Link href={outlet.mapLink} target="_blank" rel="noopener noreferrer">
                        <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-pink-600 transition-colors flex items-center justify-center gap-2">
                            <FiMapPin /> Navigate Location
                        </button>
                      </Link>
                  </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expansion Announcement */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-20 bg-pink-50 rounded-[2rem] p-10 md:p-14 text-center text-gray-900 relative overflow-hidden shadow-2xl border border-pink-100"
        >
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="relative z-10">
                <span className="inline-block px-4 py-2 bg-pink-600 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-6">Coming Soon</span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-pink-900 drop-shadow-sm">
                    Spreading Joy Across Jharkhand
                </h2>
                <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
                    The wait is almost over! <span className="text-pink-600 font-bold border-b-2 border-pink-300 pb-0.5 hover:text-pink-800 transition-colors cursor-default">Kajal's Bake & Bliss</span> is expanding its footprint to bring our signature gourmet cakes and savory delights closer to you. 
                    <br/><span className="italic text-gray-500 mt-2 block">New locations opening soon in major convenient districts.</span>
                </p>
                <div className="mt-8 flex justify-center gap-4">
                     <span className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"></span>
                     <span className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-100"></span>
                     <span className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-200"></span>
                </div>
            </div>
        </motion.div>

        {/* Features Section */}
        <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">Why Visit Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {amenities.map((item, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-8 rounded-3xl bg-pink-50/50 border border-pink-100 text-center hover:bg-white hover:shadow-lg transition-all"
                    >
                        <div className="text-5xl mb-6">{item.icon}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>

        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-[2rem] p-12 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 mix-blend-overlay"></div>
               <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Have Questions?</h2>
                    <p className="text-pink-100 mb-8 text-lg">Reach out to us for bulk orders, franchises, or feedback.</p>
                    <Link href="/contact">
                        <button className="px-10 py-4 bg-white text-pink-600 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all">
                        Get in Touch
                        </button>
                    </Link>
               </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
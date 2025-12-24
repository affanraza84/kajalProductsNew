"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiCheck } from "react-icons/fi";

const HeroSection = () => {
  const words = ["Elegance", "Delight", "Magic", "Perfection"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#FFF8FA]">
      
      {/* Background: Clean, airy, premium bakery feel. No dark overlays. */}
      {/* Subtle background gradients for depth without darkness */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,1)_0%,transparent_50%)]" />
      <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_bottom_right,rgba(253,242,248,1)_0%,transparent_70%)]" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-32 lg:pt-32">
        
        {/* Left Column: Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
        >
          {/* Pre-Heading / Brand Identity */}
          <h2 className="text-sm md:text-base font-bold text-pink-600 tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-pink-600"></span>
            Kajal Bakery's Cakes & Snacks
          </h2>

          {/* Headline - Animated & Refined */}
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.2
                }
              }
            }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-gray-900 leading-[1.1] tracking-tight"
          >
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } } }} className="block">
              Handcrafted
            </motion.span>
            
            <span className="block flex flex-col gap-2">
              <span className="block h-[1.5em] relative overflow-hidden w-full md:w-auto min-w-[340px]"> 
                <AnimatePresence>
                  <motion.span 
                    key={words[index]}
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(4px)", position: "absolute" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="text-pink-600 font-serif italic inline-block absolute left-0 top-0 whitespace-nowrap"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
                <span className="invisible text-pink-600 font-serif italic inline-block">
                   Elegance
                </span>
              </span>
              <motion.span 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                className="inline-block relative z-10"
              >
                in Every Bite
              </motion.span>
            </span>
          </motion.h1>

          {/* Subheading - Lighter, clearer, commercial */}
          <p className="text-lg text-gray-700 max-w-lg leading-relaxed font-normal">
            Experience the finest artisanal cakes, freshly baked with premium ingredients. The perfect treat for your special moments.
          </p>

          {/* Trust Signals - Approachable & Clear */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm font-medium text-gray-600">
            {["Freshly Baked Daily", "Premium Ingredients", "Eggless by Choice"].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="text-pink-500">
                   <FiCheck size={16} /> 
                </div>
                {item}
              </div>
            ))}
          </div>

          {/* CTAs - Commercial & Conversion Focused */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-6">
            <Link href="/products" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold text-lg hover:shadow-[0_8px_30px_rgb(236,72,153,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer">
                Order Now 
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-white border border-pink-200 text-gray-700 hover:text-pink-600 hover:border-pink-300 rounded-full font-medium text-lg transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                Contact Us
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Visual - Bright, Clean Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="relative w-full flex items-center justify-center lg:justify-end"
        >
          {/* Cake Image Container - White Frame, Natural Shadow */}
          <div className="relative w-full max-w-md bg-white p-4 rounded-[2rem] shadow-2xl shadow-pink-100/60 z-20">
             <div className="relative aspect-[4/5] w-full rounded-[1.5rem] overflow-hidden bg-pink-50/30">
                <Image
                  src="/hero-cake.png"
                  alt="Delicious Strawberry Cake"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
             </div>

             {/* Floating Trust Badge - Subtle, Commercial */}
             <div className="absolute -bottom-6 -left-4 bg-white px-5 py-3 rounded-xl shadow-lg shadow-gray-100/50 border border-gray-50 flex items-center gap-4 animate-bounce-slow">
                <div className="flex -space-x-3">
                  {["/avatar1.png", "/avatar2.png", "/avatar3.png"].map((src, i) => (
                    <div key={i} className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                      <Image
                        src={src}
                        alt={`Customer ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                   <span className="text-xs font-bold text-gray-800">500+ Happy Customers</span>
                   <div className="flex gap-0.5 text-yellow-400 text-[10px]">
                      {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                   </div>
                </div>
             </div>
          </div>
          
          {/* Decorative Blur behind image - airy pink */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-pink-100/40 rounded-full blur-[80px] -z-10" />
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;

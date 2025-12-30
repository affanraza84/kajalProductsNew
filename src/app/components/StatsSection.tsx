"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiClock, FiStar, FiSun, FiTruck } from "react-icons/fi";

const stats = [
  {
    icon: FiSun,
    title: "Finest Ingredients",
    subtitle: "Used",
    description: "Straight from the oven",
  },
  {
    icon: FiClock,
    title: "100% Fresh",
    subtitle: "& Eggless",
    description: "Pure vegetarian delight",
  },
  {
    icon: FiStar,
    title: "4.9★",
    subtitle: "Rating",
    description: "Love from customers",
  },
  {
    icon: FiTruck,
    title: "Same Day",
    subtitle: "Delivery",
    description: "Within 4 hours",
  },
];

const StatsSection = () => {
  return (
    <section className="w-full py-12 bg-white relative overflow-hidden border-b border-pink-50/50">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1], // Custom ease for smoothness
              }}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 40px -15px rgba(236, 72, 153, 0.1)",
              }}
              className="group flex flex-col items-center text-center p-6 rounded-3xl bg-white border border-transparent hover:border-pink-100 transition-all duration-500 ease-out cursor-default relative"
            >
              {/* Subtle Glow Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50/0 to-pink-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative mb-4 text-pink-500 group-hover:scale-110 transition-transform duration-500 ease-out">
                <stat.icon size={28} strokeWidth={1.5} />
              </div>

              <h3 className="relative text-xl md:text-2xl font-serif font-bold text-gray-900 leading-tight">
                {stat.title}{" "}
                <span className="text-gray-400 font-light block text-sm md:text-base mt-1 font-sans tracking-wide">
                  {stat.subtitle}
                </span>
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

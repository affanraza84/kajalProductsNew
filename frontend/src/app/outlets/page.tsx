"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin } from "react-icons/fi";

const outlets = [
  {
    name: "Kajal's Bake & Bliss Budhiyakhad",
    location: "Budhiyakhad, Giridih Jharkhand",
    img: "/images/outlet2.jpg",
    mapLink: "https://maps.app.goo.gl/bXtewvyd2TZHEvg29",
  },
  {
    name: "Kajal's Bake & Bliss Bada Chowk",
    location: "Bhadani Market, Bada Chowk, Giridih Jharkhand",
    img: "/images/outlet1.jpg",
    mapLink: "https://www.google.com/maps?q=Bhadani+Market,Bada+Chowk,Giridih,Jharkhand",
  },
];

export default function OurOutlets() {
  return (
    <section id="outlets">
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white px-6 py-24 pt-36 md:pt-36 lg:pt-40">
        <motion.h1
          className="text-center text-4xl font-bold text-pink-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Outlets
        </motion.h1>

        <motion.p
          className="text-center text-gray-600 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Visit any of our outlets to experience the best treats in town!
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 max-w-6xl mx-auto">
          {outlets.map((outlet, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Image
                src={outlet.img}
                alt={outlet.name}
                width={400}
                height={250}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold text-pink-700">
                  {outlet.name}
                </h2>
                <p className="text-gray-600">{outlet.location}</p>
                <Link href={outlet.mapLink} target="_blank" rel="noopener noreferrer">
                  <div className="mt-2 flex items-center justify-center text-pink-600 hover:text-pink-800 cursor-pointer">
                    <FiMapPin className="mr-2" />
                    <span>View on Maps</span>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link href="/contact">
            <motion.button
              className="px-6 py-3 bg-pink-700 text-white text-lg rounded-xl shadow-md hover:bg-pink-900 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Contact Us for More Details
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
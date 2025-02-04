"use client"; // Required for Next.js App Router

import Link from "next/link";
import { Button } from "./ui/moving-border";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const words = ["delicious", "fresh", "tasty", "sweet", "mouthwatering"];
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [animateHeading, setAnimateHeading] = useState(false);

  useEffect(() => {
    // Trigger the heading animation only once after initial render
    setAnimateHeading(true);

    const interval = setInterval(() => {
      setCurrentWord((prevWord) => {
        const currentIndex = words.indexOf(prevWord);
        const nextIndex = (currentIndex + 1) % words.length;
        return words[nextIndex];
      });
    }, 2000); // Change every 2 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-auto md:h-[40rem] w-full flex flex-col items-center justify-center overflow-hidden mx-auto py-10 md:py-0 bg-gradient-to-b from-pink-100 to-white">
      {/* Dark Overlay for Better Text Visibility */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-1"></div>

      <div className="p-4 relative z-10 w-full text-center">
        {/* Animated Heading */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={animateHeading ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="mt-20 md:mt-0 text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-pink-700 to-pink-500 leading-tight md:leading-normal py-2"
        >
          Welcome to Kajal Bakery's Cakes & Snacks
        </motion.h1>

        {/* Animated Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="mt-4 font-normal text-base md:text-lg text-gray-600 max-w-lg mx-auto"
        >
          Indulge in the finest collection of handmade cakes, artisanal cookies, and delectable snacks, 
          each crafted with love, passion, and the finest ingredients. Every bite is a delightful journey, 
          blending rich flavors, time-honored traditions, and a touch of magic.
        </motion.p>

        {/* Changing Word Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="mt-4 font-normal text-base md:text-lg text-gray-600 max-w-lg mx-auto"
        >
          Our cakes are always{" "}
          <motion.span
            key={currentWord} // Key ensures proper re-rendering
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="font-extrabold
        bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
        text-transparent bg-clip-text animate-gradient glow"
          >
            {currentWord}
          </motion.span>
          {" "}
          and made with love!
        </motion.p>

        {/* CTA Button */}
        <div className="mt-6">
          <Link href={"https://wa.me/message/AEY6Y2QPFKO7I1"}>
            <Button
              borderRadius="1.75rem"
              className="bg-pink-500 text-white border-pink-500 hover:bg-pink-600 hover:border-pink-600 text-2xl">
              Order Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

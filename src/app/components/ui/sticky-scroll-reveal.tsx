"use client";
import React, { useRef, useState, useMemo } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";

export const StickyScroll = ({
  content,
}: {
  content: {
    title: string;
    description: string;
    image: string;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = ["var(--pink-500)", "var(--pink-400)", "var(--red-400)"];
  const linearGradients = useMemo(
    () => [
      "linear-gradient(to bottom right, #FBB6D0, #FBCFE8)",
      "linear-gradient(to bottom right, #FCE7F3, #F9A8D4)",
      "linear-gradient(to bottom right, #FDEAF5, #F9A8D4)",
    ],
    []
  );

  return (
    <motion.div
      transition={{
        duration: 0.8, // Increased duration for smoother transition
        ease: "linear", // Using linear ease for continuous feeling
      }}
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-xl p-10 shadow-lg border border-white/[0.1] backdrop-blur-lg"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-3xl font-bold text-gray-900" // Changed to dark text
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-lg text-gray-600 max-w-sm mt-10" // Changed to dark text
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: linearGradients[activeCard % linearGradients.length] }}
        className="hidden lg:block h-60 w-80 rounded-lg bg-white/10 border border-white/20 shadow-lg sticky top-10 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={content[activeCard].image}
            src={content[activeCard].image}
            alt={content[activeCard].title}
            className="h-auto w-full object-cover rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ opacity: { duration: 0.5 }, y: { duration: 0.3 } }}
          />
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

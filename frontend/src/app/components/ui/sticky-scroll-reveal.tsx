"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/app/utils/cn";

export const StickyScroll = ({
  content,
}: {
  content: {
    title: string;
    description: string;
    image: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref, // FIX: Corrected useScroll configuration
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  const backgroundColors = [
    "var(--pink-500)",
    "var(--pink-400)",
    "var(--red-400)",
  ];

  const linearGradients = [
    "linear-gradient(to bottom right, #FBB6D0, #FBCFE8)",
    "linear-gradient(to bottom right, #FCE7F3, #F9A8D4)",
    "linear-gradient(to bottom right, #FDEAF5, #F9A8D4)",
  ];

  // Optimize state updates by preventing unnecessary renders
  const updateActiveCard = useCallback((latest: number) => {
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

    if (closestBreakpointIndex !== activeCard) {
      setActiveCard(closestBreakpointIndex);
    }
  }, [content, cardLength, activeCard]);

  useMotionValueEvent(scrollYProgress, "change", updateActiveCard);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-xl p-10 shadow-lg border border-white/[0.1] backdrop-blur-lg"
      ref={ref}
    >
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-3xl font-bold text-white"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-lg text-gray-300 max-w-sm mt-6"
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
        <motion.img
          key={content[activeCard].image}
          src={content[activeCard].image}
          alt={content[activeCard].title}
          className="h-auto w-full object-cover rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

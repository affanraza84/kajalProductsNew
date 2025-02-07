"use client";
import Image from "next/image";
import React, { useState, useCallback, useMemo } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Memoized spring configuration for performance
  const springConfig = useMemo(() => ({ stiffness: 100, damping: 5 }), []);
  
  const x = useMotionValue(0);

  // Rotate the tooltip
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
  
  // Translate the tooltip
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);

  // Optimized Mouse Move Handler
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLImageElement>) => {
    const target = event.currentTarget; // Ensures correct reference
    const boundingRect = target.getBoundingClientRect();
    const offsetX = event.clientX - boundingRect.left - boundingRect.width / 2;
    
    x.set(offsetX);
  }, [x]);

  return (
    <>
      {items.map((item, index) => {
        // Adjust tooltip positioning for the three rightmost elements
        const isRightmost = index >= items.length - 3;
        
        return (
          <div
            className="-mr-4 relative group"
            key={item.id} // Changed from `item.name` to `item.id` for uniqueness
            onMouseEnter={() => setHoveredIndex(item.id)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence mode="popLayout">
              {hoveredIndex === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 260, damping: 10 },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  style={{ translateX, rotate, whiteSpace: "nowrap" }}
                  className={`absolute -top-16 z-50 flex text-xs flex-col items-center justify-center rounded-md bg-pink-500 shadow-xl px-4 py-2
                    ${isRightmost ? "right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2" : "left-1/2 -translate-x-1/2"}
                    min-w-[8rem] sm:min-w-[10rem] lg:min-w-[12rem]`}
                >
                  {/* Tooltip Decoration */}
                  <div className="absolute inset-x-0 w-full -bottom-px bg-gradient-to-r from-transparent via-pink-300 to-transparent h-px" />
                  
                  <div className="font-bold text-white relative z-30 text-base">
                    {item.name}
                  </div>
                  <div className="text-white text-xs">{item.designation}</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Profile Image with Hover Effect */}
            <Image
              onMouseMove={handleMouseMove}
              height={100}
              width={100}
              src={item.image}
              alt={item.name}
              className="object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 
                group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500"
            />
          </div>
        );
      })}
    </>
  );
};

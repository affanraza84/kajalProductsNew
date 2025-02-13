"use client";
import React, { useState, useEffect } from "react";
import { Menu } from "./ui/navbar-menu";
import { cn } from "@/app/utils/cn";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products" },
  { title: "Outlets", href: "/outlets" },
  { title: "Contact Us", href: "/contact" },
];

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "absolute top-10 inset-x-0 max-w-2xl mx-auto z-50 bg-gradient-to-b from-pink-100 to-white rounded-2xl shadow-lg",
        className
      )}
    >
      <Menu setActive={setActive}>
        {menuItems.map((item) => (
          <div key={item.title} className="p-2 hover:bg-pink-200 rounded-md">
            <Link href={item.href} className="text-pink-700 font-semibold">
              {item.title}
            </Link>
          </div>
        ))}
      </Menu>

      {scrolling && (
        <button
          className="fixed top-5 left-5 z-50 bg-pink-600 text-white p-3 rounded-full shadow-lg hover:bg-pink-700"
          onClick={() => setIsOpen(true)}
        >
          <FiMenu size={24} />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col space-y-4 z-50"
          >
            <button
              className="self-end text-gray-600 hover:text-pink-700"
              onClick={() => setIsOpen(false)}
            >
              <FiX size={24} />
            </button>
            {menuItems.map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-md text-pink-700 hover:bg-pink-200 transition-all cursor-pointer"
              >
                <Link href={item.href} className="text-lg font-semibold">
                  {item.title}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
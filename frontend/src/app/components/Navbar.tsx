"use client";
import React, { useState, useEffect } from "react";
import { Menu, MenuItem, HoveredLink, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/app/utils/cn";
import Link from "next/link";
import { FiMenu, FiX, FiSearch, FiShoppingBag, FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const menuItems = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products" },
  { title: "Outlets", href: "/outlets" },
  { title: "Contact", href: "/contact" },
];

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>

      <div
        className={cn(
          "fixed top-4 inset-x-0 max-w-2xl mx-auto z-50 hidden md:block transition-all duration-300",
          scrolled ? "top-2" : "top-6",
          className
        )}
      >
        <Menu setActive={setActive}>
          {menuItems.map((item) => (
            <Link key={item.title} href={item.href}>
              <MenuItem
                setActive={setActive}
                active={active}
                item={item.title}
              />
            </Link>
          ))}
        </Menu>
      </div>

      {/* Mobile Header */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 md:hidden flex justify-between items-center px-4 py-3 transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20"
            : "bg-transparent"
        )}
      >

        <Link href="/" className="font-bold text-xl text-gray-900 tracking-tight flex items-center gap-2">
          <div className="hidden md:block">
            <Image src="/logo.png" alt="Kajal Logo" width={40} height={40} className="object-contain" />
          </div>
          <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
             KajalProducts
          </span>
        </Link>

        <div className="flex items-center gap-4">
           {/* <button className="p-2 text-gray-700 hover:text-pink-600 transition-colors">
              <FiSearch size={20} />
           </button> */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-gray-700 hover:text-pink-600 transition-colors bg-white/50 rounded-full backdrop-blur-sm"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-white/95 backdrop-blur-2xl shadow-2xl z-50 p-6 flex flex-col gap-6 md:hidden border-l border-white/50"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                  KajalProducts
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="flex flex-col gap-3">
                {menuItems.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block p-4 rounded-2xl text-lg font-medium text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-white hover:text-pink-600 hover:shadow-md transition-all active:scale-95 border border-transparent hover:border-pink-100"
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-auto pt-8 border-t border-gray-100">
                <div className="flex justify-center gap-6 mb-6">
                   {/* Add any social icons or simple footer links here if needed */}
                </div>
                <p className="text-xs text-center text-gray-400 font-medium tracking-wide">
                  © 2024 KAJA PRODUCTS
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
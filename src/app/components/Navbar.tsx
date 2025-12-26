"use client";
import React, { useState, useEffect } from "react";
import { Menu, MenuItem, HoveredLink, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/app/utils/cn";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { FiMenu, FiX, FiSearch, FiShoppingBag, FiUser, FiShoppingCart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

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
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>


      {/* Desktop Logo (Top Left) */}
      <div
        className={cn(
          "fixed top-4 left-8 z-50 hidden md:flex items-center gap-2 transition-all duration-300",
          scrolled ? "top-3 scale-90 origin-top-left" : "top-7 scale-100 origin-top-left"
        )}
      >
        <Link href="/" className="group flex flex-col">
          <span className="font-serif text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
            KajalProducts
          </span>
          <span className="text-xs font-medium tracking-[0.3em] text-pink-400 uppercase ml-1 opacity-100 transition-opacity duration-500 -mt-1">
            Premium Bakery
          </span>
        </Link>
      </div>

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

      {/* Desktop Auth Buttons (Top Right) */}
      <div
        className={cn(
          "fixed top-4 right-8 z-50 hidden md:flex items-center gap-4 transition-all duration-300",
          scrolled ? "top-3" : "top-7"
        )}
      >
          <div className="hidden md:flex items-center gap-4">
            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-pink-600 transition-colors group">
                <FiShoppingCart size={24} />
                {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                        {cartCount}
                    </span>
                )}
            </Link>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 rounded-full border border-pink-200 text-pink-600 hover:bg-pink-50 text-sm font-medium transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 border border-pink-100"
                  }
                }}
              />
            </SignedIn>
          </div>
      </div>

      {/* Mobile Header */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 md:hidden flex justify-between items-center px-4 py-2 transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20"
            : "bg-transparent"
        )}
      >
        <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Kajal Logo" width={32} height={32} className="object-contain" />
           <span className="font-serif text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600">
              KajalProducts
           </span>
        </Link>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
            {/* Mobile Cart Icon */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-pink-600 transition-colors">
                <FiShoppingCart size={24} />
                {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                        {cartCount}
                    </span>
                )}
            </Link>
          
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-pink-600 transition-colors p-2"
            >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
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

                {/* Mobile Auth Buttons */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (menuItems.length * 0.1) }}
                  className="mt-2"
                >
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button 
                        onClick={() => setIsOpen(false)}
                        className="w-full p-4 rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-md transition-all active:scale-95"
                      >
                        Sign In
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <UserButton afterSignOutUrl="/" />
                      <span className="text-sm font-medium text-gray-600">My Account</span>
                    </div>
                  </SignedIn>
                </motion.div>
              </div>
              
              <div className="mt-auto pt-6 border-t border-gray-100">
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
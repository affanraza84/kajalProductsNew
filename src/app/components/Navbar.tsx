"use client";
import React, { useState, useEffect } from "react";
import { Menu, MenuItem, HoveredLink, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/app/utils/cn";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { FiMenu, FiX, FiSearch, FiShoppingBag, FiUser, FiShoppingCart, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const menuItems = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products" },
  { title: "Outlets", href: "/outlets" },
  { title: "Contact", href: "/contact" },
];

const sidebarVariants: Variants = {
  open: {
    x: 0,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
  closed: {
    x: "100%",
    transition: {
      type: "tween",
      ease: "easeIn",
      duration: 0.3,
    },
  },
};

const itemVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: 20 },
};

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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

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
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-transparent"
        )}
      >
        <Link href="/" className="flex items-center gap-2">
           <span className="font-serif text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600">
              KajalProducts
           </span>
        </Link>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
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
                className="text-gray-800 p-2 active:scale-95 transition-transform"
                aria-label="Toggle Menu"
            >
                {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-50 md:hidden"
            />
            
            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-gradient-to-b from-white to-pink-50/80 shadow-2xl z-50 flex flex-col md:hidden border-l border-white/50"
            >
              {/* Premium Background Pattern */}
              <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] pointer-events-none mix-blend-multiply" />

              {/* Menu Header */}
              <div className="flex justify-between items-center p-6 border-b border-pink-100/50 relative z-10">
                <span className="font-serif text-lg font-bold text-gray-900">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-500 hover:text-pink-600 transition-colors rounded-full hover:bg-pink-50"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              {/* Menu Items */}
              <div className="flex flex-col p-6 gap-2 relative z-10 overflow-y-auto">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between p-4 rounded-xl text-base font-medium text-gray-600 hover:text-pink-600 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-pink-100"
                    >
                      <span>{item.title}</span>
                      <FiChevronRight className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-pink-400" />
                    </Link>
                  </motion.div>
                ))}

                <div className="my-4 border-t border-dashed border-gray-200/50" />

                {/* Mobile Auth Buttons */}
                <motion.div variants={itemVariants}>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button 
                        onClick={() => setIsOpen(false)}
                        className="w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg shadow-pink-200 active:scale-95 transition-transform"
                      >
                        Sign In
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-pink-100 shadow-sm">
                      <UserButton afterSignOutUrl="/" />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">My Account</span>
                        <span className="text-xs text-gray-500">Manage profile</span>
                      </div>
                    </div>
                  </SignedIn>
                </motion.div>
              </div>
              
              {/* Footer */}
              <motion.div 
                variants={itemVariants}
                className="mt-auto p-6 border-t border-pink-100/50 relative z-10"
              >
                <p className="text-xs text-center text-gray-400 font-medium tracking-wider uppercase">
                  Designed & Baked with ❤️
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
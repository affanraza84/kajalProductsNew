"use client";
import React, { useState, useEffect } from "react";
import { Menu } from "./ui/navbar-menu";
import { cn } from "@/app/utils/cn";
import Link from "next/link";
import { FiMenu, FiX, FiHome, FiBox, FiMapPin, FiPhone } from "react-icons/fi";

const menuItems = [
  { title: "Home", href: "/", icon: <FiHome className="text-pink-700 group-hover:text-pink-900"/> },
  { title: "Products", href: "/products", icon: <FiBox className="text-pink-700 group-hover:text-pink-900"/> },
  { title: "Outlets", href: "/outlets", icon: <FiMapPin className="text-pink-700 group-hover:text-pink-900"/> },
  { title: "Contact Us", href: "/contact", icon: <FiPhone className="text-pink-700 group-hover:text-pink-900"/> },
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
            <Link href={item.href} className="flex items-center space-x-2">
              {item.icon}
              <span className="text-pink-700 font-semibold">{item.title}</span>
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

      {isOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col space-y-4 z-50">
          <button
            className="self-end text-gray-600 hover:text-pink-700"
            onClick={() => setIsOpen(false)}
          >
            <FiX size={24} />
          </button>
          {menuItems.map((item) => (
            <div
              key={item.title}
              className="flex items-center space-x-3 p-3 rounded-md text-pink-700 hover:bg-pink-200 transition-all cursor-pointer"
            >
              {item.icon}
              <Link href={item.href} className="text-lg font-semibold">
                {item.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;

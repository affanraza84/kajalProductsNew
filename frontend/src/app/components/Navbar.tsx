"use client";
import React, { useState } from "react";
import { Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/app/utils/cn";
import Link from "next/link";

const menuItems = [
  { title: "Home", href: "/" },
  { title: "Our Products", href: "/products" },
  { title: "Our Outlets", href: "/outlets" },
  { title: "Contact Us", href: "/contact" },
];

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 bg-gradient-to-b from-pink-100 to-white rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:text-pink-900",
        className
      )}
    >
      <Menu setActive={setActive}>
        {menuItems.map((item) => (
          <div key={item.title}>
            <Link href={item.href}>
              <MenuItem setActive={setActive} active={active} item={item.title} />
            </Link>
          </div>
        ))}
      </Menu>
    </div>
  );
}

export default Navbar;

"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/app/utils/cn";
import Link from "next/link";

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
        <div key={"home"}>
          <Link href={"/"}>
            <MenuItem setActive={setActive} active={active} item="Home">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/#ProductsDetails">
                  Desert Delights
                </HoveredLink>
                <HoveredLink href="/#cookies">Cookie Cravings</HoveredLink>
                <HoveredLink href="/#instructors">Our Instructors</HoveredLink>
              </div>
            </MenuItem>
          </Link>
        </div>

        <div key={"product"}>
          <Link href={"/products"}>
            <MenuItem setActive={setActive} active={active} item="Our Products">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/products#cakes">Classic Cakes</HoveredLink>
                <HoveredLink href="/products#cakes">
                  Speciality and Premium Cake
                </HoveredLink>
                <HoveredLink href="/products#cakes">
                  Themed and Celebration Cake
                </HoveredLink>
              </div>
            </MenuItem>
          </Link>
        </div>

        <div key={"outlets"}>
          <Link href={"outlets"}>
            <MenuItem setActive={setActive} active={active} item="Our Outlets">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/outlets#outlets">Outlet - 1</HoveredLink>
                <HoveredLink href="/outlets#outlets">Outlet - 2</HoveredLink>
              </div>
            </MenuItem>
          </Link>
        </div>

        <div key={"contact"}>
          <Link href={"/contact"}>
            <MenuItem setActive={setActive} active={active} item="Contact Us">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/contact#contact">
                  Connect with us
                </HoveredLink>
              </div>
            </MenuItem>
          </Link>
        </div>
      </Menu>
    </div>
  );
}

export default Navbar;

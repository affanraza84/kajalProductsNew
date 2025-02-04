"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
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
        <Link href={"/"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Home"
            // className="text-pink-700 hover:bg-pink-100 rounded-lg"
          >
            {/* <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink
                href="/ProductsDetails"
                className="text-gray-600 hover:text-pink-700"
              >
                Desert Delights
              </HoveredLink>
              <HoveredLink
                href="/ProductsDetails"
                className="text-gray-600 hover:text-pink-700"
              >
                Cookie Cravings
              </HoveredLink>
              <HoveredLink
                href="/courses"
                className="text-gray-600 hover:text-pink-700"
              >
                Our Instructors
              </HoveredLink>
            </div> */}
          </MenuItem>
        </Link>
        <Link href={"/products"}>
        <MenuItem
          setActive={setActive}
          active={active}
          item="Our Products"
          // className="text-pink-700 hover:bg-pink-100 rounded-lg"
        >
          {/* <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink
              href="/courses"
              className="text-gray-600 hover:text-pink-700"
            >
              All Courses
            </HoveredLink>
            <HoveredLink
              href="/courses"
              className="text-gray-600 hover:text-pink-700"
            >
              Basic Music Theory
            </HoveredLink>
            <HoveredLink
              href="/courses"
              className="text-gray-600 hover:text-pink-700"
            >
              Advanced Composition
            </HoveredLink>
          </div> */}
        </MenuItem>
        </Link>
        <Link href={"/outlets"}>
        <MenuItem
          setActive={setActive}
          active={active}
          item="Our Outlets"
          // className="text-pink-700 hover:bg-pink-100 rounded-lg"
        >
          {/* <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink
              href="/courses"
              className="text-gray-600 hover:text-pink-700"
            >
              All Courses
            </HoveredLink>
            <HoveredLink
              href="/courses"
              className="text-gray-600 hover:text-pink-700"
            >
              Basic Music Theory
            </HoveredLink>
            <HoveredLink
              href="/courses"
              className="text-gray-600 hover:text-pink-700"
            >
              Advanced Composition
            </HoveredLink>
          </div> */}
        </MenuItem>
        </Link>
        <Link href={"/contact"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Contact Us"
            // className="text-pink-700 hover:bg-pink-100 rounded-lg"
            >
            {/* <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink
              href="/courses"
              className="text-gray-600 hover:text-pink-700"
            >
              All Courses
            </HoveredLink>
            <HoveredLink
              href="/courses"
              className="text-gray-600 hover:text-pink-700"
            >
              Basic Music Theory
            </HoveredLink>
            <HoveredLink
              href="/courses"
              className="text-gray-600 hover:text-pink-700"
            >
              Advanced Composition
            </HoveredLink>
          </div> */}
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
}

export default Navbar;
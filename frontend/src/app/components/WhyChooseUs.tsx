"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

const content = [
  {
    title: "Delicious Cakes",
    description:
      "Satisfy your sweet cravings with our delightful selection of freshly baked cakes, crafted from the finest ingredients. Whether you're celebrating a birthday, anniversary, or simply treating yourself, we have the perfect cake for every occasion!",
      image:"/images/cake64.jpg",
    content: (
      <div className="h-full w-full bg-gradient-to-b from-pink-100 to-white flex items-center justify-center text-pink-700 font-bold">
        Delicious Cakes
      </div>
    ),
  },
  {
    title: "Crunchy Cookies",
    description:
      "Enjoy our homemade cookies, baked to perfection with love. From classic chocolate chip to buttery shortbread, our cookies are the perfect treat for any time of the day.",
      image:"/images/cookie20.jpg",
    content: (
      <div className="h-full w-full flex items-center justify-center text-pink-700 font-bold">
        Crunchy Cookies
      </div>
    ),
  },
  {
    title: "Custom Cakes",
    description:
      "Looking for a unique cake? We specialize in custom-designed cakes to match your special occasions. Choose your flavor, design, and let us create a masterpiece just for you!",
      image:"/images/cake62.jpg",
    content: (
      <div className="h-full w-full bg-gradient-to-b from-pink-100 to-white flex items-center justify-center text-pink-700 font-bold">
        Custom Cakes
      </div>
    ),
  },
  {
    title: "Freshly Baked Daily",
    description:
      "Our cakes and cookies are baked fresh every day to ensure you get the best quality and taste. We use farm-fresh ingredients and follow traditional recipes to maintain the perfect balance of flavor and texture.",
      image:"/images/cookie14.jpg",
    content: (
      <div className="h-full w-full bg-gradient-to-b from-pink-100 to-white flex items-center justify-center text-pink-700 font-bold">
        Freshly Baked Daily
      </div>
    ),
  },
  
  ];

function WhyChooseUs() {
  return (
    <div className="py-12 bg-white">
        <StickyScroll content={content}/>
    </div>
  )
}

export default WhyChooseUs;
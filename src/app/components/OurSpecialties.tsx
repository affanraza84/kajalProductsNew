"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

const content = [
  {
    title: "Signature Cake Delights",
    description:
      "Indulge in our artisanal selection of freshly baked cakes, handcrafted with premium ingredients. From celebrations to personal treats, our cakes are the centerpiece of every joyous moment.",
      image:"/images/products/cake64.jpg",
    content: (
      <div className="h-full w-full bg-gradient-to-b from-pink-100 to-white flex items-center justify-center text-pink-700 font-bold">
        Signature Cake Delights
      </div>
    ),
  },
  {
    title: "Handcrafted Cookie Perfection",
    description:
      "Savor the crunch of our small-batch cookies, baked with love and precision. Whether it's classic chocolate chip or buttery shortbread, each bite is a moment of pure bliss.",
      image:"/images/products/cookie20.jpg",
    content: (
      <div className="h-full w-full bg-gradient-to-b from-pink-100 to-white flex items-center justify-center text-pink-700 font-bold">
        Handcrafted Cookie Perfection
      </div>
    ),
  },
  {
    title: "Bespoke Custom Creations",
    description:
      "Dreaming of a unique masterpiece? Our pastry chefs specialize in bespoke custom designs tailored to your vision. Choose your flavor, style, and let us bring your sweet dreams to life.",
      image:"/images/products/cake62.jpg",
    content: (
      <div className="h-full w-full bg-gradient-to-b from-pink-100 to-white flex items-center justify-center text-pink-700 font-bold">
        Bespoke Custom Creations
      </div>
    ),
  },
  {
    title: "Freshness Guaranteed Daily",
    description:
      "We believe in the magic of fresh baking. Every morning, our ovens work their magic to ensure you receive only the freshest, most flavorful treats, made with farm-fresh ingredients.",
      image:"/images/products/cookie14.jpg",
    content: (
      <div className="h-full w-full bg-gradient-to-b from-pink-100 to-white flex items-center justify-center text-pink-700 font-bold">
        Freshness Guaranteed Daily
      </div>
    ),
  },
  
  ];

function OurSpecialties() {
  return (
    <div className="py-12 bg-gradient-to-b from-pink-100 to-white">
        <StickyScroll content={content}/>
    </div>
  )
}

export default OurSpecialties;
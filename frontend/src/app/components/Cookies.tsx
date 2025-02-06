"use client";
import Link from "next/link";
import { HoverEffect } from "./ui/card-hover-effect";

function Cookies() {
  const featuredWebinars = [
    {
      title: "Peanut Butter Perfection",
      slug: "understanding-music-theory",
      isFeatured: true,
      image: "/images/cookie15.jpg",
    },
    {
      title: "Veggie Patties",
      slug: "the-art-of-songwriting",
      isFeatured: true,
      image: "/images/cookie16.jpg",
    },
    {
      title: "Choco Bliss Bites",
      slug: "mastering-your-instrument",
      isFeatured: true,
      image: "/images/cookie17.jpg",
    },
    {
      title: "Crispy Jeera Crunch",
      slug: "music-production-essentials",
      isFeatured: true,
      image: "/images/cookie11.jpg",
    },
    {
      title: "Osmania Crumble",
      slug: "live-performance-techniques",
      isFeatured: true,
      image: "/images/cookie18.jpg",
    },
    {
      title: "Sweet Honey Crunch",
      slug: "digital-music-marketing",
      isFeatured: true,
      image: "/images/cookie5.jpg",
    },
  ];

  return (
    <section id="cookies">
      <div className="p-12 bg-pink-400/80 border border-white/20 shadow-lg backdrop-blur-lg rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-base text-green-950 font-semibold tracking-wide uppercase">
              Cookie Corner
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Crunchy Bites, Sweet Delights
            </p>
          </div>
          <div className="mt-10">
            <HoverEffect
              items={featuredWebinars.map((webinar) => ({
                title: webinar.title,
                link: "/",
                image: webinar.image,
              }))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cookies;

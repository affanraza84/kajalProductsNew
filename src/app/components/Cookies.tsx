"use client";

import { HoverEffect } from "./ui/card-hover-effect";
import { cookies } from "../../data/cookies";
import Link from "next/link";

function Cookies() {
  const featuredCookies = cookies;

  return (
    <section id="cookies">
      <div className="py-12 bg-gradient-to-b from-pink-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-base text-pink-600 font-semibold tracking-wide uppercase">
              Cookie Corner
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Crunchy Bites, Sweet Delights
            </p>
          </div>
          <div className="mt-10">
            <HoverEffect
              items={featuredCookies.map((cookie) => ({
                id: cookie.id,
                title: cookie.title,
                description: cookie.description,
                image: cookie.image,
                price: cookie.price,
                ingredients: cookie.ingredients,
              }))}
            />
          </div>
          <div className="mt-10 text-center">
            <Link
              href={"/cookies"}
              className="px-6 py-3 rounded-2xl border border-pink-500 text-pink-700 bg-white hover:bg-pink-500 hover:text-white transition duration-200 font-medium"
            >
              View all cookies
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cookies;

"use client";
import React from 'react';
import { HoverEffect } from "../components/ui/card-hover-effect";
import { cookies } from "../../data/cookies";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 pt-10">
                Our Delicious Cookie Collection
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our wide variety of handcrafted cookies, baked to perfection with the finest ingredients.
            </p>
        </div>
        
        <HoverEffect
            items={cookies.map((cookie) => ({
            id: cookie.id,
            title: cookie.title,
            description: cookie.description,
            image: cookie.image,
            price: cookie.price,
            ingredients: cookie.ingredients,
            }))}
        />
      </div>
    </div>
  );
}

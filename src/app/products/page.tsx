"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cakes } from "../../data/cakes";
import { cookies } from "../../data/cookies";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import { useCart } from "@/context/CartContext";
import { useReviews } from "@/context/ReviewContext";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { AuthModal } from "../components/ui/AuthModal";
import { CustomOrderModal } from "../components/ui/CustomOrderModal";
import { FiShoppingCart, FiStar, FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  ingredients: string;
  isFeatured: boolean;
  image: string;
}

export default function ProductsPage() {
  const { addToCart, cartItems } = useCart();
  const { openReviewModal } = useReviews();
  const { isSignedIn } = useUser();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const isProductInCart = (productId: number) => {
      return cartItems.some((item) => item.id === productId);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (!isSignedIn) {
      setIsAuthModalOpen(true);
      return;
    }
    
    if (isProductInCart(product.id)) {
        toast.info("Already added to cart, see your cart for changes");
        return;
    }
    
    addToCart(product);
  };

  const handleFeedback = (e: React.MouseEvent, product: Product) => {
      e.stopPropagation();
      openReviewModal(product.id, product.title);
  };

  const toggleDetails = (id: number) => {
      setExpandedId(expandedId === id ? null : id);
  };

  // Determine the list of products to display based on activeCategory
  const combinedProducts = [...cakes, ...cookies];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? combinedProducts 
    : activeCategory === "Cakes"
      ? cakes
      : cookies;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col pt-32 pb-20">
      <CustomOrderModal isOpen={isCustomModalOpen} onClose={() => setIsCustomModalOpen(false)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      
      {/* --- Premium Background --- */}
      <div 
        className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#fce7f3_1px,transparent_1px),linear-gradient(to_bottom,#fce7f3_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" 
        style={{ maskImage: "radial-gradient(circle at 50% 0%, #000 70%, transparent 100%)", WebkitMaskImage: "radial-gradient(circle at 50% 0%, #000 70%, transparent 100%)" }}
      />
      
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-[10%] w-[30rem] h-[30rem] bg-pink-200/40 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3], x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 right-[10%] w-[25rem] h-[25rem] bg-purple-200/40 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
        >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-4">
              Our <span className="text-pink-600">Premium Collection</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Handcrafted with love and the finest ingredients.
            </p>

            {/* Category Filter */}
            <div className="flex justify-center gap-4 mb-8 flex-wrap cursor-pointer">
              {["All", "Cakes", "Cookies"].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-pink-600 text-white shadow-lg scale-105"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-pink-300 hover:text-pink-500"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 xl:gap-x-8 xl:gap-y-6">
          {filteredProducts.map((product) => (
            <CardContainer key={product.id} className="inter-var w-full h-full">
              <CardBody className="bg-pink-50/50 relative group/card shadow-lg rounded-2xl p-4 border border-pink-200 hover:border-pink-400 w-full h-auto min-h-[420px] flex flex-col justify-between transition-all duration-300 backdrop-blur-sm">
                
                {expandedId !== product.id ? (
                    // --- Front View ---
                    <>
                        <CardItem translateZ="50" className="text-lg font-bold text-gray-900 w-full text-center mb-4 line-clamp-1">
                            {product.title}
                        </CardItem>
                        
                        <CardItem translateZ="80" className="w-full h-56 relative mb-4">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover rounded-xl group-hover/card:shadow-xl transition-shadow"
                                unoptimized={true}
                            />
                        </CardItem>

                        <div className="mt-auto flex flex-col gap-3 w-full">
                             <CardItem translateZ={30} className="text-xl font-bold text-pink-600 text-center">
                                ${product.price}
                            </CardItem>
                            <CardItem
                                translateZ={40}
                                className="w-full"
                            >
                                <button
                                    onClick={() => toggleDetails(product.id)}
                                    className="px-4 py-2 text-pink-600 font-bold text-base hover:underline flex items-center justify-center gap-1 transition-all w-full"
                                >
                                    Try Now <FiArrowRight />
                                </button>
                            </CardItem>
                        </div>
                    </>
                ) : (
                    // --- Details View ---
                    <div className="flex flex-col h-full w-full">
                        <div className="flex items-center justify-between mb-2">
                             <CardItem translateZ="50" className="text-lg font-bold text-gray-900 line-clamp-1">
                                {product.title}
                            </CardItem>
                            <div className="z-20">
                                <button onClick={() => toggleDetails(product.id)} className="p-1.5 hover:bg-pink-100 rounded-full transition-colors text-pink-600">
                                    <FiArrowLeft size={18} />
                                </button>
                            </div>
                        </div>

                        <CardItem
                            as="p"
                            translateZ="60"
                            className="text-gray-600 text-xs leading-relaxed mb-4 min-h-[60px]"
                        >
                            {product.description}
                        </CardItem>

                         <CardItem translateZ="40" className="text-sm text-gray-500 mb-4 bg-white/50 p-2 rounded-lg">
                            <span className="font-semibold text-pink-600">Ingredients:</span> {product.ingredients}
                        </CardItem>

                        <div className="flex flex-col gap-2 mt-auto w-full">
                            <CardItem
                                translateZ={20}
                                className="w-full"
                            >
                                <button
                                    onClick={(e: React.MouseEvent) => handleAddToCart(e, product as Product)}
                                    className={`px-4 py-2.5 rounded-xl text-sm font-bold w-full flex items-center justify-center gap-2 shadow-md transition-all ${
                                        isProductInCart(product.id)
                                        ? "bg-green-600 text-white"
                                        : "bg-gradient-to-r from-pink-600 to-rose-500 text-white hover:shadow-lg hover:-translate-y-0.5"
                                    }`}
                                >
                                    <FiShoppingCart size={16} />
                                    {isProductInCart(product.id) ? "Added" : "Add to Cart"}
                                </button>
                            </CardItem>

                            <CardItem
                                translateZ={20}
                                className="w-full"
                            >
                                <button
                                    onClick={(e: React.MouseEvent) => handleFeedback(e, product as Product)}
                                    className="px-4 py-2.5 rounded-xl bg-white text-gray-600 text-xs font-bold w-full border border-gray-200 hover:border-pink-300 hover:text-pink-600 flex items-center justify-center gap-2 transition-colors"
                                >
                                    <FiStar size={16} />
                                    Write a Review
                                </button>
                            </CardItem>
                        </div>
                    </div>
                )}
              </CardBody>
            </CardContainer>
          ))}
        </div>

        {/* --- Why Choose Us Section --- */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-32 mb-20"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: "🌿", title: "100% Eggless", desc: "Pure vegetarian delights without compromising on taste or texture." },
                    { icon: "✨", title: "Premium Quality", desc: "We use only the finest imported ingredients and fresh local produce." },
                    { icon: "🚛", title: "Fast Delivery", desc: "Fresh from our oven to your doorstep within hours." }
                ].map((feature, i) => (
                    <div key={i} className="bg-pink-50/50 backdrop-blur-sm p-8 rounded-3xl border border-pink-100 text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </motion.div>

        {/* --- Custom Order Banner --- */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-pink-900 to-purple-900 text-white py-16 px-8 text-center shadow-2xl">
             <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 mix-blend-overlay"></div>
             <div className="relative z-10 max-w-2xl mx-auto">
                 <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Need Something Special?</h2>
                 <p className="text-pink-100 text-lg mb-8">
                     We specialize in custom cakes for weddings, birthdays, and corporate events. Let us bring your dream cake to life.
                 </p>
                 <button 
                     onClick={() => setIsCustomModalOpen(true)}
                     className="inline-block px-10 py-4 bg-white text-pink-900 rounded-full font-bold text-lg hover:bg-pink-50 transition-colors shadow-lg hover:scale-105 transform duration-300"
                 >
                     Contact for Custom Orders
                 </button>
             </div>
        </div>

      </div>
    </div>
  );
}

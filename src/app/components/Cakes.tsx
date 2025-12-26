"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BackgroundGradient } from "./ui/background-gradient";
import { motion } from "framer-motion";
import Image from "next/image"; 
import { useUser } from "@clerk/nextjs";
import { AuthModal } from "./ui/AuthModal";
import { FiShoppingCart, FiStar } from "react-icons/fi";
import { cakes } from "../../data/cakes";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useReviews } from "@/context/ReviewContext";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  ingredients: string;
  isFeatured: boolean;
  image: string;
}

function Cakes() {
  const { addToCart, cartItems } = useCart();
  const { openReviewModal } = useReviews();
  const { isSignedIn } = useUser();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const productsDetails = cakes.filter(
    (product: Product) => product.isFeatured
  );

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

  return (
    <section id="cakes">
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      {/* ... rest of the component ... */}
      <div className="py-12 bg-gradient-to-b from-pink-100 to-white">
        {/* ... existing content ... */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {productsDetails.map((product: Product) => (
            // ... existing map content ...
            <div
              key={product.id}
              className="relative w-full max-w-sm h-[500px] perspective-1000 group cursor-pointer"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <BackgroundGradient className="w-full h-full rounded-[2rem] p-0 overflow-hidden bg-white" containerClassName="w-full h-full"> 
                <motion.div
                    // ... existing motion div ...
                    className="relative w-full h-full transition-all duration-700 preserve-3d"
                    style={{
                        transformStyle: "preserve-3d",
                    }}
                    animate={{
                    rotateY: hoveredId === product.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    {/* ... Front Side ... */}
                    <div 
                        className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-[2rem] overflow-hidden"
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    >
                        <div className="relative h-full w-full">
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={400}
                                height={500}
                                className="w-full h-full object-cover rounded-[2rem]"
                                unoptimized={true}
                                priority={product.id <= 4}
                            />
                        </div>
                    </div>

                    {/* ... Back Side ... */}
                    <div 
                        className="absolute inset-0 w-full h-full bg-white rounded-[2rem] shadow-xl overflow-hidden backface-hidden flex flex-col items-center justify-center text-center p-8 border border-pink-100"
                        style={{ 
                            transform: "rotateY(180deg)",
                            backfaceVisibility: 'hidden', 
                            WebkitBackfaceVisibility: 'hidden'
                        }}
                    >
                         {/* 1. Name of the cake */}
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">{product.title}</h3>
                        
                        {/* 2. Description */}
                        <p className="text-gray-600 mb-8 text-sm leading-relaxed px-2">
                            {product.description}
                        </p>
                        
                        <div className="flex flex-col gap-3 w-full mb-6 text-sm font-semibold">
                            {/* 3. Add to Cart Button */}
                            <button 
                                onClick={(e) => handleAddToCart(e, product)}
                                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                                    isProductInCart(product.id) 
                                    ? "bg-green-600 text-white hover:bg-green-700" 
                                    : "bg-pink-600 text-white hover:bg-pink-700"
                                }`}
                            >
                                <FiShoppingCart size={18} />
                                {isProductInCart(product.id) ? "Added to Cart" : "Add to Cart"}
                            </button>
                            
                            {/* 4. Write your feedback Button */}
                            {/* Removed Review Link as Slug is removed */}
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openReviewModal(product.id, product.title);
                                }}
                                className="flex items-center justify-center gap-2 w-full py-3 border border-pink-200 text-pink-600 rounded-xl hover:bg-pink-50 transition-all font-medium"
                            >
                                <FiStar size={18} />
                                Write your feedback
                            </button>
                        </div>

                        {/* 5. Price of the cake */}
                        <div className="mt-auto pt-4 border-t border-gray-100 w-full">
                             <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                        </div>
                    </div>
                </motion.div>
              </BackgroundGradient>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <Link
            href={"/products"}
            className="px-4 py-2 rounded-2xl border border-pink-500 text-pink-700 bg-white hover:bg-pink-500 hover:text-white transition duration-200"
          >
            View all products
          </Link>
        </div>
      </div>
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}

export default Cakes;

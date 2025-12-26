"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { FiTrash2, FiArrowLeft, FiShoppingBag, FiMinus, FiPlus, FiShield, FiLock, FiCreditCard, FiShare2 } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { cakes } from "../../data/cakes";
import Script from "next/script";

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Razorpay: any;
    }
}

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    ingredients: string;
    isFeatured: boolean;
    image: string;
}

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, cartCount, addToCart } = useCart();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);

    if (!window.Razorpay) {
        toast.error("Razorpay SDK failed to load. Please check your connection.");
        setIsProcessing(false);
        return;
    }

    try {
        if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
           toast.error("Payment configuration missing. Contact support.");
           setIsProcessing(false);
           return;
        }

        const response = await fetch('/api/razorpay/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: getCartTotal(),
                currency: 'INR',
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Something went wrong');
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            amount: data.amount,
            currency: data.currency,
            name: "Kajal Bakery",
            description: "Delicious Cakes & Snacks",
            order_id: data.id,
            handler: function (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) {
                toast.success(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                // Here you would typically save the order to your database
            },
            prefill: {
                name: "Kajal Customer",
                email: "customer@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#db2777",
            },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    } catch (error) {
        console.error("Checkout error:", error);
        toast.error("Failed to initiate checkout. Please try again.");
    } finally {
        setIsProcessing(false);
    }
  };

  useEffect(() => {
    // Randomly select 3 products for recommendations
    const cryptoRandom = () => {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return array[0] / (0xffffffff + 1);
    };
    const shuffled = [...cakes].sort(() => 0.5 - cryptoRandom());
    setRecommendations(shuffled.slice(0, 3));
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-12 px-4 bg-gray-50 flex flex-col items-center justify-center text-center">
        <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center mb-6 text-pink-500 shadow-inner"
        >
            <FiShoppingBag size={64} />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8 max-w-md text-lg">
          Looks like you haven't made your choice yet. Explore our delicious collection of premium cakes and cookies!
        </p>
        <Link
          href="/products"
          className="px-10 py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-full font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ring-4 ring-pink-50"
        >
          Get Freshly Baked Today
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col">
      {/* --- Detailed Background from HeroSection --- */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#fce7f3_1px,transparent_1px),linear-gradient(to_bottom,#fce7f3_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]pointer-events-none" />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-[10%] w-[30rem] h-[30rem] bg-pink-200/40 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 right-[10%] w-[25rem] h-[25rem] bg-purple-200/40 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"
      />

      <div className="flex-grow pt-32 pb-20 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-10 text-center md:text-left flex items-center gap-3">
            Your Cart <span className="bg-pink-100 text-pink-700 text-lg px-4 py-1 rounded-full font-sans font-bold">{cartCount} items</span>
          </h1>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main Cart Content */}
            <div className="flex-1 space-y-8">
              {/* Cart Items List */}
              <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-gray-100 space-y-6">
                  <AnimatePresence>
                  {cartItems.map((item) => (
                  <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, overflow: "hidden", marginTop: 0, marginBottom: 0, padding: 0 }}
                      key={item.id}
                      className="flex flex-row gap-4 sm:gap-6 items-center border-b border-gray-50 last:border-0 pb-6 last:pb-0"
                  >
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-50 rounded-2xl overflow-hidden">
                          <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                          />
                      </div>

                      <div className="flex-1 min-w-0 text-left">
                          <h3 className="text-base sm:text-xl font-bold text-gray-900 font-serif mb-1 truncate">{item.title}</h3>
                          <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4 line-clamp-1">{item.description}</p>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex items-center gap-3 bg-gray-50 rounded-lg sm:rounded-xl p-1 w-fit">
                                  <button 
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-white rounded-md sm:rounded-lg shadow-sm text-gray-600 hover:text-pink-600 transition-colors"
                                  >
                                      <FiMinus size={12} />
                                  </button>
                                  <span className="font-bold text-gray-900 w-4 text-center text-sm sm:text-base">{item.quantity}</span>
                                  <button 
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-white rounded-md sm:rounded-lg shadow-sm text-gray-600 hover:text-pink-600 transition-colors"
                                  >
                                      <FiPlus size={12} />
                                  </button>
                              </div>
                              
                              <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6 w-full sm:w-auto">
                                  <span className="text-lg sm:text-xl font-bold text-pink-600">${(item.price * item.quantity).toFixed(2)}</span>
                                  <button
                                      onClick={() => removeFromCart(item.id)}
                                      className="p-1.5 sm:p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                      title="Remove item"
                                  >
                                      <FiTrash2 size={18} />
                                  </button>
                                  <button
                                      onClick={() => {
                                          if (navigator.share) {
                                              navigator.share({
                                                  title: item.title,
                                                  text: `Check out ${item.title} at Kajal Bakery!`,
                                                  url: window.location.origin + '/products'
                                              }).catch((error) => {
                                                  if (error.name !== 'AbortError') {
                                                      console.error('Error sharing:', error);
                                                  }
                                              });
                                          } else {
                                              navigator.clipboard.writeText(`Check out ${item.title} at Kajal Bakery!`);
                                              toast.success("Copied to clipboard!");
                                          }
                                      }}
                                      className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all"
                                      title="Share item"
                                  >
                                      <FiShare2 size={18} />
                                  </button>
                              </div>
                          </div>
                      </div>
                  </motion.div>
                  ))}
                  </AnimatePresence>
              </div>

               {/* Recommendations */}
               <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">You might also like</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {recommendations.map((product) => (
                          <div key={product.id} className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-all group">
                              <div className="relative h-64 sm:h-40 w-full bg-gray-50 rounded-xl overflow-hidden mb-4">
                                  <Image src={product.image} alt={product.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                              </div>
                              <h4 className="font-bold text-gray-900 mb-1 truncate">{product.title}</h4>
                              <div className="flex justify-between items-center">
                                  <span className="text-pink-600 font-bold">${product.price}</span>
                                  <button 
                                      onClick={() => addToCart({...product, description: product.description})}
                                      className="text-xs px-3 py-1.5 bg-pink-50 text-pink-700 rounded-full font-bold hover:bg-pink-100 transition-colors"
                                  >
                                      Add
                                  </button>
                              </div>
                          </div>
                      ))}
                  </div>
               </div>
               
               <Link 
                  href="/products" 
                  className="inline-flex items-center gap-2 text-gray-500 font-medium hover:text-pink-600 transition-colors"
              >
                  <FiArrowLeft /> Continue Shopping
              </Link>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:w-[400px]">
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 sticky top-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 font-serif">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount</span>
                    <span className="text-green-600 font-medium">-$0.00</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-gray-900 font-medium">Calculated at checkout</span>
                  </div>
                  
                  {/* Promo Code */}
                  <div className="pt-4">
                      <div className="flex gap-2">
                          <input 
                              type="text" 
                              placeholder="Promo Code" 
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all"
                          />
                          <button className="px-4 py-2 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors">
                              Apply
                          </button>
                      </div>
                  </div>

                  <div className="border-t border-dashed border-gray-200 my-4 h-px w-full"></div>
                  <div className="flex justify-between text-2xl font-bold text-gray-900 items-end">
                    <span>Total</span>
                    <span className="text-pink-600">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-pink-200 hover:shadow-xl hover:opacity-90 hover:-translate-y-0.5 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? "Processing..." : <><FiLock size={18} /> Checkout</>}
                </button>
                
                {/* Trust Badges */}
                <div className="mt-8 flex flex-col items-center gap-4 text-center">
                  <div className="flex gap-4 text-gray-300">
                      <FiShield size={24} title="Secure Payment" />
                      <FiCreditCard size={24} title="Cards Accepted" />
                      <FiLock size={24} title="SSL Encrypted" />
                  </div>
                  <p className="text-xs text-gray-400 font-medium flex items-center gap-1">
                      <FiShield className="text-green-500" size={12} /> 100% Secure Checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
}

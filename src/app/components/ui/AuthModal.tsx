"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { FiX, FiLock } from "react-icons/fi";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <FiX size={20} />
            </button>

            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-500">
                <FiLock size={32} />
              </div>
              
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                Join Kajal Bakery
              </h2>
              <p className="text-gray-600 mb-8">
                Please sign in to add items to your cart across devices and enjoy exclusive treats!
              </p>

              <div className="flex flex-col gap-3">
                <SignInButton mode="modal">
                  <button 
                    onClick={onClose}
                    className="w-full py-3.5 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-bold hover:shadow-lg hover:opacity-90 transition-all active:scale-[0.98]"
                  >
                    Sign In
                  </button>
                </SignInButton>

                <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-100"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-400">Or new here?</span>
                    </div>
                </div>

                <SignUpButton mode="modal">
                  <button 
                    onClick={onClose}
                    className="w-full py-3.5 bg-white border-2 border-pink-100 text-pink-600 rounded-xl font-bold hover:bg-pink-50 hover:border-pink-200 transition-all active:scale-[0.98]"
                  >
                    Create Account
                  </button>
                </SignUpButton>
              </div>

              <p className="mt-6 text-xs text-gray-400">
                By joining, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

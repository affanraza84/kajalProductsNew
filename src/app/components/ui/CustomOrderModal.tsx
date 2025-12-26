"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiPhone, FiMail, FiCheck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import { createPortal } from "react-dom";

export const CustomOrderModal: React.FC<CustomOrderModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const phoneNumber = "+91 94705 09040"; 
  const email = "kajalproducts@gmail.com";

  React.useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    toast.success("Phone number copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-pink-100 max-h-[90vh] flex flex-col z-10"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-pink-600 to-rose-600 p-6 md:p-8 text-center shrink-0">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors z-50"
              >
                <FiX size={20} />
              </button>
              <h2 className="text-3xl font-serif font-bold text-white mb-2">Custom Orders</h2>
              <p className="text-pink-100">Let's craft something unique for your special occasion.</p>
              
              {/* Decorative Circle */}
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col gap-4 overflow-y-auto">
              
              {/* WhatsApp Option */}
              <a 
                href="https://wa.me/9470509040" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-100 hover:border-green-300 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                  <FaWhatsapp />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">Chat on WhatsApp</h3>
                  <p className="text-sm text-gray-600">Fastest response for designs & quotes.</p>
                </div>
                <div className="text-green-600 font-medium text-sm bg-white px-3 py-1 rounded-full border border-green-200">
                    Connect
                </div>
              </a>

              {/* Email Option */}
              <a 
                href={`mailto:${email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-pink-50 border border-pink-100 hover:border-pink-300 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform">
                  <FiMail />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 group-hover:text-pink-700 transition-colors">Send an Email</h3>
                  <p className="text-sm text-gray-600">Best for detailed requirements.</p>
                </div>
                <div className="text-pink-600 font-medium text-sm bg-white px-3 py-1 rounded-full border border-pink-200">
                    Email
                </div>
              </a>

              {/* Phone Option (Display Only) */}
              <div 
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all group cursor-pointer"
                onClick={handleCopyPhone}
              >
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform">
                  <FiPhone />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 group-hover:text-gray-700 transition-colors">Call Us Directly</h3>
                  <p className="text-sm text-gray-600">Available 8 AM - 11 PM</p>
                </div>
                <div className="text-gray-600 font-mono font-medium text-sm bg-white px-3 py-1 rounded-full border border-gray-200 flex items-center gap-2">
                    {copied ? <FiCheck className="text-green-500" /> : null}
                    {phoneNumber}
                </div>
              </div>

            </div>
             <p className="text-center text-xs text-gray-400 pb-6 shrink-0">
                We typically reply within half an hour during business hours.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

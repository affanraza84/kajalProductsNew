"use client";
import { useReviews } from '@/context/ReviewContext';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Star } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

export const ReviewModal = () => {
    const { isReviewModalOpen, closeReviewModal, addReview, currentProductForReview } = useReviews();
    const [name, setName] = useState('');
    const [rating, setRating] = useState(5);
    const [feedback, setFeedback] = useState('');
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);

    // Initial check to avoid rendering if not open (though AnimatePresence handles visibility usually, this helps with logic)
    // We rely on AnimatePresence for exit animations so we don't return null here immediately unless we want no animation on mount.
    // Better to handle conditional rendering in parent or here with AnimatePresence.
    
    if (!isReviewModalOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!feedback.trim()) {
            toast.error("Please provide some feedback!");
            return;
        }

        if (!currentProductForReview) {
             toast.error("Error: No product selected.");
             return;
        }

        addReview({
            productId: currentProductForReview.id,
            productName: currentProductForReview.name,
            userName: name.trim() || "Anonymous",
            rating,
            comment: feedback,
        });

        toast.success("Thank you for your review!");
        handleClose();
    };

    const handleClose = () => {
        setName('');
        setRating(5);
        setFeedback('');
        closeReviewModal();
    }

    return (
        <AnimatePresence>
            {isReviewModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden"
                    >
                         {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-pink-50 to-white">
                            <h3 className="text-xl font-bold text-gray-900">
                                Write a Review
                                {currentProductForReview && <span className="block text-sm font-normal text-pink-600 mt-1">for {currentProductForReview.name}</span>}
                            </h3>
                            <button 
                                onClick={handleClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            
                            {/* Name Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Your Name (Optional)</label>
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-black"
                                />
                            </div>

                            {/* Rating */}
                             <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Rating</label>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(null)}
                                            onClick={() => setRating(star)}
                                            className="p-1 focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <Star 
                                                size={28} 
                                                className={`transition-colors ${
                                                    star <= (hoveredRating || rating) 
                                                    ? "fill-yellow-400 text-yellow-400" 
                                                    : "text-gray-300"
                                                }`} 
                                            />
                                        </button>
                                    ))}
                                    <span className="ml-2 text-sm text-gray-500 font-medium">
                                        {(hoveredRating || rating)} / 5
                                    </span>
                                </div>
                            </div>

                            {/* Feedback Text Area */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Your Feedback</label>
                                <textarea 
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Tell us what you liked..."
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 resize-none text-black"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit"
                                className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl transition-all transform active:scale-95 shadow-lg shadow-pink-200"
                            >
                                Submit Review
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

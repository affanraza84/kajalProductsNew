"use client";

import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { useReviews } from "@/context/ReviewContext";

function ReviewCard() {
  const { reviews } = useReviews();
  
  const testimonialItems = reviews.map(review => ({
      quote: review.comment,
      name: review.userName || "Anonymous", 
      title: review.productName || "Product Review",
  }));

  return (
    <div className="h-auto min-h-[30rem] w-full bg-gradient-to-b from-pink-100 to-white relative flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-pink-700">
        Customers Feedback
      </h2>

      <div className="w-full max-w-6xl">
        <InfiniteMovingCards
          items={testimonialItems} 
          direction="right"
          speed="fast"
        />
      </div>
    </div>
  );
}

export default ReviewCard;

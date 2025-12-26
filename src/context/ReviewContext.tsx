"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Review {
  id: string;
  productId: number;
  productName: string; // Store product name for context in the card
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "date">) => void;
  isReviewModalOpen: boolean;
  openReviewModal: (productId: number, productName: string) => void;
  closeReviewModal: () => void;
  currentProductForReview: { id: number; name: string } | null;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useReviews must be used within a ReviewProvider");
  }
  return context;
};

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>([
    // Initial seeded reviews (migrated from TestimonialCards static data)
    {
      id: "1",
      productId: 0,
      productName: "Fondant Cake",
      userName: "User",
      rating: 5,
      comment: "A fondant cake features smooth, pliable icing, ideal for intricate designs, making it perfect for weddings, birthdays, and special occasions. It's often layered with buttercream or ganache for smoothness and adhesion.",
      date: new Date().toISOString()
    },
    {
       id: "2",
       productId: 0,
       productName: "Mouse Cake",
        userName: "User",
        rating: 5,
        comment: "A mousse cake is a rich dessert with airy mousse layered over soft cake. Made with whipped cream and flavors like chocolate or fruit, it offers a smooth, creamy texture perfect for any occasion.",
        date: new Date().toISOString()
    },
    {
        id: "3",
        productId: 0,
        productName: "Butter Toast",
        userName: "User",
        rating: 4,
        comment: "Butter toast is a timeless breakfast favorite made by toasting bread and spreading it with butter. Its crispy texture and rich, melted butter create a simple yet deliciously satisfying start to the day.",
        date: new Date().toISOString()
    },
     {
        id: "4",
        productId: 0,
        productName: "Red Velvet Cake",
        userName: "User",
        rating: 5,
        comment: "Red velvet cake is a rich, vibrant dessert with a subtle cocoa flavor, soft velvety texture, and slight tang from buttermilk and vinegar, topped with luscious cream cheese frosting for a perfect treat.",
        date: new Date().toISOString()
    },
    {
        id: "5",
        productId: 0,
        productName: "Chocolate Overloaded Cake",
        userName: "User",
        rating: 5,
        comment: "Chocolate overloaded cake is a chocoholic's dream, featuring moist chocolate layers, creamy ganache, and a lavish topping of chocolate shavings, chips, curls, and candies for an irresistible, indulgent treat.",
        date: new Date().toISOString()
    },
    {
        id: "6",
        productId: 0,
        productName: "Wedding Cake",
        userName: "User",
        rating: 5,
        comment: "A wedding cake is a cherished symbol of love and celebration, traditionally tiered and decorated with frosting, flowers, or toppers, evolving over time to reflect personal styles and unique preferences.",
        date: new Date().toISOString()
    },
    {
        id: "7",
        productId: 0,
        productName: "Birthday Cake",
        userName: "User",
        rating: 5,
        comment: "A birthday cake is the heart of every celebration, symbolizing joy and sweet memories. Frosted, decorated, and topped with candles, it brings smiles, wishes, and a deliciously unforgettable moment of happiness.",
        date: new Date().toISOString()
    },
    {
        id: "8",
        productId: 0,
        productName: "Japanese Chocolate Cake",
        userName: "User",
        rating: 5,
        comment: "Japanese chocolate cake is light, airy, and delicately soft, with a fluffy chiffon-like texture. Made with meringue, milk, or oil, it's moist, tender, and melts in your mouth for a delightful experience.",
        date: new Date().toISOString()
    }
  ]);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [currentProductForReview, setCurrentProductForReview] = useState<{ id: number; name: string } | null>(null);

  const addReview = (newReviewData: Omit<Review, "id" | "date">) => {
    const newReview: Review = {
      ...newReviewData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const openReviewModal = (productId: number, productName: string) => {
    setCurrentProductForReview({ id: productId, name: productName });
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setCurrentProductForReview(null);
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, isReviewModalOpen, openReviewModal, closeReviewModal, currentProductForReview }}>
      {children}
    </ReviewContext.Provider>
  );
};

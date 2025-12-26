import { cn } from "@/app/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useReviews } from "@/context/ReviewContext";
import { useUser } from "@clerk/nextjs";
import { FiShoppingCart, FiStar } from "react-icons/fi";
import { AuthModal } from "./AuthModal";
import { toast } from "sonner";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    ingredients: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { addToCart, cartItems } = useCart();
  const { openReviewModal } = useReviews();
  const { isSignedIn } = useUser();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const isProductInCart = (productId: number) => {
    return cartItems.some((item) => item.id === productId);
  };

  const handleAddToCart = (e: React.MouseEvent, product: typeof items[0]) => {
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
    <>
    <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-200/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card image={item.image} price={item.price} title={item.title}>
            <div className="flex flex-col h-full">
                <div className="mb-4">
                    <CardTitle>{item.title}</CardTitle>
                    <p className="text-pink-600 font-bold mt-1 text-lg">${item.price}</p>
                </div>
                
                <div className="mt-auto flex gap-2 w-full">
                     <button 
                        onClick={(e) => handleAddToCart(e, item)}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-bold text-xs transition-all shadow-sm hover:shadow-md truncate px-2",
                            isProductInCart(item.id) 
                            ? "bg-green-600 text-white hover:bg-green-700" 
                            : "bg-pink-600 text-white hover:bg-pink-700"
                        )}
                        title={isProductInCart(item.id) ? "Added to Cart" : "Add to Cart"}
                    >
                        <FiShoppingCart className="flex-shrink-0" />
                        <span className="truncate">{isProductInCart(item.id) ? "Added" : "Add to Cart"}</span>
                    </button>
                     <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            openReviewModal(item.id, item.title);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 py-2 border border-pink-200 text-pink-600 rounded-xl text-xs font-medium hover:bg-pink-50 transition-all truncate px-2"
                        title="Feedback"
                    >
                        <FiStar className="flex-shrink-0" />
                        <span className="truncate">Feedback</span>
                    </button>
                </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
    </>
  );
};

export const Card = ({
  className,
  children,
  image,
  price,
  title
}: {
  className?: string;
  children: React.ReactNode;
  image: string;
  price?: number;
  title?: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-white border border-transparent dark:border-white/[0.2] group-hover:border-pink-200 relative z-20 shadow-sm flex flex-col",
        className
      )}
    >
      <div className="relative w-full h-48 mb-4">
          {image && (
            <Image
              src={image}
              alt={title || "Card Image"}
              fill
              unoptimized = {true}
              className="object-cover rounded-xl"
            />
          )}
      </div>
      <div className="relative z-10 flex-grow">{children}</div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-800 font-bold tracking-wide text-lg", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-slate-500 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

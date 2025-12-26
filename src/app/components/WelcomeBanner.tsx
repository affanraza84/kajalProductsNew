"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { FiSun, FiMoon, FiSunrise } from "react-icons/fi";

const WelcomeBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [icon, setIcon] = useState<React.ReactNode>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    // Wait for auth to load so we know if we have a user or guest
    if (!isLoaded) return;

    // Unique key based on user ID or 'guest'
    // This ensures that if a user visits as guest (sees banner) -> then logs in -> they see banner AGAIN as user.
    const userKey = user ? `welcome_banner_shown_${user.id}` : "welcome_banner_shown_guest";
    
    // Check if already shown for this specific identity
    if (sessionStorage.getItem(userKey)) return;

    // 2. Determine Time of Day
    const hour = new Date().getHours();
    let timeGreeting = "Good Day";
    let timeIcon = <FiSun className="text-yellow-500" />;

    if (hour >= 5 && hour < 12) {
      timeGreeting = "Good Morning";
      timeIcon = <FiSunrise className="text-amber-500" />;
    } else if (hour >= 12 && hour < 18) {
      timeGreeting = "Good Afternoon";
      timeIcon = <FiSun className="text-orange-500" />;
    } else {
      timeGreeting = "Good Evening";
      timeIcon = <FiMoon className="text-indigo-400" />;
    }

    setGreeting(timeGreeting);
    setIcon(timeIcon);

    // 3. Show Banner (Delay slightly for smooth entrance)
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      // Mark as shown for this identity
      sessionStorage.setItem(userKey, "true");
    }, 800);

    // 4. Auto Dismiss after 7 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 7000); 

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isLoaded, user]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0, x: "-50%", scale: 0.9 }}
          animate={{ y: 0, opacity: 1, x: "-50%", scale: 1 }}
          exit={{ y: -100, opacity: 0, x: "-50%", scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-24 left-1/2 z-[100] w-[90%] max-w-md"
        >
          {/* Main Card Container with Gradient Border Effect */}
          <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
            
            {/* Glass Content */}
            <div className="bg-white/90 backdrop-blur-xl saturate-150 rounded-2xl p-5 flex items-center gap-5 relative overflow-hidden">
              
              {/* Decorative background glow */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-pink-400/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl" />

              {/* Icon Container */}
              <div className="relative p-3.5 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-inner ring-1 ring-black/5 shrink-0">
                <div className="text-2xl">
                  {icon}
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col min-w-0 relative z-10">
                <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-0.5">
                  Welcome to Kajal Bakery
                </span>
                <h3 className="text-xl font-serif font-medium text-gray-900 leading-tight">
                  {user ? (
                    <>
                      {greeting}, <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 font-bold">
                        {user.firstName || "Friend"}
                      </span>
                    </>
                  ) : (
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 font-bold">
                      {greeting}!
                    </span>
                  )}
                </h3>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeBanner;

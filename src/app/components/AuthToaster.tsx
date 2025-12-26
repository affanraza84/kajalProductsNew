"use client";
import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export const AuthToaster = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const prevSignedIn = useRef<boolean>(false);
  const isFirstLoad = useRef<boolean>(true);

  useEffect(() => {
    if (!isLoaded) return;

    // Skip the very first render to avoid toasts on page refresh
    if (isFirstLoad.current) {
        isFirstLoad.current = false;
        prevSignedIn.current = !!isSignedIn;
        return;
    }

    // User just signed in
    if (isSignedIn && !prevSignedIn.current) {
      toast.success(`Welcome back, ${user?.firstName || "Guest"}!`, {
        description: "Ready to order some delicious treats?",
        duration: 4000,
      });
    }

    // User just signed out
    if (!isSignedIn && prevSignedIn.current) {
      toast.info("Signed out successfully", {
        description: "Come back soon for more sweetness!",
        duration: 3000,
      });
    }

    prevSignedIn.current = !!isSignedIn;
  }, [isSignedIn, isLoaded, user]);

  return null;
};

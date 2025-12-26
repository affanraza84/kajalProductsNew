"use client";

import { motion } from "framer-motion";
import { cn } from "@/app/utils/cn";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  // Split words into array of characters for smooth typing
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const renderWords = () => {
    return (
      <motion.div className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{
                    opacity: 0,
                  }}
                  key={`char-${index}`}
                  className={cn(
                    `dark:text-white text-black opacity-0 hidden`,
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      <motion.div
        className="overflow-hidden pb-2"
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "fit-content",
        }}
        transition={{
          duration: 2,
          ease: "linear",
          delay: 0.5,
        }}
      >
        <div
          className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-pink-700 to-pink-500 leading-tight md:leading-normal py-2"
          style={{ whiteSpace: "nowrap" }}
        >
          {words.map((word, idx) => (
            <span key={idx} className={word.className}>
              {word.text}
              {idx < words.length - 1 ? " " : ""}
            </span>
          ))}
        </div>
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-8 md:h-12 bg-pink-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

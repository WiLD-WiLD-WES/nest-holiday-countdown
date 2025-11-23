import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ripped01 from "@/assets/ripped/day-01.jpg";
import ripped02 from "@/assets/ripped/day-02.jpg";
import ripped03 from "@/assets/ripped/day-03.jpg";
import ripped04 from "@/assets/ripped/day-04.jpg";
import ripped05 from "@/assets/ripped/day-05.jpg";
import ripped06 from "@/assets/ripped/day-06.jpg";
import ripped07 from "@/assets/ripped/day-07.jpg";
import ripped08 from "@/assets/ripped/day-08.jpg";
import ripped09 from "@/assets/ripped/day-09.jpg";
import ripped10 from "@/assets/ripped/day-10.jpg";
import ripped11 from "@/assets/ripped/day-11.jpg";
import ripped12 from "@/assets/ripped/day-12.jpg";
import ripped13 from "@/assets/ripped/day-13.jpg";
import ripped14 from "@/assets/ripped/day-14.jpg";
import ripped15 from "@/assets/ripped/day-15.jpg";
import ripped16 from "@/assets/ripped/day-16.jpg";
import ripped17 from "@/assets/ripped/day-17.jpg";
import ripped18 from "@/assets/ripped/day-18.jpg";
import ripped19 from "@/assets/ripped/day-19.jpg";
import ripped20 from "@/assets/ripped/day-20.jpg";
import ripped21 from "@/assets/ripped/day-21.jpg";
import ripped22 from "@/assets/ripped/day-22.jpg";
import ripped23 from "@/assets/ripped/day-23.jpg";
import ripped24 from "@/assets/ripped/day-24.jpg";
import ripped25 from "@/assets/ripped/day-25.jpg";

interface PaperRipOverlayProps {
  isActive: boolean;
  onComplete: () => void;
  giftNumber: number;
}

// Array of all 25 ripped paper images
const rippedPaperImages = [
  ripped01, ripped02, ripped03, ripped04, ripped05,
  ripped06, ripped07, ripped08, ripped09, ripped10,
  ripped11, ripped12, ripped13, ripped14, ripped15,
  ripped16, ripped17, ripped18, ripped19, ripped20,
  ripped21, ripped22, ripped23, ripped24, ripped25
];

export const PaperRipOverlay = ({ isActive, onComplete, giftNumber }: PaperRipOverlayProps) => {
  const [ripDirection, setRipDirection] = useState<'up' | 'down' | 'left' | 'right' | 'diagonal-tl' | 'diagonal-tr'>('up');

  useEffect(() => {
    if (isActive) {
      // Randomize rip direction
      const directions: typeof ripDirection[] = ['up', 'down', 'left', 'right', 'diagonal-tl', 'diagonal-tr'];
      setRipDirection(directions[Math.floor(Math.random() * directions.length)]);
    }
  }, [isActive]);

  const getVariants = () => {
    const baseVariants = {
      initial: { scale: 1, opacity: 1 },
      exit: { scale: 0, opacity: 0 },
    };

    switch (ripDirection) {
      case 'up':
        return {
          ...baseVariants,
          exit: { ...baseVariants.exit, y: -500, rotate: -15 },
        };
      case 'down':
        return {
          ...baseVariants,
          exit: { ...baseVariants.exit, y: 500, rotate: 15 },
        };
      case 'left':
        return {
          ...baseVariants,
          exit: { ...baseVariants.exit, x: -500, rotate: -10 },
        };
      case 'right':
        return {
          ...baseVariants,
          exit: { ...baseVariants.exit, x: 500, rotate: 10 },
        };
      case 'diagonal-tl':
        return {
          ...baseVariants,
          exit: { ...baseVariants.exit, x: -400, y: -400, rotate: -25 },
        };
      case 'diagonal-tr':
        return {
          ...baseVariants,
          exit: { ...baseVariants.exit, x: 400, y: -400, rotate: 25 },
        };
      default:
        return baseVariants;
    }
  };

  if (!isActive) return null;

  // Get the correct ripped paper image for this gift
  const rippedPaperImage = rippedPaperImages[giftNumber - 1];

  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Paper ripping effect with actual ripped paper image */}
      <motion.img
        src={rippedPaperImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        variants={getVariants()}
        initial="initial"
        animate="exit"
        transition={{
          duration: 0.8,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        onAnimationComplete={onComplete}
      />
    </motion.div>
  );
};

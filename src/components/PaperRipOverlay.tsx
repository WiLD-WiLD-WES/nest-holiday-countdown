import { motion } from "framer-motion";
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

const rippedPaperImages = [
  ripped01, ripped02, ripped03, ripped04, ripped05,
  ripped06, ripped07, ripped08, ripped09, ripped10,
  ripped11, ripped12, ripped13, ripped14, ripped15,
  ripped16, ripped17, ripped18, ripped19, ripped20,
  ripped21, ripped22, ripped23, ripped24, ripped25
];

export const PaperRipOverlay = ({ isActive, onComplete, giftNumber }: PaperRipOverlayProps) => {
  if (!isActive) return null;

  const rippedPaperImage = rippedPaperImages[giftNumber - 1];

  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Top Left Section */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: "polygon(0 0, 50% 0, 50% 50%, 0 50%)" }}
        initial={{ x: 0, y: 0, rotate: 0 }}
        animate={{ 
          x: -250, 
          y: -250, 
          rotate: -15,
          opacity: 0
        }}
        transition={{
          duration: 0.7,
          ease: [0.34, 1.56, 0.64, 1],
          delay: 0
        }}
      >
        <img
          src={rippedPaperImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      {/* Top Right Section */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: "polygon(50% 0, 100% 0, 100% 50%, 50% 50%)" }}
        initial={{ x: 0, y: 0, rotate: 0 }}
        animate={{ 
          x: 250, 
          y: -250, 
          rotate: 15,
          opacity: 0
        }}
        transition={{
          duration: 0.7,
          ease: [0.34, 1.56, 0.64, 1],
          delay: 0.05
        }}
      >
        <img
          src={rippedPaperImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      {/* Bottom Left Section */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: "polygon(0 50%, 50% 50%, 50% 100%, 0 100%)" }}
        initial={{ x: 0, y: 0, rotate: 0 }}
        animate={{ 
          x: -250, 
          y: 250, 
          rotate: 15,
          opacity: 0
        }}
        transition={{
          duration: 0.7,
          ease: [0.34, 1.56, 0.64, 1],
          delay: 0.1
        }}
        onAnimationComplete={onComplete}
      >
        <img
          src={rippedPaperImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      {/* Bottom Right Section */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)" }}
        initial={{ x: 0, y: 0, rotate: 0 }}
        animate={{ 
          x: 250, 
          y: 250, 
          rotate: -15,
          opacity: 0
        }}
        transition={{
          duration: 0.7,
          ease: [0.34, 1.56, 0.64, 1],
          delay: 0.15
        }}
      >
        <img
          src={rippedPaperImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
};

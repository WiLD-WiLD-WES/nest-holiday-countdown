import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PaperRipOverlayProps {
  isActive: boolean;
  onComplete: () => void;
  giftNumber: number;
}

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

  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Paper ripping effect */}
      <motion.div
        className="absolute inset-0 bg-champagne"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              hsl(var(--champagne)),
              hsl(var(--champagne)) 1px,
              transparent 1px,
              transparent 3px
            )
          `,
          filter: 'url(#paper-texture)',
        }}
        variants={getVariants()}
        initial="initial"
        animate="exit"
        transition={{
          duration: 0.8,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        onAnimationComplete={onComplete}
      >
        {/* Torn edge effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                circle at ${ripDirection.includes('left') ? '0%' : ripDirection.includes('right') ? '100%' : '50%'} 
                ${ripDirection.includes('down') ? '100%' : '0%'},
                transparent 0%,
                hsl(var(--champagne)) 40%
              )
            `,
            mixBlendMode: 'multiply',
          }}
        />
      </motion.div>

      {/* SVG filter for paper texture */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="paper-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="1 0" />
            </feComponentTransfer>
            <feMorphology operator="erode" radius="1" />
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
};

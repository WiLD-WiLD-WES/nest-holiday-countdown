import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { Lock } from "lucide-react";

interface GiftBoxProps {
  number: number;
  image: string;
  isLocked: boolean;
  isOpened: boolean;
  onClick: () => void;
}

export const GiftBox = ({ number, image, isLocked, isOpened, onClick }: GiftBoxProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLocked) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    x.set(mouseX / (rect.width / 2));
    y.set(mouseY / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="perspective-1000 relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isLocked && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={!isLocked ? onClick : undefined}
    >
      <motion.div
        className={`
          relative aspect-square rounded-lg overflow-hidden cursor-pointer
          preserve-3d gift-shimmer
          ${isLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
          ${isOpened ? 'opacity-50' : ''}
        `}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={!isLocked ? { scale: 1.05 } : {}}
        whileTap={!isLocked ? { scale: 0.95 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <img
          src={image}
          alt={`Day ${number}`}
          className="w-full h-full object-cover"
        />
        
        {/* Glow effect on hover */}
        {isHovered && !isLocked && (
          <motion.div
            className="absolute inset-0 bg-gold/20 mix-blend-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        {/* Lock overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
        )}

        {/* Opened indicator */}
        {isOpened && !isLocked && (
          <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="text-champagne text-sm font-medium tracking-wider">
              OPENED
            </span>
          </div>
        )}

        {/* Shadow effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: isHovered && !isLocked 
              ? 'var(--shadow-glow)' 
              : 'var(--shadow-deep)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Lock } from "lucide-react";

interface GiftBoxProps {
  number: number;
  image: string;
  rippedImage: string;
  isLocked: boolean;
  isOpened: boolean;
  onClick: () => void;
  isOpening?: boolean;
  animationUrl?: string;
  soundUrl?: string;
  onAnimationEnd?: () => void;
}

export const GiftBox = ({ number, image, rippedImage, isLocked, isOpened, onClick, isOpening, animationUrl, soundUrl, onAnimationEnd }: GiftBoxProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Play sound when opening animation starts
  useEffect(() => {
    if (isOpening && soundUrl && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => 
        console.error('Sound playback error:', err)
      );
    }
  }, [isOpening, soundUrl]);
  
  const clickable = !isLocked && !isOpening;
  const displayImage = isOpened ? rippedImage : image;

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!clickable) return;
    
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
      onMouseMove={clickable ? handleMouseMove : undefined}
      onMouseEnter={() => clickable && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={clickable ? onClick : undefined}
    >
      <motion.div
        className={`
          relative aspect-square rounded-lg overflow-hidden
          preserve-3d gift-shimmer
          ${isLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        `}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={clickable ? { scale: 1.05 } : {}}
        whileTap={clickable ? { scale: 0.95 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <img
          src={displayImage}
          alt={`Day ${number}`}
          className="w-full h-full object-cover"
        />
        
        {/* Hidden audio element for sound effects */}
        {soundUrl && (
          <audio ref={audioRef} src={soundUrl} preload="auto" />
        )}
        
        {/* Opening animation video overlay */}
        {isOpening && animationUrl && (
          <video
            src={animationUrl}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover z-20"
            onEnded={onAnimationEnd}
          />
        )}
        
        {/* Glow effect on hover */}
        {isHovered && !isOpening && (
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

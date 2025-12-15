import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { useEffect, useRef } from "react";
import ClickSpark from "./ClickSpark";
import { Button } from "./ui/button";
import VariableProximity from "./VariableProximity";

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  giftNumber: number;
  contentUrl?: string;
  themeColor: 'green' | 'red' | 'blue';
  agentName?: string;
  agentPhoto?: string;
  agentVideo?: string;
  quote?: string;
  ctaUrl?: string;
  ctaText?: string;
}

export const GiftModal = ({ 
  isOpen, 
  onClose, 
  giftNumber, 
  themeColor, 
  agentName, 
  agentVideo, 
  quote, 
  ctaUrl, 
  ctaText 
}: GiftModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Define luxury background colors for each theme
  const colorMap = {
    green: 'hsl(162, 45%, 22%)',   // Deep emerald
    red: 'hsl(346, 60%, 28%)',     // Deep burgundy
    blue: 'hsl(220, 55%, 25%)',    // Deep navy
  };

  const bgColor = colorMap[themeColor];
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div 
              ref={modalRef}
              className="relative w-full max-w-6xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
              style={{ backgroundColor: bgColor }}
            >
              {/* Close button with sparkle effect */}
              <div className="absolute top-4 right-4 z-10">
                <ClickSpark
                  sparkColor='#e5c781'
                  sparkSize={30}
                  sparkRadius={45}
                  sparkCount={9}
                  duration={800}
                  onClick={onClose}
                >
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                  >
                    <X className="w-5 h-5 text-foreground" />
                  </button>
                </ClickSpark>
              </div>

              {/* Scrollable content wrapper */}
              <div className="overflow-y-auto max-h-[90vh]">
                {/* Content - Mobile: Stacked | Desktop: Two-column */}
                <div className="p-6 md:p-10">
                  {/* Layout Grid */}
                  <div className="flex flex-col md:grid md:grid-cols-[400px_1fr] gap-6 md:gap-8">
                    {/* Left Column: Video only (bottom on mobile) */}
                    <motion.div 
                      className="order-3 md:order-1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {agentVideo ? (
                        <div className="w-full aspect-[9/16] rounded-lg overflow-hidden shadow-2xl">
                          <video 
                            src={agentVideo}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-[9/16] rounded-lg bg-black/40 border-2 border-gold/30 flex items-center justify-center">
                          <span className="text-gold/60 text-lg font-semibold" style={{ fontFamily: "'Raleway', sans-serif" }}>
                            Video Coming Soon
                          </span>
                        </div>
                      )}
                    </motion.div>

                    {/* Right Column: Agent Name + Quote and CTA (top on mobile) */}
                    <motion.div 
                      className="order-1 md:order-2 flex flex-col justify-center items-center"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {/* Agent Name with VariableProximity effect */}
                      <div className="mb-6 text-center">
                        <VariableProximity
                          label={agentName || `Day ${giftNumber}`}
                          fromFontVariationSettings="'wght' 300"
                          toFontVariationSettings="'wght' 700"
                          containerRef={modalRef}
                          radius={120}
                          falloff="gaussian"
                          className="text-3xl md:text-4xl lg:text-5xl text-gold uppercase tracking-wider"
                        />
                      </div>

                      {quote ? (
                        <div className="bg-black/20 border-2 border-gold/40 rounded-xl p-6 md:p-8 shadow-xl w-full max-w-xl">
                          <p className="text-gold text-base md:text-lg leading-relaxed mb-6 text-center whitespace-pre-line" style={{ fontFamily: "'Raleway', sans-serif" }}>
                            "{quote}"
                          </p>
                          
                          {ctaUrl && ctaText && (
                            <div className="flex justify-center">
                              <ClickSpark
                                sparkColor='#e5c781'
                                sparkSize={30}
                                sparkRadius={45}
                                sparkCount={9}
                                duration={800}
                              >
                                <Button
                                  asChild
                                  size="lg"
                                  variant="outline"
                                  className="border-2 border-gold bg-transparent text-gold hover:bg-gold hover:text-background font-semibold transition-all"
                                >
                                  <a 
                                    href={ctaUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                    style={{ fontFamily: "'Raleway', sans-serif" }}
                                  >
                                    {ctaText}
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                </Button>
                              </ClickSpark>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-black/20 border-2 border-gold/40 rounded-xl p-8 text-center">
                          <p className="text-gold/60 text-lg" style={{ fontFamily: "'Raleway', sans-serif" }}>
                            Content coming soon for Day {giftNumber}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
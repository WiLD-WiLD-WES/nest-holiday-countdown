import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { useEffect } from "react";
import ClickSpark from "./ClickSpark";
import { Button } from "./ui/button";

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  giftNumber: number;
  contentUrl?: string;
  themeColor: 'green' | 'red' | 'blue';
  agentName?: string;
  agentPhoto?: string;
  quote?: string;
  ctaUrl?: string;
  ctaText?: string;
}

export const GiftModal = ({ isOpen, onClose, giftNumber, contentUrl, themeColor, agentName, agentPhoto, quote, ctaUrl, ctaText }: GiftModalProps) => {
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div 
              className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
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

              {/* Content */}
              <div className="p-6 md:p-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  {/* Agent Name Header */}
                  <h2 className="text-3xl md:text-4xl font-bold text-gold uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {agentName || `Day ${giftNumber}`}
                  </h2>
                  
                  {/* Two Column Layout */}
                  <div className="grid md:grid-cols-[300px_1fr] gap-6 md:gap-8">
                    {/* Left Column: Agent Photo */}
                    <div className="flex justify-center md:justify-start">
                      {agentPhoto ? (
                        <div className="w-full max-w-[300px] aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
                          <img 
                            src={agentPhoto} 
                            alt={agentName}
                            className="w-full h-full object-cover grayscale"
                            style={{
                              filter: `grayscale(100%) sepia(100%) hue-rotate(${
                                themeColor === 'green' ? '80deg' : 
                                themeColor === 'red' ? '350deg' : 
                                '200deg'
                              }) saturate(300%) brightness(0.7)`
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-full max-w-[300px] aspect-[3/4] rounded-lg bg-white/95 shadow-2xl flex items-center justify-center">
                          {agentName && agentName !== "Coming Soon" ? (
                            <span className="text-6xl font-bold text-muted-foreground/30" style={{ fontFamily: "'Playfair Display', serif" }}>
                              {agentName.split(' ').map(n => n[0]).join('')}
                            </span>
                          ) : (
                            <span className="text-2xl font-bold text-muted-foreground/30" style={{ fontFamily: "'Playfair Display', serif" }}>
                              Coming Soon
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Right Column: Quote and CTA */}
                    <div className="flex flex-col justify-center">
                      {quote ? (
                        <div className="bg-black/20 border-2 border-gold/40 rounded-xl p-6 md:p-8 shadow-xl">
                          <p className="text-gold text-base md:text-lg leading-relaxed mb-6 text-center" style={{ fontFamily: "'Raleway', sans-serif" }}>
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
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

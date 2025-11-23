import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  giftNumber: number;
  contentUrl?: string;
}

export const GiftModal = ({ isOpen, onClose, giftNumber, contentUrl }: GiftModalProps) => {
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
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-2xl overflow-hidden shadow-2xl">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              {/* Content */}
              <div className="p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-gold mb-6">
                    Day {giftNumber}
                  </h2>
                  
                  <div className="bg-background/50 rounded-xl p-8 min-h-[400px] flex items-center justify-center">
                    {contentUrl ? (
                      contentUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                        <img 
                          src={contentUrl} 
                          alt={`Day ${giftNumber} content`}
                          className="max-w-full h-auto rounded-lg"
                        />
                      ) : contentUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                        <video 
                          src={contentUrl}
                          controls
                          autoPlay
                          className="max-w-full h-auto rounded-lg"
                        />
                      ) : (
                        <iframe
                          src={contentUrl}
                          className="w-full h-[500px] rounded-lg"
                          title={`Day ${giftNumber} content`}
                        />
                      )
                    ) : (
                      <div className="text-center">
                        <p className="text-xl text-muted-foreground mb-4">
                          Exclusive content for Day {giftNumber}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Content will be added here
                        </p>
                      </div>
                    )}
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

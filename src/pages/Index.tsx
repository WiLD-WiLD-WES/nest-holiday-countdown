import { useState, useEffect } from "react";
import { GiftBox } from "@/components/GiftBox";
import { GiftModal } from "@/components/GiftModal";
import { gifts, isGiftUnlocked, getOpenedGifts, markGiftAsOpened, clearOpenedGifts } from "@/lib/giftData";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Package } from "lucide-react";

const Index = () => {
  const [testMode, setTestMode] = useState(true);
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [openingGift, setOpeningGift] = useState<number | null>(null);
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);

  useEffect(() => {
    setOpenedGifts(getOpenedGifts());
  }, []);

  const handleGiftClick = (giftNumber: number) => {
    if (!isGiftUnlocked(giftNumber, testMode)) return;
    
    const gift = gifts.find(g => g.number === giftNumber);
    
    if (gift?.animationUrl) {
      setOpeningGift(giftNumber);
    } else {
      setSelectedGift(giftNumber);
      markGiftAsOpened(giftNumber);
      setOpenedGifts(getOpenedGifts());
    }
  };

  const handleAnimationEnd = (giftNumber: number) => {
    setOpeningGift(null);
    setSelectedGift(giftNumber);
    markGiftAsOpened(giftNumber);
    setOpenedGifts(getOpenedGifts());
  };

  const handleCloseModal = () => {
    setSelectedGift(null);
  };

  const handleResetGifts = () => {
    clearOpenedGifts();
    setOpenedGifts([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald via-background to-navy relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-burgundy rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gold mb-4 tracking-tight">
            HOLIDAY COUNTDOWN 2025
          </h1>
          <p className="text-xl md:text-2xl text-champagne font-light tracking-wide">
            Unwrap 25 Days of Nest Seeker Excellence
          </p>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Test Mode Toggle */}
          <div className="flex items-center gap-3">
            <Label htmlFor="test-mode" className="text-sm text-muted-foreground">
              Test Mode (All Unlocked)
            </Label>
            <Switch
              id="test-mode"
              checked={testMode}
              onCheckedChange={setTestMode}
            />
          </div>

          {/* Re-Wrap Button */}
          <Button
            onClick={handleResetGifts}
            variant="outline"
            className="border-gold/30 text-gold hover:bg-gold/10 hover:border-gold transition-all"
          >
            <Package className="w-4 h-4 mr-2" />
            Re-Wrap All Gifts
          </Button>
        </motion.div>

        {/* Gift Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, staggerChildren: 0.05 }}
        >
          {gifts.map((gift, index) => (
            <motion.div
              key={gift.number}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
            >
              <GiftBox
                number={gift.number}
                image={gift.image}
                rippedImage={gift.rippedImage}
                isLocked={!isGiftUnlocked(gift.number, testMode)}
                isOpened={openedGifts.includes(gift.number)}
                onClick={() => handleGiftClick(gift.number)}
                isOpening={openingGift === gift.number}
                animationUrl={gift.animationUrl}
                onAnimationEnd={() => handleAnimationEnd(gift.number)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-muted-foreground mb-2">
            <a 
              href="https://nestseekersmastersdivision.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors underline underline-offset-4"
            >
              A Master's Division Digital Experience.
            </a>
          </p>
          <p className="text-xs text-muted-foreground/70 mb-1">
            COPYRIGHT © 2025. ALL RIGHTS RESERVED.
          </p>
          <p className="text-xs text-muted-foreground/70">
            BOT MINING AND WEB SCRAPING PROHIBITED.
          </p>
        </motion.div>
      </div>

      {/* Gift Modal */}
      <GiftModal
        isOpen={selectedGift !== null && openingGift === null}
        onClose={handleCloseModal}
        giftNumber={selectedGift || 0}
        contentUrl={gifts.find(g => g.number === selectedGift)?.contentUrl}
        themeColor={gifts.find(g => g.number === selectedGift)?.themeColor || 'green'}
      />
    </div>
  );
};

export default Index;

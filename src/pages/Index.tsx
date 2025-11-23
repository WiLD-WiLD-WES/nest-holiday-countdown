import { useState, useEffect } from "react";
import { GiftBox } from "@/components/GiftBox";
import { GiftModal } from "@/components/GiftModal";
import { PaperRipOverlay } from "@/components/PaperRipOverlay";
import { gifts, isGiftUnlocked, getOpenedGifts, markGiftAsOpened } from "@/lib/giftData";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const Index = () => {
  const [testMode, setTestMode] = useState(true); // Set to true for testing
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [isRipping, setIsRipping] = useState(false);
  const [rippingGift, setRippingGift] = useState<number>(0);
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);

  useEffect(() => {
    setOpenedGifts(getOpenedGifts());
  }, []);

  const handleGiftClick = (giftNumber: number) => {
    if (!isGiftUnlocked(giftNumber, testMode)) return;
    
    setRippingGift(giftNumber);
    setIsRipping(true);
    
    setTimeout(() => {
      setSelectedGift(giftNumber);
      markGiftAsOpened(giftNumber);
      setOpenedGifts(getOpenedGifts());
    }, 800);
  };

  const handleCloseModal = () => {
    setSelectedGift(null);
  };

  const handleRipComplete = () => {
    setIsRipping(false);
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
            Holiday Calendar 2025
          </h1>
          <p className="text-xl md:text-2xl text-champagne font-light tracking-wide">
            Unwrap 25 Days of Exclusive Surprises
          </p>
        </motion.div>

        {/* Test Mode Toggle */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Label htmlFor="test-mode" className="text-sm text-muted-foreground">
            Test Mode (All Unlocked)
          </Label>
          <Switch
            id="test-mode"
            checked={testMode}
            onCheckedChange={setTestMode}
          />
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
                isLocked={!isGiftUnlocked(gift.number, testMode)}
                isOpened={openedGifts.includes(gift.number)}
                onClick={() => handleGiftClick(gift.number)}
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
          <p className="text-sm text-muted-foreground">
            A Nest Seekers Exclusive Experience
          </p>
        </motion.div>
      </div>

      {/* Paper Rip Overlay */}
      <PaperRipOverlay
        key={rippingGift}
        isActive={isRipping}
        onComplete={handleRipComplete}
        giftNumber={rippingGift}
      />

      {/* Gift Modal */}
      <GiftModal
        isOpen={selectedGift !== null && !isRipping}
        onClose={handleCloseModal}
        giftNumber={selectedGift || 0}
        contentUrl={gifts.find(g => g.number === selectedGift)?.contentUrl}
      />
    </div>
  );
};

export default Index;

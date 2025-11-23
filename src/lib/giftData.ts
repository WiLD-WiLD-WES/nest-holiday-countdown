import day01 from "@/assets/gifts/day-01.jpg";
import day02 from "@/assets/gifts/day-02.jpg";
import day03 from "@/assets/gifts/day-03.jpg";
import day04 from "@/assets/gifts/day-04.jpg";
import day05 from "@/assets/gifts/day-05.jpg";
import day06 from "@/assets/gifts/day-06.jpg";
import day07 from "@/assets/gifts/day-07.jpg";
import day08 from "@/assets/gifts/day-08.jpg";
import day09 from "@/assets/gifts/day-09.jpg";
import day10 from "@/assets/gifts/day-10.jpg";

export interface Gift {
  number: number;
  image: string;
  contentUrl?: string;
  unlockDate: Date;
}

// Helper to get images for remaining days (cycling through available images)
const getImageForDay = (day: number): string => {
  const images = [day01, day02, day03, day04, day05, day06, day07, day08, day09, day10];
  return images[(day - 1) % images.length];
};

export const gifts: Gift[] = Array.from({ length: 25 }, (_, i) => ({
  number: i + 1,
  image: getImageForDay(i + 1),
  contentUrl: undefined, // Will be populated with actual content URLs
  unlockDate: new Date(2025, 11, i + 1), // December 1-25, 2025
}));

export const isGiftUnlocked = (giftNumber: number, testMode: boolean = false): boolean => {
  if (testMode) return true;
  
  const gift = gifts.find(g => g.number === giftNumber);
  if (!gift) return false;
  
  const now = new Date();
  return now >= gift.unlockDate;
};

export const getOpenedGifts = (): number[] => {
  const stored = localStorage.getItem('nest-opened-gifts');
  return stored ? JSON.parse(stored) : [];
};

export const markGiftAsOpened = (giftNumber: number): void => {
  const opened = getOpenedGifts();
  if (!opened.includes(giftNumber)) {
    opened.push(giftNumber);
    localStorage.setItem('nest-opened-gifts', JSON.stringify(opened));
  }
};

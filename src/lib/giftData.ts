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
import day11 from "@/assets/gifts/day-11.jpg";
import day12 from "@/assets/gifts/day-12.jpg";
import day13 from "@/assets/gifts/day-13.jpg";
import day14 from "@/assets/gifts/day-14.jpg";
import day15 from "@/assets/gifts/day-15.jpg";
import day16 from "@/assets/gifts/day-16.jpg";
import day17 from "@/assets/gifts/day-17.jpg";
import day18 from "@/assets/gifts/day-18.jpg";
import day19 from "@/assets/gifts/day-19.jpg";
import day20 from "@/assets/gifts/day-20.jpg";
import day21 from "@/assets/gifts/day-21.jpg";
import day22 from "@/assets/gifts/day-22.jpg";
import day23 from "@/assets/gifts/day-23.jpg";
import day24 from "@/assets/gifts/day-24.jpg";
import day25 from "@/assets/gifts/day-25.jpg";

import day01Anim from "@/assets/animations/day-01.mp4";

export interface Gift {
  number: number;
  image: string;
  contentUrl?: string;
  animationUrl?: string;
  unlockDate: Date;
  themeColor: 'green' | 'red' | 'blue';
}

// Direct mapping of all 25 unique gift images
const giftImages = [
  day01, day02, day03, day04, day05,
  day06, day07, day08, day09, day10,
  day11, day12, day13, day14, day15,
  day16, day17, day18, day19, day20,
  day21, day22, day23, day24, day25
];

// Color pattern for each gift's wrapping paper (repeating green-red-blue)
const giftColors: ('green' | 'red' | 'blue')[] = [
  'green', 'red', 'blue', 'green', 'red',      // Days 1-5
  'blue', 'green', 'red', 'blue', 'green',     // Days 6-10
  'red', 'blue', 'green', 'red', 'blue',       // Days 11-15
  'green', 'red', 'blue', 'green', 'red',      // Days 16-20
  'blue', 'green', 'red', 'blue', 'green'      // Days 21-25
];

export const gifts: Gift[] = Array.from({ length: 25 }, (_, i) => {
  const number = i + 1;
  return {
    number,
    image: giftImages[i],
    contentUrl: undefined,
    animationUrl: number === 1 ? day01Anim : undefined,
    unlockDate: new Date(2025, 11, number),
    themeColor: giftColors[i],
  };
});

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

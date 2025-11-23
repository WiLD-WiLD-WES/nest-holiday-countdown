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

import ripped01 from "@/assets/ripped/day-01.jpg";
import ripped02 from "@/assets/ripped/day-02.jpg";
import ripped03 from "@/assets/ripped/day-03.jpg";
import ripped04 from "@/assets/ripped/day-04.jpg";
import ripped05 from "@/assets/ripped/day-05.jpg";
import ripped06 from "@/assets/ripped/day-06.jpg";
import ripped07 from "@/assets/ripped/day-07.jpg";
import ripped08 from "@/assets/ripped/day-08.jpg";
import ripped09 from "@/assets/ripped/day-09.jpg";
import ripped10 from "@/assets/ripped/day-10.jpg";
import ripped11 from "@/assets/ripped/day-11.jpg";
import ripped12 from "@/assets/ripped/day-12.jpg";
import ripped13 from "@/assets/ripped/day-13.jpg";
import ripped14 from "@/assets/ripped/day-14.jpg";
import ripped15 from "@/assets/ripped/day-15.jpg";
import ripped16 from "@/assets/ripped/day-16.jpg";
import ripped17 from "@/assets/ripped/day-17.jpg";
import ripped18 from "@/assets/ripped/day-18.jpg";
import ripped19 from "@/assets/ripped/day-19.jpg";
import ripped20 from "@/assets/ripped/day-20.jpg";
import ripped21 from "@/assets/ripped/day-21.jpg";
import ripped22 from "@/assets/ripped/day-22.jpg";
import ripped23 from "@/assets/ripped/day-23.jpg";
import ripped24 from "@/assets/ripped/day-24.jpg";
import ripped25 from "@/assets/ripped/day-25.jpg";

import day01Anim from "@/assets/animations/day-01.mp4";

export interface Gift {
  number: number;
  image: string;
  rippedImage: string;
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

// Ripped paper images for opened gifts
const rippedImages = [
  ripped01, ripped02, ripped03, ripped04, ripped05,
  ripped06, ripped07, ripped08, ripped09, ripped10,
  ripped11, ripped12, ripped13, ripped14, ripped15,
  ripped16, ripped17, ripped18, ripped19, ripped20,
  ripped21, ripped22, ripped23, ripped24, ripped25
];

// Exact color pattern for each gift's wrapping paper
const giftColors: ('green' | 'red' | 'blue')[] = [
  'green', 'red', 'green', 'blue', 'red',      // Days 1-5
  'blue', 'green', 'blue', 'red', 'green',     // Days 6-10
  'red', 'blue', 'red', 'green', 'blue',       // Days 11-15
  'blue', 'green', 'blue', 'red', 'blue',      // Days 16-20
  'green', 'red', 'green', 'blue', 'red'       // Days 21-25
];

export const gifts: Gift[] = Array.from({ length: 25 }, (_, i) => {
  const number = i + 1;
  return {
    number,
    image: giftImages[i],
    rippedImage: rippedImages[i],
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

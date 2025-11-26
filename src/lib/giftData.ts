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
import day02Anim from "@/assets/animations/day-02.mp4";
import day03Anim from "@/assets/animations/day-03.mp4";
import day04Anim from "@/assets/animations/day-04.mp4";
import day05Anim from "@/assets/animations/day-05.mp4";
import day06Anim from "@/assets/animations/day-06.mp4";
import day07Anim from "@/assets/animations/day-07.mp4";
import day08Anim from "@/assets/animations/day-08.mp4";
import day09Anim from "@/assets/animations/day-09.mp4";
import day10Anim from "@/assets/animations/day-10.mp4";
import day11Anim from "@/assets/animations/day-11.mp4";
import day12Anim from "@/assets/animations/day-12.mp4";
import day13Anim from "@/assets/animations/day-13.mp4";
import day14Anim from "@/assets/animations/day-14.mp4";
import day15Anim from "@/assets/animations/day-15.mp4";
import day16Anim from "@/assets/animations/day-16.mp4";
import day17Anim from "@/assets/animations/day-17.mp4";
import day18Anim from "@/assets/animations/day-18.mp4";
import day19Anim from "@/assets/animations/day-19.mp4";
import day20Anim from "@/assets/animations/day-20.mp4";
import day21Anim from "@/assets/animations/day-21.mp4";
import day22Anim from "@/assets/animations/day-22.mp4";
import day23Anim from "@/assets/animations/day-23.mp4";
import day24Anim from "@/assets/animations/day-24.mp4";
import day25Anim from "@/assets/animations/day-25.mp4";

export interface Gift {
  number: number;
  image: string;
  rippedImage: string;
  contentUrl?: string;
  animationUrl?: string;
  unlockDate: Date;
  themeColor: 'green' | 'red' | 'blue';
  agentName?: string;
  agentPhoto?: string;
  quote?: string;
  ctaUrl?: string;
  ctaText?: string;
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

// Opening animation videos for all 25 gifts
const animationUrls = [
  day01Anim, day02Anim, day03Anim, day04Anim, day05Anim,
  day06Anim, day07Anim, day08Anim, day09Anim, day10Anim,
  day11Anim, day12Anim, day13Anim, day14Anim, day15Anim,
  day16Anim, day17Anim, day18Anim, day19Anim, day20Anim,
  day21Anim, day22Anim, day23Anim, day24Anim, day25Anim
];

// Agent data for days 1-5
const agentData: Record<number, { agentName: string; quote: string; ctaUrl: string; ctaText: string }> = {
  1: {
    agentName: "ANGELA PAGE",
    quote: "My biggest win this year was watching one client relationship turn into five separate transactions. It was a powerful reminder that this business always rewards relationships first. When you lead with trust and service, the deals follow. Success is built one genuine connection at a time.",
    ctaUrl: "https://nestseekersmastersdivision.com/agent/angela-page",
    ctaText: "MORE ABOUT ANGELA"
  },
  2: {
    agentName: "ENRICO MELEO",
    quote: "My favorite moment of 2025 was securing a first home for two navy veterans using a VA Loan. Was a long and tough journey but we got them into their ideal dream home. Very happy for them!",
    ctaUrl: "https://nestseekersmastersdivision.com/agent/enrico-meleo",
    ctaText: "MORE ABOUT ENRICO"
  },
  3: {
    agentName: "ROBERTA FELDMAN",
    quote: "In 2025, I helped several Upper East Side and Carnegie Hill sellers navigate shifting rates and mixed buyer sentiment, and still achieve strong outcomes on their sales. Guiding clients through that uncertainty and delivering real financial wins was the highlight of my year.",
    ctaUrl: "https://nestseekersmastersdivision.com/agent/roberta-feldman",
    ctaText: "MORE ABOUT ROBERTA"
  },
  4: {
    agentName: "SACHIKO HONDA",
    quote: "Carrying the confidence of a major win, I entered this year ready to elevate my follow-up, momentum, and meaningful client relationships. I grew my rental portfolio, met amazing new clients, and helped investor buyers with the experience I've built over the years.",
    ctaUrl: "https://nestseekersmastersdivision.com/agent/sachiko-honda",
    ctaText: "MORE ABOUT SACHIKO"
  },
  5: {
    agentName: "BRETT COMPTON",
    quote: "A banner moment for me, in 2025, was stepping deeper into my role as COO, of The Masters Division, and building real structure around our operations, training, and compliance so our agents could focus on winning business. I am proud of how much more empowered, informed, and supported our agents are now compared to where we started.",
    ctaUrl: "https://nestseekersmastersdivision.com/agent/brett-d-n-compton",
    ctaText: "MORE ABOUT BRETT"
  }
};

export const gifts: Gift[] = Array.from({ length: 25 }, (_, i) => {
  const number = i + 1;
  const agent = agentData[number];
  
  return {
    number,
    image: giftImages[i],
    rippedImage: rippedImages[i],
    contentUrl: undefined,
    animationUrl: animationUrls[i],
    unlockDate: new Date(2025, 11, number),
    themeColor: giftColors[i],
    agentName: agent?.agentName || "Coming Soon",
    agentPhoto: undefined,
    quote: agent?.quote,
    ctaUrl: agent?.ctaUrl,
    ctaText: agent?.ctaText,
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

export const clearOpenedGifts = (): void => {
  localStorage.removeItem('nest-opened-gifts');
};

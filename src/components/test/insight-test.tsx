'use client';

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";
import FlippableCard from "@/components/test/flippable-card";
import TestFooter from "../test-footer";
import { ArrowLeft } from "lucide-react";

interface EmotionData {
  result: string;
  description: string;
  dominantEmotion: string;
  color: string;
}

type EmotionMap = {
  [key: string]: EmotionData;
}

const EMOTIONS: EmotionMap = {
  anxious: {
    result: "Cemas Ringan",
    description: "Kadang kamu merasa tegang atau khawatir, tapi masih bisa berfungsi dengan normal dalam aktivitas harian.",
    dominantEmotion: "Gelisah",
    color: "#FAA916"
  }
  // Future emotions can be added here:
  // happy: {
  //   result: "Bahagia",
  //   description: "Kamu sedang dalam kondisi emosi yang positif dan penuh semangat.",
  //   dominantEmotion: "Senang",
  //   color: "#4CAF50"
  // },
  // sad: {
  //   result: "Sedih",
  //   description: "Kamu mungkin sedang mengalami perasaan sedih atau kehilangan.",
  //   dominantEmotion: "Murung",
  //   color: "#2196F3"
  // }
};

const CARD_STYLE = "w-[300px] h-[400px] md:w-[380px] md:h-[500px]";

const SOCIAL_LINKS = [
  { platform: "Instagram", url: "https://www.instagram.com/", iconPath: "/social/instagram.svg" },
  { platform: "X", url: "https://x.com/", iconPath: "/social/x.svg" }
];

function CardFront({ emotion }: { emotion: EmotionData }) {
  const words = emotion.result.split(' ');
  
  return (
    <div 
      className="flex flex-col items-center justify-center h-full w-full rounded-2xl text-white p-6"
      style={{ backgroundColor: emotion.color }}
    >
      <span className="text-5xl md:text-6xl font-bold text-center leading-tight">
        {words.length > 1 ? (
          <>
            {words[0]}<br/>{words.slice(1).join(' ')}
          </>
        ) : (
          words[0]
        )}
      </span>
    </div>
  );
}

function CardBack({ emotion }: { emotion: EmotionData }) {
  return (
    <div className="flex flex-col items-center text-[#0E103D] text-center p-6 h-full">
      <span 
        className="text-5xl md:text-6xl font-bold text-center leading-tight mt-4"
        style={{ color: emotion.color }}
      >
        {emotion.result}
      </span>
      
      <div className="flex-grow flex items-center justify-center">
        <p className="text-base leading-relaxed text-[#0E103D]">{emotion.description}</p>
      </div>
      
      <div className="flex flex-col items-center mb-4">
        <span className="text-xl font-bold mb-1 text-[#0E103D]">Emosi Dominan</span>
        <span 
          className="text-3xl md:text-4xl font-bold"
          style={{ color: emotion.color }}
        >
          {emotion.dominantEmotion}
        </span>
      </div>
    </div>
  );
}

function SocialSharing() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-white/80 text-base">Share ke:</span>
      <div className="flex gap-3 text-white">
        {SOCIAL_LINKS.map(link => (
          <a 
            key={link.platform}
            href={link.url}
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition"
          >
            <Image 
              src={link.iconPath}
              alt={link.platform} 
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

function NavigationBar({ maxWidth }: { maxWidth: string }) {
  return (
    <div className="flex justify-between items-center w-full" style={{ maxWidth }}>
      <Link href="/test/form" className="text-white/80 hover:text-white transition text-base font-medium">
        Tes Ulang
      </Link>
      <SocialSharing />
    </div>
  );
}

function BackButton() {
  return (
    <div className="w-full max-w-md mb-8 text-left">
      <Link href="/test" className="inline-flex items-center text-white/80 hover:text-white transition">
        <ArrowLeft className="h-5 w-5 mr-2" />
        Kembali
      </Link>
    </div>
  );
}

export default function TestInsightPage() {
  const currentEmotion = EMOTIONS.anxious;
  const maxWidth = CARD_STYLE.includes("md:w-[380px]") ? "380px" : "300px";
  
  return (
    <div className="flex flex-col min-h-screen bg-[#0E103D] text-white font-sans">
      <Container className="flex-grow flex flex-col items-center justify-center py-8">
        <BackButton />

        <div className="flex justify-center items-center mb-8">
          <FlippableCard
            frontContent={<CardFront emotion={currentEmotion} />}
            backContent={<CardBack emotion={currentEmotion} />}
            className={CARD_STYLE}
          />
        </div>

        <NavigationBar maxWidth={maxWidth} />
      </Container>
      <TestFooter />
    </div>
  );
}

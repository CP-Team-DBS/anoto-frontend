'use client';

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";
import FlippableCard from "@/components/test/flippable-card";

const TEST_INSIGHT_DATA = {
  result: "Cemas Ringan",
  description: "Kadang kamu merasa tegang atau khawatir, tapi masih bisa berfungsi dengan normal dalam aktivitas harian.",
  dominantEmotion: "Gelisah",
  cardStyle: "w-[300px] h-[400px] md:w-[380px] md:h-[500px]",
};

const SOCIAL_LINKS = [
  { 
    platform: "Instagram", 
    url: "https://www.instagram.com/",
    iconPath: "/icons/instagram.svg" 
  },
  { 
    platform: "X", 
    url: "https://x.com/", 
    iconPath: "/icons/x.svg" 
  }
];

const CardFront = () => {
  const words = TEST_INSIGHT_DATA.result.split(' ');
  
  return (
    <div className="flex flex-col items-center justify-center h-full w-full rounded-2xl bg-[#FAA916] text-white p-6">
      <span className="text-5xl md:text-6xl font-bold text-center leading-tight">
        {words[0]}<br/>{words[1]}
      </span>
    </div>
  );
};

const CardBack = () => (
  <div className="flex flex-col items-center text-[#0E103D] text-center p-6 h-full justify-between">
    <span className="text-3xl md:text-4xl font-bold text-center text-[#FAA916] leading-tight mt-4">
       {TEST_INSIGHT_DATA.result}
     </span>
    <p className="text-base mb-auto leading-relaxed text-[#0E103D]">{TEST_INSIGHT_DATA.description}</p>
    <div className="flex flex-col items-center mb-4">
      <span className="text-xl font-bold mb-1 text-[#0E103D]">Emosi Dominan</span>
      <span className="text-2xl font-bold text-[#FAA916]">{TEST_INSIGHT_DATA.dominantEmotion}</span>
    </div>
  </div>
);

const Footer = () => (
  <div className="bg-[#0E103D] text-white pt-4 pb-8 font-sans border-t border-white/30 mt-auto">
    <Container className="flex flex-col md:flex-row justify-between items-center text-sm">
      <div className="font-bold text-base" style={{ fontFamily: 'Inter' }}>Anoto</div>
      <div className="mt-2 md:mt-0 text-white/70 text-xs">© 2025 Anoto. All rights reserved.</div>
    </Container>
  </div>
);

const SocialSharing = () => (
  <div className="flex items-center gap-2">
    <span className="text-white/80 text-lg">Share ke:</span>
    <div className="flex gap-4 text-white">
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
            width={24} 
            height={24} 
          />
        </a>
      ))}
    </div>
  </div>
);

const NavigationLinks = () => (
  <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 mt-4 mb-8 w-full max-w-md">
    <Link href="/test" className="text-white/80 hover:text-white transition text-lg font-semibold">
      Tes Ulang
    </Link>
    <SocialSharing />
  </div>
);

const BackButton = () => (
  <div className="w-full max-w-md mb-8 text-left">
    <Link href="/test/form" className="inline-flex items-center text-white/80 hover:text-white transition">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Kembali
    </Link>
  </div>
);

export default function TestInsightPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0E103D] text-white font-sans">
      <Container className="flex-grow flex flex-col items-center justify-center py-8">
        <BackButton />

        <div className="flex justify-center items-center mb-8">
          <FlippableCard
            frontContent={<CardFront />}
            backContent={<CardBack />}
            className={TEST_INSIGHT_DATA.cardStyle}
          />
        </div>

        <NavigationLinks />
      </Container>
      <Footer />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import Link from "next/link";
import Image from "next/image";

interface EmotionDetails {
  name: string;
  svgFile: string;
}

// Full emotion details mapping
const fullEmotionDetails: Record<string, Omit<EmotionDetails, "name">> = {
  happiness: { svgFile: "happy.svg" },
  anxiety: { svgFile: "anxiety.svg" },
  sadness: { svgFile: "sadness.svg" },
  nervousness: { svgFile: "nervous.svg" },
  fear: { svgFile: "fear.svg" },
  shame: { svgFile: "shame.svg" },
  suffering: { svgFile: "suffering.svg" },
};

// EmotionCard component to display emotion image styled card
const EmotionCard = ({ emotion }: { emotion: EmotionDetails }) => {
  return (
    <div className="flex flex-col items-center justify-center w-40 h-48 text-white rounded-xl mt-10">
      <Image
        src={`/journal/${emotion.svgFile}`}
        alt={`${emotion.name} emotion`}
        width={192}
        height={230}
        className="object-contain"
        priority
      />
    </div>
  );
};

interface DominantEmotion extends EmotionDetails {
  score: number;
}

interface InsightData {
  dominantEmotions: DominantEmotion[];
  insight: string;
  validation: string;
  saran: string[];
}

interface ApiResponse {
  emotions: Array<{
    name: string;
    score: number;
  }>;
  insight: string;
  validation: string;
  saran: string[];
}

// Component for suggestions list
const SuggestionsList = ({ suggestions }: { suggestions: string[] }) => (
  <div className="max-w-2xl mx-auto mb-16">
    <h2 className="text-2xl font-bold mb-6">Hal-hal yang Bisa Kamu Lakuin:</h2>
    <ul className="list-disc pl-6 space-y-4 text-lg">
      {suggestions.map((suggestion, index) => (
        <li key={index} className="pl-2">
          <span>{suggestion}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function InsightPage() {
  const [insightData, setInsightData] = useState<InsightData>({
    dominantEmotions: [],
    insight: "",
    validation: "",
    saran: [],
  });

  useEffect(() => {
    const storedResponse = localStorage.getItem("journalResponse");

    if (storedResponse) {
      try {
        const apiData: ApiResponse = JSON.parse(storedResponse);

        // Sort emotions by score (highest to lowest)
        const sortedEmotions = [...apiData.emotions].sort(
          (a, b) => b.score - a.score
        );

        // Map emotions
        const mappedEmotions = sortedEmotions.map((e) => {
          const details = fullEmotionDetails[e.name];
          if (details) {
            return {
              name: e.name,
              score: e.score,
              svgFile: details.svgFile,
            };
          } else {
            console.warn(
              `Unknown emotion: ${e.name}. No SVG fallback provided.`
            );
            return {
              name: e.name,
              score: e.score,
              svgFile: "",
            };
          }
        });

        setInsightData({
          dominantEmotions: mappedEmotions,
          insight: apiData.insight,
          validation: apiData.validation,
          saran: apiData.saran,
        });
      } catch (error) {
        console.error("Error parsing journal response:", error);
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0E103D] text-white font-sans">
      <Container>
        {/* Back Button */}
        <div className="pt-8 mb-8">
          <Link
            href="/journal"
            className="flex items-center text-white/80 hover:text-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali
          </Link>
        </div>

        {/* Insight Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Insight Harian
          </h1>
          <p className="text-white/70 text-lg">
            Tiga Emosi dominan kamu hari ini
          </p>
        </div>

        {/* Emotion Cards - pure SVG display within cards */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
          {insightData.dominantEmotions.slice(0, 3).map((emotion) => (
            <EmotionCard key={emotion.name} emotion={emotion} />
          ))}
        </div>

        {/* Descriptive Paragraph */}
        <div className="text-center text-xl max-w-2xl mx-auto mb-12">
          <p>{insightData.insight}</p>
          {insightData.validation && (
            <p className="mt-4 text-xl">{insightData.validation}</p>
          )}
        </div>

        {/* Horizontal Rule */}
        <hr className="border-white/30 mb-12 mx-auto max-w-3xl" />

        {/* Suggestions Section */}
        <SuggestionsList suggestions={insightData.saran} />
      </Container>
    </div>
  );
}

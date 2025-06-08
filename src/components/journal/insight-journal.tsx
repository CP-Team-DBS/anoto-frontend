import Container from "@/components/ui/container";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import TestFooter from "@/components/test-footer";


interface Emotion {
  name: string;
  bgColor: string;
  svgFile: string;
}

interface InsightData {
  dominantEmotions: string[];
  description: string;
  suggestions: string[];
}

// Utility function to map emotion to its style properties
const getEmotionStyle = (emotion: string): Emotion => {
  const emotionMap: Record<string, Emotion> = {
    Senang: { name: 'Senang', bgColor: 'bg-[#7ECAA7]', svgFile: 'insight-senang.svg' },
    Cemas: { name: 'Cemas', bgColor: 'bg-[#F9A98C]', svgFile: 'insight-cemas.svg' },
    Sedih: { name: 'Sedih', bgColor: 'bg-[#49A1D9]', svgFile: 'insight-sedih.svg' },
  };
  
  return emotionMap[emotion] || { name: emotion, bgColor: 'bg-gray-400', svgFile: 'default.svg' };
};

// Component for a single emotion card
const EmotionCard = ({ emotion }: { emotion: string }) => {
  const emotionStyle = getEmotionStyle(emotion);
  
  return (
    <Card 
      className={`w-full max-w-[180px] h-[220px] ${emotionStyle.bgColor} rounded-2xl 
                 shadow-lg p-4 flex flex-col items-center justify-between border-none text-[#0E103D]`}
    >
      <span className="font-bold text-xl mt-4 text-white">{emotion}</span>
      <div className="w-24 h-24 flex items-center justify-center mb-4">
        <img 
          src={`/illusts/${emotionStyle.svgFile}`}
          alt={`${emotion} emotion`}
          className="w-full h-full"
        />
      </div>
    </Card>
  );
};

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
  // In a real application, you would fetch the journal entry and insights based on the ID
  
  // Mock data for insights
  const insights: InsightData = {
    dominantEmotions: ['Senang', 'Cemas', 'Sedih'],
    description: 'Walau mood campur aduk hari ini, santai aja, kamu tetep keren walau hidup lagi kayak rollercoaster.',
    suggestions: [
      'Nangis aja, gapapa kok, kadang emosi emang harus dikeluarin',
      'Tarik napas pelan-pelan, tenangin badan, bawa santai aja',
      'Coba keluar sebentar, jalan santai liat langit atau pohon',
      'Cerita ke temen atau orang yang kamu percaya, jangan dipendam semuanya sendiri',
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0E103D] text-white font-sans">
      <Container>
        {/* Back Button */}
        <div className="pt-8 mb-8">
          <Link href="/journal" className="flex items-center text-white/80 hover:text-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali
          </Link>
        </div>

        {/* Insight Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Insight Harian</h1>
          <p className="text-white/70 text-lg">Tiga Emosi dominan kamu hari ini</p>
        </div>

        {/* Emotion Cards */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
          {insights.dominantEmotions.map(emotion => (
            <EmotionCard key={emotion} emotion={emotion} />
          ))}
        </div>

        {/* Descriptive Paragraph */}
        <div className="text-center text-xl max-w-2xl mx-auto mb-12">
          <p>{insights.description}</p>
        </div>

        {/* Horizontal Rule */}
        <hr className="border-white/30 mb-12 mx-auto max-w-3xl" />

        {/* Suggestions Section */}
        <SuggestionsList suggestions={insights.suggestions} />
      </Container>

      {/* Test Footer */}
      <TestFooter />
    </div>
  );
}
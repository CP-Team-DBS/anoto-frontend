import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Predefined data
const MOOD_OPTIONS = [
  { emoji: "emoji-form1", bg: "bg-[#8B5CF6]", alt: "Happy mood" },
  { emoji: "emoji-form2", bg: "bg-[#8B5CF6]", alt: "Laughing mood" },
  { emoji: "emoji-form3", bg: "bg-[#ED506B]", alt: "Love mood" },
  { emoji: "emoji-form4", bg: "bg-[#FFCCD5]", alt: "Sad mood" }
];

const SUMMARY_POINTS = [
  "Hari ini aku ngerasa capek banget.",
  "Mood aku naik turun seharian.",
  "Aku senang karena hal kecil tadi.",
  "Kayaknya aku butuh istirahat sebentar."
];

const BackButton = () => (
  <div className="mb-4 relative z-10">
    <Link href="/journal" className="flex items-center text-gray-600 hover:text-[#0E103D] transition text-lg">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 mr-2" 
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
);

const MoodSelector = () => (
  <div className="absolute top-20 left-8 flex gap-3 z-0">
    {MOOD_OPTIONS.map((item, index) => (
      <div 
        key={index}
        className={`w-[50px] h-[50px] rounded-lg ${item.bg} flex items-center justify-center cursor-pointer hover:scale-110 transition`}
      >
        <Image 
          src={`/illusts/${item.emoji}.svg`} 
          alt={item.alt}
          width={32}
          height={32}
          className="w-8 h-8"
        />
      </div>
    ))}
  </div>
);

const ActionButtons = () => (
  <div className="flex justify-end gap-4 mt-10">
    <Button 
      type="submit" 
      className="bg-yellow-400 hover:bg-yellow-500 rounded-md hover:scale-105 transition-transform w-[140px] h-[45px] text-lg flex items-center justify-center text-[#0E103D] font-bold"
    >
      Simpan Jurnal
    </Button>
    <Button 
      className="bg-gray-300 hover:bg-gray-400 rounded-md hover:scale-105 transition-transform w-[140px] h-[45px] text-lg flex items-center justify-center text-[#0E103D] font-bold"
      asChild
    >
      <Link href="/journal/insight">Lihat Insight</Link>
    </Button>
  </div>
);

export default function JournalForm() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white p-8 rounded-lg shadow-md text-[#0E103D] relative">
      <BackButton />
      <MoodSelector />
      
      <div className="flex flex-col md:flex-row gap-10 mt-20 mb-8">
        <div className="flex-none w-[280px] h-[400x] bg-gray-100 p-6 rounded-md overflow-y-auto">
          <ul className="space-y-5 px-1">
            {SUMMARY_POINTS.map((item, index) => (
              <li key={index} className="text-2xl text-gray-700 leading-tight flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-gray-500 mt-3 mr-3"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 min-w-0 h-[400px] relative">
          <label htmlFor="journalEntry" className="sr-only">Apa yang kamu rasakan hari ini?</label>
          <textarea
            id="journalEntry"
            rows={10}
            className="w-full h-full px-5 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg resize-none"
            placeholder="Mulai menulis di sini..."
          ></textarea>
          <div className="absolute bottom-[-40px] left-0">
            <p className="text-sm text-black leading-tight font-bold">
              Semua catatan di sini<br />hanya bisa diakses oleh kamu.
            </p>
          </div>
        </div>
      </div>

      <ActionButtons />
    </div>
  );
}

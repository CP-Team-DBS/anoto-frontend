'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";

const EMOTIONS = [
  "Senang", "Gemas", "Sedih", "Capek", "Stres", "Biasa", "Tenang"
];

const DUMMY_PROMPT_RESPONSES: Record<string, string[]> = {
  Senang: ["Aku senang karena hal kecil tadi."],
  Gemas: ["Mood aku naik turun seharian."],
  Sedih: ["Kayaknya aku butuh istirahat sebentar."],
  Capek: ["Hari ini aku ngerasa capek banget."],
  Stres: ["Aku merasa stres karena banyak pikiran."],
  Biasa: ["Hari ini terasa biasa saja."],
  Tenang: ["Aku merasa tenang setelah menyendiri sejenak."]
};

export default function JournalForm() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const insightRef = useRef<HTMLAnchorElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotion)
        ? prev.filter((e) => e !== emotion)
        : [...prev, emotion]
    );
  };

  const applyFilter = () => {
    const allSuggestions: string[] = [];
    selectedEmotions.forEach((e) => {
      const entries = DUMMY_PROMPT_RESPONSES[e];
      if (entries) allSuggestions.push(...entries);
    });
    setSuggestions(allSuggestions);
  };

  const insertText = (text: string) => {
    if (textareaRef.current) {
      const current = textareaRef.current.value;
      const newText = current ? `${current}\n${text}` : text;
      textareaRef.current.value = newText;
      checkTextarea(); // Update tombol saat teks berubah via klik saran
    }
  };

  const resetFilter = () => {
    setSelectedEmotions([]);
    setSuggestions([]);
    if (textareaRef.current) {
      textareaRef.current.value = "";
      checkTextarea();
    }
  };

  const checkTextarea = () => {
    const value = textareaRef.current?.value.trim() || "";
    const isEmpty = value.length === 0;

    if (insightRef.current) {
      insightRef.current.classList.toggle("pointer-events-none", isEmpty);
      insightRef.current.classList.toggle("opacity-50", isEmpty);
    }

    if (submitBtnRef.current) {
      submitBtnRef.current.disabled = isEmpty;
      submitBtnRef.current.classList.toggle("opacity-50", isEmpty);
      submitBtnRef.current.classList.toggle("cursor-not-allowed", isEmpty);
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.addEventListener("input", checkTextarea);
    checkTextarea();

    return () => textarea.removeEventListener("input", checkTextarea);
  }, []);

  return (
    <div className="w-full max-w-screen-lg mx-auto bg-[#FFFFFF] p-8 rounded-lg border-none text-[#0E103D]">
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

      <div className="flex gap-4 items-start relative">
        <div className="w-[260px] min-h-[400px] bg-white rounded-xl border-black p-4 shadow-[0_0_7px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                const panel = document.getElementById("filter-panel");
                if (panel) panel.classList.toggle("hidden");
              }}
              className="flex items-center gap-2 bg-[#F5F5F5] px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-200"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filter Emosi
            </button>
            <button
              onClick={resetFilter}
              className="text-xs text-blue-500 hover:underline"
            >
              Reset
            </button>
          </div>

          <div
            id="filter-panel"
            className="mt-4 w-full bg-white border border-gray-200 rounded-md p-4 shadow hidden z-20"
          >
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Pilih Emosi</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {EMOTIONS.map((emotion) => {
                const isSelected = selectedEmotions.includes(emotion);
                return (
                  <button
                    key={emotion}
                    data-emotion
                    onClick={() => toggleEmotion(emotion)}
                    className={`px-3 py-1 text-sm rounded-full border transition ${isSelected
                      ? 'bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200'
                      : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                      }`}
                  >
                    {emotion}
                  </button>
                );
              })}
            </div>
            <Button
              onClick={applyFilter}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white text-sm"
            >
              Terapkan Filter
            </Button>
          </div>

          {suggestions.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Pilih Template Teks:</h3>
              <ul className="space-y-2 text-sm">
                {suggestions.map((text, idx) => (
                  <li
                    key={idx}
                    onClick={() => insertText(text)}
                    className="cursor-pointer text-blue-700 hover:underline"
                  >
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex-1 bg-white rounded-xl p-4 shadow-[0_0_7px_rgba(0,0,0,0.1)] min-h-[400px]">
          <textarea
            ref={textareaRef}
            rows={10}
            className="w-full h-full px-5 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg resize-none"
            placeholder="Mulai menulis di sini..."
          ></textarea>
        </div>
      </div>

      <div className="flex justify-between mt-6 items-end">
        <p className="text-sm text-black leading-tight font-regular self-end">
          Semua catatan di sini<br />hanya bisa diakses oleh kamu.
        </p>

        <div className="flex gap-4">
          <Button
            ref={submitBtnRef}
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 rounded-full hover:scale-105 transition-transform w-[140px] h-[45px] text-md flex items-center justify-center text-white font-regular"
          >
            Simpan Jurnal
          </Button>
          <Button
            className="bg-primary hover:bg-gray-400 rounded-full hover:scale-105 transition-transform w-[140px] h-[45px] text-md flex items-center justify-center text-white font-regular"
            asChild
          >
            <Link ref={insightRef} href="/journal/insight">
              Lihat Insight
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

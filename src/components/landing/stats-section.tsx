"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Container from "@/components/ui/container";

interface StatsData {
  total: number;
  anxiety: number;
  percentage: number;
}

export default function StatsSection() {
  const [stats, setStats] = useState<StatsData>({ total: 100, anxiety: 78, percentage: 78 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Use our internal API 
        const response = await fetch('/api/statistics');
        
        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }
        
        const data = await response.json();
        
        if (data.error === false && data.data?.stats) {
          setStats(data.data.stats);
        } else {
          throw new Error(data.message || 'Invalid data format');
        }
      } catch (err) {
        // fallback data the error
        console.error('Error fetching statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="bg-white py-16 md:py-24 font-sans">
      <Container>
        <div className="bg-[#8B5CF6] text-white rounded-xl shadow-lg p-8 md:p-12 transform transition-all duration-700 hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col items-center text-center">
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                <p className="text-xl">Loading statistics...</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-6 flex items-baseline justify-center animate-fade-in">
                  <Image
                    src="/icons/graph.svg"
                    alt="Graph icon"
                    width={36}
                    height={36}
                    className="mr-4 animate-pulse"
                  />
                  {stats.percentage}% pengguna Anoto mengalami kecemasan dalam
                  <br className="hidden md:inline" /> kehidupan sehari-hari.
                </h2>
                <p className="text-base md:text-lg max-w-3xl leading-relaxed animate-fade-in-delay">
                  Tapi setelah mencoba Anoto, mereka merasa lebih tenang, lebih
                  <br className="hidden md:inline" /> dimengerti, dan lebih siap
                  menghadapi hari-hari mereka.
                </p>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
"use client";

import Container from "@/components/ui/container";
import { useRef, useState, useEffect, useCallback } from "react";

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

interface StarRatingProps {
  rating: number;
}

interface NavigationButtonProps {
  direction: ScrollDirection;
  onClick: () => void;
}

type ScrollDirection = 'left' | 'right';

const TESTIMONIAL_CONFIG = {
  SCROLL: {
    DISTANCE: 350,
    SPEED: 0.8,
    PAUSE_DURATION: 3000,
  },
  UI: {
    STAR_COUNT: 5,
    MOCK_DELAY: 500,
  },
} as const;

const UI_STYLES = {
  scrollContainer: {
    scrollbarWidth: 'none' as const,
    msOverflowStyle: 'none' as const,
  },
} as const;

const TESTIMONIAL_DATA: Testimonial[] = [
  {
    "id": 1,
    "name": "Sarah P***",
    "text": "Anoto bukan cuma aplikasi, tapi ruang aman buat saya yang sedang berproses menghadapi kecemasan.",
    "rating": 5
  },
  {
    "id": 2,
    "name": "Ahmad R***",
    "text": "Dengan Anoto, saya belajar memahami perasaan saya lebih dalam. Fitur analisisnya sangat membantu.",
    "rating": 5
  },
  {
    "id": 3,
    "name": "Maya S***",
    "text": "Menulis di Anoto membantu saya menemukan pola-pola emosi yang tidak saya sadari sebelumnya.",
    "rating": 4
  },
  {
    "id": 4,
    "name": "Budi S***",
    "text": "Interface yang sederhana tapi powerful. Rekomendasi yang diberikan selalu tepat sasaran.",
    "rating": 5
  },
  {
    "id": 5,
    "name": "Rina D***",
    "text": "Anoto membantu saya mengelola stress dengan lebih baik. Sekarang saya lebih tenang menghadapi hari.",
    "rating": 4
  },
  {
    "id": 6,
    "name": "Doni P***",
    "text": "Fitur tracking mood-nya sangat berguna. Saya jadi tahu kapan saya butuh istirahat lebih.",
    "rating": 5
  },
  {
    "id": 7,
    "name": "Fitri A***",
    "text": "Saya merasa tidak sendirian lagi setelah menggunakan Anoto. Komunitasnya sangat mendukung.",
    "rating": 5
  },
  {
    "id": 8,
    "name": "Agus W***",
    "text": "Awalnya ragu, tapi ternyata Anoto sangat mudah digunakan dan dampaknya terasa sekali untuk kesehatan mental saya.",
    "rating": 4
  },
  {
    "id": 9,
    "name": "Cindy K***",
    "text": "Ini aplikasi yang saya cari-cari. Simpel, privat, dan benar-benar fokus membantu pengguna merasa lebih baik.",
    "rating": 5
  },
  {
    "id": 10,
    "name": "Rian H***",
    "text": "Latihan pernapasan dan meditasi singkat di Anoto jadi andalan saya untuk meredakan panik. Sangat praktis!",
    "rating": 5
  },
  {
    "id": 11,
    "name": "Dewi L***",
    "text": "Menjadikan Anoto sebagai jurnal harian adalah keputusan terbaik. Saya jadi lebih kenal dengan diri sendiri.",
    "rating": 5
  },
  {
    "id": 12,
    "name": "Fajar N***",
    "text": "Sangat merekomendasikan Anoto untuk siapa saja yang ingin memulai perjalanan self-care tapi bingung mulai dari mana.",
    "rating": 5
  }
];

async function fetchTestimonials(): Promise<Testimonial[]> {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/testimonials');
  // return response.json();
  
  await new Promise(resolve => setTimeout(resolve, TESTIMONIAL_CONFIG.UI.MOCK_DELAY));
  return TESTIMONIAL_DATA;
}

function StarRating({ rating }: StarRatingProps) {
  const stars = Array.from({ length: TESTIMONIAL_CONFIG.UI.STAR_COUNT }, (_, index) => {
    const isFilled = index < rating;
    const starColor = isFilled ? 'text-yellow-400' : 'text-gray-300';
    
    return (
      <svg
        key={index}
        className={`w-6 h-6 ${starColor}`}
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  });

  return (
    <div className="flex justify-center items-center gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {stars}
    </div>
  );
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="flex-shrink-0 w-80">
      <div className="bg-[#FDFBF2] text-[#0E103D] rounded-xl shadow-lg p-6 h-full flex flex-col items-center text-center min-h-[320px]">
        <header className="mb-4">
          <h3 className="text-xl font-bold">{testimonial.name}</h3>
        </header>
        
        <blockquote className="text-base leading-relaxed mb-6 flex-grow px-2">
          &ldquo;{testimonial.text}&rdquo;
        </blockquote>
        
        <footer className="mt-auto">
          <hr className="w-16 border-gray-300 mb-4 mx-auto" />
          <StarRating rating={testimonial.rating} />
        </footer>
      </div>
    </article>
  );
}

function NavigationButton({ direction, onClick }: NavigationButtonProps) {
  const isLeftDirection = direction === 'left';
  const arrowPath = isLeftDirection ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7";
  const ariaLabel = `Scroll testimonials ${direction}`;
  
  return (
    <button
      type="button"
      className="p-3 rounded-full bg-white text-[#2D234F] hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white flex-shrink-0"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth="2"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d={arrowPath} 
        />
      </svg>
    </button>
  );
}

function TestimonialGrid({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <>
      {testimonials.map((testimonial) => (
        <TestimonialCard 
          key={testimonial.id} 
          testimonial={testimonial} 
        />
      ))}
    </>
  );
}

function LoadingState() {
  return (
    <div className="w-full flex justify-center items-center py-20" role="status" aria-live="polite">
      <p className="text-white text-lg">Loading testimonials...</p>
    </div>
  );
}

function ErrorState({ error }: { error: string }) {
  return (
    <section className="bg-[#2D234F] py-16 md:py-24 font-sans text-white">
      <Container>
        <div className="text-center" role="alert">
          <p className="text-red-400">Error loading testimonials: {error}</p>
        </div>
      </Container>
    </section>
  );
}

function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTestimonials();
        
        if (isMounted) {
          setTestimonials(data);
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch testimonials';
          setError(errorMessage);
          console.error('Failed to fetch testimonials:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadTestimonials();

    return () => {
      isMounted = false;
    };
  }, []);

  return { testimonials, loading, error };
}

function useAutoScroll() {
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('right');
  const animationFrameRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleDirection = useCallback(() => {
    setScrollDirection(prev => prev === 'right' ? 'left' : 'right');
  }, []);

  const pauseAutoScroll = useCallback(() => {
    setIsAutoScrolling(false);
  }, []);

  const resumeAutoScroll = useCallback(() => {
    setIsAutoScrolling(true);
  }, []);

  const pauseTemporarily = useCallback(() => {
    setIsAutoScrolling(false);
    
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    
    pauseTimeoutRef.current = setTimeout(() => {
      setIsAutoScrolling(true);
    }, TESTIMONIAL_CONFIG.SCROLL.PAUSE_DURATION);
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  return {
    isAutoScrolling,
    scrollDirection,
    animationFrameRef,
    toggleDirection,
    pauseAutoScroll,
    resumeAutoScroll,
    pauseTemporarily,
  };
}

function useScrollNavigation() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollHook = useAutoScroll();
  const {
    isAutoScrolling,
    scrollDirection,
    animationFrameRef,
    toggleDirection,
    pauseAutoScroll,
    resumeAutoScroll,
    pauseTemporarily,
  } = autoScrollHook;

  const smoothAutoScroll = useCallback(() => {
    if (!scrollContainerRef.current || !isAutoScrolling) return;
    
    const container = scrollContainerRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;
    
    const isAtRightEnd = currentScroll >= maxScroll - 1;
    const isAtLeftEnd = currentScroll <= 1;
    
    if ((scrollDirection === 'right' && isAtRightEnd) || 
        (scrollDirection === 'left' && isAtLeftEnd)) {
      toggleDirection();
      return;
    }
    
    const scrollIncrement = scrollDirection === 'right' 
      ? TESTIMONIAL_CONFIG.SCROLL.SPEED 
      : -TESTIMONIAL_CONFIG.SCROLL.SPEED;
    
    container.scrollLeft += scrollIncrement;
    animationFrameRef.current = requestAnimationFrame(smoothAutoScroll);
  }, [isAutoScrolling, scrollDirection, toggleDirection, animationFrameRef]);

  const handleManualScroll = useCallback((direction: ScrollDirection) => {
    if (!scrollContainerRef.current) return;
    
    pauseTemporarily();
    
    const scrollAmount = direction === 'left' 
      ? -TESTIMONIAL_CONFIG.SCROLL.DISTANCE 
      : TESTIMONIAL_CONFIG.SCROLL.DISTANCE;
    
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }, [pauseTemporarily]);

  useEffect(() => {
    if (!isAutoScrolling) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    animationFrameRef.current = requestAnimationFrame(smoothAutoScroll);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAutoScrolling, smoothAutoScroll, animationFrameRef]);

  return { 
    scrollContainerRef, 
    handleManualScroll, 
    pauseAutoScroll, 
    resumeAutoScroll 
  };
}

export default function TestimonialSection() {
  const { testimonials, loading, error } = useTestimonials();
  const { 
    scrollContainerRef, 
    handleManualScroll, 
    pauseAutoScroll, 
    resumeAutoScroll 
  } = useScrollNavigation();

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <section className="bg-[#2D234F] py-16 md:py-24 font-sans text-white relative overflow-hidden">
      <Container className="relative z-10">
        <header className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center">Testimoni</h2>
        </header>

        <div className="flex items-center gap-8">
          <NavigationButton 
            direction="left" 
            onClick={() => handleManualScroll('left')} 
          />

          <div
            className="flex overflow-x-auto gap-6 px-4 py-4 scrollbar-hide flex-1"
            ref={scrollContainerRef}
            style={UI_STYLES.scrollContainer}
            onMouseEnter={pauseAutoScroll}
            onMouseLeave={resumeAutoScroll}
            onTouchStart={pauseAutoScroll}
            onTouchEnd={resumeAutoScroll}
          >
            {loading ? (
              <LoadingState />
            ) : (
              <TestimonialGrid testimonials={testimonials} />
            )}
          </div>

          <NavigationButton 
            direction="right" 
            onClick={() => handleManualScroll('right')} 
          />
        </div>
      </Container>
    </section>
  );
}
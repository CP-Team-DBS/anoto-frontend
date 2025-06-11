"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";
import FlippableCard from "@/components/test/flippable-card";
import TestFooter from "../test-footer";
import { ArrowLeft } from "lucide-react";

// Types
export type AnxietyLevel = 'normal' | 'anxious_light' | 'anxious_moderate' | 'anxious_severe';

export interface TestResult {
  result: string;
  description: string;
  level: AnxietyLevel;
  score?: number;
}

interface TestInsightPageProps {
  testResult?: TestResult;
}

interface LevelConfig {
  readonly color: string;
  readonly svgPath: string;
}

// Constants
const ANXIETY_LEVELS = {
  NORMAL: 'normal',
  LIGHT: 'anxious_light', 
  MODERATE: 'anxious_moderate',
  SEVERE: 'anxious_severe'
} as const;

const ANXIETY_LEVEL_CONFIG: Record<AnxietyLevel, LevelConfig> = {
  [ANXIETY_LEVELS.NORMAL]: {
    color: "#3CC47C",
    svgPath: "/test/normal.svg"
  },
  [ANXIETY_LEVELS.LIGHT]: {
    color: "#FAA916", 
    svgPath: "/test/ringan.svg"
  },
  [ANXIETY_LEVELS.MODERATE]: {
    color: "#F25C54",
    svgPath: "/test/sedang.svg"
  },
  [ANXIETY_LEVELS.SEVERE]: {
    color: "#D72638",
    svgPath: "/test/berat.svg"
  }
} as const;

const LAYOUT_CONFIG = {
  CARD: {
    STYLE: "w-[300px] h-[400px] md:w-[380px] md:h-[500px]",
    MAX_WIDTH: {
      MOBILE: "300px",
      DESKTOP: "380px"
    }
  },
  IMAGE: {
    SIZE: 180,
    CLASSES: "w-44 h-44 md:w-48 md:h-48"
  }
} as const;

const ROUTES = {
  TEST_FORM: "/test/form",
  JOURNAL: "/journal", 
  TEST_HOME: "/test"
} as const;

const FALLBACK_RESULT: TestResult = {
  result: "Normal",
  description: "Kamu tidak merasakan kecemasan yang signifikan. Terus jaga kesehatan mentalmu!",
  level: ANXIETY_LEVELS.NORMAL,
  score: 0
} as const;

// Hooks
const useTestResult = (initialTestResult?: TestResult) => {
  const [result, setResult] = useState<TestResult | null>(null);
  
  useEffect(() => {
    // Use prop if provided
    if (initialTestResult) {
      setResult(initialTestResult);
      return;
    }
    
    // Try to get result from localStorage
    try {
      const savedResult = localStorage.getItem('gad7_result');
      
      if (savedResult) {
        setResult(JSON.parse(savedResult));
      } else {
        setResult(FALLBACK_RESULT);
      }
    } catch (e) {
      console.error('Failed to parse saved result:', e);
      setResult(FALLBACK_RESULT);
    }
  }, [initialTestResult]);

  return result ?? FALLBACK_RESULT;
};

// Utility functions
const getAnxietyConfig = (level: AnxietyLevel): LevelConfig => ANXIETY_LEVEL_CONFIG[level];

const getCardMaxWidth = (): string => (
  LAYOUT_CONFIG.CARD.STYLE.includes("md:w-[380px]") 
    ? LAYOUT_CONFIG.CARD.MAX_WIDTH.DESKTOP 
    : LAYOUT_CONFIG.CARD.MAX_WIDTH.MOBILE
);

// UI Components
interface CardContentProps {
  testResult: TestResult;
}

const TestResultCardFront = ({ testResult }: CardContentProps) => {
  const config = getAnxietyConfig(testResult.level);

  return (
    <div 
      className="flex flex-col items-center justify-center h-full w-full rounded-2xl text-white p-6"
      style={{ backgroundColor: config.color }}
    >
      <div className="mb-6">
        <Image 
          src={config.svgPath}
          alt={testResult.result}
          width={LAYOUT_CONFIG.IMAGE.SIZE}
          height={LAYOUT_CONFIG.IMAGE.SIZE}
          className={LAYOUT_CONFIG.IMAGE.CLASSES}
          priority
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-center leading-tight">
        {testResult.result}
      </h1>
      {testResult.score !== undefined && (
        <p className="mt-4 text-xl">
          Skor: {testResult.score}/21
        </p>
      )}
    </div>
  );
};

const TestResultCardBack = ({ testResult }: CardContentProps) => {
  const config = getAnxietyConfig(testResult.level);

  return (
    <div className="flex flex-col items-center text-[#0E103D] text-center p-6 h-full justify-center">
      <h2 
        className="text-4xl md:text-5xl font-bold text-center leading-tight mb-4"
        style={{ color: config.color }}
      >
        {testResult.result}
      </h2>
      
      {testResult.score !== undefined && (
        <p className="mb-4 text-lg" style={{ color: config.color }}>
          Skor: {testResult.score}/21
        </p>
      )}
      
      <div className="flex items-center justify-center px-4">
        <p className="text-lg leading-relaxed text-[#0E103D]">
          {testResult.description}
        </p>
      </div>
    </div>
  );
};

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavigationLink = ({ href, children, className = "" }: NavigationLinkProps) => (
  <Link 
    href={href}
    className={`text-white/80 hover:text-white transition-colors duration-200 text-base font-medium ${className}`}
  >
    {children}
  </Link>
);

const TestNavigationBar = ({ maxWidth }: { maxWidth: string }) => (
  <nav className="flex justify-between items-center w-full" style={{ maxWidth }}>
    <NavigationLink href={ROUTES.TEST_FORM}>
      Tes Ulang
    </NavigationLink>
    <NavigationLink href={ROUTES.JOURNAL}>
      Isi Jurnal
    </NavigationLink>
  </nav>
);

const BackNavigationButton = () => (
  <div className="w-full max-w-md mb-8 text-left">
    <NavigationLink 
      href={ROUTES.TEST_HOME}
      className="inline-flex items-center"
    >
      <ArrowLeft className="h-5 w-5 mr-2" />
      Kembali
    </NavigationLink>
  </div>
);

// Main component
export default function TestInsightPage({ testResult }: TestInsightPageProps) {
  const currentResult = useTestResult(testResult);
  const maxWidth = getCardMaxWidth();
  
  return (
    <div className="flex flex-col min-h-screen bg-[#0E103D] text-white font-sans">
      <Container className="flex-grow flex flex-col items-center justify-center py-8">
        <BackNavigationButton />

        <main className="flex justify-center items-center mb-8">
          <FlippableCard
            frontContent={<TestResultCardFront testResult={currentResult} />}
            backContent={<TestResultCardBack testResult={currentResult} />}
            className={LAYOUT_CONFIG.CARD.STYLE}
          />
        </main>

        <TestNavigationBar maxWidth={maxWidth} />
      </Container>
      <TestFooter />
    </div>
  );
}

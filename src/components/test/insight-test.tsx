'use client';

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";
import FlippableCard from "@/components/test/flippable-card";
import TestFooter from "../test-footer";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

type AnxietyLevel = 'normal' | 'anxious_light' | 'anxious_moderate' | 'anxious_severe';

interface TestResult {
  result: string;
  description: string;
  level: AnxietyLevel;
}

interface TestInsightPageProps {
  testResult?: TestResult;
}

interface LevelConfig {
  readonly color: string;
  readonly svgPath: string;
}

const ANXIETY_LEVELS = {
  NORMAL: 'normal',
  LIGHT: 'anxious_light', 
  MODERATE: 'anxious_moderate',
  SEVERE: 'anxious_severe'
} as const;

// Mapping API anxiety levels to our application's internal levels
const API_LEVEL_MAPPING: Record<string, AnxietyLevel> = {
  "Normal": ANXIETY_LEVELS.NORMAL,
  "Ringan": ANXIETY_LEVELS.LIGHT,
  "Sedang": ANXIETY_LEVELS.MODERATE,
  "Berat": ANXIETY_LEVELS.SEVERE,
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

// Development fallback - will be replaced by backend data
const FALLBACK_RESULT: TestResult = {
  result: "Normal",
  description: "Kamu tidak merasakan kecemasan yang signifikan. Terus jaga kesehatan mentalmu!",
  level: ANXIETY_LEVELS.NORMAL
} as const;

function useTestResults() {
  const searchParams = useSearchParams();
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  
  useEffect(() => {
    const anxietyLevel = searchParams?.get('anxiety_level');
    const message = searchParams?.get('message');
    
    if (anxietyLevel && message) {
      const level = API_LEVEL_MAPPING[anxietyLevel] || ANXIETY_LEVELS.NORMAL;
      
      setTestResult({
        result: anxietyLevel,
        description: message,
        level: level
      });
    }
  }, [searchParams]);
  
  return testResult || FALLBACK_RESULT;
}

function getAnxietyConfig(level: AnxietyLevel): LevelConfig {
  return ANXIETY_LEVEL_CONFIG[level];
}

function getCardMaxWidth(): string {
  return LAYOUT_CONFIG.CARD.STYLE.includes("md:w-[380px]") 
    ? LAYOUT_CONFIG.CARD.MAX_WIDTH.DESKTOP 
    : LAYOUT_CONFIG.CARD.MAX_WIDTH.MOBILE;
}

function TestResultCardFront({ testResult }: { testResult: TestResult }) {
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
    </div>
  );
}

function TestResultCardBack({ testResult }: { testResult: TestResult }) {
  const config = getAnxietyConfig(testResult.level);

  return (
    <div className="flex flex-col items-center text-[#0E103D] text-center p-6 h-full justify-center">
      <h2 
        className="text-4xl md:text-5xl font-bold text-center leading-tight mb-8"
        style={{ color: config.color }}
      >
        {testResult.result}
      </h2>
      
      <div className="flex items-center justify-center px-4">
        <p className="text-lg leading-relaxed text-[#0E103D]">
          {testResult.description}
        </p>
      </div>
    </div>
  );
}

function NavigationLink({ href, children, className = "" }: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link 
      href={href}
      className={`text-white/80 hover:text-white transition-colors duration-200 text-base font-medium ${className}`}
    >
      {children}
    </Link>
  );
}

function TestNavigationBar({ maxWidth }: { maxWidth: string }) {
  return (
    <nav className="flex justify-between items-center w-full" style={{ maxWidth }}>
      <NavigationLink href={ROUTES.TEST_FORM}>
        Tes Ulang
      </NavigationLink>
      <NavigationLink href={ROUTES.JOURNAL}>
        Isi Jurnal
      </NavigationLink>
    </nav>
  );
}

function BackNavigationButton() {
  return (
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
}

export default function TestInsightPage({ testResult: propTestResult }: TestInsightPageProps) {
  const apiTestResult = useTestResults();
  const currentResult = propTestResult ?? apiTestResult;
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
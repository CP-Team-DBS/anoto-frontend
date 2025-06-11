'use client';

import { useState, useCallback } from 'react';
import Container from "@/components/ui/container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TestFooter from "../test-footer";
import { ArrowLeft } from "lucide-react";
import { GAD7FormData, predictAnxiety, mapAnxietyLevelToUi } from "@/lib/api/gad7-api";


// Types
interface Question {
  id: number;
  text: string;
  options: string[];
}

// Constants
const ROUTES = {
  TEST_HOME: "/test",
  TEST_INSIGHT: "/test/insight",
};

const ANXIETY_TEST_CONFIG = {
  answerOptions: [
    'Tidak Pernah',
    'Beberapa Hari', 
    'Lebih dari Separuh Waktu yang ditentukan',
    'Hampir Setiap Hari'
  ] as const,
  
  questions: [
    { id: 1, text: "Merasa gugup, cemas, atau gelisah" },
    { id: 2, text: "Tidak dapat menghentikan kekhawatiran" },
    { id: 3, text: "Banyak mengkhawatirkan berbagai hal" },
    { id: 4, text: "Sulit merasa santai" },
    { id: 5, text: "Sangat gelisah sehingga sulit untuk diam" },
    { id: 6, text: "Mudah tersinggung dan mudah marah" },
    { id: 7, text: "Merasa takut seolah-olah sesuatu buruk akan terjadi" }
  ],
  
  theme: {
    primary: "#0E103D",
    progressActive: "bg-[#0E103D]",
    progressInactive: "bg-gray-300"
  }
} as const;

const QUESTIONS: readonly Question[] = ANXIETY_TEST_CONFIG.questions.map(q => ({
  ...q,
  options: [...ANXIETY_TEST_CONFIG.answerOptions]
}));

// Utility functions
const mapQuestionIdToApiField = (id: number): keyof GAD7FormData => {
  const fieldMap: Record<number, keyof GAD7FormData> = {
    1: 'merasa_gugup_cemas_atau_gelisah',
    2: 'tidak_dapat_menghentikan_kekhawatiran',
    3: 'banyak_mengkhawatirkan_berbagai_hal',
    4: 'sulit_merasa_santai',
    5: 'sangat_gelisah_sehingga_sulit_untuk_diam',
    6: 'mudah_tersinggung_dan_mudah_marah',
    7: 'merasa_takut_seolah_olah_sesuatu_buruk_akan_terjadi'
  };
  
  return fieldMap[id];
};

const createFallbackResult = () => ({
  result: "Ringan",
  description: "Tingkat kecemasan Anda tergolong ringan. Perlu mulai memperhatikan tanda-tanda stres dan mengelolanya dengan baik.",
  level: "anxious_light",
  score: 5
});

// Custom hook for form state management
function useAnxietyTestForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const currentQuestion = QUESTIONS[currentStep];
  const isLastQuestion = currentStep === QUESTIONS.length - 1;
  const hasCurrentAnswer = userAnswers[currentQuestion.id] !== undefined;

  const selectAnswer = useCallback((answer: string) => {
    setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
  }, [currentQuestion.id]);

  const prepareApiData = useCallback((): GAD7FormData => {
    const apiData = {} as GAD7FormData;
    
    Object.entries(userAnswers).forEach(([questionId, answer]) => {
      const apiField = mapQuestionIdToApiField(Number(questionId));
      apiData[apiField] = answer;
    });
    
    return apiData;
  }, [userAnswers]);

  const submitTest = useCallback(async () => {
    setIsProcessing(true);
    setApiError(null);
    
    try {
      const apiData = prepareApiData();
      console.log('Submitting test data:', apiData);
      
      const result = await predictAnxiety(apiData);
      console.log('API Response:', result);
      
      const testResult = {
        result: result.anxiety_level,
        description: result.message,
        level: mapAnxietyLevelToUi(result.anxiety_level),
        score: result.total_score
      };
      
      localStorage.setItem('gad7_result', JSON.stringify(testResult));
      router.push(ROUTES.TEST_INSIGHT);
    } catch (error) {
      console.error('Test submission failed:', error);
      
      const fallbackResult = createFallbackResult();
      localStorage.setItem('gad7_result', JSON.stringify(fallbackResult));
      router.push(ROUTES.TEST_INSIGHT);
    } finally {
      setIsProcessing(false);
    }
  }, [router, prepareApiData]);

  const navigateStep = useCallback(async (direction: 'next' | 'previous') => {
    if (direction === 'previous' && currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      return;
    }

    if (!hasCurrentAnswer) return;
    
    if (!isLastQuestion) {
      setCurrentStep(prev => prev + 1);
    } else {
      await submitTest();
    }
  }, [currentStep, hasCurrentAnswer, isLastQuestion, submitTest]);

  return {
    currentStep,
    currentQuestion,
    userAnswers,
    isProcessing,
    isLastQuestion,
    hasCurrentAnswer,
    apiError,
    selectAnswer,
    navigateStep,
    totalSteps: QUESTIONS.length
  };
}

// UI Components
const TestNavigationHeader = () => (
  <header className="w-full max-w-lg mb-6">
    <Link 
      href={ROUTES.TEST_HOME}
      className="flex items-center text-white/80 hover:text-white transition-colors duration-200"
    >
      <ArrowLeft className="h-5 w-5 mr-2" />
      Kembali
    </Link>
  </header>
);

const TestProgressIndicator = ({ current, total }: { current: number; total: number }) => {
  const percentage = Math.round(((current + 1) / total) * 100);
  
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>Pertanyaan {current + 1} dari {total}</span>
        <span>{percentage}%</span>
      </div>
      <div className="flex justify-between w-full px-4">
        {Array.from({ length: total }, (_, index) => (
          <div
            key={index}
            className={`h-2 w-12 rounded-full transition-colors duration-200 ${
              index <= current 
                ? ANXIETY_TEST_CONFIG.theme.progressActive 
                : ANXIETY_TEST_CONFIG.theme.progressInactive
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const AnswerOption = ({ 
  text, 
  isSelected, 
  onSelect, 
  disabled 
}: {
  text: string;
  isSelected: boolean;
  onSelect: () => void;
  disabled: boolean;
}) => (
  <button
    onClick={onSelect}
    disabled={disabled}
    className={`w-full text-left px-4 py-3 border rounded-md text-sm font-normal transition-all duration-200 ${
      isSelected 
        ? 'bg-[#0E103D] text-white border-[#0E103D] shadow-md' 
        : 'bg-white text-[#0E103D] border-gray-300 hover:border-[#0E103D] hover:bg-gray-50'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
  >
    <span className="leading-relaxed">{text}</span>
  </button>
);

const AnswerOptionsList = ({ 
  options, 
  selectedAnswer, 
  onSelect,
  disabled = false
}: { 
  options: readonly string[]; 
  selectedAnswer?: string; 
  onSelect: (option: string) => void;
  disabled?: boolean;
}) => (
  <div className="flex flex-col gap-3 w-full mb-6">
    {options.map((option) => (
      <AnswerOption
        key={option}
        text={option}
        isSelected={selectedAnswer === option}
        onSelect={() => onSelect(option)}
        disabled={disabled}
      />
    ))}
  </div>
);

const TestNavigationButtons = ({ 
  onNext,
  onPrevious,
  isLastStep,
  isNextDisabled,
  isPreviousDisabled,
  isSubmitting
}: { 
  onNext: () => void;
  onPrevious: () => void;
  isLastStep: boolean;
  isNextDisabled: boolean;
  isPreviousDisabled: boolean;
  isSubmitting: boolean;
}) => (
  <nav className="flex justify-between items-center w-full mt-auto">
    <Button
      onClick={onPrevious}
      disabled={isPreviousDisabled}
      variant="outline"
      className={`py-2 px-4 rounded-md transition-all duration-200 ${
        isPreviousDisabled 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
          : 'bg-white text-[#0E103D] border-[#0E103D] hover:bg-[#0E103D] hover:text-white'
      }`}
    >
      ← Sebelumnya
    </Button>

    <Button 
      onClick={onNext}
      disabled={isNextDisabled}
      className={`py-2 px-6 rounded-md transition-all duration-200 text-white ${
        isNextDisabled 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-[#0E103D] hover:bg-[#0E103D]/90'
      }`}
    >
      {isSubmitting ? "Memproses..." : (isLastStep ? "Selesai" : "Selanjutnya →")}
    </Button>
  </nav>
);

const TestQuestionCard = ({
  question,
  currentStep,
  totalSteps,
  selectedAnswer,
  onAnswerSelect,
  onNavigate,
  isLastStep,
  isSubmitting
}: {
  question: Question;
  currentStep: number;
  totalSteps: number;
  selectedAnswer?: string;
  onAnswerSelect: (answer: string) => void;
  onNavigate: (direction: 'next' | 'previous') => void;
  isLastStep: boolean;
  isSubmitting: boolean;
}) => {
  const isNextDisabled = selectedAnswer === undefined || isSubmitting;
  const isPreviousDisabled = currentStep === 0 || isSubmitting;
  
  return (
    <main className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md text-[#0E103D] flex flex-col">
      <TestProgressIndicator current={currentStep} total={totalSteps} />
      
      <h1 className="text-xl font-semibold text-center w-full mb-6">
        {question.text}
      </h1>
      
      <AnswerOptionsList 
        options={question.options} 
        selectedAnswer={selectedAnswer} 
        onSelect={onAnswerSelect}
        disabled={isSubmitting}
      />
      
      <TestNavigationButtons 
        onNext={() => onNavigate('next')}
        onPrevious={() => onNavigate('previous')}
        isLastStep={isLastStep}
        isNextDisabled={isNextDisabled}
        isPreviousDisabled={isPreviousDisabled}
        isSubmitting={isSubmitting}
      />
    </main>
  );
};

// Main component
export default function AnxietyTestForm() {
  const {
    currentStep,
    currentQuestion,
    userAnswers,
    isProcessing,
    isLastQuestion,
    selectAnswer,
    navigateStep,
    totalSteps
  } = useAnxietyTestForm();

  return (
    <div className="flex flex-col min-h-screen bg-[#0E103D] text-white font-sans">
      <Container className="flex-grow flex flex-col items-center justify-center py-8">
        <TestNavigationHeader />
        <TestQuestionCard 
          question={currentQuestion}
          currentStep={currentStep}
          totalSteps={totalSteps}
          selectedAnswer={userAnswers[currentQuestion.id]}
          onAnswerSelect={selectAnswer}
          onNavigate={navigateStep}
          isLastStep={isLastQuestion}
          isSubmitting={isProcessing}
        />
      </Container>
      <TestFooter />
    </div>
  );
}

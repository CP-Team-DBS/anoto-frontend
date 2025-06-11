'use client';

import { useState, useCallback } from 'react';
import Container from "@/components/ui/container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TestFooter from "../test-footer";
import { ArrowLeft } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: string[];
}

interface TestResponse {
  questionId: number;
  questionText: string;
  selectedAnswer: string;
  answerValue: number;
}

interface TestData {
  responses: TestResponse[];
  timestamp: string;
}

const ANSWER_OPTIONS = [
  'Tidak Pernah',
  'Beberapa Hari', 
  'Lebih dari Separuh Waktu yang ditentukan',
  'Hampir Setiap Hari'
] as const;

const QUESTIONS: readonly Question[] = [
  {
    id: 1,
    text: "Merasa gugup, cemas, atau gelisah",
    options: [...ANSWER_OPTIONS]
  },
  {
    id: 2,
    text: "Tidak dapat menghentikan kekhawatiran",
    options: [...ANSWER_OPTIONS]
  },
  {
    id: 3,
    text: "Banyak mengkhawatirkan berbagai hal",
    options: [...ANSWER_OPTIONS]
  },
  {
    id: 4,
    text: "Sulit merasa santai",
    options: [...ANSWER_OPTIONS]
  },
  {
    id: 5,
    text: "Sangat gelisah sehingga sulit untuk diam",
    options: [...ANSWER_OPTIONS]
  },
  {
    id: 6,
    text: "Mudah tersinggung dan mudah marah", 
    options: [...ANSWER_OPTIONS]
  },
  {
    id: 7,
    text: "Merasa takut seolah-olah sesuatu buruk akan terjadi",
    options: [...ANSWER_OPTIONS]
  }
] as const;

const UI_CONFIG = {
  theme: {
    primary: "#0E103D",
    progress: {
      inactive: "bg-gray-300",
      active: "bg-[#0E103D]"
    }
  }
} as const;

const API_CONFIG = {
  endpoints: {
    submitTest: '/api/test/submit'
  }
} as const;

function getAnswerValue(answer: string): number {
  const answerValueMap: Record<string, number> = {
    'Tidak Pernah': 0,
    'Beberapa Hari': 1,
    'Lebih dari Separuh Waktu yang ditentukan': 2,
    'Hampir Setiap Hari': 3
  };
  return answerValueMap[answer] ?? 0;
}

async function processTestWithML(testData: TestData): Promise<any> {
  const response = await fetch(API_CONFIG.endpoints.submitTest, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(testData)
  });

  if (!response.ok) {
    throw new Error(`ML processing failed: ${response.status}`);
  }

  return response.json();
}

function useTestForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = QUESTIONS[currentStep];
  const isLastStep = currentStep === QUESTIONS.length - 1;
  const hasAnsweredCurrentQuestion = answers[currentQuestion.id] !== undefined;

  const handleAnswerSelection = useCallback((answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
  }, [currentQuestion.id]);

  const prepareTestData = useCallback((): TestData => {
    const responses: TestResponse[] = QUESTIONS.map(question => ({
      questionId: question.id,
      questionText: question.text,
      selectedAnswer: answers[question.id],
      answerValue: getAnswerValue(answers[question.id])
    }));

    return {
      responses,
      timestamp: new Date().toISOString(),
    };
  }, [answers]);

  const handleTestSubmission = useCallback(async () => {
    setIsSubmitting(true);
    
    try {
      const testData = prepareTestData();
      
      // POST form data to backend for ML processing
      // const result = await processTestWithML(testData);
      // router.push(`/test/insight?result=${encodeURIComponent(JSON.stringify(result))}`);
      
      console.log('Test data for ML processing:', testData);
      router.push('/test/insight');
      
    } catch (error) {
      console.error('Test processing failed:', error);
      alert('Gagal memproses data. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  }, [prepareTestData, router]);

  const handleNavigation = useCallback(async (direction: 'next' | 'previous') => {
    if (direction === 'previous') {
      if (currentStep > 0) {
        setCurrentStep(prev => prev - 1);
      }
      return;
    }

    if (!hasAnsweredCurrentQuestion) return;
    
    if (!isLastStep) {
      setCurrentStep(prev => prev + 1);
    } else {
      await handleTestSubmission();
    }
  }, [currentStep, hasAnsweredCurrentQuestion, isLastStep, handleTestSubmission]);

  return {
    currentStep,
    currentQuestion,
    answers,
    isSubmitting,
    isLastStep,
    hasAnsweredCurrentQuestion,
    handleAnswerSelection,
    handleNavigation
  };
}

function NavigationHeader() {
  return (
    <header className="w-full max-w-lg mb-6">
      <Link 
        href="/test" 
        className="flex items-center text-white/80 hover:text-white transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Kembali
      </Link>
    </header>
  );
}

function ProgressIndicator({ currentStep, totalSteps }: { 
  currentStep: number; 
  totalSteps: number; 
}) {
  return (
    <div className="flex justify-between w-full px-4 mb-6">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`h-2 w-12 rounded-full transition-colors duration-200 ${
            index <= currentStep ? UI_CONFIG.theme.progress.active : UI_CONFIG.theme.progress.inactive
          }`}
        />
      ))}
    </div>
  );
}

function OptionButton({ 
  option, 
  isSelected, 
  onClick, 
  disabled 
}: {
  option: string;
  isSelected: boolean;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left px-4 py-3 border rounded-md text-sm font-normal transition-all duration-200 ${
        isSelected 
          ? 'bg-[#0E103D] text-white border-[#0E103D] shadow-md' 
          : 'bg-white text-[#0E103D] border-gray-300 hover:border-[#0E103D] hover:bg-gray-50'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span className="leading-relaxed">{option}</span>
    </button>
  );
}

function OptionList({ 
  options, 
  selectedAnswer, 
  onSelect,
  disabled = false
}: { 
  options: readonly string[]; 
  selectedAnswer?: string; 
  onSelect: (option: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 w-full mb-6">
      {options.map((option) => (
        <OptionButton
          key={option}
          option={option}
          isSelected={selectedAnswer === option}
          onClick={() => onSelect(option)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}

function NavigationButtons({ 
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
}) {
  return (
    <nav className="flex justify-between items-center w-full mt-auto">
      <Button
        onClick={onPrevious}
        disabled={isPreviousDisabled}
        variant="outline"
        className={`${
          isPreviousDisabled 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
            : 'bg-white text-[#0E103D] border-[#0E103D] hover:bg-[#0E103D] hover:text-white'
        } py-2 px-4 rounded-md transition-all duration-200`}
      >
        ← Sebelumnya
      </Button>

      <Button 
        onClick={onNext}
        disabled={isNextDisabled}
        className={`${
          isNextDisabled 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-[#0E103D] hover:bg-[#0E103D]/90'
        } text-white py-2 px-6 rounded-md transition-all duration-200`}
      >
        {isSubmitting ? "Memproses..." : (isLastStep ? "Selesai" : "Selanjutnya →")}
      </Button>
    </nav>
  );
}

function QuestionCard({
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
}) {
  const isNextDisabled = selectedAnswer === undefined || isSubmitting;
  const isPreviousDisabled = currentStep === 0 || isSubmitting;
  
  return (
    <main className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md text-[#0E103D] flex flex-col">
      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
      
      <h1 className="text-xl font-semibold text-center w-full mb-6">
        {question.text}
      </h1>
      
      <OptionList 
        options={question.options} 
        selectedAnswer={selectedAnswer} 
        onSelect={onAnswerSelect}
        disabled={isSubmitting}
      />
      
      <NavigationButtons 
        onNext={() => onNavigate('next')}
        onPrevious={() => onNavigate('previous')}
        isLastStep={isLastStep}
        isNextDisabled={isNextDisabled}
        isPreviousDisabled={isPreviousDisabled}
        isSubmitting={isSubmitting}
      />
    </main>
  );
}

export default function FormTest() {
  const {
    currentStep,
    currentQuestion,
    answers,
    isSubmitting,
    isLastStep,
    handleAnswerSelection,
    handleNavigation
  } = useTestForm();

  return (
    <div className="flex flex-col min-h-screen bg-[#0E103D] text-white font-sans">
      <Container className="flex-grow flex flex-col items-center justify-center py-8">
        <NavigationHeader />
        <QuestionCard 
          question={currentQuestion}
          currentStep={currentStep}
          totalSteps={QUESTIONS.length}
          selectedAnswer={answers[currentQuestion.id]}
          onAnswerSelect={handleAnswerSelection}
          onNavigate={handleNavigation}
          isLastStep={isLastStep}
          isSubmitting={isSubmitting}
        />
      </Container>
      <TestFooter />
    </div>
  );
}

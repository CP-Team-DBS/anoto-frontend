'use client';

import { useState } from 'react';
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

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Akhir-akhir ini, kamu sering merasa gelisah tanpa tahu alasannya?",
    options: ["Tidak Pernah", "Jarang", "Kadang-kadang", "Sering", "Sangat Sering"],
  },
  {
    id: 2,
    text: "Seberapa sering kamu merasa khawatir berlebihan akan hal kecil?",
    options: ["Tidak Pernah", "Jarang", "Kadang-kadang", "Sering", "Sangat Sering"],
  },
  // Add more questions here following the same structure:
  // {
  //   id: 3,
  //   text: "Contoh pertanyaan ketiga?",
  //   options: ["Ya", "Tidak", "Mungkin"],
  // },
];

const THEME = {
  primary: "#0E103D",
  inactive: "bg-gray-300",
  active: "bg-[#0E103D]"
};

export default function FormTest() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const currentQuestion = QUESTIONS[currentStep];
  const isLastStep = currentStep === QUESTIONS.length - 1;
  const hasAnsweredCurrentQuestion = answers[currentQuestion.id] !== undefined;

  function handleAnswerSelection(answer: string) {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
  }

  function handleNavigation() {
    if (!hasAnsweredCurrentQuestion) {
      return; 
    }
    
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/test/insight');
    }
  }

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
        />
      </Container>
      <TestFooter />
    </div>
  );
}

function NavigationHeader() {
  return (
    <div className="w-full max-w-md mb-6">
      <Link href="/test" className="flex items-center text-white/80 hover:text-white transition">
        <ArrowLeft className="h-5 w-5 mr-2" />
        Kembali
      </Link>
    </div>
  );
}

interface QuestionCardProps {
  question: Question;
  currentStep: number;
  totalSteps: number;
  selectedAnswer?: string;
  onAnswerSelect: (answer: string) => void;
  onNavigate: () => void;
  isLastStep: boolean;
}

function QuestionCard({
  question,
  currentStep,
  totalSteps,
  selectedAnswer,
  onAnswerSelect,
  onNavigate,
  isLastStep
}: QuestionCardProps) {
  const isButtonDisabled = selectedAnswer === undefined;
  
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-[#0E103D] flex flex-col items-center">
      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
      <h2 className="text-2xl font-semibold text-left w-full mb-6">{question.text}</h2>
      <OptionList 
        options={question.options} 
        selectedAnswer={selectedAnswer} 
        onSelect={onAnswerSelect} 
      />
      <NavigationButton 
        onClick={onNavigate} 
        isLastStep={isLastStep}
        disabled={isButtonDisabled}
      />
    </div>
  );
}

function ProgressIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex justify-between w-full px-4 mb-6">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-2 w-12 rounded-full ${
            index <= currentStep ? THEME.active : THEME.inactive
          }`}
        />
      ))}
    </div>
  );
}

function OptionList({ 
  options, 
  selectedAnswer, 
  onSelect 
}: { 
  options: string[]; 
  selectedAnswer?: string; 
  onSelect: (option: string) => void 
}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {options.map((option) => (
        <Button
          key={option}
          onClick={() => onSelect(option)}
          className={`w-full justify-start px-4 py-3 border rounded-md text-xl font-normal ${
            selectedAnswer === option 
              ? 'bg-[#0E103D] text-white border-[#0E103D]' 
              : 'bg-white text-[#0E103D] border-[#0E103D]/30 hover:bg-[#0E103D]/5'
          }`}
          variant="outline"
        >
          <span className="text-left font-normal">{option}</span>
        </Button>
      ))}
    </div>
  );
}

function NavigationButton({ 
  onClick, 
  isLastStep,
  disabled
}: { 
  onClick: () => void;
  isLastStep: boolean;
  disabled: boolean;
}) {
  return (
    <div className="w-full text-right mt-8">
      <Button 
        onClick={onClick}
        disabled={disabled}
        className={`${
          disabled 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-[#0E103D] hover:bg-[#0E103D]/80'
        } text-white font-bold py-2 px-6 rounded-md transition`}
      >
        {isLastStep ? "Selesai" : "Selanjutnya →"}
      </Button>
    </div>
  );
}

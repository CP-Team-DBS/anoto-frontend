// src/components/test/form-test.tsx
'use client';

import { useState } from 'react';
import Container from "@/components/ui/container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Define the structure for a question
interface Question {
  id: number;
  text: string;
  options: string[];
}

// Define your questions here. You can easily add, remove, or edit questions in this array.
const questions: Question[] = [
  {
    id: 1,
    text: "Seberapa sering kamu merasa khawatir berlebihan akan hal kecil?",
    options: ["Tidak Pernah", "Jarang", "Kadang-kadang", "Sering", "Sangat Sering"],
  },
  {
    id: 2,
    text: "Akhir-akhir ini, kamu sering merasa gelisah tanpa tahu alasannya?",
    options: ["Tidak Pernah", "Jarang", "Kadang-kadang", "Sering", "Sangat Sering"],
  },
  // Add more questions here following the same structure:
  // {
  //   id: 3,
  //   text: "Contoh pertanyaan ketiga?",
  //   options: ["Ya", "Tidak", "Mungkin"],
  // },
];

export default function FormTest() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0); // Start at the first question (index 0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({}); // Store answers by question id

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;

  const handleAnswerClick = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
    // Optionally move to the next step immediately after answering
    // if (!isLastStep) {
    //   setCurrentStep(currentStep + 1);
    // }
  };

  const handleNextClick = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle form completion (e.g., submit answers, redirect)
      console.log("Form Completed! Answers:", answers);
      // Navigate to the insight page
      router.push('/test/insight');
    }
  };

  const handlePreviousClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Custom Footer Component (similar to insight page)
  const CustomFooter = () => (
    <div className="bg-[#0E103D] text-white pt-4 pb-8 font-sans border-t border-white/30 mt-auto">
      <Container className="flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="font-bold text-base" style={{ fontFamily: 'Inter' }}>Anoto</div>
        <div className="mt-2 md:mt-0 text-white/70 text-xs">© 2025 Anoto. All rights reserved.</div>
      </Container>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#0E103D] text-white font-sans">
      <Container className="flex-grow flex flex-col items-center justify-center py-8">
        {/* Back Button */}
        <div className="w-full max-w-md mb-6">
           <Link href="/test" className="flex items-center text-white/80 hover:text-white transition">
             {/* Placeholder for Back Arrow Icon */}
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
               <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
             </svg>
             Kembali
           </Link>
         </div>

        {/* Form Card */}
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-[#0E103D] flex flex-col items-center">
          {/* Progress Indicators - Placeholder */}
          <div className="flex justify-between w-full px-4 mb-6">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-12 rounded-full ${index <= currentStep ? 'bg-[#0E103D]' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>

          {/* Question Text */}
          <h2 className="text-xl font-semibold text-center mb-6">{currentQuestion.text}</h2>

          {/* Answer Options */}
          <div className="flex flex-col gap-4 w-full">
            {currentQuestion.options.map((option) => (
              <Button
                key={option}
                onClick={() => handleAnswerClick(option)}
                className={`w-full text-left px-4 py-3 border rounded-md ${answers[currentQuestion.id] === option ? 'bg-[#0E103D] text-white border-[#0E103D]' : 'bg-white text-[#0E103D] border-gray-300 hover:bg-gray-100'}`}
                variant="outline" // Assuming Button component has outline variant
              >
                {option}
              </Button>
            ))}
          </div>

          {/* Navigation Button */}
          <div className="w-full text-right mt-8">
             {/* Optional: Add a previous button if needed */}
             {/* {currentStep > 0 && (
                <Button onClick={handlePreviousClick} variant="ghost" className="mr-4">
                   Previous
                 </Button>
              )} */}
            <Button onClick={handleNextClick} className="bg-yellow-400 hover:bg-yellow-500 text-[#0E103D] font-bold py-2 px-6 rounded-md transition">
              {isLastStep ? "Selesai" : "Selanjutnya →"}
            </Button>
          </div>
        </div>
      </Container>
      <CustomFooter />
    </div>
  );
}

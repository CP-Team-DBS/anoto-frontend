"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";

// ===== TYPES =====
interface StarRatingInputProps {
  rating: number;
  onRatingChange: (newRating: number) => void;
  maxStars?: number;
}

type TestimonialFormData = {
  name: string;
  testimonial: string;
  rating: number;
};

type FormErrors = Record<keyof TestimonialFormData, boolean | undefined>;

// ===== STYLE CONSTANTS =====
const STYLES = {
  input: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all duration-200 bg-gray-50 text-gray-800",
  errorHighlight: "ring-2 ring-rose-300 border-rose-300",
  label: "block text-sm font-medium text-gray-700 mb-2",
  hint: "mt-2 text-xs text-black-500 italic",
};

// ===== COMPONENTS =====
function StarRatingInput({ rating, onRatingChange, maxStars = 5 }: StarRatingInputProps) {
  return (
    <div className="flex justify-center items-center gap-1" role="radiogroup" aria-label="Star rating for Anoto">
      {Array.from({ length: maxStars }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;
        const starColor = isFilled ? 'text-yellow-400' : 'text-gray-300';

        return (
          <svg
            key={index}
            className={`w-8 h-8 cursor-pointer ${starColor}`}
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            onClick={() => onRatingChange(starValue)}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      })}
    </div>
  );
}

function ValidationAlert({ isVisible, message, onClose }: { 
  isVisible: boolean; 
  message: string; 
  onClose: () => void;
}) {
  // Auto-dismiss timer
  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [isVisible, onClose]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed top-5 right-5 z-50 bg-white rounded-lg shadow-xl border-l-4 border-rose-500 p-4 max-w-sm animate-slide-in-right">
      <div className="flex items-start">
        <div className="flex-shrink-0 text-rose-500">
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 112 0v2a1 1 0 11-2 0v-2zm0-6a1 1 0 112 0v2a1 1 0 11-2 0V5z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-800">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <button
            onClick={onClose}
            className="inline-flex rounded-md p-1.5 text-gray-500 hover:bg-gray-100 focus:outline-none"
            aria-label="Dismiss"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Success alert component (green, centered)
function SuccessAlert({ isVisible, message, onClose }: { 
  isVisible: boolean; 
  message: string; 
  onClose: () => void;
}) {
  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [isVisible, onClose]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Semi-transparent backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      
      {/* Success alert card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md z-10 transform scale-105 transition-all duration-300 border-t-8 border-green-500">
        <div className="flex flex-col items-center text-center">
          {/* Success icon */}
          <div className="bg-green-100 p-3 rounded-full mb-4">
            <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          
          {/* Success title */}
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Berhasil!</h3>
          
          {/* Success message */}
          <p className="text-lg text-gray-600 mb-6">{message}</p>
          
          {/* Indicator */}
          <div className="mt-2 flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== MAIN COMPONENT =====
export default function TestimonialFormSection() {
  const router = useRouter();
  
  // State management
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: "",
    testimonial: "",
    rating: 0
  });
  
  const [errors, setErrors] = useState<FormErrors>({
    name: undefined,
    testimonial: undefined,
    rating: undefined
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Event handlers
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors: FormErrors = {
      name: undefined,
      testimonial: undefined,
      rating: undefined
    };
    let hasErrors = false;
    
    if (!formData.name.trim()) {
      newErrors.name = true;
      hasErrors = true;
    }
    
    if (formData.rating === 0) {
      newErrors.rating = true;
      hasErrors = true;
    }
    
    if (!formData.testimonial.trim()) {
      newErrors.testimonial = true;
      hasErrors = true;
    }
    
    setErrors(newErrors);
    return !hasErrors;
  };
  
  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const missingFields: string[] = [];
    
    // Use validateForm function to avoid duplicate code
    if (!formData.name.trim()) missingFields.push("nama");
    if (formData.rating === 0) missingFields.push("rating");
    if (!formData.testimonial.trim()) missingFields.push("testimoni");
    
    const isValid = validateForm();
    
    if (!isValid) {
      setAlertMessage(`Mohon isi ${missingFields.join(', ')} terlebih dahulu ya ✨`);
      setShowAlert(true);
      return;
    }
    
    // Success path - form is valid
    try {
      // Use our local API route instead of the external one
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          text: formData.testimonial,
          rating: formData.rating
        })
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.error === false) {
        // Set success state BEFORE showing the alert
        setIsSuccess(true);
        setShowAlert(true);
        setAlertMessage("Testimoni berhasil dikirim! Mengarahkan ke halaman utama...");
        
        // Reset form
        setFormData({ name: "", testimonial: "", rating: 0 });
        setErrors({
          name: undefined,
          testimonial: undefined,
          rating: undefined
        });
        
        // Redirect to home page after a short delay to show the message
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        throw new Error(result.message || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Failed to submit testimonial:", error);
      setIsSuccess(false);
      setAlertMessage("Gagal mengirim testimoni. Silakan coba lagi.");
      setShowAlert(true);
    }
  };
  
  // Helper for error highlighting
  const getFieldErrorClass = (field: keyof FormErrors) => 
    errors[field] ? STYLES.errorHighlight : '';

  return (
    <section className="min-h-screen flex items-center justify-center py-16 bg-gradient-to-br from-purple-50 to-indigo-100 text-[#0E103D] relative">
      {/* Regular validation alert (for errors) */}
      {!isSuccess && (
        <ValidationAlert 
          isVisible={showAlert} 
          message={alertMessage} 
          onClose={() => setShowAlert(false)} 
        />
      )}
      
      {/* Success alert (green, centered) */}
      {isSuccess && (
        <SuccessAlert 
          isVisible={showAlert} 
          message={alertMessage} 
          onClose={() => setShowAlert(false)} 
        />
      )}
      
      <Container className="max-w-xl">
        
        <header className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2D234F] mb-4">Tulis Testimoni Kamu</h2>
          <p className="text-lg text-gray-600">Puas menggunakan Anoto? Tulis pengalamanmu di sini</p>
        </header>

        <div className="bg-white rounded-xl shadow-xl p-8 md:p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className={STYLES.label}>Nama</label>
              <input
                type="text"
                id="name"
                className={`${STYLES.input} ${getFieldErrorClass('name')}`}
                placeholder="Masukkan nama Anda"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Rating Field */}
            <div>
              <label className={STYLES.label}>Beri rating untuk Anoto</label>
              <div className={`rounded-lg p-2 ${errors.rating ? 'bg-rose-50' : ''}`}>
                <StarRatingInput 
                  rating={formData.rating} 
                  onRatingChange={handleRatingChange} 
                />
              </div>
            </div>

            {/* Testimonial Field */}
            <div>
              <label htmlFor="testimonial" className={STYLES.label}>Testimoni</label>
              <textarea
                id="testimonial"
                rows={5}
                className={`${STYLES.input} resize-y ${getFieldErrorClass('testimonial')}`}
                placeholder="Bagikan pengalaman Anda menggunakan Anoto..."
                value={formData.testimonial}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                className="w-full bg-[#8B5CF6] hover:bg-[#0E103D] text-white text-md font-semibold py-5 px-8 rounded-lg transition-all duration-300"
              >
                Kirim
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
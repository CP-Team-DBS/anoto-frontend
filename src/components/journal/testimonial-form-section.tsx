"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
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

// ===== MAIN COMPONENT =====
export default function TestimonialFormSection() {
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
  const handleSubmit = (e: FormEvent) => {
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
      // TODO: Replace with actual API submission
      console.log(formData);
      alert("Testimoni berhasil dikirim!");
      
      // Reset form
      setFormData({ name: "", testimonial: "", rating: 0 });
      setErrors({
        name: undefined,
        testimonial: undefined,
        rating: undefined
      });
    } catch (error) {
      console.error("Failed to submit testimonial:", error);
      setAlertMessage("Gagal mengirim testimoni. Silakan coba lagi.");
      setShowAlert(true);
    }
  };
  
  // Helper for error highlighting
  const getFieldErrorClass = (field: keyof FormErrors) => 
    errors[field] ? STYLES.errorHighlight : '';

  return (
    <section className="min-h-screen flex items-center justify-center py-16 bg-gradient-to-br from-purple-50 to-indigo-100 text-[#0E103D] relative">
      {/* Validation Alert */}
      <ValidationAlert 
        isVisible={showAlert} 
        message={alertMessage} 
        onClose={() => setShowAlert(false)} 
      />
      
      <Container className="max-w-xl">
        <header className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2D234F] mb-4">Tulis Testimoni Kamu</h2>
          <p className="text-lg text-gray-600">Puas menggunakan Anoto? Tulis pengalamanmu di sini</p>
        </header>

        <div className="bg-white rounded-xl shadow-2xl p-8 md:p-10 border border-gray-100">
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
              <p className={STYLES.hint}>
                Kami menjaga privasi Anda. Nama pengirim akan kami samarkan.
              </p>
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
            <div className="text-center pt-4">
              <Button
                type="submit"
                className="w-full md:w-auto bg-[#2D234F] hover:bg-[#1E193C] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2D234F] focus:ring-offset-2"
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
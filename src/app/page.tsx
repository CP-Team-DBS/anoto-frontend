import HeroSection from "@/components/landing/hero-section";
import IntroSection from "@/components/landing/intro-section";
import CallSection from "@/components/landing/call-section";
import AboutSection from "@/components/landing/about-section";
import StatsSection from "@/components/landing/stats-section";
import TestimonialSection from "@/components/landing/testimonial-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <CallSection />
      <StatsSection anxietyPercentage={75} /> 
      <TestimonialSection />
      <AboutSection />
    </>
  );
}

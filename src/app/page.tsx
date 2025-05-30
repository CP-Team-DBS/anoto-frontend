import FeatSection from "@/components/landing/feat-section";
import HeroSection from "@/components/landing/hero-section";
import IntroSection from "@/components/landing/intro-section";
import CallSection from "@/components/landing/call-section";
import FooterSection from "@/components/landing/footer-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <FeatSection />
      <CallSection />
      <FooterSection />
    </>
  );
}

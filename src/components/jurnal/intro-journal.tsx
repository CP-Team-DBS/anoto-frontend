import Container from "@/components/ui/container";
import FooterSection from "@/components/landing/footer-section";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function IntroJournal() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5EE] text-[#0E103D] font-sans">
      <Container className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Lagi Ngerasa Apa Hari Ini?</h1>
          <p className="text-[#0E103D]/80 text-lg max-w-2xl mx-auto mb-10">
            Tulis apa yang kamu rasain. Kita bantu lihat pola emosimu dan kasih insight biar hatimu lebih lega.
          </p>
          <div className="flex justify-center">
            <Button
              className="bg-accent rounded-full hover:scale-105 transition-transform w-[260px] h-[70px] text-2xl flex items-center justify-center"
              asChild
            >
              <Link href="/jurnal/form">Mulai Menulis →</Link>
            </Button>
          </div>
        </div>
      </Container>
      
      <div className="mt-auto">
        <FooterSection />
      </div>
    </div>
  );
}
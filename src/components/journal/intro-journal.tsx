import Image from "next/image";
import Container from "@/components/ui/container";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function IntroJournal() {
  return (
    <div className="relative flex flex-col py-20 bg-[#F7F5EE] text-[#0E103D] font-sans overflow-hidden md:min-h-screen md:py-0">
      <Image
        src="/illusts/circle.svg"
        alt="Emotions Background"
        width={1100}
        height={1100}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
      />
      <Image
        src="/illusts/emoji-group.svg"
        alt="Emotions Background"
        width={1400}
        height={1400}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none hidden md:block"
      />

      <Container className="relative z-10 flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Lagi Ngerasa <br />
            Apa Hari Ini?
          </h1>
          <p className="text-[#0E103D]/80 max-w-2xl mx-auto mb-10 md:text-lg">
            Tulis apa yang kamu rasain. Kita bantu lihat pola emosimu dan <br />{" "}
            kasih insight biar hatimu lebih lega.
          </p>
          <div className="flex justify-center">
            <Button
              className="bg-accent rounded-full hover:scale-105 transition-transform px-4 py-3 text-sm font-medium md:text-base md:px-5 md:py-3 w-auto h-auto flex items-center justify-center shadow-md"
              asChild
            >
              <Link href="/journal/form">Mulai Menulis →</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

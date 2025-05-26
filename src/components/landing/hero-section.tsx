import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-primary text-white min-h-[calc(100vh-65px)] flex items-center py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse gap-8 md:flex-row">
          <div className="flex flex-col items-start justify-center gap-10 text-center md:text-start">
            <h2 className="text-6xl font-bold">
              Ayo Kenali Kecemasanmu, Mulai dari sini
            </h2>

            <p className="text-md">
              Jawab beberapa pertanyaan dalam waktu kurang dari 3 menit dan
              dapatkan wawasan tentang kondisi emosionalmu.
            </p>

            <Button
              size="lg"
              className="bg-accent rounded-full mx-auto md:mx-0"
              asChild
            >
              <Link href="/test">Mulai Tes Sekarang</Link>
            </Button>
          </div>

          <div className="w-full">
            <Image
              src="/illusts/hero-image.svg"
              alt="Hero Image"
              width={400}
              height={500}
              className="w-[40%] md:w-[90%] mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

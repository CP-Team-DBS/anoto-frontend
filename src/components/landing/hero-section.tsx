import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import * as motion from "motion/react-client";
import Container from "../ui/container";
import FloatingIcons from "./floating-icons";

export default function HeroSection() {
  return (
    <section className="bg-primary text-white min-h-[calc(100vh-65px)] flex items-center py-16 relative overflow-hidden">
      <FloatingIcons />

      <Container size="sm">
        <div className="flex flex-col-reverse gap-8 md:flex-row">
          <div className="flex flex-col items-start justify-center gap-10 text-center md:text-start">
            <motion.h2
              initial={{
                opacity: 0,
                y: 100,
                scale: 0.5,
                rotate: -15,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.8,
                type: "spring",
                bounce: 0.4,
              }}
              className="text-3xl md:text-6xl font-bold"
            >
              Ayo Kenali Kecemasanmu, Mulai dari sini
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: "easeOut",
              }}
              className="text-md"
            >
              Jawab beberapa pertanyaan dalam waktu kurang dari 3 menit dan
              dapatkan wawasan tentang kondisi emosionalmu.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                ease: "easeOut",
              }}
              className="flex w-full justify-center md:justify-start transform scale-110 md:scale-100"
            >
              <Button
                size="lg"
                className="bg-accent rounded-full hover:scale-105 hover:shadow-xl hover:bg-accent/80 hover:brightness-110 transition-all duration-300 ease-out text-base px-6 py-3"
                asChild
              >
                <Link href="/test">Mulai Tes Sekarang</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: "easeOut",
            }}
          >
            <Image
              src="/illusts/hero-image.svg"
              alt="Hero Image"
              width={400}
              height={500}
              className="w-[40%] md:w-[90%] mx-auto md:ml-auto md:mr-0"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

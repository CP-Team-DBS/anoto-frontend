import Image from "next/image";
import * as motion from "motion/react-client";
import Container from "@/components/ui/container"; 

export default function HeroJournal() {
  return (
    <section className="bg-primary text-white min-h-[calc(100vh-65px)] flex items-center py-16 relative overflow-hidden">
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
              className="text-6xl font-bold"
            >
              Apa yang paling kamu rasakan pada hari ini?
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
              Coba tuliskan hal-hal yang terasa berat, mebingungkan, atau mungkin membahagiakan
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                ease: "easeOut",
              }}
            >
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
              src="/illusts/hero-journal.svg"
              alt="Hero Image"
              width={400}
              height={500}
              className="w-[40%] md:w-[90%] mx-auto"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
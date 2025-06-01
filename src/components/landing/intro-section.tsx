import Image from "next/image";
import Container from "../ui/container";
import * as motion from "motion/react-client";

export default function IntroSection() {
  return (
    <section>
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-start">
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl font-bold md:w-96 leading-14"
          >
            Cuma <span className="text-secondary">3 Menit</span> Buat Kenal Isi
            Kepala Sendiri
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg font-medium"
          >
            Dengan beberapa pertanyaan ringan, kamu bisa mengetahui apakah
            stresmu masih dalam batas wajar atau perlu perhatian lebih.
          </motion.p>
        </div>
      </Container>

      <Container size="sm" className="flex flex-col gap-y-16 py-14">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row gap-8 items-center md:gap-24"
        >
          <div className="basis-3/4">
            <Image
              src="/illusts/intro-image-1.svg"
              alt="Intro Image"
              width={550}
              height={500}
              className="w-[75%] md:w-[90%] mx-auto md:mx-0"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="w-full basis-2/4 text-center md:text-start"
          >
            <h6 className="text-4xl font-bold">
              Anxiety Tidak Sama dengan Takut Biasa
            </h6>
            <p className="mt-5 text-lg">
              Kecemasan seringkali muncul tanpa alasan yang jelas. Tes kami
              membantumu memahami tingkat kecemasan dengan tenang dan akurat.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col-reverse gap-8 items-center md:flex-row md:gap-24"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="w-full basis-2/4 text-center md:text-start"
          >
            <h6 className="text-4xl font-bold">
              Kenali Pola Kecemasan Sejak Dini
            </h6>
            <p className="mt-5 text-lg">
              Setiap orang bisa mengalami anxiety. Mengenalinya lebih awal bisa
              membantu kamu mengatasinya dengan lebih baik.
            </p>
          </motion.div>

          <div className="basis-3/4 flex justify-center md:justify-end">
            <Image
              src="/illusts/intro-image-2.svg"
              alt="Intro Image"
              width={550}
              height={500}
              className="w-[75%] md:w-[90%] mx-auto md:mx-0"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

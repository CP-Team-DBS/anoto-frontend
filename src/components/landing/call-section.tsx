import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "../ui/container";
import * as motion from "motion/react-client";

interface FeatureCardProps {
  title: string;
  description: string;
  bgColor: string;
  delay: number;
}

const FeatureCard = ({ title, description, bgColor, delay }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    style={{ width: 585, height: 215 }}
    className="rounded-2xl shadow-lg"
  >
    <Card className={`${bgColor} text-white w-full h-full rounded-2xl`}>
      <CardHeader className="pb-2 px-8">
        <CardTitle className="text-[27px] font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-[20px] pt-0 px-8 pb-7">
        {description}
      </CardContent>
    </Card>
  </motion.div>
);

const features = [
    {
        title: "Gaya Ngobrol, Bukan Ngintrogasi",
        description: 
            "Kita ngerti kok kamu bukan pasien. Pertanyaannya ringan, bahasanya santai, kayak ngobrol sama temen sendiri.",
        bgColor: "bg-[#0E103D]",
        delay: 0.1
    },
    {
        title: "Bukan Buat Nge-judge, Tapi Ngebantu",
        description: 
            "Anoto nggak ngasih label. Hasil tesnya dibuat supaya kamu bisa lebih paham diri, bukan buat nakut-nakutin.",
        bgColor: "bg-[#8B5CF6]",
        delay: 0.2
    },
    {
        title: "Privasi Kamu Aman Banget",
        description: 
            "Jawaban kamu gak akan dishare ke siapa-siapa. Semuanya disimpan aman, dan cuma kamu yang bisa lihat.",
        bgColor: "bg-[#8B5CF6]",
        delay: 0.3
    },
    {
        title: "Cepat, Simpel, dan Nggak Bikin Tambah Overthinking",
        description: 
            "Gak perlu login ribet atau nunggu lama. Cuma 3 menit, kamu udah bisa dapet hasilnya langsung.",
        bgColor: "bg-[#0E103D]",
        delay: 0.4
    }
];

export default function CallSection() {
  return (
    <section className="bg-white font-sans">
      <Container className="py-16">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-[60px] font-bold text-[#0E103D] text-center md:text-start"
        >
          Kenapa <span className="text-[#8B5CF6]">Anoto?</span>
        </motion.h2>
        <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-[20px] text-[#1A1A19] mt-4 max-w-2xl text-center md:text-start"
        >
            Karena ngerti perasaan sendiri itu penting. Dan<br />
            Anoto bantu kamu mulai dari hal kecil.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-16 place-items-center">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <div className="flex flex-col items-center mt-20">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="text-[30px] font-bold text-[#0E103D] text-center max-w-3xl"
          >
            &ldquo;Mental illness is nothing to be ashamed of, but stigma and bias shame us all.&rdquo;
          </motion.p>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="text-[30px] italic text-[#8B5CF6] mt-2"
          >
            -Bill Clinton
          </motion.span>
        </div>
      </Container>
    </section>
  );
}
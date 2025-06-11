import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Container from "@/components/ui/container";
import Image from "next/image";
import Link from "next/link";

interface TestStep {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export default function TestPage() {
  const testSteps: TestStep[] = [
    {
      id: 1,
      icon: "start-test-1.svg",
      title: "Jawab Beberapa Pertanyaan Ringan",
      description:
        "Cuma butuh waktu sekitar 3 menit. Pertanyaannya simpel, gak ribet, dan kamu bisa jawab sambil rebahan.",
    },
    {
      id: 2,
      icon: "start-test-2.svg",
      title: "Lihat Hasilmu Secara Visual",
      description:
        "Setelah tes, kamu bakal dapet insight soal kondisi emosionalmu dalam bentuk yang mudah dipahami.",
    },
    {
      id: 3,
      icon: "start-test-3.svg",
      title: "Tulis Jurnal Refleksi (Opsional)",
      description:
        "Kalau mau, kamu bisa lanjut curhat sedikit soal yang kamu rasain. Gak wajib, tapi kadang nulis bikin lega.",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeaderSection />
      <ContentSection testSteps={testSteps} />
    </div>
  );
}

function HeaderSection() {
  return (
    <section className="bg-primary text-white py-16 pb-[220px]">
      <Container>
        <div className="max-w-md text-center space-y-7 mx-auto">
          <h1 className="text-5xl font-bold">Yuk, Mulai Tesnya!</h1>
          <p className="text-md">
            Tenang aja, gak ada jawaban benar atau salah. Ini cuma buat bantu
            kamu kenal diri sendiri lebih baik.
          </p>
        </div>
      </Container>
    </section>
  );
}

interface ContentSectionProps {
  testSteps: TestStep[];
}

function ContentSection({ testSteps }: ContentSectionProps) {
  return (
    <section className="relative bg-white flex flex-col flex-1">
      <Container>
        <div className="relative -mt-[180px] grid grid-cols-1 gap-5 w-full max-w-6xl mx-auto px-4 md:grid-cols-3">
          {testSteps.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>
        <StartButton />
      </Container>
    </section>
  );
}

interface StepCardProps {
  step: TestStep;
}

function StepCard({ step }: StepCardProps) {
  const textColor = "text-[#0E103D]";

  return (
    <Card className={`text-center py-20 shadow-lg h-[288px] md:h-[320px] flex flex-col justify-center ${textColor}`}>
      <CardHeader>
        <Image
          src={`/icons/${step.icon}`}
          alt={step.title}
          width={26}
          height={26}
          style={{ width: "auto", height: "auto" }}
          className="mx-auto mb-4"
        />
        <h3 className={`text-xl font-bold ${textColor}`}>{step.title}</h3>
      </CardHeader>
      <CardContent>
        <p className={`text-sm ${textColor}`}>{step.description}</p>
      </CardContent>
    </Card>
  );
}

function StartButton() {
  return (
    <div className="flex justify-center mt-12 pb-12">
      <Button
        size="default"
        className="bg-accent rounded-full mx-auto md:mx-0 hover:scale-105 transition-transform text-xl px-6 py-6"
        asChild
      >
        <Link href="/test/form">
          Mulai Tes →
        </Link>
      </Button>
    </div>
  );
}
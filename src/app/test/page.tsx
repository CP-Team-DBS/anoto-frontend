import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Information = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

export default function TestPage() {
  const informations: Information[] = [
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
    <>
      <section className="bg-primary text-white py-16 pb-[17rem]">
        <Container className="relative">
          <div className="max-w-md text-center space-y-7 mx-auto">
            <h1 className="text-5xl font-bold">Yuk, Mulai Tesnya!</h1>
            <p className="text-md">
              Tenang aja, gak ada jawaban benar atau salah. Ini cuma buat bantu
              kamu kenal diri sendiri lebih baik.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 w-full max-w-6xl mt-20 mx-auto absolute left-1/2 transform -translate-x-1/2 px-4 md:grid-cols-3">
            {informations.map((info) => (
              <Card key={info.id} className="text-center py-16">
                <CardHeader>
                  <Image
                    src={`/icons/${info.icon}`}
                    alt={info.title}
                    width={100}
                    height={100}
                    className="mx-auto mb-5"
                  />
                  <h3 className="text-2xl font-bold">{info.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-md">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="flex justify-center items-end py-6 min-h-[calc(100vh-30rem)]">
        <Button className="bg-accent" size="lg" asChild>
          <Link href="/test/questions">
            Mulai Tes <MoveRight />
          </Link>
        </Button>
      </section>
    </>
  );
}

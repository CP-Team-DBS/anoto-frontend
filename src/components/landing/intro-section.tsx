import Image from "next/image";

export default function IntroSection() {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col gap-y-28 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-start">
          <h3 className="text-5xl font-bold md:w-96 leading-14">
            Cuma <span className="text-secondary">3 Menit</span> Buat Kenal Isi
            Kepala Sendiri
          </h3>

          <p className="text-lg font-medium">
            Dengan beberapa pertanyaan ringan, kamu bisa mengetahui apakah
            stresmu masih dalam batas wajar atau perlu perhatian lebih.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14 flex flex-col gap-y-16 sm:px-6 md:gap-y-28 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-center md:gap-24">
          <div className="basis-3/4">
            <Image
              src="/illusts/intro-image-1.svg"
              alt="Intro Image"
              width={550}
              height={500}
              className="w-[75%] md:w-[90%] mx-auto md:mx-0"
            />
          </div>

          <div className="w-full basis-2/4 text-center md:text-start">
            <h6 className="text-4xl font-bold">
              Anxiety Tidak Sama dengan Takut Biasa
            </h6>
            <p className="mt-5 text-lg">
              Kecemasan seringkali muncul tanpa alasan yang jelas. Tes kami
              membantumu memahami tingkat kecemasan dengan tenang dan akurat.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-8 items-center md:flex-row md:gap-24">
          <div className="w-full basis-2/4 text-center md:text-start">
            <h6 className="text-4xl font-bold">
              Kenali Pola Kecemasan Sejak Dini
            </h6>
            <p className="mt-5 text-lg">
              Setiap orang bisa mengalami anxiety. Mengenalinya lebih awal bisa
              membantu kamu mengatasinya dengan lebih baik.
            </p>
          </div>

          <div className="basis-3/4 flex justify-center md:justify-end">
            <Image
              src="/illusts/intro-image-2.svg"
              alt="Intro Image"
              width={550}
              height={500}
              className="w-[75%] md:w-[90%] mx-auto md:mx-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

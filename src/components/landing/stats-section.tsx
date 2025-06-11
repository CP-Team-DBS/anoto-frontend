import Image from "next/image";
import Container from "@/components/ui/container";

interface StatsProps {
  anxietyPercentage: number;
}

export default function StatsSection({ anxietyPercentage }: StatsProps) {
  return (
    <section className="bg-white py-16 md:py-24 font-sans">
      <Container>
        <div className="bg-[#8B5CF6] text-white rounded-xl shadow-lg p-8 md:p-12 transform transition-all duration-700 hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-6 flex items-baseline justify-center animate-fade-in">
              <Image
                src="/icons/graph.svg"
                alt="Graph icon"
                width={36}
                height={36}
                className="mr-4 animate-pulse"
              />
              {anxietyPercentage}% pengguna Anoto mengalami kecemasan dalam
              <br className="hidden md:inline" /> kehidupan sehari-hari.
            </h2>
            <p className="text-base md:text-lg max-w-3xl leading-relaxed animate-fade-in-delay">
              Tapi setelah mencoba Anoto, mereka merasa lebih tenang, lebih
              <br className="hidden md:inline" /> dimengerti, dan lebih siap
              menghadapi hari-hari mereka.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
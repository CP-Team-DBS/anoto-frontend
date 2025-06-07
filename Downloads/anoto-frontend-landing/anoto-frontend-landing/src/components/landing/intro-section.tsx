import Image from "next/image";
import Container from "../ui/container";
import * as motion from "motion/react-client";

const ANIMATION_CONFIG = {
  viewport: { once: true },
  ease: "easeOut" as const,
};

const UI_CONSTANTS = {
  colors: {
    primary: "#0E103D",
    secondary: "text-secondary",
    accent: "#8B5CF6"
  }
};

const createAnimation = (type: 'y' | 'x', value: number, delay = 0) => ({
  initial: { opacity: 0, [type]: value },
  whileInView: { opacity: 1, [type]: 0 },
  viewport: ANIMATION_CONFIG.viewport, 
  transition: { duration: 0.6, delay, ease: ANIMATION_CONFIG.ease }
});

const IntroHeader = () => (
  <Container className="py-16">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-start items-center">
      <motion.h3
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={ANIMATION_CONFIG.viewport}
        transition={{ duration: 0.6, ease: ANIMATION_CONFIG.ease }}
        className="text-5xl font-bold md:w-96 leading-14"
      >
        Cuma <span className="text-secondary">3 Menit</span> Buat Kenal Isi
        Kepala Sendiri
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={ANIMATION_CONFIG.viewport}
        transition={{ duration: 0.6, delay: 0.2, ease: ANIMATION_CONFIG.ease }}
        className="text-2xl flex items-center h-full"
      >
        Dengan beberapa pertanyaan ringan, kamu bisa mengetahui apakah
        stresmu masih dalam batas wajar atau perlu perhatian lebih.
      </motion.p>
    </div>
  </Container>
);

interface ContentItemProps {
  imageUrl: string;
  title: string;
  description: string;
  imageRight?: boolean;
}

const ContentItem = ({ imageUrl, title, description, imageRight = false }: ContentItemProps) => {
  const contentOrder = imageRight ? "flex-col-reverse md:flex-row" : "flex-col md:flex-row";
  const textAnimation = imageRight 
    ? { initial: { opacity: 0, x: -50 }, delay: 0.3 }
    : { initial: { opacity: 0, x: 50 }, delay: 0.3 };
  const imageContainerClass = imageRight 
    ? "basis-3/4 flex justify-center md:justify-end" 
    : "basis-3/4";

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={ANIMATION_CONFIG.viewport}
      transition={{ duration: 0.8, ease: ANIMATION_CONFIG.ease }}
      className={`flex ${contentOrder} gap-8 items-center md:gap-24`}
    >
      {!imageRight && (
        <div className={imageContainerClass}>
          <Image
            src={imageUrl}
            alt="Intro Image"
            width={550}
            height={500}
            className="w-[75%] md:w-[90%] mx-auto md:mx-0"
          />
        </div>
      )}

      <motion.div
        initial={textAnimation.initial}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={ANIMATION_CONFIG.viewport}
        transition={{ duration: 0.6, delay: textAnimation.delay, ease: ANIMATION_CONFIG.ease }}
        className="w-full basis-2/4 text-center md:text-start"
      >
        <h6 className="text-4xl font-bold">{title}</h6>
        <p className="mt-5 text-lg">{description}</p>
      </motion.div>

      {imageRight && (
        <div className={imageContainerClass}>
          <Image
            src={imageUrl}
            alt="Intro Image"
            width={550}
            height={500}
            className="w-[75%] md:w-[90%] mx-auto md:mx-0"
          />
        </div>
      )}
    </motion.div>
  );
};

interface QuoteSectionProps {
  quote: string;
  author: string;
}

function QuoteSection({ quote, author }: QuoteSectionProps) {
  return (
    <div className="flex flex-col items-center mt-20">
      <motion.p
        {...createAnimation('y', 30, 0.5)}
        className={`text-3xl font-bold text-[${UI_CONSTANTS.colors.primary}] text-center max-w-3xl`}
      >
        &ldquo;{quote}&rdquo;
      </motion.p>
      
      <motion.span
        {...createAnimation('y', 20, 0.6)}
        className={`text-3xl italic text-[${UI_CONSTANTS.colors.accent}] mt-8`}
      >
        -{author}
      </motion.span>
    </div>
  );
}

export default function IntroSection() {
  return (
    <section>
      <IntroHeader />
      
      <Container size="sm" className="flex flex-col gap-y-16 py-14">
        <ContentItem 
          imageUrl="/illusts/intro-image-1.svg"
          title="Anxiety Tidak Sama dengan Takut Biasa"
          description="Kecemasan seringkali muncul tanpa alasan yang jelas. Tes kami membantumu memahami tingkat kecemasan dengan tenang dan akurat."
          imageRight={false}
        />
        
        <ContentItem 
          imageUrl="/illusts/intro-image-2.svg"
          title="Kenali Pola Kecemasan Sejak Dini"
          description="Setiap orang bisa mengalami anxiety. Mengenalinya lebih awal bisa membantu kamu mengatasinya dengan lebih baik."
          imageRight={true}
        />

        <QuoteSection 
          quote="Mental illness is nothing to be ashamed of, but stigma and bias shame us all."
          author="Bill Clinton"
        />
      </Container>
    </section>
  );
}

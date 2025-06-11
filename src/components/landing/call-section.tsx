import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "../ui/container";
import * as motion from "motion/react-client";

const ANIMATION_CONFIG = {
  viewport: { once: true },
  ease: "easeOut" as const,
};

const UI_CONSTANTS = {
  colors: {
    background: "#0E103D",
    purple: "#8B5CF6",
  }
};

const FEATURES = [
	{
		title: "Gaya Ngobrol, Bukan Ngintrogasi",
		description:
			"Kita ngerti kok kamu bukan pasien. Pertanyaannya ringan, bahasanya santai, kayak ngobrol sama temen sendiri.",
		bgColor: `bg-[${UI_CONSTANTS.colors.purple}]`,
		delay: 0.1,
	},
	{
		title: "Bukan Buat Nge-judge, Tapi Ngebantu",
		description:
			"Anoto nggak ngasih label. Hasil tesnya dibuat supaya kamu bisa lebih paham diri, bukan buat nakut-nakutin.",
		bgColor: `bg-accent`,
		delay: 0.2,
	},
	{
		title: "Privasi Kamu Aman Banget",
		description:
			"Jawaban kamu gak akan dishare ke siapa-siapa. Semuanya disimpan aman, dan cuma kamu yang bisa lihat.",
		bgColor: `bg-accent`,
		delay: 0.3,
	},
	{
		title: "Cepat, Simpel, dan Nggak Bikin Tambah Overthinking",
		description:
			"Gak perlu login ribet atau nunggu lama. Cuma 3 menit, kamu udah bisa dapet hasilnya langsung.",
		bgColor: `bg-[${UI_CONSTANTS.colors.purple}]`,
		delay: 0.4,
	},
];

interface FeatureCardProps {
	title: string;
	description: string;
	bgColor: string;
	delay: number;
	index: number;
}

const createAnimation = (type: 'y' | 'x', value: number, delay = 0) => ({
  initial: { opacity: 0, [type]: value },
  whileInView: { opacity: 1, [type]: 0 },
  viewport: ANIMATION_CONFIG.viewport, 
  transition: { duration: 0.6, delay, ease: ANIMATION_CONFIG.ease }
});

const SectionHeading = () => (
	<>
		<motion.h2
			{...createAnimation('y', 50)}
			className="text-5xl font-bold text-white text-center md:text-start transform scale-90 origin-center md:origin-left"
		>
			Kenapa Anoto?
		</motion.h2>
		<motion.p
			{...createAnimation('y', 30, 0.2)}
			className="text-xl text-white mt-4 max-w-2xl text-center md:text-start"
		>
			Karena ngerti perasaan sendiri itu penting. Dan
			<br />
			Anoto bantu kamu mulai dari hal kecil.
		</motion.p>
	</>
);

const FeatureCard = ({ title, description, bgColor, delay, index }: FeatureCardProps) => {
	const isTopRow = index < 2;
	const xDirection = isTopRow ? 100 : -100;
	
	const cardProps = {
		dimensions: { width: 585, height: 195 }, 
		className: `${bgColor} rounded-2xl text-white w-full h-full border-0`
	};

	return (
		<motion.div
			{...createAnimation('x', xDirection, delay)}
			style={cardProps.dimensions}
			className={cardProps.className}
		>
			<Card className={cardProps.className}>
				<CardHeader className="pb-2 px-8">
					<CardTitle className="text-2xl font-bold transform scale-90 origin-left">{title}</CardTitle>
				</CardHeader>
				<CardContent className="text-lg pt-0 px-8 pb-7">
					{description}
				</CardContent>
			</Card>
		</motion.div>
	);
};

export default function CallSection() {
	return (
		<section className={`bg-[${UI_CONSTANTS.colors.background}] font-sans overflow-hidden`}>
			<Container className="py-26">
				<SectionHeading />

				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 mt-16 place-items-center">
					{FEATURES.map((feature, index) => (
						<FeatureCard key={index} {...feature} index={index} />
					))}
				</div>
			</Container>
		</section>
	);
}

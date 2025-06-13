import React from "react";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";

const ANIMATION_CONFIG = {
  viewport: { once: true },
  ease: "easeOut" as const,
};

const UI_CONSTANTS = {
  colors: {
    primary: "#2A0A5E",
    divider: "#0E103D",
    background: "#F8F7F4",
  },
  profileImage: {
    path: "/profile/profile-user.svg",
    size: 128,
  },
  socialIcons: {
    size: 24,
    linkedin: "/social/linkedin.svg",
    github: "/social/github.svg",
  },
};

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  github?: string;
}

const createFadeAnimation = (
  direction: "y" | "x" | "scale",
  value: number,
  delay: number = 0
) => ({
  initial:
    direction === "scale"
      ? { opacity: 0, scale: value }
      : { opacity: 0, [direction]: value },
  whileInView:
    direction === "scale"
      ? { opacity: 1, scale: 1 }
      : { opacity: 1, [direction]: 0 },
  viewport: ANIMATION_CONFIG.viewport,
  transition: { duration: 0.5, delay, ease: ANIMATION_CONFIG.ease },
});

const teamMembers: TeamMember[] = [
  {
    name: "Muhammad Lutfi Hakim",
    role: "Machine Learning Engineer",
    image: "/profile/hakim.jpg",
    linkedin: "https://www.linkedin.com/in/hakimlutfi",
    github: "https://github.com/hakimlutfi46",
  },
  {
    name: "Laila Wulandari",
    role: "Machine Learning Engineer",
    image: "/profile/laila.jpg",
    linkedin: "https://www.linkedin.com/in/LailaWulandari",
    github: "https://github.com/lailaWulandarii",
  },
  {
    name: "Arya Gunawan",
    role: "Machine Learning Engineer",
    image: "/profile/arya.jpg",
    linkedin: "https://www.linkedin.com/in/arya-gunawan/",
    github: "https://github.com/Aryaagunawan",
  },
  {
    name: "Ahmad Irsyadul 'Ibad",
    role: "Software Engineer",
    image: "/profile/irsyadulibad.png",
    linkedin: "https://linkedin.com/in/irsyadulibad",
    github: "https://github.com/irsyadulibad",
  },
  {
    name: "Muhammad Rivqi Al Varras",
    role: "Software Engineer",
    image: "/profile/varras.jpg",
    linkedin: "https://www.linkedin.com/in/al-varras/",
    github: "https://github.com/Alvarras",
  },
  {
    name: "Mohammad Rafly Putra P",
    role: "Software Engineer",
    image: "/profile/rafly.jpg",
    linkedin: "https://www.linkedin.com/in/rafly-pratama-0872741b1/",
    github: "https://github.com/raflyprtm11",
  },
];

const ProfileImage = ({ name, image }: { name: string; image: string }) => (
  <motion.div
    {...createFadeAnimation("scale", 0.8, 0.2)}
    className="w-32 h-32 rounded-full bg-[#2A0A5E] overflow-hidden flex items-center justify-center absolute -top-16 border-4 border-white shadow-lg"
  >
    <Image
      src={image}
      alt={`${name} profile`}
      width={UI_CONSTANTS.profileImage.size}
      height={UI_CONSTANTS.profileImage.size}
      className="w-full h-full object-cover rounded-full"
      quality={95}
      priority={false}
    />
  </motion.div>
);

const SocialLinks = ({
  linkedin,
  github,
}: Pick<TeamMember, "linkedin" | "github">) => (
  <motion.div {...createFadeAnimation("y", 10, 0.5)} className="flex gap-3">
    {linkedin && (
      <Link href={linkedin} target="_blank" rel="noopener noreferrer">
        <Image
          src={UI_CONSTANTS.socialIcons.linkedin}
          alt="LinkedIn"
          width={UI_CONSTANTS.socialIcons.size}
          height={UI_CONSTANTS.socialIcons.size}
          className="hover:opacity-80 transition"
        />
      </Link>
    )}
    {github && (
      <Link href={github} target="_blank" rel="noopener noreferrer">
        <Image
          src={UI_CONSTANTS.socialIcons.github}
          alt="GitHub"
          width={UI_CONSTANTS.socialIcons.size}
          height={UI_CONSTANTS.socialIcons.size}
          className="hover:opacity-80 transition"
        />
      </Link>
    )}
  </motion.div>
);

const TeamMemberCard = ({
  name,
  role,
  image,
  linkedin,
  github,
}: TeamMember) => {
  return (
    <motion.div
      {...createFadeAnimation("y", 30)}
      className="flex flex-col items-center pt-16 px-5 pb-5 rounded-lg bg-white shadow-md relative mt-12"
    >
      <ProfileImage name={name} image={image} />

      <motion.h3
        {...createFadeAnimation("y", 0, 0.3)}
        className="text-xl font-bold mb-1"
      >
        {name}
      </motion.h3>

      <motion.p
        {...createFadeAnimation("y", 0, 0.4)}
        className="text-gray-600 mb-4"
      >
        {role}
      </motion.p>

      <div className="w-[90%] h-[0.5px] bg-[#0E103D]/30 mb-4"></div>

      <SocialLinks linkedin={linkedin} github={github} />
    </motion.div>
  );
};

const TeamSectionHeader = () => (
  <motion.h2
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={ANIMATION_CONFIG.viewport}
    transition={{ duration: 0.6, ease: ANIMATION_CONFIG.ease }}
    className="text-5xl font-bold text-center text-[#2A0A5E]"
  >
    Meet Our Team
  </motion.h2>
);

const TeamGrid = () => (
  <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-6 max-w-5xl mx-auto">
    {teamMembers.map((member, index) => (
      <TeamMemberCard key={index} {...member} />
    ))}
  </div>
);

const AboutSection: React.FC = () => {
  return (
    <section className="py-12 px-5 bg-[#F8F7F4]">
      <div className="container mx-auto">
        <TeamSectionHeader />
        <TeamGrid />
      </div>
    </section>
  );
};

export default AboutSection;

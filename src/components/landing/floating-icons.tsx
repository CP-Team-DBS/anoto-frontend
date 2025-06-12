import * as motion from "motion/react-client";

export default function FloatingIcons() {
  return (
    <>
      <motion.div
        className="absolute top-30 left-40 text-4xl"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        😰
      </motion.div>
      <motion.div
        className="absolute top-40 right-20 text-3xl"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        💭
      </motion.div>
      <motion.div
        className="hidden md:block absolute bottom-40 left-1/4 text-2xl"
        animate={{
          x: [0, 15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🧠
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-1/3 text-3xl"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        💪
      </motion.div>
    </>
  );
}

import { motion } from "framer-motion";
import hero from "../assets/images/hero.png";

export function Home() {
  return (
    <div className="overflow-x-hidden w-[100vw] h-[100vh] flex flex-col-reverse md:flex-row justify-around items-center">
      <section className="w-3/5 h-full flex flex-col gap-8 items-center md:items-start justify-center p-8 md:p-12">
        <motion.h1
          animate={{
            position: ["fixed", "static"],
            x: [-500, 0],
            scale: [0.5, 1],
          }}
          className="text-6xl md:text-8xl text-center md:text-left font-medium"
        >
          Docs Online
        </motion.h1>
        <motion.p
          animate={{
            position: ["fixed", "static"],
            x: [-500, 0],
            scale: [0.5, 1],
          }}
          transition={{
            type: "spring",
            bounce: 0.5,
            delay: 0.15,
          }}
          className="text-2xl md:text-3xl text-center md:text-left font-regular"
        >
          All your docs in one place
        </motion.p>
        <motion.button
          animate={{
            position: ["fixed", "static"],
            x: [-500, 0],
            scale: [0.5, 1],
          }}
          transition={{
            type: "spring",
            bounce: 0.5,
            delay: 0.3,
          }}
          className="transition-colors cursor-pointer p-2 pl-6 pr-6 text-xl text-white bg-violet-600 hover:bg-violet-500"
        >
          Get Started
        </motion.button>
      </section>
      <section className="w-2/5 h-full flex items-center justify-center">
        <motion.img
          initial={{ scale: 0, x: 500 }}
          animate={{
            position: ["fixed", "static"],
            x: [500, 0],
            scale: [0, 1],
            y: [-15, 15],
          }}
          transition={{
            type: "spring",
            duration: 0.25,
            ease: "easeInOut",
            bounce: 0.25,
            delay: 0.6,
            y: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
            },
          }}
          className="brightness-90"
          src={hero}
          alt="hero image with documents"
        />
      </section>
    </div>
  );
}

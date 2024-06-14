import { motion } from "framer-motion";

export function Login() {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col gap-8 items-center justify-center">
      <motion.h2 animate={{ opacity: [0, 1] }} className="font-semibold text-4xl">Log In</motion.h2>
      <motion.form
        animate={{ scale: [0.5, 1] }}
        className="p-8 w-[90vw] md:w-96 pt-12 pb-12 rounded-lg violet-shadow bg-violet-50 flex flex-col justify-start gap-6"
      >
        <motion.div
          transition={{
            type: "spring",
            bounce: 0.3,
            duration: 0.25,
            delay: 0.15,
          }}
          animate={{ scale: [0.5, 1], opacity: [0, 1] }}
          className="flex flex-col gap-3"
        >
          <label className="text-lg font-medium" htmlFor="email">
            Email Address
          </label>
          <input
            className="text-lg transition p-2 focus:border-b-violet-300 border-b-violet-400 border-b-2 border-b-solid outline-none"
            type="text"
            placeholder="example@ex.com"
            required
            name="email"
          />
        </motion.div>
        <motion.div
          transition={{
            type: "spring",
            bounce: 0.3,
            duration: 0.25,
            delay: 0.3,
          }}
          animate={{ scale: [0.5, 1], opacity: [0, 1] }}
          className="flex flex-col gap-3"
        >
          <label className="text-lg font-medium" htmlFor="password">
            Password
          </label>
          <input
            className="text-lg transition p-2 focus:border-b-violet-300 border-b-violet-400 border-b-2 border-b-solid outline-none"
            type="password"
            placeholder="password"
            required
            name="password"
          />
        </motion.div>
        <motion.button
          transition={{
            type: "spring",
            bounce: 0.3,
            duration: 0.25,
            delay: 0.45,
          }}
          animate={{ scale: [0.5, 1], opacity: [0, 1] }}
          className="text-white font-medium hover:bg-violet-400 transition-colors bg-violet-500 p-2 pl-6 pr-6 rounded-sm"
          type="submit"
        >
          Log In
        </motion.button>
      </motion.form>
    </div>
  );
}

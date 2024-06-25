import { motion } from "framer-motion";

export function AddModal() {
  return (
    <motion.div
      className="fixed bg-slate-950 bg-opacity-20 w-full h-full flex justify-center items-center"
      animate={{ opacity: [0, 1] }}
    >
      <motion.form
        transition={{
          type: "spring",
          bounce: 0.3,
          duration: 0.25,
          delay: 0.15,
        }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1] }}
        className="p-8 w-[90vw] md:w-96 pt-12 pb-12 rounded-lg violet-shadow bg-violet-50 flex flex-col justify-start gap-9"
      >
        <input
          type="text"
          placeholder="Document Title"
          className="text-lg transition p-2 focus:border-b-violet-300 border-b-violet-400 border-b-2 border-b-solid outline-none"
        />
        <button
          className="text-white font-medium hover:bg-violet-400 transition-colors bg-violet-500 p-2 pl-6 pr-6 rounded-sm"
          type="submit"
        >
          Create
        </button>
        <button className="text-white font-medium hover:bg-violet-400 transition-colors bg-violet-500 p-2 pl-6 pr-6 rounded-sm">
          Cancel
        </button>
      </motion.form>
    </motion.div>
  );
}

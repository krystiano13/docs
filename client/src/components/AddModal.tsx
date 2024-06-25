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
      >
        <input />
        <button type="submit">Create</button>
        <button>Cancel</button>
      </motion.form>
    </motion.div>
  );
}

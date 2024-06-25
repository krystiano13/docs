import { motion } from "framer-motion";

export function AddModal() {
  return (
    <motion.div
      className="fixed w-full h-full flex justify-center items-center"
      animate={{ opacity: [0, 1] }}
    >
      <form>
        <input />
        <button type="submit">Create</button>
        <button>Cancel</button>
      </form>
    </motion.div>
  );
}

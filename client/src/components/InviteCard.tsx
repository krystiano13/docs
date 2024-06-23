import { motion } from "framer-motion";

export function InviteCard() {
  return (
    <motion.div
      animate={{ scale: [0.5, 1], opacity: [0, 1] }}
      className="invite bg-violet-50 p-2 rounded-lg shadow-md w-full max-w-[80vw]"
    >
      <h2 className="font-medium text-lg">Title</h2>
      <h2 className="font-medium text-lg">User</h2>
      <h2 className="font-medium text-lg">Role: Edit</h2>
      <button className="font-medium text-lg text-white transition-colors hover:bg-emerald-400 bg-emerald-500 p-2 pl-6 pr-6 rounded-lg">
        Accept
      </button>
      <button className="font-medium text-lg text-white transition-colors hover:bg-red-400 bg-red-500 p-2 pl-6 pr-6 rounded-lg">
        Decline
      </button>
    </motion.div>
  );
}

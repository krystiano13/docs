import { motion } from "framer-motion";

interface Props {
  id: number;
  title: string;
  shared: boolean;
  user?: string;
}

export const FileButton: React.FC<Props> = ({ id, title, shared, user }) => {
  return (
    <motion.button
      initial={{ position: "fixed" }}
      transition={{
        type: "spring",
        bounce: 0.3,
        duration: 0.25,
        delay: 0.15,
      }}
      animate={{
        scale: [0.5, 1],
        opacity: [0, 1],
        position: ["fixed", "static"],
      }}
      id={id.toString()}
      className="flex flex-col justify-center items-center rounded-lg btn-shadow transition-colors text-base font-semibold min-w-64 p-5 pl-8 pr-8"
    >
      {title.length > 16 ? `${title.slice(0, 15)} ...` : title}
      {shared && <br />}
      {shared && user ? "User: " : null}
    </motion.button>
  );
};

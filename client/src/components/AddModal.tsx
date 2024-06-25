import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  cancel: () => void;
  modal: boolean;
  create: (e: React.FormEvent<HTMLFormElement>, hide: () => void) => void;
}

const variantsDiv = {
  open: {
    opacity: [0, 1],
  },
  closed: {
    opacity: [1, 0],
  },
};

const variantsForm = {
  open: {
    scale: [0, 1],
  },
  closed: {
    scale: [1, 0],
  },
};

export const AddModal: React.FC<Props> = ({ cancel, modal, create }) => {
  const [isModal, setIsModal] = useState<boolean>(modal);
  return (
    <motion.div
      initial={isModal ? { opacity: 0 } : { opacity: 1 }}
      className="fixed bg-slate-950 bg-opacity-30 w-full h-full flex justify-center items-center"
      animate={isModal ? "open" : "closed"}
      variants={variantsDiv}
    >
      <motion.form
        onSubmit={(e) =>
          create(e, () => {
            setIsModal(false);
            setTimeout(() => cancel(), 250);
          })
        }
        transition={{
          type: "spring",
          bounce: 0.3,
          duration: 0.25,
          delay: isModal ? 0.15 : 0,
        }}
        initial={isModal ? { scale: 0 } : { scale: 1 }}
        animate={isModal ? "open" : "closed"}
        variants={variantsForm}
        className="p-8 w-[90vw] md:w-96 pt-12 pb-12 rounded-lg violet-shadow bg-violet-50 flex flex-col justify-start gap-9"
      >
        <input
          name="name"
          required
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
        <button
          type="button"
          onClick={() => {
            setIsModal(false);
            setTimeout(() => cancel(), 250);
          }}
          className="text-white font-medium hover:bg-violet-400 transition-colors bg-violet-500 p-2 pl-6 pr-6 rounded-sm"
        >
          Cancel
        </button>
      </motion.form>
    </motion.div>
  );
};

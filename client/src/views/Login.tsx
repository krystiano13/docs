import { motion } from "framer-motion";
import { Form } from "../components/Form";

export function Login() {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col gap-8 items-center justify-center">
      <motion.h2
        animate={{ opacity: [0, 1] }}
        className="font-semibold text-4xl"
      >
        Log In
      </motion.h2>
      <Form mode="login" submit={(e) => e.preventDefault()} />
    </div>
  );
}

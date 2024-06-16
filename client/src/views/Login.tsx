import { motion } from "framer-motion";
import { Form } from "../components/Form";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router";

export function Login() {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setErrors([]);

    await fetch("http://127.0.0.1:3000/users/tokens/sign_in", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.resource_owner) {
          userContext.setUser({
            id: data.resource_owner.id,
            email: data.resource_owner.email,
            token: data.token,
          });

          localStorage.setItem("refresh_token", data.refresh_token);

          navigate("/");
        } else {
          if (data.error_description) {
            const tmp_errors: string[] = [];
            (data.error_description as string[]).forEach((item) => {
              tmp_errors.push(item);
            });

            setErrors(tmp_errors);
          }
        }
      });
  }

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col gap-5 md:gap-8 items-center justify-center">
      <motion.h2
        animate={{ opacity: [0, 1] }}
        className="font-semibold text-3xl md:text-4xl"
      >
        Log In
      </motion.h2>
      <Form mode="login" submit={handleLogin} />
      <div id="errors">
        {errors.map((item) => {
          return (
            <p
              className="text-red-500 text-center text-sm md:text-base"
              key={item}
            >
              {item}
            </p>
          );
        })}
      </div>
    </div>
  );
}

import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FileButton } from "../components/FIleButton";
import type { File } from "../types";
import { AuthContext } from "../contexts/authContext";

export function Choose() {
  const [option, setOption] = useState<"your" | "shared">("your");
  const [files, setFiles] = useState<File[]>([]);
  const [sharedFiles, setSharedFiles] = useState<File[]>([]);

  const auth = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/api/documents/${auth.user?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.user?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.documents) {
          const files: File[] = [];
          data.documents.forEach((item: File) => {
            files.push({
              id: item.id,
              name: item.name,
              shared: false,
              user: auth.user?.email,
            });
          });

          setFiles(files);
        }
      });

    fetch(`http://127.0.0.1:3000/api/shares/${auth.user?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.user?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.documents) {
          const files: File[] = [];
          data.documents.forEach((item: File) => {
            files.push({
              id: item.id,
              name: item.name,
              shared: true,
              user: "Test",
            });
          });

          setSharedFiles(files);
        }
      });
  }, []);

  return (
    <div className="w-full h-full overflow-x-hidden pt-6 p-0 md:p-6 flex flex-col">
      <motion.section
        transition={{
          type: "spring",
          bounce: 0.3,
          duration: 0.25,
        }}
        animate={{
          scale: [0.5, 1],
          opacity: [0, 1],
          position: ["fixed", "static"],
        }}
        className="pt-20 justify-center md:justify-start flex items-center"
        id="buttons"
      >
        <button
          className={`${
            option == "your" && "text-white bg-violet-500"
          } font-medium text-lg p-2 pl-6 pr-6 border-violet-500 border-b-2 border-b-solid`}
          onClick={() => setOption("your")}
        >
          Your Files
        </button>
        <button
          className={`${
            option == "shared" && "text-white bg-violet-500"
          } font-medium text-lg p-2 pl-6 pr-6 border-violet-500 border-b-2 border-b-solid`}
          onClick={() => setOption("shared")}
        >
          Shared Files
        </button>
      </motion.section>
      <section
        id="files"
        className="pt-8 flex flex-col md:flex-row justify-center items-center md:items-start gap-6 md:justify-start w-[100vw] min-h-80 h-auto overflow-y-auto"
      >
        <motion.button
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
          className="rounded-lg hover:bg-violet-400 transition-colors bg-violet-500 text-white text-xl font-bold min-w-64 p-5 pl-8 pr-8"
        >
          +
        </motion.button>
        {option == "your"
          ? files.map((item) => (
              <FileButton
                shared={item.shared}
                user={item.user}
                id={item.id}
                title={item.name}
              />
            ))
          : sharedFiles.map((item) => (
              <FileButton
                shared={item.shared}
                user={item.user}
                id={item.id}
                title={item.name}
              />
            ))}
      </section>
    </div>
  );
}

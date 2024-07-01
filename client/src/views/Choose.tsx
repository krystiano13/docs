import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FileButton } from "../components/FIleButton";
import { AuthContext } from "../contexts/authContext";
import { AddModal } from "../components/AddModal";
import type { File } from "../types";

export function Choose() {
  const [option, setOption] = useState<"your" | "shared">("your");
  const [files, setFiles] = useState<File[]>([]);
  const [sharedFiles, setSharedFiles] = useState<File[]>([]);
  const [modal, setModal] = useState<boolean>(false);

  const auth = useContext(AuthContext);

  async function createDocument(
    e: React.FormEvent<HTMLFormElement>,
    mode: "add" | "rename",
    hide: () => void,
    id?: number
  ) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    await formData.append("user_id", auth.user?.id.toString() as string | Blob);
    await formData.append("content", "" as string | Blob);
    await formData.append("username", auth.user?.email as string | Blob);

    await fetch(`http://127.0.0.1:3000/api/documents${mode === "add" ? "" : `?id=${id}`}`, {
      method: mode === "add" ? "POST" : "PATCH",
      headers: {
        Authorization: `Bearer ${auth.user?.token}`,
      },
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.document) {
          hide();
          if(mode === "add") {
            setFiles([
              ...files,
              {
                id: data.document.id,
                name: data.document.name,
                shared: false,
                user: auth.user?.email,
              },
            ]);
          }
          else {
            const files_array = [...files];
            files_array.forEach(item => {
              if(item.id === id) {
                item.name == formData.get("name")
              }
            });
            setFiles(files_array);
          }
        } else {
          alert("Something went wrong");
        }
      });
  }

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
    <>
      {modal && (
        <AddModal
          create={createDocument}
          modal={modal}
          cancel={() => setModal(false)}
        />
      )}
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
          {option == "your" ? (
            <>
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
                onClick={() => setModal((prev) => !prev)}
                className="rounded-lg hover:bg-violet-400 transition-colors bg-violet-500 text-white text-xl font-bold min-w-64 p-5 pl-8 pr-8"
              >
                +
              </motion.button>
              {files.map((item) => (
                <FileButton
                  shared={item.shared}
                  user={item.user}
                  id={item.id}
                  title={item.name}
                />
              ))}
            </>
          ) : (
            sharedFiles.map((item) => (
              <FileButton
                shared={item.shared}
                user={item.user}
                id={item.id}
                title={item.name}
              />
            ))
          )}
        </section>
      </div>
    </>
  );
}

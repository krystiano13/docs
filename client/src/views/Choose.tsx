import { useState } from "react";
import { motion } from "framer-motion";
import { FileButton } from "../components/FIleButton";

export function Choose() {
    const [option, setOption] = useState<"your"|"shared">("your");
    return (
        <div className="w-full h-full pt-6 p-0 md:p-6 flex flex-col">
            <motion.section 
                transition={{
                    type: "spring",
                    bounce: 0.3,
                    duration: 0.25,
                }}
                animate={{ scale: [0.5, 1], opacity: [0, 1] }}
                className="pt-20 justify-center md:justify-start flex items-center" id="buttons">
                <button 
                    className={`${option == "your" && "text-white bg-violet-500"} font-medium text-lg p-2 pl-6 pr-6 border-violet-500 border-b-2 border-b-solid`} 
                    onClick={() => setOption("your")}>
                        Your Files
                </button>
                <button 
                    className={`${option == "shared" && "text-white bg-violet-500"} font-medium text-lg p-2 pl-6 pr-6 border-violet-500 border-b-2 border-b-solid`}  
                    onClick={() => setOption("shared")}>
                        Shared Files
                </button>
            </motion.section>
            <motion.section 
                transition={{
                    type: "spring",
                    bounce: 0.3,
                    duration: 0.25,
                    delay: 0.15,
                }}
                animate={{ scale: [0.5, 1], opacity: [0, 1] }}
                id="files" 
                className="pt-8 flex justify-center items-start gap-6 md:justify-start w-[100vw] min-h-80 h-auto overflow-y-auto"
            >
                <button 
                    className="rounded-lg hover:bg-violet-400 transition-colors bg-violet-500 text-white text-xl font-bold min-w-64 p-5 pl-8 pr-8"
                >
                    +
                </button>
                <FileButton id={1} title="Test" />
            </motion.section>
        </div>
    )
}
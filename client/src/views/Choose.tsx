import { useState } from "react"

export function Choose() {
    const [option, setOption] = useState<"your"|"shared">("your");
    return (
        <div className="w-[100vw] h-[100vh] p-6">
            <section className="pt-20 flex items-center" id="buttons">
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
            </section>
            <section 
                id="files" 
                className="pt-8 flex flex-wrap justify-start gap-6 w-[100vw] h-auto overflow-y-auto"
            >
                <button 
                    className="rounded-lg hover:bg-violet-400 transition-colors bg-violet-500 text-white text-xl font-bold min-w-64 p-5 pl-8 pr-8"
                >
                    +
                </button>
            </section>
        </div>
    )
}
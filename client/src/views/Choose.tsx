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
            <section id="files" className="w-[100vw] h-auto overflow-y-auto">
                <button>+</button>
            </section>
        </div>
    )
}
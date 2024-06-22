import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export function Workspace() {
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="w-full h-full overflow-x-hidden pt-24 p-6 flex flex-col">
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  );
}

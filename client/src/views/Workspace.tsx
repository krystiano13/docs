import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export function Workspace() {
  const [value, setValue] = useState("");
  const [params, setParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(value);
  }, [value]);

  useEffect(() => {
    if(!params.get("id")) {
      navigate("/choose");
    }
    else {
      
    }
  }, []);

  return (
    <div className="w-full h-full overflow-x-hidden pt-24 p-6 flex flex-col">
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  );
}

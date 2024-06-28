import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import debounce from "debounce-basic";

export function Workspace() {
  const [value, setValue] = useState("");
  const [params, setParams] = useSearchParams();

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if(!params.get("id")) {
      navigate("/choose");
    }
    else {
      fetch(`http://127.0.0.1:3000/api/documents/get_by_id/${params.get("id")}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.user?.token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data.document.content !== "" && data.document.content) {
          setValue(data.document.content);
        }
      })
    }
  }, []);

  return (
    <div className="w-full h-full overflow-x-hidden pt-24 p-6 flex flex-col">
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  );
}

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const socketURL: string = "ws://127.0.0.1:3000/cable";
const socket = new WebSocket(socketURL);

export function Workspace() {
  const [value, setValue] = useState("");
  const [params, setParams] = useSearchParams();

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  socket.onopen = function() {
    const message = JSON.stringify({
      command: "subscribe",
      identifier: JSON.stringify({
        id: Math.random().toString(36).substring(2,15) + auth.user?.email,
        channel: "documents_channel"
      })
    });

    socket.send(message);
  }

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
        console.log(data);
        if(data.document.content !== "" && data.document.content) {
          setValue(data.document.content);
        }
      })
    }
  }, []);

  function update(e: unknown) {
    setValue(e as string);
    const formData = new FormData();
    formData.append("content", e as string|Blob);
    fetch(`http://127.0.0.1:3000/api/documents/${params.get("id")}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${auth.user?.token}`
      },
      body: formData
    })
    .then(res => res.json())
  }

  return (
    <div className="w-full h-full overflow-x-hidden pt-24 p-6 flex flex-col">
      <ReactQuill theme="snow" value={value} onChange={update} />
    </div>
  );
}

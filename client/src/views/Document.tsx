import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Invite } from "../types";

export function Document() {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [params, setParams] = useSearchParams();

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  async function deleteDocument() {
    await fetch(`http://127.0.0.1:3000/api/documents/${params.get("id") as string}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.user?.token}`
      }
    })
    .then(res => {
      if(res.ok) {
        navigate('/');
      }
      else {
        alert("Internal Server Error");
      }

      return res.json();
    })
  }

  async function sendInvite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    await formData.append("document_id", params.get("id") as string|Blob);
    await formData.append("role", "edit");
    await formData.append("user_id", auth.user?.id as unknown as string|Blob);

    await fetch(`http://127.0.0.1:3000/api/invites`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.user?.token}`
      },
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if(data.message)
        getInvites();
    })
  }

  async function cancelInvite(id: number) {
    await fetch(`http://127.0.0.1:3000/api/invites/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.user?.token}`
      }
    })
    .then(res => {
      if(res.ok) {
        const invites_arr = [...invites.filter(item => item.id !== id)];
        setInvites(invites_arr);
      }
      else {
        alert("Server Error");
      }

      return res.json();
    });
  }

  function getInvites() {
      const id = params.get("id") as string;

      fetch(`http://127.0.0.1:3000/api/invites/by_doc_id/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.user?.token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data.invites && data.usernames) {
          const array = [];

          for(let i=0; i<data.invites.length; i++) {
            array.unshift({ ...data.invites[i], user: data.usernames[i].email  });
          }

          setInvites(array);
        }
      })
  }

  useEffect(() => {
    if(!params.get("id")) {
      navigate('/choose');
    }

    else {
      getInvites();
    }
  }, []);

  return (
    <div className="overflow-x-hidden w-[100vw] min-h-[100vh] flex flex-col md:flex-row justify-center gap-6 md:gap-0 md:justify-around items-center">
      <section
        id="invites"
        className="w-[90vw] md:w-2/5 max-h-[50vh] flex flex-col gap-6"
      >
        <motion.div
          animate={{ scale: [0, 1] }}
          id="invites_list"
          className="overflow-y-auto max-h-[50vh] bg-violet-50 w-full h-auto flex flex-col items-center rounded-lg violet-shadow gap-3 p-6"
        >
          {
            invites.map(item => (
              <motion.div 
                animate={{ scale: [0.5, 1] }}
                onClick={() => cancelInvite(item.id)} 
                key={item.id} 
                className="flex items-center gap-2 justify-between w-full"
              >
                <h3 className="md:text-lg font-medium">{ item.user }</h3>
                <button className="text-white font-medium hover:bg-red-400 transition-colors bg-red-500 p-2 pl-6 pr-6 rounded-sm">
                  Cancel
                </button>
              </motion.div>
            ))
          }
        </motion.div>
        <motion.form
          onSubmit={(e) => sendInvite(e)}
          transition={{
            type: "spring",
            bounce: 0.3,
            duration: 0.25,
            delay: 0.15,
          }}
          animate={{ scale: [0, 1] }}
          className="p-8 w-full pt-12 pb-12 rounded-lg violet-shadow bg-violet-50 flex flex-col justify-start gap-6"
        >
          <input
            className="text-lg transition p-2 focus:border-b-violet-300 border-b-violet-400 border-b-2 border-b-solid outline-none"
            type="email"
            required
            name="email"
            placeholder="User Email"
          />
          <button
            className="w-full text-white font-medium hover:bg-violet-400 transition-colors bg-violet-500 p-2 pl-6 pr-6 rounded-sm"
            type="submit"
          >
            Invite
          </button>
        </motion.form>
      </section>
      <motion.section
        transition={{
          type: "spring",
          bounce: 0.3,
          duration: 0.25,
          delay: 0.3,
        }}
        animate={{ scale: [0, 1] }}
        id="options"
        className="bg-violet-50 violet-shadow flex flex-col gap-6 items-center justify-center rounded-lg p-6 pt-12 pb-12"
      >
        <button className="w-full text-white font-medium hover:bg-violet-400 transition-colors bg-violet-500 p-2 pl-6 pr-6 rounded-sm">
          Open Document
        </button>
        <button className="w-full text-white font-medium hover:bg-violet-400 transition-colors bg-violet-500 p-2 pl-6 pr-6 rounded-sm">
          Rename Document
        </button>
        <button 
          onClick={deleteDocument}
          className="w-full text-white font-medium hover:bg-violet-400 transition-colors bg-violet-500 p-2 pl-6 pr-6 rounded-sm"
        >
          Delete Document
        </button>
      </motion.section>
    </div>
  );
}

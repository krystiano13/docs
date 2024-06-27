import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function Document() {
  const [invites, setInvites] = useState([]);
  const [params, setParams] = useSearchParams();

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if(!params.get("id")) {
      navigate('/choose');
    }

    else {
      const id = params.get("id") as string;

      fetch(`http://127.0.0.1:3000/api/invites/by_doc_id/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.user?.token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.invites) {

        }
      })
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
          <div className="flex items-center gap-2 justify-between w-full">
            <h3 className="md:text-lg font-medium">InvitedUser@example.com</h3>
            <button className="text-white font-medium hover:bg-red-400 transition-colors bg-red-500 p-2 pl-6 pr-6 rounded-sm">
              Cancel
            </button>
          </div>
        </motion.div>
        <motion.form
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
        <button className="w-full text-white font-medium hover:bg-violet-400 transition-colors bg-violet-500 p-2 pl-6 pr-6 rounded-sm">
          Delete Document
        </button>
      </motion.section>
    </div>
  );
}

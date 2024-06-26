import { useState } from "react";

export function Document() {
  const [invites, setInvites] = useState([]);
  return (
    <div className="overflow-x-hidden w-[100vw] h-[100vh] flex flex-col md:flex-row justify-around items-center">
      <section id="invites" className="w-[90vw] md:w-2/5 max-h-[60vh]">
        <div
          id="invites_list"
          className="bg-violet-50 w-full h-auto flex flex-col items-center"
        >
          <div>
            <h3>InvitedUser@example.com</h3>
            <button>Cancel</button>
          </div>
        </div>
        <form>
          <input type="email" required name="email" placeholder="User Email" />
          <button type="submit">Invite</button>
        </form>
      </section>
      <section id="options">
        <button>Open Document</button>
        <button>Rename Document</button>
        <button>Delete Document</button>
      </section>
    </div>
  );
}

import { useState, useEffect, useContext } from "react";
import { InviteCard } from "../components/InviteCard";
import { AuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router";
import type { Invite } from "../types";

export function Invites() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [invites, setInvites] = useState<Invite[]>([]);

  useEffect(() => {
    if (auth.user) {
      fetch(`http://localhost:3000/api/invites/1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.invites) {
            const array: Invite[] = [];
            data.invites.forEach((item: Invite) => {
              array.push({
                id: item.id,
                user_id: item.user_id,
                document_id: item.document_id,
                role: item.role,
                title: data.document.name,
                user: data.user.email,
              });
            });
            setInvites(array);
          }
        });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-full h-full gap-6 overflow-x-hidden pt-24 p-6 flex flex-col items-center">
      {invites.map((invite) => (
        <InviteCard key={invite.id} {...invite} />
      ))}
    </div>
  );
}

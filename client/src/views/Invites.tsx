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
      fetch(`http://localhost:3000/api/invites/${auth.user.id}`, {
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
                title: `Invite #${item.id}`,
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

  async function handleAccept(id: number) {
    await fetch(`http://127.0.0.1:3000/api/invites/accept/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.user?.token}`,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          alert("Server Error");
        } else {
          const invites_array = [...invites];
          setInvites(invites_array.filter((item) => item.id !== id));
        }

        return res.json();
      })
      .then((data) => console.log(data));
  }

  async function handleDecline(id: number) {
    await fetch(`http://127.0.0.1:3000/api/invites/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.user?.token}`,
      },
    }).then((res) => {
      if (res.ok) {
        const invites_array = [...invites];
        setInvites(invites_array.filter((item) => item.id !== id));
      } else {
        alert("Server Error");
      }
    });
  }

  return (
    <div className="w-full h-full gap-6 overflow-x-hidden pt-24 p-6 flex flex-col items-center">
      {invites.map((invite) => (
        <InviteCard
          decline={handleDecline}
          accept={handleAccept}
          key={invite.id}
          invite={{ ...invite }}
        />
      ))}
    </div>
  );
}

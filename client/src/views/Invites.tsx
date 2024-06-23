import { useState } from "react";
import { InviteCard } from "../components/InviteCard";

interface Invite {
    id: number;
    user_id: number;
    document_id: number;
    role: string;
    title: string;
    user: string;
}

export function Invites() {
    const [invites, setInvites] = useState<Invite[]>([]);

    return (
      <div className="w-full h-full overflow-x-hidden pt-24 p-6 flex flex-col items-center">
        <InviteCard />
      </div>
    );
}
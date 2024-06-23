import { useState } from "react";
import { InviteCard } from "../components/InviteCard";
import type { Invite } from "../types";

export function Invites() {
    const [invites, setInvites] = useState<Invite[]>([]);

    return (
      <div className="w-full h-full overflow-x-hidden pt-24 p-6 flex flex-col items-center">
        <InviteCard />
      </div>
    );
}
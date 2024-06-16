import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface User {
  id: number;
  email: string;
  token: string;
}

export const AuthContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({ user: { id: -1, email: "", token: "" }, setUser: () => {} });

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (localStorage.getItem("refresh_token")) {
      fetch("http://127.0.0.1:3000/users/tokens/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.resource_owner) {
            setUser({
              id: data.resource_owner.id,
              email: data.resource_owner.email,
              token: data.token,
            });

            localStorage.setItem("refresh_token", data.refresh_token);
          } else {
            localStorage.removeItem("refresh_token");
          }
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

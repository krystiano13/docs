import { createContext, useState } from "react";
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
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

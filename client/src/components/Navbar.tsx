import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="fixed w-[100vw] flex items-center justify-start p-5 gap-6 bg-violet-50 violet-shadow">
      <NavLink className="text-lg font-medium" to="/">
        Home
      </NavLink>
    </nav>
  );
}

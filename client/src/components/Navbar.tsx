import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export function Navbar() {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(userContext);

  function logOut() {
    userContext.setUser(null);
    localStorage.removeItem("refresh_token");
    navigate("/login");
  }

  return (
    <nav className="fixed w-[100vw] flex items-center justify-start p-5 gap-6 bg-violet-50 violet-shadow">
      <NavLink className="text-lg font-medium" to="/">
        Home
      </NavLink>
      {!userContext.user && (
        <>
          <NavLink className="text-lg font-medium" to="/login">
            Login
          </NavLink>
          <NavLink className="text-lg font-medium" to="/register">
            Register
          </NavLink>
        </>
      )}
      {userContext.user && (
        <button onClick={logOut} className="text-lg font-medium">
          Log Out
        </button>
      )}
    </nav>
  );
}

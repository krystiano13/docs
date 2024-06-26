import { BrowserRouter, Routes, Route } from "react-router-dom";

//views
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { Choose } from "./views/Choose";
import { Workspace } from "./views/Workspace";
import { Invites } from "./views/Invites";
import { Document } from "./views/Document";

//components
import { Navbar } from "./components/Navbar";
import { AuthContextProvider } from "./contexts/authContext";

function App() {
  return (
    <AuthContextProvider>
      <div className="w-[100vw] h-[100vh] bg-violet-100">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/choose" element={<Choose />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/invites" element={<Invites />} />
            <Route path="/document" element={<Document />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContextProvider>
  );
}

export default App;

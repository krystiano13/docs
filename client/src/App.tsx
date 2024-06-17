import { BrowserRouter, Routes, Route } from "react-router-dom";

//views
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { Choose } from "./views/Choose";

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
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContextProvider>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

//views
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { Register } from "./views/Register";

//components
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="w-[100vw] h-[100vh] bg-violet-100">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

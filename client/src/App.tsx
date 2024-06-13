import { BrowserRouter, Routes, Route } from "react-router-dom";

//views
import { Home } from "./views/Home";

//components
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="w-[100vw] h-[100vh] bg-violet-100">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

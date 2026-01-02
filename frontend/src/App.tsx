import Encrypted from "./pages/Encrypted";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="bg-black h-screen w-screen bg-gradient-to-r from-[#262626] to-black flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/encrypted" element={<Encrypted />} />
        </Routes>
    </div>
  );
};

export default App;

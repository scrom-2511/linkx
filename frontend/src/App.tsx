import { ToastContainer } from "react-toastify";
import NotFound from "./components/NotFound";
import SomeError from "./components/SomeError";
import { ThemeProvider } from "./components/theme-provider";
import { BackgroundBeamsWithCollision } from "./components/ui/background-beams-with-collision";
import Encrypted from "./pages/Encrypted";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ToastContainer/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/encrypted/:link" element={<Encrypted />} />
      <Route path="/notfound" element={<NotFound />} />
      <Route path="/someerror" element={<SomeError />} />
    </Routes>
  
</ThemeProvider>

  );
};

export default App;

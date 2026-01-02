import { ThemeProvider } from "./components/theme-provider";
import Encrypted from "./pages/Encrypted";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen w-screen bg-primary-foreground flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/encrypted" element={<Encrypted />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;

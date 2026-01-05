import NotFound from "./components/NotFound";
import SomeError from "./components/SomeError";
import { ThemeProvider } from "./components/theme-provider";
import Encrypted from "./pages/Encrypted";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen items-center justify-center font-geist bg-background">
        <main className="w-full max-w-3xl flex-col items-center bg-background sm:items-start">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/encrypted/:link" element={<Encrypted />} />
            <Route path="/notfound" element={<NotFound />} />
            <Route path="/someerror" element={<SomeError />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyLayout from "./pages/MyLayout";
import { ContextCryptoProvider } from "./context/context";
import About from "./pages/About";
import Cascade from "./components/Cascade";

function App() {
  return (
    <ContextCryptoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cascade />}>
            <Route index element={<MyLayout />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<MyLayout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextCryptoProvider>
  );
}

export default App;

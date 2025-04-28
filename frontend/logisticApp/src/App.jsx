import "./App.css";
import MapView from "./components/MapView";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormAuth from "./pages/FormAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormAuth />} />
        <Route path="/main" element={<MapView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

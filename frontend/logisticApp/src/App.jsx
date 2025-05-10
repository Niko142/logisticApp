import "./App.css";
import MapView from "./pages/MapView";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormAuth from "./pages/FormAuth";
import Settings from "./pages/Settings";
import PredictBlock from "./pages/PredictBlock";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormAuth />} />
        <Route path="/main" element={<MapView />} />
        <Route path="/predict" element={<PredictBlock />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { AuthProvider } from "@/context/auth";

import { AppRouter } from "./providers/route";

import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import "@/assets/styles/App.css";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;

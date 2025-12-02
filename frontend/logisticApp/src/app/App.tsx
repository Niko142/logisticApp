import { AuthProvider } from "@/providers/auth";

import { AppRouter } from "./router/AppRouter";

import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import "@styles/App.css";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;

import { MapView } from "@/features/map-handler";
import { Header } from "@/shared";

const MainPage = () => {
  return (
    <section className="map">
      <Header />
      <MapView />;
    </section>
  );
};

export default MainPage;

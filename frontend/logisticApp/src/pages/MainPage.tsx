import { TrafficMap } from "@/features/map-handler";
import { Header } from "@/shared/header";

const MainPage = () => {
  return (
    <section className="map">
      <Header />
      <TrafficMap />
    </section>
  );
};

export default MainPage;

import { Header } from "@/components/header";

import { TrafficMap } from "./components/TrafficMap";

export const MainPage = (): React.ReactElement => {
  return (
    <section className="map">
      <Header />
      <TrafficMap />
    </section>
  );
};

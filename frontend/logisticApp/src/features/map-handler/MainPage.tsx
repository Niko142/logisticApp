import { Header } from "@/components/header";

import { TrafficMap } from "./TrafficMap";

export const MainPage = (): React.ReactElement => {
  return (
    <>
      <Header />
      <TrafficMap />
    </>
  );
};

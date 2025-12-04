import { Header } from "@/components/header";

import { Chart } from "./components/Chart";
import { FiltersBar } from "./components/FiltersBar";

export const AnalyticsPage = () => {
  return (
    <>
      <Header />
      <section className="analytics">
        <Chart />
        <FiltersBar />
      </section>
    </>
  );
};

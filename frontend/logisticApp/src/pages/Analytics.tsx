import { Header } from "@/shared";
import { Chart, FiltersBar } from "@/features/analytics";

const Analytics = () => {
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

export default Analytics;

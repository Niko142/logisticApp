import { Header } from "@/shared";
import Chart from "../components/Chart";
import FiltersBar from "../components/FiltersBar";

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

import Chart from "../components/Chart";
import FiltersBar from "../components/FiltersBar";
import Header from "../components/Header";

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

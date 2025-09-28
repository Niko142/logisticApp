import { Chart, FiltersBar } from "@/features/analytics";
import { Header } from "@/shared/header";

const AnalyticsPage = () => {
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

export default AnalyticsPage;

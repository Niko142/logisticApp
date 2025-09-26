import { Chart, FiltersBar } from "@/features/analytics";
import { Header } from "@/shared/components/Header";

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

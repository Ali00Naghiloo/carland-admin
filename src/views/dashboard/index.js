import { Fragment } from "react";
import Breadcrumbs from "@components/breadcrumbs";
// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/base/pages/dashboard-ecommerce.scss";

const Home = () => {
  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="خانه"
        data={[{ title: "داشبورد" }, { title: "خانه" }]}
      />
      {/* reserves count chart */}
      <div>خانه</div>
    </Fragment>
  );
};

export default Home;

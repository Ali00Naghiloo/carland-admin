import { Fragment } from "react";
import Breadcrumbs from "@components/breadcrumbs";

const AllOrders = () => {
  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="سفارشات"
        data={[{ title: "داشبورد" }, { title: "سفارشات" }]}
      />
    </Fragment>
  );
};
export default AllOrders;

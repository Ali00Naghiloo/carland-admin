import { Fragment } from "react";
import Breadcrumbs from "@components/breadcrumbs";

const AllVideos = () => {
  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="لیست ویدیو ها"
        data={[{ title: "داشبورد" }, { title: "لیست ویدیو ها" }]}
      />
    </Fragment>
  );
};
export default AllVideos;

import { Fragment } from "react";
import Breadcrumbs from "@components/breadcrumbs";

const UpdateVideo = () => {
  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumbs
        title="ویرایش ویدیو"
        data={[{ title: "داشبورد" }, { title: "ویرایش ویدیو" }]}
      />
    </Fragment>
  );
};
export default UpdateVideo;

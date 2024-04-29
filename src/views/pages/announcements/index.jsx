import { Fragment } from "react";
import "./styles/announcements.scss";
import Breadcrumbs from "@components/breadcrumbs";

const Announcements = () => {
  return (
    <Fragment>
      <Breadcrumbs
        title="لیست پیام ها"
        data={[{ title: "پیام ها" }, { title: "لیست پیام ها" }]}
      />
    </Fragment>
  );
};
export default Announcements;

import "./styles/load_more.scss";
import ProgressLoading from "../progress_loading";
import { Fragment } from "react";

const LoadMore = ({ onClick, loading }) => {
  return (
    <Fragment>
      {!loading ? (
        <div onClick={onClick} className="load_more">
          <div></div>
          <div>موارد بیشتر</div>
          <div></div>
        </div>
      ) : (
        <div style={{ margin: "20px 0" }}>
          <ProgressLoading />
        </div>
      )}
    </Fragment>
  );
};
export default LoadMore;

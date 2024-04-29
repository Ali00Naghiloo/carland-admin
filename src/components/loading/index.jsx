import "./loading.scss";
import logo from "../../assets/image/logo.png";

const CustomLoading = () => {
  return (
    <div className="fallback-spinner custom-loader">
      <h1 className="mb-2">کارلند</h1>
      <div className="loading">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div>
    </div>
  );
};
export default CustomLoading;

// ** Logo
import logo from "@src/assets/image/logo.png";

const SpinnerComponent = () => {
  return (
    <div className="fallback-spinner app-loader">
      <div className="d-flex">
        <h1 className="mb-2">کارلند</h1>
        {/* <img src={logo} alt="لوگو کارلند" /> */}
      </div>
      <div className="loading">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div>
    </div>
  );
};

export default SpinnerComponent;

import CustomLoading from "../loading";

const TableLoading = () => {
  return (
    <div
      className="position-absolute w-100 h-100 d-flex justify-content-center pt-3"
      style={{
        right: 0,
        top: 0,
        zIndex: 999,
        background: "rgba(0,0,0,.25)",
      }}
    >
      <CustomLoading />
    </div>
  );
};
export default TableLoading;

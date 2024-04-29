import "./skeleton.scss";
import { useSkin } from "@hooks/useSkin";

const Skeleton = ({ style }) => {
  const { skin } = useSkin();

  return (
    <div
      style={style}
      className={`skeleton ${skin === "dark" ? "skeleton_dark" : ""}`}
    ></div>
  );
};
export default Skeleton;

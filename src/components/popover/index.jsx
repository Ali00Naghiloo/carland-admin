import "./popover.scss";
import { Popover } from "reactstrap";
import { useSkin } from "@hooks/useSkin";

const CustomPopover = ({
  placement,
  trigger,
  isOpen,
  setIsOpen,
  target,
  children,
}) => {
  const { skin } = useSkin();

  return (
    <Popover
      placement={placement}
      trigger={trigger}
      isOpen={isOpen}
      target={target}
      toggle={() => setIsOpen(!isOpen)}
    >
      <div
        className={`popover_body ${skin === "dark" ? "popover_body_dark" : ""}`}
      >
        {children}
      </div>
    </Popover>
  );
};
export default CustomPopover;

import { Input } from "reactstrap";
import useSimcardNumber from "../../../../../hooks/use_simcard_number";

const ActiveButton = ({ row }) => {
  const { patchActive } = useSimcardNumber();

  return (
    <div className="form-switch p-0 m-0">
      <div className="d-flex">
        <Input
          type="switch"
          id="rtl"
          className="m-0 p-0"
          name="RTL"
          checked={row?.active}
          onChange={() => patchActive(row)}
        />
      </div>
    </div>
  );
};
export default ActiveButton;

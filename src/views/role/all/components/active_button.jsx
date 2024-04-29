import { Input } from "reactstrap";
import useRole from "../../../../hooks/use_role";

const ActiveButton = ({ row }) => {
  const { patchActive } = useRole();

  return (
    <div className="form-switch p-0 m-0">
      <div className="d-flex">
        <Input
          type="switch"
          id="rtl"
          className="m-0 p-0"
          name="RTL"
          checked={row.isActive}
          onChange={() => patchActive(row)}
        />
      </div>
    </div>
  );
};
export default ActiveButton;

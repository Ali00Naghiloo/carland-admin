import { Input } from "reactstrap";
import useCategory from "../../../../hooks/use_product";

const ActiveButton = ({ row }) => {
  const { patchActive } = useCategory();

  return (
    <div className="form-switch p-0 m-0">
      <div className="d-flex">
        <Input
          type="switch"
          id="rtl"
          className="m-0 p-0"
          name="RTL"
          checked={row.active}
          onChange={() => patchActive(row)}
        />
      </div>
    </div>
  );
};
export default ActiveButton;

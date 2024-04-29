import { Input } from "reactstrap";
import useDelivery from "../../../../hooks/use_delivery";

const ActiveButton = ({ row }) => {
  const { patchActive } = useDelivery();

  return (
    <div className="form-switch p-0 m-0">
      <div className="d-flex">
        <Input
          type="switch"
          id="rtl"
          className="m-0 p-0"
          name="RTL"
          checked={row.is_active}
          onChange={() => patchActive(row)}
        />
      </div>
    </div>
  );
};
export default ActiveButton;

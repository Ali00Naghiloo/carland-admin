import { Input } from "reactstrap";

const ActiveButton = ({ row }) => {
  return (
    <div className="form-switch p-0 m-0">
      <div className="d-flex">
        <Input
          type="switch"
          id="rtl"
          className="m-0 p-0"
          name="RTL"
          checked={row.active}
        />
      </div>
    </div>
  );
};
export default ActiveButton;

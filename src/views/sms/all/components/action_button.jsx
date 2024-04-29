import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const ActionButton = ({ row }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Button
        size="sm"
        color="primary"
        onClick={() => {
          navigate(`/sms/update?entity_id=${row.id}`);
        }}
      >
        بروزرسانی
      </Button>
    </Fragment>
  );
};
export default ActionButton;

import { Fragment } from "react";
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
          navigate(`/finance/view?entity_id=${row.appUserId}`);
        }}
      >
        جزییات
      </Button>
    </Fragment>
  );
};
export default ActionButton;

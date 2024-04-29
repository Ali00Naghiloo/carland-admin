import { Fragment } from "react";
import { useDispatch } from "react-redux";
import {
  setSelectedTransaction,
  setTransactionModal,
} from "../../../../redux/finance_slice";
import { Button } from "reactstrap";

const ActionButton = ({ row }) => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <Button
        size="sm"
        color="primary"
        onClick={() => {
          dispatch(setTransactionModal(1));
          dispatch(setSelectedTransaction(row));
        }}
      >
        جزییات
      </Button>
    </Fragment>
  );
};
export default ActionButton;

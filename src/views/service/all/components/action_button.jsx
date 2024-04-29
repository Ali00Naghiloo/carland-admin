import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import {
  setDeleteModal,
  setOfferModal,
  setScoreModal,
  setSelectedEntity,
} from "../../../../redux/service_slice";
import { useNavigate } from "react-router-dom";

const ActionButton = ({ row }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Fragment>
      <Button
        size="sm"
        color="primary"
        outline
        style={{ marginLeft: 8 }}
        onClick={() => {
          dispatch(setScoreModal(1));
          dispatch(setSelectedEntity(row));
        }}
      >
        امتیاز
      </Button>
      <Button
        size="sm"
        color="primary"
        outline
        style={{ marginLeft: 8 }}
        onClick={() => {
          dispatch(setOfferModal(1));
          dispatch(setSelectedEntity(row));
        }}
      >
        تخفیف
      </Button>
      <Button
        size="sm"
        color="primary"
        style={{ marginLeft: 8 }}
        onClick={() => {
          navigate(`/service/update?entity_id=${row.id}`);
        }}
      >
        بروزرسانی
      </Button>
      <Button
        size="sm"
        color="danger"
        onClick={() => {
          dispatch(setDeleteModal(1));
          dispatch(setSelectedEntity(row.id));
        }}
      >
        حذف
      </Button>
    </Fragment>
  );
};
export default ActionButton;

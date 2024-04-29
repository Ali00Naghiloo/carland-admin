import { Button } from "reactstrap";
import { useDispatch } from "react-redux";
import {
  setDeleteModal,
  setSelectedEntity,
} from "../../../../redux/nationality_slice";
import { useNavigate } from "react-router-dom";

const TableActions = ({ row }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Button
        size="sm"
        color="primary"
        style={{ marginLeft: 8 }}
        onClick={() => {
          navigate(
            `/nationality/update?entity_id=${row.id}&entity_title=${row.nationalityName}`
          );
        }}
      >
        بروزرسانی
      </Button>
      <Button
        onClick={() => {
          dispatch(setDeleteModal(1));
          dispatch(setSelectedEntity(row));
        }}
        color="danger"
        size="sm"
      >
        حذف
      </Button>
    </>
  );
};
export default TableActions;

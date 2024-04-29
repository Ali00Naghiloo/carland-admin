import { Button } from "reactstrap";
import { useDispatch } from "react-redux";
import {
  setDeleteModal,
  setSelectedEntity,
} from "../../../../redux/number_type_slice";

const TableActions = ({ row }) => {
  const dispatch = useDispatch();

  return (
    <>
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

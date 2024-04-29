import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CustomButton from "../button";
import { useDispatch } from "react-redux";

const Confirm = ({
  visible,
  setVisible,
  title,
  noAction,
  noColor,
  noTitle,
  yesLoading,
  yesAction,
  yesColor,
  yesTitle,
  type,
  children,
}) => {
  // type => global, local
  const dispatch = useDispatch();
  return (
    <Modal
      isOpen={visible === 1}
      size="md"
      toggle={() => {
        if (type === "global") {
          dispatch(setVisible(null));
        } else {
          setVisible(null);
        }
      }}
      className="modal-dialog-centered"
      modalClassName="modal-primary"
      key={1}
    >
      <ModalHeader
        toggle={() => {
          if (type === "global") {
            dispatch(setVisible(null));
          } else {
            setVisible(null);
          }
        }}
      >
        {title}
      </ModalHeader>
      {children ? <ModalBody>{children}</ModalBody> : null}
      <ModalFooter className="w-100 d-flex justify-content-center">
        <CustomButton
          onClick={noAction}
          style={{ width: 160 }}
          color={noColor ? noColor : "danger"}
        >
          {noTitle}
        </CustomButton>
        <CustomButton
          loading={yesLoading}
          onClick={yesAction}
          style={{ width: 160 }}
          color={yesColor ? yesColor : "success"}
        >
          {yesTitle}
        </CustomButton>
      </ModalFooter>
    </Modal>
  );
};
export default Confirm;

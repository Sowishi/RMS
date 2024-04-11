import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const RMSModal = ({ children, ...props }) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {children}
    </Modal>
  );
};

export default RMSModal;

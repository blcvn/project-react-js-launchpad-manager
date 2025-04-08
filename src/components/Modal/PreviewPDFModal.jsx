import { Modal } from "antd";
import PropTypes from "prop-types";
import PDFViewer from "../Display/PDFViewer";

const PreviewPDFModal = ({ title, file, open, onClose }) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="overflow-y-scroll h-150">
        <div className="flex flex-col items-center justify-center w-full">
          <PDFViewer file={file} />
        </div>
      </div>
    </Modal>
  );
};

PreviewPDFModal.propTypes = {
  title: PropTypes.string,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default PreviewPDFModal;

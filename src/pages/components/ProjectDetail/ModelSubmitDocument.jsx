import FileDragger from "./FileDragger";
import useObjectState from "../../../hooks/useObjectState";
import { Button, Modal } from "antd";
import { forwardRef, useImperativeHandle, useRef } from "react";

const ModalSubmitDocument = (_, ref) => {
  const [state, setState, resetState] = useObjectState({
    open: false,
    file: null,
  });
  const callbackRef = useRef(null);

  useImperativeHandle(ref, () => ({
    show: ({ callback }) => {
      callbackRef.current = callback;
      setState({ open: true });
    },
    hide: () => resetState,
  }));

  const handleConfirm = () => {
    callbackRef.current && callbackRef.current(state.file);
  };
  const props = {
    name: "file",
    multiple: false,
    onChange(info) {
      setState({ file: info.file });
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    beforeUpload: () => false,
  };
  return (
    <Modal
      title="Submit your document"
      open={state.open}
      footer={null}
      onCancel={resetState}
    >
      <div className="w-full flex justify-center">
        <FileDragger {...props} fileList={state.file ? [state.file] : []} />
      </div>
      <div className="mt-4 flex justify-end">
        <Button onClick={handleConfirm} type="primary">
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default forwardRef(ModalSubmitDocument);

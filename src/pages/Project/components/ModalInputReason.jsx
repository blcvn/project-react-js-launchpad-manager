import { Button, Input, Modal } from "antd";
import { forwardRef, useImperativeHandle, useRef } from "react";
import useObjectState from "../../../hooks/useObjectState";
const { TextArea } = Input;

const ModalInputReason = (_, ref) => {
  const [state, setState, resetState] = useObjectState({
    visible: false,
    comment: "",
  });

  const callbackRef = useRef(null);

  useImperativeHandle(ref, () => ({
    show: ({ callback, id }) => {
      callbackRef.current = callback;
      setState({ visible: true, comment: `Project ID: ${id}` });
    },
    hide: () => resetState(),
  }));

  const handleConfirm = () => {
    if (callbackRef.current) {
      callbackRef.current(state.comment);
    }
    resetState();
  };

  const handleTextAreaChange = (e) => {
    setState({ comment: e.target.value });
  };

  return (
    <Modal
      title="Input reject project reason"
      open={state.visible}
      onCancel={resetState}
      footer={[
        <Button key="cancel" onClick={resetState}>
          Cancel
        </Button>,
        <Button key="confirm" type="primary" onClick={handleConfirm}>
          Submit
        </Button>,
      ]}
    >
      <TextArea
        rows={4}
        placeholder="Please enter your comment..."
        value={state.comment}
        onChange={handleTextAreaChange}
      />
    </Modal>
  );
};

export default forwardRef(ModalInputReason);

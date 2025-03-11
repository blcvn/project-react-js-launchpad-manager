import { Button, DatePicker, Form, Input, Modal } from "antd";
import { useDispatch } from "react-redux";
import { create } from "../../stores/features/project/slice";
function CreateProjectModal({ visible, onClose }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        name: values.name,
        description: values.description,
        startTime: values.startTime.toISOString(),
        endTime: values.endTime.toISOString(),
        tokenName: values.tokenName,
        symbol: values.symbol,
        totalSupply: parseInt(values.totalSupply, 10),
      };
      dispatch(create(payload));
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  return (
    <Modal
      title="Create New Project"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Project Name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter project name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea placeholder="Enter project description" />
        </Form.Item>

        <Form.Item
          name="startTime"
          label="Start Time"
          rules={[{ required: true }]}
        >
          <DatePicker showTime />
        </Form.Item>

        <Form.Item name="endTime" label="End Time" rules={[{ required: true }]}>
          <DatePicker showTime />
        </Form.Item>

        <Form.Item
          name="tokenName"
          label="Token Name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter token name" />
        </Form.Item>

        <Form.Item name="symbol" label="Symbol" rules={[{ required: true }]}>
          <Input placeholder="Enter token symbol" />
        </Form.Item>

        <Form.Item
          name="totalSupply"
          label="Total Supply"
          rules={[{ required: true }]}
        >
          <Input type="number" placeholder="Enter total supply" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSubmit} block>
            Create Project
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateProjectModal;

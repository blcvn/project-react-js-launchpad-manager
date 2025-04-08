import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, Input, Button, Form } from 'antd';

const AddContributorModal = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [contributors, setContributors] = useState([{ name: '', address: '', amount: '' }]);
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
        showModal: () => setOpen(true),
        hideModal: () => setOpen(false),
    }));

    const handleSubmit = () => {
        form.validateFields().then(values => {
            setContributors([...contributors, values]);
            form.resetFields();
            setOpen(false);
            console.log("Submitted contributors:", [...contributors, values]);
        });
    };

    const addNewContributor = () => {
        setContributors([...contributors, { name: '', address: '', amount: '' }]);
    };

    return (
        <Modal title="Add Contributor" open={open} onCancel={() => setOpen(false)} footer={null}>
            <Form form={form} layout="vertical">
                {contributors.map((contributor, index) => (
                    <div key={index} style={{ marginBottom: 10, border: '1px solid #ccc', padding: 10, borderRadius: 5 }}>
                        <Form.Item label="Name" name={`name-${index}`} rules={[{ required: true, message: 'Please enter name' }]}> 
                            <Input />
                        </Form.Item>
                        <Form.Item label="Address" name={`address-${index}`} rules={[{ required: true, message: 'Please enter address' }]}> 
                            <Input />
                        </Form.Item>
                        <Form.Item label="Amount" name={`amount-${index}`} rules={[{ required: true, message: 'Please enter amount' }]}> 
                            <Input type="number" />
                        </Form.Item>
                    </div>
                ))}
                <Button type="dashed" onClick={addNewContributor} style={{ marginBottom: 10 }}>
                    + Add Contributor
                </Button>
                <Button type="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </Modal>
    );
});

export default AddContributorModal;

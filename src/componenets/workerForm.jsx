import { Form, Input, Modal } from "antd";
import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const WorkerForm = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const formRef = useRef();
  const onFinish = (values) => {
    props.addNewWorker(values);
    onClose();
  };
  const formLayout = {
    layout: "vertical",
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const showModal = () => {
    setOpen(true);
  };
  useImperativeHandle(ref, () => ({
    showModal,
  }));
  const onClose = () => {
    formRef.current.resetFields();
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Add Worker"
        open={open}
        footer={[
          <button
            className="bg-white px-2 py-1 text-black rounded-lg text-sm my-2"
            onClick={() => {
              formRef.current.submit();
            }}
          >
            Save
          </button>,
        ]}
        closable={true}
        onCancel={onClose}
      >
        <Form onFinish={onFinish} ref={formRef} {...formLayout}>
          <Form.Item label="Name" name={"name"} required={true}>
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Start" name={"start"} required={true}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Range" name={"range"} required={true}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Portion(%)" name={"portion"} required={true}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Fill" name="fill" required={true}>
            <Input type="color" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default WorkerForm;

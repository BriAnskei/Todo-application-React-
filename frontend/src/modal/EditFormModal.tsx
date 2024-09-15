import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import { Todo, ACTIONS } from "../context/StoreContex";

export interface EditFormModalProps {
  data: Todo;
  show: boolean;
  action: {
    dispatch: React.Dispatch<any>;
    handleClose: () => void;
  };
}

const EditFormModal: React.FC<EditFormModalProps> = ({
  data,
  show,
  action,
}) => {
  const [task, setTask] = useState<Todo>({
    _id: 0,
    name: "",
    level: "",
    time: "",
    description: "",
    status: false,
  });

  useEffect(() => {
    if (data) {
      setTask(data);
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Dispatch the updated task with _id preserved
    action.dispatch({ type: ACTIONS.EDIT_LIST, payLoad: task });
    action.handleClose(); // Close the modal
  };

  return (
    <Modal show={show} onHide={action.handleClose} dialogClassName="w-75">
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTaskName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={task.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formTaskTime">
            <Form.Label>Task Time</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={task.time}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formTaskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={task.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formTaskLevel">
            <Form.Label>Level</Form.Label>
            <Form.Control
              type="text"
              name="level"
              value={task.level}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={action.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditFormModal;

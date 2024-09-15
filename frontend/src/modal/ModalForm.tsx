import React, { useContext, useEffect, useState } from "react";
import { ACTIONS, StoreContext } from "../context/StoreContex";
import { toast } from "react-toastify";

interface AddModalProps {
  dispatch: React.Dispatch<any>;
}

export const taskProp = {
  _id: 0,
  name: "",
  level: "low",
  time: "",
  description: "",
};

export const ModalForm = ({ dispatch }: AddModalProps) => {
  const [task, setTask] = useState(taskProp);

  const resetForm = () => {
    setTask(taskProp);
  };

  const inputValidation = () => {
    return !task.name && !task.time;
  };

  // Handle the changes of input and textarea and tore it directly in the object
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = (e: React.FormEvent) => {
    toast.success("Task added successfully");
    e.preventDefault();
    if (inputValidation()) return;

    dispatch({
      type: ACTIONS.ADD_TODO,
      payLoad: task,
    });
    resetForm();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary "
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop4"
      >
        Add Task
      </button>

      <div
        className="modal fade"
        id="staticBackdrop4"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel4"
        aria-hidden="true"
      >
        <div className="modal-dialog d-flex justify-content-center">
          <div className="modal-content w-75">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel4">
                Add task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={resetForm}
              ></button>
            </div>

            <div className="modal-body p-4">
              <form onSubmit={handleClick}>
                <div className="form-row">
                  <div className="mb-3">
                    <label htmlFor="validationDefault01" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationDefault01"
                      placeholder="Enter task name"
                      name="name"
                      value={task.name}
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="validationDefault02" className="form-label">
                      Discription(optional)
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      placeholder="Enter task discription"
                      rows={3}
                      name="description"
                      value={task.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Time
                    </label>
                    <br />
                    <input
                      type="time"
                      className="form-control"
                      id="validationDefault02"
                      name="time"
                      value={task.time}
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Priority level
                  </label>
                  <br />
                  <input
                    type="radio"
                    className="btn-check"
                    name="level"
                    id="low"
                    value="low"
                    autoComplete="off"
                    onChange={handleChange}
                    checked={task.level === "low"}
                  />
                  <label className="btn btn-outline-success me-1" htmlFor="low">
                    LOW
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="level"
                    id="medium"
                    value="medium"
                    autoComplete="off"
                    onChange={handleChange}
                    checked={task.level === "medium"}
                  />
                  <label
                    className="btn btn-outline-warning me-1"
                    htmlFor="medium"
                  >
                    MEDUIM
                  </label>

                  <input
                    type="radio"
                    className="btn-check "
                    name="level"
                    id="high"
                    value="high"
                    autoComplete="off"
                    onChange={handleChange}
                    checked={task.level === "high"}
                  />
                  <label className="btn btn-outline-danger" htmlFor="high">
                    HIGH
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  aria-label="Close"
                >
                  ADD
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

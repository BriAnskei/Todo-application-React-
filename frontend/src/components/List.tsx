import React, { useEffect, useRef, useState } from "react";
import { Todo, ACTIONS } from "../context/StoreContex";
import { Popover } from "bootstrap";

export interface Prop {
  _id: number;
  name: string;
  level: string;
  time: string;
  description: string;
  status: boolean;
  action?: {
    dispatch: React.Dispatch<any>;
    onClick: (list: Todo) => void; // function to get data
    handleOnclick: () => void; // Toggle the modal
  };
}

function convertTo12HourFormat(time: string): string {
  let [hour, minute] = time.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute < 10 ? "0" : ""}${minute} ${ampm}`;
}

export default function List({
  _id,
  name,
  time,
  description,
  status,
  level,
  action,
}: Prop) {
  const popoverRef = useRef<HTMLButtonElement | null>(null);
  const list = {
    _id,
    name,
    time,
    description,
    status,
    level,
  };

  //  Initialize a Bootstrap popover with HTML content,
  useEffect(() => {
    let popoverInstance: Popover; // Initialization for cleanup side effects

    // Checks DOM element exist
    if (popoverRef.current) {
      // Creates a new Bootstrap popover instance using the Popover class
      // Specifies the target element and object that configures the popover
      popoverInstance = new Popover(popoverRef.current, {
        content: `<div>
                  <p>Description: ${
                    description ? description : "NO CONTENT"
                  }</p>
                </div>`,
        html: true,
        placement: "top" || "left",
      });
    }

    return () => {
      if (popoverInstance) {
        popoverInstance.dispose();
      }
    };
  }, [list]);

  const levelColors = () => {
    switch (level) {
      case "low":
        return { color: "green" };
      case "medium":
        return { color: "orange" };
      case "high":
        return { color: "red" };
      default:
        return;
    }
  };

  const handleEdit = () => {
    const task: Todo = { _id, name, level, time, description, status };
    action?.onClick(task);
    action?.handleOnclick();
  };

  return (
    <>
      <tr>
        <th scope="row">
          <span style={{ color: status ? "#AAA" : "#000" }}>{name}</span>
        </th>
        <td>{convertTo12HourFormat(time)}</td>
        <td>
          <span style={levelColors()}>{level}</span>
        </td>
        <td>{status ? "Completed" : "In Progress"}</td>
        <td>
          <button
            ref={popoverRef}
            type="button"
            className="btn btn-info me-2"
            data-bs-toggle="popover"
            title="Task Information"
          >
            Info
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-success me-2"
            onClick={() =>
              action?.dispatch({ type: ACTIONS.TOGGLE_TODO, payLoad: { _id } })
            }
          >
            Done
          </button>

          <button
            type="button"
            className="btn btn-danger me-2"
            onClick={() =>
              action?.dispatch({ type: ACTIONS.DROP_LIST, payLoad: { _id } })
            }
          >
            Drop
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleEdit}
          >
            Edit
          </button>
        </td>
      </tr>
    </>
  );
}

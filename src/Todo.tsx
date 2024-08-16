import List from "./components/List";
import { Progress } from "./components/Progress";
import EditFormModal from "./modal/EditFormModal";
import { ModalForm } from "./modal/ModalForm";
import { useEffect, useReducer, useState } from "react";
export const ACTIONS = {
  ADD_TODO: "Add-Todo",
  TOGGLE_TODO: "Toggle-Todo",
  DROP_LIST: "Delete-Todo",
  EDIT_LIST: "Edit-task",
};

export interface Todo {
  id: number;
  name: string;
  level: string;
  time: string;
  description: string;
  status: boolean;
}
export interface Action {
  type: string;
  payLoad?: Todo;
}

function reducer(todo: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [
        ...todo,
        newTodo(
          action.payLoad?.name,
          action.payLoad?.description,
          action.payLoad?.time,
          action.payLoad?.level
        ),
      ];

    case ACTIONS.TOGGLE_TODO:
      return todo.map((todo) => {
        if (todo.id === action.payLoad?.id) {
          return { ...todo, status: !todo.status };
        }
        return todo;
      });
    case ACTIONS.DROP_LIST:
      return todo.filter((todo) => todo.id !== action.payLoad?.id);

    case ACTIONS.EDIT_LIST:
      return todo.map((todo) => {
        if (todo.id === action.payLoad?.id) {
          return {
            ...todo,
            id: action.payLoad?.id,
            name: action.payLoad?.name,
            level: action.payLoad?.level,
            time: action.payLoad?.time,
            description: action.payLoad?.description,
            status: action.payLoad?.status,
          };
        }
        return todo;
      });

    default:
      return todo;
  }
}

function newTodo(
  name: string = "",
  description: string = "",
  time: string = "",
  level: string = ""
): Todo {
  return {
    id: Date.now(),
    name,
    description,
    time,
    level,
    status: false,
  };
}

function converTimeCompareFormat(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function Todo() {
  const [todos, dispatch] = useReducer(reducer, []);

  // Initialize hooks for editing task
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);
  const [showEditForm, setShowEdit] = useState(false);

  // Set to progess panel
  const [progress, setProgress] = useState(0);

  const sortedTodos = [...todos].sort(
    (a, b) => converTimeCompareFormat(a.time) - converTimeCompareFormat(b.time)
  );

  useEffect(() => {
    const completedTask = todos.filter((todo) => todo.status).length;
    const totalTask = todos.length;
    // Calculating the fraction of each task and then converts dit into Percentage.
    const total = totalTask === 0 ? 0 : (completedTask / totalTask) * 100;
    setProgress(total !== 0 ? total : 0);
  }, [todos]);

  const handleEdit = (task: Todo) => {
    setSelectedTask(task);
    setShowEdit(true);
  };

  const handleOnclick = () => {
    setShowEdit(!showEditForm);
  };

  return (
    <>
      <nav
        className="navbar navbar-light d-flex align-items-center"
        style={{ backgroundColor: "#272d3e13" }}
      >
        <a className="navbar-brand ms-3" href="#">
          <img
            src="https://play-lh.googleusercontent.com/QhQaJhzdWrZ08HfrsqylDUFIzMjcUxh0UNvFqeZRSpGsTSLC3UyLLq5u9ggKOr-8tQ"
            width="30"
            height="30"
            alt="Logo"
          />
        </a>
        <h4 className="navbarText ms-auto me-auto">Todo-app</h4>
      </nav>

      <div className="parent">
        <div className="center-horizontally">
          <div className="progress-container">
            <ModalForm dispatch={dispatch} />
            <Progress value={progress} />
          </div>

          {/* // Modal to edit task */}
          <EditFormModal
            data={
              // Nullish coalescing operator (??)
              selectedTask ?? {
                id: 0,
                name: "",
                level: "",
                time: "",
                description: "",
                status: false,
              }
            }
            show={showEditForm}
            action={{ handleClose: handleOnclick, dispatch: dispatch }}
          />
          <div className="table">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Task</th>
                  <th scope="col">time</th>
                  <th scope="col">level</th>
                  <th scope="col">Status</th>
                  <th scope="col">Notes</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              <tbody>
                {sortedTodos.map((todo) => {
                  return (
                    <List
                      key={todo.id}
                      id={todo.id}
                      name={todo.name}
                      time={todo.time}
                      status={todo.status}
                      description={todo.description}
                      level={todo.level}
                      action={{
                        dispatch,
                        onClick: handleEdit,
                        handleOnclick: handleOnclick,
                      }}
                    ></List>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;

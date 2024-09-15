import List from "./components/List";
import NavBar from "./components/Navbar/navBar";

import { Progress } from "./components/Progress";
import EditFormModal from "./modal/EditFormModal";
import { ModalForm } from "./modal/ModalForm";
import { StoreContext, Todo } from "./context/StoreContex";
import { useContext, useEffect, useState } from "react";

function converTimeCompareFormat(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function MainTodo() {
  // Initialize hooks for editing task
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);
  const [showEditForm, setShowEdit] = useState(false);

  const context = useContext(StoreContext);
  if (!context) {
    return <div>Loading...</div>;
  }

  const { todos, dispatch } = context;

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
      <NavBar />
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
                _id: 0,
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
          <div className="scroll-list">
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
                {sortedTodos.map((todo, index) => {
                  return (
                    <List
                      key={index}
                      _id={todo._id}
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

export default MainTodo;

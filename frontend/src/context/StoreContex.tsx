import React, {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface ContextProviderProps {
  children: ReactNode;
}
interface StoreContexType {
  todos: Todo[];
  token: string;
  serverUrl: string;
  showLogin: boolean;
  setToken: (value: string) => void;
  setShowLogin: (value: boolean | ((prevState: boolean) => boolean)) => void;
  dispatch: (action: Action, payLoad?: Todo) => void;
}

export const StoreContext = createContext<StoreContexType | undefined>(
  undefined
);

export const ACTIONS = {
  ADD_TODO: "Add-Todo",
  TOGGLE_TODO: "Toggle-Todo",
  DROP_LIST: "Delete-Todo",
  EDIT_LIST: "Edit-task",
  FETCH_LIST: "Fetch-List",
};

export interface Todo {
  _id: number;
  name: string;
  level: string;
  time: string;
  description: string;
  status: boolean;
}
export interface Action {
  type: string;
  payLoad?: Todo;
  fetched: Todo[];
}

function reducer(todo: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      const newTask = newTodo(
        action.payLoad?.name,
        action.payLoad?.description,
        action.payLoad?.time,
        action.payLoad?.level,
        action.payLoad?.status
      );
      addtask(newTask);
      return [...todo, newTask];
    case ACTIONS.FETCH_LIST:
      return [...action.fetched];

    case ACTIONS.TOGGLE_TODO:
      return todo.map((todo) => {
        if (todo._id === action.payLoad?._id) {
          toggleTask(action.payLoad._id);
          return { ...todo, status: !todo.status };
        }
        return todo;
      });
    case ACTIONS.DROP_LIST:
      dropTask(action.payLoad?._id);
      return todo.filter((todo) => todo._id !== action.payLoad?._id);

    case ACTIONS.EDIT_LIST:
      return todo.map((todo) => {
        if (todo._id === action.payLoad?._id) {
          editTask(action.payLoad);
          return {
            ...todo,
            _id: action.payLoad?._id,
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
  level: string = "",
  status: boolean = false
): Todo {
  return {
    _id: Date.now(),
    name,
    description,
    time,
    level,
    status: status,
  };
}

const serverUrl = "http://localhost:3000";
async function addtask(task: Todo) {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await axios.post(`${serverUrl}/api/task/addtask`, task, {
      headers: { token },
    });

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      alert(response.data.message); // Show error message
    }
  }
}

async function editTask(task: Todo) {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await axios.post(`${serverUrl}/api/task/edittask`, task, {
      headers: { token },
    });

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      alert(response.data.message);
    }
  }
}

async function dropTask(_id: number | undefined) {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await axios.post(
      `${serverUrl}/api/task/drop`,
      { _id },
      {
        headers: { token },
      }
    );
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      alert(response.data.message); // Show error message
    }
  }
}

async function toggleTask(_id: number | undefined) {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await axios.post(
      `${serverUrl}/api/task/toggle`,
      { _id },
      {
        headers: { token },
      }
    );
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      alert(response.data.message); // Show error message
    }
  }
}

const ContextProvider: React.FC<ContextProviderProps> = (props) => {
  const [todos, dispatch] = useReducer(reducer, []);

  const [token, setToken] = useState<string>("");
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    console.log("Token logout");
    async function loadData() {
      const token = localStorage.getItem("token");

      if (token) {
        setToken(token);
        await fetchTask();
      } else {
        dispatch({ type: ACTIONS.FETCH_LIST, fetched: [] });
      }
    }
    loadData();
  }, [token]);

  async function fetchTask() {
    if (token) {
      const response = await axios.post(
        `${serverUrl}/api/task/gettask`,
        {},
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        dispatch({ type: ACTIONS.FETCH_LIST, fetched: response.data.task });
      } else {
        alert(response.data.message);
      }
    }
  }

  const contextValue: StoreContexType = {
    showLogin,
    setShowLogin,
    setToken,
    serverUrl,
    token,
    todos,
    dispatch,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default ContextProvider;
